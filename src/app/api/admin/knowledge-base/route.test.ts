import { describe, it, expect, vi, beforeEach } from "vitest";
import type { NextRequest } from "next/server";

const prismaMock = vi.hoisted(() => ({
  knowledgeBase: {
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

const sessionMock = vi.hoisted(() => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: prismaMock,
}));

vi.mock("next-auth", () => ({
  getServerSession: sessionMock.getServerSession,
}));

vi.mock("@/lib/auth", () => ({
  authOptions: {},
}));

import { GET, POST, PUT, DELETE } from "./route";

/** Request minimal: route ini hanya memakai `nextUrl.searchParams` dan `json()`. */
function request(query = "", body?: unknown): NextRequest {
  return {
    nextUrl: new URL(`http://localhost/api/admin/knowledge-base${query}`),
    json: async () => body,
  } as unknown as NextRequest;
}

/** Membuat sesi palsu dengan role tertentu. */
function setSession(role: "ADMIN" | "USER" | null) {
  sessionMock.getServerSession.mockResolvedValue(
    role ? { user: { id: "u1", role } } : null
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  setSession(null);
});

describe("GET /api/admin/knowledge-base", () => {
  it("menolak tamu dengan 403 dan tidak menyentuh database", async () => {
    const res = await GET(request());

    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ error: "Forbidden: admin only" });
    expect(prismaMock.knowledgeBase.findMany).not.toHaveBeenCalled();
  });

  it("menolak user biasa (role USER) dengan 403", async () => {
    setSession("USER");

    const res = await GET(request("?language=python"));

    expect(res.status).toBe(403);
    expect(prismaMock.knowledgeBase.findMany).not.toHaveBeenCalled();
  });

  it("mengembalikan daftar rekaman saat ADMIN", async () => {
    setSession("ADMIN");
    prismaMock.knowledgeBase.findMany.mockResolvedValue([
      { id: "kb1", language: "python", errorCode: "ZeroDivisionError" },
      { id: "kb2", language: "java", errorCode: "NullPointerException" },
    ]);

    const res = await GET(request("?language=python&active=true"));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.count).toBe(2);
    expect(body.data[0].errorCode).toBe("ZeroDivisionError");
    expect(prismaMock.knowledgeBase.findMany).toHaveBeenCalledWith({
      where: { language: "python", isActive: true },
      orderBy: { updatedAt: "desc" },
    });
  });
});

describe("POST /api/admin/knowledge-base", () => {
  const payload = {
    language: "python",
    errorCode: "ZeroDivisionError",
    title: "Pembagian dengan Nol",
    description: "Terjadi saat membagi dengan 0.",
    solution: "Cek pembilang sebelum dibagi.",
    examples: "print(1/0)",
    tags: ["Math"],
  };

  it("menolak tamu dengan 403 dan tidak membuat data", async () => {
    const res = await POST(request("", payload));

    expect(res.status).toBe(403);
    expect(prismaMock.knowledgeBase.create).not.toHaveBeenCalled();
  });

  it("menolak user biasa (role USER) dengan 403", async () => {
    setSession("USER");

    const res = await POST(request("", payload));

    expect(res.status).toBe(403);
    expect(prismaMock.knowledgeBase.create).not.toHaveBeenCalled();
  });

  it("membuat rekaman saat ADMIN dan menjawab 201", async () => {
    setSession("ADMIN");
    prismaMock.knowledgeBase.create.mockResolvedValue({
      id: "kb3",
      ...payload,
      isActive: true,
    });

    const res = await POST(request("", payload));

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.message).toBe("Rekaman knowledge base ditambahkan.");
    expect(body.data.id).toBe("kb3");
  });

  it("menolak body tanpa field wajib dengan 400 (setelah guard admin)", async () => {
    setSession("ADMIN");

    const res = await POST(request("", { language: "python" }));

    expect(res.status).toBe(400);
    expect(prismaMock.knowledgeBase.create).not.toHaveBeenCalled();
  });
});

describe("PUT /api/admin/knowledge-base", () => {
  it("menolak tamu dengan 403 dan tidak mengubah data", async () => {
    const res = await PUT(request("?id=kb1", { isActive: false }));

    expect(res.status).toBe(403);
    expect(prismaMock.knowledgeBase.update).not.toHaveBeenCalled();
  });

  it("menolak ADMIN tanpa parameter id dengan 400", async () => {
    setSession("ADMIN");

    const res = await PUT(request("", { isActive: false }));

    expect(res.status).toBe(400);
    expect(prismaMock.knowledgeBase.update).not.toHaveBeenCalled();
  });

  it("memperbarui rekaman saat ADMIN", async () => {
    setSession("ADMIN");
    prismaMock.knowledgeBase.update.mockResolvedValue({
      id: "kb1",
      isActive: false,
    });

    const res = await PUT(request("?id=kb1", { isActive: false }));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe("Rekaman diperbarui.");
    expect(prismaMock.knowledgeBase.update).toHaveBeenCalledWith({
      where: { id: "kb1" },
      data: { isActive: false },
    });
  });
});

describe("DELETE /api/admin/knowledge-base", () => {
  it("menolak tamu dengan 403 dan tidak menghapus data", async () => {
    const res = await DELETE(request("?id=kb1"));

    expect(res.status).toBe(403);
    expect(prismaMock.knowledgeBase.delete).not.toHaveBeenCalled();
  });

  it("menolak user biasa (role USER) dengan 403", async () => {
    setSession("USER");

    const res = await DELETE(request("?id=kb1"));

    expect(res.status).toBe(403);
    expect(prismaMock.knowledgeBase.delete).not.toHaveBeenCalled();
  });

  it("menghapus rekaman saat ADMIN", async () => {
    setSession("ADMIN");
    prismaMock.knowledgeBase.delete.mockResolvedValue({ id: "kb1" });

    const res = await DELETE(request("?id=kb1"));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ success: true, message: "Rekaman dihapus." });
    expect(prismaMock.knowledgeBase.delete).toHaveBeenCalledWith({
      where: { id: "kb1" },
    });
  });
});
