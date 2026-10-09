#!/usr/bin/env node
/**
 * copy-intro-output.mjs
 *
 * Menyalin hasil render Remotion (video/out/) ke public/intro/ agar langsung
 * dipakai oleh intro screen:
 *   video/out/codementor-intro.mp4  -> public/intro/codementor-intro.mp4
 *   video/out/poster.jpg            -> public/intro/codementor-intro-poster.jpg
 *
 * Dipanggil via: npm run intro:placeholder
 */
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CWD = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(CWD, "..");
const OUT = path.join(PROJECT_ROOT, "video", "out");
const DEST = path.join(PROJECT_ROOT, "public", "intro");

const jobs = [
  { src: "codementor-intro.mp4", dest: "codementor-intro.mp4" },
  { src: "poster.jpg", dest: "codementor-intro-poster.jpg" },
];

const fmt = (n) =>
  n > 1024 * 1024
    ? `${(n / (1024 * 1024)).toFixed(1)} MB`
    : `${(n / 1024).toFixed(1)} KB`;

mkdirSync(DEST, { recursive: true });

for (const { src, dest } of jobs) {
  const from = path.join(OUT, src);
  const to = path.join(DEST, dest);
  if (!existsSync(from)) {
    console.error(`  ! ${src} belum ada. Jalankan dulu: npm run intro:placeholder`);
    continue;
  }
  copyFileSync(from, to);
  console.log(`  OK ${src} -> public/intro/${dest} (${fmt(statSync(to).size)})`);
}