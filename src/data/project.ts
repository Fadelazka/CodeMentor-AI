export const projectInfo = {
  nama: "CodeMentor AI",
  kode: "MP-TI/CMAI/2026/001",
  versi: "1.0",
  periode: {
    mulai: "1 September 2026",
    selesai: "15 Desember 2026",
    hari: 106,
  },
  anggaran: 194700000,
  projectManager: "Fadhel Muhammad Azka Islamy",
  projectSponsor: "Darmawan Lahru Riatma, S.Kom., M.MT.",
  status: "Berlangsung",
};

export const companyProfile = {
  nama: "CodeMentor AI",
  tagline: "AI Mentor Pemrograman untuk Mahasiswa Indonesia",
  visi:
    "Menjadi solusi cerdas berbasis AI yang membantu mahasiswa Indonesia memahami dan memperbaiki error pemrograman secara mandiri dan efektif.",
  misi: [
    "Menyediakan penjelasan error real-time dalam Bahasa Indonesia",
    "Membangun knowledge base error pemrograman terlengkap untuk mahasiswa",
    "Mendukung 5 bahasa pemrograman utama: Python, JavaScript, Java, C++, PHP",
    "Mengintegrasikan teknologi RAG untuk akurasi penjelasan yang tinggi",
    "Tersedia sebagai ekstensi VS Code dan aplikasi web",
  ],
  masalah:
    "Mahasiswa sering kali mengetahui bahwa kode mereka mengandung error, tetapi tidak memahami penyebab pasti error tersebut dan bagaimana cara memperbaikinya. Dokumentasi error dalam Bahasa Inggris sulit dipahami, dan mentor manusia tidak selalu tersedia.",
  solusi:
    "CodeMentor AI menawarkan penjelasan error real-time langsung di VS Code dan aplikasi web, dengan teknologi RAG (Retrieval-Augmented Generation) dan knowledge base 200+ error umum. Mendukung 5 bahasa pemrograman dengan akurasi ≥85% dan respons <5 detik.",
  fitur: [
    "Penjelasan Error Real-Time: Analisis dan penjelasan error langsung saat kode ditulis",
    "Ekstensi VS Code: Terintegrasi langsung di lingkungan pengembangan",
    "Aplikasi Web: Akses mandiri tanpa perlu ekstensi VS Code",
    "Knowledge Base 200+ Error: Database error umum dengan solusi terbukti",
    "5 Bahasa Pemrograman: Python, JavaScript, Java, C++, PHP",
    "Bahasa Indonesia: Semua penjelasan dalam Bahasa Indonesia",
  ],
  target: [
    { label: "Akurasi Penjelasan", value: "≥85%", deskripsi: "Tingkat akurasi penjelasan error" },
    { label: "Waktu Respons", value: "<5 detik", deskripsi: "Kecepatan respons AI" },
    { label: "Kepuasan UAT", value: "≥80%", deskripsi: "Tingkat kepuasan pengguna akhir" },
  ],
};

export interface WBSItem {
  id: string;
  nama: string;
  durasi: string;
  status: string;
  persentase: number;
}

export const wbs: WBSItem[] = [
  { id: "WBS-01", nama: "Inisialisasi & Perencanaan Proyek", durasi: "1-15 Sep 2026", status: "Selesai", persentase: 100 },
  { id: "WBS-02", nama: "Analisis Kebutuhan & Spesifikasi", durasi: "16-30 Sep 2026", status: "Selesai", persentase: 100 },
  { id: "WBS-03", nama: "Desain UI/UX & Arsitektur Sistem", durasi: "1-15 Okt 2026", status: "Berlangsung", persentase: 75 },
  { id: "WBS-04", nama: "Pengembangan Backend & AI Engine", durasi: "16 Okt-15 Nov 2026", status: "Berlangsung", persentase: 40 },
  { id: "WBS-05", nama: "Pengembangan Frontend & VS Code Extension", durasi: "16 Okt-15 Nov 2026", status: "Berlangsung", persentase: 35 },
  { id: "WBS-06", nama: "Pengisian Knowledge Base & RAG", durasi: "16-30 Nov 2026", status: "Belum Dimulai", persentase: 0 },
  { id: "WBS-07", nama: "Pengujian & QA", durasi: "1-10 Des 2026", status: "Belum Dimulai", persentase: 0 },
  { id: "WBS-08", nama: "Deployment & Pelatihan", durasi: "11-15 Des 2026", status: "Belum Dimulai", persentase: 0 },
];

export interface BudgetItem {
  kategori: string;
  item: string;
  nominal: number;
  keterangan: string;
}

export const budget: BudgetItem[] = [
  { kategori: "Sumber Daya Manusia", item: "Tim Pengembangan (7 orang)", nominal: 98000000, keterangan: "Gaji/honor selama proyek" },
  { kategori: "Sumber Daya Manusia", item: "Konsultan AI/ML", nominal: 25000000, keterangan: "Konsultasi arsitektur AI" },
  { kategori: "Infrastruktur", item: "Cloud Server (AWS/GCP)", nominal: 18000000, keterangan: "Hosting & komputasi AI" },
  { kategori: "Infrastruktur", item: "Database PostgreSQL", nominal: 5000000, keterangan: "Lisensi database" },
  { kategori: "Perangkat Lunak", item: "API Keys & Layanan AI", nominal: 12000000, keterangan: "OpenAI/LLM API" },
  { kategori: "Perangkat Lunak", item: "GitHub Copilot / Tools", nominal: 3700000, keterangan: "Lisensi pengembangan" },
  { kategori: "Pengujian", item: "User Acceptance Testing", nominal: 8000000, keterangan: "Sesi UAT & insentif" },
  { kategori: "Lainnya", item: "Dokumentasi & Pelatihan", nominal: 7000000, keterangan: "Material pelatihan" },
  { kategori: "Lainnya", item: "Manajemen & Kontingensi", nominal: 18000000, keterangan: "Buffer & manajemen" },
];

export const teamMembers = [
  {
    nama: "Darmawan Lahru Riatma, S.Kom., M.MT.",
    role: "Project Sponsor",
    tanggungJawab: "Menyediakan dukungan strategis, approve milestone, dan review akhir",
    avatar: "DL",
    warna: "bg-purple-500",
  },
  {
    nama: "Fadhel Muhammad Azka Islamy",
    role: "Project Manager",
    tanggungJawab: "Mengelola jadwal, anggaran, risiko, dan koordinasi seluruh tim",
    avatar: "FA",
    warna: "bg-blue-500",
  },
  {
    nama: "Tim Business Analyst",
    role: "Business Analyst",
    tanggungJawab: "Analisis kebutuhan pengguna, requirement gathering, dan validasi solusi",
    avatar: "BA",
    warna: "bg-green-500",
  },
  {
    nama: "Tim UI/UX Designer",
    role: "UI/UX Designer",
    tanggungJawab: "Merancang antarmuka pengguna, wireframe, prototipe, dan desain responsif",
    avatar: "UX",
    warna: "bg-pink-500",
  },
  {
    nama: "Tim Backend Developer",
    role: "Backend Developer",
    tanggungJawab: "Mengembangkan API, integrasi AI/RAG, database, dan server",
    avatar: "BE",
    warna: "bg-orange-500",
  },
  {
    nama: "Tim AI Engineer",
    role: "AI/ML Engineer",
    tanggungJawab: "Membangun model AI, knowledge base, RAG pipeline, dan optimasi akurasi",
    avatar: "AI",
    warna: "bg-violet-500",
  },
  {
    nama: "Tim Frontend Developer",
    role: "Frontend Developer",
    tanggungJawab: "Membangun antarmuka web, VS Code extension, dan integrasi API",
    avatar: "FE",
    warna: "bg-cyan-500",
  },
  {
    nama: "Tim QA Engineer",
    role: "QA Engineer",
    tanggungJawab: "Pengujian fungsional, performa, keamanan, dan koordinasi UAT",
    avatar: "QA",
    warna: "bg-red-500",
  },
];

export interface RACIRole {
  role: string;
  huruf: string;
}

export interface RACITask {
  tugas: string;
  responsibilities: Record<string, string>;
}

export const raciMatrix: RACITask[] = [
  {
    tugas: "Penyusunan Dokumen Proyek",
    responsibilities: {
      "Project Sponsor": "C", "Project Manager": "R", "BA": "A", "UI/UX": "I", "Backend": "I", "AI Eng": "I", "Frontend": "I", "QA": "I",
    },
  },
  {
    tugas: "Analisis Kebutuhan",
    responsibilities: {
      "Project Sponsor": "I", "Project Manager": "A", "BA": "R", "UI/UX": "C", "Backend": "C", "AI Eng": "C", "Frontend": "I", "QA": "I",
    },
  },
  {
    tugas: "Desain UI/UX",
    responsibilities: {
      "Project Sponsor": "I", "Project Manager": "A", "BA": "C", "UI/UX": "R", "Backend": "I", "AI Eng": "I", "Frontend": "C", "QA": "I",
    },
  },
  {
    tugas: "Pengembangan Backend & API",
    responsibilities: {
      "Project Sponsor": "I", "Project Manager": "A", "BA": "I", "UI/UX": "I", "Backend": "R", "AI Eng": "C", "Frontend": "I", "QA": "C",
    },
  },
  {
    tugas: "Pembangunan Model AI & RAG",
    responsibilities: {
      "Project Sponsor": "I", "Project Manager": "A", "BA": "C", "UI/UX": "I", "Backend": "C", "AI Eng": "R", "Frontend": "I", "QA": "I",
    },
  },
  {
    tugas: "Pengembangan Frontend & VS Code Extension",
    responsibilities: {
      "Project Sponsor": "I", "Project Manager": "A", "BA": "I", "UI/UX": "C", "Backend": "C", "AI Eng": "I", "Frontend": "R", "QA": "C",
    },
  },
  {
    tugas: "Pengisian Knowledge Base",
    responsibilities: {
      "Project Sponsor": "I", "Project Manager": "A", "BA": "C", "UI/UX": "I", "Backend": "C", "AI Eng": "R", "Frontend": "I", "QA": "C",
    },
  },
  {
    tugas: "Pengujian & QA",
    responsibilities: {
      "Project Sponsor": "I", "Project Manager": "A", "BA": "C", "UI/UX": "C", "Backend": "C", "AI Eng": "C", "Frontend": "C", "QA": "R",
    },
  },
  {
    tugas: "User Acceptance Testing (UAT)",
    responsibilities: {
      "Project Sponsor": "R", "Project Manager": "A", "BA": "C", "UI/UX": "C", "Backend": "C", "AI Eng": "C", "Frontend": "C", "QA": "R",
    },
  },
  {
    tugas: "Deployment & Pelatihan",
    responsibilities: {
      "Project Sponsor": "C", "Project Manager": "R", "BA": "I", "UI/UX": "I", "Backend": "R", "AI Eng": "C", "Frontend": "R", "QA": "C",
    },
  },
];

export const raciLegend: Record<string, string> = {
  R: "Responsible — Pelaksana tugas",
  A: "Accountable — Penanggung jawab akhir",
  C: "Consulted — Konsultan yang dihubungi",
  I: "Informed — Pihak yang diberitahu",
};

export interface RiskItem {
  id: string;
  nama: string;
  kategori: string;
  probabilitas: number;
  dampak: number;
  skor: number;
  level: string;
  strategi: string;
  mitigasi: string;
  owner: string;
  status: string;
}

export const riskRegister: RiskItem[] = [
  {
    id: "R01", nama: "Akurasi AI Rendah", kategori: "Teknis",
    probabilitas: 4, dampak: 5, skor: 20, level: "Sangat Tinggi",
    strategi: "Mitigasi", mitigasi: "Optimasi model RAG, evaluasi bertahap, fine-tuning berbasis data testing, benchmarking dengan baseline akurasi",
    owner: "AI Engineer", status: "Aktif",
  },
  {
    id: "R02", nama: "Stabilitas API Eksternal", kategori: "Teknis",
    probabilitas: 3, dampak: 4, skor: 12, level: "Tinggi",
    strategi: "Mitigasi", mitigasi: "Implementasi fallback ke model alternatif, caching respons, retry mechanism dengan exponential backoff",
    owner: "Backend Developer", status: "Aktif",
  },
  {
    id: "R03", nama: "Kerentanan Keamanan Kode AI", kategori: "Keamanan",
    probabilitas: 3, dampak: 5, skor: 15, level: "Sangat Tinggi",
    strategi: "Mitigasi", mitigasi: "Security audit berkala, input sanitization, rate limiting, penanganan data sensitif sesuai standar OWASP",
    owner: "Backend Developer", status: "Aktif",
  },
  {
    id: "R04", nama: "Keterlambatan Jadwal", kategori: "Manajemen",
    probabilitas: 3, dampak: 4, skor: 12, level: "Tinggi",
    strategi: "Mitigasi", mitigasi: "Monitoring mingguan, buffer waktu 15% pada setiap milestone, escalating tepat waktu",
    owner: "Project Manager", status: "Aktif",
  },
  {
    id: "R05", nama: "Perubahan Scope", kategori: "Manajemen",
    probabilitas: 2, dampak: 4, skor: 8, level: "Sedang",
    strategi: "Transfer", mitigasi: "Change control process formal, evaluasi dampak sebelum persetujuan, dokumentasi perubahan",
    owner: "Project Manager", status: "Aktif",
  },
  {
    id: "R06", nama: "Turnover Anggota Tim", kategori: "SDM",
    probabilitas: 2, dampak: 3, skor: 6, level: "Sedang",
    strategi: "Mitigasi", mitigasi: "Dokumentasi kode yang baik, knowledge sharing, cross-training antar anggota tim",
    owner: "Project Manager", status: "Aktif",
  },
  {
    id: "R07", nama: "Knowledge Base Tidak Memadai", kategori: "Teknis",
    probabilitas: 3, dampak: 4, skor: 12, level: "Tinggi",
    strategi: "Mitigasi", mitigasi: "Penambahan error dari sumber komunitas, kurasi berkala, validasi oleh AI Engineer",
    owner: "AI Engineer", status: "Aktif",
  },
  {
    id: "R08", nama: "Biaya Melebihi Anggaran", kategori: "Finansial",
    probabilitas: 2, dampak: 4, skor: 8, level: "Sedang",
    strategi: "Mitigasi", mitigasi: "Tracking anggaran mingguan, kontingensi 10%, persetujuan PM untuk pengeluaran tambahan",
    owner: "Project Manager", status: "Aktif",
  },
  {
    id: "R09", nama: "Performa Sistem Lambat", kategori: "Teknis",
    probabilitas: 3, dampak: 3, skor: 9, level: "Sedang",
    strategi: "Mitigasi", mitigasi: "Load testing, caching, optimasi query database, CDN untuk aset statis",
    owner: "Backend Developer", status: "Aktif",
  },
  {
    id: "R10", nama: "Adopsi Pengguna Rendah", kategori: "Bisnis",
    probabilitas: 2, dampak: 3, skor: 6, level: "Sedang",
    strategi: "Terima", mitigasi: "Sosialisasi ke mahasiswa, tutorial onboarding, feedback loop untuk perbaikan iteratif",
    owner: "Business Analyst", status: "Aktif",
  },
];

export const architectureComponents = [
  { nama: "VS Code Extension", kategori: "Frontend", deskripsi: "Ekstensi VS Code untuk penjelasan error real-time" },
  { nama: "Web Application", kategori: "Frontend", deskripsi: "Aplikasi web Next.js untuk analisis kode mandiri" },
  { nama: "API Gateway", kategori: "Backend", deskripsi: "REST API untuk komunikasi antar komponen" },
  { nama: "AI Engine (RAG)", kategori: "AI/ML", deskripsi: "Pipeline RAG dengan LLM untuk penjelasan error" },
  { nama: "Knowledge Base", kategori: "Data", deskripsi: "Database 200+ error umum dengan solusi terbukti" },
  { nama: "PostgreSQL", kologi: "Data", deskripsi: "Database relasional untuk data pengguna dan log" },
  { nama: "Prisma ORM", kategori: "Data", deskripsi: "ORM untuk akses database yang type-safe" },
  { nama: "Cloud Infrastructure", kategori: "Infra", deskripsi: "Hosting dan komputasi di cloud (AWS/GCP)" },
];

export const technologies = [
  { nama: "Next.js 14+", kategori: "Framework", deskripsi: "React framework dengan App Router dan SSR" },
  { nama: "TypeScript", kategori: "Bahasa", deskripsi: "JavaScript dengan type safety" },
  { nama: "Tailwind CSS", kategori: "Styling", deskripsi: "Utility-first CSS framework" },
  { nama: "Prisma", kategori: "ORM", deskripsi: "Next-generation ORM untuk Node.js dan TypeScript" },
  { nama: "PostgreSQL", kategori: "Database", deskripsi: "Database relasional open-source" },
  { nama: "OpenAI / LLM API", kategori: "AI", deskripsi: "Large Language Model untuk analisis kode" },
  { nama: "RAG Pipeline", kategori: "AI", deskripsi: "Retrieval-Augmented Generation untuk akurasi" },
  { nama: "Recharts", kategori: "Library", deskripsi: "Library charting untuk React" },
  { nama: "Framer Motion", kategori: "Library", deskripsi: "Animasi dan transisi untuk React" },
  { nama: "Lucide Icons", kategori: "Library", deskripsi: "Icon library yang konsisten" },
];

export const ganttData = [
  { nama: "Inisialisasi", mulai: 0, durasi: 2, progress: 100 },
  { nama: "Analisis Kebutuhan", mulai: 2, durasi: 2, progress: 100 },
  { nama: "Desain UI/UX", mulai: 4, durasi: 2, progress: 75 },
  { nama: "Backend & AI", mulai: 6, durasi: 4, progress: 40 },
  { nama: "Frontend & Extension", mulai: 6, durasi: 4, progress: 35 },
  { nama: "Knowledge Base", mulai: 10, durasi: 2, progress: 0 },
  { nama: "Pengujian & QA", mulai: 12, durasi: 1, progress: 0 },
  { nama: "Deployment", mulai: 13, durasi: 1, progress: 0 },
];

export const contractDetails = {
  nomor: "MP-TI/CMAI/2026/001",
  judul: "Pembangunan Sistem CodeMentor AI — AI Mentor Pemrograman",
  versi: "1.0",
  tanggal: "1 September 2026",
  periode: {
    mulai: "1 September 2026",
    selesai: "15 Desember 2026",
  },
  pihakPertama: {
    nama: "Darmawan Lahru Riatma, S.Kom., M.MT.",
    peran: "Project Sponsor / Client",
  },
  pihakKedua: {
    nama: "Fadhel Muhammad Azka Islamy",
    peran: "Project Manager",
  },
  ruangLingkup: [
    "Pengembangan ekstensi VS Code untuk penjelasan error real-time",
    "Pengembangan aplikasi web untuk analisis kode mandiri",
    "Pembangunan AI Engine berbasis RAG dengan knowledge base 200+ error",
    "Dukungan 5 bahasa pemrograman: Python, JavaScript, Java, C++, PHP",
    "Semua penjelasan dalam Bahasa Indonesia",
    "Pengujian fungsional, performa, dan keamanan",
    "Deployment dan pelatihan pengguna",
  ],
  targetKeberhasilan: [
    "Akurasi penjelasan error ≥85%",
    "Waktu respons AI <5 detik",
    "Tingkat kepuasan UAT ≥80%",
    "Tersedia untuk 5 bahasa pemrograman",
    "Knowledge base minimal 200 error umum",
  ],
  milestone: [
    { minggu: "Minggu 1-2", nama: "Inisialisasi & Perencanaan", deliverable: "Dokumen proyek, WBS, RACI" },
    { minggu: "Minggu 3-4", nama: "Analisis Kebutuhan", deliverable: "Requirements document, user stories" },
    { minggu: "Minggu 5-6", nama: "Desain UI/UX", deliverable: "Wireframe, prototipe, design system" },
    { minggu: "Minggu 7-10", nama: "Pengembangan Inti", deliverable: "Backend API, AI Engine, Frontend" },
    { minggu: "Minggu 11-12", nama: "Knowledge Base & RAG", deliverable: "200+ error, pipeline RAG optimal" },
    { minggu: "Minggu 13", nama: "Pengujian & QA", deliverable: "Test report, bug fix" },
    { minggu: "Minggu 14-15", nama: "Deployment & Pelatihan", deliverable: "Sistem production, dokumentasi, training" },
  ],
};
