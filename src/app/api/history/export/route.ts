import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

const CSV_HEADERS = [
  "ID",
  "Tanggal",
  "Bahasa",
  "Error Code",
  "Error Message",
  "Kode",
  "Penjelasan AI",
  "Confidence",
];

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value).replace(/"/g, '""');
  if (/[",\n\r]/.test(str)) return `"${str}"`;
  return str;
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const format = (searchParams.get("format") ?? "csv").toLowerCase();
    const language = searchParams.get("language") ?? "all";
    const search = (searchParams.get("q") ?? "").trim();

    const where: Prisma.ChatHistoryWhereInput = { userId: session.user.id };
    if (language && language !== "all") where.language = language;
    if (search) {
      where.OR = [
        { errorCode: { contains: search, mode: "insensitive" } },
        { sourceCode: { contains: search, mode: "insensitive" } },
      ];
    }

    const history = await prisma.chatHistory.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        language: true,
        errorCode: true,
        errorMessage: true,
        sourceCode: true,
        aiResponse: true,
        confidence: true,
      },
    });

    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");

    if (format === "json") {
      const payload = JSON.stringify(
        {
          exportedAt: new Date().toISOString(),
          total: history.length,
          filter: { language, search },
          items: history,
        },
        null,
        2
      );

      return new NextResponse(payload, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Disposition": `attachment; filename="codementor-riwayat-${stamp}.json"`,
        },
      });
    }

    const rows = history.map((item) =>
      [
        item.id,
        new Date(item.createdAt).toISOString(),
        item.language,
        item.errorCode,
        item.errorMessage,
        item.sourceCode,
        item.aiResponse,
        item.confidence,
      ]
        .map(escapeCsv)
        .join(",")
    );

    const csv = "\uFEFF" + [CSV_HEADERS.join(","), ...rows].join("\r\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="codementor-riwayat-${stamp}.csv"`,
      },
    });
  } catch (error) {
    console.error("[export/history] Error:", error);
    return NextResponse.json({ error: "Gagal export riwayat." }, { status: 500 });
  }
}
