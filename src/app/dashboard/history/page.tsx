'use client';

import { motion } from 'framer-motion';
import { History as HistoryIcon, Zap, Sparkles, LayoutGrid, Hash, RefreshCw, Copy, Check, Trash2 } from 'lucide-react';
import { Card, EmptyState, Badge, Button } from '@/components/ui';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const toolIcons: Record<string, typeof Zap> = { hook: Zap, caption: Sparkles, carousel: LayoutGrid, hashtag: Hash, rewrite: RefreshCw };
const toolColors: Record<string, string> = { hook: 'from-yellow-500 to-orange-500', caption: 'from-purple-500 to-pink-500', carousel: 'from-blue-500 to-cyan-500', hashtag: 'from-green-500 to-emerald-500', rewrite: 'from-red-500 to-pink-500' };

// Mock history data for demo
const mockHistory = [
  { id: '1', tool: 'hook', input: { topic: 'Building a personal brand', niche: 'business' }, output: ['Nobody talks about this…', "You're wasting your 20s if…"], created_at: '2026-05-13T10:30:00Z' },
  { id: '2', tool: 'caption', input: { topic: 'Morning routine', captionType: 'short' }, output: ['Less talking. More doing. 🔥'], created_at: '2026-05-13T09:15:00Z' },
  { id: '3', tool: 'hashtag', input: { niche: 'motivation' }, output: ['#motivation', '#mindset', '#growthmindset', '#success'], created_at: '2026-05-12T16:45:00Z' },
  { id: '4', tool: 'carousel', input: { topic: '5 Habits for Success' }, output: ['Slide 1: Hook - 5 Habits That Will Make You Unstoppable'], created_at: '2026-05-12T14:20:00Z' },
];

export default function HistoryPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (item: typeof mockHistory[0]) => {
    const text = Array.isArray(item.output) ? item.output.join('\n\n') : String(item.output);
    if (await copyToClipboard(text)) {
      setCopiedId(item.id);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const formatDate = (date: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(date));

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <HistoryIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">History</h1>
              <p className="text-sm text-zinc-500">All your past generations</p>
            </div>
          </div>
          <Badge variant="brand">{mockHistory.length} generations</Badge>
        </div>
      </motion.div>

      {mockHistory.length > 0 ? (
        <div className="space-y-4">
          {mockHistory.map((item) => {
            const Icon = toolIcons[item.tool] || Zap;
            const color = toolColors[item.tool] || toolColors.hook;
            return (
              <motion.div key={item.id} variants={fadeUp}>
                <Card hover className="group">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-white capitalize">{item.tool} Generator</h3>
                        <span className="text-xs text-zinc-600">{formatDate(item.created_at)}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mb-2">
                        {item.input.topic && `Topic: ${item.input.topic}`}
                        {item.input.niche && ` • Niche: ${item.input.niche}`}
                      </p>
                      <div className="text-sm text-zinc-400 line-clamp-2">
                        {Array.isArray(item.output) ? item.output.slice(0, 2).join(' | ') : String(item.output)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleCopy(item)} className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-brand-400 transition-colors">
                        {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={<HistoryIcon className="w-12 h-12" />} title="No history yet" description="Your generated content will appear here. Start creating!" action={<Button>Start Generating</Button>} />
      )}
    </motion.div>
  );
}
