import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Masukkan email yang valid." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Tetap kembalikan sukses meski user tidak ditemukan (hindari email enumeration)
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "Jika email terdaftar, kami akan mengirimkan tautan untuk mengatur ulang kata sandi.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpiry },
    });

    const origin = req.headers.get("origin") || "http://localhost:3000";
    const resetLink = `${origin}/reset-password?token=${token}`;

    // Mock pengiriman email - hanya log ke console
    console.log("[forgot-password] RESET LINK:", resetLink);

    return NextResponse.json({
      success: true,
      message:
        "Jika email terdaftar, kami akan mengirimkan tautan untuk mengatur ulang kata sandi.",
    });
  } catch (error) {
    console.error("[forgot-password] Error:", error);
    return NextResponse.json(
      { error: "Gagal memproses permintaan." },
      { status: 500 }
    );
  }
}
