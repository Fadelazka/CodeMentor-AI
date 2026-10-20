import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
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

    const origin = req.headers.get("origin") || "https://code-mentor-ai-zeta-three.vercel.app";
    const resetLink = `${origin}/reset-password?token=${token}`;

    try {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "Atur Ulang Kata Sandi - CodeMentor AI",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333;">Atur Ulang Kata Sandi</h2>
              <p>Halo ${user.name || "Pengguna"},</p>
              <p>Kami menerima permintaan untuk mengatur ulang kata sandi akun CodeMentor AI Anda.</p>
              <p>Klik tombol di bawah ini untuk mengatur ulang kata sandi:</p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Atur Ulang Kata Sandi
                </a>
              </p>
              <p>Atau salin dan tempel tautan ini ke browser Anda:</p>
              <p style="word-break: break-all; color: #666;">${resetLink}</p>
              <p>Tautan ini akan kedaluwarsa dalam 1 jam.</p>
              <p>Jika Anda tidak meminta pengaturan ulang kata sandi, abaikan email ini.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              <p style="color: #666; font-size: 12px;">CodeMentor AI</p>
            </div>
          `,
        });
        console.log("[forgot-password] Email berhasil dikirim via Resend ke:", email);
      } else {
        console.error("[forgot-password] RESEND_API_KEY tidak ditemukan di environment variables");
      }
    } catch (emailError) {
      console.error("[forgot-password] Gagal mengirim email:", emailError);
      // Tetap kembalikan sukses untuk keamanan (hindari email enumeration)
    }

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
