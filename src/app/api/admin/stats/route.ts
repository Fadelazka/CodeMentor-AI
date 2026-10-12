import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Hanya admin yang boleh akses
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: admin only" },
        { status: 403 }
      );
    }

    // ==== GLOBAL STATS (semua user) ====

    // Total pertanyaan (semua user)
    const totalQuestions = await prisma.chatHistory.count();

    // Total feedback positif (untuk akurasi)
    const feedbackHelpful = await prisma.chatHistory.count({ where: { feedback: "HELPFUL" } });
    const feedbackNotHelpful = await prisma.chatHistory.count({ where: { feedback: "NOT_HELPFUL" } });
    const feedbackTotal = feedbackHelpful + feedbackNotHelpful;
    const aiAccuracy = feedbackTotal > 0
      ? Math.round((feedbackHelpful / feedbackTotal) * 1000) / 10
      : 0;

    // Rata-rata confidence (sebagai proxy waktu respons - tidak ada field responseTimeMs)
    const avgConfidenceResult = await prisma.chatHistory.aggregate({
      _avg: { confidence: true },
    });
    const avgConfidence = avgConfidenceResult._avg.confidence ?? 0;

    // Total error unik yang sudah dipecahkan
    const distinctErrors = await prisma.chatHistory.groupBy({
      by: ["errorCode"],
      where: { errorCode: { not: null } },
      _count: true,
    });

    // ==== CHART: 14 HARI TERAKHIR ====
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const dailyCounts: Record<string, number> = {};
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      const key = d.toISOString().split("T")[0];
      dailyCounts[key] = 0;
    }

    const recentHistories = await prisma.chatHistory.findMany({
      where: {
        createdAt: { gte: fourteenDaysAgo },
      },
      select: { createdAt: true },
    });

    recentHistories.forEach(h => {
      const key = h.createdAt.toISOString().split("T")[0];
      if (dailyCounts[key] !== undefined) dailyCounts[key]++;
    });

    const dailyChart = Object.entries(dailyCounts).map(([date, count]) => ({
      date,
      count,
    }));

    // ==== CHART: BAHASA YANG DIGUNAKAN ====
    const languageUsage = await prisma.chatHistory.groupBy({
      by: ["language"],
      _count: true,
    });
    const languageChart = languageUsage.map(l => ({
      language: l.language,
      count: l._count,
    }));

    // ==== ERROR PALING SERING ====
    const topErrors = await prisma.chatHistory.groupBy({
      by: ["errorCode"],
      where: { errorCode: { not: null } },
      _count: true,
      orderBy: { _count: { errorCode: "desc" } },
      take: 5,
    });
    const topErrorsList = topErrors.map(e => ({
      errorType: e.errorCode!,
      count: e._count,
    }));

    // ==== RECOMMENDATIONS (top 3 errors → article links) ====
    const recommendations = topErrorsList.slice(0, 3).map(e => ({
      errorType: e.errorType,
      title: `Panduan: ${e.errorType}`,
      url: `/knowledge-base?error=${encodeURIComponent(e.errorType)}`,
    }));

    // ==== META INFO ====
    const totalUsers = await prisma.user.count();
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const activeUsers7d = await prisma.user.count({
      where: {
        chatHistory: {
          some: {
            createdAt: { gte: sevenDaysAgo },
          },
        },
      },
    });

    // Generate empty sparklines (7 points)
const emptySparkline = [0, 0, 0, 0, 0, 0, 0];

return NextResponse.json({
      isAdminView: true,
      summary: {
        totalQuestions,
        aiAccuracy,
        avgResponseTime: Math.round(avgConfidence), // gunakan confidence sebagai proxy
        errorsSolved: distinctErrors.length,
        sparklines: {
          totalQuestions: emptySparkline,
          aiAccuracy: emptySparkline,
          avgResponseTime: emptySparkline,
          errorsSolved: emptySparkline,
        },
      },
      charts: {
        daily: dailyChart,
        languages: languageChart,
      },
      topErrors: topErrorsList,
      recommendations,
      meta: {
        totalUsers,
        activeUsers7d,
      },
    });

  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to load admin stats" },
      { status: 500 }
    );
  }
}