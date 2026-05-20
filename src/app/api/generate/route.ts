import { NextResponse } from "next/server";

/**
 * POST /api/generate
 * Unified AI generation endpoint
 * Falls back to mock data when OPENAI_API_KEY is not set
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tool, input } = body;

    if (!tool || !input) {
      return NextResponse.json(
        { error: "Missing required fields: tool, input" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // If no API key, use mock generators
    if (!apiKey || apiKey === "your_openai_api_key") {
      const { generateHooks, generateCaptions, generateCarousel, generateHashtags, rewriteContent } = await import("@/lib/ai/mock-generators");

      let result;
      switch (tool) {
        case "hook":
          result = await generateHooks(input);
          break;
        case "caption":
          result = await generateCaptions(input);
          break;
        case "carousel":
          result = await generateCarousel(input);
          break;
        case "hashtag":
          result = await generateHashtags(input);
          break;
        case "rewrite":
          result = await rewriteContent(input);
          break;
        case "demo":
          // Return a structured demo result
          result = {
            hook: "Stop scrolling if you want to grow on Instagram 🛑",
            caption: "Most creators fail because they don't understand hooks. Here is the secret formula to 10x your views. \n\nSave this for later! 📌",
            cta: "Drop a 🔥 in the comments if you agree!",
            hashtags: "#instagramgrowth #contentcreator #socialmediatips",
            script: "Slide 1: Hook\nSlide 2: Value\nSlide 3: Value\nSlide 4: CTA",
          };
          break;
        default:
          return NextResponse.json({ error: "Invalid tool" }, { status: 400 });
      }

      return NextResponse.json({ result, mock: true });
    }

    // Real OpenAI integration (or compatible API like Groq/OpenRouter)
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ 
      apiKey,
      baseURL: process.env.OPENAI_BASE_URL || undefined, 
    });

    const TONE_RULES = `
CRITICAL TONE & STYLE GUIDELINES (MANDATORY):
1. Write like a modern creator/founder (calm confidence, authentic, conversational human tone).
2. DO NOT use hype words (e.g., "mind-blowing", "life-changing", "whopping", "insane", "crazy", "massive secret", "guaranteed", "game-changing", "skyrocket", "unleash", "ultimate").
3. NO excessive emojis (max 1-2 per post/caption).
4. NO ALL CAPS sentences.
5. NO multiple exclamation marks (!!).
6. Use short, punchy paragraphs (1-2 sentences max).
7. Create subtle curiosity and realistic storytelling with a clean sentence flow.
8. The output should resemble a modern Twitter/LinkedIn founder post or a genuine Instagram creator caption, NOT a fake guru or aggressive sales marketer.

POST-PROCESSING REQUIREMENT:
Before returning the final JSON, internally review and rewrite the content to remove any remaining AI-sounding phrases, simplify dramatic wording, and ensure it sounds 100% human and publish-ready. Return ONLY the final rewritten version in JSON format.
`;

    const systemPrompts: Record<string, string> = {
      hook: `You are an expert Instagram content strategist. Generate exactly 10 viral Instagram hooks for the given topic, niche, and tone. Each hook should be attention-grabbing but realistic. Return ONLY a JSON array of strings.\n\n${TONE_RULES}`,
      caption: `You are an expert Instagram caption writer. Generate 5 Instagram captions based on the given topic and style. Include relevant emojis (sparingly), line breaks, and CTA suggestions. Return ONLY a JSON array of strings.\n\n${TONE_RULES}`,
      carousel: `You are an expert Instagram carousel content creator. Generate a complete slide-by-slide carousel outline with 7 slides: 1 hook slide, 5 value slides, and 1 CTA slide. Return ONLY a JSON array of objects with fields: slideNumber, type (hook/value/cta), content, notes.\n\n${TONE_RULES}`,
      hashtag: `You are an Instagram growth expert. Generate 30 highly relevant hashtags for the given niche. Mix popular, medium, and niche-specific hashtags. Return ONLY a JSON array of strings (each starting with #).`,
      rewrite: `You are an expert Instagram copywriter. Take the given caption and rewrite it in 3 different styles: 1) Modern Founder, 2) Conversational Story, 3) Better Engagement. Each version should be significantly improved. Return ONLY a JSON array of 3 strings.\n\n${TONE_RULES}`,
      demo: `You are an expert Instagram content strategist. Create a complete viral post package based on the user's idea. 
Return ONLY a valid JSON object with EXACTLY these 5 string fields:
"hook" (a short, scroll-stopping first sentence),
"caption" (a compelling 2-3 paragraph caption),
"cta" (a strong call to action),
"hashtags" (10-15 relevant hashtags separated by spaces),
"script" (a short script outline for a reel or carousel, e.g. "Hook: ... Body: ... CTA: ...").\n\n${TONE_RULES}`
    };

    const userPrompt = tool === "rewrite"
      ? `Rewrite this Instagram caption:\n\n"${input.content}"`
      : tool === "demo"
      ? `Idea: ${input.topic}`
      : `Topic: ${input.topic || "General"}\nNiche: ${input.niche || "General"}\nTone: ${input.tone || "Bold"}\nTarget Audience: ${input.audience || "General Instagram users"}${input.captionType ? `\nCaption Type: ${input.captionType}` : ""}`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompts[tool] || systemPrompts.hook },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    let content = completion.choices[0]?.message?.content || "{}";

    // --- POST-PROCESSING REWRITE STEP ---
    try {
      const rewritePrompt = `
You are an expert editor. Below is an AI-generated draft in JSON format.
Your job is to rewrite it to sound authentic, modern, and written by a real human creator (like a Twitter founder or modern LinkedIn creator).

FIX REQUIREMENTS:
1. Reduce exaggeration by 90% (No "mind-blowing", "life-changing", "insane", "massive secret", "guaranteed").
2. Remove spammy formatting (limit emojis to 1-2, no ALL CAPS, no multiple exclamation marks).
3. Change tone to calm confidence, authentic founder, conversational human tone.
4. Improve structure (shorter paragraphs, clean flow, subtle curiosity).
5. Remove robotic sentence structures and repetitive phrasing.

IMPORTANT: Return ONLY the final rewritten content in the EXACT SAME JSON structure as the draft. Do not add any conversational text.

DRAFT TO REWRITE:
${content}
`;

      const rewriteCompletion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a JSON-only API that strictly returns rewritten content in the exact same JSON format as provided. Do not include markdown blocks if possible, just the JSON." },
          { role: "user", content: rewritePrompt },
        ],
        temperature: 0.5,
        max_tokens: 2000,
      });

      if (rewriteCompletion.choices[0]?.message?.content) {
        content = rewriteCompletion.choices[0].message.content;
      }
    } catch (rewriteError) {
      console.warn("Post-processing rewrite failed, falling back to original draft:", rewriteError);
    }
    // ------------------------------------

    // Try to parse JSON from the response
    const jsonMatch = content.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : tool === 'demo' ? JSON.parse(content) : [content];

    return NextResponse.json({ result, mock: false });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}
