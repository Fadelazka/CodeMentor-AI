/**
 * Soal kuis onboarding — mengukur skill (siswa vs mahasiswa).
 *
 * Statis (hardcode) sesuai keputusan: tidak disimpan di database agar cepat.
 * Fokus pada deteksi kode error di 5 bahasa: Python, JavaScript, Java, C++, PHP.
 */

export type QuizLanguage = "python" | "javascript" | "java" | "cpp" | "php";

export interface QuizQuestion {
  /** ID unik pertanyaan. */
  id: string;
  /** Bahasa pemrograman yang diuji. */
  language: QuizLanguage;
  /** Pertanyaan singkat. */
  question: string;
  /** Potongan kode yang ditampilkan (opsional). */
  code?: string;
  /** Pilihan jawaban (urutan = tampilan). */
  options: string[];
  /** Indeks jawaban benar pada `options`. */
  correctIndex: number;
  /** Penjelasan singkat untuk pembahasan. */
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "python-name-error",
    language: "python",
    question: "Kode Python berikut error. Apa jenis error dan penyebabnya?",
    code: "def hitung(nilai):\n    return total / len(nilai)",
    options: [
      "NameError: name 'total' is not defined",
      "TypeError: unsupported operand type(s)",
      "ValueError: invalid literal for int()",
      "Tidak ada error",
    ],
    correctIndex: 0,
    explanation:
      "Variabel `total` dipakai tetapi belum pernah didefinisikan, sehingga Python melempar NameError.",
  },
  {
    id: "javascript-const-reassign",
    language: "javascript",
    question: "Kode JavaScript berikut error saat dijalankan. Mengapa?",
    code: "const total = 10;\ntotal = 20;\nconsole.log(total);",
    options: [
      "TypeError: Assignment to constant variable",
      "SyntaxError: missing semicolon",
      "ReferenceError: total is not defined",
      "RangeError: Maximum call stack size exceeded",
    ],
    correctIndex: 0,
    explanation:
      "Variabel yang dideklarasikan dengan `const` tidak bisa di-assign ulang. Gunakan `let` bila perlu diubah.",
  },
  {
    id: "java-null-pointer",
    language: "java",
    question: "Apa yang terjadi saat kode Java ini dijalankan?",
    code: "public class Main {\n  public static void main(String[] args) {\n    String s = null;\n    System.out.println(s.length());\n  }\n}",
    options: [
      "NullPointerException",
      "ArrayIndexOutOfBoundsException",
      "NumberFormatException",
      "Compile error",
    ],
    correctIndex: 0,
    explanation:
      "Variabel `s` bernilai null, dan memanggil method `.length()` pada null memicu NullPointerException.",
  },
  {
    id: "cpp-out-of-bounds",
    language: "cpp",
    question: "Kenapa kode C++ berikut berisiko crash?",
    code: "int arr[3] = {1, 2, 3};\ncout << arr[5] << endl;",
    options: [
      "Akses indeks di luar batas array (out-of-bounds)",
      "Array tidak boleh diinisialisasi",
      "Operator cout tidak dikenal",
      "Tidak ada masalah",
    ],
    correctIndex: 0,
    explanation:
      "`arr` hanya punya indeks 0-2. Mengakses `arr[5]` di luar batas memicu perilaku tak terdefinisi / segfault.",
  },
  {
    id: "php-undefined-variable",
    language: "php",
    question: "Kode PHP berikut memunculkan warning. Apa penyebabnya?",
    code: "<?php\n$nama = 'Budi';\necho $umur;",
    options: [
      "Undefined variable: $umur",
      "Syntax error pada echo",
      "Tipe data tidak cocok",
      "Tidak ada warning",
    ],
    correctIndex: 0,
    explanation:
      "Variabel `$umur` belum pernah didefinisikan, sehingga PHP memunculkan warning undefined variable.",
  },
  {
    id: "python-indentation",
    language: "python",
    question: "Indentasi kode Python berikut salah. Error apa yang muncul?",
    code: "if True:\nprint('Halo')",
    options: [
      "IndentationError / SyntaxError",
      "NameError",
      "KeyError",
      "Tidak ada error",
    ],
    correctIndex: 0,
    explanation:
      "Blok di bawah `if True:` wajib di-indent (mis. 4 spasi). Tanpa indentasi, Python melempar IndentationError.",
  },
  {
    id: "javascript-type-error",
    language: "javascript",
    question: "Kode JavaScript berikut error saat dijalankan. Error apa itu?",
    code: "const user = {};\nconsole.log(user.profile.name);",
    options: [
      "TypeError: Cannot read properties of undefined",
      "ReferenceError",
      "SyntaxError",
      "RangeError",
    ],
    correctIndex: 0,
    explanation:
      "`user.profile` bernilai `undefined`, lalu mengakses `.name` pada undefined memicu TypeError.",
  },
];

/** Jumlah total pertanyaan kuis. */
export const QUIZ_TOTAL = QUIZ_QUESTIONS.length;

/**
 * Hitung skor 0-100 dari daftar jawaban (indeks pilihan per pertanyaan).
 * Jawaban yang tidak valid dihitung salah.
 */
export function calculateQuizScore(answers: Array<number | null | undefined>): number {
  if (QUIZ_TOTAL === 0) return 0;
  const correct = QUIZ_QUESTIONS.reduce((acc, q, i) => {
    return acc + (answers[i] === q.correctIndex ? 1 : 0);
  }, 0);
  return Math.round((correct / QUIZ_TOTAL) * 100);
}

/** Map skor -> preferensi gaya AI (kanonik untuk src/lib/ai.ts). */
export function scoreToAiPreference(score: number): "brief" | "medium" | "detailed" {
  if (score >= 80) return "brief";
  if (score >= 50) return "medium";
  return "detailed";
}
