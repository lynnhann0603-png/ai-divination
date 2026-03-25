import Link from 'next/link';

const modules = [
  {
    href: '/bazi',
    icon: '八',
    title: '八字流月时间轴',
    description: '输入农历出生信息，自动排出四柱干支、流年流月节奏与行动指引。',
    chip: '适合事业 / 感情 / 财运 / 学业 / 健康'
  },
  {
    href: '/tarot',
    icon: '塔',
    title: '多牌阵塔罗',
    description: '单张 / 三张 / 四张 / 五张牌阵，带洗牌抽牌动画与深度解读。',
    chip: '适合问题占卜、每日指引与关系观察'
  }
];

export default function HomePage() {
  return (
    <main className="page-shell home-centered">
      <section className="home-hero">
        <h1 className="home-title">AI 占星阁</h1>
        <p className="home-subtitle">选择你想要体验的功能</p>
      </section>

      <section className="choice-grid">
        {modules.map((item) => (
          <Link key={item.href} href={item.href} className="choice-card link-card">
            <span className="choice-icon">{item.icon}</span>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
            <span className="choice-chip">{item.chip}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
