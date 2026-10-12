import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const language = searchParams.get("language");
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "50", 10), 200);
    const id = searchParams.get("id");

    // Single history detail
    if (id) {
      const history = await prisma.chatHistory.findFirst({
        where: { id, userId: session.user.id },
      });
      if (!history) {
        return NextResponse.json({ error: "Riwayat tidak ditemukan" }, { status: 404 });
      }
      return NextResponse.json({ data: history });
    }

    const histories = await prisma.chatHistory.findMany({
      where: {
        userId: session.user.id,
        ...(language ? { language } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json({ data: histories, count: histories.length });
  } catch (error) {
    console.error("History API error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const all = searchParams.get("all");

    if (all === "1") {
      // Delete all history for this user
      await prisma.chatHistory.deleteMany({ where: { userId: session.user.id } });
      return NextResponse.json({ success: true, message: "Semua riwayat dihapus." });
    }

    if (!id) {
      return NextResponse.json(
        { error: "Parameter id wajib diisi. Gunakan ?id= untuk menghapus satu, atau ?all=1 untuk semua." },
        { status: 400 }
      );
    }

    // Delete specific history item, but only if it belongs to this user
    const deleted = await prisma.chatHistory.deleteMany({
      where: { id, userId: session.user.id },
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: "Riwayat tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Riwayat dihapus." });
  } catch (error) {
    console.error("History DELETE error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal." }, { status: 500 });
  }
}