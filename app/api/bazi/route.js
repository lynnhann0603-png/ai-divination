import { computeBaziProfile } from '@/lib/bazi-engine';

export const dynamic = 'force-dynamic';

/**
 * 构造八字命盘 AI 解读 System Prompt
 */
function buildBaziPrompt(promptData) {
  const p = promptData;
  return `你是一位隐于市的传统文化研究者，精通子平八字、紫微斗数及周易数法等传统文化。你能洞察五行生克的物性规律，也能看透因缘际会的底层逻辑。你说话温和、有分量、不故弄玄虚，像一个值得信赖的老友在跟对方聊天。

# 客户档案
- 性别：${p.gender}
- 出生地：${p.birthPlace}
- 农历生辰：${p.lunarText}（阳历 ${p.solarText}）
- 出生时辰：${p.birthTime}（${p.shichen}）${p.useTrueSolarTime ? `\n- 真太阳时修正：北京时间 ${p.birthTime} → 真太阳时 ${p.effectiveBirthTime}（${p.trueSolarTimeDetail}）` : ''}
- 当前日期：${p.currentDate}（请注意：现在是${p.currentYear}年，不是其他年份）
- 当前关注方向：${p.focus}

# 排盘数据（由系统精确计算，请基于此数据推演，不可自行修改排盘结果）

## 四柱
- 年柱：${p.pillars.year}
- 月柱：${p.pillars.month}
- 日柱：${p.pillars.day}（日主 ${p.dayStem}）
- 时柱：${p.pillars.time}

## 五行分布
${p.elementCountText}
（共 ${p.totalElementCount} 字）

## 格局判断
- 身强/身弱：${p.strengthLabel}
- 日主五行：${p.dayElement}
- 用神：${p.useGod}
- 忌神：${p.avoidGod}
- 旺相：${p.dominant}
- 偏弱：${p.weakest}

## 过去5年流年干支与十神（用于推断 pastYears 板块）
${p.pastYearGanzhiText}

## 当前流年
${p.currentYearText}

## 流月干支与十神（${p.currentYear}年，共12个月）
${p.monthlyGanzhiList}

# 任务
请严格基于上述排盘数据，使用第一人称（你和我）的方式，为这位用户完成以下 12 个板块的命盘解读。语气像面对面聊天，自然亲切，不要有 AI 感。结合用户关注的「${p.focus}」方向适当侧重。

请严格按以下 JSON 格式输出，不要输出任何 JSON 之外的内容：

{
  "patternAnalysis": "格局气象分析。先客观列出格局气象、身强身弱的判断依据，再分析关键用神与忌神的作用关系。必须根据命盘推演，不作主观臆测。120-220字。",

  "personality": "性格特征与外貌气质。基于日主五行、身强身弱、时辰特征，推断用户的性格特点、行为模式和外貌气质。要具体、有画面感。120-220字。",

  "pastYears": [
    { "year": "从「过去5年流年干支」数据中选取第1个关键年份（必须是${p.currentYear - 5}~${p.currentYear - 1}之间的数字）", "text": "基于该年流年干支与命盘日主的十神生克关系，推测当时发生的具体变动（如事业转折、人际重组、居住变化等）。必须引用该年的流年干支和十神来分析，不可凭空编造。90-160字。" },
    { "year": "从「过去5年流年干支」数据中选取第2个关键年份（必须是${p.currentYear - 5}~${p.currentYear - 1}之间的数字）", "text": "同上要求，基于该年流年干支与十神进行分析。90-160字。" }
  ],

  "metaphor": "兵器或乐器比喻。用一个具体的物品（兵器、乐器或器物皆可）来比喻这张命盘，比喻要贴切、有哲理，能让人'哦原来我是这样的'的感觉。120-180字。",

  "talent": "才华与转化。指出用户最出色的才华是什么，适合在哪些具体领域发挥，以及如何将天赋转化为实际价值。120-180字。",

  "career": "事业形态。建议适合的事业路径和发展模式，要具体到行业方向和发展策略，不要泛泛而谈。120-180字。",

  "sideBusiness": "副业方向。结合五行喜用神，提供具体可操作的副业建议，要有新意，不落俗套。100-160字。",

  "partner": "伴侣轮廓。描述最适合的伴侣的性格特征、行为模式和相处方式。要有画面感，让人能'对号入座'。120-180字。",

  "fateScene": "宿命感片段。描绘一个有宿命感的相遇场景，要有具体的时间、地点、氛围细节，像一段电影画面。100-160字。",

  "selfHarm": "自我折损隐患。指出需要警惕的潜意识习惯或思维模式，要切中要害、有建设性，不是泛泛的心灵鸡汤。100-160字。",

  "beneficialName": "补益字号。提供一个有补益作用的字号建议（可用于笔名、网名或个人品牌名），说明取字的五行用意和美好寓意。60-120字。",

  "monthlyFortune": [
    {
      "month": "正月",
      "ganzhi": "该月流月干支",
      "shiShen": "该月天干对日主的十神",
      "title": "用4-6个字概括该月主题",
      "content": "该月详细运势分析，需涵盖${p.focus}方向的重点分析，以及整体生活节奏建议。说清楚这个月适合做什么、不适合做什么、该如何化解或面对。80-140字。",
      "level": "strong/steady/careful 三选一，strong=适合发力推进，steady=稳步布局，careful=回收调整"
    },
    "... 共12个月，从正月到腊月"
  ]
}

# 约束条件
1. 必须严格基于排盘数据推演，不可编造四柱或五行数据。
2. 当前年份是 ${p.currentYear} 年，当前日期是 ${p.currentDate}。pastYears 中的年份必须是 ${p.currentYear - 5}~${p.currentYear - 1} 之间的年份，必须基于上方提供的「过去5年流年干支」数据进行分析。
3. 语气用第一人称「你」和「我」，像面对面聊天。不要说"命主"、"此命"等生硬用语。
4. 流月运势必须根据给出的每月干支和十神关系逐月分析，不可笼统带过。每个月的 level 判断要结合十神性质、用神忌神关系综合评估。
5. 所有文案要有具体画面感和情感温度，不要干巴巴地背诵八字理论。
6. 严格输出 JSON 格式，不要在 JSON 前后添加任何额外文字或 markdown 代码块标记。`;
}

/**
 * 尝试从部分 JSON 字符串中提取已完成的板块
 */
function extractCompletedSections(partialJson) {
  const sections = {};
  const sectionKeys = [
    'patternAnalysis', 'personality', 'metaphor', 'talent',
    'career', 'sideBusiness', 'partner', 'fateScene',
    'selfHarm', 'beneficialName'
  ];

  for (const key of sectionKeys) {
    // 匹配 "key": "value" 格式（value 已闭合）
    const regex = new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`);
    const match = partialJson.match(regex);
    if (match) {
      sections[key] = match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
  }

  // 尝试提取 pastYears 数组
  const pastYearsMatch = partialJson.match(/"pastYears"\s*:\s*(\[[\s\S]*?\])\s*(?:,|\})/);
  if (pastYearsMatch) {
    try {
      sections.pastYears = JSON.parse(pastYearsMatch[1]);
    } catch { /* 忽略 */ }
  }

  // 尝试提取 monthlyFortune 数组
  const monthlyMatch = partialJson.match(/"monthlyFortune"\s*:\s*(\[[\s\S]*?\])\s*(?:,|\})/);
  if (monthlyMatch) {
    try {
      sections.monthlyFortune = JSON.parse(monthlyMatch[1]);
    } catch { /* 忽略 */ }
  }

  return sections;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const profile = computeBaziProfile(body);

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      // 无 API Key 时直接返回本地计算结果（作为 fallback）
      return Response.json({ profile, mode: 'local' });
    }

    const prompt = buildBaziPrompt(profile.promptData);

    // 发起 DeepSeek API 请求 — 优先速度（deepseek-chat）
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
        temperature: 0.7,
        max_tokens: 2200
      })
    });

    if (!deepseekResponse.ok) {
      const errText = await deepseekResponse.text();
      console.error('DeepSeek API error:', errText);
      // API 失败时 fallback 到本地计算结果
      return Response.json({ profile, mode: 'local', apiError: `DeepSeek API 调用失败: ${deepseekResponse.status}` });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        /* 第一帧：发送排盘基础数据（前端立即展示四柱、五行等） */
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'profile', data: profile })}\n\n`));

        /* 收集完整 AI 输出 */
        const reader = deepseekResponse.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let fullContent = '';
        let fullReasoning = '';
        let lastExtractedKeys = new Set();

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
                const delta = parsed.choices?.[0]?.delta;

                // 最终输出内容
                if (delta?.content) {
                  fullContent += delta.content;

                  // 尝试逐板块解析并推送
                  const extracted = extractCompletedSections(fullContent);
                  const newKeys = Object.keys(extracted).filter(k => !lastExtractedKeys.has(k));

                  if (newKeys.length > 0) {
                    const partial = {};
                    for (const k of newKeys) {
                      partial[k] = extracted[k];
                      lastExtractedKeys.add(k);
                    }
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                      type: 'ai_section',
                      data: partial,
                      completedCount: lastExtractedKeys.size
                    })}\n\n`));
                  }

                  /* 实时推送 chunk 用于前端展示进度 */
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'ai_chunk', data: delta.content })}\n\n`));
                }
              } catch { /* 忽略 */ }
            }
          }

          /* AI 输出完成，尝试解析完整 JSON */
          try {
            let jsonContent = fullContent.trim();
            const codeBlockMatch = jsonContent.match(/```(?:json)?\s*([\s\S]*?)```/);
            if (codeBlockMatch) {
              jsonContent = codeBlockMatch[1].trim();
            }
            const braceStart = jsonContent.indexOf('{');
            const braceEnd = jsonContent.lastIndexOf('}');
            if (braceStart !== -1 && braceEnd > braceStart) {
              jsonContent = jsonContent.slice(braceStart, braceEnd + 1);
            }

            const parsed = JSON.parse(jsonContent);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'ai_result', data: parsed })}\n\n`));
          } catch {
            /* JSON 解析失败，告知前端使用 fallback */
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'ai_fallback', data: fullContent })}\n\n`));
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
    return Response.json({ error: error.message || '八字结果生成失败' }, { status: 400 });
  }
}
