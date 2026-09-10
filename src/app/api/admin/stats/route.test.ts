import { describe, it, expect, vi, beforeEach } from "vitest";

const prismaMock = vi.hoisted(() => ({
  chatHistory: {
    count: vi.fn(),
    findMany: vi.fn(),
  },
  knowledgeBase: {
    count: vi.fn(),
  },
}));

vi.mock("@/lib/prisma", () => ({
  prisma: prismaMock,
}));

import { GET } from "./route";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/admin/stats", () => {
  it("mengembalikan statistik lengkap saat database tersedia", async () => {
    prismaMock.chatHistory.count.mockResolvedValue(1200);
    prismaMock.knowledgeBase.count.mockResolvedValue(215);
    prismaMock.chatHistory.findMany.mockResolvedValue([
      { language: "python", confidence: 90, createdAt: new Date("2026-09-05") },
      { language: "python", confidence: 80, createdAt: new Date("2026-09-06") },
      { language: "java", confidence: 85, createdAt: new Date("2026-09-06") },
    ]);
    prismaMock.chatHistory.count.mockImplementation((args?: unknown) => {
      const where = (args as { where?: { feedback?: string } })?.where?.feedback;
      if (where === "HELPFUL") return Promise.resolve(900);
      if (where === "NOT_HELPFUL") return Promise.resolve(100);
      return Promise.resolve(1200);
    });

    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.dbTersedia).toBe(true);
    expect(body.kpi.totalPertanyaan).toBe(1200);
    expect(body.kpi.knowledgeBaseTotal).toBe(215);
    expect(body.kpi.feedbackHelpful).toBe(900);
    expect(body.kpi.feedbackNotHelpful).toBe(100);
    expect(body.kpi.kepuasanUat).toBe(90);
    expect(body.usageByLanguage).toEqual({ python: 2, java: 1 });
    expect(body.usagePerBulan).toHaveProperty("Sep");
  });

  it("mengembalikan data kosong graceful dengan dbTersedia=false saat DB gagal", async () => {
    prismaMock.chatHistory.count.mockRejectedValue(
      new Error("Can't reach database server at `localhost:5432`")
    );

    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.dbTersedia).toBe(false);
    expect(body.kpi.totalPertanyaan).toBe(0);
    expect(body.usageByLanguage).toEqual({});
    expect(body.usagePerBulan).toEqual({});
  });
});