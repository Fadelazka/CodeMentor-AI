import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash, compare } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "Tidak terautentikasi" }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body ?? {};

    if (!currentPassword || !newPassword) {
      return Response.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    if (typeof newPassword !== "string" || newPassword.length < 6) {
      return Response.json(
        { error: "Password baru minimal 6 karakter" },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return Response.json(
        { error: "Password baru harus berbeda dengan yang lama" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, passwordHash: true },
    });

    if (!user || !user.passwordHash) {
      return Response.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    const isCurrentValid = await compare(currentPassword, user.passwordHash);

    if (!isCurrentValid) {
      return Response.json({ error: "Password lama salah" }, { status: 400 });
    }

    const newPasswordHash = await hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    });

    return Response.json({
      success: true,
      message: "Password berhasil diubah",
    });
  } catch (error) {
    console.error("[change-password] Error:", error);
    return Response.json({ error: "Gagal mengubah password" }, { status: 500 });
  }
}
