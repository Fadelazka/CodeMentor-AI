import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Wordmark } from "@/components/ui/wordmark";
import { ReplayIntroButton } from "@/components/intro/replay-intro-button";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/landing/animations";
import { UnderlineLink, SocialIconLink } from "@/components/ui/micro-interactions";

const footerLinks = {
  Produk: [
    { label: "Fitur", href: "/fitur" },
    { label: "Cara Kerja", href: "/cara-kerja" },
    { label: "Bahasa Didukung", href: "/bahasa" },
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: "Ekstensi VS Code", href: "/ekstensi-vscode" },
  ],
  Aplikasi: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Chat AI", href: "/chat" },
    { label: "Riwayat", href: "/riwayat" },
    { label: "Admin", href: "/admin" },
  ],
  Proyek: [
    { label: "Dokumentasi", href: "/dokumentasi" },
    { label: "Overview", href: "/project/overview" },
    { label: "Jadwal", href: "/project/jadwal" },
    { label: "Anggaran", href: "/project/anggaran" },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <div className="container-editorial py-16">
        <StaggerContainer className="grid gap-12 lg:grid-cols-5">
          <StaggerItem className="lg:col-span-2">
            <Wordmark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              AI mentor pemrograman yang menjelaskan error kode dalam Bahasa
              Indonesia. Membantu mahasiswa memahami dan memperbaiki error kode
              secara mandiri, 24/7.
            </p>
            <div className="mt-6 flex gap-2">
              <SocialIconLink href="#" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </SocialIconLink>
              <SocialIconLink href="#" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </SocialIconLink>
              <SocialIconLink href="#" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialIconLink>
              <SocialIconLink href="mailto:halo@codementor.ai" aria-label="Email">
                <Mail className="h-4 w-4" />
              </SocialIconLink>
            </div>
          </StaggerItem>

          {Object.entries(footerLinks).map(([title, links]) => (
            <StaggerItem key={title}>
              <h3 className="kicker mb-5">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <UnderlineLink
                      href={link.href}
                      lineClassName="bg-foreground"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </UnderlineLink>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 TIM CODEMENTOR AI — MP-TI/CMAI/2026/001
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            AKURASI ≥85% · UAT ≥80% · RESPONS &lt;5S
          </p>
        </FadeUp>

        <div className="flex justify-center pt-4">
          <ReplayIntroButton />
        </div>
      </div>
    </footer>
  );
}
