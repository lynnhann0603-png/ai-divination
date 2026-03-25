import './globals.css';

export const metadata = {
  title: 'AI 占星阁 · 正式版 MVP',
  description: '支持八字流月时间轴与多牌阵塔罗的正式版占卜网页应用。'
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
