import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [totalPertanyaan, kbTotal, kbActive, feedbackHelpfulRaw, feedbackNotHelpfulRaw] =
      await Promise.all([
        prisma.chatHistory.count(),
        prisma.knowledgeBase.count(),
        prisma.knowledgeBase.count({ where: { isActive: true } }),
        prisma.chatHistory.count({ where: { feedback: "HELPFUL" } }),
        prisma.chatHistory.count({ where: { feedback: "NOT_HELPFUL" } }),
      ]);

    const histories = await prisma.chatHistory.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
      select: { language: true, confidence: true, createdAt: true },
    });

    const usageByLanguage: Record<string, number> = {};
    for (const h of histories) {
      usageByLanguage[h.language] = (usageByLanguage[h.language] ?? 0) + 1;
    }

    const usagePerBulan: Record<string, number> = {};
    for (const h of histories) {
      const key = new Intl.DateTimeFormat("id-ID", { month: "short" }).format(h.createdAt);
      usagePerBulan[key] = (usagePerBulan[key] ?? 0) + 1;
    }

    const akurasiRataRata = histories.length
      ? histories.reduce((acc, h) => acc + (h.confidence ?? 0), 0) / histories.length
      : 0;

    const feedbackTotal = feedbackHelpfulRaw + feedbackNotHelpfulRaw;
    const kepuasanUat = feedbackTotal ? Math.round((feedbackHelpfulRaw / feedbackTotal) * 100) : 0;

    return NextResponse.json({
      dbTersedia: true,
      kpi: {
        totalPertanyaan,
        knowledgeBaseTotal: kbTotal,
        knowledgeBaseAktif: kbActive,
        feedbackHelpful: feedbackHelpfulRaw,
        feedbackNotHelpful: feedbackNotHelpfulRaw,
        kepuasanUat,
        akurasiRataRata: Math.round(akurasiRataRata * 10) / 10,
      },
      usageByLanguage,
      usagePerBulan,
    });
  } catch (error) {
    // Database belum tersedia (mis. saat build/staging). Kembali dengan data
    // kosong agar response tetap stabil, bukan error 500.
    return NextResponse.json({
      dbTersedia: false,
      kpi: {
        totalPertanyaan: 0,
        knowledgeBaseTotal: 0,
        knowledgeBaseAktif: 0,
        feedbackHelpful: 0,
        feedbackNotHelpful: 0,
        kepuasanUat: 0,
        akurasiRataRata: 0,
      },
      usageByLanguage: {},
      usagePerBulan: {},
    });
  }
}