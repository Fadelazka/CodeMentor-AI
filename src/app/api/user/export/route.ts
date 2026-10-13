import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [user, history] = await Promise.all([
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, name: true, email: true, role: true, createdAt: true, provider: true },
      }),
      prisma.chatHistory.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" } }),
    ]);

    const payload = JSON.stringify({ exportedAt: new Date().toISOString(), user, totalHistory: history.length, history }, null, 2);
    return new Response(payload, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="codementor-data-saya-${Date.now()}.json"`,
      },
    });
  } catch (e) {
    console.error("[export/user]", e);
    return Response.json({ error: "Gagal export" }, { status: 500 });
  }
}
