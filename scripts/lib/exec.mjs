/**
 * scripts/lib/exec.mjs
 *
 * Utilitas menjalankan perintah (ffmpeg, ffprobe, node, npm, dll) secara
 * lintas-platform tanpa masalah saat PATH berisi entri aneh yang memicu
 * spawn EINVAL di Node Windows.
 *
 * Strategi:
 *   - Lokasi biner dicari di PATH lalu dipakai sebagai path absolut.
 *   - npm (hanya tersedia sebagai .cmd) dijalankan lewat cmd.exe.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync } from "node:fs";
import path from "node:path";

const execFileAsync = promisify(execFile);
const WIN = process.platform === "win32";
const EXTS = WIN ? [".exe", ".cmd", ".bat"] : [""];

const systemRoot = process.env.SystemRoot || process.env.windir || "C:\\Windows";
const CMD_EXE = path.join(systemRoot, "System32", "cmd.exe");

/**
 * Mencari path absolut dari sebuah biner di PATH (Windows: cek .exe/.cmd/.bat).
 */
export function findBin(name) {
  const dirs = (process.env.PATH || "")
    .split(WIN ? ";" : ":")
    .map((e) => e.trim())
    .filter((e) => e.length > 0);
  for (const dir of dirs) {
    for (const ext of EXTS) {
      const candidate = path.join(dir, name + ext);
      if (existsSync(candidate)) return candidate;
    }
  }
  return null;
}

/**
 * Menjalankan perintah. Mengembalikan Promise<{ stdout, stderr }>.
 * `cmd` boleh nama biner atau path absolut (hasil findBin).
 */
export async function runBin(cmd, args = [], opts = {}) {
  const resolved = path.isAbsolute(cmd) ? cmd : findBin(cmd) || cmd;
  if (WIN && /\.(cmd|bat)$/i.test(resolved)) {
    // Batch hanya jalan lewat cmd.exe. Gunakan pola ""path"..."" yang dikenal
    // cmd sebagai argumen ber-quote sederhana; verbatim agar tanpa escape.
    const cmdLine = [`""${resolved}"`, ...args, `"`].join(" ");
    return await execFileAsync(CMD_EXE, ["/d", "/s", "/c", cmdLine], {
      ...opts,
      windowsVerbatimArguments: true,
    });
  }
  return await execFileAsync(resolved, args, opts);
}

/**
 * Menjalankan perintah baris (mis. melalui cmd.exe) untuk kasus khusus.
 */
export async function runCommandLine(cmdLine) {
  return await execFileAsync(CMD_EXE, ["/d", "/s", "/c", cmdLine]);
}

/** Apakah runtime (ffmpeg+ffprobe+node) tersedia di PATH. */
export function checkRuntime() {
  const missing = ["ffmpeg", "ffprobe", "node"].filter((n) => !findBin(n));
  return { ok: missing.length === 0, missing };
}