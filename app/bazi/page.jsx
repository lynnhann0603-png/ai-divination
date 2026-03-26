'use client';

import dynamic from 'next/dynamic';

const BaziPage = dynamic(() => import('@/components/bazi-page'), { ssr: false });

export default function Page() {
  return <BaziPage />;
}
