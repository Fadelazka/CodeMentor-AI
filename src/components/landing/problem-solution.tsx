import { AlertCircle, HelpCircle, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";

const masalah = [
  {
    icon: AlertCircle,
    title: "Kode error, tapi tidak paham kenapa",
    desc: "Mahasiswa tahu kode mereka error, tetapi tidak mengerti penyebab di baliknya. Pesan error teknis yang rumit membuat frustasi dan menghambat proses belajar.",
  },
  {
    icon: HelpCircle,
    title: "Pesan error terlalu teknis",
    desc: "Pesan error dalam bahasa Inggris dengan istilah teknis membingungkan, terutama untuk mahasiswa di awal perkuliahan.",
  },
  {
    icon: Users,
    title: "Dosen & asisten kewalahan",
    desc: "Banyaknya pertanyaan debugging yang berulang membuat dosen dan asisten kewalahan menjawab satu per satu.",
  },
];

const solusi = [
  {
    icon: Lightbulb,
    title: "Penjelasan real-time",
    desc: "Dapatkan penjelasan error secara instan saat coding, langsung di VS Code atau melalui aplikasi web.",
  },
  {
    icon: CheckCircle2,
    title: "Dalam Bahasa Indonesia",
    desc: "Penjelasan yang mudah dipahami dalam Bahasa Indonesia dengan contoh perbaikan yang konkret.",
  },
  {
    icon: Lightbulb,
    title: "Rekomendasi materi",
    desc: "CodeMentor AI merekomendasikan materi belajar yang relevan dengan error yang Anda hadapi.",
  },
];

export function ProblemSolution() {
  return (
    <section className="section-padding border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container-custom">
        <SectionTitle
          eyebrow="Masalah"
          title="Belajar Pemrograman Sering Terhambat oleh Error"
          description="Selama ini, mahasiswa terjebak di tengah-tengah: kode error, tapi tidak tahu harus mulai dari mana untuk memperbaikinya."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {masalah.map((item) => (
            <div key={item.title} className="card-custom p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                <item.icon className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-blue-500/50" />
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Solusi Kami
            </span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {solusi.map((item) => (
              <div key={item.title} className="rounded-xl border border-green-500/20 bg-gradient-to-b from-green-500/5 to-transparent p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                  <item.icon className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}