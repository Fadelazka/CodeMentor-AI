import Link from "next/link";
import { ArrowRight, Download, Code2 } from "lucide-react";

export function CTA() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-8 py-16 text-center text-white sm:px-16">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <Code2 className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Mulai Pahami Error Kode Anda Hari Ini
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
              Bergabunglah dengan ribuan mahasiswa yang sudah terbantu memahami
              error kode mereka dalam Bahasa Indonesia.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/daftar"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold text-blue-700 shadow-lg transition-all hover:bg-blue-50 sm:w-auto"
              >
                Daftar Gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/fitur#vscode"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20 sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Install Ekstensi VS Code
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              Gratis untuk mahasiswa • Tanpa kartu kredit • Setup dalam 2 menit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}