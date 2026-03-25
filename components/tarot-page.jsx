'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { DEFAULT_TAROT_FORM } from '@/lib/constants';
import { TAROT_SPREADS } from '@/lib/tarot-data';

function AnimationState({ spreadName, count }) {
  return (
    <article className="result-card tarot-animation">
      <div className="deck-stage">
        {Array.from({ length: Math.max(3, count) }, (_, index) => (
          <div className="deck-card" key={`${spreadName}-${index}`} />
        ))}
      </div>
      <div className="animation-caption">
        <span className="eyebrow">正在抽牌</span>
        <strong>{spreadName}</strong>
        <p>牌面正在洗开、翻转并重新排列，请稍候片刻……</p>
      </div>
    </article>
  );
}

function ResultPlaceholder() {
  return (
    <article className="placeholder-card">
      <span className="eyebrow">等待抽牌</span>
      <h3 className="result-title">输入你的问题，选择牌阵后开始抽牌</h3>
      <p>抽牌完成后将为你展示每张牌的解读与行动建议。</p>
    </article>
  );
}

function ErrorState({ message }) {
  return (
    <article className="placeholder-card error-banner">
      <span className="eyebrow">抽牌失败</span>
      <h3 className="result-title">这次牌阵暂时没有成功展开</h3>
      <p>{message}</p>
    </article>
  );
}

function TarotResult({ reading }) {
  return (
    <div className="result-stack">
      <article className="result-card">
        <div className="tarot-toolbar">
          <div>
            <span className="eyebrow">{reading.spread.name}</span>
            <h3 className="result-title">塔罗解读结果</h3>
          </div>
          <div className="mini-tags">
            <span>{reading.spread.description}</span>
            <span>{reading.atmosphere}</span>
          </div>
        </div>
        <p className="result-copy">{reading.summary}</p>
        <div className="tarot-grid">
          {reading.cards.map((card) => (
            <div className="tarot-card" key={`${card.position}-${card.name}`}>
              <span className="tarot-position">{card.position}</span>
              <h4 className="tarot-name">{card.name}</h4>
              <span className={`orientation ${card.orientation === '逆位' ? 'reverse' : ''}`}>{card.orientation}</span>
              <p>{card.message}</p>
              <div className="tip-tags">
                {card.keywords.map((keyword) => (
                  <span key={`${card.name}-${keyword}`}>{keyword}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="result-card">
        <span className="eyebrow">逐张拆解</span>
        <div className="insight-grid">
          {reading.cards.map((card) => (
            <div className="reading-card" key={`detail-${card.position}-${card.name}`}>
              <strong>{card.position} · {card.name}{card.orientation}</strong>
              <p>{card.message}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="result-card">
        <span className="eyebrow">行动建议</span>
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="muted-line">当前状态</span>
            <strong>{reading.advice.situation.title}</strong>
            <p>{reading.advice.situation.body}</p>
          </div>
          <div className="metric-item">
            <span className="muted-line">行动方向</span>
            <strong>{reading.advice.action.title}</strong>
            <p>{reading.advice.action.body}</p>
          </div>
          <div className="metric-item">
            <span className="muted-line">一句提醒</span>
            <strong>{reading.advice.reminder.title}</strong>
            <p>{reading.advice.reminder.body}</p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function TarotPage() {
  const [form, setForm] = useState(DEFAULT_TAROT_FORM);
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedSpread = useMemo(
    () => TAROT_SPREADS.find((item) => item.id === form.spreadId) || TAROT_SPREADS[0],
    [form.spreadId]
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const responsePromise = fetch('/api/tarot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const [response] = await Promise.all([
        responsePromise,
        new Promise((resolve) => window.setTimeout(resolve, 1600))
      ]);

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || '塔罗结果生成失败');
      }

      setReading(payload.reading);
    } catch (submitError) {
      setError(submitError.message);
      setReading(null);
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
            <h1 className="page-title">多牌阵塔罗</h1>
          </div>
        </div>

        <div className="split-layout split-layout-tight">
          <form className="card inner-panel form-panel" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label className="span-2">
                <span>你的问题</span>
                <textarea
                  rows={4}
                  value={form.question}
                  placeholder="例如：我接下来三个月是否适合换工作？"
                  onChange={(event) => setForm({ ...form, question: event.target.value })}
                />
              </label>
              <label>
                <span>牌阵</span>
                <select value={form.spreadId} onChange={(event) => setForm({ ...form, spreadId: event.target.value })}>
                  {TAROT_SPREADS.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </label>
              <div className="info-card">
                <span className="muted-line">当前牌阵说明</span>
                <strong>{selectedSpread.name}</strong>
                <p>{selectedSpread.description}</p>
              </div>
            </div>

            <div className="actions top-gap">
              <button className="primary-button" type="submit" disabled={loading}>
                {loading ? '正在洗牌...' : '开始洗牌并抽牌'}
              </button>
            </div>
          </form>

          <section className="result-panel">
            {loading ? (
              <AnimationState spreadName={selectedSpread.name} count={selectedSpread.positions.length} />
            ) : error ? (
              <ErrorState message={error} />
            ) : reading ? (
              <TarotResult reading={reading} />
            ) : (
              <ResultPlaceholder />
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
