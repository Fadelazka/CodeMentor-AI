# CodeMentor AI — Intro Video (Remotion)

Animasi logo CodeMentor AI untuk intro screen. Dirender sepenuhnya dari kode
(React + Remotion) tanpa aset eksternal, sehingga bisa dirender offline.

- **Durasi:** 12 detik (360 frame @ 30fps)
- **Resolusi:** 1920x1080
- **Output:** `out/codementor-intro.mp4` (H.264, yuv420p, CRF 23)

## Prasyarat

- Node.js 18+ (diuji pada Node 24)
- Tidak perlu ffmpeg terpasang; Remotion membawa encoder sendiri

## Instalasi

```bash
cd video
npm install
```

## Preview di Remotion Studio

```bash
npm run dev
```

Buka studio, pilih komposisi **Intro**, lalu putar untuk melihat animasi.

## Render MP4

```bash
npm run render
```

Menghasilkan `out/codementor-intro.mp4`.

## Render poster frame

```bash
npm run poster
```

Menghasilkan `out/poster.jpg` (frame 300 — saat logo sudah terbentuk).

## Render semuanya

```bash
npm run build:all
```

## Menyalin hasil ke public/

```bash
mkdir -p ../public/intro
cp out/codementor-intro.mp4 ../public/intro/
cp out/poster.jpg ../public/intro/codementor-intro-poster.jpg
```

> Di Windows PowerShell:
> ```powershell
> New-Item -ItemType Directory -Path ..\public\intro -Force
> Copy-Item out\codementor-intro.mp4 ..\public\intro\ -Force
> Copy-Item out\poster.jpg ..\public\intro\codementor-intro-poster.jpg -Force
> ```

## Kustomisasi

### Warna dan konstanta

Semua warna brand dan nilai timeline ada di `src/theme.ts`:

```ts
export const COLORS = {
  bgFrom: "#0A0E27",
  bgTo: "#1A0B3D",
  cyan: "#00E5FF",
  violet: "#7C4DFF",
  success: "#00FF9D",
  error: "#FF3B6B",
  text: "#FFFFFF",
};
```

### Timeline

Urutan adegan diatur lewat konstanta `BARS` di `src/Intro.tsx`:

| Frame      | Adegan                                                        |
| ---------- | ------------------------------------------------------------- |
| 0–60       | Fade-in, fragmen kode melayang, teks "Error:" berdenyut       |
| 60–150     | "Error:" pecah jadi partikel lalu berkonvergensi jadi orb     |
| 150–240    | Garis neural berdenyut, lencana bahasa mengorbit, teks RAG    |
| 240–330    | Orb kolaps → kilatan → logo + cincin gradien + tagline        |
| 330–360    | Logo berdenyut, fade ke hitam dengan sisa glow                |

Geser angka di `BARS` untuk mengubah waktu tiap adegan. Ubah
`DURATION_IN_FRAMES`, `FPS`, `WIDTH`, `HEIGHT` di `src/theme.ts` untuk durasi
atau resolusi berbeda.

### Struktur berkas

```
video/
├── remotion.config.ts      # konfigurasi render (codec, pixel format, crf)
├── package.json
├── src/
│   ├── index.ts            # entry point (registerRoot)
│   ├── Root.tsx            # registrasi komposisi "Intro"
│   ├── Intro.tsx           # orkestrasi timeline 12 detik
│   ├── theme.ts            # warna, ukuran, daftar bahasa, fragmen kode
│   ├── Logo.tsx            # logo SVG (heksagon + </> + otak sirkuit)
│   └── components/
│       ├── Particles.tsx
│       ├── FloatingCode.tsx
│       ├── AIOrb.tsx
│       └── LanguageBadges.tsx
└── out/                    # hasil render (mp4 + poster)
```
