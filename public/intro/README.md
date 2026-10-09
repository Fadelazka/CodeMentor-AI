# Intro Video — CodeMentor AI

File final untuk video intro screen. Berkas di folder ini dihasilkan,
bukan diedit langsung. Ganti atau buat ulang melalui workflow di
`docs/INTRO_VIDEO_WORKFLOW.md`.

| Berkas                          | Kegunaan                          |
| ------------------------------- | --------------------------------- |
| `codementor-intro.mp4`          | Video intro (H.264, faststart)    |
| `codementor-intro-poster.jpg`   | Poster/thumbnail video            |
| `codementor-intro.webm`         | Fallback VP9 (opsional)           |

## Menghasilkan ulang

```bash
npm install --prefix video          # sekali saja
npm run intro:placeholder           # render Remotion + salin ke folder ini
```

## Validasi

```bash
npm run intro:validate
```

Sumber animasi ada di `video/` (proyek Remotion) — bukan di folder ini.