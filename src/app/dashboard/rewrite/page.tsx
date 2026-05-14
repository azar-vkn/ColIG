'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Copy, Check, Sparkles } from 'lucide-react';
import { Button, Textarea, Card, Skeleton, EmptyState } from '@/components/ui';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function RewritePage() {
  const [content, setContent] = useState('');
  const [rewrites, setRewrites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = async () => {
    if (!content.trim()) { toast.error('Paste a caption to rewrite'); return; }
    setIsLoading(true); setRewrites([]);
    try {
      const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tool: 'rewrite', input: { content } }) });
      const data = await res.json();
      if (data.error) { toast.error(data.error); return; }
      setRewrites(data.result);
      toast.success('Caption rewritten!');
    } catch { toast.error('Failed to rewrite.'); } finally { setIsLoading(false); }
  };

  const handleCopy = async (text: string, index: number) => {
    if (await copyToClipboard(text)) {
      setCopiedIndex(index);
      toast.success('Copied!');
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Rewrite Better</h1>
            <p className="text-sm text-zinc-500">Transform weak captions into viral content</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        <motion.div variants={fadeUp}>
          <Card className="sticky top-20 space-y-4">
            <Textarea
              label="Paste your caption *"
              placeholder="Paste the caption you want to improve..."
              value={content}
              onChange={e => setContent(e.target.value)}
              className="min-h-[200px]"
            />
            <Button onClick={generate} isLoading={isLoading} className="w-full">
              <Sparkles className="w-4 h-4" />
              Rewrite Caption
            </Button>
            <p className="text-xs text-zinc-600 text-center">Generates 3 versions: Viral, Emotional, Engagement</p>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          {isLoading ? (
            <div className="space-y-4">{Array.from({length:3}).map((_,i) => <Skeleton key={i} className="h-40 w-full" />)}</div>
          ) : rewrites.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-zinc-400">{rewrites.length} versions generated</p>
                <Button variant="ghost" size="sm" onClick={generate}><RefreshCw className="w-3.5 h-3.5" />Regenerate</Button>
              </div>
              <AnimatePresence>
                {rewrites.map((text, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <Card hover className="group">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className="text-xs font-medium text-brand-400 bg-brand-500/10 px-2 py-1 rounded-lg">Version {i + 1}</span>
                        <button onClick={() => handleCopy(text, i)} className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs text-zinc-500 hover:text-brand-400">
                          {copiedIndex === i ? <><Check className="w-3.5 h-3.5 text-emerald-400" />Copied</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
                        </button>
                      </div>
                      <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line">{text}</p>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <EmptyState icon={<RefreshCw className="w-12 h-12" />} title="No rewrites yet" description="Paste a weak caption and let AI transform it into something viral." />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
