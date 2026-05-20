'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Zap, Target, Hash, RefreshCw, LayoutGrid,
  ArrowRight, Check, ChevronDown, Star, Copy, Loader2, Play
} from 'lucide-react';
import { Button } from '@/components/ui';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

/* ===== Animation Variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ===== Feature Data ===== */
const features = [
  { icon: Zap, title: 'Hook Generator', desc: 'Create scroll-stopping hooks that grab attention in the first 2 seconds.', color: 'from-yellow-500 to-orange-500' },
  { icon: Sparkles, title: 'Caption Generator', desc: 'Write compelling captions that drive engagement and shares.', color: 'from-purple-500 to-pink-500' },
  { icon: LayoutGrid, title: 'Carousel Generator', desc: 'Design slide-by-slide carousel outlines that educate and convert.', color: 'from-blue-500 to-cyan-500' },
  { icon: Hash, title: 'Hashtag Generator', desc: 'Find the perfect mix of trending and niche hashtags for reach.', color: 'from-green-500 to-emerald-500' },
  { icon: RefreshCw, title: 'Rewrite Better', desc: 'Transform weak captions into viral-worthy content instantly.', color: 'from-red-500 to-pink-500' },
  { icon: Target, title: 'Niche Targeting', desc: 'Content tailored for motivation, business, study, fitness & more.', color: 'from-indigo-500 to-purple-500' },
];

const testimonials = [
  { name: 'Priya K.', handle: '@priya.grows', text: "ColIG changed my content game. I went from 2K to 25K followers in 3 months using the hook generator daily.", avatar: '🧕', rating: 5 },
  { name: 'Marcus J.', handle: '@marcusmindset', text: "The carousel generator saves me 3 hours per week. The outlines are so well structured my engagement tripled.", avatar: '👨‍💼', rating: 5 },
  { name: 'Sarah Chen', handle: '@sarahstudies', text: "As a study page creator, finding the right hooks was tough. ColIG nails it every time. Absolute game changer.", avatar: '👩‍🎓', rating: 5 },
  { name: 'David M.', handle: '@david.faith', text: "Finally an AI tool that understands Christian content creation. The captions are authentic and inspiring.", avatar: '⛪', rating: 5 },
];

const pricingPlans = [
  {
    name: 'Free', price: '$0', period: '/forever',
    features: ['5 generations per day', 'All 5 AI tools', 'Copy to clipboard', 'Basic support'],
    cta: 'Get Started Free', popular: false,
  },
  {
    name: 'Pro', price: '$12', period: '/month',
    features: ['Unlimited generations', 'All 5 AI tools', 'Generation history', 'Priority support', 'Early access to new features', 'Custom tone presets'],
    cta: 'Start Pro Trial', popular: true,
  },
  {
    name: 'Team', price: '$29', period: '/month',
    features: ['Everything in Pro', '5 team members', 'Brand voice training', 'Content calendar (coming)', 'Dedicated account manager', 'API access'],
    cta: 'Contact Sales', popular: false,
  },
];

const faqs = [
  { q: 'What is ColIG?', a: 'ColIG is an AI-powered Instagram growth assistant that helps creators generate viral hooks, captions, carousel outlines, hashtags, and rewrite weak content — all in seconds.' },
  { q: 'Do I need an Instagram account to use ColIG?', a: 'No! ColIG generates text content that you can copy and use anywhere. No Instagram login or connection required.' },
  { q: 'How does the free plan work?', a: 'The free plan gives you 5 AI generations per day across all tools. No credit card required. Upgrade anytime for unlimited access.' },
  { q: 'What niches does ColIG support?', a: 'ColIG supports Motivation, Business, Study, Fitness, Christianity, Finance, Personal Branding, and Lifestyle niches with more coming soon.' },
  { q: 'Is my content unique?', a: 'Yes! Every generation is unique and created specifically for your inputs. No two outputs are the same.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. Cancel anytime with no questions asked. You will retain access until the end of your billing period.' },
];

/* ===== Output Card ===== */
function OutputCard({ title, content, className }: { title: string, content: string, className?: string }) {
  return (
    <div className={cn("glass-card p-6 relative group overflow-hidden text-left flex flex-col", className)}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-brand-400 font-bold text-xs uppercase tracking-widest">{title}</h4>
        <button 
           onClick={() => {
             navigator.clipboard.writeText(content);
             toast.success('Copied to clipboard');
           }}
           className="text-zinc-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      <div className="text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed flex-1 overflow-y-auto">
        {content}
      </div>
    </div>
  );
}

/* ===== FAQ Item ===== */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      className="border border-white/5 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-sm font-medium text-zinc-200 pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}

/* ===== Landing Page ===== */
export default function LandingPage() {
  const placeholders = [
    "Promote my café opening",
    "Church youth event reel",
    "Instagram skincare post",
    "Startup launch announcement"
  ];
  
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [results, setResults] = useState<{ hook?: string, caption?: string, cta?: string, hashtags?: string, script?: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    const query = topic.trim() || placeholders[placeholderIndex];
    
    if (hasGenerated) {
      setShowSignupModal(true);
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'demo', input: { topic: query } })
      });
      const data = await response.json();
      if (data.result) {
        setResults(data.result);
        setHasGenerated(true);
      }
    } catch (error) {
      toast.error('Failed to generate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-900 text-white overflow-hidden selection:bg-brand-500/30 selection:text-white">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">ColIG</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm text-zinc-400 hover:text-white transition-colors">Testimonials</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== HERO (Interactive AI) ===== */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex flex-col justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-electric-500/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative max-w-5xl mx-auto text-center w-full"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-medium backdrop-blur-sm shadow-[0_0_20px_rgba(var(--brand-500),0.2)]">
              <Sparkles className="w-3 h-3" />
              Experience the AI instantly
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Turn Any Idea Into <br className="hidden sm:block" />
            <span className="gradient-text">Viral-Ready Content</span> in Seconds.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Generate hooks, captions, hashtags, and content scripts instantly with AI. No signup required to try it out.
          </motion.p>

          {/* AI Interactive Input Area */}
          <motion.div variants={fadeUp} className="max-w-3xl mx-auto relative z-20">
            <div className={cn(
              "p-2 rounded-2xl glass-card flex flex-col sm:flex-row items-center gap-2 border shadow-2xl transition-all duration-300",
              isGenerating ? "border-brand-500/50 shadow-[0_0_40px_rgba(99,102,241,0.2)]" : "border-white/10 hover:border-brand-500/30"
            )}>
              <div className="relative flex-1 w-full flex items-center px-4 py-3 sm:py-0">
                <Target className="w-5 h-5 text-brand-400 shrink-0 mr-3 hidden sm:block" />
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  className="w-full bg-transparent border-none text-white text-base sm:text-lg focus:outline-none placeholder:text-transparent"
                />
                {!topic && (
                  <div className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-base sm:text-lg">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={placeholderIndex}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="inline-block"
                      >
                        {placeholders[placeholderIndex]}...
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                size="lg" 
                className="w-full sm:w-auto shrink-0 px-8 py-6 rounded-xl font-semibold shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              >
                {isGenerating ? (
                  <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Generating...</>
                ) : (
                  <><Play className="w-5 h-5 mr-2" /> Generate Free</>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Generated Results Area */}
          <AnimatePresence>
            {results && (
              <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="mt-16 max-w-5xl mx-auto text-left relative z-10"
              >
                <div className={cn(
                  "grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6",
                  showSignupModal && "blur-[8px] pointer-events-none transition-all duration-500 opacity-60"
                )}>
                  {/* Left Column (Hook & Hashtags) */}
                  <div className="flex flex-col gap-4 lg:gap-6">
                     <OutputCard title="Viral Hook" content={results.hook || ""} />
                     <OutputCard title="Hashtags" content={results.hashtags || ""} className="flex-1" />
                  </div>
                  
                  {/* Middle Column (Caption & CTA) */}
                  <div className="flex flex-col gap-4 lg:gap-6 md:col-span-1">
                    <OutputCard title="Caption" content={results.caption || ""} className="flex-1" />
                    <OutputCard title="Call to Action" content={results.cta || ""} />
                  </div>
                  
                  {/* Right Column (Content Script) */}
                  <div className="flex flex-col gap-4 lg:gap-6">
                    <OutputCard title="Content Script" content={results.script || ""} className="h-full" />
                  </div>
                </div>

                {/* Lock Overlay Modal */}
                {showSignupModal && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-20 flex items-center justify-center p-4"
                  >
                    <div className="glass-card p-8 sm:p-10 max-w-md w-full text-center shadow-2xl border-brand-500/30 bg-surface-900/90 backdrop-blur-xl">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-electric-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Unlock Unlimited AI Content</h3>
                      <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                        You've seen the magic. Create a free account to generate unlimited viral hooks, captions, and scripts tailored to your brand.
                      </p>
                      
                      <div className="space-y-4">
                        <Link href="/signup">
                           <Button variant="outline" className="w-full justify-center h-12 text-sm font-medium">
                             Continue with Google
                           </Button>
                        </Link>
                        <Link href="/signup">
                           <Button variant="primary" className="w-full justify-center h-12 text-sm font-medium">
                             Create Free Account
                           </Button>
                        </Link>
                        <div className="pt-4 mt-4 border-t border-white/10 text-sm text-zinc-500">
                          Already have an account? <Link href="/login" className="text-brand-400 font-medium hover:underline">Sign In</Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="relative max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-brand-400 text-sm font-medium uppercase tracking-widest">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Everything You Need to Go Viral
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Six powerful AI tools designed specifically for Instagram creators who want to grow faster.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeUp} className="glass-card p-6 group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-brand-400 text-sm font-medium uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Loved by 10,000+ Creators
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              See how creators are using ColIG to transform their Instagram presence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="glass-card p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-600 flex items-center justify-center text-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.handle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 bg-surface-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold gradient-text">ColIG</span>
              </div>
              <p className="text-sm text-zinc-500 mb-4">Create content that actually gets attention.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm text-zinc-500 hover:text-white transition-colors">Features</a></li>
                <li><Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-zinc-600">© {new Date().getFullYear()} ColIG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
