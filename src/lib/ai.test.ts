import { describe, it, expect, vi, beforeEach } from "vitest";

const findManyMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/prisma", () => ({
  prisma: {
    knowledgeBase: { findMany: (args: unknown) => findManyMock(args) },
  },
}));

import { retrieveRelevantErrors, generateExplainationWithGroq } from "./ai";

const sampleEntries = [
  {
    id: "1",
    language: "python",
    errorCode: "TypeError",
    title: "Operasi Tipe Data Tidak Cocok",
    description: "Menambahkan string dengan integer.",
    solution: "Gunakan str() untuk konversi.",
    tags: ["tipe-data"],
    isActive: true,
  },
  {
    id: "2",
    language: "python",
    errorCode: "IndexError",
    title: "Indeks List Di Luar Jangkauan",
    description: "Mengakses elemen list di luar batas.",
    solution: "Cek len() sebelum akses.",
    tags: ["list"],
    isActive: true,
  },
  {
    id: "3",
    language: "python",
    errorCode: "TypeError",
    title: "Entri Nonaktif",
    description: "Tidak boleh ikut terambil.",
    solution: "-",
    tags: [],
    isActive: false,
  },
];

beforeEach(() => {
  findManyMock.mockReset();
});

describe("retrieveRelevantErrors (RAG retrieval)", () => {
  it("memuat data knowledge base bahasa yang diminta dengan isActive true", async () => {
    findManyMock.mockResolvedValue(sampleEntries);

    await retrieveRelevantErrors("python", "TypeError");

    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { language: "python", isActive: true },
      })
    );
  });

  it("memberi skor tertinggi pada errorCode yang cocok persis", async () => {
    findManyMock.mockResolvedValue([sampleEntries[0], sampleEntries[1]]);

    const result = await retrieveRelevantErrors("python", "TypeError terjadi");

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].errorCode).toBe("TypeError");
    expect(result[0].score).toBeGreaterThan(result[1].score);
  });

  it("mengurutkan hasil berdasarkan skor menurun dan membatasi 5", async () => {
    findManyMock.mockResolvedValue(Array.from({ length: 10 }, (_, i) => ({
      id: String(i),
      language: "python",
      errorCode: `Err${i}`,
      title: `Error ${i}`,
      description: "deskripsi",
      solution: "solusi",
      tags: ["umum", "error"],
      isActive: true,
    })));

    const result = await retrieveRelevantErrors("python", "error");

    expect(result.length).toBeLessThanOrEqual(5);
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].score).toBeGreaterThanOrEqual(result[i].score);
    }
  });

  it("mengabaikan entri yang tidak relevan (skor nol)", async () => {
    findManyMock.mockResolvedValue([
      { ...sampleEntries[1], errorCode: "KeyError", tags: ["dict"] },
    ]);

    const result = await retrieveRelevantErrors("python", "TypeError list");

    expect(result.every((e) => e.score > 0)).toBe(true);
  });

  it("mengembalikan daftar kosong bila database tidak dapat dijangkau", async () => {
    findManyMock.mockRejectedValue(new Error("Can't reach database server"));

    const result = await retrieveRelevantErrors("python", "apapun");

    expect(result).toEqual([]);
  });
});

describe("generateExplainationWithGroq", () => {
  it("menggunakan fallback mode demo bila GROQ_API_KEY tidak dikonfigurasi", async () => {
    const original = process.env.GROQ_API_KEY;
    delete process.env.GROQ_API_KEY;

    const result = await generateExplainationWithGroq({
      language: "python",
      sourceCode: "x = 1 / 0",
      ragContext: {
        language: "python",
        errorCode: "ZeroDivisionError",
        matches: [
          {
            id: "9",
            errorCode: "ZeroDivisionError",
            title: "Pembagian dengan Nol",
            description: "Penyebut bernilai 0.",
            solution: "Validasi penyebut.",
          },
        ],
      },
    });

    expect(result.mock).toBe(true);
    expect(result.explanation).toContain("ZeroDivisionError");
    expect(result.confidence).toBe(80);

    if (original === undefined) delete process.env.GROQ_API_KEY;
    else process.env.GROQ_API_KEY = original;
  });

  it("menyusun penjelasan umum bila tidak ada kecocokan knowledge base", async () => {
    delete process.env.GROQ_API_KEY;

    const result = await generateExplainationWithGroq({
      language: "cpp",
      sourceCode: "fatal Error: segmentation fault",
      errorMessage: "Segmentation fault",
      ragContext: { language: "cpp", errorCode: undefined, matches: [] },
    });

    expect(result.explanation).toContain("Analisis Error");
    expect(result.confidence).toBe(80);
  });
});