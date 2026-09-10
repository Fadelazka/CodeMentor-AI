export const adminKpi = {
  totalRequest: "21.480",
  requestHariIni: "164",
  aktifRekamKB: "200+",
  uptime: "99.98%",
};

export const adminUsageTrend = [
  { bulan: "Sep", permintaan: 310, unik: 45 },
  { bulan: "Okt", permintaan: 640, unik: 128 },
  { bulan: "Nov", permintaan: 1120, unik: 256 },
  { bulan: "Des", permintaan: 1420, unik: 342 },
];

export const adminAiPerformance = [
  { label: "Akurasi (%)", nilai: 88.4, target: 85 },
  { label: "Waktu Respons (detik)", nilai: 2.8, target: 5 },
  { label: "Kepuasan UAT (%)", nilai: 83, target: 80 },
  { label: "Penurunan Pertanyaan Debug (%)", nilai: 31, target: 30 },
];

export const adminTopErrors = [
  { rank: 1, error: "NullPointerException", bahasa: "Java", jumlah: 186, tren: "+12%" },
  { rank: 2, error: "SyntaxError", bahasa: "Python", jumlah: 158, tren: "-4%" },
  { rank: 3, error: "TypeError", bahasa: "JavaScript", jumlah: 124, tren: "+8%" },
  { rank: 4, error: "IndexError", bahasa: "Python", jumlah: 98, tren: "+2%" },
  { rank: 5, error: "ZeroDivisionError", bahasa: "Python", jumlah: 76, tren: "-11%" },
];

export const knowledgeBaseRows = [
  { id: "KB-001", language: "python", errorCode: "SyntaxError", title: "Kesalahan Sintaks Python", isActive: true, updated: "8 Des 2026" },
  { id: "KB-002", language: "python", errorCode: "IndexError", title: "Indeks List di Luar Jangkauan", isActive: true, updated: "7 Des 2026" },
  { id: "KB-003", language: "python", errorCode: "KeyError", title: "Kunci Kamus Tidak Ditemukan", isActive: true, updated: "7 Des 2026" },
  { id: "KB-004", language: "python", errorCode: "TypeError", title: "Tipe Data Tidak Sesuai", isActive: true, updated: "6 Des 2026" },
  { id: "KB-005", language: "python", errorCode: "NameError", title: "Variabel Tidak Terdefinisi", isActive: true, updated: "6 Des 2026" },
  { id: "KB-006", language: "javascript", errorCode: "SyntaxError", title: "Kesalahan Sintaks JavaScript", isActive: true, updated: "5 Des 2026" },
  { id: "KB-007", language: "javascript", errorCode: "ReferenceError", title: "Referensi Variabel Tidak Ada", isActive: true, updated: "5 Des 2026" },
  { id: "KB-008", language: "javascript", errorCode: "TypeError", title: "Operasi Tipe Salah", isActive: true, updated: "4 Des 2026" },
  { id: "KB-009", language: "java", errorCode: "NullPointerException", title: "Referensi Null Java", isActive: true, updated: "4 Des 2026" },
  { id: "KB-010", language: "java", errorCode: "ArrayIndexOutOfBounds", title: "Indeks Array Di Luar Batas", isActive: true, updated: "3 Des 2026" },
  { id: "KB-011", language: "cpp", errorCode: "SegmentationFault", title: "Akses Memori Tidak Valid", isActive: false, updated: "2 Des 2026" },
  { id: "KB-012", language: "php", errorCode: "ParseError", title: "Kesalahan Parsing PHP", isActive: true, updated: "2 Des 2026" },
];