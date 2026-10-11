# Hero Background Video

Dokumen ini menjelaskan cara menyiapkan dan menggunakan background video untuk Hero Section.

## File yang dibutuhkan

| File | Wajib | Keterangan |
|---|---|---|
| `public/hero/hero-background.mp4` | Ya | Video utama (H.264, yuv420p) |
| `public/hero/hero-background.webm` | Opsional | Fallback VP9 untuk browser modern |
| `public/hero/hero-background-poster.jpg` | Direkomendasikan | Poster saat video loading/error |

## Spesifikasi Video

| Parameter | Rekomendasi | Catatan |
|---|---|---|
| **Resolusi** | 1920×1080 (Full HD) | Boleh 1280×720, tapi 1080p lebih tajam |
| **Codec** | H.264 + yuv420p, +faststart | Harus untuk kompatibilitas maksimal |
| **Durasi** | 15–30 detik | Ideal untuk looping seamless |
| **Ukuran** | < 8 MB | Lebih kecil lebih baik (tidak ganggu LCP) |
| **FPS** | 30 fps | 60 fps biasanya overkill untuk background |
| **Audio** | Tidak ada | Video diputar muted |
| **Motion** | Lambat & halus | Hindari gerakan cepat agar teks tetap terbaca |

## Cara menyiapkan video dari file yang kamu punya

Video kamu saat ini: `D:\backgroun AI.mp4` (sudah disalin ke `public/hero/hero-background.mp4`)

### 1. Buat poster (direkomendasikan)

```bash
ffmpeg -ss 0 -i public/hero/hero-background.mp4 -frames:v 1 -q:v 2 public/hero/hero-background-poster.jpg
```

### 2. Buat WebM fallback (opsional tapi bagus)

```bash
ffmpeg -i public/hero/hero-background.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -pix_fmt yuv420p -an public/hero/hero-background.webm
```

### 3. Optimasi MP4 (opsional)

Bisa pakai script yang udah ada:

```bash
npm run intro:optimize -- public/hero/hero-background.mp4 --no-audio --max-size-mb 8
```

## Validasi

Setelah file siap, jalankan validasi:

```bash
npm run hero:validate
```

Hasil yang diharapkan: **✓ Hero background video lolos validasi.**

## Perilaku implementasi

- **Desktop (> 1024px):** Video ON, opacity 0.20, blend `screen`, `blur(1px)` + `saturate(0.6)`
- **Tablet (768–1024px):** Video ON, opacity 0.15
- **Mobile (< 768px):** Video OFF → fallback ke gradient saja (hemat bandwidth)
- **prefers-reduced-motion: reduce:** Video OFF → fallback ke gradient
- **Slow connection (`slow-2g`, `2g`, `3g`):** Video OFF → fallback ke gradient
- **Video error/missing:** Silent fallback ke gradient (tidak muncul error di console)

## Layering

1. Base gradient (`from-[#0A0E27] to-[#1A0B3D]`)
2. Video layer (`mix-blend-screen`, `scale-105`)
3. Gradient overlay + radial vignette (untuk meningkatkan keterbacaan teks)
4. Content (`z-10`)

## Testing

1. Buka `http://localhost:3000/?intro=skip` (langsung ke hero tanpa intro)
2. Periksa di DevTools → Network: `hero-background.mp4` ter-load
3. Periksa di Elements: `<video>` punya `opacity-20` setelah loaded
4. Coba klik tombol "Coba CodeMentor AI" / "Ekstensi VS Code" → harus bisa diklik
5. Resize browser ke < 768px → video hilang, hanya gradient
6. Test `prefers-reduced-motion` (Chrome DevTools → Rendering → Emulate CSS prefers-reduced-motion)

## Troubleshooting

- **Teks sulit dibaca:** Bisa turunkan opacity di `HeroBackgroundVideo.tsx` (0.15 → 0.10) atau tebalkan overlay gradient
- **Video tidak muncul:** Cek file ada di `public/hero/`, lalu `npm run hero:validate`
- **Buttons tidak bisa diklik:** Pastikan video pakai `pointer-events-none` (sudah terpasang)
- **Video bergetar/edge artifact:** `scale-105` membantu, bisa ganti jadi `scale-100` kalau nggak perlu