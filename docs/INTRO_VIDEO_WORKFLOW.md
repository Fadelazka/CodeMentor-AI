# Workflow Video Intro CodeMentor AI

Dokumen ini menjelaskan cara memproduksi, mengoptimasi, dan memvalidasi video
intro untuk CodeMentor AI — tanpa install dependency npm tambahan (hanya
menggunakan `node` dan `ffmpeg`/`ffprobe` dari sistem).

## Arsitektur ringkas

```
video/src/                 Proyek Remotion (sumber animasi & brand identity)
   └─ npm run build:all    Render MP4 + poster -> video/out/
        │
        ▼
public/intro/              File final yang disajikan oleh Next.js
   ├─ codementor-intro.mp4            (dipakai intro screen)
   ├─ codementor-intro-poster.jpg     (poster video)
   └─ codementor-intro.webm           (opsional, fallback VP9)
```

Rantai utama:

1. **Animasikan ulang** — edit `video/src/` lalu render ulang placeholder.
2. **Optimasi** — file mentah lain (mov/avi/mkv/dsb) dikompres jadi MP4 web-friendly.
3. **Validasi** — pastikan file final lolos syarat (ukuran, durasi, resolusi, codec).

## Alat yang diperlukan

| Alat    | Peran                              | Cara install                       |
| ------- | ---------------------------------- | ---------------------------------- |
| node ≥18| Menjalankan semua script           | https://nodejs.org                 |
| ffmpeg  | Kompresi MP4/webm, poster, probe   | `winget install ffmpeg` / `brew install ffmpeg` / `apt install ffmpeg` |
| ffprobe | Membaca metadata video             | ikut terpasang bersama ffmpeg      |
| npm     | Menjalankan script package.json    | ikut terpasang bersama node        |

Cek kesiapan: `npm run intro:check-deps`.

## 1. Render ulang placeholder (ubah animasi)

Sumber animasi hidup di `video/`. Ubah `video/src/Intro.tsx`,
`video/src/components/...`, `video/src/theme.ts`, atau logo di
`video/src/Logo.tsx`, lalu:

```bash
npm run intro:placeholder
```

Script ini menjalankan `video/build:all` (render MP4 + poster) lalu menyalin
hasilnya ke `public/intro/` dan tetap memvalidasi. Jika mau melihat pratinjau
interaktif dulu: `npm run dev` di dalam folder `video/` lalu buka Remotion Studio.

## 2. Optimasi file video mentah

Untuk sumber non-Remotion (rekaman, export editor video, dll.):

```bash
npm run intro:optimize -- ~/Downloads/intro.mov
npm run intro:optimize -- video.mp4 --start 1 --duration 12 --crf 26
```

Opsi penting:

| Opsi            | Default | Fungsi                                        |
| --------------- | ------- | --------------------------------------------- |
| `--start <detik>` | 0     | Potong dari detik tertentu                     |
| `--duration <detik>` | penuh | Batasi durasi                             |
| `--crf <18–28>`  | 23      | Kualitas (kecil = bagus, file lebih besar)     |
| `--max-size-mb`  | 10      | Target ukuran maksimal output                  |
| `--no-audio`     | —       | Hapus audio (intro biasanya tanpa audio)       |
| `--poster-at <detik>` | 1   | Detik untuk membuat poster frame               |
| `--output-name`  | `codementor-intro` | Nama output (tanpa ekstensi)          |

Hasil: `public/intro/codementor-intro.mp4` (+ poster `.jpg`, + `.webm` bila
encoder VP9 tersedia). File lama di-*backup* otomatis dengan akhiran `.bak`.

## 3. Validasi

```bash
npm run intro:validate                # validasi file default di public/intro/
npm run intro:validate -- path/to.mp4 # validasi file tertentu
```

Pemeriksaan:

- Ukuran < 10 MB
- Durasi 8–40 detik
- Resolusi antara 720p dan 1080p, rasio 16:9
- Codec H.264, `pix_fmt yuv420p` (kompatibilitas browser maksimum)
- `+faststart` (moov box di depan agar streaming instan)

Exit code `0` = lolos semua.

## Syarat teknis final (target)

| Metrik     | Target        | Alasan                                |
| ---------- | ------------- | ------------------------------------- |
| Ukuran     | < 10 MB       | Waktu muat singkat                     |
| Durasi     | 8–40 detik    | Tidak membuat pengguna menunggu        |
| Resolusi   | 1080p (or <)  | Cukup tajam, tetap hemat               |
| Codec      | H.264 + yuv420p + faststart | Kompatibel semua browser  |
| Audio      | opsional      | Intro umumnya tanpa audio              |

Catatan: resolusi di bawah 1280×720 akan di-*upscale* (dengan peringatan) —
pastikan versi optimal Anda dibuat dari sumber setidaknya 720p.

## Troubleshooting umum

- **`ffmpeg` tidak dikenal**: install dari sistem (lihat tabel) lalu buka
  terminal baru agar PATH termuat.
- **Durasi video 0 detik**: beberapa format container butuh `-ss`/`-t` sesudah
  `-i`. Jalankan `npm run intro:optimize -- --help` lalu beri `--duration`.
- **Ukuran masih > 10 MB**: turunkan `--crf` (mis. 21) atau `--duration`.
- **Intro tidak muncul setelah ganti video**: file `public/intro/codementor-intro.mp4`
  ditimpa; hard-refresh browser (Ctrl+Shift+R) untuk membersihkan cache.