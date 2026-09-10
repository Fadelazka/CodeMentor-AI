import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
      <body className={`${inter.className} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}