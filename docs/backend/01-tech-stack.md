# 1. Instalasi Tech Stack Utama

## Tech Stack Terpilih: JavaScript / Node.js / Next.js 14

Dari 3 opsi dosen, CodeMentor AI memilih **Node.js + Next.js 14**:

| Opsi | Status | Alasan |
|---|---|---|
| **Node/Next.js** | ✅ Dipilih | Sudah dipakai, TypeScript full-stack, App Router = backend langsung |
| PHP (Laravel) | ❌ | Butuh runtime terpisah, tidak efisien untuk SPA |
| Python (FastAPI/Flask) | ❌ | Sudah ada ML offline terpisah, backend tetap Node |

## Instalasi Step-by-Step

### A. Node.js — Runtime

**Versi:** Node.js 20 LTS atau lebih baru

```bash
# Cek versi
node -v      # v20.x
npm -v       # 10.x
```

Install: Download dari https://nodejs.org → pilih LTS → install → restart terminal.

### B. Next.js 14 — Framework Backend + Frontend

```bash
# Cek versi (sudah terpasang)
cd CodeMentor-AI
npm list next
```

Install kalau belum:

```bash
npx create-next-app@latest codementor-ai --typescript --tailwind --app
```

### C. Prisma — ORM

```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

### D. PostgreSQL — Database

Dev (Docker):

```bash
docker run --name codementor-pg ^
  -e POSTGRES_PASSWORD=password123 ^
  -e POSTGRES_DB=codementor ^
  -p 5432:5432 ^
  -d postgres:16
```

Production: Neon Serverless PostgreSQL (https://neon.tech)

### E. Library Pendukung

```bash
npm install next-auth @next-auth/prisma-adapter
npm install bcryptjs
npm install framer-motion lucide-react
npm install react-hot-toast
npm install groq-sdk
```

## Versi Terpakai

```bash
node -v
npm -v
npm list next
npm list prisma
```
