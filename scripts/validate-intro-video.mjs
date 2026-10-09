#!/usr/bin/env node
/**
 * validate-intro-video.mjs
 *
 * Memverifikasi video intro produksi di public/intro/ memenuhi persyaratan
 * untuk tampil di intro screen (web-friendly):
 *   - Ada dan bukan file kosong
 *   - Ukuran < 10 MB
 *   - Durasi antara 8–40 detik
 *   - Resolusi antara 720p dan 1080p (16:9)
 *   - Codec H.264 dengan yuv420p (kompatibilitas browser maksimum)
 *   - +faststart (moov box di depan — streaming instan)
 *
 * Pemakaian:
 *   npm run intro:validate
 *   npm run intro:validate -- path/to/video.mp4
 *
 * Exit code 0 = lolos, 1 = gagal.
 */
import { statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runBin } from "./lib/exec.mjs";
const CWD = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(CWD, "..");
const DEFAULT_FILE = path.join(PROJECT_ROOT, "public", "intro", "codementor-intro.mp4");
const MB = 1024 * 1024;

const MAX_SIZE_MB = 10;
const MIN_DURATION = 8;
const MAX_DURATION = 40;
const MIN_WIDTH = 1280;
const MIN_HEIGHT = 720;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

async function resolveFile(arg) {
  const target = arg || DEFAULT_FILE;
  if (!existsSync(target)) {
    fail(`File tidak ditemukan: ${target}`);
  }
  return path.resolve(target);
}

function fmtSize(bytes) {
  if (bytes > MB) return `${(bytes / MB).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function probe(file) {
  const { stdout } = await runBin(
    "ffprobe",
    [
      "-v", "error",
      "-select_streams", "v:0",
      "-print_format", "json",
      "-show_streams",
      "-show_format",
      file,
    ],
    { maxBuffer: 32 * MB }
  );
  const data = JSON.parse(stdout);
  const video = (data.streams || {})[0] || {};
  const format = data.format || {};
  const duration =
    parseFloat(format.duration || video.duration || "0") || 0;
  const durationFromStream =
    parseFloat(video.duration || "0") || 0;
  return {
    duration: Math.max(duration, durationFromStream),
    width: video.width || 0,
    height: video.height || 0,
    codec: video.codec_name || "?",
    pixFmt: video.pix_fmt || "?",
    profile: video.profile || "?",
    sizeBytes: parseInt(format.size || "0", 10) || 0,
  };
}

async function checkFaststart(file) {
  const { open } = await import("node:fs/promises");
  const handle = await open(file, "r");
  const head = Buffer.alloc(4096);
  await handle.read(head, 0, head.length, 0);
  await handle.close();
  const text = head.toString("latin1");
  const moovAt = text.indexOf("moov");
  const mdatAt = text.indexOf("mdat");
  return moovAt !== -1 && (mdatAt === -1 || moovAt < mdatAt);
}

const results = [];
const check = (label, ok, detail) => {
  results.push({ label, ok, detail });
  console.log(`${ok ? "✓" : "✗"} ${label}: ${detail || "OK"}`);
};

async function main() {
  const arg = process.argv[2];
  const file = await resolveFile(arg);
  console.log(`Validasi intro video: ${path.relative(PROJECT_ROOT, file)}\n`);

  const info = await probe(file);
  const size = statSync(file).size;
  const faststart = await checkFaststart(file);

  check("File ada & tidak kosong", size > 0, fmtSize(size));
  check(`Ukuran < ${MAX_SIZE_MB} MB`, size <= MAX_SIZE_MB * MB, fmtSize(size));
  check(
    `Durasi ${MIN_DURATION}–${MAX_DURATION}s`,
    info.duration >= MIN_DURATION && info.duration <= MAX_DURATION,
    `${info.duration.toFixed(1)}s`
  );
  check(
    `Resolusi ${MIN_WIDTH}x${MIN_HEIGHT}–${MAX_WIDTH}x${MAX_HEIGHT}`,
    info.width >= MIN_WIDTH &&
      info.height >= MIN_HEIGHT &&
      info.width <= MAX_WIDTH &&
      info.height <= MAX_HEIGHT,
    `${info.width}x${info.height}`
  );
  check("Rasio 16:9", Math.abs(info.width / info.height - 16 / 9) < 0.05, `${info.width}x${info.height}`);
  check("Codec H.264", info.codec === "h264", info.codec);
  check("pix_fmt yuv420p", info.pixFmt === "yuv420p", info.pixFmt);
  check("Faststart (moov di depan)", faststart, faststart ? "moov @ depan" : "moov @ belakang");

  const width = Math.max(...results.map((r) => r.label.length)) + 2;
  console.log("\n" + fmtSummary(results, width, file, info, size));

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error(`\n!! ${failed.length} dari ${results.length} pemeriksaan gagal.`);
    console.error("Jalankan: npm run intro:optimize -- <kualitas lebih baik> lalu ulangi validate.");
    process.exit(1);
  }
  console.log("\n✓ Video intro lolos validasi. Siap digunakan.");
}

function fmtSummary(resultsArr, w, file, info, size) {
  const pad = (s, n) => String(s).padEnd(n);
  const line = "─".repeat(w);
  const rows = resultsArr.map((r) => `│ ${r.ok ? "✔" : "✘"} ${pad(`${r.label} — ${r.ok ? "OK" : r.detail}`, w)} │`);
  const top = `┌${line}┐`;
  const summaryRow = `${info.width}x${info.height} · ${info.codec} · ${fmtSize(size)} · ${path.relative(PROJECT_ROOT, file)}`;
  return [
    top,
    `│ ${pad(summaryRow, w + 2)} │`,
    "├" + line + "┤",
    ...rows,
    `└${line}┘`,
  ].join("\n");
}

main().catch((err) => {
  console.error("\nError:", err.message);
  process.exit(1);
});