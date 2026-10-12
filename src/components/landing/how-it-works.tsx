import { Code, Search, BookOpen, Sparkles, ThumbsUp } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FadeUp, FadeRight, StaggerContainer, StaggerItem } from "@/components/landing/animations";

const langkah = [
  { icon: Code, step: "01", title: "Tempel atau Tulis Kode", desc: "Tulis kode langsung di VS Code atau tempel pada editor di web CodeMentor AI." },
  { icon: Search, step: "02", title: "Jelaskan Error", desc: "Klik 'Jelaskan Error' atau biarkan ekstensi mendeteksi error saat mengetik." },
  { icon: BookOpen, step: "03", title: "AI Menganalisis", desc: "CodeMentor AI memproses kode dengan RAG + Groq Llama 3.1, mencocokkan knowledge base 200+ error." },
  { icon: Sparkles, step: "04", title: "Dapatkan Penjelasan", desc: "Penjelasan error dalam Bahasa Indonesia, lengkap dengan penyebab, cara perbaikan, dan contoh kode." },
  { icon: ThumbsUp, step: "05", title: "Belajar & Evaluasi", desc: "Pelajari materi rekomendasi, simpan riwayat, dan beri feedback untuk membantu AI semakin cerdas." },
];

export function HowItWorks() {
  return (
    <section className="section-padding border-b border-border">
      <div className="container-editorial">
        <FadeUp>
          <Eyebrow index="[05]" label="CARA KERJA" />
        </FadeUp>
        <FadeRight>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Dari Error ke Paham dalam 5 Langkah
          </h2>
        </FadeRight>

        <StaggerContainer className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
          {langkah.map((item) => (
            <StaggerItem key={item.step} lift className="relative bg-background p-6">
              <div className="mb-8 flex items-center justify-between">
                <item.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                <span className="font-mono text-sm text-accent">{item.step}</span>
              </div>
              <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide">{item.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
