# 2. Struktur Repo Backend

## Repo: Monorepo (Frontend + Backend dalam satu project)

Repo: _(isi URL repository Git Anda di sini — mis. `https://github.com/<user>/codementor-ai`)_

> Catatan: repo ini adalah **monorepo** — frontend dan backend berada dalam satu repository yang sama.

Next.js App Router memungkinkan **backend (API Routes) dan frontend berada dalam satu repo** — tidak perlu repository terpisah.

## Kenapa Monorepo?

- ✅ Satu repo → satu pipeline deploy (Vercel)
- ✅ Frontend & backend berbagi tipe TypeScript (type-safe)
- ✅ DB schema (Prisma) & API dalam satu tempat
- ✅ Cocok untuk tim kecil (2 orang)

## Struktur Folder

```
codementor-ai/
├── prisma/
│   └── schema.prisma          # Skema database (User, ChatHistory, AppFeedback, dll)
├── src/
│   ├── app/
│   │   ├── (app)/             # Route group terproteksi (dashboard, chat, admin)
│   │   ├── (public)/          # Route group publik (landing, masuk, daftar, KB)
│   │   └── api/               # ✅ BACKEND — API Routes
│   │       ├── admin/
│   │       │   ├── knowledge-base/route.ts
│   │       │   ├── stats/route.ts
│   │       │   └── users/
│   │       │       ├── route.ts
│   │       │       └── [id]/route.ts
│   │       ├── chat/
│   │       │   ├── route.ts
│   │       │   └── feedback/route.ts
│   │       ├── history/
│   │       │   ├── route.ts
│   │       │   └── export/route.ts
│   │       ├── user/
│   │       │   ├── profile/route.ts
│   │       │   ├── avatar/route.ts
│   │       │   └── export/route.ts
│   │       ├── auth/
│   │       │   ├── [...nextauth]/route.ts
│   │       │   └── register/route.ts
│   │       └── feedback/route.ts
│   ├── components/            # Komponen UI (chat, layout, ui, knowledge-base)
│   ├── contexts/              # React contexts
│   └── lib/
│       ├── auth.ts            # Konfigurasi NextAuth
│       ├── prisma.ts          # Prisma client singleton
│       └── ai.ts              # Integrasi LLM (Groq)
├── docs/backend/              # ✅ DOKUMENTASI INI
└── package.json
```

## Konvensi Backend

- **Routing:** App Router berbasis folder → `src/app/api/[resource]/route.ts`
- **Method:** diekspor sebagai named function `export async function GET/POST/PATCH/DELETE`
- **Response:** `NextResponse.json({ ... }, { status })`
- **Auth:** `src/lib/auth.ts` (NextAuth) + `getServerSession`
- **DB:** Prisma singleton dari `src/lib/prisma.ts`
