import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_PREFERENCES = ["brief", "medium", "detailed"] as const;
type AiPreference = (typeof ALLOWED_PREFERENCES)[number];

function isAiPreference(value: unknown): value is AiPreference {
  return typeof value === "string" && (ALLOWED_PREFERENCES as readonly string[]).includes(value);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Tidak terautentikasi." }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { score, preference } = body as { score?: unknown; preference?: unknown };

    if (typeof score !== "number" || !Number.isFinite(score) || score < 0 || score > 100) {
      return NextResponse.json({ error: "Skor tidak valid (0-100)." }, { status: 400 });
    }
    if (!isAiPreference(preference)) {
      return NextResponse.json(
        { error: "Preferensi tidak valid (brief/medium/detailed)." },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        quizScore: Math.round(score),
        aiPreference: preference,
        quizCompletedAt: new Date(),
      },
      select: { id: true, quizScore: true, aiPreference: true, quizCompletedAt: true },
    });

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Quiz submit error:", error);
    return NextResponse.json({ error: "Gagal menyimpan hasil kuis." }, { status: 500 });
  }
}
