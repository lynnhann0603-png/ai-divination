import './globals.css';
import './theme-foundation.css';

export const metadata = {
  title: 'AI 占星阁 · 正式版 MVP',
  description: '支持八字流月时间轴与多牌阵塔罗的正式版占卜网页应用。'
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 宇宙装饰层 — 纯视觉，不影响功能 */}
        <div className="cosmic-layer" aria-hidden="true">
          <div className="cosmic-moon" />
          <div className="cosmic-moon-small" />
          <div className="cosmic-planet-1" />
          <div className="cosmic-planet-2" />

          <div className="cosmic-star cosmic-star-1" />
          <div className="cosmic-star cosmic-star-2 cosmic-star-big" />
          <div className="cosmic-star cosmic-star-3" />
          <div className="cosmic-star cosmic-star-4" />
          <div className="cosmic-star cosmic-star-5 cosmic-star-big" />
          <div className="cosmic-star cosmic-star-6" />

          <div className="cosmic-nebula cosmic-nebula-1" />
          <div className="cosmic-nebula cosmic-nebula-2" />

          <div className="astrolabe-ring" />
          <div className="astrolabe-ring-2" />
        </div>

        <div className="app-content">{children}</div>
      </body>
    </html>
  );
}
