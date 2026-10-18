import { NextRequest, NextResponse } from "next/server";
import { retrieveRelevantErrors, generateExplainationWithGroq } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

// Fungsi untuk mendeteksi tipe error dari pesan error atau respons AI
function detectErrorType(errorMessage: string | undefined, aiResponse: string): string | null {
  const text = `${errorMessage ?? ""} ${aiResponse}`.toLowerCase();

  const errorPatterns: Record<string, RegExp> = {
    'SyntaxError': /syntaxerror|syntax error|invalid syntax/i,
    'TypeError': /typeerror|type error|cannot read propert/i,
    'NameError': /nameerror|name error|not defined/i,
    'IndexError': /indexerror|index error|list index out of range/i,
    'KeyError': /keyerror|key error/i,
    'ValueError': /valueerror|value error|invalid literal/i,
    'AttributeError': /attributeerror|attribute error|has no attribute/i,
    'ZeroDivisionError': /zerodivisionerror|zero division error|division by zero/i,
    'IndentationError': /indentationerror|indentation error/i,
    'ImportError': /importerror|import error|no module named/i,
    'ModuleNotFoundError': /modulenotfounderror|module not found/i,
    'ReferenceError': /referenceerror|reference error|is not defined/i,
    'RangeError': /rangeerror|range error/i,
    'CompileError': /compile error|compilation error/i,
    'RuntimeError': /runtime error/i,
    'NullPointerException': /nullpointerexception|null pointer exception/i,
    'ArrayIndexOutOfBoundsException': /arrayindexoutofboundsexception|index out of bounds/i,
    'NumberFormatException': /numberformatexception|number format exception/i,
    'ArithmeticException': /arithmeticexception|arithmetic exception/i,
    'SegmentationFault': /segmentation fault|segfault/i,
  };

  for (const [errorType, pattern] of Object.entries(errorPatterns)) {
    if (pattern.test(text)) {
      return errorType;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

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

    // Preferensi gaya AI: ambil dari DB (hasil kuis) bila user sudah menyelesaikan kuis.
    // Jika belum, tetap pakai setting dari client (localStorage) -> perilaku lama tidak berubah.
    const VALID_LEVELS = ["brief", "medium", "detailed"] as const;
    type DetailLevel = (typeof VALID_LEVELS)[number];

    let dbPreference: DetailLevel | undefined;
    if (session?.user?.id) {
      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { aiPreference: true, quizCompletedAt: true },
        });
        if (
          dbUser?.quizCompletedAt &&
          dbUser.aiPreference &&
          (VALID_LEVELS as readonly string[]).includes(dbUser.aiPreference)
        ) {
          dbPreference = dbUser.aiPreference as DetailLevel;
        }
      } catch {
        // toleran: bila gagal baca preferensi, lanjut dengan default.
      }
    }

    const clientLevel = (VALID_LEVELS as readonly string[]).includes(body.aiDetailLevel)
      ? (body.aiDetailLevel as DetailLevel)
      : undefined;
    const effectiveDetailLevel: DetailLevel = dbPreference ?? clientLevel ?? "medium";

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
      aiLanguage: body.aiLanguage,
      aiDetailLevel: effectiveDetailLevel,
    });

    const responseTimeMs = Date.now() - startTime;

    // Deteksi tipe error dari pesan error user atau respons AI
    const detectedErrorCode = detectErrorType(errorMessage, result.explanation);

    console.log(
      `[api/chat] lang=${language} codeLen=${sourceCode.length} errMsg=${(errorMessage ?? "").slice(0, 80) || "-"} detectedError=${detectedErrorCode} ragMatches=${ragContext.matches.length} mock=${result.mock} responseTimeMs=${responseTimeMs}`
    );

    // Simpan riwayat hanya jika diizinkan oleh preferensi user (auto-save).
    let chatHistoryId: string | null = null;
    try {
      if (saveHistory !== false && session?.user?.id) {
        const saved = await prisma.chatHistory.create({
          data: {
            userId: session.user.id,
            language,
            errorCode: detectedErrorCode ?? ragContext.errorCode,
            errorMessage: errorMessage ?? null,
            sourceCode,
            aiResponse: result.explanation,
            confidence: result.confidence,
            responseTimeMs,
          },
        });
        chatHistoryId = saved.id;
      }
    } catch {
      // toleran terhadap kegagalan penyimpanan riwayat
    }

    return NextResponse.json({
      explanation: result.explanation,
      confidence: result.confidence,
      mock: result.mock,
      ragMatches: ragContext.matches.length,
      responseTimeMs,
      detectedErrorCode,
      chatHistoryId,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal." }, { status: 500 });
  }
}