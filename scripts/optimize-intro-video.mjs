#!/usr/bin/env node
/**
 * optimize-intro-video.mjs
 *
 * Mengubah video mentah apa pun (mp4/mov/avi/mkv/webm/...) menjadi MP4
 * web-friendly untuk intro CodeMentor AI:
 *   - H.264, profile high, level 4.1, yuv420p, +faststart
 *   - Downscale ke 1920x1080 bila lebih besar
 *   - Target ukuran < max-size-mb
 *   - Poster frame 16:9
 *
 * Pemakaian:
 *   npm run intro:optimize -- path/to/video.mov [--start 1] [--duration 12]
 *   npm run intro:optimize -- --help
 *
 * Hanya bergantung pada ffmpeg/ffprobe dari sistem (tanpa dependency npm).
 */
import { statSync, existsSync, copyFileSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runBin } from "./lib/exec.mjs";
const CWD = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(CWD, "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public", "intro");
const MB = 1024 * 1024;

const USAGE = `
Pemakaian:
  npm run intro:optimize -- <input> [opsi]

Argumen:
  <input>                 Path video mentah (mp4, mov, avi, mkv, webm, ...)

Opsi:
  --start <detik>         Potong mulai dari detik ke-<detik> (default 0)
  --duration <detik>      Durasi maksimal; default biarkan penuh
  --crf <18-28>           Kualitas H.264 (default 23; makin kecil makin bagus)
  --max-size-mb <angka>   Target ukuran maksimal output (default 10)
  --no-audio              Hapus audio dari output
  --poster-at <detik>     Detik untuk poster frame (default 1)
  --output-name <nama>    Nama file output (default codementor-intro.mp4)
  --help                  Tampilkan bantuan

Contoh:
  npm run intro:optimize -- ~/Downloads/intro.mov
  npm run intro:optimize -- video.mp4 --start 1 --duration 12 --crf 26
`.trim();

// ---------------------------------------------------------------------------

function parseArgs(argv) {
  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(USAGE);
    process.exit(0);
  }
  const opts = {
    input: null,
    start: 0,
    duration: null,
    crf: 23,
    maxSizeMb: 10,
    keepAudio: true,
    posterAt: 1,
    outputName: "codementor-intro.mp4",
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = () => {
      i++;
      return argv[i];
    };
    switch (arg) {
      case "--start": opts.start = parseFloat(next()); break;
      case "--duration": opts.duration = parseFloat(next()); break;
      case "--crf": opts.crf = parseInt(next(), 10); break;
      case "--max-size-mb": opts.maxSizeMb = parseInt(next(), 10); break;
      case "--keep-audio": opts.keepAudio = true; break;
      case "--no-audio": opts.keepAudio = false; break;
      case "--poster-at": opts.posterAt = parseFloat(next()); break;
      case "--output-name": opts.outputName = next(); break;
      default:
        if (!opts.input) opts.input = arg;
        else throw new Error(`Argumen tak dikenal: ${arg}`);
    }
  }

  if (!opts.input) {
    console.log(USAGE);
    process.exit(1);
  }
  if (!existsSync(opts.input)) {
    throw new Error(`File tidak ditemukan: ${opts.input}`);
  }
  if (opts.crf < 18 || opts.crf > 28) {
    throw new Error("--crf harus antara 18 dan 28");
  }
  return opts;
}

async function ensureFfmpeg() {
  try {
    const { stdout } = await runBin("ffmpeg", ["-version"]);
    const line = stdout.split("\n")[0] || "ffmpeg";
    console.log("ffmpeg        :", line.trim());
  } catch {
    console.error(
      "ffmpeg tidak ditemukan. Install dulu:\n" +
        "  Windows : winget install ffmpeg   (atau choco install ffmpeg)\n" +
        "  macOS   : brew install ffmpeg\n" +
        "  Linux   : sudo apt install ffmpeg"
    );
    process.exit(1);
  }
  try {
    await runBin("ffprobe", ["-version"]);
  } catch {
    console.error(
      "ffprobe tidak ditemukan. Install ffmpeg (ffprobe ikut terpasang)."
    );
    process.exit(1);
  }
}

async function probe(input) {
  const { stdout } = await runBin(
    "ffprobe",
    [
      "-v", "error",
      "-print_format", "json",
      "-show_format",
      "-show_streams",
      input,
    ],
    { maxBuffer: 32 * MB }
  );
  const data = JSON.parse(stdout);
  const video = (data.streams || []).find((s) => s.codec_type === "video");
  const audio = (data.streams || []).find((s) => s.codec_type === "audio");
  const format = data.format || {};
  return {
    duration: parseFloat(format.duration || video?.duration || "0") || 0,
    bitrate: parseFloat(format.bit_rate || "0") || 0,
    sizeBytes: parseInt(format.size || "0", 10) || 0,
    codec: video?.codec_name || "?",
    width: video?.width || 0,
    height: video?.height || 0,
    hasAudio: Boolean(audio),
  };
}

function fmtSize(bytes) {
  if (bytes > MB) return `${(bytes / MB).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function computeSettings(info, opts) {
  const duration =
    opts.duration && opts.duration > 0
      ? Math.min(opts.duration, info.duration || opts.duration)
      : info.duration || 12;
  const span = Math.max(1, duration);
  // target_bitrate (kbps) agar total <= maxSizeMb.
  const targetKbps = Math.round((opts.maxSizeMb * 8192) / span);
  const audioKbps = opts.keepAudio && info.hasAudio ? 128 : 0;
  const videoKbps = Math.max(400, targetKbps - audioKbps);

  // Downscale bila melebihi 1920x1080. -2 agar lebar/tinggi genap (yuv420p).
  let vf = "scale='min(1920,iw)':-2";
  let dimensionNote = "";
  if (info.width > 1920 || info.height > 1080) {
    dimensionNote = "downscale 1920x1080";
  } else if (info.width < 1280 || info.height < 720) {
    dimensionNote = "Peringatan: input < 720p, hasil akan di-upscale";
  } else {
    dimensionNote = "resolusi aman";
  }
  return { duration, videoKbps, vf, dimensionNote };
}

async function ffmpeg(args, label) {
  console.log(`\n  ${label} ...`);
  await runBin("ffmpeg", args, { maxBuffer: 32 * MB });
}

async function checkFaststart(file) {
  const fd = await import("node:fs/promises");
  const { open } = fd;
  const handle = await open(file, "r");
  const head = Buffer.alloc(4096);
  await handle.read(head, 0, head.length, 0);
  await handle.close();
  const text = head.toString("latin1");
  const moovAt = text.indexOf("moov");
  const mdatAt = text.indexOf("mdat");
  // faststart = moov berada pada awal file (sebelum mdat).
  const faststart = moovAt !== -1 && (mdatAt === -1 || moovAt < mdatAt);
  return { faststart };
}

async function validateOutput(file, opts) {
  const info = await probe(file);
  const size = statSync(file).size;
  const duration = await (async () => {
    const { stdout } = await runBin(
      "ffprobe",
      ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=duration", "-of", "default=noprint_wrappers=1:nokey=1", file]
    );
    return parseFloat(stdout.trim()) || 0;
  })();
  const { faststart } = await checkFaststart(file);
  const problems = [];
  if (size > opts.maxSizeMb * MB) {
    problems.push(`ukuran ${fmtSize(size)} > ${opts.maxSizeMb} MB`);
  }
  if (info.codec !== "h264") problems.push(`codec ${info.codec} bukan h264`);
  const inRange = info.width >= 1280 || info.height >= 720;
  if (!inRange) problems.push(`resolusi ${info.width}x${info.height} di bawah 720p`);
  if (!faststart) problems.push("moov tidak di depan (+faststart hilang)");
  return { info, size, duration, faststart, problems };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generatePoster(mp4Path, posterPath, at) {
  const args = [
    "-y", "-ss", String(at), "-i", mp4Path,
    "-vf", "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080",
    "-frames:v", "1", "-q:v", "2", posterPath,
  ];
  await ffmpeg(args, "poster frame");
}

async function backupExisting() {
  if (!existsSync(PUBLIC_DIR)) {
    mkdirSync(PUBLIC_DIR, { recursive: true });
    return [];
  }
  const backedUp = [];
  for (const file of readdirSync(PUBLIC_DIR)) {
    if (file === "README.md") continue; // jangan backup dokumen
    const src = path.join(PUBLIC_DIR, file);
    const bak = `${src}.bak`;
    if (existsSync(bak)) copyFileSync(src, bak); // biarkan .bak lama tertimpa
    else copyFileSync(src, bak);
    backedUp.push(file);
  }
  return backedUp;
}

const fmtSummary = (rows) => {
  const w1 = Math.max(...rows.map((r) => r[0].length)) + 2;
  const w2 = Math.max(...rows.map((r) => r[1].length)) + 2;
  const w3 = Math.max(...rows.map((r) => r[2].length)) + 2;
  const line = `├${"─".repeat(w1)}┼${"─".repeat(w2)}┼${"─".repeat(w3)}┤`;
  const top = `┌${"─".repeat(w1)}┬${"─".repeat(w2)}┬${"─".repeat(w3)}┐`;
  const bottom = `└${"─".repeat(w1)}┴${"─".repeat(w2)}┴${"─".repeat(w3)}┘`;
  const header = `│${"Metric".padEnd(w1)}│${"Original".padEnd(w2)}│${"Optimized".padEnd(w3)}│`;
  const body = rows.map(
    (r) => `│${r[0].padEnd(w1)}│${r[1].padEnd(w2)}│${r[2].padEnd(w3)}│`
  );
  return [top, header, line, ...body, bottom].join("\n");
};

// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  await ensureFfmpeg();

  const origInfo = await probe(opts.input);
  const origSize = statSync(opts.input).size;
  console.log("\n— Probe input —");
  console.log(
    `${path.basename(opts.input)}  |  ${fmtSize(origSize)}  |  ` +
      `${origInfo.width}x${origInfo.height}  |  ${origInfo.codec}  |  ` +
      `${origInfo.duration.toFixed(1)}s`
  );

  const { duration, videoKbps, vf, dimensionNote } = computeSettings(origInfo, opts);
  console.log("Perhitungan:", dimensionNote, `| target video ~${videoKbps} kbps`);

  const tmp = path.join(PROJECT_ROOT, "scripts", `.tmp-${Date.now()}-${path.basename(opts.outputName, path.extname(opts.outputName))}.mp4`);
  const cleanTmp = async () => {
    const fs = await import("node:fs/promises");
    await fs.rm(tmp, { force: true }).catch(() => {});
    await fs.rm(tmp.replace(/\.mp4$/, ".webm"), { force: true }).catch(() => {});
    await fs.rm(tmp.replace(/\.mp4$/, "-poster.jpg"), { force: true }).catch(() => {});
  };

  try {
    // --- Langkah 1: kompresi MP4 ---
    const vargs = [
      "-y",
      ...(opts.start > 0 ? ["-ss", String(opts.start)] : []),
      ...(duration > 0 ? ["-t", String(duration)] : []),
      "-i", opts.input,
      "-map", "0:v:0",
      ...(opts.keepAudio && origInfo.hasAudio
        ? ["-map", "0:a:0", "-c:a", "aac", "-b:a", "128k", "-ac", "2", "-ar", "44100"]
        : ["-an"]),
      "-c:v", "libx264",
      "-preset", "slow",
      "-crf", String(opts.crf),
      "-b:v", `${videoKbps}k`,
      "-maxrate", `${videoKbps * 2}k`,
      "-bufsize", `${videoKbps * 4}k`,
      "-profile:v", "high",
      "-level", "4.1",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      "-vf", vf,
      tmp,
    ];
    await ffmpeg(vargs, "kompres + optimize MP4");

    // --- Langkah 2: webm fallback (opsional) ---
    let webmPath = null;
    const vp9 = await (async () => {
      const { stderr } = await runBin("ffmpeg", ["-hide_banner", "-encoders"]);
      return stderr.includes("libvpx-vp9");
    })();
    if (vp9) {
      webmPath = tmp.replace(/\.mp4$/, ".webm");
      await ffmpeg(
        [
          "-y", "-i", tmp,
          "-map", "0:v:0",
          ...(opts.keepAudio && origInfo.hasAudio
            ? ["-map", "0:a:0", "-c:a", "libopus", "-b:a", "96k"]
            : ["-an"]),
          "-c:v", "libvpx-vp9", "-crf", "30", "-b:v", "0",
          "-pix_fmt", "yuv420p",
          webmPath,
        ],
        "webm fallback (VP9)"
      );
      await sleep(50); // OS flush
      if (!existsSync(webmPath)) webmPath = null;
    } else {
      console.log("  (libvpx-vp9 tidak tersedia — webm dilewati)");
    }
    await sleep(50);

    // --- Langkah 3: poster frame ---
    const posterTmp = tmp.replace(/\.mp4$/, "-poster.jpg");
    if (existsSync(tmp)) {
      await generatePoster(tmp, posterTmp, opts.posterAt);
    } else {
      throw new Error("MP4 sementara tidak ditemukan setelah kompresi");
    }

    // --- Validasi output ---
    const check = await validateOutput(tmp, opts);

    // --- Pindahkan ke public/intro/ (backup lama) ---
    const backedUp = await backupExisting();
    const finalDir = PUBLIC_DIR;
    const fs = await import("node:fs/promises");
    const base = opts.outputName.replace(/\.mp4$/i, "");
    const finalMp4 = path.join(finalDir, `${base}.mp4`);
    const finalWebm = path.join(finalDir, `${base}.webm`);
    const finalPoster = path.join(finalDir, `${base}-poster.jpg`);
    await fs.rename(tmp, finalMp4);
    if (webmPath && existsSync(webmPath)) await fs.rename(webmPath, finalWebm);
    else { await fs.rm(finalWebm, { force: true }).catch(() => {}); }
    await fs.rename(posterTmp, finalPoster);

    // --- Ringkasan ---
    const optSize = statSync(finalMp4).size;
    const ratio = origSize > 0 ? ((1 - optSize / origSize) * 100).toFixed(0) : "?";
    const origRes = `${origInfo.width}x${origInfo.height}`;
    const optRes = `${check.info.width}x${check.info.height}`;
    const optDur = `${check.duration.toFixed(1)}s`;
    const origDurC = `${origInfo.duration.toFixed(1)}s`;
    const trimmed = Math.abs(check.duration - duration) < 0.5 ? optDur : `${optDur} (trim)`;

    console.log("\n✓ Optimization complete\n");
    console.log(
      fmtSummary([
        ["File size", fmtSize(origSize), `${fmtSize(optSize)} (${ratio}%↓)`],
        ["Resolution", origRes, optRes],
        ["Codec", origInfo.codec, "h264"],
        ["Duration", origDurC, trimmed],
        ["Bitrate", origInfo.bitrate ? `${Math.round(origInfo.bitrate / 1000)} kbps` : "?", `${Math.round((optSize * 8) / check.duration / 1000)} kbps`],
      ])
    );
    console.log("\nFiles written:");
    console.log(`  ${path.relative(PROJECT_ROOT, finalMp4)}       ${fmtSize(optSize)}`);
    if (existsSync(finalWebm)) {
      console.log(`  ${path.relative(PROJECT_ROOT, finalWebm)}      ${fmtSize(statSync(finalWebm).size)}`);
    }
    console.log(`  ${path.relative(PROJECT_ROOT, finalPoster)}  ${fmtSize(statSync(finalPoster).size)}`);

    if (backedUp.length) {
      console.log(`\nCadangan dibuat untuk: ${backedUp.join(", ")} (diakhiri .bak)`);
    }
    if (check.problems.length) {
      console.warn("\nPeringatan validasi:", check.problems.join("; "));
      console.warn('Coba render ulang dengan --crf lebih kecil (mis. 21).');
    }
    console.log("\nReady to use. Restart `npm run dev` to see it on the intro screen.");
  } finally {
    await cleanTmp();
  }
}

main().catch((err) => {
  console.error("\nError:", err.message);
  process.exit(1);
});