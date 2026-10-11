#!/usr/bin/env node
/**
 * validate-hero-video.mjs
 *
 * Validasi video background hero di public/hero/:
 *   - public/hero/hero-background.mp4 wajib ada
 *   - Ukuran < 8 MB (ideal untuk background ambient)
 *   - Durasi 8–60 detik (looping seamless)
 *   - Resolusi 1280×720 – 1920×1080 (16:9)
 *   - Codec H.264, pix_fmt yuv420p, +faststart
 *   - Poster opsional tapi direkomendasikan
 *
 * Pemakaian:
 *   npm run hero:validate
 *   node scripts/validate-hero-video.mjs
 */
import { statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runBin } from './lib/exec.mjs';

const CWD = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(CWD, '..');
const VIDEO = path.join(PROJECT_ROOT, 'public', 'hero', 'hero-background.mp4');
const POSTER = path.join(PROJECT_ROOT, 'public', 'hero', 'hero-background-poster.jpg');
const MB = 1024 * 1024;

const MAX_SIZE_MB = 8;
const MIN_DURATION = 8;
const MAX_DURATION = 60;
const MIN_W = 1280;
const MIN_H = 720;
const MAX_W = 1920;
const MAX_H = 1080;

function fmtSize(n) {
  return n > MB ? `${(n / MB).toFixed(1)} MB` : `${(n / 1024).toFixed(1)} KB`;
}

async function probe(file) {
  const { stdout } = await runBin('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-print_format', 'json',
    '-show_streams',
    '-show_format',
    file,
  ]);
  const data = JSON.parse(stdout);
  const video = data.streams?.[0] || {};
  const format = data.format || {};
  const duration = Math.max(
    parseFloat(format.duration || video.duration || '0') || 0,
    parseFloat(video.duration || '0') || 0
  );
  return {
    duration,
    width: video.width || 0,
    height: video.height || 0,
    codec: video.codec_name || '?',
    pixFmt: video.pix_fmt || '?',
    sizeBytes: parseInt(format.size || '0', 10) || 0,
  };
}

async function hasFaststart(file) {
  const { open } = await import('node:fs/promises');
  const h = await open(file, 'r');
  const head = Buffer.alloc(4096);
  await h.read(head, 0, head.length, 0);
  await h.close();
  const text = head.toString('latin1');
  const moov = text.indexOf('moov');
  const mdat = text.indexOf('mdat');
  return moov !== -1 && (mdat === -1 || moov < mdat);
}

const results = [];
function check(label, ok, detail) {
  results.push({ label, ok, detail });
  console.log(`${ok ? '✓' : '✗'} ${label}: ${detail || (ok ? 'OK' : '—')}`);
}

async function main() {
  console.log('Validasi hero background video\n');

  if (!existsSync(VIDEO)) {
    console.error('✗ public/hero/hero-background.mp4 tidak ditemukan.');
    console.error('  Tambahkan file lalu jalankan kembali: npm run hero:validate');
    process.exit(1);
  }

  const info = await probe(VIDEO);
  const size = statSync(VIDEO).size;
  const faststart = await hasFaststart(VIDEO);

  check('File ada & tidak kosong', size > 0, fmtSize(size));
  check(`Ukuran < ${MAX_SIZE_MB} MB`, size <= MAX_SIZE_MB * MB, fmtSize(size));
  check(`Durasi ${MIN_DURATION}–${MAX_DURATION}s`, info.duration >= MIN_DURATION && info.duration <= MAX_DURATION, `${info.duration.toFixed(1)}s`);
  check(`Resolusi ${MIN_W}x${MIN_H} – ${MAX_W}x${MAX_H}`, info.width >= MIN_W && info.height >= MIN_H && info.width <= MAX_W && info.height <= MAX_H, `${info.width}x${info.height}`);
  check('Rasio 16:9', Math.abs(info.width / info.height - 16 / 9) < 0.05, `${info.width}x${info.height}`);
  check('Codec H.264', info.codec === 'h264', info.codec);
  check('pix_fmt yuv420p', info.pixFmt === 'yuv420p', info.pixFmt);
  check('Faststart (moov di depan)', faststart, faststart ? 'moov @ depan' : 'moov @ belakang');
  check('Poster ada (direkomendasikan)', existsSync(POSTER), existsSync(POSTER) ? 'tersedia' : 'belum ada');

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error(`\n${failed.length} dari ${results.length} pemeriksaan gagal.`);
    process.exit(1);
  }
  console.log('\n✓ Hero background video lolos validasi.');
}

main().catch((err) => {
  console.error('\nError:', err.message);
  process.exit(1);
});