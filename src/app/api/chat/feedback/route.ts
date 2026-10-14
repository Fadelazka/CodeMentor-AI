import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

const FEEDBACK_MAP = {
  helpful: "HELPFUL",
  not_helpful: "NOT_HELPFUL",
} as const;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { chatHistoryId, feedback, comment } = body;

    if (!chatHistoryId || !feedback) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    if (!(feedback in FEEDBACK_MAP)) {
      return NextResponse.json({ error: "Feedback tidak valid" }, { status: 400 });
    }

    const chat = await prisma.chatHistory.findUnique({
      where: { id: chatHistoryId },
      select: { userId: true },
    });

    if (!chat || chat.userId !== session.user.id) {
      return NextResponse.json({ error: "Chat tidak ditemukan" }, { status: 404 });
    }

    const updated = await prisma.chatHistory.update({
      where: { id: chatHistoryId },
      data: {
        feedback: FEEDBACK_MAP[feedback as keyof typeof FEEDBACK_MAP],
        feedbackComment: comment?.trim() || null,
        feedbackAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, id: updated.id });
  } catch (error) {
    console.error("[chat/feedback]", error);
    return NextResponse.json({ error: "Gagal menyimpan feedback" }, { status: 500 });
  }
}
