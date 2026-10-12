import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { Role } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Never leak passwordHash to the client.
const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
} as const;

// PATCH — update user
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : undefined;
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : undefined;
    const password = typeof body.password === "string" ? body.password : "";
    const role = body.role as Role | undefined;

    if (name !== undefined && name.length < 2) {
      return NextResponse.json({ error: "Nama minimal 2 karakter." }, { status: 400 });
    }
    if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Format email tidak valid." }, { status: 400 });
    }
    if (password && password.trim() && password.length < 6) {
      return NextResponse.json({ error: "Password minimal 6 karakter." }, { status: 400 });
    }
    if (role !== undefined && role !== "USER" && role !== "ADMIN") {
      return NextResponse.json({ error: "Role tidak valid." }, { status: 400 });
    }

    if (email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== params.id) {
        return NextResponse.json({ error: "Email sudah terdaftar." }, { status: 409 });
      }
    }

    const data: {
      name?: string;
      email?: string;
      role?: Role;
      passwordHash?: string;
    } = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (role) data.role = role;
    if (password && password.trim()) {
      data.passwordHash = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data,
      select: userSelect,
    });

    return NextResponse.json({ user, message: "User berhasil diperbarui." });
  } catch (error) {
    console.error("Admin users PATCH error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal." }, { status: 500 });
  }
}

// DELETE — hapus user
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (params.id === session.user.id) {
      return NextResponse.json(
        { error: "Tidak bisa hapus akun sendiri." },
        { status: 400 }
      );
    }

    await prisma.user.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true, message: "User berhasil dihapus." });
  } catch (error) {
    console.error("Admin users DELETE error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal." }, { status: 500 });
  }
}
