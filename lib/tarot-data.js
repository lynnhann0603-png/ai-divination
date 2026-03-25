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
  { name: '愚者', number: 0, keywords: ['出发', '轻盈', '勇气'], image: '/tarot/00-fool.svg', upright: '正位代表新的旅程正在打开，你要允许自己先迈出第一步，再在路上修正方向。', reversed: '逆位提醒你别把冲动当成自由，先确认底层准备是否充分。' },
  { name: '魔术师', number: 1, keywords: ['掌控', '表达', '启动'], image: '/tarot/01-magician.svg', upright: '正位强调资源已经在你手里，关键是把分散的想法整合为清晰行动。', reversed: '逆位提醒你减少空转和表面用力，把注意力拉回真正能推进的动作。' },
  { name: '女祭司', number: 2, keywords: ['直觉', '观察', '保留'], image: '/tarot/02-priestess.svg', upright: '正位说明答案并不在外界喧闹中，而在你尚未说出口的感受里。', reversed: '逆位意味着你可能忽略了重要信号，建议慢下来重新审视。' },
  { name: '皇后', number: 3, keywords: ['丰盛', '滋养', '吸引'], image: '/tarot/03-empress.svg', upright: '正位代表关系、资源与创造力逐步丰盈，适合经营长期价值。', reversed: '逆位提醒你别只顾输出，要先照顾自己的边界与能量。' },
  { name: '皇帝', number: 4, keywords: ['秩序', '决断', '边界'], image: '/tarot/04-emperor.svg', upright: '正位提示局面需要你建立规则、给出明确立场。', reversed: '逆位表示控制欲或僵化结构正在造成压力，需要更灵活的处理方式。' },
  { name: '教皇', number: 5, keywords: ['规则', '学习', '传统'], image: '/tarot/05-hierophant.svg', upright: '正位适合遵循成熟方法、向经验体系借力。', reversed: '逆位说明你可能需要跳出旧框架，找到更适合自己的路径。' },
  { name: '恋人', number: 6, keywords: ['选择', '联结', '价值一致'], image: '/tarot/06-lovers.svg', upright: '正位意味着重要关系或选择正在逼近核心价值判断。', reversed: '逆位提醒你看清关系中的不对齐，不要用短暂情绪代替长期判断。' },
  { name: '战车', number: 7, keywords: ['推进', '专注', '胜负心'], image: '/tarot/07-chariot.svg', upright: '正位象征局势可以推进，关键在于集中意志、保持方向统一。', reversed: '逆位提醒你不要一边踩油门一边怀疑自己，否则容易失控。' },
  { name: '力量', number: 8, keywords: ['稳定', '柔韧', '驯服情绪'], image: '/tarot/08-strength.svg', upright: '正位代表真正的优势来自稳定情绪和持续耐心。', reversed: '逆位意味着内耗变多，先把焦躁感安顿下来再做决定。' },
  { name: '隐者', number: 9, keywords: ['沉淀', '复盘', '独处'], image: '/tarot/09-hermit.svg', upright: '正位适合暂停外界噪音，回到自己的判断体系。', reversed: '逆位提醒你不要过度封闭，必要时向可信的人求证。' },
  { name: '命运之轮', number: 10, keywords: ['转机', '节奏', '周期'], image: '/tarot/10-wheel.svg', upright: '正位说明外部节奏正在转动，你需要顺势而为、抓住窗口。', reversed: '逆位意味着时机尚未完全成熟，不必硬推。' },
  { name: '正义', number: 11, keywords: ['平衡', '因果', '清算'], image: '/tarot/11-justice.svg', upright: '正位要求你回到事实、责任与真实交换。', reversed: '逆位提示你可能对某些代价估计不足，需要更客观。' },
  { name: '倒吊人', number: 12, keywords: ['停顿', '换角度', '等待'], image: '/tarot/12-hanged.svg', upright: '正位表明当前并非白费力气，而是进入了必要的观察期。', reversed: '逆位提醒你别把拖延包装成等待，该动的时候还是要动。' },
  { name: '死神', number: 13, keywords: ['结束', '蜕变', '告别'], image: '/tarot/13-death.svg', upright: '正位并非坏事，而是提醒旧阶段已经走到尾声，腾挪才能新生。', reversed: '逆位意味着你在抓着已经过期的结构不放，反而加重消耗。' },
  { name: '节制', number: 14, keywords: ['调和', '慢稳', '协同'], image: '/tarot/14-temperance.svg', upright: '正位适合循序渐进地整合资源，慢慢把事情调顺。', reversed: '逆位说明节奏失衡，先把优先级和能量分配重新校准。' },
  { name: '恶魔', number: 15, keywords: ['执念', '诱惑', '束缚'], image: '/tarot/15-devil.svg', upright: '正位提醒你看清自己被什么困住：欲望、恐惧，还是习惯。', reversed: '逆位说明你已经开始挣脱旧束缚，但仍需防止反复。' },
  { name: '高塔', number: 16, keywords: ['震荡', '真相', '重构'], image: '/tarot/16-tower.svg', upright: '正位表示伪稳定正在被打破，短痛之后才有真正重建。', reversed: '逆位暗示你已察觉风险，若尽快调整可减少冲击。' },
  { name: '星星', number: 17, keywords: ['疗愈', '希望', '长期愿景'], image: '/tarot/17-star.svg', upright: '正位带来修复与希望，说明你值得继续对未来保留信心。', reversed: '逆位提醒你别因一时失望而否定长期方向。' },
  { name: '月亮', number: 18, keywords: ['不确定', '情绪波动', '潜意识'], image: '/tarot/18-moon.svg', upright: '正位说明信息并不完整，先辨别情绪投射与事实。', reversed: '逆位意味着迷雾正在散去，很多问题会逐渐看清。' },
  { name: '太阳', number: 19, keywords: ['清晰', '喜悦', '显化'], image: '/tarot/19-sun.svg', upright: '正位象征成果、确认与可见度提升，适合主动表达。', reversed: '逆位表示好消息仍在，但需要你降低预期、保持耐心。' },
  { name: '审判', number: 20, keywords: ['召唤', '复盘', '决定'], image: '/tarot/20-judgement.svg', upright: '正位提示你正在被推向真正重要的决定点。', reversed: '逆位说明你还在犹豫，先把过去未了结的问题理清。' },
  { name: '世界', number: 21, keywords: ['完成', '整合', '升级'], image: '/tarot/21-world.svg', upright: '正位代表一个阶段即将圆满收束，也预示下一轮升级。', reversed: '逆位表示临门一脚的整理工作还没做完，别急着跳下一步。' }
];
