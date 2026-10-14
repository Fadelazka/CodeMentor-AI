import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const { name, email, nim, favoriteLanguage } = await req.json();
    if (!name || name.trim().length < 2) return Response.json({ error: "Nama minimal 2 karakter" }, { status: 400 });
    if (!email || !email.includes("@")) return Response.json({ error: "Email tidak valid" }, { status: 400 });
    const norm = email.toLowerCase().trim();
    if (norm !== session.user.email) {
      const ex = await prisma.user.findUnique({ where: { email: norm } });
      if (ex) return Response.json({ error: "Email sudah dipakai user lain" }, { status: 409 });
    }
    const updated = await prisma.user.update({ where: { id: session.user.id }, data: { name: name.trim(), email: norm, nim: nim ? String(nim).trim() : null, favoriteLanguage: favoriteLanguage ? String(favoriteLanguage).trim() : null }, select: { id: true, name: true, email: true, nim: true, favoriteLanguage: true, role: true, createdAt: true } });
    return Response.json({ user: updated });
  } catch (e) {
    console.error("[user/profile]", e);
    return Response.json({ error: "Gagal update profil" }, { status: 500 });
  }
}
