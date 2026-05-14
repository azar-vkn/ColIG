/**
 * Mock AI generation functions for demo purposes.
 * These return realistic sample outputs when no OpenAI API key is configured.
 * In production, these would call the actual API routes.
 */

import type { GenerationInput } from '@/lib/types';

const MOCK_HOOKS: Record<string, string[]> = {
  default: [
    "Nobody talks about this…",
    "You're wasting your 20s if you don't know this",
    "Read this before starting a business…",
    "I wish someone told me this 5 years ago",
    "Stop scrolling. This will change your life.",
    "The harsh truth nobody wants to hear…",
    "Delete this app if you can't handle the truth",
    "99% of people ignore this. Don't be one of them.",
    "This one habit separates winners from losers",
    "If you're broke, read this twice.",
  ],
  motivation: [
    "Your comfort zone is killing your potential…",
    "Discipline isn't punishment. It's self-love.",
    "Stop waiting for motivation. Start moving.",
    "The pain of regret is worse than the pain of discipline",
    "You don't need more time. You need more focus.",
    "Lions don't lose sleep over the opinions of sheep",
    "Your future self is watching you right now",
    "Average is a choice. Choose differently.",
    "They laughed at your dreams. They won't laugh at your results.",
    "Burn the plan B. Go all in.",
  ],
  business: [
    "Your 9-5 is someone else's dream. Build your own.",
    "Revenue is vanity. Profit is sanity.",
    "The best marketing doesn't feel like marketing",
    "Stop selling products. Start selling transformations.",
    "A confused buyer never buys. Simplify your offer.",
    "Your network is your net worth. Protect it.",
    "Broke people watch TV. Rich people read books.",
    "Scale or fail. There is no in-between.",
    "Your first customer is the hardest. Your 1000th is inevitable.",
    "Business isn't about the idea. It's about execution.",
  ],
  christianity: [
    "God's timing is not your timing. Trust the process.",
    "Before you plan your day, let God plan your life.",
    "Pray until something happens. Then pray more.",
    "You are not defined by your past. You are refined by His grace.",
    "When God closes a door, He opens a kingdom.",
    "Faith over fear. Always.",
    "The enemy wouldn't fight you if you weren't a threat.",
    "Broken crayons still color. God still uses broken people.",
    "Don't tell God how big your storm is. Tell the storm how big your God is.",
    "His grace is sufficient. Even when you aren't.",
  ],
  study: [
    "Stop studying harder. Start studying smarter.",
    "Your brain isn't full. Your methods are broken.",
    "Toppers don't have more time. They have better systems.",
    "Active recall beats re-reading. Every. Single. Time.",
    "The Pomodoro technique changed my grades forever.",
    "Note-taking is useless if you never review them",
    "Study like your future depends on it. Because it does.",
    "Consistency beats cramming. Start 30 days before, not 3.",
    "The library is where dreams become degrees.",
    "If you're not confused, you're not learning.",
  ],
  fitness: [
    "Your body keeps a perfect score. What's yours?",
    "The gym doesn't get easier. You get stronger.",
    "Abs are made in the kitchen, not the gym.",
    "Rest days aren't lazy days. They're growth days.",
    "You don't have to be extreme. Just be consistent.",
    "Train like a beast. Look like a beauty.",
    "Pain is temporary. Results are forever.",
    "The hardest rep is the one you almost skipped.",
    "Your body can handle almost anything. It's your mind you have to convince.",
    "Sweat today. Shine tomorrow.",
  ],
  finance: [
    "Your savings account won't make you rich. Your assets will.",
    "Rich people buy time. Poor people sell it.",
    "If you can't explain your investment, don't make it.",
    "Financial freedom isn't about making more. It's about needing less.",
    "Compound interest is the 8th wonder of the world.",
    "Budget like you're broke. Invest like you're rich.",
    "Your latte isn't making you broke. Your lack of income streams is.",
    "Debt is a dream killer. Kill it first.",
    "Money follows value. Create more value.",
    "The best time to invest was yesterday. The next best time is now.",
  ],
};

const MOCK_CAPTIONS = {
  short: [
    "Less talking. More doing. 🔥\n\nDouble tap if you agree.",
    "Built different. Wired different. 💎\n\nSave this for your Monday motivation.",
    "Your energy introduces you before you speak.\n\n— Drop a 🙌 if this hits different.",
    "Silence is the best reply to a fool.\n\nTag someone who needs this today.",
    "Obsessed with growth. Allergic to average. ⚡",
  ],
  long: [
    "I used to think success was about talent.\n\nBut after 3 years of building, failing, and rebuilding — I realized something nobody teaches you:\n\nSuccess is about showing up on the days you don't feel like it.\n\nIt's about choosing discipline over dopamine.\nIt's about saying no to good so you can say yes to great.\n\nHere's what changed everything for me:\n\n→ I stopped chasing perfection\n→ I started chasing consistency\n→ I replaced motivation with systems\n→ I invested in mentors, not shortcuts\n\nThe result? My life is unrecognizable from 12 months ago.\n\nIf you're in your building season — keep going.\nThe harvest is coming. 🌱\n\n💬 What's one lesson you've learned this year? Drop it below.\n\n#growthmindset #entrepreneurlife #motivation",
    "3 years ago, I was broke, confused, and scrolling through Instagram watching everyone else win.\n\nToday? I run a business that gives me freedom, purpose, and income while I sleep.\n\nBut here's the truth nobody posts about:\n\n❌ I failed 4 times before my first sale\n❌ I had $27 in my account at my lowest\n❌ I wanted to quit every single week\n\nWhat kept me going?\n\nOne belief: \"If someone else figured it out, I can too.\"\n\nAnd that changed everything.\n\nSo if you're feeling stuck, lost, or behind — remember this:\n\nYour setback is a setup for the biggest comeback of your life. 🔥\n\n→ Save this post for the days you want to quit.\n→ Share it with someone who needs to hear it.\n\n#success #mindset #motivation #entrepreneurmindset #nevergiveup",
  ],
};

const MOCK_HASHTAGS: Record<string, string[]> = {
  motivation: ["#motivation", "#mindset", "#growthmindset", "#success", "#hustle", "#grind", "#nevergiveup", "#dailymotivation", "#motivationmonday", "#inspirational", "#motivationalquotes", "#successmindset", "#bossmindset", "#keepgoing", "#believe", "#dreams", "#goals", "#hardwork", "#dedication", "#focus", "#determination", "#strength", "#positivevibes", "#selfimprovement", "#levelup", "#ambition", "#unstoppable", "#champion", "#warrior", "#blessed"],
  business: ["#business", "#entrepreneur", "#startup", "#smallbusiness", "#hustle", "#businessowner", "#ceo", "#founder", "#businesstips", "#entrepreneurship", "#money", "#wealth", "#investing", "#success", "#leadership", "#branding", "#marketing", "#sales", "#growth", "#innovation", "#strategy", "#networking", "#businessgrowth", "#millionairemindset", "#passive income", "#onlinebusiness", "#digitalmarketing", "#ecommerce", "#sidehustle", "#financialfreedom"],
  study: ["#study", "#studygram", "#studymotivation", "#studytips", "#student", "#studyhard", "#studynotes", "#exam", "#learning", "#education", "#studyinspo", "#college", "#university", "#studentlife", "#studywithme", "#productive", "#productivity", "#notes", "#studying", "#academics", "#bookstagram", "#knowledge", "#studygrind", "#studytime", "#goalsetter", "#focusmode", "#studylife", "#learneveryday", "#growthjourney", "#smartstudy"],
  default: ["#instagram", "#viral", "#trending", "#explore", "#fyp", "#instagood", "#instadaily", "#content", "#creator", "#influencer", "#socialmedia", "#growth", "#engagement", "#followers", "#like4like", "#follow4follow", "#instafamous", "#contentcreator", "#digitalcreator", "#instagramgrowth", "#reels", "#explorepage", "#viralcontent", "#trendingpost", "#growthhacking", "#socialmediamarketing", "#brandbuilding", "#personalbranding", "#contentmarketing", "#onlinepresence"],
  fitness: ["#fitness", "#gym", "#workout", "#fitnessmotivation", "#fit", "#bodybuilding", "#training", "#health", "#muscle", "#fitfam", "#lifestyle", "#gymlife", "#healthy", "#exercise", "#motivation", "#gains", "#strength", "#cardio", "#nutrition", "#fitnessjourney", "#personaltrainer", "#crossfit", "#weightloss", "#abs", "#legday", "#gymmotivation", "#fitlife", "#healthylifestyle", "#physique", "#fitspo"],
  christianity: ["#faith", "#god", "#jesus", "#christian", "#bible", "#prayer", "#blessed", "#worship", "#church", "#grace", "#gospel", "#holyspirit", "#godisgood", "#scripture", "#jesuschrist", "#christianity", "#pray", "#hope", "#love", "#bibleverse", "#amen", "#godislove", "#faithoverfear", "#trustgod", "#godisgreat", "#spiritualgrowth", "#dailydevotional", "#christianliving", "#praiseandworship", "#kingdom"],
  finance: ["#finance", "#money", "#investing", "#wealth", "#stocks", "#financialfreedom", "#personalfinance", "#investment", "#cryptocurrency", "#trading", "#budgeting", "#savings", "#passiveincome", "#financialliteracy", "#debtfree", "#millionaire", "#realestate", "#forex", "#stockmarket", "#wealthbuilding", "#moneymanagement", "#richlife", "#moneymatters", "#financialgoals", "#investing101", "#retirementearly", "#compoundinterest", "#dividends", "#portfolio", "#buildwealth"],
};

const MOCK_CAROUSEL = [
  {
    slideNumber: 1,
    type: "hook" as const,
    content: "5 Habits That Will Make You Unstoppable in 2025",
    notes: "Use bold typography. Dark background with gradient text. Add a small subtitle: 'Swipe to change your life →'",
  },
  {
    slideNumber: 2,
    type: "value" as const,
    content: "Habit #1: Wake Up Before the World\n\nThe first hour of your day determines the other 23. Use it wisely.",
    notes: "Icon: ⏰ | Clean layout with large number and bold headline",
  },
  {
    slideNumber: 3,
    type: "value" as const,
    content: "Habit #2: Read 10 Pages Daily\n\nThat's 3,650 pages a year. More than most people read in a decade.",
    notes: "Icon: 📚 | Add a comparison stat for impact",
  },
  {
    slideNumber: 4,
    type: "value" as const,
    content: "Habit #3: Move Your Body Every Day\n\nExercise isn't just for your body. It's medicine for your mind.",
    notes: "Icon: 💪 | Consider adding a relevant quote",
  },
  {
    slideNumber: 5,
    type: "value" as const,
    content: "Habit #4: Track Every Rupee\n\nWhat gets measured gets managed. Your money is no exception.",
    notes: "Icon: 💰 | Keep it practical and actionable",
  },
  {
    slideNumber: 6,
    type: "value" as const,
    content: "Habit #5: Protect Your Peace\n\nSay no to drama. Yes to growth. Your energy is your currency.",
    notes: "Icon: 🧘 | Emotional closer before the CTA",
  },
  {
    slideNumber: 7,
    type: "cta" as const,
    content: "Which habit are you starting today?\n\n💬 Comment below\n🔖 Save for daily reminder\n📤 Share with someone who needs this",
    notes: "CTA slide — engagement hooks. Add your handle and a follow prompt.",
  },
];

const MOCK_REWRITES = [
  "🔥 REWRITTEN (More Viral):\n\nStop. Read this.\n\nYour potential isn't something you're born with — it's something you build, brick by brick, rep by rep, failure by failure.\n\nThe people who win aren't smarter. They're just more stubborn about their dreams.\n\n→ Save this for your weak days.\n→ Share this with your accountability partner.\n\n#mindset #growth #unstoppable",
  "💎 REWRITTEN (More Emotional):\n\nThere's a version of you that exists only in your imagination right now.\n\nThe confident one. The successful one. The one who didn't give up.\n\nThat version is waiting for you to stop making excuses and start making moves.\n\nEvery time you choose comfort over growth, you push that version further away.\n\nToday — choose differently.\n\n#transformation #believe #motivation",
  "⚡ REWRITTEN (Better Engagement):\n\nHot take: 95% of people will stay average.\n\nNot because they lack talent.\nNot because they lack time.\nBut because they lack the courage to be uncomfortable.\n\nGrowth lives on the other side of fear.\n\nType \"ALL IN\" if you're choosing the 5% today. 🔥\n\n→ Follow for daily fire\n→ Save this post\n→ Tag a friend who needs this\n\n#motivation #success #mindset",
];

/* ===== Public API Functions ===== */

export async function generateHooks(input: GenerationInput): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

  const niche = input.niche || "default";
  const hooks = MOCK_HOOKS[niche] || MOCK_HOOKS.default;

  // Shuffle and return
  return [...hooks].sort(() => Math.random() - 0.5);
}

export async function generateCaptions(input: GenerationInput): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));

  const type = input.captionType || "short";
  const captions = type === "short" ? MOCK_CAPTIONS.short : MOCK_CAPTIONS.long;
  return [...captions].sort(() => Math.random() - 0.5);
}

export async function generateCarousel(input: GenerationInput): Promise<typeof MOCK_CAROUSEL> {
  await new Promise((resolve) => setTimeout(resolve, 2500 + Math.random() * 1000));

  // Return a customized version based on topic
  const carousel = JSON.parse(JSON.stringify(MOCK_CAROUSEL));
  if (input.topic) {
    carousel[0].content = carousel[0].content.replace(
      "5 Habits That Will Make You Unstoppable in 2025",
      input.topic
    );
  }
  return carousel;
}

export async function generateHashtags(input: GenerationInput): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));

  const niche = input.niche || "default";
  const hashtags = MOCK_HASHTAGS[niche] || MOCK_HASHTAGS.default;
  return [...hashtags].sort(() => Math.random() - 0.5);
}

export async function rewriteContent(input: GenerationInput): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));

  return [...MOCK_REWRITES].sort(() => Math.random() - 0.5);
}
