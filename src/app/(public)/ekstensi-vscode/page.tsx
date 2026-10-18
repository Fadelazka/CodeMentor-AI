import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Download,
  FileDown,
  FolderOpen,
  HardDrive,
  Monitor,
  Puzzle,
  Wifi,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/components/ui/section-title";

export const metadata: Metadata = {
  title: "Ekstensi VS Code",
  description:
    "Unduh ekstensi CodeMentor AI untuk Visual Studio Code beserta panduan instalasinya: download file .vsix, buka VS Code, lalu Install from VSIX.",
};

// File statis di folder public/ (dibuat pada tahap packaging).
const VSIX_PATH = "/codementor-ai-extension.vsix";

const langkahInstalasi = [
  {
    icon: FileDown,
    judul: "Unduh file ekstensi",
    detail:
      "Klik tombol Download Ekstensi (.vsix). Simpan file codementor-ai-extension.vsix di komputer Anda.",
  },
  {
    icon: Monitor,
    judul: "Buka Visual Studio Code",
    detail:
      "Jalankan VS Code, lalu buka panel Extensions dengan Ctrl+Shift+X (Windows/Linux) atau Cmd+Shift+X (macOS).",
  },
  {
    icon: Puzzle,
    judul: "Pilih Install from VSIX",
    detail:
      "Di bagian atas panel Extensions, klik ikon titik tiga lalu pilih Install from VSIX...",
  },
  {
    icon: FolderOpen,
    judul: "Pilih file, selesai",
    detail:
      "Arahkan ke file .vsix yang tadi diunduh. Setelah terpasang, ikon CodeMentor AI muncul di Activity Bar.",
  },
];

const spesifikasi = [
  { icon: Cpu, label: "Kompatibilitas", nilai: "VS Code 1.80+" },
  { icon: HardDrive, label: "Ukuran file", nilai: "< 1 MB" },
  { icon: Wifi, label: "Mode", nilai: "Live (API Vercel)" },
];

const termasuk = [
  "Panel chat di Activity Bar, mirip Blackbox AI",
  "Tema gelap khas CodeMentor AI",
  "Kode dari editor otomatis jadi konteks analisis",
  "Ringan, tanpa dependency tambahan di web",
];

export default function EkstensiVSCodePage() {
  return (
    <div>
      <section className="section-padding border-b border-border">
        <div className="container-editorial text-center">
          <Eyebrow index="[01]" label="EKSTENSI VS CODE" className="justify-center" />
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Bawa CodeMentor AI ke <span className="text-accent">VS Code Anda</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Jelaskan error kode dalam Bahasa Indonesia langsung dari editor favorit
            Anda. Instal dalam hitungan menit lewat file <code>.vsix</code> — tanpa
            perlu mengubah pengaturan project Anda.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={VSIX_PATH}
              download
              className="btn-primary"
              aria-label="Download ekstensi CodeMentor AI (.vsix)"
            >
              <Download className="h-4 w-4" /> Download Ekstensi (.vsix)
            </a>
            <Link href="/cara-kerja" className="btn-secondary">
              Lihat Cara Kerja <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Gratis · v0.2.1 · VS Code 1.80+
          </p>
        </div>
      </section>

      <section className="section-padding border-b border-border">
        <div className="container-editorial">
          <SectionTitle
            eyebrow="PANDUAN INSTALASI"
            title="Empat Langkah, Selesai"
            description="Ikuti urutan berikut untuk memasang ekstensi secara manual (Install from VSIX)."
            center
          />

          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {langkahInstalasi.map((langkah, index) => (
              <div key={langkah.judul} className="bg-background p-8">
                <span className="mb-6 inline-block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Langkah {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mb-6 flex h-12 w-12 items-center justify-center">
                  <langkah.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-display text-base font-bold">{langkah.judul}</h3>
                <p className="text-sm text-muted-foreground">{langkah.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-border">
        <div className="container-editorial">
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            <div className="bg-background p-8">
              <SectionTitle
                eyebrow="DI DALAM EKSTENSI"
                title="Yang Anda Dapatkan"
                description="UI ringan dengan HTML/CSS vanilla agar tidak membebani VS Code."
              />
              <ul className="space-y-3">
                {termasuk.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background p-8">
              <SectionTitle
                eyebrow="SPESIFIKASI"
                title="Detail Teknis"
                description="Informasi singkat sebelum memasang."
              />
              <dl className="space-y-4">
                {spesifikasi.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 border-b border-border pb-4"
                  >
                    <dt className="flex items-center gap-3 text-sm text-muted-foreground">
                      <item.icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                      {item.label}
                    </dt>
                    <dd className="font-mono text-xs text-foreground">{item.nilai}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-xs text-muted-foreground">
                Catatan: versi <span className="font-mono">0.2.1</span> sudah terhubung
                langsung ke API CodeMentor AI (Groq), sehingga analisis error muncul
                real-time di panel chat. Kode dari editor aktif otomatis dipakai sebagai
                konteks analisis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-editorial text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Siap mencoba di editor Anda?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Unduh ekstensinya, pasang lewat Install from VSIX, lalu mulai jelajahi panel
            CodeMentor AI di VS Code.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={VSIX_PATH} download className="btn-primary">
              <Download className="h-4 w-4" /> Download Ekstensi (.vsix)
            </a>
            <Link href="/fitur" className="btn-secondary">
              Jelajahi Fitur Web <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
