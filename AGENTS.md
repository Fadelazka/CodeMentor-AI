# CodeMentor AI — Instruksi Agen

Aturan lengkap ada di [`.opencode/rules.md`](./.opencode/rules.md). **Wajib dibaca dan dipatuhi untuk setiap perubahan kode di project ini.**

## Ringkasan Wajib
- ❌ Jangan menghapus/menimpa fitur, komponen UI, route API, atau skema DB yang sudah ada kecuali diminta eksplisit.
- ❌ Jangan mengubah file yang tidak diminta.
- ❌ Jangan berasumsi — baca file dulu sebelum mengubah.
- ❌ Jangan ubah `prisma/schema.prisma` kecuali diminta eksplisit.
- ✅ Sebelum mengubah kode: jelaskan rencana, lalu tunggu konfirmasi.
- ✅ Setelah mengubah: beri ringkasan perubahan (file + baris).
- ✅ Jika mengubah schema Prisma: ingatkan untuk menjalankan `npx prisma generate` dan `npx prisma db push`.
- ✅ Terminal: jangan pakai `2>&1`, `&&`, `||`; gunakan `;` untuk multi-command.
- ✅ Jawab dalam Bahasa Indonesia; perintah terminal ditulis dalam blok kode.

Tech stack: Next.js 14 (App Router) · TypeScript · Prisma · PostgreSQL · NextAuth · Tailwind CSS.
