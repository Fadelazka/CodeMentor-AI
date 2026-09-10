import { describe, it, expect } from "vitest";
import { cn, formatDate, formatDateShort, formatRupiah, truncate, getLanguageLabel } from "./utils";

describe("cn", () => {
  it("menggabungkan class dasar", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("menghilangkan nilai falsy", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });

  it("menggabungkan class bersyarat", () => {
    expect(cn("px-2", true && "py-4")).toBe("px-2 py-4");
  });

  it("menggabungkan class tailwind yang bertabrakan (tailwind-merge)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});

describe("formatRupiah", () => {
  it("memformat angka menjadi mata uang Rupiah", () => {
    expect(formatRupiah(194700000)).toContain("Rp");
    expect(formatRupiah(194700000)).toContain("194.700.000");
  });

  it("memformat nominal nol tanpa membuang waktu", () => {
    expect(formatRupiah(0)).toContain("Rp");
    expect(formatRupiah(0)).toContain("0");
  });

  it("tanpa pecahan desimal (dibulatkan)", () => {
    expect(formatRupiah(1500.5)).toContain("1.501");
  });
});

describe("formatDate", () => {
  it("memformat tanggal lengkap dengan waktu dalam locale id-ID", () => {
    const result = formatDate("2026-09-01T08:30:00Z");
    expect(result).toMatch(/Sep/i);
    expect(result).toContain("2026");
  });

  it("menerima objek Date", () => {
    const result = formatDate(new Date("2026-12-15T00:00:00Z"));
    expect(result).toMatch(/2026/);
  });

  it("mengembalikan '-' untuk tanggal tidak valid", () => {
    expect(formatDate("invalid-date")).toBe("-");
  });
});

describe("formatDateShort", () => {
  it("memformat tanggal tanpa waktu", () => {
    const result = formatDateShort("2026-09-01");
    expect(result).toMatch(/Sep/);
    expect(result).toMatch(/2026/);
  });
});

describe("truncate", () => {
  it("mengembalikan string apa adanya bila lebih pendek dari batas", () => {
    expect(truncate("pendek", 10)).toBe("pendek");
  });

  it("memotong string yang lebih panjang dan menambahkan elipsis", () => {
    expect(truncate("abcdefghij", 5)).toBe("abcde...");
  });

  it("mengembalikan seluruh string saat panjangnya sama persis", () => {
    expect(truncate("abcde", 5)).toBe("abcde");
  });
});

describe("getLanguageLabel", () => {
  it("memetakan 5 bahasa yang didukung", () => {
    expect(getLanguageLabel("python")).toBe("Python");
    expect(getLanguageLabel("javascript")).toBe("JavaScript");
    expect(getLanguageLabel("java")).toBe("Java");
    expect(getLanguageLabel("cpp")).toBe("C++");
    expect(getLanguageLabel("php")).toBe("PHP");
  });

  it("mengembalikan bahasa apa adanya bila tidak dikenal", () => {
    expect(getLanguageLabel("ruby")).toBe("ruby");
  });
});