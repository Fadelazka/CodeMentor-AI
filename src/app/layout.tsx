import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/providers/toast-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { IntroProvider } from "@/components/intro/intro-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "CodeMentor AI - AI Mentor Pemrograman untuk Mahasiswa Indonesia",
    template: "%s | CodeMentor AI",
  },
  description:
    "CodeMentor AI adalah AI mentor pemrograman yang menjelaskan error kode dalam Bahasa Indonesia. Tersedia sebagai ekstensi VS Code dan aplikasi web. Mendukung Python, JavaScript, Java, C++, dan PHP.",
  keywords: [
    "AI mentor",
    "debugging",
    "penjelasan error",
    "VS Code extension",
    "belajar pemrograman",
    "Bahasa Indonesia",
    "Python",
    "JavaScript",
    "Java",
    "C++",
    "PHP",
  ],
  openGraph: {
    title: "CodeMentor AI - AI Mentor Pemrograman",
    description:
      "Jelaskan error kode Anda dalam Bahasa Indonesia. Tersedia di VS Code dan web.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans`}
      >
        <SessionProvider>
          <ToastProvider>
            <IntroProvider>{children}</IntroProvider>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}