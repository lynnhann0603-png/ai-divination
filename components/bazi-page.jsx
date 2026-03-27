'use client';

import Link from 'next/link';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { BAZI_FOCUS_OPTIONS, CN_MONTHS, DEFAULT_BAZI_FORM, LUNAR_YEARS, getShichenFromTime, getZiShiInfo, calcTrueSolarTime } from '@/lib/constants';

/* =============== 常量 =============== */
const CARD_SECTIONS = [
  { key: 'patternAnalysis', eyebrow: '格局气象', title: '八字格局总览' },
  { key: 'personality', eyebrow: '性格与气质', title: '性格特征与外貌气质' },
  { key: 'pastYears', eyebrow: '过往推断', title: '过去关键年份变动' },
  { key: 'metaphor', eyebrow: '命盘比喻', title: '如果命盘是一件器物' },
  { key: 'talent', eyebrow: '才华与天赋', title: '最出色的才华与适合的领域' },
  { key: 'career', eyebrow: '事业路径', title: '适合的事业发展形态' },
  { key: 'sideBusiness', eyebrow: '副业建议', title: '五行喜用·副业方向' },
  { key: 'partner', eyebrow: '伴侣画像', title: '最适合的伴侣轮廓' },
  { key: 'fateScene', eyebrow: '宿命感片段', title: '命定之人的相遇场景' },
  { key: 'selfHarm', eyebrow: '隐患警示', title: '需要警惕的自我折损习惯' },
  { key: 'beneficialName', eyebrow: '补益字号', title: '能量补益·字号建议' },
  { key: 'monthlyFortune', eyebrow: '流月时间轴', title: '每个月该怎么动' }
];

/* 命理小知识 — 在 AI 思考时轮播 */
const BAZI_TIPS = [
  { emoji: '🌳', text: '"日主"就像你命盘中的"主角"，它的五行属性决定了你与世界互动的基本方式。' },
  { emoji: '⚖️', text: '八字中的"身强身弱"不是好坏之分，而是能量分配的不同——身强需要出口释放，身弱需要滋养扶持。' },
  { emoji: '🔮', text: '"用神"是你命盘中最需要的五行能量，顺着它的方向走，往往事半功倍。' },
  { emoji: '🎭', text: '"十神"是八字中描述人际关系和行为模式的体系——比肩是同行者，正官是约束者，食神是创造力。' },
  { emoji: '🌊', text: '五行相生：木生火、火生土、土生金、金生水、水生木——万物循环，生生不息。' },
  { emoji: '⏰', text: '"时柱"代表人生的晚年运势，也暗藏你潜意识中的行为模式和深层需求。' },
  { emoji: '🗓️', text: '流月运势不是宿命论，而是帮你识别"什么时候该加速、什么时候该刹车"的节奏指南。' },
  { emoji: '💫', text: '"忌神"不是敌人，而是提醒你需要注意的能量方向——知道什么不该做，有时比知道该做什么更重要。' },
  { emoji: '🏔️', text: '八字只是先天格局，后天的选择和努力才是改写人生剧本的关键——所谓"命由天定，运由己造"。' },
  { emoji: '🎵', text: '每个人的命盘都像一首独特的乐曲——有高潮有低谷，关键是学会踩准自己的节奏。' }
];

/* 排盘过程提示文案 */
const PAIPAN_STEPS = [
  '正在推演四柱干支的生克关系……',
  '分析日主强弱与用神取向……',
  '计算五行分布与格局气象……',
  '推算流月运势与十神关系……',
  '整理命盘数据，准备 AI 深度解读……'
];

/* =============== 子组件 =============== */

function ErrorState({ message }) {
  return (
    <article className="placeholder-card error-banner">
      <span className="eyebrow">生成失败</span>
      <h3 className="result-title">这组信息暂时无法换算</h3>
      <p>{message}</p>
    </article>
  );
}

function ResultPlaceholder() {
  return (
    <article className="placeholder-card">
      <span className="eyebrow">等待生成</span>
      <h3 className="result-title">填写农历出生信息，生成你的命局解读与流月时间轴</h3>
      <p>输入信息后将为你生成整体命局、四柱干支与全年流月节奏。</p>
    </article>
  );
}

/* ===== 排盘动画阶段 ===== */
function PaipanAnimation({ profile, onComplete }) {
  const [pillarIndex, setPillarIndex] = useState(-1);
  const [showElements, setShowElements] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    // 四柱逐步翻转
    const timers = [];
    timers.push(setTimeout(() => setPillarIndex(0), 300));
    timers.push(setTimeout(() => setPillarIndex(1), 1100));
    timers.push(setTimeout(() => setPillarIndex(2), 1900));
    timers.push(setTimeout(() => setPillarIndex(3), 2700));
    // 五行分布条动画
    timers.push(setTimeout(() => setShowElements(true), 3500));
    // 用神/忌神标签
    timers.push(setTimeout(() => setShowTags(true), 4500));
    // 排盘动画完成
    timers.push(setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, 5500));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // 步骤提示轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => (prev + 1) % PAIPAN_STEPS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const dr = profile.destinyReading;
  const pillarLabels = ['年柱', '月柱', '日柱', '时柱'];
  const pillarValues = [profile.pillars.year, profile.pillars.month, profile.pillars.day, profile.pillars.time];

  return (
    <div className="paipan-animation">
      <div className="paipan-stage">
        <h3 className="paipan-title">🔮 排盘推演中</h3>
        <p className="paipan-step-text">{PAIPAN_STEPS[stepIndex]}</p>

        {/* 四柱翻牌 */}
        <div className="paipan-pillars">
          {pillarLabels.map((label, idx) => (
            <div
              key={label}
              className={`paipan-pillar-card ${pillarIndex >= idx ? 'revealed' : ''}`}
            >
              <div className="paipan-pillar-inner">
                <div className="paipan-pillar-front">
                  <span className="paipan-pillar-label">{label}</span>
                  <strong className="paipan-pillar-value">{pillarValues[idx]}</strong>
                </div>
                <div className="paipan-pillar-back">
                  <span>☯</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 五行分布条 */}
        <div className={`paipan-elements ${showElements ? 'visible' : ''}`}>
          {Object.entries(dr.elementCount).map(([el, count]) => (
            <div className="paipan-el-row" key={el}>
              <span className="el-label">{el}</span>
              <div className="el-bar-track">
                <div
                  className="el-bar-fill paipan-el-fill"
                  style={{ width: showElements ? `${Math.min(count * 15, 100)}%` : '0%' }}
                />
              </div>
              <span className="el-count">{count}</span>
            </div>
          ))}
        </div>

        {/* 用神/忌神标签 */}
        <div className={`paipan-tags ${showTags ? 'visible' : ''}`}>
          <span className="reading-tag">{dr.strengthLabel}</span>
          <span className="reading-tag use-god">用神：{dr.useGod}</span>
          <span className="reading-tag avoid-god">忌神：{dr.avoidGod}</span>
        </div>
      </div>
    </div>
  );
}

/* ===== 思维链面板 ===== */
function ReasoningPanel({ reasoning, isThinking }) {
  const panelRef = useRef(null);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (panelRef.current && expanded) {
      panelRef.current.scrollTop = panelRef.current.scrollHeight;
    }
  }, [reasoning, expanded]);

  if (!reasoning && !isThinking) return null;

  return (
    <div className={`reasoning-panel ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="reasoning-header" onClick={() => setExpanded(!expanded)}>
        <div className="reasoning-header-left">
          <span className="reasoning-icon">🧠</span>
          <span className="reasoning-title">AI 思维链 {isThinking && <span className="thinking-dot">●</span>}</span>
        </div>
        <button className="reasoning-toggle">{expanded ? '收起' : '展开'}</button>
      </div>
      {expanded && (
        <div className="reasoning-body" ref={panelRef}>
          <p className="reasoning-text">
            {reasoning || '正在启动深度推理……'}
            {isThinking && <span className="cursor-blink">▌</span>}
          </p>
        </div>
      )}
    </div>
  );
}

/* ===== 命理小知识轮播 ===== */
function BaziTipCarousel({ dayElement }) {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % BAZI_TIPS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tip = BAZI_TIPS[tipIndex];

  return (
    <div className="bazi-tip-carousel">
      <div className="bazi-tip-card" key={tipIndex}>
        <span className="bazi-tip-emoji">{tip.emoji}</span>
        <div className="bazi-tip-content">
          <span className="bazi-tip-label">💡 你知道吗？</span>
          <p className="bazi-tip-text">{tip.text}</p>
        </div>
      </div>
    </div>
  );
}

/* ===== 进度条 ===== */
function AIProgressBar({ completedCount, totalCount, isThinking }) {
  const pct = Math.round((completedCount / totalCount) * 100);
  return (
    <div className="ai-progress-wrap">
      <div className="ai-progress-info">
        <span>🔮 AI 深度推演中</span>
        <span>{completedCount}/{totalCount} 板块已完成</span>
      </div>
      <div className="ai-progress-track">
        <div className="ai-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      {isThinking && completedCount === 0 && (
        <p className="ai-progress-hint">R1 正在深度思考，首帧内容即将到达……</p>
      )}
    </div>
  );
}

/* 横向可滚动容器 */
function ScrollableContent({ children, className = '' }) {
  return (
    <div className={`bazi-scroll-wrapper ${className}`}>
      <div className="bazi-scroll-inner">
        {children}
      </div>
    </div>
  );
}

/* ===== 骨架屏组件 ===== */
function SkeletonBlock({ lines = 4 }) {
  return (
    <div className="skeleton-block">
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="skeleton-line"
          style={{ width: i === lines - 1 ? '60%' : `${85 + Math.random() * 15}%` }}
        />
      ))}
    </div>
  );
}

/* 独立板块卡片（支持骨架屏状态） */
function SectionCard({ eyebrow, title, children, visible = true, status = 'idle', delayIdx = 0 }) {
  // status: 'idle' | 'waiting' | 'generating' | 'ready'
  if (!visible) return null;

  const isReady = status === 'ready';
  const isWaiting = status === 'waiting';
  const isGenerating = status === 'generating';

  return (
    <article
      className={`result-card bazi-section-card ${isReady ? 'ai-enhanced' : ''} ${isWaiting || isGenerating ? 'skeleton-mode' : ''}`}
      style={{ animation: `cardFadeIn 0.5s ease-out ${delayIdx * 0.08}s both` }}
    >
      <div className="bazi-card-header">
        <span className="eyebrow">{eyebrow}</span>
        {isWaiting && <span className="card-status-tag waiting-tag">等待生成</span>}
        {isGenerating && <span className="card-status-tag generating-tag">AI 生成中…</span>}
        {isReady && <span className="ai-badge">✨ AI 深度解读</span>}
      </div>
      {title && <h3 className="result-title">{title}</h3>}
      <ScrollableContent>
        {(isWaiting || isGenerating) ? (
          <SkeletonBlock lines={eyebrow === '流月时间轴' ? 8 : 4} />
        ) : (
          <div className={isReady ? 'content-fade-in' : ''}>{children}</div>
        )}
      </ScrollableContent>
    </article>
  );
}

/* 格局气象卡片内容 */
function PatternContent({ profile, aiText }) {
  const dr = profile.destinyReading;
  return (
    <div className="reading-block">
      {/* 真太阳时修正提示 */}
      {profile.useTrueSolarTime && profile.trueSolarTimeInfo && (
        <div className="zishi-adjusted-banner true-solar-banner">
          <span className="zishi-banner-icon">☀️</span>
          <span>
            已启用真太阳时修正：北京时间 {profile.promptData?.birthTime || '—'} → 真太阳时 {profile.effectiveBirthTime}（{profile.shichen}）。
            {profile.trueSolarTimeInfo.detail}
          </span>
        </div>
      )}
      {/* 子时修正提示 */}
      {profile.ziShiAdjusted && (
        <div className="zishi-adjusted-banner">
          <span className="zishi-banner-icon">🔄</span>
          <span>
            {profile.ziShiRule === 'change'
              ? '已应用「子时统一换日」规则：日柱已推进至次日。如需切换，请调整表单中的子时换日规则。'
              : '已应用「夜子时不换日」规则：日柱仍为当日，时柱天干已按当日日干修正。如需切换，请调整表单中的子时换日规则。'
            }
          </span>
        </div>
      )}
      <div className="pillars-display">
        <div className="pillar-item">
          <span className="pillar-label">年柱</span>
          <strong className="pillar-value">{profile.pillars.year}</strong>
        </div>
        <div className="pillar-item">
          <span className="pillar-label">月柱</span>
          <strong className="pillar-value">{profile.pillars.month}</strong>
        </div>
        <div className="pillar-item">
          <span className="pillar-label">日柱</span>
          <strong className="pillar-value">{profile.pillars.day}</strong>
        </div>
        <div className="pillar-item">
          <span className="pillar-label">时柱</span>
          <strong className="pillar-value">{profile.pillars.time}</strong>
        </div>
      </div>
      <p className="result-copy reading-text">{aiText || dr.patternSummary}</p>
      <div className="tag-row">
        <span className="reading-tag">{dr.strengthLabel}</span>
        <span className="reading-tag use-god">用神：{dr.useGod}</span>
        <span className="reading-tag avoid-god">忌神：{dr.avoidGod}</span>
      </div>
      <div className="element-bar">
        {Object.entries(dr.elementCount).map(([el, count]) => (
          <div className="element-item" key={el}>
            <span className="el-label">{el}</span>
            <div className="el-bar-track">
              <div className="el-bar-fill" style={{ width: `${Math.min(count * 15, 100)}%` }} />
            </div>
            <span className="el-count">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 过去年份卡片内容 */
function PastYearsContent({ fallbackData, aiData }) {
  const items = aiData || fallbackData;
  if (!items || items.length === 0) return <p className="result-copy">暂无数据</p>;
  return (
    <div className="past-years">
      {items.map((item, idx) => (
        <div className="year-block" key={idx}>
          <span className="year-badge">{item.year}年</span>
          <p className="result-copy">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

/* 流月时间轴内容 */
function MonthlyFortuneContent({ fallbackTimeline, aiMonthly, focus }) {
  const months = aiMonthly || null;

  if (months && months.length > 0) {
    return (
      <>
        <div className="tarot-toolbar" style={{ marginBottom: 12 }}>
          <div className="tip-tags">
            <span className="timeline-pill strong">强势推进月</span>
            <span className="timeline-pill steady">稳步布局月</span>
            <span className="timeline-pill careful">回收调整月</span>
          </div>
        </div>
        <div className="fortune-months">
          {months.map((m, idx) => (
            <div className={`fortune-month-card fortune-${m.level || 'steady'}`} key={idx}>
              <div className="fortune-month-header">
                <span className="fortune-month-label">{m.month}</span>
                <span className="fortune-gz">{m.ganzhi} · {m.shiShen}</span>
                {m.title && <span className="fortune-gz">{m.title}</span>}
                <span className={`fortune-level-dot ${m.level || 'steady'}`} />
              </div>
              <p className="result-copy reading-text">{m.content}</p>
            </div>
          ))}
        </div>
      </>
    );
  }

  // Fallback: 使用本地计算的时间轴
  return (
    <>
      <div className="tarot-toolbar" style={{ marginBottom: 12 }}>
        <div className="tip-tags">
          <span className="timeline-pill strong">强势推进月</span>
          <span className="timeline-pill steady">稳步布局月</span>
          <span className="timeline-pill careful">回收调整月</span>
        </div>
      </div>
      <p className="scroll-hint">← 左右滑动查看全部月份 →</p>
      <div className="timeline-scroll-wrapper">
        <div className="timeline-grid">
          {fallbackTimeline.map((item) => (
            <div className={`timeline-item timeline-${item.level}`} key={`${item.month}-${item.flowMonthGanzhi}`}>
              <span className="line-label">{item.month} · {item.lunarMonthLabel}</span>
              <h4 className="timeline-title">{item.title}</h4>
              <div className="timeline-meta">
                <span className={`timeline-pill ${item.level}`}>流月 {item.flowMonthGanzhi}</span>
                <span className="timeline-pill shi-shen">{item.shiShen}</span>
              </div>
              <p className="timeline-subtitle">{item.summary}</p>
              <p>{item.direction}</p>
              <span className="badge">{item.advice}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* =============== 主结果组件 =============== */
function BaziResult({ profile, aiData, streaming, visibleCards, reasoning, isThinking, completedSections }) {
  const dr = profile.destinyReading;

  /* 判断每张卡片的状态 */
  const getCardStatus = (key) => {
    if (aiData && aiData[key]) return 'ready';
    if (completedSections && completedSections[key]) return 'ready';
    if (streaming && !isThinking) return 'generating'; // AI 正在输出内容
    if (streaming && isThinking) return 'waiting'; // AI 正在思考
    return 'ready'; // 非流式场景（无 API Key fallback）
  };

  /* 获取已完成的 AI 内容 */
  const getAiContent = (key) => {
    if (aiData && aiData[key]) return aiData[key];
    if (completedSections && completedSections[key]) return completedSections[key];
    return null;
  };

  const getTextContent = (key) => {
    const aiContent = getAiContent(key);
    if (aiContent) return aiContent;
    return dr[key] || '';
  };

  const totalSections = 12;
  const completedCount = Object.keys(completedSections || {}).length + (aiData ? Object.keys(aiData).filter(k => CARD_SECTIONS.some(s => s.key === k)).length : 0);
  // 去重计数
  const uniqueCompleted = new Set([
    ...Object.keys(completedSections || {}),
    ...(aiData ? Object.keys(aiData).filter(k => CARD_SECTIONS.some(s => s.key === k)) : [])
  ]).size;

  return (
    <div className="result-stack">
      {/* 思维链面板 */}
      <ReasoningPanel reasoning={reasoning} isThinking={isThinking} />

      {/* AI 进度条 */}
      {streaming && (
        <AIProgressBar
          completedCount={uniqueCompleted}
          totalCount={totalSections}
          isThinking={isThinking}
        />
      )}

      {/* 命理小知识轮播（AI 思考中时显示） */}
      {streaming && isThinking && (
        <BaziTipCarousel dayElement={dr.elementCount} />
      )}

      {/* 一、格局气象 */}
      <SectionCard
        eyebrow="格局气象"
        title="八字格局总览"
        visible={visibleCards >= 1}
        status={getCardStatus('patternAnalysis')}
        delayIdx={0}
      >
        <PatternContent profile={profile} aiText={getAiContent('patternAnalysis')} />
      </SectionCard>

      {/* 二、性格特征 */}
      <SectionCard
        eyebrow="性格与气质"
        title="性格特征与外貌气质"
        visible={visibleCards >= 2}
        status={getCardStatus('personality')}
        delayIdx={1}
      >
        <p className="result-copy reading-text">{getTextContent('personality')}</p>
      </SectionCard>

      {/* 三、过去关键年份 */}
      <SectionCard
        eyebrow="过往推断"
        title="过去关键年份变动"
        visible={visibleCards >= 3}
        status={getCardStatus('pastYears')}
        delayIdx={2}
      >
        <PastYearsContent fallbackData={dr.pastYears} aiData={getAiContent('pastYears')} />
      </SectionCard>

      {/* 四、命盘比喻 */}
      <SectionCard
        eyebrow="命盘比喻"
        title="如果命盘是一件器物"
        visible={visibleCards >= 4}
        status={getCardStatus('metaphor')}
        delayIdx={3}
      >
        <p className="result-copy reading-text">{getTextContent('metaphor')}</p>
      </SectionCard>

      {/* 五、才华与转化 */}
      <SectionCard
        eyebrow="才华与天赋"
        title="最出色的才华与适合的领域"
        visible={visibleCards >= 5}
        status={getCardStatus('talent')}
        delayIdx={4}
      >
        <p className="result-copy reading-text">{getTextContent('talent')}</p>
      </SectionCard>

      {/* 六、事业形态 */}
      <SectionCard
        eyebrow="事业路径"
        title="适合的事业发展形态"
        visible={visibleCards >= 6}
        status={getCardStatus('career')}
        delayIdx={5}
      >
        <p className="result-copy reading-text">{getTextContent('career')}</p>
      </SectionCard>

      {/* 七、副业方向 */}
      <SectionCard
        eyebrow="副业建议"
        title="五行喜用·副业方向"
        visible={visibleCards >= 7}
        status={getCardStatus('sideBusiness')}
        delayIdx={6}
      >
        <p className="result-copy reading-text">{getTextContent('sideBusiness')}</p>
      </SectionCard>

      {/* 八、伴侣轮廓 */}
      <SectionCard
        eyebrow="伴侣画像"
        title="最适合的伴侣轮廓"
        visible={visibleCards >= 8}
        status={getCardStatus('partner')}
        delayIdx={7}
      >
        <p className="result-copy reading-text">{getTextContent('partner')}</p>
      </SectionCard>

      {/* 九、宿命感片段 */}
      <SectionCard
        eyebrow="宿命感片段"
        title="命定之人的相遇场景"
        visible={visibleCards >= 9}
        status={getCardStatus('fateScene')}
        delayIdx={8}
      >
        <p className="result-copy reading-text story-text">{getTextContent('fateScene')}</p>
      </SectionCard>

      {/* 十、自我折损隐患 */}
      <SectionCard
        eyebrow="隐患警示"
        title="需要警惕的自我折损习惯"
        visible={visibleCards >= 10}
        status={getCardStatus('selfHarm')}
        delayIdx={9}
      >
        <p className="result-copy reading-text warning-text">{getTextContent('selfHarm')}</p>
      </SectionCard>

      {/* 十一、补益字号 */}
      <SectionCard
        eyebrow="补益字号"
        title="能量补益·字号建议"
        visible={visibleCards >= 11}
        status={getCardStatus('beneficialName')}
        delayIdx={10}
      >
        <p className="result-copy reading-text">{getTextContent('beneficialName')}</p>
      </SectionCard>

      {/* 十二、流月时间轴 */}
      <SectionCard
        eyebrow={`${new Date().getFullYear()} 流月时间轴`}
        title="每个月该怎么动"
        visible={visibleCards >= 12}
        status={getCardStatus('monthlyFortune')}
        delayIdx={11}
      >
        <MonthlyFortuneContent
          fallbackTimeline={profile.timeline}
          aiMonthly={getAiContent('monthlyFortune')}
          focus={profile.focus}
        />
      </SectionCard>
    </div>
  );
}

/* =============== 主页面组件 =============== */
export default function BaziPage() {
  const [form, setForm] = useState(DEFAULT_BAZI_FORM);
  const [geoStatus, setGeoStatus] = useState('输入出生地后点击自动换算经纬度。');
  const [geoLoading, setGeoLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleCards, setVisibleCards] = useState(0);

  // 新增状态
  const [phase, setPhase] = useState('idle'); // 'idle' | 'paipan' | 'result'
  const [reasoning, setReasoning] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [completedSections, setCompletedSections] = useState({});

  const shichenLabel = useMemo(() => getShichenFromTime(form.birthTime), [form.birthTime]);
  const ziShiInfo = useMemo(() => getZiShiInfo(form.birthTime), [form.birthTime]);

  /* 真太阳时预览计算 */
  const trueSolarTimePreview = useMemo(() => {
    if (!form.useTrueSolarTime || !form.birthLng || !form.birthTime) return null;
    // 需要阳历日期来计算均时差，这里用一个简单的农历→阳历近似
    // 实际计算在 engine 中做精确转换，这里仅做预览
    try {
      // 使用 lunar-javascript 来获取阳历日期会更准确
      // 但这里简化处理：假设农历日期大约对应某个阳历日期
      // 使用当前年份和月日做近似（实际偏差在均时差上最多几分钟）
      const approxYear = Number(form.lunarYear) || 1997;
      const approxMonth = Number(form.lunarMonth) || 1;
      const approxDay = Number(form.lunarDay) || 1;
      // 农历日期通常比阳历晚约1个月，做一个粗略近似
      let estMonth = approxMonth + 1;
      let estYear = approxYear;
      if (estMonth > 12) { estMonth = 1; estYear++; }
      return calcTrueSolarTime(
        form.birthTime,
        Number(form.birthLng),
        estYear,
        estMonth,
        approxDay > 28 ? 28 : approxDay
      );
    } catch {
      return null;
    }
  }, [form.useTrueSolarTime, form.birthLng, form.birthTime, form.lunarYear, form.lunarMonth, form.lunarDay]);

  /* 卡片逐步出现效果 */
  useEffect(() => {
    if (phase !== 'result' || !profile) return;
    if (visibleCards >= 12) return;

    const timer = setTimeout(() => {
      setVisibleCards((prev) => Math.min(prev + 1, 12));
    }, 120);

    return () => clearTimeout(timer);
  }, [phase, profile, visibleCards]);

  /* 排盘动画完成回调 */
  const handlePaipanComplete = useCallback(() => {
    setPhase('result');
  }, []);

  async function requestGeocode(snapshot = form) {
    const place = snapshot.birthPlace.trim();
    if (!place) {
      throw new Error('请先填写出生地');
    }

    const response = await fetch(`/api/geocode?q=${encodeURIComponent(place)}`, { cache: 'no-store' });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || '出生地解析失败');
    }

    const nextForm = {
      ...snapshot,
      birthLat: Number(payload.lat).toFixed(4),
      birthLng: Number(payload.lng).toFixed(4)
    };

    setForm((prev) => ({
      ...prev,
      birthLat: nextForm.birthLat,
      birthLng: nextForm.birthLng
    }));
    setGeoStatus(`已匹配：${payload.label} · 纬度 ${nextForm.birthLat} / 经度 ${nextForm.birthLng}`);
    return nextForm;
  }

  async function handleGeocode() {
    setGeoLoading(true);
    setError('');
    setGeoStatus('正在匹配出生地经纬度...');

    try {
      await requestGeocode();
    } catch (geoError) {
      setGeoStatus(geoError.message);
    } finally {
      setGeoLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setProfile(null);
    setAiData(null);
    setStreaming(false);
    setVisibleCards(0);
    setPhase('idle');
    setReasoning('');
    setIsThinking(false);
    setCompletedSections({});

    try {
      let nextForm = form;
      if ((!form.birthLat || !form.birthLng) && form.birthPlace.trim()) {
        nextForm = await requestGeocode(form);
      }

      const response = await fetch('/api/bazi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextForm)
      });

      // 检查是否是 SSE 流
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('text/event-stream')) {
        // SSE 流模式
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        setLoading(false);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data: ')) continue;

            const jsonStr = trimmed.slice(6);
            try {
              const msg = JSON.parse(jsonStr);

              if (msg.type === 'profile') {
                setProfile(msg.data);
                setStreaming(true);
                setIsThinking(true);
                setPhase('paipan'); // 进入排盘动画阶段
              } else if (msg.type === 'reasoning_chunk') {
                // R1 思维链内容
                setReasoning(prev => prev + msg.data);
              } else if (msg.type === 'ai_chunk') {
                // AI 内容输出开始，思考阶段结束
                setIsThinking(false);
              } else if (msg.type === 'ai_section') {
                // 逐板块完成
                setCompletedSections(prev => ({ ...prev, ...msg.data }));
              } else if (msg.type === 'ai_result') {
                setAiData(msg.data);
              } else if (msg.type === 'ai_fallback') {
                // AI JSON 解析失败，使用本地数据
                console.warn('AI output parse failed, using fallback');
              } else if (msg.type === 'done') {
                setStreaming(false);
                setIsThinking(false);
              } else if (msg.type === 'error') {
                console.error('Stream error:', msg.data);
                setStreaming(false);
                setIsThinking(false);
              }
            } catch { /* 忽略 */ }
          }
        }
      } else {
        // JSON 模式（fallback，无 API Key 时）
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.error || '八字结果生成失败');
        }
        setProfile(payload.profile);
        setPhase('result');
        setLoading(false);
      }
    } catch (submitError) {
      setError(submitError.message);
      setProfile(null);
      setLoading(false);
      setPhase('idle');
    }
  }

  return (
    <main className="page-shell page-gap">
      <div className="page-nav">
        <Link className="ghost-button" href="/">← 返回首页</Link>
      </div>

      <section className="page-card card">
        <div className="module-header">
          <div>
            <h1 className="page-title">八字流月时间轴</h1>
            <p>AI 深度解读 · 十二板块命局全景</p>
          </div>
        </div>

        <div className="split-layout">
          <form className="card inner-panel form-panel antique-form-panel" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                <span>性别</span>
                <select value={form.gender} onChange={(event) => setForm({ ...form, gender: event.target.value })}>
                  <option value="女">女</option>
                  <option value="男">男</option>
                  <option value="未说明">未说明</option>
                </select>
              </label>
              <label>
                <span>当前关注</span>
                <select value={form.focus} onChange={(event) => setForm({ ...form, focus: event.target.value })}>
                  {BAZI_FOCUS_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>农历年份</span>
                <select value={form.lunarYear} onChange={(event) => setForm({ ...form, lunarYear: event.target.value })}>
                  {LUNAR_YEARS.map((year) => (
                    <option key={year} value={String(year)}>{year}年</option>
                  ))}
                </select>
              </label>
              <label>
                <span>农历月份</span>
                <select value={form.lunarMonth} onChange={(event) => setForm({ ...form, lunarMonth: event.target.value })}>
                  {CN_MONTHS.map((month, index) => (
                    <option key={month} value={String(index + 1)}>{month}月</option>
                  ))}
                </select>
              </label>
              <label>
                <span>农历日期</span>
                <select value={form.lunarDay} onChange={(event) => setForm({ ...form, lunarDay: event.target.value })}>
                  {Array.from({ length: 30 }, (_, index) => index + 1).map((day) => (
                    <option key={day} value={String(day)}>{day}日</option>
                  ))}
                </select>
              </label>
              <label>
                <span>是否闰月</span>
                <select value={form.isLeapMonth} onChange={(event) => setForm({ ...form, isLeapMonth: event.target.value })}>
                  <option value="no">否</option>
                  <option value="yes">是</option>
                </select>
              </label>

              <label className="span-2">
                <span>出生地</span>
                <div className="inline-inputs">
                  <input
                    value={form.birthPlace}
                    placeholder="例如：广东省广州市天河区"
                    onChange={(event) => setForm({ ...form, birthPlace: event.target.value })}
                  />
                  <button type="button" className="secondary-button" onClick={handleGeocode} disabled={geoLoading}>
                    {geoLoading ? '匹配中...' : '自动换算经纬度'}
                  </button>
                </div>
                <small className="helper-text">{geoStatus}</small>
              </label>

              <label>
                <span>纬度</span>
                <input value={form.birthLat} readOnly />
              </label>
              <label>
                <span>经度</span>
                <input value={form.birthLng} readOnly />
              </label>

              <label className="span-2">
                <span>出生时间（24 小时制）</span>
                <input
                  type="time"
                  value={form.birthTime}
                  onChange={(event) => setForm({ ...form, birthTime: event.target.value })}
                />
                <small className="helper-text">{form.birthTime}（{shichenLabel}）</small>
              </label>

              {/* 真太阳时开关 */}
              <div className="span-2 true-solar-time-section">
                <label className="true-solar-toggle">
                  <span className="toggle-label-text">☀️ 启用真太阳时修正</span>
                  <div className="toggle-switch-wrap">
                    <input
                      type="checkbox"
                      checked={form.useTrueSolarTime}
                      onChange={(event) => setForm({ ...form, useTrueSolarTime: event.target.checked })}
                    />
                    <span className="toggle-switch" />
                  </div>
                </label>
                {form.useTrueSolarTime && (
                  <div className="true-solar-info">
                    {form.birthLng ? (
                      (() => {
                        const info = trueSolarTimePreview;
                        if (!info) return <small className="helper-text">计算中...</small>;
                        return (
                          <>
                            <div className="true-solar-result">
                              <span className="true-solar-label">北京时间</span>
                              <span className="true-solar-arrow">→</span>
                              <span className="true-solar-value">{form.birthTime}</span>
                              <span className="true-solar-arrow">→</span>
                              <span className="true-solar-label">真太阳时</span>
                              <span className="true-solar-value highlight">{info.trueSolarTime}</span>
                              <span className="true-solar-shichen">（{getShichenFromTime(info.trueSolarTime)}）</span>
                            </div>
                            <small className="helper-text">{info.detail}</small>
                            {info.trueSolarTime !== form.birthTime && getShichenFromTime(info.trueSolarTime) !== getShichenFromTime(form.birthTime) && (
                              <small className="helper-text true-solar-warn">⚠️ 真太阳时修正后时辰发生了变化，排盘结果将以真太阳时为准。</small>
                            )}
                          </>
                        );
                      })()
                    ) : (
                      <small className="helper-text">请先填写出生地并换算经纬度，才能计算真太阳时。</small>
                    )}
                  </div>
                )}
                <small className="helper-text">
                  真太阳时根据出生地经度和日期修正北京时间，使排盘更精确。建议知道准确出生地时开启。
                </small>
              </div>

              {/* 子时提示与换日规则选择 */}
              {ziShiInfo.isZiShi && (
                <div className="span-2 zishi-notice">
                  <div className="zishi-alert">
                    <span className="zishi-alert-icon">⚠️</span>
                    <div className="zishi-alert-body">
                      <strong className="zishi-alert-title">
                        检测到子时出生（{ziShiInfo.isLateZiShi ? '23:00~23:59 晚子时' : '00:00~00:59 早子时'}）
                      </strong>
                      <p className="zishi-alert-desc">
                        子时横跨两日（23:00~01:00），不同命理流派对日柱的处理有差异。
                        {ziShiInfo.isLateZiShi
                          ? '推荐使用「子时统一换日」，23:00 后日柱进入次日。如果你已知自己的日柱，可据此选择其他规则。'
                          : '早子时（00:00~00:59）各流派处理一致，日柱以当日计。'
                        }
                      </p>
                    </div>
                  </div>

                  {ziShiInfo.isLateZiShi && (
                    <label className="zishi-rule-select">
                      <span>子时换日规则</span>
                      <select
                        value={form.ziShiRule}
                        onChange={(event) => setForm({ ...form, ziShiRule: event.target.value })}
                      >
                        <option value="change">子时统一换日（推荐）</option>
                        <option value="noChange">夜子时不换日（传统）</option>
                      </select>
                      <small className="helper-text">
                        {form.ziShiRule === 'change'
                          ? '当前使用「子时统一换日」规则：23:00 后日柱自动进入次日。'
                          : '当前使用「夜子时不换日」规则：23:00~23:59 的日柱仍按当日计算。'
                        }
                      </small>
                    </label>
                  )}
                </div>
              )}
            </div>

            <div className="actions top-gap">
              <button className="primary-button" type="submit" disabled={loading || streaming}>
                {loading ? '正在排盘...' : streaming ? 'AI 深度推演中...' : '生成命局解读'}
              </button>
            </div>
          </form>

          <section className="result-panel">
            {loading ? (
              <article className="placeholder-card loading-card">
                <span className="eyebrow">正在生成</span>
                <h3 className="result-title">正在计算你的命局与流月节奏</h3>
                <p>正在整理农历、出生地、时辰和流年月令，请稍候片刻……</p>
              </article>
            ) : error ? (
              <ErrorState message={error} />
            ) : phase === 'paipan' && profile ? (
              <PaipanAnimation profile={profile} onComplete={handlePaipanComplete} />
            ) : phase === 'result' && profile ? (
              <BaziResult
                profile={profile}
                aiData={aiData}
                streaming={streaming}
                visibleCards={visibleCards}
                reasoning={reasoning}
                isThinking={isThinking}
                completedSections={completedSections}
              />
            ) : (
              <ResultPlaceholder />
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
