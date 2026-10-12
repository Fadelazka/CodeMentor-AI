import { NextRequest, NextResponse } from "next/server";
import { retrieveRelevantErrors, generateExplainationWithGroq } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { sourceCode, language = "python", errorMessage, saveHistory } = body;

    if (!sourceCode || typeof sourceCode !== "string" || sourceCode.trim().length === 0) {
      return NextResponse.json({ error: "sourceCode wajib diisi." }, { status: 400 });
    }

    const allowedLanguages = ["python", "javascript", "java", "cpp", "php"];
    if (!allowedLanguages.includes(language)) {
      return NextResponse.json({ error: "Bahasa tidak didukung." }, { status: 400 });
    }

    const ragContext = {
      language,
      matches: await retrieveRelevantErrors(language, `${sourceCode} ${errorMessage ?? ""}`),
      errorCode: errorMessage?.slice(0, 80),
    };

    const result = await generateExplainationWithGroq({
      language,
      sourceCode,
      errorMessage,
      ragContext,
    });

    console.log(
      `[api/chat] lang=${language} codeLen=${sourceCode.length} errMsg=${(errorMessage ?? "").slice(0, 80) || "-"} ragMatches=${ragContext.matches.length} mock=${result.mock}`
    );

    // Simpan riwayat hanya jika diizinkan oleh preferensi user (auto-save).
    try {
      if (saveHistory !== false && session?.user?.id) {
        await prisma.chatHistory.create({
          data: {
            userId: session.user.id,
            language,
            errorCode: ragContext.errorCode,
            errorMessage: errorMessage ?? null,
            sourceCode,
            aiResponse: result.explanation,
            confidence: result.confidence,
          },
        });
      }
    } catch {
      // toleran terhadap kegagalan penyimpanan riwayat
    }

    return NextResponse.json({
      explanation: result.explanation,
      confidence: result.confidence,
      mock: result.mock,
      ragMatches: ragContext.matches.length,
      responseTimeMs: 0,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal." }, { status: 500 });
  }
}