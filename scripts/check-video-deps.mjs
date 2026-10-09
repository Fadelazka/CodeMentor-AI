#!/usr/bin/env node
/**
 * check-video-deps.mjs
 *
 * Memeriksa runtime untuk workflow video intro tanpa dependency npm:
 *   - node (wajib, minimal v18)
 *   - ffmpeg (wajib, untuk optimize/validate)
 *   - ffprobe (wajib, untuk info video)
 *   - npm (opsional, untuk memanggil script package.json)
 *
 * Pemakaian:
 *   node scripts/check-video-deps.mjs
 *   npm run intro:check-deps
 */
import { findBin, runBin, checkRuntime } from "./lib/exec.mjs";

const main = async () => {
  const results = [];
  console.log("— Pemeriksaan runtime intro video —\n");

  const specs = [
    { name: "node", label: "node (>=18)", args: ["--version"], min: 18 },
    { name: "npm", label: "npm", args: ["--version"], min: 0 },
    { name: "ffmpeg", label: "ffmpeg", args: ["-version"], min: 0 },
    { name: "ffprobe", label: "ffprobe", args: ["-version"], min: 0 },
  ];

  for (const { name, label, args, min } of specs) {
    try {
      const { stdout } = await runBin(name, args);
      const versionLine = (stdout.split("\n")[0] || "").trim();
      const major =
        name === "node"
          ? parseInt(versionLine.match(/v?(\d+)\./)?.[1] || "0", 10)
          : parseInt(versionLine.match(/(?:version )?(\d+)/)?.[1] || "0", 10);
      const ok = name === "node" ? major >= min : true;
      console.log(`${ok ? "✓" : "✗"} ${label}: ${versionLine}`);
      results.push({ label, ok });
    } catch {
      console.error(`✗ ${label}: tidak ditemukan di PATH.`);
      results.push({ label, ok: false });
    }
  }

  const failed = results.filter((r) => !r.ok);
  console.log("");
  if (failed.length) {
    const installHints = {
      ffmpeg: "winget install ffmpeg  |  brew install ffmpeg  |  sudo apt install ffmpeg",
      ffprobe: "install ffmpeg (ffprobe ikut terpasang)",
      node: "https://nodejs.org",
      npm: "install Node.js (npm ikut terpasang)",
    };
    for (const { label } of failed) {
      console.log(`  - ${label}: ${installHints[label.split(" ")[0]] || ""}`);
    }
    console.log("Buka terminal baru agar PATH termuat, lalu jalankan ulang.");
    process.exit(1);
  }
  console.log("✓ Semua dependency video ready.");
};

main().catch((err) => {
  console.error("\nError:", err.message);
  process.exit(1);
});