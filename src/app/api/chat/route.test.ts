import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const prismaMock = vi.hoisted(() => ({
  chatHistory: {
    create: vi.fn(),
  },
  knowledgeBase: {
    findMany: vi.fn(),
  },
}));

vi.mock("@/lib/prisma", () => ({
  prisma: prismaMock,
}));

import { POST } from "./route";

function buildRequest(body: unknown, authHeader?: string) {
  return new NextRequest("http://localhost/api/chat", {
    method: "POST",
    headers: authHeader ? { authorization: authHeader } : {},
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/chat", () => {
  it("menolak saat sourceCode kosong dengan 400", async () => {
    const res = await POST(buildRequest({ sourceCode: "   " }));

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("wajib diisi");
  });

  it("menolak saat sourceCode bukan string dengan 400", async () => {
    const res = await POST(buildRequest({ sourceCode: 12345 }));

    expect(res.status).toBe(400);
  });

  it("menolak bahasa yang tidak didukung dengan 400", async () => {
    const res = await POST(buildRequest({ sourceCode: "print(1)", language: "rust" }));

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("tidak didukung");
  });

  it("mengembalikan penjelasan berbasis knowledge base dalam mode demo", async () => {
    prismaMock.knowledgeBase.findMany.mockResolvedValue([
      {
        id: "1",
        language: "python",
        errorCode: "ZeroDivisionError",
        title: "Pembagian dengan Nol",
        description: "Penyebut bernilai 0.",
        solution: "Validasi penyebut sebelum operasi.",
        tags: ["aritmatika"],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const res = await POST(buildRequest({ sourceCode: "print(1 / 0)", language: "python", errorMessage: "ZeroDivisionError" }));

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.mock).toBe(true);
    expect(body.confidence).toBe(80);
    expect(body.explanation).toContain("ZeroDivisionError");
    expect(body.explanation).toContain("Pembagian dengan Nol");
    expect(body.ragMatches).toBeGreaterThan(0);
    expect(typeof body.responseTimeMs).toBe("number");
  });

  it("tidak menyimpan riwayat saat tidak ada header authorization", async () => {
    prismaMock.knowledgeBase.findMany.mockResolvedValue([]);

    await POST(buildRequest({ sourceCode: "int x = 0;", language: "cpp" }));

    expect(prismaMock.chatHistory.create).not.toHaveBeenCalled();
  });

  it("masih sukses walau penyimpanan riwayat gagal (toleran)", async () => {
    prismaMock.knowledgeBase.findMany.mockResolvedValue([]);
    prismaMock.chatHistory.create.mockRejectedValue(new Error("DB down"));

    const res = await POST(
      buildRequest({ sourceCode: "echo 'halo';", language: "php" }, "Bearer token")
    );

    expect(res.status).toBe(200);
    expect(prismaMock.chatHistory.create).toHaveBeenCalledTimes(1);
  });
});