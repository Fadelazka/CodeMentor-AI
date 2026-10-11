import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export function CTA() {
  return (
    <section className="section-padding">
      <div className="container-editorial">
        <div className="bg-ink px-8 py-16 text-paper sm:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-6 font-mono text-xs uppercase tracking-wider text-paper/50">
              [09] MULAI SEKARANG
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Mulai Pahami Error Kode Anda Hari Ini
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-paper/60">
              Bergabunglah dengan ribuan mahasiswa yang sudah terbantu memahami
              error kode mereka dalam Bahasa Indonesia.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/daftar"
                className="inline-flex w-full items-center justify-center gap-2 bg-paper px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-paper/90 sm:w-auto"
              >
                Daftar Gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/fitur#vscode"
                className="inline-flex w-full items-center justify-center gap-2 border border-paper/20 px-8 py-4 text-sm font-semibold text-paper transition-colors hover:bg-paper/10 sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Install Ekstensi VS Code
              </Link>
            </div>
            <p className="mt-6 font-mono text-[11px] text-paper/40">
              GRATIS UNTUK MAHASISWA · TANPA KARTU KREDIT · SETUP DALAM 2 MENIT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}