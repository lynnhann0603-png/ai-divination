import { NextResponse } from 'next/server';
import { computeTarotReading } from '@/lib/tarot-engine';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const reading = computeTarotReading(body);
    return NextResponse.json({ reading });
  } catch (error) {
    return NextResponse.json({ error: error.message || '塔罗结果生成失败' }, { status: 400 });
  }
}
