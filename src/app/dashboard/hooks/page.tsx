'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Copy, RefreshCw, Check, Sparkles } from 'lucide-react';
import { Button, Input, Select, Card, Skeleton, EmptyState } from '@/components/ui';
import { TONE_OPTIONS, NICHE_OPTIONS } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function HookGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('');
  const [tone, setTone] = useState('');
  const [audience, setAudience] = useState('');
  const [hooks, setHooks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      toast.error('Please enter a topic');
      return;
    }
    setIsLoading(true);
    setHooks([]);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: 'hook',
          input: { topic, niche, tone, audience },
        }),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      setHooks(data.result);
      if (data.mock) {
        toast.info('Using demo data. Connect OpenAI for custom results.');
      } else {
        toast.success('Hooks generated!');
      }
    } catch {
      toast.error('Failed to generate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedIndex(index);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Hook Generator</h1>
            <p className="text-sm text-zinc-500">Create scroll-stopping hooks that grab attention</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* Input Panel */}
        <motion.div variants={fadeUp}>
          <Card className="sticky top-20">
            <div className="space-y-4">
              <Input
                label="Topic *"
                placeholder="e.g., Building a personal brand"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />

              <Select
                label="Niche"
                options={NICHE_OPTIONS}
                value={niche}
                onChange={setNiche}
                placeholder="Select a niche..."
              />

              <Select
                label="Tone"
                options={TONE_OPTIONS}
                value={tone}
                onChange={setTone}
                placeholder="Select tone..."
              />

              <Input
                label="Target Audience"
                placeholder="e.g., Aspiring entrepreneurs"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />

              <Button
                onClick={handleGenerate}
                isLoading={isLoading}
                className="w-full"
              >
                <Sparkles className="w-4 h-4" />
                Generate 10 Hooks
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Results Panel */}
        <motion.div variants={fadeUp}>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : hooks.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-zinc-400">{hooks.length} hooks generated</p>
                <Button variant="ghost" size="sm" onClick={handleGenerate}>
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate
                </Button>
              </div>
              <AnimatePresence>
                {hooks.map((hook, i) => (
                  <motion.div
                    key={`${hook}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Card hover className="flex items-start gap-3 py-4 cursor-pointer group" onClick={() => handleCopy(hook, i)}>
                      <span className="text-brand-400 font-mono text-xs mt-0.5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm text-zinc-200 flex-1 leading-relaxed">{hook}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(hook, i);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      >
                        {copiedIndex === i ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-zinc-500 hover:text-brand-400" />
                        )}
                      </button>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <EmptyState
              icon={<Zap className="w-12 h-12" />}
              title="No hooks generated yet"
              description="Enter a topic and click generate to create 10 viral Instagram hooks."
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
