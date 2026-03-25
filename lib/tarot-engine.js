import { TAROT_DECK, TAROT_SPREADS } from '@/lib/tarot-data';

function seedFromString(input) {
  return Array.from(input).reduce((total, char, index) => total + char.charCodeAt(0) * (index + 1), 0);
}

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

function generateDynamicAdvice({ spread, cards, question, atmosphere }) {
  const uprightCards = cards.filter((c) => c.orientation === '正位');
  const reversedCards = cards.filter((c) => c.orientation === '逆位');
  const topKeywords = cards.flatMap((c) => c.keywords).slice(0, 5);

  /* 根据牌阵类型生成不同的"当前状态"判断 */
  let situationTitle = '';
  let situationBody = '';

  if (spread.id === 'daily') {
    const card = cards[0];
    situationTitle = card.orientation === '正位' ? '今天整体能量顺畅' : '今天需要多留一分余地';
    situationBody = card.orientation === '正位'
      ? `「${card.name}」正位提示你今天有明确的方向，把注意力放在最重要的一件事上即可。`
      : `「${card.name}」逆位提示你今天容易遇到小阻力，放慢节奏、先处理手头最紧急的事。`;
  } else if (spread.id === 'timeline') {
    const past = cards[0];
    const present = cards[1];
    const future = cards[2];
    situationTitle = present.orientation === '正位' ? '当前正处于可推进的阶段' : '当前更适合观察与调整';
    situationBody = `过去阶段受「${past.name}」${past.orientation}影响，${past.orientation === '逆位' ? '之前的节奏可能有失衡' : '之前打下了一定基础'}；`
      + `现在「${present.name}」${present.orientation}说明${present.orientation === '正位' ? '手上有推进空间' : '需要先理清阻力'}；`
      + `接下来「${future.name}」${future.orientation}${future.orientation === '正位' ? '指向积极发展' : '提醒你做好应变准备'}。`;
  } else if (spread.id === 'mirror') {
    const me = cards[0];
    const other = cards[1];
    const block = cards[2];
    situationTitle = me.orientation === '正位' && other.orientation === '正位'
      ? '双方状态相对开放' : '关系中存在需要面对的张力';
    situationBody = `你的状态由「${me.name}」${me.orientation}反映——${me.orientation === '正位' ? '你目前处于比较主动的位置' : '你可能正在犹豫或内耗'}；`
      + `对方的状态由「${other.name}」${other.orientation}反映——${other.orientation === '正位' ? '对方也有一定的开放度' : '对方目前有防备或犹豫'}。`
      + `隐藏阻碍「${block.name}」${block.orientation}提示${block.orientation === '逆位' ? '沟通盲区需要主动打开' : '核心问题并非不可解决'}。`;
  } else {
    /* crossroad 五张抉择十字 */
    const core = cards[0];
    const pro = cards[1];
    const con = cards[2];
    const hidden = cards[3];
    situationTitle = pro.orientation === '正位' && hidden.orientation === '正位'
      ? '利好因素略多于阻力' : '决策需要更慎重权衡';
    situationBody = `核心处境「${core.name}」${core.orientation}说明${core.orientation === '正位' ? '你的基本面是稳的' : '基础条件还需要加固'}；`
      + `有利因素「${pro.name}」${pro.orientation}${pro.orientation === '正位' ? '确实能支撑你向前' : '支撑力度不如预期'}；`
      + `阻力来源「${con.name}」${con.orientation}${con.orientation === '逆位' ? '说明阻力正在减弱' : '仍然需要正面应对'}；`
      + `隐藏机会「${hidden.name}」${hidden.orientation}${hidden.orientation === '正位' ? '暗示还有未被利用的空间' : '提醒你别忽视潜在风险'}。`;
  }

  /* 根据正逆位比例生成行动建议 */
  let actionTitle = '';
  let actionBody = '';

  if (uprightCards.length > reversedCards.length) {
    actionTitle = '整体偏顺，适合主动推进';
    actionBody = `牌面中正位居多（${uprightCards.length}张正位），围绕「${topKeywords.slice(0, 3).join('、')}」等关键词，`
      + `建议在接下来的阶段把握节奏主动行动，重点关注${uprightCards[0].name}所指的方向。`;
  } else if (uprightCards.length < reversedCards.length) {
    actionTitle = '阻力偏多，优先排除干扰';
    actionBody = `牌面中逆位偏多（${reversedCards.length}张逆位），核心关键词集中在「${topKeywords.slice(0, 3).join('、')}」。`
      + `建议先处理${reversedCards[0].name}逆位反映的问题，减少内耗后再做重要决定。`;
  } else {
    actionTitle = '正逆各半，边走边调整';
    actionBody = `正位和逆位各占一半，说明局面并非一边倒。围绕「${topKeywords.slice(0, 3).join('、')}」，`
      + `建议采取"小步验证"的策略，每走一步确认反馈后再推进下一步。`;
  }

  /* 一句话提醒 — 根据最后一张牌生成 */
  const lastCard = cards[cards.length - 1];
  let reminderTitle = '';
  let reminderBody = '';

  if (lastCard.orientation === '正位') {
    reminderTitle = `「${lastCard.name}」指向积极收束`;
    reminderBody = `最终位置的${lastCard.name}正位提示你：${lastCard.upright.replace('正位', '').trim()}`;
  } else {
    reminderTitle = `「${lastCard.name}」提醒你留有余地`;
    reminderBody = `最终位置的${lastCard.name}逆位提示你：${lastCard.reversed.replace('逆位', '').trim()}`;
  }

  return {
    situation: { title: situationTitle, body: situationBody },
    action: { title: actionTitle, body: actionBody },
    reminder: { title: reminderTitle, body: reminderBody }
  };
}

export function computeTarotReading({ question, spreadId }) {
  const safeQuestion = question?.trim() || '我现在最需要看清什么？';
  const spread = TAROT_SPREADS.find((item) => item.id === spreadId) || TAROT_SPREADS[0];
  const seed = seedFromString(`${safeQuestion}${spread.id}${Date.now()}`);
  const deck = shuffleWithSeed(TAROT_DECK, seed);

  const cards = spread.positions.map((position, index) => {
    const card = deck[index];
    const reversed = Math.floor((seed / (index + 1)) % 3) === 0;
    return {
      ...card,
      position,
      orientation: reversed ? '逆位' : '正位',
      message: reversed ? card.reversed : card.upright
    };
  });

  const uprightCount = cards.filter((card) => card.orientation === '正位').length;
  const reversedCount = cards.length - uprightCount;
  const majorKeyword = cards.map((card) => card.keywords[0]).slice(0, 3).join('、');
  const balanceLine =
    uprightCount >= reversedCount
      ? '整体仍有推进空间，关键是把分散注意力重新聚焦。'
      : '局势并非不能动，而是要先处理内在阻力和现实约束。';
  const atmosphere = uprightCount >= reversedCount ? '外部机会略多于阻力' : '当前更适合边走边校准';

  const advice = generateDynamicAdvice({ spread, cards, question: safeQuestion, atmosphere });

  return {
    spread,
    question: safeQuestion,
    cards,
    summary: `围绕"${safeQuestion}"，牌面核心关键词是 ${majorKeyword}。${balanceLine}`,
    atmosphere,
    advice
  };
}
