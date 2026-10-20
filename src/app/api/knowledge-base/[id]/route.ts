import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const entry = await prisma.knowledgeBase.findFirst({
      where: {
        id,
        isActive: true,
      },
    });

    if (!entry) {
      return NextResponse.json({ error: "Data tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ data: entry });
  } catch (error) {
    console.error("[GET /api/knowledge-base/:id] Error:", error);
    return NextResponse.json({ error: "Gagal mengambil data knowledge base." }, { status: 500 });
  }
}
