import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@codementor.com" },
    // Akun yang SUDAH ADA juga diperbaiki: password direset ke "admin123" + role dipastikan ADMIN.
    // (name sengaja tidak diubah agar nama kustom pada akun tidak tertimpa.)
    update: {
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
    create: {
      email: "admin@codementor.com",
      name: "Admin CodeMentor",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  console.log("✓ Admin user seeded");

  await prisma.knowledgeBase.deleteMany();

  const pengetahuan = [
    {
      language: "python",
      errorCode: "SyntaxError",
      title: "SyntaxError: Kesalahan Sintaks",
      description: "Terjadi ketika interpreter Python tidak dapat memahami kode Anda karena ada kesalahan penulisan sintaks.",
      solution:
        "Periksa indentasi, tanda kurung, dan tanda baca. Pastikan setiap pernyataan ditulis dengan benar sesuai aturan bahasa Python.",
      examples:
        "Salah: if x > 5:\n  print('besar')\nprint('selesai')\n\nBenar: if x > 5:\n    print('besar')\nprint('selesai')",
      tags: ["syntax", "dasar", "error-umum"],
    },
    {
      language: "python",
      errorCode: "IndexError",
      title: "IndexError: Indeks List di Luar Jangkauan",
      description: "Terjadi saat mencoba mengakses elemen list dengan indeks yang tidak ada pada daftar.",
      solution:
        "Periksa ukuran list dengan len(). Pastikan indeks yang digunakan berada dalam rentang 0 sampai len(list) - 1.",
      examples:
        "data = [1, 2, 3]\nprint(data[3])  # IndexError\n\nPerbaikan:\nif len(data) > 3:\n    print(data[3])",
      tags: ["list", "indeks", "collection"],
    },
    {
      language: "python",
      errorCode: "KeyError",
      title: "KeyError: Kunci Kamus Tidak Ditemukan",
      description: "Terjadi saat mencoba mengakses key yang tidak ada dalam dictionary.",
      solution:
        "Gunakan metode .get() dengan nilai default, atau periksa keberadaan key dengan operator in sebelum mengaksesnya.",
      examples:
        "data = {'nama': 'Budi'}\nprint(data['umur'])  # KeyError\n\nPerbaikan:\nprint(data.get('umur', 'Tidak ada'))",
      tags: ["dictionary", "key", "collection"],
    },
    {
      language: "python",
      errorCode: "TypeError",
      title: "TypeError: Tipe Data Tidak Sesuai",
      description: "Terjadi ketika operasi dilakukan pada tipe data yang tidak kompatibel, seperti menambahkan string dengan integer.",
      solution:
        "Konversikan tipe data terlebih dahulu menggunakan int(), str(), float() sesuai kebutuhan, atau periksa tipe variabel.",
      examples:
        "umur = 20\nprint('Umur: ' + umur)  # TypeError\n\nPerbaikan:\nprint('Umur: ' + str(umur))",
      tags: ["tipe-data", "casting", "error-umum"],
    },
    {
      language: "python",
      errorCode: "NameError",
      title: "NameError: Nama Variabel Tidak Terdefinisi",
      description: "Terjadi saat memanggil variabel atau fungsi yang belum didefinisikan.",
      solution:
        "Pastikan variabel telah diinisialisasi sebelum digunakan. Periksa juga ejaan dan cakupan (scope) variabel.",
      examples:
        "print(total)  # NameError\n\ntotal = 100\nprint(total)  # Benar",
      tags: ["variabel", "scope", "error-umum"],
    },
    {
      language: "javascript",
      errorCode: "SyntaxError",
      title: "SyntaxError: Kesalahan Sintaks JavaScript",
      description: "Browser atau Node.js tidak dapat memahami kode Anda karena kesalahan sintaks.",
      solution:
        "Periksa tanda kurung, koma, titik koma, dan struktur blok kode. Gunakan linter seperti ESLint untuk mendeteksi lebih awal.",
      examples:
        "Salah: const x = 5;\nif (x > 3 {\n  console.log('besar')\n}\n\nBenar: const x = 5;\nif (x > 3) {\n  console.log('besar')\n}",
      tags: ["syntax", "dasar", "error-umum"],
    },
    {
      language: "javascript",
      errorCode: "ReferenceError",
      title: "ReferenceError: Referensi Variabel Tidak Ditemukan",
      description: "Terjadi saat mengakses variabel yang tidak dideklarasikan atau di luar cakupan (scope).",
      solution:
        "Deklarasikan variabel dengan const/let sebelum digunakan. Perhatikan cakupan blok dan closure.",
      examples:
        "console.log(nama);  // ReferenceError\n\nconst nama = 'Budi';\nconsole.log(nama);  // Benar",
      tags: ["scope", "variabel", "error-umum"],
    },
    {
      language: "javascript",
      errorCode: "TypeError",
      title: "TypeError: Operasi pada Tipe yang Salah",
      description: "Terjadi ketika fungsi atau operasi diterapkan pada tipe data yang tidak sesuai.",
      solution:
        "Periksa tipe variabel sebelum operasi. Gunakan typeof atau implementasi pengecekan yang tepat.",
      examples:
        "const angka = null;\nconsole.log(angka.toUpperCase());  // TypeError\n\nconst teks = 'hello';\nconsole.log(teks.toUpperCase()); // BENAR",
      tags: ["tipe-data", "null", "error-umum"],
    },
    {
      language: "java",
      errorCode: "NullPointerException",
      title: "NullPointerException: Referensi Null",
      description: "Error paling umum di Java, terjadi saat memanggil metode atau mengakses field dari objek yang bernilai null.",
      solution:
        "Periksa null sebelum mengakses objek. Gunakan Optional atau validasi input sebelum penggunaan.",
      examples:
        "String nama = null;\nSystem.out.println(nama.length());  // NPE\n\nString nama = \"Budi\";\nSystem.out.println(nama.length());  // Benar",
      tags: ["null", "objek", "error-umum"],
    },
    {
      language: "java",
      errorCode: "ArrayIndexOutOfBoundsException",
      title: "ArrayIndexOutOfBoundsException: Indeks Array Di Luar Jangkauan",
      description: "Terjadi saat mengakses elemen array dengan indeks negatif atau melebihi panjang array.",
      solution:
        "Periksa batas array dengan properti length sebelum mengakses indeks.",
      examples:
        "int[] angka = {1, 2, 3};\nSystem.out.println(angka[3]);  // Exception\n\nif (3 < angka.length) {\n  System.out.println(angka[3]);\n}",
      tags: ["array", "indeks", "collection"],
    },
    {
      language: "java",
      errorCode: "ClassNotFoundException",
      title: "ClassNotFoundException: Kelas Tidak Ditemukan",
      description: "JVM tidak dapat menemukan kelas yang direferensikan pada classpath saat runtime.",
      solution:
        "Periksa CLASSPATH, dependensi Maven/Gradle, dan pastikan nama kelas dan paket sesuai.",
      tags: ["classpath", "dependensi", "build"],
    },
    {
      language: "cpp",
      errorCode: "SegmentationFault",
      title: "Segmentation Fault: Akses Memori Tidak Valid",
      description: "Program mencoba mengakses memori yang tidak diizinkan, sering karena pointer null atau array out-of-bound.",
      solution:
        "Selalu periksa nullptr, ukur ukuran array, gunakan debugging tools seperti GDB, dan pertimbangkan smart pointers.",
      examples:
        "int* p = nullptr;\n*p = 42;  // Segmentation fault\n\nint* p = new int(42);\nstd::cout << *p;\ndelete p;",
      tags: ["pointer", "memori", "c++"],
    },
    {
      language: "php",
      errorCode: "ParseError",
      title: "ParseError: Kesalahan Parsing PHP",
      description: "Occurs ketika PHP tidak dapat mengurai kode karena kesalahan sintaks.",
      solution:
        "Periksa titik koma, kurung kurawal, dan tanda kutip. Gunakan editor dengan PHP linter terintegrasi.",
      tags: ["syntax", "php", "error-umum"],
    },
    {
      language: "php",
      errorCode: "UndefinedVariableError",
      title: "Undefined Variable: Variabel Tidak Terdefinisi",
      description: "Terjadi saat menggunakan variabel yang belum didefinisikan dalam PHP.",
      solution:
        "Inisialisasi variabel sebelum digunakan dan gunakan isset() untuk memeriksa keberadaannya.",
      tags: ["variabel", "php", "error-umum"],
    },
    {
      language: "cpp",
      errorCode: "CompilationError",
      title: "Compilation Error: Kesalahan Kompilasi",
      description: "Compiler menemukan kesalahan saat mengubah kode menjadi output yang dapat dijalankan.",
      solution:
        "Periksa kesalahan pada pesan compiler secara berurutan. Perbaiki deklarasi tipe, tanda kurung, dan tanda titik koma.",
      tags: ["kompilasi", "c++", "compiler"],
    },
  ];

  for (const p of pengetahuan) {
    await prisma.knowledgeBase.create({ data: p });
  }

  console.log(`✅ Seeded ${pengetahuan.length} knowledge base entries`);
  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });