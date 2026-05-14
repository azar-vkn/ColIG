'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles, Zap, Target, Hash, RefreshCw, LayoutGrid,
  ArrowRight, Check, ChevronDown, Star
} from 'lucide-react';
import { Button } from '@/components/ui';
import { useState } from 'react';

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
  return (
    <div className="min-h-screen bg-surface-900 text-white overflow-hidden">
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
              <a href="#faq" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQ</a>
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

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-electric-500/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative max-w-5xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              AI-Powered Instagram Growth
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Generate Viral Instagram{' '}
            <br className="hidden sm:block" />
            Content in{' '}
            <span className="gradient-text">Seconds</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AI-powered hooks, captions, carousel ideas, and hashtags for creators.
            <br className="hidden sm:block" />
            <span className="text-zinc-300 font-medium">Create content that actually gets attention.</span>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="text-base px-8 py-4">
                Start Creating for Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="secondary" size="lg" className="text-base px-8 py-4">
                See How It Works
              </Button>
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-xs text-zinc-500 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> No credit card required</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> 5 free generations/day</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Cancel anytime</span>
          </motion.p>

          {/* Hero Preview Card */}
          <motion.div
            variants={fadeUp}
            className="mt-16 relative max-w-3xl mx-auto"
          >
            <div className="absolute -inset-1 gradient-bg rounded-2xl opacity-20 blur-xl" />
            <div className="relative glass-card p-6 sm:p-8 text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-zinc-500 ml-2">ColIG — Hook Generator</span>
              </div>
              <div className="space-y-3">
                {[
                  "Nobody talks about this…",
                  "You're wasting your 20s if you don't know this",
                  "Read this before starting a business…",
                  "I wish someone told me this 5 years ago",
                  "Stop scrolling. This will change your life.",
                ].map((hook, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <span className="text-brand-400 font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-zinc-200 flex-1">{hook}</span>
                    <button className="text-xs text-zinc-500 hover:text-brand-400 transition-colors">Copy</button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
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

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="relative max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-brand-400 text-sm font-medium uppercase tracking-widest">Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Start Free. Scale When Ready.
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              No hidden fees. No credit card required. Upgrade when you need unlimited power.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`relative rounded-2xl p-6 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-brand-500/20 to-brand-900/10 border-2 border-brand-500/50'
                    : 'glass-card'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-bg text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-zinc-500 text-sm">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-brand-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="max-w-2xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-brand-400 text-sm font-medium uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Common Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/30 to-transparent" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative max-w-3xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-bold mb-6">
            Ready to Create Content That{' '}
            <span className="gradient-text">Actually Gets Attention</span>?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-zinc-400 text-lg mb-8">
            Join 10,000+ creators using ColIG to grow their Instagram faster than ever.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/signup">
              <Button size="lg" className="text-base px-10 py-4">
                Get Started — It&apos;s Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
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
              <div className="flex items-center gap-3">
                <a href="#" className="text-zinc-500 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                <a href="#" className="text-zinc-500 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
                <a href="#" className="text-zinc-500 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm text-zinc-500 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-sm text-zinc-500 hover:text-white transition-colors">Pricing</a></li>
                <li><Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Tools</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Hook Generator</a></li>
                <li><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Caption Generator</a></li>
                <li><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Carousel Generator</a></li>
                <li><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Hashtag Generator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">Contact</a></li>
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
