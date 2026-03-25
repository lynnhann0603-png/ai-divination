import { NextResponse } from 'next/server';
import { computeBaziProfile } from '@/lib/bazi-engine';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const profile = computeBaziProfile(body);
    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json({ error: error.message || '八字结果生成失败' }, { status: 400 });
  }
}
