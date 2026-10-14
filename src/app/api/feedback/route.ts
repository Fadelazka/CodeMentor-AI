import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { type, message } = body;

    if (!type) {
      return NextResponse.json({ error: 'Tipe feedback wajib dipilih' }, { status: 400 });
    }

    const allowed = ['helpful', 'not_helpful', 'suggestion', 'bug'];
    if (!allowed.includes(type)) {
      return NextResponse.json({ error: 'Tipe tidak valid' }, { status: 400 });
    }

    const created = await prisma.appFeedback.create({
      data: {
        userId: session.user.id,
        type: type,
        message: message?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, id: created.id });
  } catch (error) {
    console.error('[feedback]', error);
    return NextResponse.json({ error: 'Gagal menyimpan feedback' }, { status: 500 });
  }
}
