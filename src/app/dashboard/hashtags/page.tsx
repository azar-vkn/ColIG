'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, Copy, RefreshCw, Check, Sparkles } from 'lucide-react';
import { Button, Input, Select, Card, Skeleton, EmptyState } from '@/components/ui';
import { NICHE_OPTIONS } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function HashtagGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const generate = async () => {
    if (!niche && !topic) { toast.error('Enter a topic or select a niche'); return; }
    setIsLoading(true); setHashtags([]); setSelected(new Set());
    try {
      const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tool: 'hashtag', input: { topic, niche } }) });
      const data = await res.json();
      if (data.error) { toast.error(data.error); return; }
      setHashtags(data.result);
      toast.success('Hashtags generated!');
    } catch { toast.error('Failed to generate.'); } finally { setIsLoading(false); }
  };

  const toggle = (tag: string) => {
    setSelected(prev => { const n = new Set(prev); n.has(tag) ? n.delete(tag) : (n.size < 30 ? n.add(tag) : toast.error('Max 30 hashtags')); return n; });
  };

  const copySelected = async () => {
    if (!selected.size) { toast.error('Select hashtags first'); return; }
    if (await copyToClipboard(Array.from(selected).join(' '))) toast.success(`${selected.size} hashtags copied!`);
  };

  const copyAll = async () => { if (await copyToClipboard(hashtags.join(' '))) toast.success('All copied!'); };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Hash className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Hashtag Generator</h1>
            <p className="text-sm text-zinc-500">Find niche-specific hashtags for maximum reach</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        <motion.div variants={fadeUp}>
          <Card className="sticky top-20 space-y-4">
            <Input label="Topic" placeholder="e.g., Productivity tips" value={topic} onChange={e => setTopic(e.target.value)} />
            <Select label="Niche" options={NICHE_OPTIONS} value={niche} onChange={setNiche} placeholder="Select niche..." />
            <Button onClick={generate} isLoading={isLoading} className="w-full"><Sparkles className="w-4 h-4" />Generate Hashtags</Button>
            {hashtags.length > 0 && (
              <div className="pt-3 border-t border-white/5 space-y-2">
                <p className="text-xs text-zinc-500">Selected: <span className="text-brand-400">{selected.size}</span>/30</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelected(selected.size === hashtags.length ? new Set() : new Set(hashtags.slice(0,30)))} className="flex-1">{selected.size === hashtags.length ? 'Deselect' : 'Select All'}</Button>
                  <Button size="sm" onClick={copySelected} className="flex-1"><Copy className="w-3.5 h-3.5" />Copy</Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          {isLoading ? (
            <div className="flex flex-wrap gap-2">{Array.from({length:20}).map((_,i) => <Skeleton key={i} className="h-8 w-24" />)}</div>
          ) : hashtags.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-zinc-400">{hashtags.length} hashtags</p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={copyAll}><Copy className="w-3.5 h-3.5" />Copy All</Button>
                  <Button variant="ghost" size="sm" onClick={generate}><RefreshCw className="w-3.5 h-3.5" />Regenerate</Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag, i) => (
                  <motion.button key={`${tag}-${i}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.02 }}
                    onClick={() => toggle(tag)}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${selected.has(tag) ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40' : 'bg-surface-700 text-zinc-400 border border-white/5 hover:border-brand-500/20'}`}>
                    {tag}{selected.has(tag) && <Check className="w-3 h-3 inline ml-1" />}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState icon={<Hash className="w-12 h-12" />} title="No hashtags yet" description="Enter a topic or select a niche to generate relevant Instagram hashtags." />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
