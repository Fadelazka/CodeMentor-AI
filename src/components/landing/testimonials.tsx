import { Star } from "lucide-react";

const testimoni = [
  {
    nama: "Rizky Pratama",
    peran: "Mahasiswa Informatika, Semester 4",
    komentar:
      "Dulu saya bisa berjam-jam hanya untuk mencari tahu kenapa kode saya error. Sekarang dengan CodeMentor AI, langsung paham penyebab dan cara perbaikannya dalam Bahasa Indonesia. Sangat membantu!",
    rating: 5,
  },
  {
    nama: "Siti Nurhaliza",
    peran: "Mahasiswa Sistem Informasi, Semester 2",
    komentar:
      "Fitur rekomendasi materinya luar biasa! Setiap kali error, AI tidak cuma kasih solusi tapi juga merekomendasikan materi yang relevan. Belajar jadi lebih terarah.",
    rating: 5,
  },
  {
    nama: "Andi Wijaya",
    peran: "Asisten Dosen Algoritma",
    komentar:
      "Jumlah pertanyaan debugging dari mahasiswa turun drastis. CodeMentor AI benar-benar mengurangi beban saya sebagai asisten dosen.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section-padding border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            Testimoni
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Apa Kata Pengguna Kami
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Kepuasan UAT ≥80% menjadi target kami, dan inilah yang pengguna rasakan.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimoni.map((t) => (
            <div
              key={t.nama}
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-dark-card"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                &ldquo;{t.komentar}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
                  {t.nama.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {t.nama}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.peran}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}