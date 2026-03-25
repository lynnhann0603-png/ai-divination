import * as lunarPackage from 'lunar-javascript';
import { CN_MONTHS, getShichenFromTime } from '@/lib/constants';

const Lunar = lunarPackage.Lunar || lunarPackage.default?.Lunar;
const Solar = lunarPackage.Solar || lunarPackage.default?.Solar;

const hourProfiles = {
  子时: '夜间思维敏锐，判断偏理性，适合先观察后出手。',
  丑时: '做事稳，抗压足，愿意把事情一点点落地。',
  寅时: '行动力强，容易在新机会来时率先启动。',
  卯时: '沟通感知力高，擅长在人际中寻找突破口。',
  辰时: '擅长整合资源，面对复杂局面不容易乱。',
  巳时: '表达和执行同步推进，适合主动争取位置。',
  午时: '爆发力强，气场直接，适合快速推进事项。',
  未时: '耐心和协调力兼具，适合长期经营关系。',
  申时: '善应变，适合多线信息处理和节奏切换。',
  酉时: '审美与标准感强，适合做精细判断和校准。',
  戌时: '责任感重，做选择时更看重长期稳定。',
  亥时: '直觉与想象力强，容易从细节感知趋势。'
};

const focusProfiles = {
  事业: {
    headline: '把注意力放在资源整合与关键节点发力。',
    strong: '适合主动谈机会、拿结果、争资源。',
    steady: '适合补结构、调优节奏、稳住口碑。',
    careful: '避免情绪化决策，先把手头工作做扎实。'
  },
  感情: {
    headline: '关系推进要看节奏，不急于在短期内求定论。',
    strong: '适合表达好感、推进见面和关键对话。',
    steady: '适合观察边界感与互动质量。',
    careful: '避免冷处理升级，先讲清真实需求。'
  },
  财运: {
    headline: '财务重点在节奏管理，不在短期冒进。',
    strong: '适合谈合作、做预算升级、争取提价空间。',
    steady: '适合复盘现金流、梳理支出结构。',
    careful: '避免冲动消费和高波动尝试。'
  },
  学业: {
    headline: '学业运势更像阶梯型上涨，稳定投入比突击更有效。',
    strong: '适合冲刺关键考试与提交成果。',
    steady: '适合查漏补缺、做系统复盘。',
    careful: '避免自我怀疑，回到训练计划本身。'
  },
  健康: {
    headline: '健康主题强调作息、恢复和情绪松绑。',
    strong: '适合建立新习惯、做规律性训练。',
    steady: '适合维持节奏、关注恢复质量。',
    careful: '避免过劳透支，优先睡眠和放松。'
  }
};

const toneLibrary = [
  '先稳后扬，真正的机会在节奏变清晰之后出现。',
  '表面看似平常，实则处于重新排兵布阵的阶段。',
  '越到下半程越容易出现突破，需要你前期沉住气。',
  '今年更像筛选年：不合适的人和事会自然退场。',
  '适合通过一次关键决策，把后续半年路径拉顺。'
];

const baziAdvice = {
  木: '多做拓展与连接型动作，机会往往来自新认识的人和新场景。',
  火: '适合主动表达、主动展示，但要留意节奏别烧得太快。',
  土: '稳定就是优势，持续做对的事情，比追热点更有效。',
  金: '适合收束杂音、聚焦标准，关键在于精准而不是铺量。',
  水: '先观察再发力反而更有利，灵感与信息差会给你答案。'
};

const elementTraits = {
  木: { nature: '生发', personality: '富有创造力和成长意识，善于开拓新局面', weakness: '容易分散精力、缺乏定力' },
  火: { nature: '向上', personality: '热情直接，行动力强，善于表达和展示自己', weakness: '容易急躁冒进、情绪波动' },
  土: { nature: '承载', personality: '沉稳踏实，耐心好，善于处理复杂事务', weakness: '容易保守固执、缺乏灵活性' },
  金: { nature: '收敛', personality: '标准感强，逻辑清晰，追求质量和精准', weakness: '容易过于挑剔、不易变通' },
  水: { nature: '流动', personality: '敏感细腻，善于观察和感知，适应力强', weakness: '容易犹豫不决、过度思虑' }
};

/* ===== 完整命局解读数据库 ===== */

const stemElementMap = { 甲: '木', 乙: '木', 丙: '火', 丁: '火', 戊: '土', 己: '土', 庚: '金', 辛: '金', 壬: '水', 癸: '水' };
const branchElementMap = { 子: '水', 丑: '土', 寅: '木', 卯: '木', 辰: '土', 巳: '火', 午: '火', 未: '土', 申: '金', 酉: '金', 戌: '土', 亥: '水' };

/* 格局气象判断 */
function analyzePattern(pillars, dayStem, baseElement) {
  const allChars = (pillars.year + pillars.month + pillars.day + pillars.time).split('');
  const elementCount = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  allChars.forEach(ch => {
    if (stemElementMap[ch]) elementCount[stemElementMap[ch]]++;
    if (branchElementMap[ch]) elementCount[branchElementMap[ch]]++;
  });

  const dayElement = stemElementMap[dayStem] || '土';
  const sameCount = elementCount[dayElement] || 0;
  const totalCount = Object.values(elementCount).reduce((a, b) => a + b, 0);
  const isStrong = sameCount >= totalCount * 0.35;

  // 用神与忌神
  const genMap = { 木: '水', 火: '木', 土: '火', 金: '土', 水: '金' };
  const restrainMap = { 木: '金', 火: '水', 土: '木', 金: '火', 水: '土' };
  const drainMap = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' };

  let useGod, avoidGod;
  if (isStrong) {
    useGod = restrainMap[dayElement];
    avoidGod = genMap[dayElement];
  } else {
    useGod = genMap[dayElement];
    avoidGod = restrainMap[dayElement];
  }

  const sorted = Object.entries(elementCount).sort((a, b) => b[1] - a[1]);
  const dominant = sorted[0][0];
  const weakest = sorted[sorted.length - 1][0];

  return {
    elementCount,
    dayElement,
    isStrong,
    useGod,
    avoidGod,
    dominant,
    weakest,
    strengthLabel: isStrong ? '身强' : '身弱',
    patternSummary: `日主${dayStem}属${dayElement}，八字五行分布中${dominant}气最旺、${weakest}气偏弱。`
      + `整体格局呈${isStrong ? '身强' : '身弱'}之象，${isStrong ? '日主得令得势，精力充沛但需要出口消耗' : '日主偏弱，需扶助印比之力方能成事'}。`
  };
}

/* 性格特征与外貌气质 */
function generatePersonality(dayElement, isStrong, gender, shichen) {
  const genderLabel = gender === '男' ? '他' : gender === '女' ? '她' : '命主';
  const personalities = {
    木: {
      strong: `${genderLabel}性格中有一股不服输的劲，外表看起来温和有礼，实则内心主见极强。身形偏修长，眉眼间带有书卷气，举止之间透着一股清逸之感。眼神温润而有力，给人一种"虽然不张扬，但绝对靠得住"的安全感。`,
      weak: `${genderLabel}外表给人温柔的印象，五官偏秀气，气质清新脱俗。性格上容易心软，对人真诚但有时缺乏足够的决断力。内心敏感细腻，容易被周围环境影响，但正因为这份细腻，${genderLabel}在审美和人际感知上有着超出常人的天赋。`
    },
    火: {
      strong: `${genderLabel}气场直接且有感染力，走到哪里都容易成为焦点。五官轮廓分明，眼神明亮有神采。说话语速偏快，表达能力极强，能让人在短时间内被${genderLabel}的热情和自信所打动。体态偏挺拔利落，即使安静下来也有一种内在的蓬勃感。`,
      weak: `${genderLabel}外表有一种清冷中带着温暖的矛盾感，五官精致但不锋利。性格上偶尔会显得犹豫，但骨子里有一把火，只是不轻易释放。${genderLabel}更像一盏暖灯，不耀眼但持久，靠近的人都会感受到那份安稳的温度。`
    },
    土: {
      strong: `${genderLabel}给人的第一印象是稳重可靠，面部轮廓偏饱满圆润，气质沉稳大气。说话不急不慢，做事有条理，是那种"遇到大事反而更冷静"的类型。身形偏厚实，有一种让人安心的存在感。`,
      weak: `${genderLabel}外表温和内敛，五官柔和不凌厉。性格上包容心强，但有时容易把压力往自己身上揽。看起来随和好相处，实则内心有自己的原则底线。气质上偏静，像一片沃土，${genderLabel}更适合用时间来证明自己的价值。`
    },
    金: {
      strong: `${genderLabel}五官棱角分明，皮肤偏白净，气质中自带一种"距离感"。性格上标准很高，对自己和对别人都一样。做事雷厉风行，逻辑清晰，是效率型的人。${genderLabel}的目光敏锐且带有审视感，不容易被表面的东西糊弄。`,
      weak: `${genderLabel}外表精致秀气，气质偏冷清但不拒人千里。内心有标准，但不会强加于人。${genderLabel}更像是一柄藏在鞘中的利剑，平时看不出锋芒，关键时刻却能一击切中要害。表达风格偏克制内敛，言语之间有分寸感。`
    },
    水: {
      strong: `${genderLabel}眼神灵动，五官之间有一种说不清的吸引力。思维跳跃、反应快，常常在别人还没理清头绪时就已经看到了答案。体态灵活，举止之间带有几分随性的洒脱，给人一种"不好定义但很有魅力"的感觉。`,
      weak: `${genderLabel}外表清秀温润，气质如水一般柔和。性格敏感多思，内心世界非常丰富。${genderLabel}善于倾听和观察，常常在不经意间说出触动人心的话。五官偏柔和，皮肤细腻，有一种让人想要亲近的温柔感。`
    }
  };

  const hourBuff = {
    子时: `尤其在夜间，${genderLabel}的思维会变得格外清晰，许多重要决定往往在深夜做出。`,
    丑时: `${genderLabel}有一种耐磨的韧性，越是困难的局面越能沉住气。`,
    寅时: `清晨出生赋予了${genderLabel}天生的行动力，想到就做的执行力是${genderLabel}的武器。`,
    卯时: `${genderLabel}的人际嗅觉极好，总能在对的时间认识对的人。`,
    辰时: `${genderLabel}擅长整合，别人眼中的杂乱信息在${genderLabel}手里能变成有序的拼图。`,
    巳时: `${genderLabel}表达欲与执行力并存，是能说也能做的实干型。`,
    午时: `正午出生让${genderLabel}天生具有领导气质，做事有魄力，不拖泥带水。`,
    未时: `${genderLabel}擅长维系关系，在长期合作中总是不可或缺的角色。`,
    申时: `${genderLabel}头脑灵活、反应极快，同时处理多件事也不会手忙脚乱。`,
    酉时: `${genderLabel}对美有天然的敏锐度，审美品位在同龄人中出类拔萃。`,
    戌时: `${genderLabel}有一种超越年龄的成熟感，做决定时总是考虑长远。`,
    亥时: `${genderLabel}直觉极强，很多时候不需要分析就能感知到事情的走向。`
  };

  const base = (personalities[dayElement] || personalities.土)[isStrong ? 'strong' : 'weak'];
  const hourNote = hourBuff[shichen] || '';
  return base + hourNote;
}

/* 过去年份推断 */
function generatePastYears(dayElement, isStrong, useGod, birthYear) {
  const currentYear = new Date().getFullYear();
  const pastYears = [];

  // 选取最近 3-5 年中有代表性的两个年份
  const yearPool = [];
  for (let y = currentYear - 5; y <= currentYear - 1; y++) {
    if (y > birthYear + 16) yearPool.push(y); // 至少 16 岁后
  }
  if (yearPool.length < 2) {
    yearPool.push(currentYear - 2, currentYear - 1);
  }

  const y1 = yearPool[Math.floor(yearPool.length * 0.3)];
  const y2 = yearPool[Math.floor(yearPool.length * 0.75)];

  const eventTemplates = {
    木: [
      { year: y1, text: `${y1}年，流年五行偏金克木，你可能经历了一次重要的人际关系重组或社交圈变动。旧的合作模式被打破，新的连接在阵痛中开始萌芽。这一年的核心课题是"断舍离"——放下不再适合的关系，才能为新的缘分腾出空间。` },
      { year: y2, text: `${y2}年，木气逐渐得到滋养，你可能在居住环境或工作场所上有了明显的变化。搬迁、换城市、或者更换了日常活动的主阵地。这个变动看似被动，实则为你打开了一扇新的窗户，后续的许多机会都与这次变动有关。` }
    ],
    火: [
      { year: y1, text: `${y1}年，水火交战之象明显，你可能在事业或身份定位上经历了一次转折。也许是换了工作方向，也许是放弃了一条走了很久的老路。那年有一种"旧的必须燃尽，新的才能点燃"的感觉，虽然过程煎熬，但结果证明这个转弯是对的。` },
      { year: y2, text: `${y2}年，火气渐旺，你可能迎来了一次高曝光度的机会或者公开表达的突破。无论是一次重要的展示、演讲、还是在社交媒体上的发声，都让周围人重新认识了你。但也需要留意，那一年的情绪消耗也不小。` }
    ],
    土: [
      { year: y1, text: `${y1}年，流年冲动了你命盘中的稳定结构，你可能感受到了来自家庭或居住环境的变动压力。也许是家庭关系的重新洗牌，也许是一次不得不做的搬迁决定。这种动荡让你一度感到不安，但它同时也迫使你去审视"什么才是真正重要的"。` },
      { year: y2, text: `${y2}年，经过前期的调整，你开始在新的基础上重建秩序。事业上可能有了更清晰的定位，或者在某个一直犹豫的领域终于落下了棋子。这一年的主题是"确认"——确认方向、确认合作者、确认自己想过什么样的生活。` }
    ],
    金: [
      { year: y1, text: `${y1}年，流年火旺克金，你可能经历了一次标准被打破或者计划被迫更改的考验。原本认为牢固的东西出现了裂缝，可能是一段合作关系的终结，也可能是一个重要项目的意外转向。这一年教会你的是：放下完美主义，接受不完美中的最优解。` },
      { year: y2, text: `${y2}年，金气重新凝聚，你在效率和标准方面找回了节奏。可能做了一个关键的决定——砍掉不必要的支线，聚焦到一个最有价值的方向上。这种"做减法"的勇气，为后来的突破奠定了基础。` }
    ],
    水: [
      { year: y1, text: `${y1}年，流年土气偏重制水，你可能感到了一种被束缚和限制的压力。思维虽然活跃，但总找不到出口和表达的窗口。那一年的核心冲突是"内在的丰富"和"外在的受限"之间的矛盾。你可能在那段时间做了大量的内在思考和积淀。` },
      { year: y2, text: `${y2}年，水势开始流动，你可能迎来了一次重要的信息获取或认知升级。也许是接触到了一个改变你思维方式的人或书或经历。这一年你的直觉变得格外敏锐，许多后来的重要判断都源于这段时期种下的种子。` }
    ]
  };

  return (eventTemplates[dayElement] || eventTemplates.土).map(item => item);
}

/* 兵器/乐器比喻 */
function generateMetaphor(dayElement, isStrong, gender) {
  const genderLabel = gender === '男' ? '他' : gender === '女' ? '她' : '命主';
  const metaphors = {
    木: {
      strong: `这张命盘像一把古琴——外表素雅不张扬，但每一根弦都经过精心调校。${genderLabel}的力量不在于一击必杀的锋利，而在于余音绕梁的持久影响力。正如古琴不需要音箱就能传声，${genderLabel}的能量更多通过"润物细无声"的方式扩散。`,
      weak: `这张命盘像一支竹笛——轻盈、灵巧、极具穿透力。虽然体量不大，但一旦找准了呼吸的节奏，就能吹出让人心动的旋律。${genderLabel}不需要成为乐队中最大声的乐器，而是成为最有辨识度的那个声音。`
    },
    火: {
      strong: `这张命盘像一柄陨铁锻造的弯刀——锋利、果断、自带光芒。${genderLabel}天生适合冲锋在前，直面问题而不是绕路而行。这把刀的特点是"快"，不管是反应速度还是执行力，都远超身边人。但刀锋太利也容易伤到自己，需要学会收刃的时机。`,
      weak: `这张命盘像一盏手工蜡烛——光芒不刺眼，但在暗处格外温暖。${genderLabel}的影响力不在于照亮整个房间，而在于被${genderLabel}光芒吸引而来的人，每一个都是真心欣赏${genderLabel}的人。这种"自选式"的人际关系，反而比大范围社交更有质量。`
    },
    土: {
      strong: `这张命盘像一面铜鼓——浑厚、稳重、自带号召力。${genderLabel}不需要敲得很响就能让人感受到力量，那种来自根基的震动感是别人模仿不来的。铜鼓的价值在于"镇得住"，无论场面多大、局面多乱，${genderLabel}在就让人安心。`,
      weak: `这张命盘像一只陶埙——朴实无华，但声音里有一种让人停下脚步的力量。${genderLabel}的魅力不在于炫技，而在于那份"原始的真"。正如陶埙的声音越简单越动人，${genderLabel}越是做最本真的自己，就越有吸引力。`
    },
    金: {
      strong: `这张命盘像一柄剑——不是战场上的长剑，而是文人案头的宝剑。${genderLabel}的锋芒更多体现在思维和判断力上，一句话就能切中要害。这把剑的特点是"准"，不追求数量而追求质量，不追求速度而追求精度。`,
      weak: `这张命盘像一面银镜——表面光洁细腻，内里能映照万物。${genderLabel}最大的天赋是"看清"——看清局势、看清人心、看清自己。这面镜子不需要主动发光，只要放在对的位置，就自然能发挥最大的价值。`
    },
    水: {
      strong: `这张命盘像一张古筝——看似安静地摆在那里，但一旦拨弦，就是一片江河奔涌的气势。${genderLabel}的才华像水一样，平时看不出深浅，但遇到对的舞台就会一泻千里。古筝的每根弦都对应不同的音高，正如${genderLabel}在不同领域都可能找到共鸣。`,
      weak: `这张命盘像一支毛笔——柔软、灵活、极度敏感。${genderLabel}的力量不在于硬碰硬，而在于以柔克刚。毛笔的妙处在于"蘸多少墨、用多少力，全看执笔者的心境"，${genderLabel}越是心静，笔下的线条就越精彩。`
    }
  };

  return (metaphors[dayElement] || metaphors.土)[isStrong ? 'strong' : 'weak'];
}

/* 才华与领域 */
function generateTalent(dayElement, isStrong, shichen) {
  const talents = {
    木: {
      strong: '最出色的才华在于「生长力」——能把一粒种子变成一片森林。适合创业、项目孵化、品牌建设、教育培训等需要从零到一的领域。你有一种让事物"长起来"的魔力，不管接手什么都能让它焕发新生。',
      weak: '最出色的才华在于「连接力」——你是天然的桥梁和纽带。适合咨询、心理辅导、内容创作、社群运营等需要理解人心的领域。你的敏感不是弱点，而是洞察力的来源。'
    },
    火: {
      strong: '最出色的才华在于「感染力」——你一开口就能点燃全场。适合演讲、营销、直播、品牌策划、公共关系等需要强表现力的领域。你是那种能把枯燥数据讲成动人故事的人。',
      weak: '最出色的才华在于「洞察力」——你能看到别人忽略的细节和情感暗流。适合写作、影视策划、用户体验设计、艺术创作等需要深度感受的领域。你的内敛不是缺陷，而是沉淀后爆发的前奏。'
    },
    土: {
      strong: '最出色的才华在于「整合力」——你能把散乱的碎片拼成完整的版图。适合项目管理、供应链管理、投资分析、城市规划等需要全局思维的领域。你天生就是"操盘手"型的人才。',
      weak: '最出色的才华在于「耐受力」——你能在别人都坚持不住的时候继续前行。适合研发、手工艺、园艺、健康管理、传统文化传承等需要长期投入的领域。你的价值随时间指数增长。'
    },
    金: {
      strong: '最出色的才华在于「标准力」——你定义标准、执行标准、守护标准。适合法律、审计、质量管理、技术架构、医疗诊断等需要精准判断的领域。你是那种让混乱变有序的人。',
      weak: '最出色的才华在于「鉴赏力」——你对品质有天然的辨别能力。适合艺术鉴定、时尚买手、美食评鉴、产品体验设计等需要高审美标准的领域。你的品味就是你最大的资产。'
    },
    水: {
      strong: '最出色的才华在于「应变力」——你能在瞬息万变的环境中找到最优路径。适合投资交易、危机公关、新闻报道、数据分析等需要快速反应的领域。你的大脑就像一台高速运转的处理器。',
      weak: '最出色的才华在于「感知力」——你能从微小的信号中读出大趋势。适合心理咨询、趋势研究、音乐创作、灵性疗愈等需要深度感受的领域。你的直觉准确度远超你自己的认知。'
    }
  };

  return (talents[dayElement] || talents.土)[isStrong ? 'strong' : 'weak'];
}

/* 事业形态 */
function generateCareer(dayElement, isStrong) {
  const careers = {
    木: {
      strong: '你的事业路径更适合"扩张型"——从一个核心能力出发，不断向外延伸。建议选择有成长空间的平台或自主创业，你需要的不是"一份稳定的工作"，而是"一个可以持续生长的土壤"。早期可以扎根某个垂直领域深耕，后期通过跨界合作打开更大的版图。',
      weak: '你的事业路径更适合"嫁接型"——把自己的核心能力嫁接到不同的场景中去。建议成为某个领域的专业顾问或自由职业者，保持灵活性的同时积累专业深度。你不需要在一棵树上待一辈子，而是学会把自己的枝条伸向阳光最好的方向。'
    },
    火: {
      strong: '你的事业路径更适合"聚光灯型"——在需要展示和表达的领域快速崛起。建议选择自带传播属性的行业：自媒体、品牌、营销、演艺。你的核心竞争力是"人格魅力"，把个人IP做起来，比任何技术性技能都有价值。',
      weak: '你的事业路径更适合"幕后策划型"——在台前不一定光芒万丈，但在幕后你是不可或缺的灵魂人物。建议选择策划、编辑、研发等能发挥深度思考能力的岗位。你更适合做"出主意"的人，而不是"上台领奖"的人。'
    },
    土: {
      strong: '你的事业路径更适合"根据地型"——选择一个领域深耕，把它变成你的大本营。建议在实体产业、不动产、教育、医疗等"重资产"领域建立壁垒。你的优势是"时间越久越值钱"，不要被短期的热门行业吸引而放弃长线布局。',
      weak: '你的事业路径更适合"服务型"——通过真诚的服务建立口碑和信任。建议在健康管理、心理咨询、家政服务、社区运营等"贴近人"的领域发展。你最大的竞争力是"让人放心"，这种信任感比任何营销手段都有效。'
    },
    金: {
      strong: '你的事业路径更适合"专家型"——在某个细分领域做到行业TOP。建议在技术、金融、法律、医疗等"高门槛"领域持续精进。你的价值在于"不可替代性"——当别人还在泛泛而谈的时候，你已经深入到了别人到达不了的精度。',
      weak: '你的事业路径更适合"品质型"——在注重品质和审美的行业发光。建议在设计、美学、奢侈品、精品餐饮等领域发展。你对品质的极致追求就是你最大的竞争力，不需要做到最大，只需要做到最好。'
    },
    水: {
      strong: '你的事业路径更适合"流通型"——在信息、资金、人脉的流通中找到自己的位置。建议在投资、贸易、信息中介、咨询、新媒体等"连接型"行业发展。你的核心能力是"整合信息差"，永远比别人快半拍。',
      weak: '你的事业路径更适合"创意型"——把内心丰富的感受转化为有价值的输出。建议在写作、音乐、心理学、文化研究等"内容型"领域发展。你不需要强迫自己变得"社牛"，安静的深度工作才是你的最佳状态。'
    }
  };

  return (careers[dayElement] || careers.土)[isStrong ? 'strong' : 'weak'];
}

/* 副业方向 */
function generateSideBusiness(dayElement, useGod) {
  const sideMap = {
    木: '建议副业方向围绕"成长与教育"——线上课程、读书会、技能培训、绿植花艺。木气的你天生适合做"给别人提供养分"的事情。',
    火: '建议副业方向围绕"内容与表达"——短视频、个人博客、播客、摄影。火气让你天生具有传播属性，把你的想法和审美分享出去，就是变现的开始。',
    土: '建议副业方向围绕"实物与空间"——手作、烘焙、家居改造、二手物品交易。土气让你对实体物品有天然的操控感，动手创造的过程本身就是你的能量补充。',
    金: '建议副业方向围绕"咨询与评估"——知识付费、行业分析报告、产品测评。金气让你天然适合做"判断者"的角色，你的建议值钱。',
    水: '建议副业方向围绕"灵感与疗愈"——塔罗解读、冥想引导、香薰调配、旅行攻略。水气赋予你超强的直觉和共情能力，这些"软技能"在当下比硬技术更稀缺。'
  };

  const godBonus = {
    木: '喜用神偏木，可额外关注与"新事物、新趋势"相关的副业机会。',
    火: '喜用神偏火，可额外关注与"展示、表达、短视频"相关的副业机会。',
    土: '喜用神偏土，可额外关注与"实体经营、空间运营"相关的副业机会。',
    金: '喜用神偏金，可额外关注与"技术、数据、精细化运营"相关的副业机会。',
    水: '喜用神偏水，可额外关注与"信息差、趋势判断、内容分发"相关的副业机会。'
  };

  return (sideMap[dayElement] || sideMap.土) + (godBonus[useGod] || '');
}

/* 伴侣轮廓 */
function generatePartner(dayElement, isStrong, gender) {
  const partnerProfiles = {
    木: {
      strong: '你最适合的伴侣是"土火型"——外表温和稳重，内心有一团安静的火焰。这个人不会试图压制你的成长，反而会为你提供稳定的土壤。他/她可能不是最耀眼的那个人，但一定是最让你"松下来"的那个人。你们之间最好的状态是：你负责向外扩展，他/她负责守住后方。',
      weak: '你最适合的伴侣是"水木型"——灵动、有趣、能激发你的灵感。这个人和你之间会有一种"不需要解释就能懂"的默契。他/她会给你力量感和安全感，同时不会限制你的自由。你们之间最好的状态是：像两棵相邻的树，各自向上生长但根系相连。'
    },
    火: {
      strong: '你最适合的伴侣是"土水型"——沉稳、包容、能承接你的热烈。这个人不会被你的强气场吓退，反而能在你燃烧得最旺的时候帮你控制火候。他/她可能话不多，但每一句都说在点上。你们最好的状态是：你点火，他/她调温度。',
      weak: '你最适合的伴侣是"木火型"——有活力、有想法、能带动你走出舒适区。这个人会像一阵春风一样激活你内心那把安静的火焰。他/她欣赏你的温柔和深度，同时能为你注入行动的勇气。你们最好的状态是：一起从平淡走向热烈。'
    },
    土: {
      strong: '你最适合的伴侣是"金水型"——聪慧、灵巧、能给你的稳重带来灵动感。这个人会让你原本有些固化的生活变得有趣起来。他/她懂得欣赏你的可靠，同时能在你过于保守时推你一把。你们最好的状态是：你是大地，他/她是流过大地的河水。',
      weak: '你最适合的伴侣是"火土型"——热情、踏实、给你安全感的同时不乏生活情趣。这个人能为你带来温暖和力量，让你不再事事往自己身上扛。他/她会主动表达爱意，弥补你不善表达的那一面。你们最好的状态是：相互取暖又彼此独立。'
    },
    金: {
      strong: '你最适合的伴侣是"水木型"——温柔、包容、能化解你的锋芒。这个人不会和你硬碰硬，而是用柔软的方式让你自动放下防备。他/她的感性能补充你的理性，他/她的包容能中和你的严格。你们最好的状态是：你负责做判断，他/她负责做缓冲。',
      weak: '你最适合的伴侣是"土金型"——务实、可靠、和你有共同的品质标准。这个人会让你感觉"终于遇到了一个能对齐标准的人"。他/她不需要多浪漫，但一定要靠谱。你们最好的状态是：一起追求生活的质感，在细节中感受幸福。'
    },
    水: {
      strong: '你最适合的伴侣是"木土型"——有主见、有目标、能给你方向感。这个人能把你散漫的才华聚焦到一个方向上，让你的能力有了用武之地。他/她可能比你更接地气，但恰好是你最需要的"锚点"。你们最好的状态是：你负责想象，他/她负责落地。',
      weak: '你最适合的伴侣是"金水型"——细腻、有品位、能和你在精神层面产生共鸣。这个人理解你的内心世界，不会觉得你"想太多"。他/她可能和你一样不善于social，但你们两个人在一起时自成一个安静而丰富的小宇宙。你们最好的状态是：彼此是对方最好的听众。'
    }
  };

  return (partnerProfiles[dayElement] || partnerProfiles.土)[isStrong ? 'strong' : 'weak'];
}

/* 宿命感片段 */
function generateFateScene(dayElement, gender, shichen) {
  const genderLabel = gender === '男' ? '他' : gender === '女' ? '她' : '命主';
  const scenes = {
    木: `有一天，在一间被绿植环绕的咖啡馆里，${genderLabel}会遇到一个正在翻看一本旧书的人。那个人抬头的瞬间，阳光刚好穿过落地窗照在${genderLabel}身上——就像森林里突然出现了一道光。他们可能只是对视了一秒钟，但${genderLabel}心里会清楚地知道："这个人，以后会出现在我的故事里。"`,
    火: `在某个夏天的傍晚，${genderLabel}会在一个热闹的户外活动中——可能是市集，可能是音乐节——遇到一个让${genderLabel}莫名其妙就想多看几眼的人。那个人可能正在做一件很普通的事情，但${genderLabel}就是移不开目光。后来${genderLabel}会发现，这种"没有理由就是想靠近"的感觉，就是命运在拍${genderLabel}的肩膀。`,
    土: `在某个平平无奇的工作日，可能是在一次会议上、一次出差途中、或者在电梯里等待下楼的时刻，${genderLabel}会和一个人产生一种奇怪的"似曾相识"的感觉。不是一见钟情那种电火花，而是一种"你好像一直都在"的安稳感。后来${genderLabel}才明白，最深的缘分往往藏在最日常的场景里。`,
    金: `在某个安静的深夜，${genderLabel}可能会在一个线上社群、一条评论区、或者一次偶然的文字交流中，遇到一个"说话方式让${genderLabel}觉得很舒服"的人。不是激烈的碰撞，而是一种精准的对频。${genderLabel}会发现，这个人看问题的角度和${genderLabel}惊人地一致，但又在关键地方恰到好处地不同。`,
    水: `在某次旅行中——可能是一座陌生城市的老街、一列深夜的火车、或者一家只剩两张空椅子的小餐厅——${genderLabel}会遇到一个让${genderLabel}产生"这个人身上有故事"的直觉的人。也许是对方点了一杯很少有人点的饮品，也许是对方在读一本${genderLabel}也读过的书。总之，这次相遇不是偶然，而是两条平行线终于找到了交叉点。`
  };

  return scenes[dayElement] || scenes.土;
}

/* 自我折损隐患 */
function generateSelfHarm(dayElement, isStrong) {
  const warnings = {
    木: {
      strong: '你最需要警惕的潜意识习惯是「过度扩张」——同时开太多项目、答应太多人、关注太多方向。你的生长力是优势，但如果根系不够深就拼命长高，迟早会因为一阵小风就倒下。请定期清理你的"待办事项清单"，把注意力从20件事收到3件事上。',
      weak: '你最需要警惕的潜意识习惯是「讨好式退让」——不是因为你真的不在意，而是害怕冲突而选择让步。每一次不必要的退让都在消磨你的自信。请记住：表达真实需求不是自私，而是对关系最真诚的维护。'
    },
    火: {
      strong: '你最需要警惕的潜意识习惯是「急于求成」——你太希望马上看到结果了。这种急切感会让你在70分的时候就迫不及待地发布，而错过了做到90分的机会。请给自己设一个"冷却期"——每次做出重大决定前，至少让自己冷静24小时。',
      weak: '你最需要警惕的潜意识习惯是「自我否定的内耗」——你内心有火但不敢释放，然后用"我还不够好"来合理化这种压抑。请注意：完美不是行动的前提，行动才是接近完美的唯一路径。先动起来，边做边调。'
    },
    土: {
      strong: '你最需要警惕的潜意识习惯是「固守已知」——因为当前的模式还不错就不愿意做任何改变。世界在变，你如果不变，终有一天会发现"稳"变成了"困"。请每季度给自己安排一次"打破常规"的体验。',
      weak: '你最需要警惕的潜意识习惯是「默默承受」——什么事都往自己身上扛，觉得"说出来也没人懂"。长期的过度负重会让你的身体和情绪都透支。请学会说"这件事我需要帮助"，这不是软弱，而是智慧。'
    },
    金: {
      strong: '你最需要警惕的潜意识习惯是「过度审判」——对自己和对别人都使用同一套严格标准。你的高标准是你的武器，但如果连亲密关系中也不放松，就会把身边的人推得越来越远。请区分"工作模式"和"生活模式"，在该柔软的地方学会柔软。',
      weak: '你最需要警惕的潜意识习惯是「逃避不完美」——因为结果可能达不到你的标准就干脆不开始。这种拖延不是懒，而是恐惧。请记住：80分的完成远比100分的空想有价值。'
    },
    水: {
      strong: '你最需要警惕的潜意识习惯是「信息过载」——你接收和处理信息的能力太强了，以至于常常在"多想一步"和"行动起来"之间反复横跳。请每天给自己设一个"关机时间"——不看新消息、不做新分析，让大脑彻底休息。',
      weak: '你最需要警惕的潜意识习惯是「过度共情」——你太容易感受到别人的情绪了，常常把别人的问题当成自己的负担。请学会建立情绪边界：关心但不代入，理解但不背负。你只需要做好你自己的功课，不需要为全世界的悲伤买单。'
    }
  };

  return (warnings[dayElement] || warnings.土)[isStrong ? 'strong' : 'weak'];
}

/* 补益字号 */
function generateBeneficialName(dayElement, useGod, gender) {
  const nameDatabase = {
    木: { male: ['「承栩」', '「沐霖」', '「初桐」'], female: ['「芷萱」', '「栩宁」', '「沐禾」'], reason: '木气需养，取字以水木滋润之意，助你的根基稳固、枝叶舒展' },
    火: { male: ['「晗曜」', '「煜辰」', '「照澄」'], female: ['「晗予」', '「昭宁」', '「煦然」'], reason: '火性需明，取字以光明温暖之意，让你的能量既有温度又有持久力' },
    土: { male: ['「砚恒」', '「承均」', '「宥安」'], female: ['「予安」', '「均宁」', '「砚秋」'], reason: '土气需润，取字以滋养包容之意，让你的稳重中多一份柔软和通透' },
    金: { male: ['「铭泽」', '「锦川」', '「钧和」'], female: ['「钰涵」', '「锦书」', '「铭悠」'], reason: '金气需水润之，取字以流动柔化之意，让你的锋芒不伤人、只成事' },
    水: { male: ['「泓毅」', '「润之」', '「清远」'], female: ['「泓悦」', '「润安」', '「清怡」'], reason: '水气需土制、金生，取字以定向聚力之意，让你的才华不散漫、更聚焦' }
  };

  const db = nameDatabase[useGod] || nameDatabase[dayElement] || nameDatabase.土;
  const names = gender === '男' ? db.male : db.female;
  const suggestion = names[Math.floor(Math.random() * names.length)];

  return `建议字号 ${suggestion}。取此字号的用意：${db.reason}。这个字号可以用于笔名、网名、或个人品牌名，在日常使用中形成潜移默化的能量补益。`;
}

/* 2026 丙午年流月运势 */
function generate2026MonthlyFortune(dayElement, isStrong, useGod, avoidGod, focus, safeName) {
  const monthGanzhi2026 = [
    { month: '正月', gz: '庚寅', element: '金木' },
    { month: '二月', gz: '辛卯', element: '金木' },
    { month: '三月', gz: '壬辰', element: '水土' },
    { month: '四月', gz: '癸巳', element: '水火' },
    { month: '五月', gz: '甲午', element: '木火' },
    { month: '六月', gz: '乙未', element: '木土' },
    { month: '七月', gz: '丙申', element: '火金' },
    { month: '八月', gz: '丁酉', element: '火金' },
    { month: '九月', gz: '戊戌', element: '土土' },
    { month: '十月', gz: '己亥', element: '土水' },
    { month: '十一月', gz: '庚子', element: '金水' },
    { month: '十二月', gz: '辛丑', element: '金土' }
  ];

  return monthGanzhi2026.map(m => {
    const elements = m.element.split('');
    const hasUseGod = elements.some(e => e === useGod);
    const hasAvoidGod = elements.some(e => e === avoidGod);
    let level, advice;

    if (hasUseGod && !hasAvoidGod) {
      level = 'strong';
      advice = `${m.month}（${m.gz}月）：喜用神得力之月。本月运势较旺，适合主动出击、争取资源、推进${focus}方向的关键事项。能量顺畅，事半功倍。化解建议：乘势而为，但注意不要贪多，聚焦最重要的1-2件事全力推进即可。`;
    } else if (hasAvoidGod && !hasUseGod) {
      level = 'careful';
      advice = `${m.month}（${m.gz}月）：忌神当令之月。本月可能感到阻力增大、节奏变慢。在${focus}方面不宜冒进。化解建议：放慢脚步，以守为攻。可佩戴${useGod === '木' ? '绿色' : useGod === '火' ? '红色' : useGod === '土' ? '黄色' : useGod === '金' ? '白色' : '黑色'}系配饰增强喜用神能量，多接触${useGod}属性的环境和事物。`;
    } else if (hasUseGod && hasAvoidGod) {
      level = 'steady';
      advice = `${m.month}（${m.gz}月）：吉凶参半之月。本月喜忌混杂，机会与挑战并存。在${focus}方面宜稳健行事，既不放弃机会也不盲目冲锋。化解建议：保持平常心，做好两手准备。重要决定可延后到下月，本月重点在"调研"而非"行动"。`;
    } else {
      level = 'steady';
      advice = `${m.month}（${m.gz}月）：平稳过渡之月。本月五行作用力较平和，整体节奏偏缓。适合用来复盘、整理、蓄力。化解建议：利用这段相对平静的时间补充能量、修复关系、优化计划。为后续的关键月份做好准备。`;
    }

    return { month: m.month, ganzhi: m.gz, level, advice };
  });
}

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

function toSafeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

export function computeBaziProfile(data) {
  if (!Lunar || !Solar) {
    throw new Error('农历计算模块未正确加载。');
  }

  const currentYear = new Date().getFullYear();
  const safeName = data.name?.trim() || '你';
  const focus = data.focus || '事业';
  const gender = data.gender || '未说明';
  const focusProfile = focusProfiles[focus] || focusProfiles.事业;
  const [hourString = '8', minuteString = '30'] = (data.birthTime || '08:30').split(':');
  const hour = toSafeNumber(hourString, 8);
  const minute = toSafeNumber(minuteString, 30);
  const shichen = getShichenFromTime(data.birthTime || '08:30');
  const lunarMonth = toSafeNumber(data.lunarMonth, 1) * (data.isLeapMonth === 'yes' ? -1 : 1);
  const lunar = Lunar.fromYmdHms(toSafeNumber(data.lunarYear, 1997), lunarMonth, toSafeNumber(data.lunarDay, 1), hour, minute, 0);
  const solar = lunar.getSolar();
  const birthMonth = solar.getMonth();
  const baseElement = ['木', '木', '土', '火', '火', '土', '金', '金', '土', '水', '水', '土'][birthMonth - 1] || '土';
  const tone = toneLibrary[seedFromString(`${safeName}${focus}${data.birthPlace}${data.birthTime}`) % toneLibrary.length];
  const lat = toSafeNumber(data.birthLat, 0);
  const lng = toSafeNumber(data.birthLng, 0);
  const seed = seedFromString(
    `${safeName}${data.lunarYear}${data.lunarMonth}${data.lunarDay}${data.birthTime}${focus}${lat}${lng}${data.gender}`
  );
  const rng = mulberry32(seed);
  const flowYearGanzhi = Solar.fromYmd(currentYear, 6, 15).getLunar().getYearInGanZhi();

  const pillars = {
    year: lunar.getYearInGanZhi(),
    month: lunar.getMonthInGanZhi(),
    day: lunar.getDayInGanZhi(),
    time: lunar.getTimeInGanZhi()
  };

  const dayStem = pillars.day.charAt(0);
  const dayMaster = dayStem + '日主';

  // 完整格局分析
  const pattern = analyzePattern(pillars, dayStem, baseElement);
  const dayElement = pattern.dayElement;

  // 生成完整命局解读各板块
  const personality = generatePersonality(dayElement, pattern.isStrong, gender, shichen);
  const pastYears = generatePastYears(dayElement, pattern.isStrong, pattern.useGod, toSafeNumber(data.lunarYear, 1997));
  const metaphor = generateMetaphor(dayElement, pattern.isStrong, gender);
  const talent = generateTalent(dayElement, pattern.isStrong, shichen);
  const career = generateCareer(dayElement, pattern.isStrong);
  const sideBusiness = generateSideBusiness(dayElement, pattern.useGod);
  const partner = generatePartner(dayElement, pattern.isStrong, gender);
  const fateScene = generateFateScene(dayElement, gender, shichen);
  const selfHarm = generateSelfHarm(dayElement, pattern.isStrong);
  const beneficialName = generateBeneficialName(dayElement, pattern.useGod, gender);
  const monthlyFortune2026 = generate2026MonthlyFortune(dayElement, pattern.isStrong, pattern.useGod, pattern.avoidGod, focus, safeName);

  // 完整命局解读对象
  const destinyReading = {
    patternSummary: pattern.patternSummary,
    strengthLabel: pattern.strengthLabel,
    useGod: pattern.useGod,
    avoidGod: pattern.avoidGod,
    elementCount: pattern.elementCount,
    personality,
    pastYears,
    metaphor,
    talent,
    career,
    sideBusiness,
    partner,
    fateScene,
    selfHarm,
    beneficialName,
    monthlyFortune2026
  };

  const timeline = Array.from({ length: 12 }, (_, index) => {
    const monthNumber = index + 1;
    const solarPoint = Solar.fromYmd(currentYear, monthNumber, 15);
    const monthLunar = solarPoint.getLunar();
    const flowMonthGanzhi = monthLunar.getMonthInGanZhi();
    const wave = Math.sin(((monthNumber + birthMonth) / 12) * Math.PI * 2);
    const geoBias = ((Math.round(lat * 10) + Math.round(lng * 10)) % 7) - 3;
    const noise = Math.floor(rng() * 15) - 7;
    const score = Math.round(68 + wave * 14 + geoBias + noise);
    const level = score >= 80 ? 'strong' : score >= 64 ? 'steady' : 'careful';
    const title = level === 'strong' ? '强势推进月' : level === 'steady' ? '稳步布局月' : '回收调整月';
    const advice = focusProfile[level];
    const direction =
      level === 'strong'
        ? `${monthNumber}月适合围绕${focus}主动推进，把握窗口。`
        : level === 'steady'
          ? `${monthNumber}月更适合把节奏拉稳，先布局再发力。`
          : `${monthNumber}月要减少冒进，优先处理杂音和内耗。`;

    return {
      month: `${monthNumber}月`,
      lunarMonthLabel: `${CN_MONTHS[index]}月`,
      flowYearGanzhi,
      flowMonthGanzhi,
      level,
      title,
      advice,
      direction,
      summary: `${flowYearGanzhi}年 ${flowMonthGanzhi}月，重点看${focus}方向的节奏变化。`
    };
  });

  const topWindows = timeline.filter((item) => item.level === 'strong').slice(0, 3);
  const lowWindows = timeline.filter((item) => item.level === 'careful').slice(0, 2);

  return {
    safeName,
    focus,
    gender,
    birthPlace: data.birthPlace || '',
    baseElement,
    dayMaster,
    focusProfile,
    tone,
    shichen,
    lat,
    lng,
    destinyReading,
    currentNote: `${safeName}的命盘主调偏${baseElement}，今年更适合通过"先定主轴、再做加法"的方式推进${focus}。`,
    strategy: baziAdvice[baseElement],
    hourText: hourProfiles[shichen] || hourProfiles.辰时,
    timeline,
    topWindows: topWindows.length ? topWindows : timeline.slice(0, 3),
    lowWindows: lowWindows.length ? lowWindows : timeline.slice(-2),
    solarText: `${solar.getYear()}-${String(solar.getMonth()).padStart(2, '0')}-${String(solar.getDay()).padStart(2, '0')} ${String(solar.getHour()).padStart(2, '0')}:${String(solar.getMinute()).padStart(2, '0')}`,
    lunarText: `${data.lunarYear}年${data.isLeapMonth === 'yes' ? '闰' : ''}${CN_MONTHS[toSafeNumber(data.lunarMonth, 1) - 1]}月${data.lunarDay}日`,
    pillars,
    flowYearGanzhi
  };
}
