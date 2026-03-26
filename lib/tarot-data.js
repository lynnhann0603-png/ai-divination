export const TAROT_SPREADS = [
  {
    id: 'daily',
    name: '单张日签',
    description: '适合快速获取今天或当前阶段的一句核心指引。',
    positions: ['今日主牌']
  },
  {
    id: 'timeline',
    name: '三张时间流',
    description: '从过去、现在、接下来三步来观察局势演进。',
    positions: ['过去基调', '现在主线', '接下来一个阶段']
  },
  {
    id: 'mirror',
    name: '四张关系镜像',
    description: '适合关系、合作、沟通主题，观察双方状态与阻碍。',
    positions: ['我的状态', '对方状态', '隐藏阻碍', '关系建议']
  },
  {
    id: 'crossroad',
    name: '五张抉择十字',
    description: '适合换工作、是否行动、二选一等决策问题。',
    positions: ['核心处境', '有利因素', '阻力来源', '隐藏机会', '下一步建议']
  }
];

export const TAROT_DECK = [
  /* ============================================================
   * 大阿卡纳 (Major Arcana) — 22 张
   * ============================================================ */
  { name: '愚者', number: 0, arcana: 'major', keywords: ['出发', '轻盈', '勇气'], image: '/tarot/00-fool.svg', upright: '正位代表新的旅程正在打开，你要允许自己先迈出第一步，再在路上修正方向。', reversed: '逆位提醒你别把冲动当成自由，先确认底层准备是否充分。' },
  { name: '魔术师', number: 1, arcana: 'major', keywords: ['掌控', '表达', '启动'], image: '/tarot/01-magician.svg', upright: '正位强调资源已经在你手里，关键是把分散的想法整合为清晰行动。', reversed: '逆位提醒你减少空转和表面用力，把注意力拉回真正能推进的动作。' },
  { name: '女祭司', number: 2, arcana: 'major', keywords: ['直觉', '观察', '保留'], image: '/tarot/02-priestess.svg', upright: '正位说明答案并不在外界喧闹中，而在你尚未说出口的感受里。', reversed: '逆位意味着你可能忽略了重要信号，建议慢下来重新审视。' },
  { name: '皇后', number: 3, arcana: 'major', keywords: ['丰盛', '滋养', '吸引'], image: '/tarot/03-empress.svg', upright: '正位代表关系、资源与创造力逐步丰盈，适合经营长期价值。', reversed: '逆位提醒你别只顾输出，要先照顾自己的边界与能量。' },
  { name: '皇帝', number: 4, arcana: 'major', keywords: ['秩序', '决断', '边界'], image: '/tarot/04-emperor.svg', upright: '正位提示局面需要你建立规则、给出明确立场。', reversed: '逆位表示控制欲或僵化结构正在造成压力，需要更灵活的处理方式。' },
  { name: '教皇', number: 5, arcana: 'major', keywords: ['规则', '学习', '传统'], image: '/tarot/05-hierophant.svg', upright: '正位适合遵循成熟方法、向经验体系借力。', reversed: '逆位说明你可能需要跳出旧框架，找到更适合自己的路径。' },
  { name: '恋人', number: 6, arcana: 'major', keywords: ['选择', '联结', '价值一致'], image: '/tarot/06-lovers.svg', upright: '正位意味着重要关系或选择正在逼近核心价值判断。', reversed: '逆位提醒你看清关系中的不对齐，不要用短暂情绪代替长期判断。' },
  { name: '战车', number: 7, arcana: 'major', keywords: ['推进', '专注', '胜负心'], image: '/tarot/07-chariot.svg', upright: '正位象征局势可以推进，关键在于集中意志、保持方向统一。', reversed: '逆位提醒你不要一边踩油门一边怀疑自己，否则容易失控。' },
  { name: '力量', number: 8, arcana: 'major', keywords: ['稳定', '柔韧', '驯服情绪'], image: '/tarot/08-strength.svg', upright: '正位代表真正的优势来自稳定情绪和持续耐心。', reversed: '逆位意味着内耗变多，先把焦躁感安顿下来再做决定。' },
  { name: '隐者', number: 9, arcana: 'major', keywords: ['沉淀', '复盘', '独处'], image: '/tarot/09-hermit.svg', upright: '正位适合暂停外界噪音，回到自己的判断体系。', reversed: '逆位提醒你不要过度封闭，必要时向可信的人求证。' },
  { name: '命运之轮', number: 10, arcana: 'major', keywords: ['转机', '节奏', '周期'], image: '/tarot/10-wheel.svg', upright: '正位说明外部节奏正在转动，你需要顺势而为、抓住窗口。', reversed: '逆位意味着时机尚未完全成熟，不必硬推。' },
  { name: '正义', number: 11, arcana: 'major', keywords: ['平衡', '因果', '清算'], image: '/tarot/11-justice.svg', upright: '正位要求你回到事实、责任与真实交换。', reversed: '逆位提示你可能对某些代价估计不足，需要更客观。' },
  { name: '倒吊人', number: 12, arcana: 'major', keywords: ['停顿', '换角度', '等待'], image: '/tarot/12-hanged.svg', upright: '正位表明当前并非白费力气，而是进入了必要的观察期。', reversed: '逆位提醒你别把拖延包装成等待，该动的时候还是要动。' },
  { name: '死神', number: 13, arcana: 'major', keywords: ['结束', '蜕变', '告别'], image: '/tarot/13-death.svg', upright: '正位并非坏事，而是提醒旧阶段已经走到尾声，腾挪才能新生。', reversed: '逆位意味着你在抓着已经过期的结构不放，反而加重消耗。' },
  { name: '节制', number: 14, arcana: 'major', keywords: ['调和', '慢稳', '协同'], image: '/tarot/14-temperance.svg', upright: '正位适合循序渐进地整合资源，慢慢把事情调顺。', reversed: '逆位说明节奏失衡，先把优先级和能量分配重新校准。' },
  { name: '恶魔', number: 15, arcana: 'major', keywords: ['执念', '诱惑', '束缚'], image: '/tarot/15-devil.svg', upright: '正位提醒你看清自己被什么困住：欲望、恐惧，还是习惯。', reversed: '逆位说明你已经开始挣脱旧束缚，但仍需防止反复。' },
  { name: '高塔', number: 16, arcana: 'major', keywords: ['震荡', '真相', '重构'], image: '/tarot/16-tower.svg', upright: '正位表示伪稳定正在被打破，短痛之后才有真正重建。', reversed: '逆位暗示你已察觉风险，若尽快调整可减少冲击。' },
  { name: '星星', number: 17, arcana: 'major', keywords: ['疗愈', '希望', '长期愿景'], image: '/tarot/17-star.svg', upright: '正位带来修复与希望，说明你值得继续对未来保留信心。', reversed: '逆位提醒你别因一时失望而否定长期方向。' },
  { name: '月亮', number: 18, arcana: 'major', keywords: ['不确定', '情绪波动', '潜意识'], image: '/tarot/18-moon.svg', upright: '正位说明信息并不完整，先辨别情绪投射与事实。', reversed: '逆位意味着迷雾正在散去，很多问题会逐渐看清。' },
  { name: '太阳', number: 19, arcana: 'major', keywords: ['清晰', '喜悦', '显化'], image: '/tarot/19-sun.svg', upright: '正位象征成果、确认与可见度提升，适合主动表达。', reversed: '逆位表示好消息仍在，但需要你降低预期、保持耐心。' },
  { name: '审判', number: 20, arcana: 'major', keywords: ['召唤', '复盘', '决定'], image: '/tarot/20-judgement.svg', upright: '正位提示你正在被推向真正重要的决定点。', reversed: '逆位说明你还在犹豫，先把过去未了结的问题理清。' },
  { name: '世界', number: 21, arcana: 'major', keywords: ['完成', '整合', '升级'], image: '/tarot/21-world.svg', upright: '正位代表一个阶段即将圆满收束，也预示下一轮升级。', reversed: '逆位表示临门一脚的整理工作还没做完，别急着跳下一步。' },

  /* ============================================================
   * 小阿卡纳 (Minor Arcana) — 56 张
   * ============================================================ */

  /* ---- 权杖 (Wands) · 火元素 ---- */
  { name: '权杖王牌', number: 'ace', arcana: 'minor', suit: '权杖', keywords: ['新起点', '灵感', '潜力'], image: '/tarot/wands-ace.svg', upright: '正位预示一股新的热情或创意正在涌现，抓住这个火苗，它可能点燃全局。', reversed: '逆位表示想法很多但落地不足，先聚焦一个方向再点火。' },
  { name: '权杖二', number: 2, arcana: 'minor', suit: '权杖', keywords: ['规划', '决策', '远见'], image: '/tarot/wands-02.svg', upright: '正位说明你正站在十字路口做规划，眼光要放长远，别被眼前小利绊住。', reversed: '逆位提醒你犹豫不决反而错失良机，信息够了就该拍板。' },
  { name: '权杖三', number: 3, arcana: 'minor', suit: '权杖', keywords: ['拓展', '等待成果', '远航'], image: '/tarot/wands-03.svg', upright: '正位意味着你之前播下的种子正在生长，现在需要耐心等待第一波回报。', reversed: '逆位提醒你不要急于求成，有些事需要更多时间发酵。' },
  { name: '权杖四', number: 4, arcana: 'minor', suit: '权杖', keywords: ['庆祝', '稳定', '里程碑'], image: '/tarot/wands-04.svg', upright: '正位代表一个小阶段的圆满，适合停下来庆祝和休整。', reversed: '逆位暗示你可能忽略了身边人的贡献，记得分享喜悦。' },
  { name: '权杖五', number: 5, arcana: 'minor', suit: '权杖', keywords: ['竞争', '冲突', '磨合'], image: '/tarot/wands-05.svg', upright: '正位说明你正处于竞争或观点碰撞中，把它当成磨砺而非威胁。', reversed: '逆位提醒你避免无意义的内耗，把精力用在真正的对手身上。' },
  { name: '权杖六', number: 6, arcana: 'minor', suit: '权杖', keywords: ['胜利', '认可', '领导力'], image: '/tarot/wands-06.svg', upright: '正位象征努力获得了认可，你正被推上更高的舞台。', reversed: '逆位提醒你功成之后要保持谦逊，风头太盛容易招嫉。' },
  { name: '权杖七', number: 7, arcana: 'minor', suit: '权杖', keywords: ['坚守', '防御', '立场'], image: '/tarot/wands-07.svg', upright: '正位说明你需要守住自己的阵地和底线，不要轻易让步。', reversed: '逆位意味着压力过大可能让你疲于应付，适时寻求支援。' },
  { name: '权杖八', number: 8, arcana: 'minor', suit: '权杖', keywords: ['快速推进', '消息', '行动'], image: '/tarot/wands-08.svg', upright: '正位表示事情将快速推进，好消息或新机会正在赶来的路上。', reversed: '逆位提醒你别被速度冲昏头脑，快不等于好。' },
  { name: '权杖九', number: 9, arcana: 'minor', suit: '权杖', keywords: ['坚韧', '最后防线', '警惕'], image: '/tarot/wands-09.svg', upright: '正位说明你正处于最后的坚持阶段，不要在黎明前放弃。', reversed: '逆位意味着你承受了不必要的压力，学会放下一些不属于你的担子。' },
  { name: '权杖十', number: 10, arcana: 'minor', suit: '权杖', keywords: ['重压', '责任', '燃尽'], image: '/tarot/wands-10.svg', upright: '正位表示你承担了太多，虽然能力足够但需要学会委托和分担。', reversed: '逆位说明你已经开始意识到不能一个人扛，这是好的开始。' },
  { name: '权杖侍从', number: 'page', arcana: 'minor', suit: '权杖', keywords: ['热情', '探索', '好消息'], image: '/tarot/wands-page.svg', upright: '正位代表一个充满热情的新开始或令人兴奋的消息即将到来。', reversed: '逆位提醒你三分钟热度不可取，想清楚再行动。' },
  { name: '权杖骑士', number: 'knight', arcana: 'minor', suit: '权杖', keywords: ['冲劲', '冒险', '行动力'], image: '/tarot/wands-knight.svg', upright: '正位象征充沛的行动力和冒险精神，适合大胆推进计划。', reversed: '逆位提醒你鲁莽不等于勇敢，冲之前先确认方向。' },
  { name: '权杖王后', number: 'queen', arcana: 'minor', suit: '权杖', keywords: ['自信', '温暖', '影响力'], image: '/tarot/wands-queen.svg', upright: '正位代表你散发着温暖而坚定的能量，能够感染和带动周围的人。', reversed: '逆位暗示你可能过于强势或情绪化，试着用更柔和的方式表达。' },
  { name: '权杖国王', number: 'king', arcana: 'minor', suit: '权杖', keywords: ['领袖', '远见', '果断'], image: '/tarot/wands-king.svg', upright: '正位象征强大的领导力和清晰的愿景，适合做重要决策。', reversed: '逆位提醒你不要独断专行，倾听他人的意见同样重要。' },

  /* ---- 圣杯 (Cups) · 水元素 ---- */
  { name: '圣杯王牌', number: 'ace', arcana: 'minor', suit: '圣杯', keywords: ['新感情', '直觉', '心灵满足'], image: '/tarot/cups-ace.svg', upright: '正位预示一段新的情感体验或深层的心灵满足正在来临。', reversed: '逆位表示情感上有些空虚或压抑，需要先照顾好自己的内心。' },
  { name: '圣杯二', number: 2, arcana: 'minor', suit: '圣杯', keywords: ['连接', '伙伴', '相互吸引'], image: '/tarot/cups-02.svg', upright: '正位代表一段有质量的双向连接，无论是爱情还是深度合作。', reversed: '逆位提醒你关系中可能存在不平等，需要重新校准期待。' },
  { name: '圣杯三', number: 3, arcana: 'minor', suit: '圣杯', keywords: ['庆祝', '友谊', '社群'], image: '/tarot/cups-03.svg', upright: '正位象征友谊和社交的丰收，适合参与团体活动和庆祝。', reversed: '逆位暗示社交圈中可能有表面和谐、实质疏离的情况。' },
  { name: '圣杯四', number: 4, arcana: 'minor', suit: '圣杯', keywords: ['倦怠', '冷漠', '错过'], image: '/tarot/cups-04.svg', upright: '正位说明你对眼前的机会感到麻木或不满足，需要重新点燃内在热情。', reversed: '逆位表示你开始从消极中醒来，重新看到了生活中被忽视的美好。' },
  { name: '圣杯五', number: 5, arcana: 'minor', suit: '圣杯', keywords: ['失落', '遗憾', '转念'], image: '/tarot/cups-05.svg', upright: '正位反映一种失落感或遗憾，但别只盯着打翻的杯子，还有完好的等着你。', reversed: '逆位说明你正在从悲伤中恢复，开始接受现实并向前看。' },
  { name: '圣杯六', number: 6, arcana: 'minor', suit: '圣杯', keywords: ['怀旧', '童真', '旧缘'], image: '/tarot/cups-06.svg', upright: '正位代表美好的回忆和纯真的情感，可能与过去的人事物重新产生连接。', reversed: '逆位提醒你不要沉溺于过去，活在当下才能抓住新机会。' },
  { name: '圣杯七', number: 7, arcana: 'minor', suit: '圣杯', keywords: ['幻想', '选择', '迷雾'], image: '/tarot/cups-07.svg', upright: '正位说明你面前的选项看起来很多，但要分清哪些是实质、哪些是幻象。', reversed: '逆位表示你开始看清现实，不再被华而不实的选项迷惑。' },
  { name: '圣杯八', number: 8, arcana: 'minor', suit: '圣杯', keywords: ['放下', '离开', '寻找更深'], image: '/tarot/cups-08.svg', upright: '正位意味着你需要勇敢放下看似还不错但实际已无法满足你的东西。', reversed: '逆位提醒你是在逃避还是在真正放下，诚实面对自己的动机。' },
  { name: '圣杯九', number: 9, arcana: 'minor', suit: '圣杯', keywords: ['满足', '愿望成真', '享受'], image: '/tarot/cups-09.svg', upright: '正位是情感层面的"许愿牌"，你内心渴望的东西正在逐步兑现。', reversed: '逆位提醒你幸福不是靠外在条件堆砌的，内心的平静更重要。' },
  { name: '圣杯十', number: 10, arcana: 'minor', suit: '圣杯', keywords: ['圆满', '家庭', '情感丰收'], image: '/tarot/cups-10.svg', upright: '正位代表情感领域的圆满和谐，家庭、爱情、友情都在最好的状态。', reversed: '逆位暗示关系中存在一些裂缝需要修补，别让小矛盾积累成大问题。' },
  { name: '圣杯侍从', number: 'page', arcana: 'minor', suit: '圣杯', keywords: ['浪漫', '直觉', '新情感'], image: '/tarot/cups-page.svg', upright: '正位代表一个温柔敏感的信号，可能是新的情感萌芽或创意灵感。', reversed: '逆位提醒你别沉溺在情绪中不出来，该面对现实的时候要清醒。' },
  { name: '圣杯骑士', number: 'knight', arcana: 'minor', suit: '圣杯', keywords: ['追求', '浪漫主义', '理想'], image: '/tarot/cups-knight.svg', upright: '正位象征一位浪漫的追求者或你内心对理想关系的渴望正在驱动行动。', reversed: '逆位提醒你理想很美但别脱离现实，感情也需要柴米油盐。' },
  { name: '圣杯王后', number: 'queen', arcana: 'minor', suit: '圣杯', keywords: ['共情', '关怀', '情感智慧'], image: '/tarot/cups-queen.svg', upright: '正位代表深厚的情感智慧和共情能力，你能看到他人看不到的情绪暗流。', reversed: '逆位暗示你可能过度付出或情绪边界模糊，先保护好自己的能量。' },
  { name: '圣杯国王', number: 'king', arcana: 'minor', suit: '圣杯', keywords: ['成熟', '包容', '情感平衡'], image: '/tarot/cups-king.svg', upright: '正位象征情感的成熟与稳定，你能在复杂关系中保持冷静和包容。', reversed: '逆位提醒你别把冷静变成冷漠，关系需要适度表达脆弱。' },

  /* ---- 宝剑 (Swords) · 风元素 ---- */
  { name: '宝剑王牌', number: 'ace', arcana: 'minor', suit: '宝剑', keywords: ['突破', '真相', '新思路'], image: '/tarot/swords-ace.svg', upright: '正位预示思维层面的重大突破，一个清晰的洞见正在切开迷雾。', reversed: '逆位提醒你别用偏激的观点武装自己，真相需要更全面的视角。' },
  { name: '宝剑二', number: 2, arcana: 'minor', suit: '宝剑', keywords: ['僵持', '回避', '平衡'], image: '/tarot/swords-02.svg', upright: '正位说明你正刻意回避某个决定，但这种平衡只是暂时的。', reversed: '逆位表示你终于准备好面对被搁置的问题了。' },
  { name: '宝剑三', number: 3, arcana: 'minor', suit: '宝剑', keywords: ['心痛', '悲伤', '释放'], image: '/tarot/swords-03.svg', upright: '正位代表一次情感上的刺痛，但承认痛苦才是疗愈的开始。', reversed: '逆位说明你正在从心痛中恢复，伤口正在慢慢愈合。' },
  { name: '宝剑四', number: 4, arcana: 'minor', suit: '宝剑', keywords: ['休息', '恢复', '蓄能'], image: '/tarot/swords-04.svg', upright: '正位提醒你大脑需要休息，暂停思考、放空自己不是懒惰而是必要。', reversed: '逆位意味着你已经休息够了，该重新启动了。' },
  { name: '宝剑五', number: 5, arcana: 'minor', suit: '宝剑', keywords: ['冲突', '输赢', '代价'], image: '/tarot/swords-05.svg', upright: '正位说明一场争执或竞争中有人得意有人失落，关键是赢了之后你真正得到了什么。', reversed: '逆位提醒你放下输赢心态，有些战争不值得打。' },
  { name: '宝剑六', number: 6, arcana: 'minor', suit: '宝剑', keywords: ['过渡', '离开', '疗愈之旅'], image: '/tarot/swords-06.svg', upright: '正位象征离开困境、驶向平静的水域，虽然伤痕还在但方向是好的。', reversed: '逆位暗示你还没做好离开的准备，或者逃避不等于解决。' },
  { name: '宝剑七', number: 7, arcana: 'minor', suit: '宝剑', keywords: ['策略', '隐藏', '试探'], image: '/tarot/swords-07.svg', upright: '正位说明当前局势需要策略和智慧，不一定要正面硬刚。', reversed: '逆位提醒你小聪明用多了会损害信任，还是坦诚一些好。' },
  { name: '宝剑八', number: 8, arcana: 'minor', suit: '宝剑', keywords: ['受困', '自我限制', '思维牢笼'], image: '/tarot/swords-08.svg', upright: '正位表示你感到被困住了，但很多限制其实来自自己的思维模式。', reversed: '逆位说明你开始意识到束缚是可以解开的，行动起来！' },
  { name: '宝剑九', number: 9, arcana: 'minor', suit: '宝剑', keywords: ['焦虑', '噩梦', '过度担忧'], image: '/tarot/swords-09.svg', upright: '正位反映内心的焦虑和恐惧，很多担心其实并不会成真。', reversed: '逆位表示你正在走出焦虑的阴影，最坏的时期已经过去。' },
  { name: '宝剑十', number: 10, arcana: 'minor', suit: '宝剑', keywords: ['终结', '触底', '彻底了断'], image: '/tarot/swords-10.svg', upright: '正位虽然看起来最惨烈，但它意味着最糟糕的已经发生，接下来只会更好。', reversed: '逆位说明你正在从谷底爬起来，虽然痛但已经度过最难的部分。' },
  { name: '宝剑侍从', number: 'page', arcana: 'minor', suit: '宝剑', keywords: ['好奇', '观察', '新视角'], image: '/tarot/swords-page.svg', upright: '正位代表用新鲜的眼光看问题，保持好奇心和学习的态度。', reversed: '逆位提醒你别光说不做，分析够了就该行动了。' },
  { name: '宝剑骑士', number: 'knight', arcana: 'minor', suit: '宝剑', keywords: ['果断', '直接', '锋芒'], image: '/tarot/swords-knight.svg', upright: '正位象征思维敏捷、行动果断，适合快速推进需要理性判断的事务。', reversed: '逆位提醒你锋芒太露容易伤人，说话做事留一些余地。' },
  { name: '宝剑王后', number: 'queen', arcana: 'minor', suit: '宝剑', keywords: ['独立', '清醒', '界限感'], image: '/tarot/swords-queen.svg', upright: '正位代表冷静清醒的判断力和清晰的个人边界，不被情绪左右。', reversed: '逆位暗示你可能过于冷淡或苛刻，适当展示柔软不是示弱。' },
  { name: '宝剑国王', number: 'king', arcana: 'minor', suit: '宝剑', keywords: ['权威', '理智', '公正'], image: '/tarot/swords-king.svg', upright: '正位象征以理性和公正来掌控局面，适合做需要客观判断的重要决策。', reversed: '逆位提醒你别把理性当成情感的挡箭牌，有时候也需要用心去感受。' },

  /* ---- 星币 (Pentacles) · 土元素 ---- */
  { name: '星币王牌', number: 'ace', arcana: 'minor', suit: '星币', keywords: ['新机会', '物质基础', '务实起步'], image: '/tarot/pentacles-ace.svg', upright: '正位预示一个与金钱、工作或物质相关的新机会正在出现。', reversed: '逆位提醒你别错过实际的机会，眼高手低是大忌。' },
  { name: '星币二', number: 2, arcana: 'minor', suit: '星币', keywords: ['平衡', '多任务', '灵活应变'], image: '/tarot/pentacles-02.svg', upright: '正位说明你正在同时处理多件事，需要灵活地分配时间和资源。', reversed: '逆位提醒你别试图同时做太多事，优先级很重要。' },
  { name: '星币三', number: 3, arcana: 'minor', suit: '星币', keywords: ['协作', '技能', '精进'], image: '/tarot/pentacles-03.svg', upright: '正位意味着你需要通过团队合作和技能提升来推进项目。', reversed: '逆位暗示工作质量可能不够扎实，别急着交差。' },
  { name: '星币四', number: 4, arcana: 'minor', suit: '星币', keywords: ['守财', '安全感', '控制'], image: '/tarot/pentacles-04.svg', upright: '正位代表对财务安全的重视，适合存钱和守住已有的资源。', reversed: '逆位提醒你抓得太紧反而会错失投资和成长的机会。' },
  { name: '星币五', number: 5, arcana: 'minor', suit: '星币', keywords: ['匮乏', '困难', '求助'], image: '/tarot/pentacles-05.svg', upright: '正位反映物质层面的困境或不安全感，但困难是暂时的。', reversed: '逆位说明最艰难的时期正在过去，开始看到恢复的迹象。' },
  { name: '星币六', number: 6, arcana: 'minor', suit: '星币', keywords: ['给予', '分享', '慷慨'], image: '/tarot/pentacles-06.svg', upright: '正位代表资源的流通和善意的给予，你可能是给予者也可能是接受者。', reversed: '逆位提醒你给予要适度，别让慷慨变成讨好。' },
  { name: '星币七', number: 7, arcana: 'minor', suit: '星币', keywords: ['耐心', '长期投资', '等待收获'], image: '/tarot/pentacles-07.svg', upright: '正位说明你播下的种子需要时间生长，不要因为暂时看不到成果就放弃。', reversed: '逆位提醒你重新评估投入产出比，如果方向不对要及时调整。' },
  { name: '星币八', number: 8, arcana: 'minor', suit: '星币', keywords: ['专注', '匠心', '精雕细琢'], image: '/tarot/pentacles-08.svg', upright: '正位代表在技能和工作上的精益求精，适合沉下心来打磨细节。', reversed: '逆位暗示你可能陷入了重复劳动而忘了看全局。' },
  { name: '星币九', number: 9, arcana: 'minor', suit: '星币', keywords: ['丰裕', '独立', '自给自足'], image: '/tarot/pentacles-09.svg', upright: '正位象征物质和精神的双重富足，你已经建立起了属于自己的安全堡垒。', reversed: '逆位提醒你别太孤立，成功也需要与他人分享才完整。' },
  { name: '星币十', number: 10, arcana: 'minor', suit: '星币', keywords: ['传承', '家族', '长期财富'], image: '/tarot/pentacles-10.svg', upright: '正位代表物质层面的长期积累和家族/团队的整体繁荣。', reversed: '逆位暗示可能存在财务纠纷或遗产/资源分配的问题。' },
  { name: '星币侍从', number: 'page', arcana: 'minor', suit: '星币', keywords: ['学习', '踏实', '新技能'], image: '/tarot/pentacles-page.svg', upright: '正位代表一个脚踏实地的学习机会，虽然进度慢但方向正确。', reversed: '逆位提醒你别纸上谈兵，实际动手才能真正掌握技能。' },
  { name: '星币骑士', number: 'knight', arcana: 'minor', suit: '星币', keywords: ['勤勉', '可靠', '稳步推进'], image: '/tarot/pentacles-knight.svg', upright: '正位象征稳扎稳打的推进节奏，虽然不快但每一步都扎实可靠。', reversed: '逆位提醒你别因为追求稳妥而变得保守僵化。' },
  { name: '星币王后', number: 'queen', arcana: 'minor', suit: '星币', keywords: ['务实', '滋养', '资源管理'], image: '/tarot/pentacles-queen.svg', upright: '正位代表优秀的资源管理能力和务实的生活智慧。', reversed: '逆位暗示你可能过度关注物质层面而忽略了精神需求。' },
  { name: '星币国王', number: 'king', arcana: 'minor', suit: '星币', keywords: ['富足', '经验', '可信赖'], image: '/tarot/pentacles-king.svg', upright: '正位象征通过多年积累获得的物质成功和社会地位，值得信赖。', reversed: '逆位提醒你财富不是人生的全部，别让物质追求蒙蔽了初心。' }
];
