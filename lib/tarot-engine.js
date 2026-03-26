import { TAROT_DECK, TAROT_SPREADS } from '@/lib/tarot-data';

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithSeed(items, seed) {
  const list = [...items];
  const random = mulberry32(seed);
  for (let index = list.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [list[index], list[target]] = [list[target], list[index]];
  }
  return list;
}

/**
 * 根据用户输入的数字数组生成种子
 * 每个数字输入框的值参与 seed 计算，让用户的选择直接影响牌面
 */
function seedFromNumbers(numbers, question, spreadId) {
  const numStr = numbers.join('-');
  const combined = `${question}|${spreadId}|${numStr}|${Date.now()}`;
  return Array.from(combined).reduce((total, char, index) => total + char.charCodeAt(0) * (index + 1), 0);
}

/**
 * 核心抽牌函数
 * @param {Object} params
 * @param {string} params.question - 用户问题
 * @param {string} params.spreadId - 牌阵 ID
 * @param {number[]} params.pickedNumbers - 用户在 PICK 阶段输入的数字数组
 */
export function computeTarotReading({ question, spreadId, pickedNumbers = [] }) {
  const safeQuestion = question?.trim() || '我现在最需要看清什么？';
  const spread = TAROT_SPREADS.find((item) => item.id === spreadId) || TAROT_SPREADS[0];

  const seed = seedFromNumbers(pickedNumbers, safeQuestion, spread.id);
  const deck = shuffleWithSeed(TAROT_DECK, seed);

  const cards = spread.positions.map((position, index) => {
    const card = deck[index];
    /* 用用户输入的数字来决定正逆位 */
    const userNum = pickedNumbers[index] || 0;
    const reversed = (seed + userNum + index) % 3 === 0;
    return {
      ...card,
      position,
      orientation: reversed ? '逆位' : '正位',
      message: reversed ? card.reversed : card.upright
    };
  });

  return {
    spread,
    question: safeQuestion,
    cards
  };
}
