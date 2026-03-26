'use client';

import dynamic from 'next/dynamic';

const TarotPage = dynamic(() => import('@/components/tarot-page'), { ssr: false });

export default function Page() {
  return <TarotPage />;
}
