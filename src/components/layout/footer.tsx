import Link from "next/link";
import { Code2, Github, Twitter, Linkedin, Mail, Shield, BadgeCheck } from "lucide-react";

const footerLinks = {
  Produk: [
    { label: "Fitur", href: "/fitur" },
    { label: "Cara Kerja", href: "/cara-kerja" },
    { label: "Bahasa Didukung", href: "/bahasa" },
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: "Ekstensi VS Code", href: "/fitur#vscode" },
  ],
  Perusahaan: [
    { label: "Dokumentasi", href: "/dokumentasi" },
    { label: "Tim Proyek", href: "/project/tim" },
    { label: "Kontrak", href: "/project/charter" },
    { label: "Risiko", href: "/project/risiko" },
  ],
  "Sumber Daya": [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Chat AI", href: "/chat" },
    { label: "Riwayat", href: "/riwayat" },
    { label: "Admin", href: "/admin" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="container-custom py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Code<span className="text-gradient">Mentor</span> AI
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              AI mentor pemrograman yang menjelaskan error kode dalam Bahasa
              Indonesia. Membantu mahasiswa memahami dan memperbaiki error kode
              secara mandiri, 24/7.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:halo@codementor.ai" className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            © 2026 Tim CodeMentor AI. Kontrak MP-TI/CMAI/2026/001
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
            <BadgeCheck className="h-4 w-4" />
            <span>Akurasi ≥85%</span>
            <span className="mx-1">•</span>
            <Shield className="h-4 w-4" />
            <span>Keamanan Terjamin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}