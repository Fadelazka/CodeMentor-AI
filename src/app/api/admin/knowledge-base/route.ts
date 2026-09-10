import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const language = searchParams.get("language");
    const activeOnly = searchParams.get("active") === "true";

    const entries = await prisma.knowledgeBase.findMany({
      where: {
        ...(language ? { language } : {}),
        ...(activeOnly ? { isActive: true } : {}),
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ data: entries, count: entries.length });
  } catch (error) {
    console.error("Knowledge base GET error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { language, errorCode, title, description, solution, examples, tags } = body;

    if (!language || !errorCode || !title || !description || !solution) {
      return NextResponse.json(
        { error: "Field wajib: language, errorCode, title, description, solution." },
        { status: 400 }
      );
    }

    const entry = await prisma.knowledgeBase.create({
      data: {
        language,
        errorCode,
        title,
        description,
        solution,
        examples,
        tags: tags ?? [],
      },
    });

    return NextResponse.json({ data: entry, message: "Rekaman knowledge base ditambahkan." }, { status: 201 });
  } catch (error) {
    console.error("Knowledge base POST error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Parameter id wajib diisi." }, { status: 400 });
    }

    const body = await req.json();
    const updated = await prisma.knowledgeBase.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ data: updated, message: "Rekaman diperbarui." });
  } catch (error) {
    console.error("Knowledge base PUT error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Parameter id wajib diisi." }, { status: 400 });
    }

    await prisma.knowledgeBase.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Rekaman dihapus." });
  } catch (error) {
    console.error("Knowledge base DELETE error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal." }, { status: 500 });
  }
}