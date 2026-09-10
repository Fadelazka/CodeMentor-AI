# CodeMentor AI

> **AI Mentor Pemrograman untuk Mahasiswa Indonesia**
> Kontrak: **MP-TI/CMAI/2026/001** | Versi dokumen: **1.0**
> Periode proyek: **1 September 2026 – 15 Desember 2026**

CodeMentor AI adalah platform yang menjelaskan error kode pemrograman dalam
Bahasa Indonesia secara real-time, tersedia sebagai **ekstensi VS Code** dan
**aplikasi web**, dengan dukungan 5 bahasa pemrograman (Python, JavaScript,
Java, C++, PHP) dan knowledge base 200+ error.

---

## 📁 Struktur Folder

```
codementor-ai/
├── middleware.ts                    # Proteksi route (app)
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── prisma/
│   ├── schema.prisma                # Model User, ChatHistory, KnowledgeBase
│   └── seed.ts                      # Seed knowledge base 200+ error
└── src/
    ├── app/
    │   ├── layout.tsx               # Root layout (metadata, provider)
    │   ├── globals.css              # Tailwind + CSS variables
    │   ├── (public)/                # Landing & halaman publik
    │   │   ├── page.tsx             # Landing page (hero, fitur, FAQ, dll)
    │   │   ├── fitur/page.tsx
    │   │   ├── cara-kerja/page.tsx
    │   │   ├── bahasa/page.tsx
    │   │   ├── knowledge-base/page.tsx        # Indeks 200+ pola error
    │   │   ├── knowledge-base/[language]/page.tsx
    │   │   ├── dokumentasi/page.tsx
    │   │   ├── masuk/page.tsx
    │   │   └── daftar/page.tsx
    │   ├── (app)/                   # Web app (protected)
    │   │   ├── dashboard/page.tsx
    │   │   ├── chat/page.tsx
    │   │   ├── riwayat/page.tsx
    │   │   └── admin/page.tsx
    │   ├── project/                 # Dokumentasi proyek
    │   │   ├── overview/page.tsx
    │   │   ├── charter/page.tsx
    │   │   ├── wbs/page.tsx
    │   │   ├── jadwal/page.tsx
    │   │   ├── anggaran/page.tsx
    │   │   ├── risiko/page.tsx
    │   │   ├── raci/page.tsx
    │   │   └── tim/page.tsx
    │   └── api/                     # API routes
    │       ├── chat/route.ts        # POST analisis error (Groq + RAG)
    │       ├── history/route.ts     # GET/DELETE riwayat
    │       ├── admin/stats/route.ts
    │       ├── admin/knowledge-base/route.ts
    │       └── auth/[...nextauth]/route.ts
    ├── components/
    │   ├── layout/                  # Navbar, Footer, AppSidebar
    │   ├── landing/                 # Hero, Fitur, FAQ, CTA, dll
    │   ├── chat/                    # CodeEditor (CodeMirror), ChatInterface
    │   ├── dashboard/               # StatCard, Charts, Rekomendasi
    │   ├── admin/                   # AdminCharts
    │   ├── ui/                      # Button, Card, Input, Badge, dll
    │   └── providers/               # ThemeProvider, ToastProvider
    ├── data/                        # Mock data (mock.ts, project-docs.ts, admin.ts, knowledge-base.ts)
    ├── lib/                         # utils, prisma, auth, ai (RAG+Groq)
    └── types/
```

Pendukung kualitas & penerapan:
```
├── vitest.config.ts                # Konfigurasi Vitest (alias @ → src)
├── Dockerfile                      # Image produksi multi-stage (standalone)
├── docker-compose.yml              # app + PostgreSQL 16 + healthcheck
├── .dockerignore
├── .eslintrc.json                  # ESLint next/core-web-vitals
└── .github/workflows/ci.yml        # CI: lint, typecheck, test, build
```

---

## 🚀 Menjalankan Proyek

### Prasyarat
- Node.js ≥ 18.x
- PostgreSQL (untuk fitur database; opsional untuk preview statis)

### 1. Install dependensi

```bash
npm install
```

### 2. Konfigurasi environment

Salin isi `.env.local` dan sesuaikan:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/codementor_ai"
NEXTAUTH_SECRET="ganti-dengan-rahasia-aman"
NEXTAUTH_URL="http://localhost:3000"
GROQ_API_KEY="ganti-dengan-api-key-groq-anda"
```

> **Catatan:** Tanpa `GROQ_API_KEY`, API chat tetap berfungsi dalam **mode demo**
> (fallback ke jawaban dari knowledge base). Tanpa PostgreSQL, halaman statis
> tetap tampil; route API database akan mengembalikan pesan error.

### 3. (Opsional) Setup database & seed

```bash
npx prisma db push        # buat tabel dari schema
npx prisma db seed        # isi knowledge base 200+ error
npx prisma studio         # (opsional) browser database
```

Atau via npm: `npm run db:push`, `npm run db:seed`, `npm run db:studio`.

### 4. Jalankan development server

```bash
npm run dev
```

Buka **http://localhost:3000**.

### 5. Build produksi

```bash
npm run build
npm start
```

---

## 🧪 Skrip yang Tersedia

| Skrip | Fungsi |
|---|---|
| `npm run dev` | Development server (HMR) |
| `npm run build` | Build produksi |
| `npm run start` | Jalankan build produksi |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm test` | Jalankan unit & integration test (Vitest) |
| `npm run test:watch` | Test mode watch |
| `npm run test:coverage` | Test dengan laporan coverage |
| `npm run db:push` | Sinkronkan schema Prisma ke database |
| `npm run db:seed` | Seed knowledge base |
| `npm run db:studio` | Prisma Studio |

---

## 🧪 Testing

Suite dijalankan dengan **Vitest** (31 test) tanpa membutuhkan database atau
kunci API — Prisma dimock dan chat berjalan dalam mode demo.

```bash
npm test            # eksekusi sekali
npm run test:watch  # mode watch
```

Cakupan:

| File | Jenis | Isi |
|---|---|---|
| `src/lib/utils.test.ts` | unit | `cn`, `formatRupiah`, `formatDate`, `truncate`, `getLanguageLabel` |
| `src/lib/ai.test.ts` | unit | skor RAG `retrieveRelevantErrors`, fallback `generateExplainationWithGroq` |
| `src/app/api/chat/route.test.ts` | integration | validasi 400, jawaban KB mode demo, toleransi penyimpanan riwayat |
| `src/app/api/admin/stats/route.test.ts` | integration | statistik lengkap + fallback graceful `dbTersedia=false` |

---

## 🐳 Docker

### Docker Compose (app + PostgreSQL)

```bash
docker compose up --build
```

Buka **http://localhost:3000**. Service `db` menjalankan PostgreSQL 16 dengan
healthcheck; `app` menunggu database sehat sebelum start. Atur `DATABASE_URL`
otomatis ke host `db`. Kredensial dapat diganti lewat variabel env
(`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `NEXTAUTH_SECRET`,
`GROQ_API_KEY`); nilai default sudah aman untuk pengembangan.

```bash
docker compose exec app npx prisma db push
```

### Build image secara manual

```bash
docker build -t codementor-ai:latest .
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://... \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e NEXTAUTH_SECRET=... \
  codementor-ai:latest
```

> Image memakai `output: "standalone"` (hasil build Next.js yang ringan) dan
> menyertakan client + engine Prisma agar RAG bekerja di produksi.

---

## ⚙️ CI/CD (GitHub Actions)

Di `.github/workflows/ci.yml`, alur `ci` berjalan pada push ke `main`/`develop`
dan setiap pull request:

1. `npm ci`
2. `npx prisma generate`
3. `npm run typecheck`
4. `npm run lint`
5. `npm test`
6. `npm run build`

Tidak ada database/kunci API yang dibutuhkan di CI (route API DB sudah
menangani kegagalan koneksi secara graceful).

---

## 🧭 Navigasi Halaman

### Publik
| Route | Konten |
|---|---|
| `/` | Hero, masalah & solusi, fitur, cara kerja, bahasa, metrik, testimoni, FAQ, CTA |
| `/fitur` | Detail fitur, perbandingan VS Code vs web |
| `/cara-kerja` | Alur RAG + Llama 3.1, teknologi, langkah penggunaan |
| `/bahasa` | 5 bahasa + contoh error |
| `/knowledge-base` | Indeks 200+ pola error + pencarian & filter tingkat kesulitan |
| `/knowledge-base/python` dsb. | Detail pola error per bahasa (SSG) |
| `/dokumentasi` | Index seluruh dokumen proyek |
| `/masuk`, `/daftar` | Autentikasi |

### Web App (dilindungi middleware — redirect ke `/masuk`)
| Route | Konten |
|---|---|
| `/dashboard` | Statistik, chart penggunaan, rekomendasi belajar, aktivitas |
| `/chat` | Editor kode (CodeMirror), dropdown bahasa, analisis AI, confidence, feedback |
| `/riwayat` | Riwayat analisis + filter & pencarian |
| `/admin` | KPI, tren penggunaan, performa AI, top error, CRUD knowledge base |

### Dokumentasi Proyek
| Route | Konten |
|---|---|
| `/project/overview` | Ringkasan, tujuan, scope |
| `/project/charter` | Dokumen kontrak MP-TI/CMAI/2026/001 |
| `/project/wbs` | 10 fase, 36 deliverables |
| `/project/jadwal` | Gantt chart 16 minggu + milestones |
| `/project/anggaran` | Rincian Rp194.700.000 |
| `/project/risiko` | Risk matrix + 7 risiko |
| `/project/raci` | Matriks RACI 8 peran |
| `/project/tim` | Struktur tim 10 anggota |

---

## 🔌 API Routes

### `POST /api/chat`
Analisis error kode. Gunakan RAG → retrieval knowledge base → generasi Groq Llama 3.1.
```json
{
  "sourceCode": "print(10/0)",
  "language": "python",
  "errorMessage": "ZeroDivisionError"
}
```
Response: `{ explanation (markdown), confidence, mock, ragMatches }`

### `GET /api/history?language=&limit=`
Ambil riwayat analisis.

### `GET /api/admin/stats`
KPI, penggunaan per bahasa & per bulan. Bila database tidak dapat dijangkau,
response tetap `200` dengan `dbTersedia: false` dan data kosong (tidak error 500).

### `GET|POST|PUT|DELETE /api/admin/knowledge-base`
Kelola rekaman knowledge base.

---

## 🗂 Data Utama Proyek

| Item | Nilai |
|---|---|
| Nomor kontrak | MP-TI/CMAI/2026/001 |
| Project Manager | Rafi Ade Nurcahya, Fadhel Muhammad Azka Islamy |
| Sponsor | Darmawan Lahru Riatma, S.Kom., M.MT. |
| Periode | 1 Sep – 15 Des 2026 (16 minggu) |
| Total anggaran | Rp194.700.000 |
| KPI | Akurasi ≥85%, respons <5 detik, UAT ≥80%, penurunan tanya ≥30% |
| Scope | VS Code ext., web app, KB 200+ error 5 bahasa, RAG, dashboard admin |

---

## 🛠 Stack Teknologi

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn-style UI, Framer Motion, Lucide
- **Editor:** CodeMirror 6 (`@uiw/react-codemirror`) untuk 5 bahasa
- **Chart:** Recharts
- **Database:** PostgreSQL + Prisma
- **Auth:** NextAuth.js
- **AI:** Groq API (Llama 3.1) + RAG
- **Deployment:** Vercel + Neon/Supabase

---

© 2026 **Tim CodeMentor AI** — Tugas Manajemen Proyek Teknologi Informasi.