import { NextRequest, NextResponse } from "next/server";
import { retrieveRelevantErrors, generateExplainationWithGroq } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sourceCode, language = "python", errorMessage } = body;

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

    // Simpan riwayat jika user terautentikasi
    try {
      const authHeader = req.headers.get("authorization");
      if (authHeader) {
        // Dalam produksi: verifikasi sesi NextAuth & simpan dengan userId.
        await prisma.chatHistory.create({
          data: {
            userId: "demo-user",
            language,
            errorCode: ragContext.errorCode,
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