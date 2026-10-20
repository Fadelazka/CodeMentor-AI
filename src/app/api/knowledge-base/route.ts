import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const language = searchParams.get("language");
    const search = searchParams.get("search") || searchParams.get("q");

    const where: any = {
      isActive: true,
    };

    if (language && language !== "all") {
      where.language = language;
    }

    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search.trim(), mode: "insensitive" } },
        { errorType: { contains: search.trim(), mode: "insensitive" } },
        { description: { contains: search.trim(), mode: "insensitive" } },
        { solution: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    const entries = await prisma.knowledgeBase.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: entries, count: entries.length });
  } catch (error) {
    console.error("[GET /api/knowledge-base] Error:", error);
    return NextResponse.json({ error: "Gagal mengambil data knowledge base." }, { status: 500 });
  }
}
