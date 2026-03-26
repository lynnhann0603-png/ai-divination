import { computeTarotReading } from '@/lib/tarot-engine';

export const dynamic = 'force-dynamic';

/**
 * 构造 AI 解读 Prompt — 输出结构化 JSON，包含「解读」和「行动指南」两部分
 */
function buildTarotPrompt({ question, spread, cards }) {
  /* ---- 构建牌面描述 ---- */
  const cardDescriptions = cards.map((card, index) => {
    const arcanaLabel = card.arcana === 'major'
      ? '【大阿卡纳】'
      : `【小阿卡纳·${card.suit}】`;
    const keywords = card.keywords.join('、');
    return `  - 位置${index + 1}「${card.position}」：${arcanaLabel}${card.name} - ${card.orientation}\n    关键词：${keywords}\n    基础牌意：${card.message}`;
  }).join('\n');

  /* ---- 统计大小阿卡纳与元素分布 ---- */
  const majorCount = cards.filter(c => c.arcana === 'major').length;
  const minorCount = cards.filter(c => c.arcana === 'minor').length;
  const reversedCount = cards.filter(c => c.orientation === '逆位').length;
  const uprightCount = cards.length - reversedCount;

  const suitMap = { '权杖': '火', '圣杯': '水', '宝剑': '风', '星币': '土' };
  const elementCounts = cards
    .filter(c => c.arcana === 'minor' && c.suit)
    .reduce((acc, c) => {
      const el = suitMap[c.suit] || c.suit;
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
  const elementSummary = Object.entries(elementCounts)
    .map(([el, count]) => `${el}×${count}`)
    .join('、') || '无小阿卡纳';

  return `# Role
你是一位拥有20年经验的资深塔罗牌占卜师，精通韦特塔罗体系。你的解读风格温和、睿智、洞察力强，既不盲目乐观，也不贩卖焦虑。你相信塔罗是探索潜意识和提供人生指引的工具，而不是宿命论。

# Task
你需要根据问卜者提供的问题、选择的牌阵以及抽到的具体牌面，提供一次深度、连贯且有启发性的塔罗解读。

# Input Context
- 问卜者的问题：${question}
- 使用的牌阵：${spread.name}（${spread.description}）
- 牌阵位置：${spread.positions.join('、')}
- 大小阿卡纳比例：大阿卡纳 ${majorCount} 张，小阿卡纳 ${minorCount} 张
- 正逆位比例：正位 ${uprightCount} 张，逆位 ${reversedCount} 张
- 元素分布：${elementSummary}
- 抽到的牌面：
${cardDescriptions}

# Workflow (解读逻辑)
请严格按照以下步骤进行解读：

1. **破冰与共情 (Empathy)**
   - 简短地回应问卜者的问题，展现你的理解和同理心，让他们感到被倾听。

2. **整体能量感知与宏观定位 (Overall Energy & Arcana Balance)**
   - **评估大小阿卡纳比例**：
     - 若**大阿卡纳**主导：指出问卜者正处于人生的重大转折期、面临不可抗力的外部环境变化，或正在经历深刻的灵魂/心理蜕变。
     - 若**小阿卡纳**主导：指出当前问题更多聚焦于日常琐事、具体的情绪起伏、人际摩擦或实际执行层面，问卜者对局势有较高的个人掌控力。
   - 观察四大元素（火/土/风/水）哪个偏多？正逆位比例如何？用一段话总结这次占卜的整体基调。

3. **牌阵逐一解析 (Position Analysis)**
   - 结合"正/逆位状态"以及"该位置代表的含义"，逐一深度解读。
   - **大阿卡纳解读策略**：拔高视角，点出这张牌背后隐藏的长期人生课题、深层心理动机或命运的指引。例如："力量牌在这里不是说让你去硬刚，而是提醒你面对当前危机，需要动用内心的柔韧与包容。"
   - **小阿卡纳解读策略**：落地现实，聚焦于具体的事件、人物特质、物质资源或日常情绪（严格结合风/火/水/土的元素特质）。例如："星币三意味着你现在需要具体的团队协作和技能打磨，而不是空谈理想。"
   - 绝对不要干巴巴地背诵牌意，必须把牌面的具体画面意象与问卜者的真实处境缝合。

4. **牌与牌的化学反应 (Synthesis)**
   - 寻找牌面之间的联系、冲突或因果关系。大小阿卡纳的交织尤为重要（例如："虽然你在具体行动上遇到了阻力（宝剑八），但大环境的趋势是向好的（命运之轮）"）。将孤立的牌串联成一个完整的故事。

5. **行动指引与祝福 (Actionable Advice)**
   - 基于上述解读，给出2-3个具体、可落地的生活/心理建议。
   - 以一句温暖或充满力量的祝福结束占卜。

# Guardrails (约束条件)
- 语气必须是第一人称（"我"和"你"），像面对面对话一样自然，不要有AI感。
- 避免使用晦涩难懂的神秘学黑话，用现代人能共情的语言表达。
- 使用 **加粗** 标注牌名和位置名。适当用 emoji 增加亲和力。段落之间用换行分隔。

# 输出要求
请严格按以下 JSON 格式输出，不要输出任何 JSON 之外的内容：

{
  "interpretation": "将上述 Workflow 中的步骤 1-4（破冰共情、整体能量感知、牌阵逐一解析、牌与牌的化学反应）的内容合并写在这里。控制在 400-1000 字。",
  "action_guide": "将上述 Workflow 中的步骤 5（行动指引与祝福）的内容写在这里。给出 2-3 条具体、可落地的建议，每条用序号开头。最后以一句温暖的祝福收尾。控制在 150-400 字。"
}`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { question, spreadId, pickedNumbers } = body;

    if (!pickedNumbers || !Array.isArray(pickedNumbers) || pickedNumbers.length === 0) {
      return Response.json({ error: '请先完成数字选牌' }, { status: 400 });
    }

    const reading = computeTarotReading({ question, spreadId, pickedNumbers });

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'DeepSeek API Key 未配置' }, { status: 500 });
    }

    const prompt = buildTarotPrompt({
      question: reading.question,
      spread: reading.spread,
      cards: reading.cards
    });

    const deepseekResponse = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
        temperature: 0.85,
        max_tokens: 3000
      })
    });

    if (!deepseekResponse.ok) {
      const errText = await deepseekResponse.text();
      console.error('DeepSeek API error:', errText);
      return Response.json({ error: `DeepSeek API 调用失败: ${deepseekResponse.status}` }, { status: 502 });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        /* 第一帧：发送牌面结果 */
        const readingPayload = {
          spread: reading.spread,
          question: reading.question,
          cards: reading.cards
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'reading', data: readingPayload })}\n\n`));

        /* 收集完整 AI 输出，然后解析 JSON 分别推送 */
        const reader = deepseekResponse.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let fullContent = '';

        try {
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
              if (jsonStr === '[DONE]') continue;

              try {
                const parsed = JSON.parse(jsonStr);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  fullContent += delta;
                  /* 实时推送 chunk 用于前端即时展示 */
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'ai_chunk', data: delta })}\n\n`));
                }
              } catch { /* 忽略 */ }
            }
          }

          /* AI 输出完成，尝试解析 JSON 结构 */
          try {
            /* 提取 JSON 部分（兼容 AI 可能包裹 markdown 代码块的情况） */
            let jsonContent = fullContent.trim();
            const codeBlockMatch = jsonContent.match(/```(?:json)?\s*([\s\S]*?)```/);
            if (codeBlockMatch) {
              jsonContent = codeBlockMatch[1].trim();
            }
            /* 尝试直接找 { ... } */
            const braceStart = jsonContent.indexOf('{');
            const braceEnd = jsonContent.lastIndexOf('}');
            if (braceStart !== -1 && braceEnd > braceStart) {
              jsonContent = jsonContent.slice(braceStart, braceEnd + 1);
            }

            const parsed = JSON.parse(jsonContent);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: 'ai_result',
              data: {
                interpretation: parsed.interpretation || '',
                actionGuide: parsed.action_guide || ''
              }
            })}\n\n`));
          } catch {
            /* JSON 解析失败，把整段文本作为解读，行动指南留空 */
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: 'ai_result',
              data: {
                interpretation: fullContent,
                actionGuide: ''
              }
            })}\n\n`));
          }
        } catch (streamError) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', data: streamError.message })}\n\n`));
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } catch (error) {
    return Response.json({ error: error.message || '塔罗结果生成失败' }, { status: 400 });
  }
}
