export interface KbEntry {
  language: string;
  errorCode: string;
  title: string;
  description: string;
  solution: string;
  contoh: string;
  tingkat: "Mudah" | "Sedang" | "Sulit";
  tags: string[];
}

export const knowledgeBaseEntries: KbEntry[] = [
  // ============ PYTHON ============
  {
    language: "python",
    errorCode: "SyntaxError",
    title: "Kesalahan Sintaks Python",
    description:
      "Interpreter tidak dapat memahami kode karena penulisan sintaks tidak sesuai aturan bahasa Python.",
    solution:
      "Periksa indentasi, tanda kurung, tanda petik, dan struktur blok. Gunakan editor dengan syntax highlighting untuk mendeteksi lebih awal.",
    contoh:
      "if x > 5:\n  print('besar')\nprint('lanjut')\n\n→ indentasi harus konsisten:\nif x > 5:\n    print('besar')\nprint('lanjut')",
    tingkat: "Mudah",
    tags: ["syntax", "dasar", "paling-umum"],
  },
  {
    language: "python",
    errorCode: "IndentationError",
    title: "Kesalahan Indentasi",
    description:
      "Python sangat bergantung pada indentasi untuk mendefinisikan blok kode. Spasi yang tidak konsisten memicu error ini.",
    solution:
      "Gunakan 4 spasi per tingkat indentasi secara konsisten. Pastikan tidak mencampur tab dengan spasi.",
    contoh:
      "def sapa():\nprint('halo')  # salah\n\ndef sapa():\n    print('halo')  # benar",
    tingkat: "Mudah",
    tags: ["indentasi", "syntax"],
  },
  {
    language: "python",
    errorCode: "IndexError",
    title: "Indeks List di Luar Jangkauan",
    description:
      "Mengakses elemen list pada indeks yang tidak ada (lebih besar dari len(list)-1 atau negatif di luar batas).",
    solution:
      "Cek panjang list dengan len() sebelum mengakses. Untuk akses aman gunakan slicing atau get dengan default.",
    contoh:
      "data = [1, 2, 3]\nprint(data[3])  # IndexError\n\nif 0 <= 3 < len(data):\n    print(data[3])",
    tingkat: "Mudah",
    tags: ["list", "indeks", "collection"],
  },
  {
    language: "python",
    errorCode: "KeyError",
    title: "Kunci Kamus Tidak Ditemukan",
    description:
      "Mencoba mengakses dictionary menggunakan key yang tidak terdaftar.",
    solution:
      "Gunakan dict.get(key, default) atau periksa key dengan operator `in` sebelum mengakses.",
    contoh:
      "data = {'nama': 'Budi'}\nprint(data['umur'])  # KeyError\n\nprint(data.get('umur', 'Tidak ada'))",
    tingkat: "Mudah",
    tags: ["dictionary", "key"],
  },
  {
    language: "python",
    errorCode: "TypeError",
    title: "Operasi Tipe Data Tidak Cocok",
    description:
      "Operasi dijalankan pada tipe yang tidak kompatibel, misalnya menambahkan string dengan integer.",
    solution:
      "Konversi tipe secara eksplisit (str(), int(), float()) atau pastikan variabel memiliki tipe yang diharapkan.",
    contoh:
      "umur = 20\nprint('Umur: ' + umur)  # TypeError\n\nprint('Umur: ' + str(umur))",
    tingkat: "Mudah",
    tags: ["tipe-data", "casting"],
  },
  {
    language: "python",
    errorCode: "ValueError",
    title: "Nilai Argumen Tidak Valid",
    description:
      "Fungsi menerima argumen dengan tipe benar tetapi nilai tidak sesuai, contoh int('abc').",
    solution:
      "Validasi input sebelum konversi atau gunakan try/except untuk menangani konversi yang gagal.",
    contoh:
      "angka = input('Masukkan angka: ')\ntry:\n    nilai = int(angka)\nexcept ValueError:\n    print('Bukan angka valid!')",
    tingkat: "Mudah",
    tags: ["input", "konversi", "exception"],
  },
  {
    language: "python",
    errorCode: "NameError",
    title: "Nama Tidak Terdefinisi",
    description:
      "Memanggil variabel atau fungsi yang belum dideklarasikan, atau salah eja nama.",
    solution:
      "Inisialisasi variabel sebelum dipakai. Periksa ejaan dan cakupan (scope) variabel.",
    contoh:
      "print(total)  # NameError\n\ntotal = 100\nprint(total)",
    tingkat: "Mudah",
    tags: ["variabel", "scope"],
  },
  {
    language: "python",
    errorCode: "ZeroDivisionError",
    title: "Pembagian dengan Nol",
    description:
      "Operasi pembagian (`/`) atau modulus (`%`) menggunakan penyebut bernilai 0.",
    solution:
      "Validasi penyebut sebelum operasi, atau berikan nilai default ketika nol ditemukan.",
    contoh:
      "def bagi(a, b):\n    return a / b\n\nprint(bagi(10, 0))  # ZeroDivisionError\n\ndef bagi(a, b):\n    if b == 0:\n        return float('inf')\n    return a / b",
    tingkat: "Mudah",
    tags: ["aritmatika", "validasi-input"],
  },
  {
    language: "python",
    errorCode: "AttributeError",
    title: "Atribut Tidak Ada pada Objek",
    description:
      "Memanggil atribut atau metode yang tidak dimiliki objek — sering karena objek adalah None.",
    solution:
      "Debug nilai variabel dengan print(). Gunakan hasattr() atau validasi None sebelum memanggil metode.",
    contoh:
      "user = None\nprint(user.nama)  # AttributeError: 'NoneType'\n\nif user is not None:\n    print(user.nama)",
    tingkat: "Sedang",
    tags: ["objek", "None", "attribute"],
  },
  {
    language: "python",
    errorCode: "ModuleNotFoundError",
    title: "Modul Tidak Ditemukan",
    description:
      "Modul yang di-import tidak terpasang atau nama modul salah ketik.",
    solution:
      "Pasang modul dengan pip (`pip install nama-modul`), periksa pip list, atau cek nama file lokal yang bentrok.",
    contoh:
      "import pandas  # ModuleNotFoundError bila belum install\n\n# Terminal:\n# pip install pandas",
    tingkat: "Sedang",
    tags: ["import", "pip", "dependency"],
  },
  {
    language: "python",
    errorCode: "FileNotFoundError",
    title: "File Tidak Ditemukan",
    description:
      "Fungsi open() mencoba membaca file yang tidak ada di path yang diberikan.",
    solution:
      "Gunakan path absolut atau path relatif yang benar dari folder kerja. Cek os.path.exists() terlebih dahulu.",
    contoh:
      "with open('data.csv') as f:  # FileNotFoundError\n    print(f.read())\n\nimport os\nif os.path.exists('data.csv'):\n    with open('data.csv') as f:\n        print(f.read())",
    tingkat: "Sedang",
    tags: ["file", "io"],
  },
  {
    language: "python",
    errorCode: "RecursionError",
    title: "Rekursi Melebihi Batas",
    description:
      "Fungsi rekursif tidak memiliki base case sehingga memanggil dirinya terus tanpa henti.",
    solution:
      "Tambahkan base case yang jelas, dan batasi kedalaman rekursi (sys.setrecursionlimit) sesuai kebutuhan.",
    contoh:
      "def faktorial(n):\n    return n * faktorial(n - 1)  # tanpa base case\n\ndef faktorial(n):\n    if n <= 1:\n        return 1\n    return n * faktorial(n - 1)",
    tingkat: "Sedang",
    tags: ["rekursi", "stack", "algoritma"],
  },

  // ============ JAVASCRIPT ============
  {
    language: "javascript",
    errorCode: "SyntaxError",
    title: "Kesalahan Sintaks JavaScript",
    description:
      "Engine JS tidak dapat mengurai kode karena struktur sintaks tidak valid (kurung, titik koma, dsb.).",
    solution:
      "Periksa tanda kurung, kawat, tanda koma, dan titik koma. Gunakan ESLint untuk menangkap sintaks error lebih awal.",
    contoh:
      "const x = 5;\nif (x > 3 {  // hilang ')'\n  console.log('besar');\n}\n\nif (x > 3) {\n  console.log('besar');\n}",
    tingkat: "Mudah",
    tags: ["syntax", "parsing"],
  },
  {
    language: "javascript",
    errorCode: "ReferenceError",
    title: "Referensi Variabel Tidak Ada",
    description:
      "Mengakses variabel yang belum dideklarasikan atau berada di luar cakupan (scope).",
    solution:
      "Deklarasikan dengan const/let sebelum digunakan. Perhatikan lingkup blok, closure, dan urutan eksekusi.",
    contoh:
      "console.log(nama);  // ReferenceError\n\nconst nama = 'Budi';\nconsole.log(nama);",
    tingkat: "Mudah",
    tags: ["scope", "variabel"],
  },
  {
    language: "javascript",
    errorCode: "TypeError (a.fn is not a function)",
    title: "Memanggil Bukan Fungsi",
    description:
      "Variabel yang dipanggil sebagai fungsi ternyata bukan fungsi — misalnya undefined, objek, atau angka.",
    solution:
      "Verifikasi tipe sebelum memanggil. Gunakan typeof variabel === 'function' atau optional call `?.`.",
    contoh:
      "const data = { kunci: 1 };\ndata.tampilkan();  // TypeError: data.tampilkan is not a function\n\nif (typeof data.tampilkan === 'function') {\n  data.tampilkan();\n}",
    tingkat: "Sedang",
    tags: ["tipe-data", "function"],
  },
  {
    language: "javascript",
    errorCode: "TypeError (Cannot read properties of undefined)",
    title: "Akses Properti dari undefined",
    description:
      "Membaca properti objek yang belum ada atau bernilai undefined/null.",
    solution:
      "Gunakan optional chaining `?.`, nullish coalescing `??`, atau validasi sebelum akses.",
    contoh:
      "const config = {};\nconsole.log(config.api.key);  // TypeError\n\nconsole.log(config.api?.key ?? 'default');",
    tingkat: "Sedang",
    tags: ["null", "undefined", "optional-chaining"],
  },
  {
    language: "javascript",
    errorCode: "RangeError (Maximum call stack size exceeded)",
    title: "Rekursi Tak Terbatas",
    description:
      "Fungsi memanggil dirinya terus-menerus tanpa kondisi berhenti sehingga stack penuh.",
    solution:
      "Pastikan terdapat base case. Hindari rekursi tanpa akhir atau gunakan iterasi (loop) sebagai alternatif.",
    contoh:
      "function loop() { return loop(); }  // stack overflow\n\nfunction hitung(n) {\n  if (n <= 0) return 0;\n  return n + hitung(n - 1);\n}",
    tingkat: "Sedang",
    tags: ["rekursi", "stack"],
  },
  {
    language: "javascript",
    errorCode: "UnhandledPromiseRejection",
    title: "Promise Gagal Tanpa Ditangani",
    description:
      "Async operation ditolak (rejected) tetapi tidak ada .catch() atau try/catch yang menanganinya.",
    solution:
      "Selalu tambahkan .catch() pada promise atau bungkus await dalam try/catch.",
    contoh:
      "fetch('/api/data')\n  .catch(err => console.error(err));\n\nasync function ambil() {\n  try {\n    const res = await fetch('/api/data');\n  } catch (err) {\n    console.error(err);\n  }\n}",
    tingkat: "Sedang",
    tags: ["async", "promise", "error-handling"],
  },
  {
    language: "javascript",
    errorCode: "ReferenceError (Cannot access before initialization)",
    title: "Temporal Dead Zone (TDZ)",
    description:
      "Mengakses variabel let/const sebelum baris deklarasinya dieksekusi.",
    solution:
      "Pindahkan penggunaan variabel setelah deklarasi. Perhatikan hoisting pada let/const di blok.",
    contoh:
      "console.log(x);  // TDZ\nconst x = 1;\n\nconst x = 1;\nconsole.log(x);",
    tingkat: "Sedang",
    tags: ["let", "const", "hoisting", "tdz"],
  },
  {
    language: "javascript",
    errorCode: "ENOENT (fs)",
    title: "File atau Directory Tidak Ada (Node.js)",
    description:
      "Operasi filesystem (fs) mencoba membaca/menulis file pada path yang tidak valid.",
    solution:
      "Gunakan __dirname saat membangun path relatif, dan cek keberadaan file sebelum diproses.",
    contoh:
      "const fs = require('fs');\nconst path = require('path');\nfs.readFile(path.join(__dirname, 'data.txt'), 'utf8', (e, d) => {\n  if (e) return console.error(e);\n  console.log(d);\n});",
    tingkat: "Sedang",
    tags: ["nodejs", "fs", "path"],
  },
  {
    language: "javascript",
    errorCode: "NaN (Not a Number)",
    title: "Hasil Operasi Bukan Angka",
    description:
      "Operasi aritmatika menghasilkan NaN karena salah satu operand bukan angka (string, undefined).",
    solution:
      "Konversi input dengan Number(x) dan gunakan Number.isNaN()/isFinite() untuk validasi.",
    contoh:
      "let total = '10' * 'dua';  // NaN\nconst angka = Number('10');\nif (Number.isFinite(angka)) {\n  console.log(angka * 2);\n}",
    tingkat: "Mudah",
    tags: ["angka", "validasi-input"],
  },
  {
    language: "javascript",
    errorCode: "Module not found: Can't resolve",
    title: "Modul Tidak Dapat Diresolusi (Webpack/Vite)",
    description:
      "Import modul tidak ditemukan — biasanya path salah atau paket belum terinstall.",
    solution:
      "Periksa path import (perhatikan ./ dan ../), cek package.json dependencies, lalu restart dev server.",
    contoh:
      "// import { utils } from '@/app/utils'  salah path\n// Perbaiki ke path yang benar atau install paketnya\nimport { utils } from '@/lib/utils';",
    tingkat: "Mudah",
    tags: ["module", "webpack", "vite"],
  },
  {
    language: "javascript",
    errorCode: "TypeError: Cannot destructure",
    title: "Destructuring dari undefined",
    description:
      "Melakukan destructuring pada objek yang bernilai undefined/null.",
    solution:
      "Berikan nilai default saat destructuring atau pastikan objek ada terlebih dahulu.",
    contoh:
      "const { a } = undefined;  // TypeError\n\nconst { a } = { a: 1 } ?? {};\n// atau\nconst { a = 0 } = {};",
    tingkat: "Sedang",
    tags: ["destructuring", "es6"],
  },

  // ============ JAVA ============
  {
    language: "java",
    errorCode: "NullPointerException",
    title: "Referensi Null (NPE)",
    description:
      "Memanggil metode atau mengakses field pada objek yang bernilai null — error paling sering di Java.",
    solution:
      "Validasi null sebelum pemakaian, gunakan java.util.Optional, serta pastikan inisialisasi objek.",
    contoh:
      "String nama = null;\nSystem.out.println(nama.length());\n\nif (nama != null) {\n    System.out.println(nama.length());\n}",
    tingkat: "Mudah",
    tags: ["null", "objek", "paling-umum"],
  },
  {
    language: "java",
    errorCode: "ArrayIndexOutOfBoundsException",
    title: "Indeks Array Di Luar Batas",
    description:
      "Mengakses elemen array dengan indeks negatif atau melebihi array.length - 1.",
    solution:
      "Periksa indeks dengan array.length sebelum mengakses. Untuk iterasi gunakan for-each.",
    contoh:
      "int[] arr = {1,2,3};\nSystem.out.println(arr[3]);\n\nif (3 < arr.length) {\n    System.out.println(arr[3]);\n}",
    tingkat: "Mudah",
    tags: ["array", "indeks"],
  },
  {
    language: "java",
    errorCode: "InputMismatchException",
    title: "Input Type Tidak Cocok (Scanner)",
    description:
      "Scanner.nextInt() menerima input yang bukan angka (misal huruf).",
    solution:
      "Validasi input dengan hasNextInt() sebelum membaca, atau tangkap exceptionnya.",
    contoh:
      "Scanner sc = new Scanner(System.in);\nif (sc.hasNextInt()) {\n    int n = sc.nextInt();\n} else {\n    System.out.println(\"Input harus angka.\");\n}",
    tingkat: "Mudah",
    tags: ["scanner", "input", "exception"],
  },
  {
    language: "java",
    errorCode: "NumberFormatException",
    title: "Konversi String ke Angka Gagal",
    description:
      "Integer.parseInt()/Double.parseDouble() menerima string yang bukan angka.",
    solution:
      "Bungkus konversi dalam try/catch atau validasi string dengan regex/digit check.",
    contoh:
      "String s = \"abc\";\ntry {\n    int n = Integer.parseInt(s);\n} catch (NumberFormatException e) {\n    System.out.println(\"Format angka salah.\");\n}",
    tingkat: "Mudah",
    tags: ["konversi", "parsing"],
  },
  {
    language: "java",
    errorCode: "StringIndexOutOfBoundsException",
    title: "Indeks String Di Luar Batas",
    description:
      "charAt(i) atau substring() menggunakan indeks di luar rentang string.",
    solution:
      "Periksa string.length() sebelum mengakses, dan sesuaikan batas substring.",
    contoh:
      "String s = \"abc\";\nSystem.out.println(s.charAt(5));\n\nif (5 < s.length()) {\n    System.out.println(s.charAt(5));\n}",
    tingkat: "Mudah",
    tags: ["string", "indeks"],
  },
  {
    language: "java",
    errorCode: "ArithmeticException",
    title: "Pembagian dengan Nol (Integer)",
    description:
      "Operasi `x / 0` atau `x % 0` pada tipe primitif integer melempar ArithmeticException.",
    solution:
      "Validasi pembagi sebelum operasi pembagian/modulus.",
    contoh:
      "int a = 10, b = 0;\nif (b != 0) {\n    System.out.println(a / b);\n} else {\n    System.out.println(\"Tidak dapat membagi dengan nol.\");\n}",
    tingkat: "Mudah",
    tags: ["aritmatika", "integer"],
  },
  {
    language: "java",
    errorCode: "ClassCastException",
    title: "Cast Tipe Tidak Sah",
    description:
      "Mencoba cast objek ke tipe yang tidak sesuai hierarki kelasnya.",
    solution:
      "Gunakan instanceof sebelum melakukan cast, atau gunakan generics untuk menghindari raw type.",
    contoh:
      "Object o = new String(\"teks\");\nif (o instanceof String) {\n    String s = (String) o;\n}",
    tingkat: "Sedang",
    tags: ["casting", "polimorfisme"],
  },
  {
    language: "java",
    errorCode: "ConcurrentModificationException",
    title: "Modifikasi Koleksi Saat Iterasi",
    description:
      "Menghapus/menambahkan elemen ke koleksi (ArrayList, HashMap) ketika sedang diiterasi.",
    solution:
      "Gunakan Iterator dan hapus via iterator.remove(), atau salin koleksi dulu.",
    contoh:
      "Iterator<String> it = list.iterator();\nwhile (it.hasNext()) {\n    if (it.next().isEmpty()) {\n        it.remove();  // aman\n    }\n}",
    tingkat: "Sedang",
    tags: ["collection", "iterator"],
  },
  {
    language: "java",
    errorCode: "OutOfMemoryError",
    title: "Memori Java Habis",
    description:
      "Heap JVM penuh — biasanya karena objek besar, loop tak terbatas, atau memory leak.",
    solution:
      "Atur -Xmx pada JVM, periksa loop, dan jangan menyimpan data besar tanpa perlu.",
    contoh:
      "// Jalankan dengan heap lebih besar:\n// java -Xmx1024m Aplikasi\n// Dan hindari menyimpan seluruh file besar di memori.",
    tingkat: "Sulit",
    tags: ["memori", "jvm", "heap"],
  },
  {
    language: "java",
    errorCode: "StackOverflowError",
    title: "Stack Rekursi Penuh",
    description:
      "Rekursi terlalu dalam atau tanpa kondisi berhenti menghabiskan stack JVM.",
    solution:
      "Perbaiki base case rekursi atau konversi ke iterasi. Tingkatkan -Xss untuk kebutuhan khusus.",
    contoh:
      "public int sum(int n) {\n    if (n <= 0) return 0;  // base case penting\n    return n + sum(n - 1);\n}",
    tingkat: "Sedang",
    tags: ["rekursi", "stack"],
  },

  // ============ C++ ============
  {
    language: "cpp",
    errorCode: "Segmentation Fault",
    title: "Segmentation Fault (Access Violation)",
    description:
      "Program mengakses memori yang tidak diizinkan — pointer null, out-of-bounds, atau buffer overrun.",
    solution:
      "Validasi pointer sebelum dereference, gunakan smart pointers (unique_ptr), dan aktifkan AddressSanitizer saat debug.",
    contoh:
      "int* p = nullptr;\n*p = 42;  // segfault\n\nint* p = new int(42);\nstd::cout << *p;\ndelete p;",
    tingkat: "Sedang",
    tags: ["pointer", "memori", "debugging"],
  },
  {
    language: "cpp",
    errorCode: "Compilation Error",
    title: "Kesalahan Kompilasi",
    description:
      "Compiler menemukan kesalahan sintaks atau tipe sehingga tidak menghasilkan executable.",
    solution:
      "Baca pesan error mulai dari yang pertama. Periksa titik koma, deklarasi tipe, dan header yang di-include.",
    contoh:
      "// Salah: int x = \"teks\";\nint x = 42;\n// Pastikan #include <iostream> agar std::cout tersedia.",
    tingkat: "Mudah",
    tags: ["compiler", "syntax"],
  },
  {
    language: "cpp",
    errorCode: "Undefined Reference (Linker)",
    title: "Referensi Tak Terdefinisi saat Link",
    description:
      "Fungsi dideklarasikan/dipanggil tetapi implementasinya tidak ditemukan oleh linker.",
    solution:
      "Periksa bahwa definisi fungsi ada, file .cpp ikut dikompilasi, dan library di-link (mis. -lm).",
    contoh:
      "// deklarasi saja tanpa definisi\nint tambah(int, int);\n// tambahkan definisi atau link file yang berisi implementasinya",
    tingkat: "Sedang",
    tags: ["linker", "compile-flags"],
  },
  {
    language: "cpp",
    errorCode: "Memory Leak",
    title: "Kebocoran Memori",
    description:
      "Memori yang dialokasikan dengan `new` tidak pernah di-delete sehingga memori menumpuk.",
    solution:
      "Gunakan smart pointers (std::unique_ptr, std::shared_ptr) atau pastikan setiap new memiliki delete.",
    contoh:
      "int* p = new int(10);\n// ...gunakan p...\ndelete p;  // bebaskan memori\n\nstd::unique_ptr<int> p = std::make_unique<int>(10);",
    tingkat: "Sedang",
    tags: ["memori", "smart-pointer", "raii"],
  },
  {
    language: "cpp",
    errorCode: "Double Free",
    title: "Pembebasan Memori Ganda",
    description:
      "Memanggil delete pada pointer yang sudah dibebaskan sebelumnya, merusak heap.",
    solution:
      "Set pointer ke nullptr setelah delete, atau gunakan smart pointers sehingga ownership terkelola otomatis.",
    contoh:
      "int* p = new int(5);\ndelete p;\np = nullptr;  // mencegah double free\nif (p) delete p;",
    tingkat: "Sedang",
    tags: ["memori", "pointer"],
  },
  {
    language: "cpp",
    errorCode: "std::bad_alloc",
    title: "Alokasi Memori Gagal",
    description:
      "new tidak dapat mengalokasikan memori yang diminta — heap habis atau ukuran tak masuk akal.",
    solution:
      "Periksa ukuran alokasi, tangkap std::bad_alloc, dan pertimbangkan penggunaan kembali memori.",
    contoh:
      "try {\n    int* arr = new int[1000000000];\n} catch (std::bad_alloc& e) {\n    std::cerr << \"Memori tidak cukup\\n\";\n}",
    tingkat: "Sulit",
    tags: ["memori", "alokasi", "exception"],
  },
  {
    language: "cpp",
    errorCode: "std::out_of_range",
    title: "Indeks Vector/string Di Luar Jangkauan",
    description:
      "vector::at() atau string::at() menggunakan indeks di luar ukuran kontainer.",
    solution:
      "Gunakan metode at() yang melempar exception atau periksa size() sebelum akses index [ ].",
    contoh:
      "std::vector<int> v = {1,2,3};\ntry {\n    std::cout << v.at(10);\n} catch (std::out_of_range& e) {\n    std::cerr << e.what();\n}",
    tingkat: "Sedang",
    tags: ["vector", "indeks", "stl"],
  },
  {
    language: "cpp",
    errorCode: "Buffer Overflow",
    title: "Array Statis Diisi Melebihi Kapasitas",
    description:
      "Menulis data melebihi ukuran array atau buffer, berpotensi merusak memori di sekitarnya.",
    solution:
      "Gunakan std::vector untuk ukuran dinamis, atau cek batas sebelum menulis ke array statis.",
    contoh:
      "char buf[8];\nstrcpy(buf, \"pesan yang sangat panjang\");  // overflow\n\nstd::string s = \"pesan yang sangat panjang\";",
    tingkat: "Sulit",
    tags: ["array", "keamanan", "buffer"],
  },
  {
    language: "cpp",
    errorCode: "Uninitialized Variable",
    title: "Variabel Belum Diinisialisasi",
    description:
      "Menggunakan nilai variabel sebelum diberi nilai — menghasilkan perilaku tidak terdefinisi.",
    solution:
      "Selalu inisialisasi variabel saat mendeklarasikan, atau isi sebelum pemakaian.",
    contoh:
      "int jumlah;\nstd::cout << jumlah;  // nilai tak tentu\n\nint jumlah = 0;\nstd::cout << jumlah;",
    tingkat: "Mudah",
    tags: ["variabel", "warning"],
  },
  {
    language: "cpp",
    errorCode: "fatal error: x.h: No such file",
    title: "Header Tidak Ditemukan",
    description:
      "Preprocessor tidak menemukan file header yang di-include pada include path.",
    solution:
      "Periksa nama dan lokasi header. Untuk include tanda kutip beri path relatif; untuk library tambahkan -I/path.",
    contoh:
      "// #include \"folder/mylib.h\"  -> path harus tepat\n// Untuk library sistem: #include <vector>\n#include <vector>",
    tingkat: "Mudah",
    tags: ["include", "header", "compiler"],
  },

  // ============ PHP ============
  {
    language: "php",
    errorCode: "ParseError",
    title: "Kesalahan Parsing PHP",
    description:
      "PHP tidak dapat mengurai skrip karena titik koma hilang, kurung tidak seimbang, atau sintaks salah.",
    solution:
      "Periksa tanda `;`, kurung kurawal, dan kutip. Gunakan editor dengan PHP linter terintegrasi.",
    contoh:
      "echo 'Halo'\necho 'Dunia';  // hilang ';'\n\necho 'Halo';\necho 'Dunia';",
    tingkat: "Mudah",
    tags: ["syntax", "parsing"],
  },
  {
    language: "php",
    errorCode: "Undefined variable: $x",
    title: "Variabel Tidak Terdefinisi",
    description:
      "Menggunakan variabel yang belum diinisialisasi — muncul sebagai PHP Warning/Notice.",
    solution:
      "Inisialisasi variabel sebelum dipakai dan gunakan isset() untuk memeriksa keberadaannya.",
    contoh:
      "echo $nama;  // undefined\n\n$nama = 'Budi';\necho $nama;\n// atau\nif (isset($nama)) echo $nama;",
    tingkat: "Mudah",
    tags: ["variabel", "warning"],
  },
  {
    language: "php",
    errorCode: "Undefined array key",
    title: "Indeks/Kunci Array Tidak Ada",
    description:
      "Mengakses elemen array/assoc menggunakan key yang tidak terdefinisi (PHP 8 warning).",
    solution:
      "Gunakan isset(), array_key_exists(), atau null coalescing `??` sebelum mengakses.",
    contoh:
      "$data = ['nama' => 'Budi'];\necho $data['umur'] ?? 'Tidak ada';",
    tingkat: "Mudah",
    tags: ["array", "key"],
  },
  {
    language: "php",
    errorCode: "Fatal error: Call to undefined function",
    title: "Memanggil Fungsi yang Tidak Ada",
    description:
      "Fungsi yang dipanggil tidak didefinisikan atau belum di-include file definisinya.",
    solution:
      "Pastikan file yang berisi fungsi di-include/require, periksa ejaan fungsi, dan cek ekstensi PHP.",
    contoh:
      "include 'helpers.php';\necho hitungBonus(100);",
    tingkat: "Sedang",
    tags: ["function", "include"],
  },
  {
    language: "php",
    errorCode: "TypeError",
    title: "Tipe Argumen Tidak Sesuai",
    description:
      "Fungsi bertipe ketat menerima argumen dengan tipe yang tidak cocok dengan deklarasi.",
    solution:
      "Konversi tipe atau perbaiki pemanggilan fungsi agar sesuai dengan signature.",
    contoh:
      "function tambah(int $a, int $b): int { return $a + $b; }\n\necho tambah(2, 3);  // benar\n// tambah('2', 3) dengan declare(strict_types=1) akan TypeError",
    tingkat: "Sedang",
    tags: ["tipe-data", "strict-types"],
  },
  {
    language: "php",
    errorCode: "Division by zero",
    title: "Pembagian dengan Nol",
    description:
      "Operasi pembagian atau modulus dengan penyebut 0 — PHP 8 melempar DivisionByZeroError.",
    solution:
      "Validasi penyebut sebelum operasi atau tangkap DivisionByZeroError.",
    contoh:
      "$x = 10; $y = 0;\nif ($y !== 0) {\n    echo $x / $y;\n} else {\n    echo 'Tidak dapat membagi nol';\n}",
    tingkat: "Mudah",
    tags: ["aritmatika", "division"],
  },
  {
    language: "php",
    errorCode: "Maximum execution time exceeded",
    title: "Waktu Eksekusi Maksimum Tercapai",
    description:
      "Skrip berjalan lebih dari batas max_execution_time (default 30 detik) — umumnya karena loop berat.",
    solution:
      "Optimasi query/loop, perbesar set_time_limit() untuk workload legit, dan hindari pemrosesan tanpa batas.",
    contoh:
      "// Perbesar batas hanya bila diperlukan\nset_time_limit(60);\n// atau di php.ini: max_execution_time = 60",
    tingkat: "Sedang",
    tags: ["performa", "timeout"],
  },
  {
    language: "php",
    errorCode: "mysqli_connect(): Access denied",
    title: "Koneksi Database Gagal",
    description:
      "Kredensial atau host MySQL salah, user tidak punya izin, atau server tidak berjalan.",
    solution:
      "Periksa host, username, password, dan port. Pastikan service MySQL aktif dan database ada.",
    contoh:
      "$conn = mysqli_connect($host, $user, $pass, $db);\nif (!$conn) {\n    die('Koneksi gagal: ' . mysqli_connect_error());\n}",
    tingkat: "Sedang",
    tags: ["database", "mysqli"],
  },
  {
    language: "php",
    errorCode: "Invalid argument supplied for foreach()",
    title: "foreach pada Bukan Array",
    description:
      "Mengiterasi variabel yang bukan array atau Traversable (misal null, string).",
    solution:
      "Cek is_array() atau gunakan tipe data yang benar sebelum foreach.",
    contoh:
      "$items = null;\nif (is_array($items)) {\n    foreach ($items as $it) { /* ... */ }\n}",
    tingkat: "Mudah",
    tags: ["foreach", "array"],
  },
  {
    language: "php",
    errorCode: "Class not found",
    title: "Kelas Tidak Ditemukan",
    description:
      "Autoload gagal menemukan kelas — namespace/path file tidak cocok dengan aturan Composer.",
    solution:
      "Periksa namespace, jalankan `composer dump-autoload`, dan pastikan file sesuai PSR-4.",
    contoh:
      "// pastikan namespace sesuai lokasi file\n// jalankan: composer dump-autoload",
    tingkat: "Sedang",
    tags: ["composer", "namespace", "autoload"],
  },
];

export const languageCounts = (() => {
  const counts: Record<string, number> = {};
  for (const e of knowledgeBaseEntries) {
    counts[e.language] = (counts[e.language] ?? 0) + 1;
  }
  return counts;
})();

export const tingkatBadgeColor: Record<string, string> = {
  Mudah: "bg-success/10 text-success",
  Sedang: "bg-warning/10 text-warning",
  Sulit: "bg-accent/10 text-accent",
};