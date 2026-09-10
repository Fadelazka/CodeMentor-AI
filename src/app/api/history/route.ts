import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const language = searchParams.get("language");
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "50", 10), 200);

    const histories = await prisma.chatHistory.findMany({
      where: language ? { language } : undefined,
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
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Parameter id wajib diisi. Gunakan ?id= untuk menghapus satu, atau ?all=1 untuk semua." },
        { status: 400 }
      );
    }

    await prisma.chatHistory.deleteMany({ where: { id } });

    return NextResponse.json({ success: true, message: "Riwayat dihapus." });
  } catch (error) {
    console.error("History DELETE error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal." }, { status: 500 });
  }
}