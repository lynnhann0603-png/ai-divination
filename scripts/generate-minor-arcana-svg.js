/**
 * 批量生成 56 张小阿卡纳 SVG（底色与大阿卡纳统一为暖黄色）
 * 运行方式：node scripts/generate-minor-arcana-svg.js
 */
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'tarot');

/* ===== 统一底色（与大阿卡纳一致） ===== */
const CARD_BG_TOP = '#FFF8E1';
const CARD_BG_BOTTOM = '#F5E6B8';
const BORDER_COLOR = '#C4A44E';

/* ===== 花色配置（特征色用于符号、装饰和标题） ===== */
const SUITS = [
  {
    id: 'wands',
    name: '权杖',
    element: '🔥',
    elementName: '火',
    primary: '#C75B12',       // 深橙/棕 — 火元素主色
    secondary: '#E88D3E',     // 浅橙
    accent: '#8B4513',        // 深棕装饰
    symbol: 'wand',
    sceneTop: '#FFE0B2',      // 场景区域渐变顶
    sceneBottom: '#FFCC80'    // 场景区域渐变底
  },
  {
    id: 'cups',
    name: '圣杯',
    element: '💧',
    elementName: '水',
    primary: '#2E7D9B',       // 深蓝 — 水元素主色
    secondary: '#5DADE2',     // 中蓝
    accent: '#1A5276',        // 深蓝装饰
    symbol: 'cup',
    sceneTop: '#D4E6F1',
    sceneBottom: '#AED6F1'
  },
  {
    id: 'swords',
    name: '宝剑',
    element: '🌬',
    elementName: '风',
    primary: '#5D6D7E',       // 灰蓝 — 风元素主色
    secondary: '#85929E',     // 浅灰蓝
    accent: '#2C3E50',        // 深灰装饰
    symbol: 'sword',
    sceneTop: '#E8DAEF',
    sceneBottom: '#D2B4DE'
  },
  {
    id: 'pentacles',
    name: '星币',
    element: '🌍',
    elementName: '土',
    primary: '#B8860B',       // 暗金 — 土元素主色
    secondary: '#DAA520',     // 金色
    accent: '#6B4226',        // 深棕装饰
    symbol: 'pentacle',
    sceneTop: '#D5F5E3',
    sceneBottom: '#A9DFBF'
  }
];

/* ===== 牌面编号 ===== */
const CARD_NUMBERS = [
  { num: 'ace', label: 'Ace', cn: '王牌', display: 'A' },
  { num: '02', label: 'Two', cn: '二', display: '2' },
  { num: '03', label: 'Three', cn: '三', display: '3' },
  { num: '04', label: 'Four', cn: '四', display: '4' },
  { num: '05', label: 'Five', cn: '五', display: '5' },
  { num: '06', label: 'Six', cn: '六', display: '6' },
  { num: '07', label: 'Seven', cn: '七', display: '7' },
  { num: '08', label: 'Eight', cn: '八', display: '8' },
  { num: '09', label: 'Nine', cn: '九', display: '9' },
  { num: '10', label: 'Ten', cn: '十', display: '10' },
  { num: 'page', label: 'Page', cn: '侍从', display: 'P' },
  { num: 'knight', label: 'Knight', cn: '骑士', display: 'Kn' },
  { num: 'queen', label: 'Queen', cn: '王后', display: 'Q' },
  { num: 'king', label: 'King', cn: '国王', display: 'K' }
];

/* ===== 花色符号 SVG ===== */
function getSuitSymbol(suit, x, y, size) {
  const s = size;
  switch (suit.symbol) {
    case 'wand':
      return `
        <g transform="translate(${x},${y})">
          <rect x="${-s*0.07}" y="${-s*0.45}" width="${s*0.14}" height="${s*0.85}" rx="${s*0.05}" fill="${suit.primary}"/>
          <ellipse cx="0" cy="${-s*0.5}" rx="${s*0.16}" ry="${s*0.2}" fill="${suit.secondary}" opacity="0.85"/>
          <ellipse cx="0" cy="${-s*0.56}" rx="${s*0.09}" ry="${s*0.12}" fill="#FFB74D" opacity="0.9"/>
          <circle cx="${-s*0.03}" cy="${s*0.2}" r="${s*0.04}" fill="${suit.accent}" opacity="0.4"/>
          <circle cx="${s*0.03}" cy="${s*0.3}" r="${s*0.03}" fill="${suit.accent}" opacity="0.3"/>
        </g>`;
    case 'cup':
      return `
        <g transform="translate(${x},${y})">
          <path d="M${-s*0.28},${-s*0.18} Q${-s*0.32},${s*0.22} ${-s*0.06},${s*0.32} L${s*0.06},${s*0.32} Q${s*0.32},${s*0.22} ${s*0.28},${-s*0.18} Z" fill="${suit.primary}"/>
          <ellipse cx="0" cy="${-s*0.18}" rx="${s*0.28}" ry="${s*0.09}" fill="${suit.secondary}" opacity="0.8"/>
          <rect x="${-s*0.05}" y="${s*0.28}" width="${s*0.1}" height="${s*0.12}" fill="${suit.primary}"/>
          <rect x="${-s*0.17}" y="${s*0.38}" width="${s*0.34}" height="${s*0.06}" rx="${s*0.03}" fill="${suit.primary}"/>
          <ellipse cx="0" cy="${-s*0.05}" rx="${s*0.12}" ry="${s*0.06}" fill="${suit.secondary}" opacity="0.3"/>
        </g>`;
    case 'sword':
      return `
        <g transform="translate(${x},${y})">
          <rect x="${-s*0.035}" y="${-s*0.5}" width="${s*0.07}" height="${s*0.7}" fill="${suit.secondary}"/>
          <polygon points="${0},${-s*0.56} ${-s*0.06},${-s*0.44} ${s*0.06},${-s*0.44}" fill="${suit.secondary}"/>
          <rect x="${-s*0.18}" y="${s*0.18}" width="${s*0.36}" height="${s*0.06}" rx="${s*0.02}" fill="${suit.accent}"/>
          <rect x="${-s*0.05}" y="${s*0.22}" width="${s*0.1}" height="${s*0.2}" rx="${s*0.02}" fill="${suit.accent}"/>
          <circle cx="0" cy="${s*0.34}" r="${s*0.04}" fill="${suit.primary}" opacity="0.6"/>
        </g>`;
    case 'pentacle':
      return `
        <g transform="translate(${x},${y})">
          <circle cx="0" cy="0" r="${s*0.38}" fill="none" stroke="${suit.primary}" stroke-width="${s*0.045}"/>
          <circle cx="0" cy="0" r="${s*0.32}" fill="none" stroke="${suit.secondary}" stroke-width="${s*0.02}" opacity="0.5"/>
          ${generateStar(0, 0, s*0.24, s*0.11, 5, suit.primary)}
        </g>`;
    default:
      return '';
  }
}

function generateStar(cx, cy, outerR, innerR, points, color) {
  let d = '';
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2);
  }
  d += 'Z';
  return `<path d="${d}" fill="${color}" opacity="0.85"/>`;
}

/* ===== 生成装饰边框（与大阿卡纳统一风格） ===== */
function generateBorder(suit) {
  return `
    <!-- 外边框（与大阿卡纳统一金色） -->
    <rect x="12" y="12" width="276" height="476" rx="12" fill="none" stroke="${BORDER_COLOR}" stroke-width="2.5"/>
    <!-- 内边框角装饰 -->
    <circle cx="24" cy="24" r="2.5" fill="${BORDER_COLOR}" opacity="0.6"/>
    <circle cx="276" cy="24" r="2.5" fill="${BORDER_COLOR}" opacity="0.6"/>
    <circle cx="24" cy="476" r="2.5" fill="${BORDER_COLOR}" opacity="0.6"/>
    <circle cx="276" cy="476" r="2.5" fill="${BORDER_COLOR}" opacity="0.6"/>`;
}

/* ===== 生成场景区域（中央主要图案区） ===== */
function generateSceneArea(suit) {
  return `
    <defs>
      <linearGradient id="scene-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${suit.sceneTop}"/>
        <stop offset="100%" stop-color="${suit.sceneBottom}"/>
      </linearGradient>
    </defs>
    <rect x="18" y="50" width="264" height="340" rx="8" fill="url(#scene-grad)" opacity="0.6"/>`;
}

/* ===== 底部装饰（花色特色纹样） ===== */
function generateDecoration(suit) {
  switch (suit.symbol) {
    case 'wand':
      return `
        <line x1="150" y1="420" x2="150" y2="458" stroke="${suit.primary}" stroke-width="1.5" opacity="0.25"/>
        <circle cx="150" cy="416" r="4" fill="${suit.secondary}" opacity="0.3"/>
        <circle cx="135" cy="440" r="2.5" fill="${suit.primary}" opacity="0.2"/>
        <circle cx="165" cy="440" r="2.5" fill="${suit.primary}" opacity="0.2"/>`;
    case 'cup':
      return `
        <path d="M100,440 Q125,425 150,440 Q175,425 200,440" fill="none" stroke="${suit.primary}" stroke-width="1.5" opacity="0.25"/>
        <path d="M110,455 Q135,440 160,455 Q185,440 210,455" fill="none" stroke="${suit.secondary}" stroke-width="1" opacity="0.15"/>`;
    case 'sword':
      return `
        <line x1="120" y1="440" x2="180" y2="440" stroke="${suit.primary}" stroke-width="1" opacity="0.25"/>
        <line x1="150" y1="425" x2="150" y2="455" stroke="${suit.primary}" stroke-width="1" opacity="0.25"/>
        <circle cx="150" cy="440" r="8" fill="none" stroke="${suit.secondary}" stroke-width="1" opacity="0.18"/>`;
    case 'pentacle':
      return `
        <circle cx="150" cy="440" r="12" fill="none" stroke="${suit.primary}" stroke-width="1" opacity="0.25"/>
        <circle cx="150" cy="440" r="6" fill="${suit.secondary}" opacity="0.12"/>
        ${generateStar(150, 440, 10, 4, 5, suit.primary).replace('opacity="0.85"', 'opacity="0.18"')}`;
    default:
      return '';
  }
}

/* ===== 数字牌的符号排列 ===== */
function generateMultipleSymbols(suit, count) {
  const positions = getSymbolPositions(count);
  return positions.map(([x, y]) => getSuitSymbol(suit, x, y, 38)).join('');
}

function getSymbolPositions(count) {
  const cx = 150, cy = 210;
  switch (count) {
    case 1: return [[cx, cy]];
    case 2: return [[cx, cy - 35], [cx, cy + 35]];
    case 3: return [[cx, cy - 45], [cx, cy], [cx, cy + 45]];
    case 4: return [[cx - 30, cy - 30], [cx + 30, cy - 30], [cx - 30, cy + 30], [cx + 30, cy + 30]];
    case 5: return [[cx - 30, cy - 35], [cx + 30, cy - 35], [cx, cy], [cx - 30, cy + 35], [cx + 30, cy + 35]];
    case 6: return [[cx - 30, cy - 40], [cx + 30, cy - 40], [cx - 30, cy], [cx + 30, cy], [cx - 30, cy + 40], [cx + 30, cy + 40]];
    case 7: return [[cx - 30, cy - 45], [cx + 30, cy - 45], [cx, cy - 18], [cx - 30, cy + 8], [cx + 30, cy + 8], [cx - 30, cy + 45], [cx + 30, cy + 45]];
    case 8: return [[cx - 30, cy - 50], [cx + 30, cy - 50], [cx - 30, cy - 18], [cx + 30, cy - 18], [cx, cy + 5], [cx - 30, cy + 30], [cx + 30, cy + 30], [cx, cy + 55]];
    case 9: return [
      [cx - 30, cy - 50], [cx + 30, cy - 50],
      [cx - 30, cy - 20], [cx + 30, cy - 20],
      [cx, cy],
      [cx - 30, cy + 20], [cx + 30, cy + 20],
      [cx - 30, cy + 50], [cx + 30, cy + 50]
    ];
    case 10: return [
      [cx - 30, cy - 55], [cx + 30, cy - 55],
      [cx - 30, cy - 28], [cx + 30, cy - 28],
      [cx, cy - 12], [cx, cy + 12],
      [cx - 30, cy + 28], [cx + 30, cy + 28],
      [cx - 30, cy + 55], [cx + 30, cy + 55]
    ];
    default: return [[cx, cy]];
  }
}

/* ===== 宫廷牌人物 ===== */
function generateCourtFigure(suit, cardNum) {
  const fc = suit.primary;
  const ac = suit.accent;
  const sc = suit.secondary;
  switch (cardNum) {
    case 'page':
      return `
        <g transform="translate(150, 200)" opacity="0.9">
          <!-- 头部 -->
          <circle cx="0" cy="-55" r="24" fill="none" stroke="${fc}" stroke-width="2.5"/>
          <circle cx="-6" cy="-58" r="2.5" fill="${ac}"/>
          <circle cx="6" cy="-58" r="2.5" fill="${ac}"/>
          <path d="M-5,-50 Q0,-46 5,-50" fill="none" stroke="${ac}" stroke-width="1.5"/>
          <!-- 身体 -->
          <path d="M0,-31 Q-18,5 -15,40 L15,40 Q18,5 0,-31" fill="none" stroke="${fc}" stroke-width="2"/>
          <!-- 手臂 -->
          <line x1="-15" y1="-10" x2="-30" y2="10" stroke="${fc}" stroke-width="2"/>
          <line x1="15" y1="-10" x2="30" y2="10" stroke="${fc}" stroke-width="2"/>
          <!-- 腿 -->
          <line x1="-8" y1="40" x2="-14" y2="75" stroke="${fc}" stroke-width="2"/>
          <line x1="8" y1="40" x2="14" y2="75" stroke="${fc}" stroke-width="2"/>
          <!-- 花色小标记 -->
          <circle cx="0" cy="-55" r="5" fill="${sc}" opacity="0.3"/>
        </g>`;
    case 'knight':
      return `
        <g transform="translate(150, 200)" opacity="0.9">
          <!-- 头部 + 头盔 -->
          <circle cx="0" cy="-60" r="24" fill="none" stroke="${fc}" stroke-width="2.5"/>
          <path d="M-16,-85 Q0,-95 16,-85" fill="none" stroke="${sc}" stroke-width="2.5"/>
          <circle cx="-6" cy="-63" r="2.5" fill="${ac}"/>
          <circle cx="6" cy="-63" r="2.5" fill="${ac}"/>
          <!-- 身体 -->
          <path d="M0,-36 Q-20,0 -22,40 L22,40 Q20,0 0,-36" fill="none" stroke="${fc}" stroke-width="2"/>
          <!-- 手臂（持武器姿态） -->
          <line x1="-22" y1="-10" x2="-35" y2="-25" stroke="${fc}" stroke-width="2"/>
          <line x1="22" y1="-10" x2="40" y2="-30" stroke="${fc}" stroke-width="2"/>
          <line x1="40" y1="-30" x2="42" y2="-42" stroke="${sc}" stroke-width="1.5"/>
          <!-- 马的轮廓 -->
          <ellipse cx="0" cy="65" rx="35" ry="15" fill="none" stroke="${fc}" stroke-width="2"/>
          <path d="M-35,58 Q-42,45 -38,38" fill="none" stroke="${fc}" stroke-width="2"/>
          <circle cx="0" cy="-60" r="5" fill="${sc}" opacity="0.3"/>
        </g>`;
    case 'queen':
      return `
        <g transform="translate(150, 200)" opacity="0.9">
          <!-- 头部 -->
          <circle cx="0" cy="-60" r="26" fill="none" stroke="${fc}" stroke-width="2.5"/>
          <!-- 王冠 -->
          <path d="M-14,-87 L-8,-98 L0,-90 L8,-98 L14,-87" fill="none" stroke="${sc}" stroke-width="2.5"/>
          <circle cx="-8" cy="-98" r="2" fill="${sc}"/>
          <circle cx="0" cy="-90" r="2" fill="${sc}"/>
          <circle cx="8" cy="-98" r="2" fill="${sc}"/>
          <circle cx="-7" cy="-63" r="2.5" fill="${ac}"/>
          <circle cx="7" cy="-63" r="2.5" fill="${ac}"/>
          <path d="M-6,-55 Q0,-51 6,-55" fill="none" stroke="${ac}" stroke-width="1.5"/>
          <!-- 礼服身体 -->
          <path d="M0,-34 Q-25,5 -30,55 L30,55 Q25,5 0,-34" fill="none" stroke="${fc}" stroke-width="2.5"/>
          <!-- 手臂 -->
          <line x1="-25" y1="-5" x2="-38" y2="15" stroke="${fc}" stroke-width="2"/>
          <line x1="25" y1="-5" x2="38" y2="15" stroke="${fc}" stroke-width="2"/>
          <!-- 腿/裙摆 -->
          <path d="M-30,55 L-25,80 M30,55 L25,80" fill="none" stroke="${fc}" stroke-width="2"/>
          <circle cx="0" cy="-60" r="6" fill="${sc}" opacity="0.25"/>
        </g>`;
    case 'king':
      return `
        <g transform="translate(150, 200)" opacity="0.9">
          <!-- 头部 -->
          <circle cx="0" cy="-60" r="28" fill="none" stroke="${fc}" stroke-width="3"/>
          <!-- 大王冠 -->
          <path d="M-18,-89 L-12,-105 L-4,-95 L0,-105 L4,-95 L12,-105 L18,-89" fill="none" stroke="${sc}" stroke-width="2.5"/>
          <circle cx="-12" cy="-105" r="2.5" fill="${sc}"/>
          <circle cx="0" cy="-105" r="3" fill="${sc}"/>
          <circle cx="12" cy="-105" r="2.5" fill="${sc}"/>
          <circle cx="-8" cy="-63" r="3" fill="${ac}"/>
          <circle cx="8" cy="-63" r="3" fill="${ac}"/>
          <!-- 胡须 -->
          <path d="M-10,-50 Q0,-44 10,-50" fill="none" stroke="${ac}" stroke-width="1.5"/>
          <path d="M-6,-48 Q0,-42 6,-48" fill="none" stroke="${ac}" stroke-width="1"/>
          <!-- 宽袍身体 -->
          <path d="M0,-32 Q-28,5 -32,58 L32,58 Q28,5 0,-32" fill="none" stroke="${fc}" stroke-width="2.5"/>
          <!-- 手臂（持权杖/圣杯姿态） -->
          <line x1="-28" y1="-5" x2="-42" y2="12" stroke="${fc}" stroke-width="2"/>
          <line x1="28" y1="-5" x2="48" y2="-20" stroke="${fc}" stroke-width="2"/>
          <line x1="48" y1="-20" x2="50" y2="-35" stroke="${sc}" stroke-width="2"/>
          <!-- 腿/袍底 -->
          <path d="M-32,58 L-28,85 M32,58 L28,85" fill="none" stroke="${fc}" stroke-width="2"/>
          <circle cx="0" cy="-60" r="7" fill="${sc}" opacity="0.2"/>
        </g>`;
    default:
      return '';
  }
}

/* ===== 生成完整 SVG ===== */
function generateSVG(suit, card) {
  const isCourtCard = ['page', 'knight', 'queen', 'king'].includes(card.num);
  const isAce = card.num === 'ace';
  const numericValue = isCourtCard || isAce ? 0 : parseInt(card.num);

  const cnName = `${suit.name}${card.cn}`;
  const enName = `${card.label} of ${suit.id.charAt(0).toUpperCase() + suit.id.slice(1)}`;

  let centerContent = '';
  if (isAce) {
    centerContent = getSuitSymbol(suit, 150, 210, 95);
  } else if (isCourtCard) {
    centerContent = generateCourtFigure(suit, card.num);
  } else {
    centerContent = generateMultipleSymbols(suit, numericValue);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 500" width="300" height="500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${CARD_BG_TOP}"/>
      <stop offset="100%" stop-color="${CARD_BG_BOTTOM}"/>
    </linearGradient>
    <linearGradient id="scene" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${suit.sceneTop}"/>
      <stop offset="100%" stop-color="${suit.sceneBottom}"/>
    </linearGradient>
  </defs>

  <!-- 暖黄色背景（与大阿卡纳一致） -->
  <rect width="300" height="500" rx="16" fill="url(#bg)"/>

  ${generateBorder(suit)}

  <!-- 场景区域 -->
  <rect x="18" y="50" width="264" height="340" rx="8" fill="url(#scene)" opacity="0.5"/>

  <!-- 顶部：编号 + 花色元素名 -->
  <text x="30" y="42" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="${suit.primary}">${card.display}</text>
  <text x="270" y="42" font-family="sans-serif" font-size="14" fill="${suit.secondary}" text-anchor="end" opacity="0.7">${suit.elementName}</text>

  <!-- 中央主体内容 -->
  ${centerContent}

  <!-- 底部：牌名 -->
  <text x="150" y="408" font-family="'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="22" font-weight="bold" fill="${suit.primary}" text-anchor="middle">${cnName}</text>
  <text x="150" y="430" font-family="Georgia, serif" font-size="13" fill="${suit.accent}" text-anchor="middle" opacity="0.7">${enName}</text>

  ${generateDecoration(suit)}
</svg>`;
}

/* ===== 主逻辑 ===== */
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

let count = 0;
for (const suit of SUITS) {
  for (const card of CARD_NUMBERS) {
    const filename = `${suit.id}-${card.num}.svg`;
    const filepath = path.join(OUTPUT_DIR, filename);
    const svg = generateSVG(suit, card);
    fs.writeFileSync(filepath, svg, 'utf-8');
    count++;
  }
}

console.log(`✅ 成功生成 ${count} 张小阿卡纳 SVG（暖黄底色）→ ${OUTPUT_DIR}`);
