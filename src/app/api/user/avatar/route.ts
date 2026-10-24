import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("avatar") as File | null;
    if (!file) {
      return Response.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      return Response.json({ error: "Format harus JPG/PNG/WEBP/GIF" }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return Response.json({ error: "Ukuran maksimal 2MB" }, { status: 400 });
    }

    // --- BAGIAN YANG DIUBAH (Vercel Blob) ---
    // Upload langsung ke Vercel Blob
    const blob = await put(`avatars/${session.user.id}-${Date.now()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    });

    const imageUrl = blob.url; // Ambil URL publik dari Vercel Blob

    // Simpan URL baru ke database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
    });

    return Response.json({ success: true, imageUrl });
  } catch (error) {
    console.error("[user/avatar]", error);
    return Response.json({ error: "Gagal upload foto" }, { status: 500 });
  }
}