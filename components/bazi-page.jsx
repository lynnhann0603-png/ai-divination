'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { BAZI_FOCUS_OPTIONS, CN_MONTHS, DEFAULT_BAZI_FORM, LUNAR_YEARS, getShichenFromTime } from '@/lib/constants';

function ResultPlaceholder() {
  return (
    <article className="placeholder-card">
      <span className="eyebrow">等待生成</span>
      <h3 className="result-title">填写农历出生信息，生成你的命局解读与流月时间轴</h3>
      <p>输入信息后将为你生成整体命局、四柱干支与全年流月节奏。</p>
    </article>
  );
}

function ErrorState({ message }) {
  return (
    <article className="placeholder-card error-banner">
      <span className="eyebrow">生成失败</span>
      <h3 className="result-title">这组信息暂时无法换算</h3>
      <p>{message}</p>
    </article>
  );
}

function LoadingState() {
  return (
    <article className="placeholder-card loading-card">
      <span className="eyebrow">正在生成</span>
      <h3 className="result-title">正在计算你的命局与流月节奏</h3>
      <p>正在整理农历、出生地、时辰和流年月令，请稍候片刻……</p>
    </article>
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

/* 独立板块卡片 */
function SectionCard({ eyebrow, title, children }) {
  return (
    <article className="result-card">
      <span className="eyebrow">{eyebrow}</span>
      {title && <h3 className="result-title">{title}</h3>}
      <ScrollableContent>
        {children}
      </ScrollableContent>
    </article>
  );
}

function BaziResult({ profile }) {
  const timelineRef = useRef(null);
  const dr = profile.destinyReading;

  return (
    <div className="result-stack">

      {/* 一、格局气象与身强身弱 */}
      <SectionCard eyebrow="格局气象" title={`${profile.safeName}的八字格局`}>
        <div className="reading-block">
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
          <p className="result-copy">{dr.patternSummary}</p>
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
      </SectionCard>

      {/* 二、性格特征与外貌气质 */}
      <SectionCard eyebrow="性格与气质" title="性格特征与外貌气质">
        <p className="result-copy reading-text">{dr.personality}</p>
      </SectionCard>

      {/* 三、过去关键年份 */}
      <SectionCard eyebrow="过往推断" title="过去关键年份变动">
        <div className="past-years">
          {dr.pastYears.map((item, idx) => (
            <div className="year-block" key={idx}>
              <span className="year-badge">{item.year}年</span>
              <p className="result-copy">{item.text}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 四、兵器/乐器比喻 */}
      <SectionCard eyebrow="命盘比喻" title="如果命盘是一件器物">
        <p className="result-copy reading-text">{dr.metaphor}</p>
      </SectionCard>

      {/* 五、才华与转化 */}
      <SectionCard eyebrow="才华与天赋" title="最出色的才华与适合的领域">
        <p className="result-copy reading-text">{dr.talent}</p>
      </SectionCard>

      {/* 六、事业形态 */}
      <SectionCard eyebrow="事业路径" title="适合的事业发展形态">
        <p className="result-copy reading-text">{dr.career}</p>
      </SectionCard>

      {/* 七、副业方向 */}
      <SectionCard eyebrow="副业建议" title="五行喜用·副业方向">
        <p className="result-copy reading-text">{dr.sideBusiness}</p>
      </SectionCard>

      {/* 八、伴侣轮廓 */}
      <SectionCard eyebrow="伴侣画像" title="最适合的伴侣轮廓">
        <p className="result-copy reading-text">{dr.partner}</p>
      </SectionCard>

      {/* 九、宿命感片段 */}
      <SectionCard eyebrow="宿命感片段" title="命定之人的相遇场景">
        <p className="result-copy reading-text story-text">{dr.fateScene}</p>
      </SectionCard>

      {/* 十、自我折损隐患 */}
      <SectionCard eyebrow="隐患警示" title="需要警惕的自我折损习惯">
        <p className="result-copy reading-text warning-text">{dr.selfHarm}</p>
      </SectionCard>

      {/* 十一、补益字号 */}
      <SectionCard eyebrow="补益字号" title="能量补益·字号建议">
        <p className="result-copy reading-text">{dr.beneficialName}</p>
      </SectionCard>

      {/* 十二、2026丙午年流月运势 */}
      <article className="result-card">
        <span className="eyebrow">2026 丙午年 · 流月运势</span>
        <h3 className="result-title">十二月逐月运势与化解</h3>
        <ScrollableContent>
          <div className="fortune-months">
            {dr.monthlyFortune2026.map((m, idx) => (
              <div className={`fortune-month-card fortune-${m.level}`} key={idx}>
                <div className="fortune-month-header">
                  <span className="fortune-month-label">{m.month}</span>
                  <span className="fortune-gz">{m.ganzhi}</span>
                  <span className={`fortune-level-dot ${m.level}`} />
                </div>
                <p className="result-copy">{m.advice}</p>
              </div>
            ))}
          </div>
        </ScrollableContent>
      </article>

      {/* 命盘基础信息 */}
      <SectionCard eyebrow="命盘信息" title={`${profile.focus}方向 · 年度运势`}>
        <p className="result-copy">{profile.currentNote}{profile.focusProfile.headline}</p>
        <div className="summary-grid">
          <div className="metric-item">
            <span className="muted-line">农历出生</span>
            <strong>{profile.lunarText}</strong>
            <p>对应阳历：{profile.solarText}</p>
          </div>
          <div className="metric-item">
            <span className="muted-line">出生地</span>
            <strong>{profile.birthPlace || '未填写'}</strong>
            <p>坐标：{profile.lat.toFixed(4)} / {profile.lng.toFixed(4)}</p>
          </div>
          <div className="metric-item">
            <span className="muted-line">流年干支</span>
            <strong>{profile.flowYearGanzhi}年</strong>
            <p>{profile.tone}</p>
          </div>
        </div>
      </SectionCard>

      {/* 流月时间轴 */}
      <article className="result-card">
        <div className="tarot-toolbar">
          <div>
            <span className="eyebrow">{new Date().getFullYear()} 流月时间轴</span>
            <h3 className="result-title">每个月该怎么动</h3>
          </div>
          <div className="tip-tags">
            <span className="timeline-pill strong">强势推进月</span>
            <span className="timeline-pill steady">稳步布局月</span>
            <span className="timeline-pill careful">回收调整月</span>
          </div>
        </div>
        <p className="scroll-hint">← 左右滑动查看全部月份 →</p>
        <div className="timeline-scroll-wrapper" ref={timelineRef}>
          <div className="timeline-grid">
            {profile.timeline.map((item) => (
              <div className={`timeline-item timeline-${item.level}`} key={`${item.month}-${item.flowMonthGanzhi}`}>
                <span className="line-label">{item.month} · {item.lunarMonthLabel}</span>
                <h4 className="timeline-title">{item.title}</h4>
                <div className="timeline-meta">
                  <span className={`timeline-pill ${item.level}`}>流年 {item.flowYearGanzhi}</span>
                  <span className="timeline-pill">流月 {item.flowMonthGanzhi}</span>
                </div>
                <p className="timeline-subtitle">{item.summary}</p>
                <p>{item.direction}</p>
                <span className="badge">{item.advice}</span>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* 重点提醒 */}
      <SectionCard eyebrow="重点提醒">
        <div className="insight-grid">
          <div className="list-card">
            <strong>建议重点发力月份</strong>
            <ul>
              {profile.topWindows.map((item) => (
                <li key={`top-${item.month}`}>{item.month} · 流月 {item.flowMonthGanzhi} · {item.title} · {item.advice}</li>
              ))}
            </ul>
          </div>
          <div className="list-card">
            <strong>建议放慢节奏月份</strong>
            <ul>
              {profile.lowWindows.map((item) => (
                <li key={`low-${item.month}`}>{item.month} · 流月 {item.flowMonthGanzhi} · {item.title} · {item.advice}</li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export default function BaziPage() {
  const [form, setForm] = useState(DEFAULT_BAZI_FORM);
  const [geoStatus, setGeoStatus] = useState('输入出生地后点击自动换算经纬度。');
  const [geoLoading, setGeoLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const shichenLabel = useMemo(() => getShichenFromTime(form.birthTime), [form.birthTime]);

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

    try {
      let nextForm = form;
      if ((!form.birthLat || !form.birthLng) && form.birthPlace.trim()) {
        nextForm = await requestGeocode(form);
      }

      const response = await fetch('/api/bazi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nextForm)
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || '八字结果生成失败');
      }

      setResult(payload.profile);
    } catch (submitError) {
      setError(submitError.message);
      setResult(null);
    } finally {
      setLoading(false);
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
          </div>
        </div>

        <div className="split-layout">
          <form className="card inner-panel form-panel" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                <span>称呼</span>
                <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
              </label>
              <label>
                <span>性别</span>
                <select value={form.gender} onChange={(event) => setForm({ ...form, gender: event.target.value })}>
                  <option value="女">女</option>
                  <option value="男">男</option>
                  <option value="未说明">未说明</option>
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

              <label>
                <span>出生时间（24 小时制）</span>
                <input
                  type="time"
                  value={form.birthTime}
                  onChange={(event) => setForm({ ...form, birthTime: event.target.value })}
                />
                <small className="helper-text">{form.birthTime}（{shichenLabel}）</small>
              </label>
              <label>
                <span>当前重点</span>
                <select value={form.focus} onChange={(event) => setForm({ ...form, focus: event.target.value })}>
                  {BAZI_FOCUS_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="actions top-gap">
              <button className="primary-button" type="submit" disabled={loading}>
                {loading ? '正在生成...' : '生成命局解读'}
              </button>
            </div>
          </form>

          <section className="result-panel">
            {loading ? <LoadingState /> : error ? <ErrorState message={error} /> : result ? <BaziResult profile={result} /> : <ResultPlaceholder />}
          </section>
        </div>
      </section>
    </main>
  );
}
