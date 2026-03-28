'use client';

import Link from 'next/link';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { DEFAULT_TAROT_FORM } from '@/lib/constants';
import { TAROT_SPREADS } from '@/lib/tarot-data';

/* =============== 阶段常量 =============== */
const PHASE_INPUT = 'input';
const PHASE_PICK = 'pick';
const PHASE_SHUFFLE = 'shuffle';
const PHASE_RESULT = 'result';

/* =============== 冥想引导文案 =============== */
const MEDITATION_TEXTS = [
  '深呼吸，让思绪慢慢沉淀……',
  '闭上眼睛，感受此刻的内在声音……',
  '在心中默念你的问题，让直觉引导你……',
  '不要多想，凭感觉在每个框中输入一个数字。'
];

/* =============== 子组件 =============== */

/* PICK 阶段：冥想引导 + N 个数字输入框 */
function PickPhase({ spread, onConfirm, onBack }) {
  const [numbers, setNumbers] = useState(
    Array.from({ length: spread.positions.length }, () => '')
  );
  const [meditationIndex, setMeditationIndex] = useState(0);
  const inputRefs = useRef([]);

  /* 逐句展示冥想引导 */
  useEffect(() => {
    if (meditationIndex < MEDITATION_TEXTS.length - 1) {
      const timer = setTimeout(() => setMeditationIndex((prev) => prev + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [meditationIndex]);

  const allFilled = numbers.every((n) => {
    if (n === '' || isNaN(Number(n))) return false;
    const num = Number(n);
    return num >= 1 && num <= 78;
  });

  function handleChange(index, value) {
    /* 只允许数字 */
    const cleaned = value.replace(/[^0-9]/g, '');
    if (cleaned === '') {
      const next = [...numbers];
      next[index] = '';
      setNumbers(next);
      return;
    }

    const num = Number(cleaned);
    /* 超出范围直接忽略 */
    if (num < 0 || num > 78) return;

    const next = [...numbers];
    next[index] = cleaned;
    setNumbers(next);

    /* 自动跳转逻辑（范围 1-78）：
       - 输入了两位数（如 12、78）→ 立刻跳
       - 输入了 8 或 9（不可能再拼成 8x/9x，因最大 78）→ 立刻跳
       - 输入了 1-7 → 等用户继续输入第二位 */
    const shouldAutoJump = cleaned.length === 2 || (cleaned.length === 1 && num >= 8);
    if (shouldAutoJump && index < numbers.length - 1) {
      setTimeout(() => inputRefs.current[index + 1]?.focus(), 80);
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace' && numbers[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (event.key === 'Enter' && allFilled) {
      onConfirm(numbers.map(Number));
    }
  }

  return (
    <article className="result-card pick-phase">
      <div className="meditation-area">
        <span className="eyebrow">🔮 冥想引导</span>
        <div className="meditation-lines">
          {MEDITATION_TEXTS.slice(0, meditationIndex + 1).map((text, idx) => (
            <p key={idx} className={`meditation-line ${idx === meditationIndex ? 'meditation-current' : ''}`}>
              {text}
            </p>
          ))}
        </div>
      </div>

      <div className="pick-inputs-area">
        <p className="pick-hint">
          为「{spread.name}」的 {spread.positions.length} 个位置各选一个数字（1-78）
        </p>
        <div className="pick-inputs-grid">
          {spread.positions.map((pos, idx) => (
            <div key={pos} className="pick-input-item">
              <label className="pick-label">{pos}</label>
              <input
                ref={(el) => { inputRefs.current[idx] = el; }}
                className="pick-number-input"
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="?"
                value={numbers[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pick-actions">
        <button className="ghost-button" type="button" onClick={onBack}>
          ← 修改问题
        </button>
        <button
          className="primary-button"
          type="button"
          disabled={!allFilled}
          onClick={() => onConfirm(numbers.map(Number))}
        >
          翻开牌面 →
        </button>
      </div>
    </article>
  );
}

/* 洗牌动画 */
function ShuffleAnimation({ spreadName, count }) {
  return (
    <article className="result-card tarot-animation">
      <div className="deck-stage">
        {Array.from({ length: Math.max(3, count) }, (_, index) => (
          <div className="deck-card" key={`${spreadName}-${index}`} />
        ))}
      </div>
      <div className="animation-caption">
        <span className="eyebrow">正在洗牌与翻牌</span>
        <strong>{spreadName}</strong>
        <p>牌面正在洗开、翻转并重新排列，AI 正在凝视牌面……</p>
      </div>
    </article>
  );
}

function ResultPlaceholder() {
  return (
    <article className="placeholder-card">
      <span className="eyebrow">等待抽牌</span>
      <h3 className="result-title">输入你的问题，选择牌阵后开始占卜</h3>
      <p>你将经历 冥想选牌 → 洗牌翻牌 → AI 深度解析 的完整流程。</p>
    </article>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <article className="placeholder-card error-banner">
      <span className="eyebrow">出了点问题</span>
      <h3 className="result-title">这次牌阵暂时没有成功展开</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="ghost-button" style={{ marginTop: 12 }} onClick={onRetry}>
          重新占卜
        </button>
      )}
    </article>
  );
}

/* 简易 Markdown 渲染 */
function renderMarkdown(text) {
  if (!text) return null;
  const paragraphs = text.split('\n\n').filter(Boolean);
  return paragraphs.map((paragraph, pIndex) => {
    const lines = paragraph.split('\n');
    return (
      <div key={pIndex} className="ai-paragraph">
        {lines.map((line, lIndex) => {
          const h3Match = line.match(/^###\s+(.+)/);
          if (h3Match) return <h4 key={lIndex} className="ai-section-title">{renderInline(h3Match[1])}</h4>;
          const h2Match = line.match(/^##\s+(.+)/);
          if (h2Match) return <h3 key={lIndex} className="ai-section-title">{renderInline(h2Match[1])}</h3>;
          return <p key={lIndex} className="ai-line">{renderInline(line)}</p>;
        })}
      </div>
    );
  });
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

/* AI 流式文本展示 */
function StreamingText({ title, icon, text, streaming, loadingHint, emptyHint }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && text) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [text]);

  /* streaming 中但还没有最终解析好的文本 → 显示等待文案 */
  const showLoading = streaming && !text;
  const showContent = !!text;

  return (
    <article className="result-card ai-reading-card">
      <div className="ai-reading-header">
        <span className="eyebrow">{icon} {title}</span>
        {streaming && <span className="streaming-indicator">解析中…</span>}
      </div>
      <div className="ai-reading-body" ref={containerRef}>
        {showLoading && (
          <div className="ai-waiting">
            <span>🔮</span>
            <p>{loadingHint || '正在努力解析中……'}</p>
          </div>
        )}
        {showContent && renderMarkdown(text)}
        {!showLoading && !showContent && emptyHint && (
          <div className="ai-waiting">
            <p>{emptyHint}</p>
          </div>
        )}
      </div>
    </article>
  );
}

/* =============== RESULT 阶段：三栏布局 =============== */
function TarotResult({ reading, interpretation, actionGuide, streaming, onRestart }) {
  return (
    <div className="result-stack">
      {/* 第一栏：牌阵总览（图片+牌名+正逆位） */}
      <article className="result-card">
        <div className="tarot-toolbar">
          <div>
            <span className="eyebrow">{reading.spread.name}</span>
            <h3 className="result-title">牌阵总览</h3>
          </div>
        </div>
        <div className="tarot-grid">
          {reading.cards.map((card) => (
            <div className="tarot-card" key={`${card.position}-${card.name}`}>
              <span className="tarot-position">{card.position}</span>
              <div className="tarot-image-wrap">
                <img
                  className={`tarot-image ${card.orientation === '逆位' ? 'tarot-image-reversed' : ''}`}
                  src={card.image}
                  alt={`${card.name} - ${card.orientation}`}
                  width={140}
                  height={220}
                />
              </div>
              <h4 className="tarot-name">{card.name}</h4>
              <span className={`orientation ${card.orientation === '逆位' ? 'reverse' : ''}`}>
                {card.orientation}
              </span>
            </div>
          ))}
        </div>
      </article>

      {/* 第二栏：深度解析（流式） */}
      <StreamingText
        title="深度解析"
        icon="✨"
        text={interpretation}
        streaming={streaming}
        loadingHint="我正在努力深度解析你的牌阵……"
        emptyHint=""
      />

      {/* 第三栏：行动指南（流式） */}
      <StreamingText
        title="行动指南"
        icon="🧭"
        text={actionGuide}
        streaming={false}
        loadingHint=""
        emptyHint={streaming ? '深度解析完成后将生成行动指南……' : ''}
      />

      {/* 重新占卜 */}
      {!streaming && (
        <div className="result-actions">
          <button className="ghost-button" onClick={onRestart}>
            🔄 重新占卜
          </button>
        </div>
      )}
    </div>
  );
}

/* =============== 主页面组件 =============== */
export default function TarotPage() {
  const [form, setForm] = useState(DEFAULT_TAROT_FORM);
  const [phase, setPhase] = useState(PHASE_INPUT);
  const [reading, setReading] = useState(null);
  const [interpretation, setInterpretation] = useState('');
  const [actionGuide, setActionGuide] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');

  const selectedSpread = useMemo(
    () => TAROT_SPREADS.find((item) => item.id === form.spreadId) || TAROT_SPREADS[0],
    [form.spreadId]
  );

  const handleRestart = useCallback(() => {
    setPhase(PHASE_INPUT);
    setReading(null);
    setInterpretation('');
    setActionGuide('');
    setStreaming(false);
    setError('');
  }, []);

  /* INPUT → PICK */
  function handleStartPick(event) {
    event.preventDefault();
    setError('');
    setPhase(PHASE_PICK);
  }

  /* PICK → SHUFFLE → RESULT */
  async function handlePickConfirm(pickedNumbers) {
    setPhase(PHASE_SHUFFLE);
    setReading(null);
    setInterpretation('');
    setActionGuide('');
    setStreaming(false);
    setError('');

    try {
      const response = await fetch('/api/tarot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pickedNumbers })
      });

      if (!response.ok) {
        let errMsg = '塔罗结果生成失败';
        try {
          const errJson = await response.json();
          errMsg = errJson.error || errMsg;
        } catch { /* ignore */ }
        throw new Error(errMsg);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

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

            if (msg.type === 'reading') {
              setReading(msg.data);
              setPhase(PHASE_RESULT);
              setStreaming(true);
            } else if (msg.type === 'ai_result') {
              /* 最终解析出的结构化结果 */
              setInterpretation(msg.data.interpretation || '');
              setActionGuide(msg.data.actionGuide || '');
            } else if (msg.type === 'done') {
              setStreaming(false);
            } else if (msg.type === 'error') {
              setError(msg.data);
              setStreaming(false);
            }
          } catch { /* 忽略 */ }
        }
      }
    } catch (submitError) {
      setError(submitError.message);
      setPhase(PHASE_RESULT);
      setStreaming(false);
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
            <p>AI 深度解析 · 78 张韦特全牌组</p>
          </div>
        </div>

        <div className="split-layout split-layout-tight">
          {/* 左侧：输入表单（INPUT 阶段始终展示，其他阶段收起） */}
          <form className="card inner-panel form-panel antique-form-panel" onSubmit={handleStartPick}>
            <div className="form-grid">
              <label className="span-2">
                <span>你的问题</span>
                <textarea
                  rows={4}
                  value={form.question}
                  placeholder="例如：我接下来三个月是否适合换工作？"
                  onChange={(event) => setForm({ ...form, question: event.target.value })}
                  disabled={phase !== PHASE_INPUT}
                />
              </label>
              <label>
                <span>牌阵</span>
                <select
                  value={form.spreadId}
                  onChange={(event) => setForm({ ...form, spreadId: event.target.value })}
                  disabled={phase !== PHASE_INPUT}
                >
                  {TAROT_SPREADS.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </label>
              <div className="info-card antique-form-info">
                <span className="muted-line">当前牌阵说明</span>
                <strong>{selectedSpread.name}</strong>
                <p>{selectedSpread.description}</p>
              </div>
            </div>

            <div className="actions top-gap">
              {phase === PHASE_INPUT && (
                <button className="primary-button" type="submit">
                  开始占卜 →
                </button>
              )}
              {phase !== PHASE_INPUT && (
                <button className="ghost-button" type="button" onClick={handleRestart}>
                  🔄 重新开始
                </button>
              )}
            </div>
          </form>

          {/* 右侧：根据阶段展示不同内容 */}
          <section className="result-panel">
            {phase === PHASE_INPUT && (
              <ResultPlaceholder />
            )}

            {phase === PHASE_PICK && (
              <PickPhase
                spread={selectedSpread}
                onConfirm={handlePickConfirm}
                onBack={() => setPhase(PHASE_INPUT)}
              />
            )}

            {phase === PHASE_SHUFFLE && (
              <ShuffleAnimation
                spreadName={selectedSpread.name}
                count={selectedSpread.positions.length}
              />
            )}

            {phase === PHASE_RESULT && error && !reading && (
              <ErrorState message={error} onRetry={handleRestart} />
            )}

            {phase === PHASE_RESULT && reading && (
              <TarotResult
                reading={reading}
                interpretation={interpretation}
                actionGuide={actionGuide}
                streaming={streaming}
                onRestart={handleRestart}
              />
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
