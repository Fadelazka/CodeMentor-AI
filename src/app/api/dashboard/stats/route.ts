import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // If not authenticated, return default empty stats (not 401)
    // This allows the dashboard to show empty state gracefully
    if (!session?.user) {
      return NextResponse.json({
        dbTersedia: true,
        totalQuestions: 0,
        aiAccuracy: 0,
        avgResponseTime: 0,
        errorsSolved: 0,
        usageByLanguage: {},
        usagePerDay: [],
        recentActivity: [],
        _note: "Belum login",
      });
    }

    const user = session.user as SessionUser;
    if (!user.id) {
      return NextResponse.json({
        dbTersedia: true,
        totalQuestions: 0,
        aiAccuracy: 0,
        avgResponseTime: 0,
        errorsSolved: 0,
        usageByLanguage: {},
        usagePerDay: [],
        recentActivity: [],
        _note: "Invalid session",
      });
    }

    const userId = user.id;

    const [
      totalQuestions,
      feedbackHelpful,
      feedbackNotHelpful,
      avgResponseTime,
      errorTypes,
      recentActivity,
    ] = await Promise.all([
      prisma.chatHistory.count({ where: { userId } }),
      prisma.chatHistory.count({ where: { userId, feedback: "HELPFUL" } }),
      prisma.chatHistory.count({ where: { userId, feedback: "NOT_HELPFUL" } }),
      prisma.chatHistory.aggregate({
        where: { userId },
        _avg: { confidence: true },
      }),
      prisma.chatHistory.groupBy({
        by: ["errorCode"],
        where: { userId, errorCode: { not: null } },
        _count: true,
      }),
      prisma.chatHistory.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          language: true,
          errorCode: true,
          confidence: true,
          createdAt: true,
        },
      }),
    ]);

    const aiAccuracy = feedbackHelpful + feedbackNotHelpful > 0
      ? Math.round((feedbackHelpful / (feedbackHelpful + feedbackNotHelpful)) * 100) / 100
      : 0;

    // Usage per language
    const usageByLanguage = await prisma.chatHistory.groupBy({
      by: ["language"],
      where: { userId },
      _count: true,
    });

    // Usage per day (last 14 days)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const usagePerDay = await prisma.chatHistory.groupBy({
      by: ["createdAt"],
      where: { userId, createdAt: { gte: twoWeeksAgo } },
      _count: true,
    });

    return NextResponse.json({
      dbTersedia: true,
      totalQuestions,
      aiAccuracy,
      avgResponseTime: 0,
      errorsSolved: errorTypes.length,
      usageByLanguage: usageByLanguage.reduce((acc, item) => ({ ...acc, [item.language]: item._count }), {}),
      usagePerDay: usagePerDay.map(item => ({
        date: item.createdAt.toISOString().split("T")[0],
        count: item._count,
      })),
      recentActivity,
    });
  } catch (error) {
    console.error("[dashboard/stats] Error:", error);
    // Return fallback 0 stats instead of 500
    return NextResponse.json({
      dbTersedia: false,
      totalQuestions: 0,
      aiAccuracy: 0,
      avgResponseTime: 0,
      errorsSolved: 0,
      usageByLanguage: {},
      usagePerDay: [],
      recentActivity: [],
      _error: "Internal fallback",
    });
  }
}