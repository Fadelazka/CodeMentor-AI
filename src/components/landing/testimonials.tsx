import { Eyebrow } from "@/components/ui/eyebrow";

const testimoni = [
  {
    nama: "Rizky Pratama",
    peran: "Mahasiswa Informatika, Semester 4",
    komentar:
      "Dulu saya bisa berjam-jam hanya untuk mencari tahu kenapa kode saya error. Sekarang dengan CodeMentor AI, langsung paham penyebab dan cara perbaikannya dalam Bahasa Indonesia.",
  },
  {
    nama: "Siti Nurhaliza",
    peran: "Mahasiswa Sistem Informasi, Semester 2",
    komentar:
      "Fitur rekomendasi materinya luar biasa! Setiap kali error, AI tidak cuma kasih solusi tapi juga merekomendasikan materi yang relevan. Belajar jadi lebih terarah.",
  },
  {
    nama: "Andi Wijaya",
    peran: "Asisten Dosen Algoritma",
    komentar:
      "Jumlah pertanyaan debugging dari mahasiswa turun drastis. CodeMentor AI benar-benar mengurangi beban saya sebagai asisten dosen.",
  },
];

export function Testimonials() {
  return (
    <section className="section-padding border-b border-border">
      <div className="container-editorial">
        <Eyebrow index="[07]" label="TESTIMONI" />
        <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Apa Kata Pengguna Kami
        </h2>

        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
          {testimoni.map((t) => (
            <div key={t.nama} className="flex flex-col bg-background p-8">
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.komentar}&rdquo;
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-display text-sm font-semibold">{t.nama}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{t.peran}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}