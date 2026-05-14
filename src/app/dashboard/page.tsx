'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, Sparkles, LayoutGrid, Hash, RefreshCw, TrendingUp, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const tools = [
  { title: 'Hook Generator', desc: 'Create scroll-stopping hooks', icon: Zap, href: '/dashboard/hooks', color: 'from-yellow-500 to-orange-500', count: '10 hooks' },
  { title: 'Caption Generator', desc: 'Write engaging captions', icon: Sparkles, href: '/dashboard/captions', color: 'from-purple-500 to-pink-500', count: '5 captions' },
  { title: 'Carousel Generator', desc: 'Design carousel outlines', icon: LayoutGrid, href: '/dashboard/carousel', color: 'from-blue-500 to-cyan-500', count: '7 slides' },
  { title: 'Hashtag Generator', desc: 'Find perfect hashtags', icon: Hash, href: '/dashboard/hashtags', color: 'from-green-500 to-emerald-500', count: '30 tags' },
  { title: 'Rewrite Better', desc: 'Transform weak captions', icon: RefreshCw, href: '/dashboard/rewrite', color: 'from-red-500 to-pink-500', count: '3 versions' },
];

const quickStats = [
  { label: 'Generations Today', value: '0', limit: '/ 5', icon: Zap },
  { label: 'Total Generated', value: '0', icon: TrendingUp },
  { label: 'Tools Used', value: '0', icon: Sparkles },
];

export default function DashboardPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={stagger}>
      {/* Greeting */}
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Welcome to ColIG 👋
        </h1>
        <p className="text-zinc-500">
          Choose a tool to start creating viral Instagram content.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">{stat.label}</p>
              <p className="text-lg font-bold text-white">
                {stat.value}
                {stat.limit && <span className="text-zinc-600 text-sm font-normal">{stat.limit}</span>}
              </p>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Tools Grid */}
      <motion.div variants={fadeUp} className="mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">AI Tools</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <motion.div key={tool.title} variants={fadeUp}>
            <Link href={tool.href}>
              <Card hover className="h-full group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">{tool.title}</h3>
                <p className="text-sm text-zinc-500 mb-3">{tool.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-600">Generates {tool.count}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Tip Card */}
      <motion.div variants={fadeUp} className="mt-8">
        <Card className="bg-gradient-to-r from-brand-500/5 to-electric-500/5 border-brand-500/10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">💡 Pro Tip</h3>
              <p className="text-sm text-zinc-400">
                Start with the <Link href="/dashboard/hooks" className="text-brand-400 hover:text-brand-300">Hook Generator</Link> — hooks are the #1 factor that determines if someone stops scrolling. A great hook = 10x more views.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
