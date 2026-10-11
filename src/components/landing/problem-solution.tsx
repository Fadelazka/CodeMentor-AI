import { AlertCircle, HelpCircle, Users, Lightbulb, CheckCircle2, ArrowDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";

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
    <section className="section-padding border-b border-border">
      <div className="container-editorial">
        <Eyebrow index="[02]" label="MASALAH" />

        <div className="mb-12 mt-5 max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Belajar Pemrograman Sering Terhambat oleh Error
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Selama ini, mahasiswa terjebak di tengah-tengah: kode error, tapi
            tidak tahu harus mulai dari mana untuk memperbaikinya.
          </p>
        </div>

        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {masalah.map((item, i) => (
            <div key={item.title} className="bg-background p-8">
              <p className="kicker mb-8">
                <span className="text-accent">M-{String(i + 1).padStart(2, "0")}</span>
              </p>
              <item.icon className="mb-4 h-6 w-6 text-accent" strokeWidth={1.5} />
              <h3 className="mb-2 font-display text-lg font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="h-px w-16 bg-border" />
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
            <span className="h-px w-16 bg-border" />
          </div>
          <Eyebrow index="[03]" label="SOLUSI KAMI" className="justify-center" />

          <div className="grid w-full gap-px border border-border bg-border md:grid-cols-3">
            {solusi.map((item, i) => (
              <div key={item.title} className="bg-background p-8">
                <p className="kicker mb-8">
                  <span className="text-accent">S-{String(i + 1).padStart(2, "0")}</span>
                </p>
                <item.icon className="mb-4 h-6 w-6 text-foreground" strokeWidth={1.5} />
                <h3 className="mb-2 font-display text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}