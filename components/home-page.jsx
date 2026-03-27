import Link from 'next/link';

const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
const wheelStars = [
  { x: '11%', y: '14%', scale: 0.95 },
  { x: '24%', y: '21%', scale: 0.75 },
  { x: '36%', y: '8%', scale: 0.9 },
  { x: '52%', y: '18%', scale: 0.82 },
  { x: '68%', y: '12%', scale: 0.7 },
  { x: '82%', y: '22%', scale: 1 },
  { x: '16%', y: '38%', scale: 0.7 },
  { x: '30%', y: '49%', scale: 0.9 },
  { x: '75%', y: '44%', scale: 0.8 },
  { x: '88%', y: '34%', scale: 0.72 },
  { x: '21%', y: '66%', scale: 0.95 },
  { x: '43%', y: '73%', scale: 0.72 },
  { x: '62%', y: '68%', scale: 0.84 },
  { x: '79%', y: '78%', scale: 0.95 },
  { x: '12%', y: '82%', scale: 0.78 },
  { x: '34%', y: '86%', scale: 0.88 },
  { x: '56%', y: '87%', scale: 0.72 },
  { x: '68%', y: '88%', scale: 0.76 }
];

const BaguaIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <polygon points="50,5 85,20 85,80 50,95 15,80 15,20" fill="none" stroke="#d4af37" strokeWidth="3" />
    <circle cx="50" cy="50" r="20" fill="none" stroke="#a37c43" strokeWidth="2" />
    <path d="M 50,30 A 10,10 0 0,1 50,50 A 10,10 0 0,0 50,70 A 20,20 0 0,1 50,30 Z" fill="#d4af37" />
    <path d="M 50,30 A 20,20 0 0,0 50,70 A 10,10 0 0,0 50,50 A 10,10 0 0,1 50,30 Z" fill="#1a1c23" />
    <circle cx="50" cy="40" r="3" fill="#1a1c23" />
    <circle cx="50" cy="60" r="3" fill="#d4af37" />
    <g stroke="#d4af37" strokeWidth="3">
      <line x1="40" y1="12" x2="60" y2="12" />
      <line x1="40" y1="17" x2="60" y2="17" />
      <line x1="40" y1="22" x2="60" y2="22" />
    </g>
  </svg>
);

const TarotIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <g transform="rotate(-15 50 50)">
      <rect x="20" y="20" width="40" height="60" rx="3" fill="#f4e8d4" stroke="#a37c43" strokeWidth="2" />
      <rect x="25" y="25" width="30" height="50" fill="none" stroke="#a37c43" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="40" cy="50" r="8" fill="none" stroke="#a37c43" strokeWidth="1" />
      <path d="M 40,42 L 42,48 L 48,50 L 42,52 L 40,58 L 38,52 L 32,50 L 38,48 Z" fill="#a37c43" />
    </g>
    <g transform="rotate(10 50 50)">
      <rect x="40" y="25" width="40" height="60" rx="3" fill="#e8dcc4" stroke="#d4af37" strokeWidth="2" />
      <rect x="45" y="30" width="30" height="50" fill="none" stroke="#d4af37" strokeWidth="1" />
      <path d="M 60,45 Q 70,55 60,65 Q 50,55 60,45" fill="none" stroke="#d4af37" strokeWidth="2" />
      <circle cx="60" cy="55" r="3" fill="#d4af37" />
    </g>
  </svg>
);

const AstroWheelBackground = () => (
  <div className="antique-astro-wheel-wrap" aria-hidden="true">
    <div className="antique-astro-wheel">
      <svg viewBox="0 0 1000 1000" className="antique-astro-wheel-svg">
        <defs>
          <path id="home-wheel-text" d="M 200,500 A 300,300 0 1,1 800,500 A 300,300 0 1,1 200,500" />
        </defs>

        <circle cx="500" cy="500" r="480" fill="none" stroke="#d4af37" strokeWidth="2" strokeDasharray="15 10" />
        <circle cx="500" cy="500" r="460" fill="none" stroke="#a37c43" strokeWidth="6" />
        <circle cx="500" cy="500" r="450" fill="none" stroke="#d4af37" strokeWidth="1" />

        {zodiacSymbols.map((symbol, index) => (
          <g key={symbol}>
            <line
              x1="500"
              y1="50"
              x2="500"
              y2="450"
              transform={`rotate(${index * 30} 500 500)`}
              stroke="#a37c43"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <text
              x="500"
              y="82"
              transform={`rotate(${index * 30} 500 500)`}
              fill="#d4af37"
              fontSize="24"
              textAnchor="middle"
              opacity="0.85"
              fontFamily="serif"
            >
              {symbol}
            </text>
          </g>
        ))}

        <text fill="#d4af37" fontSize="17" letterSpacing="7" opacity="0.7">
          <textPath href="#home-wheel-text" startOffset="50%" textAnchor="middle">
            易学天机 · 星历流转 · 运势演绎 · 阴阳和合 · 易学天机 · 星历流转 · 运势演绎 · 阴阳和合
          </textPath>
        </text>

        <circle cx="500" cy="500" r="280" fill="none" stroke="#a37c43" strokeWidth="3" />
        <polygon points="500,220 742,640 258,640" fill="none" stroke="#d4af37" strokeWidth="2" opacity="0.4" />
        <polygon points="500,780 258,360 742,360" fill="none" stroke="#d4af37" strokeWidth="2" opacity="0.4" />

        <circle cx="500" cy="500" r="140" fill="#111" stroke="#d4af37" strokeWidth="4" />
        <circle cx="500" cy="500" r="120" fill="none" stroke="#a37c43" strokeWidth="1" strokeDasharray="5 5" />
        <circle cx="500" cy="500" r="82" fill="#f4e8d4" opacity="0.8" />
        <circle cx="480" cy="470" r="15" fill="#d4c4a4" opacity="0.5" />
        <circle cx="530" cy="510" r="25" fill="#d4c4a4" opacity="0.4" />
        <circle cx="490" cy="540" r="10" fill="#d4c4a4" opacity="0.6" />
      </svg>
    </div>

    <div className="antique-astro-stars">
      <svg width="100%" height="100%">
        {wheelStars.map((item, index) => (
          <g key={`${item.x}-${item.y}`} transform={`translate(${item.x} ${item.y}) scale(${item.scale})`}>
            <path d="M0,-10 L2,-2 L10,0 L2,2 L0,10 L-2,2 L-10,0 L-2,-2 Z" fill="#d4af37" opacity={index % 2 ? 0.65 : 0.9} />
          </g>
        ))}
      </svg>
    </div>
  </div>
);

const modules = [
  {
    href: '/bazi',
    Icon: BaguaIcon,
    title: '八字流月时间轴',
    description: '通过古典易学结合现代ai算法，推演你未来运势的流月起伏。',
    chip: '适合事业 / 感情 / 财运 / 学业 / 健康'
  },
  {
    href: '/tarot',
    Icon: TarotIcon,
    title: '多牌阵塔罗',
    description: '深入潜意识的奥秘，通过古典牌阵为您解决当前的困惑与抉择',
    chip: '适合问题占卜、每日指引与关系观察'
  }
];

const splitChips = (chipText) =>
  chipText
    .split('/')
    .flatMap((item) => item.split('、'))
    .map((item) => item.trim())
    .filter(Boolean);

export default function HomePage() {
  return (
    <main className="page-shell home-centered antique-home-shell">
      <AstroWheelBackground />

      <section className="home-hero antique-home-hero">
        <div className="antique-title-row">
          <span className="antique-title-line" aria-hidden="true" />
          <h1 className="home-title antique-home-title">AI 占星阁</h1>
          <span className="antique-title-line" aria-hidden="true" />
        </div>
        <p className="antique-home-en">Astromancy Pavilion</p>
        <p className="home-subtitle antique-home-subtitle">选择你想要体验的功能</p>
      </section>

      <section className="choice-grid antique-choice-grid">
        {modules.map((item) => {
          const Icon = item.Icon;

          return (
            <Link key={item.href} href={item.href} className="choice-card link-card antique-choice-card">
              <span className="antique-card-topline" aria-hidden="true" />
              <span className="choice-icon antique-choice-icon">
                <Icon />
              </span>
              <strong className="antique-choice-title">{item.title}</strong>
              <p className="antique-choice-desc">{item.description}</p>
              <div className="antique-chip-row">
                {splitChips(item.chip).map((chip) => (
                  <span key={`${item.href}-${chip}`} className="choice-chip antique-choice-chip">
                    <span className="antique-chip-dot" aria-hidden="true" />
                    {chip}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
