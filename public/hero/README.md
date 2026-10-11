# Hero Background Video

Folder ini berisi file background video untuk hero section (CodeMentor AI).

## File yang diharapkan

| File | Status | Keterangan |
|---|---|---|
| `hero-background.mp4` | **Sudah ada** (4.7 MB, 1280×720, 10s, H.264, yuv420p) | Video background looping untuk hero section |
| `hero-background.webm` | Opsional | Fallback VP9 untuk browser modern |
| `hero-background-poster.jpg` | Opsional | Poster fallback saat video belum dimuat |

## Cara menambah file (opsional)

1. Buat poster dari frame pertama video:
   ```bash
   ffmpeg -ss 0 -i public/hero/hero-background.mp4 -frames:v 1 -q:v 2 public/hero/hero-background-poster.jpg
   ```

2. Konversi ke WebM (opsional):
   ```bash
   ffmpeg -i public/hero/hero-background.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -pix_fmt yuv420p public/hero/hero-background.webm
   ```

## Spesifikasi rekomendasi

| Aspek | Rekomendasi | Keterangan |
|---|---|---|
| **Resolusi** | 1920×1080 (Full HD) | Cukup tajam, tetap ringan |
| **Format** | MP4 (H.264) + WebM (VP9) | Kompatibel ke semua browser |
| **Durasi** | 15–30 detik | Looping seamless & tidak membosankan |
| **Ukuran** | < 8 MB | Tidak ganggu LCP (Largest Contentful Paint) |
| **FPS** | 30 fps | Sudah cukup untuk background ambient |
| **Konten** | Abstrak, ambient, halus | Hindari gerakan cepat agar teks tetap terbaca |

## Validasi

```bash
npm run hero:validate
```

## Catatan

- Jika `hero-background.mp4` tidak ada, hero section akan otomatis fallback ke gradient hanya (tanpa error).
- Video diset `pointer-events-none`, `aria-hidden="true"`, `muted`, `loop`, `playsInline`, `autoplay`.
- Di mobile (`< 768px`), video dimatikan untuk menghemat bandwidth.
- Menghormati `prefers-reduced-motion`.
- Deteksi koneksi lambat (`slow-2g`, `2g`, `3g`) → video dimatikan.