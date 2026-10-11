export const languages = [
  { value: "python", label: "Python", nama: "Python", icon: "py", extensions: "py", extensionLabel: "VS Code / .py", deskripsi: "SintaksError, TypeError, IndexError, dan error umum dalam pengembangan Python." },
  { value: "javascript", label: "JavaScript", nama: "JavaScript", icon: "js", extensions: "js, jsx, ts, tsx", extensionLabel: "Node.js / .js", deskripsi: "ReferenceError, SyntaxError, dan error pada lingkungan Node.js & browser." },
  { value: "java", label: "Java", nama: "Java", icon: "java", extensions: "java", extensionLabel: "JDK / .java", deskripsi: "NullPointerException, ArrayIndexOutOfBounds, dan penanganan exception Java." },
  { value: "cpp", label: "C++", nama: "C++", icon: "cpp", extensions: "cpp, c, hpp", extensionLabel: "GCC / .cpp", deskripsi: "Segmentation Fault, compilation error, dan isu manajemen memori." },
  { value: "php", label: "PHP", nama: "PHP", icon: "php", extensions: "php", extensionLabel: "PHP 8+ / .php", deskripsi: "ParseError, undefined variable, dan error pengembangan web PHP." },
];

export const sampleErrors = {
  python: [
    { code: "SyntaxError", contoh: "if x > 5:\n  print('besar')\nprint('lanjut')", solusi: "Perbaiki indentasi" },
    { code: "TypeError", contoh: "umur = 20\nprint('Umur: ' + umur)", solusi: "Konversi ke str()" },
    { code: "KeyError", contoh: "data = {'nama': 'Budi'}\nprint(data['umur'])", solusi: "Gunakan .get()" },
    { code: "ZeroDivisionError", contoh: "result = 10 / 0", solusi: "Periksa nilai pembagi" },
  ],
  javascript: [
    { code: "ReferenceError", contoh: "console.log(nama);", solusi: "Deklarasikan variabel" },
    { code: "SyntaxError", contoh: "const x = 5;\nif (x > 3 {", solusi: "Perbaiki tanda kurung" },
    { code: "TypeError", contoh: "const angka = null;\nangka.map(i => i)", solusi: "Periksa null" },
  ],
  java: [
    { code: "NullPointerException", contoh: "String nama = null;\nSystem.out.println(nama.length());", solusi: "Cek null dengan Optional" },
    { code: "ArrayIndexOutOfBoundsException", contoh: "int[] angka = {1,2,3};\nSystem.out.println(angka[3]);", solusi: "Cek array.length" },
  ],
  cpp: [
    { code: "SegmentationFault", contoh: "int* p = nullptr;\n*p = 42;", solusi: "Validasi pointer" },
  ],
  php: [
    { code: "ParseError", contoh: "echo 'Halo'\necho 'Dunia';", solusi: "Tambah titik koma" },
    { code: "UndefinedVariableError", contoh: "echo $nama;", solusi: "Inisialisasi variabel" },
  ],
};

export const mockChatResponses = [
  {
    id: "1",
    language: "python",
    errorCode: "ZeroDivisionError",
    sourceCode: "def hitung_ratarata(nilai):\n    total = 0\n    for n in nilai:\n        total += n\n    return total / len(nilai)\n\nprint(hitung_ratarata([]))",
    aiResponse:
      "## Error ZeroDivisionError\n\n**Penyebab:**\n\nFungsi `hitung_ratarata()` membagi `total` dengan `len(nilai)`. Ketika `nilai` adalah list kosong `[]`, nilai `len(nilai)` menjadi **0**, sehingga terjadi pembagian dengan nol.\n\n**Perbaikan:**\n\n```python\ndef hitung_ratarata(nilai):\n    if not nilai:\n        return 0\n    total = 0\n    for n in nilai:\n        total += n\n    return total / len(nilai)\n```\n\n**Penjelasan:**\n\n- Menambahkan validasi `if not nilai` mengecek apakah list kosong.\n- Mengembalikan 0 untuk menghindari pembagian dengan nol.\n\n**Materi Rekomendasi:**\n- List Comprehension Dasar\n- Validasi Input\n- Operasi Aritmatika",
    confidence: 92,
    feedback: "helpful",
    createdAt: new Date("2026-11-20T09:30:00"),
  },
  {
    id: "2",
    language: "javascript",
    errorCode: "TypeError",
    sourceCode: "const config = null;\nconsole.log(config.apiKey);",
    aiResponse:
      "## Error TypeError: Cannot read property 'apiKey' of null\n\n**Penyebab:**\n\nVariabel `config` bernilai `null`, tetapi Anda tetap mencoba mengakses properti `apiKey` darinya. JavaScript tidak bisa membaca properti dari nilai `null` atau `undefined`.\n\n**Perbaikan:**\n\n```javascript\nconst config = { apiKey: 'your-key' };\n// atau gunakan optional chaining\nconsole.log(config?.apiKey);\n```\n\n**Penjelasan:**\n\n- Optional chaining `?.` menghentikan akses jika nilai adalah `null`/`undefined`.\n- Selalu inisialisasi objek sebelum mengakses propertinya.",
    confidence: 89,
    feedback: "not-helpful",
    createdAt: new Date("2026-11-19T14:00:00"),
  },
  {
    id: "3",
    language: "java",
    errorCode: "NullPointerException",
    sourceCode: "String nama = null;\nSystem.out.println(nama.toUpperCase());",
    aiResponse:
      "## Error: NullPointerException\n\n**Penyebab:**\n\nVariabel `nama` bernilai `null`. Memanggil metode `.toUpperCase()` pada objek null akan melempar `NullPointerException` di Java.\n\n**Perbaikan:**\n\n```java\nString nama = \"Budi\";\n// atau\nif (nama != null) {\n    System.out.println(nama.toUpperCase());\n}\n```\n\n**Penjelasan:**\n\n- Selalu inisialisasi variabel sebelum pemakaian.\n- Gunakan `Optional` atau validasi null untuk keamanan.",
    confidence: 95,
    createdAt: new Date("2026-11-18T08:15:00"),
  },
];

export const dashboardStats = {
  totalPertanyaan: 1247,
  pertanyaanMingguIni: 87,
  totalUser: 342,
  userBaruBulanIni: 45,
  akurasiRataRata: 88.4,
  waktuResponsRataRata: 2.8,
  errorTerbanyak: [
    { code: "NullPointerException", jumlah: 186 },
    { code: "SyntaxError", jumlah: 158 },
    { code: "TypeError (JS)", jumlah: 124 },
    { code: "IndexError", jumlah: 98 },
  ],
  bahasaTerbanyak: [
    { bahasa: "Python", persen: 42 },
    { bahasa: "JavaScript", persen: 28 },
    { bahasa: "Java", persen: 17 },
    { bahasa: "C++", persen: 8 },
    { bahasa: "PHP", persen: 5 },
  ],
  penggunaan14Hari: [
    { tanggal: "27 Nov", jumlah: 52 },
    { tanggal: "28 Nov", jumlah: 78 },
    { tanggal: "29 Nov", jumlah: 45 },
    { tanggal: "30 Nov", jumlah: 92 },
    { tanggal: "1 Des", jumlah: 110 },
    { tanggal: "2 Des", jumlah: 88 },
    { tanggal: "3 Des", jumlah: 120 },
    { tanggal: "4 Des", jumlah: 96 },
    { tanggal: "5 Des", jumlah: 142 },
    { tanggal: "6 Des", jumlah: 118 },
    { tanggal: "7 Des", jumlah: 89 },
    { tanggal: "8 Des", jumlah: 134 },
    { tanggal: "9 Des", jumlah: 156 },
    { tanggal: "10 Des", jumlah: 87 },
  ],
  feedback: {
    helpful: 824,
    notHelpful: 178,
    tanpa: 245,
  },
};

export const knowledgeBaseRows = [
  { id: "KB-001", language: "python", errorCode: "SyntaxError", title: "Kesalahan Sintaks Python", isActive: true },
  { id: "KB-002", language: "python", errorCode: "IndexError", title: "Indeks List di Luar Jangkauan", isActive: true },
  { id: "KB-003", language: "python", errorCode: "KeyError", title: "Kunci Kamus Tidak Ditemukan", isActive: true },
  { id: "KB-004", language: "python", errorCode: "TypeError", title: "Tipe Data Tidak Sesuai", isActive: true },
  { id: "KB-005", language: "python", errorCode: "NameError", title: "Variabel Tidak Terdefinisi", isActive: true },
  { id: "KB-006", language: "javascript", errorCode: "SyntaxError", title: "Kesalahan Sintaks JavaScript", isActive: true },
  { id: "KB-007", language: "javascript", errorCode: "ReferenceError", title: "Referensi Variabel Tidak Ada", isActive: true },
  { id: "KB-008", language: "javascript", errorCode: "TypeError", title: "Operasi Tipe Salah", isActive: true },
  { id: "KB-009", language: "java", errorCode: "NullPointerException", title: "Referensi Null Java", isActive: true },
  { id: "KB-010", language: "java", errorCode: "ArrayIndexOutOfBounds", title: "Indeks Array Di Luar Batas", isActive: true },
  { id: "KB-011", language: "cpp", errorCode: "SegmentationFault", title: "Akses Memori Tidak Valid", isActive: false },
  { id: "KB-012", language: "php", errorCode: "ParseError", title: "Kesalahan Parsing PHP", isActive: true },
];

export const adminUsageTrend = [
  { bulan: "Sep", permintaan: 310, unik: 45 },
  { bulan: "Okt", permintaan: 640, unik: 128 },
  { bulan: "Nov", permintaan: 1120, unik: 256 },
  { bulan: "Des", permintaan: 1420, unik: 342 },
];

export const adminAiPerformance = [
  { label: "Akurasi", nilai: 88.4, target: 85 },
  { label: "Waktu Respons (detik)", nilai: 2.8, target: 5 },
  { label: "Kepuasan UAT (%)", nilai: 83, target: 80 },
];

export const adminKpi = {
  totalRequest: "21.480",
  requestHariIni: "164",
  aktifRekamKB: "200+",
  uptime: "99.98%",
};

export const adminTopErrors = [
  { rank: 1, error: "NullPointerException", bahasa: "Java", jumlah: 186, tren: "+12%" },
  { rank: 2, error: "SyntaxError", bahasa: "Python", jumlah: 158, tren: "-4%" },
  { rank: 3, error: "TypeError", bahasa: "JavaScript", jumlah: 124, tren: "+8%" },
  { rank: 4, error: "IndexError", bahasa: "Python", jumlah: 98, tren: "+2%" },
  { rank: 5, error: "ZeroDivisionError", bahasa: "Python", jumlah: 76, tren: "-11%" },
];