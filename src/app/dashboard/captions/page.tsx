'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, RefreshCw, Check, Smile } from 'lucide-react';
import { Button, Input, Select, Card, Skeleton, EmptyState, Toggle } from '@/components/ui';
import { TONE_OPTIONS, NICHE_OPTIONS } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const captionTypes = [
  { value: 'short', label: '⚡ Short & Punchy' },
  { value: 'long', label: '📖 Long Storytelling' },
];

export default function CaptionGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('');
  const [tone, setTone] = useState('');
  const [captionType, setCaptionType] = useState('short');
  const [useEmoji, setUseEmoji] = useState(true);
  const [captions, setCaptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      toast.error('Please enter a topic');
      return;
    }
    setIsLoading(true);
    setCaptions([]);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: 'caption',
          input: { topic, niche, tone, captionType, useEmoji },
        }),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      setCaptions(data.result);
      toast.success('Captions generated!');
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
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Caption Generator</h1>
            <p className="text-sm text-zinc-500">Write engaging captions that drive interactions</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        <motion.div variants={fadeUp}>
          <Card className="sticky top-20">
            <div className="space-y-4">
              <Input
                label="Topic *"
                placeholder="e.g., Morning routine for success"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <Select
                label="Caption Type"
                options={captionTypes}
                value={captionType}
                onChange={setCaptionType}
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
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Smile className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-300">Use Emojis</span>
                </div>
                <Toggle checked={useEmoji} onChange={setUseEmoji} />
              </div>
              <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                <Sparkles className="w-4 h-4" />
                Generate Captions
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : captions.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-zinc-400">{captions.length} captions generated</p>
                <Button variant="ghost" size="sm" onClick={handleGenerate}>
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate
                </Button>
              </div>
              <AnimatePresence>
                {captions.map((caption, i) => (
                  <motion.div
                    key={`${i}-${caption.slice(0, 20)}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <Card hover className="group">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <span className="text-xs font-medium text-brand-400 bg-brand-500/10 px-2 py-1 rounded-lg">
                          Caption {i + 1}
                        </span>
                        <button
                          onClick={() => handleCopy(caption, i)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs text-zinc-500 hover:text-brand-400"
                        >
                          {copiedIndex === i ? (
                            <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</>
                          ) : (
                            <><Copy className="w-3.5 h-3.5" /> Copy</>
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line">{caption}</p>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <EmptyState
              icon={<Sparkles className="w-12 h-12" />}
              title="No captions generated yet"
              description="Enter a topic, choose your style, and generate engaging Instagram captions."
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
