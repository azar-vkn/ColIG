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
        default:
          return NextResponse.json({ error: "Invalid tool" }, { status: 400 });
      }

      return NextResponse.json({ result, mock: true });
    }

    // Real OpenAI integration
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey });

    const systemPrompts: Record<string, string> = {
      hook: `You are an expert Instagram content strategist. Generate exactly 10 viral Instagram hooks for the given topic, niche, and tone. Each hook should be attention-grabbing, scroll-stopping, and designed to maximize engagement. Return ONLY a JSON array of strings.`,
      caption: `You are an expert Instagram caption writer. Generate 5 Instagram captions based on the given topic and style. Include relevant emojis, line breaks, and CTA suggestions. Return ONLY a JSON array of strings.`,
      carousel: `You are an expert Instagram carousel content creator. Generate a complete slide-by-slide carousel outline with 7 slides: 1 hook slide, 5 value slides, and 1 CTA slide. Return ONLY a JSON array of objects with fields: slideNumber, type (hook/value/cta), content, notes.`,
      hashtag: `You are an Instagram growth expert. Generate 30 highly relevant hashtags for the given niche. Mix popular, medium, and niche-specific hashtags. Return ONLY a JSON array of strings (each starting with #).`,
      rewrite: `You are an expert Instagram copywriter. Take the given caption and rewrite it in 3 different styles: 1) More Viral, 2) More Emotional, 3) Better Engagement. Each version should be significantly improved. Return ONLY a JSON array of 3 strings.`,
    };

    const userPrompt = tool === "rewrite"
      ? `Rewrite this Instagram caption:\n\n"${input.content}"`
      : `Topic: ${input.topic || "General"}\nNiche: ${input.niche || "General"}\nTone: ${input.tone || "Bold"}\nTarget Audience: ${input.audience || "General Instagram users"}${input.captionType ? `\nCaption Type: ${input.captionType}` : ""}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompts[tool] || systemPrompts.hook },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content || "[]";
    // Try to parse JSON from the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : [content];

    return NextResponse.json({ result, mock: false });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}
