'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Copy, RefreshCw, Check, Sparkles } from 'lucide-react';
import { Button, Input, Select, Card, Skeleton, EmptyState, Badge } from '@/components/ui';
import { NICHE_OPTIONS } from '@/lib/types';
import type { CarouselSlide } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const slideTypeColors: Record<string, string> = {
  hook: 'bg-yellow-500/20 text-yellow-400',
  value: 'bg-blue-500/20 text-blue-400',
  cta: 'bg-green-500/20 text-green-400',
};

export default function CarouselGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('');
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      toast.error('Please enter a carousel topic');
      return;
    }
    setIsLoading(true);
    setSlides([]);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: 'carousel',
          input: { topic, niche },
        }),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      setSlides(data.result);
      toast.success('Carousel outline generated!');
    } catch {
      toast.error('Failed to generate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySlide = async (slide: CarouselSlide, index: number) => {
    const text = `Slide ${slide.slideNumber}: ${slide.content}${slide.notes ? `\n\nDesign Notes: ${slide.notes}` : ''}`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedIndex(index);
      toast.success('Slide copied!');
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleCopyAll = async () => {
    const text = slides
      .map((s) => `Slide ${s.slideNumber} [${s.type.toUpperCase()}]:\n${s.content}${s.notes ? `\n→ Design: ${s.notes}` : ''}`)
      .join('\n\n---\n\n');
    const success = await copyToClipboard(text);
    if (success) {
      toast.success('All slides copied!');
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Carousel Generator</h1>
            <p className="text-sm text-zinc-500">Create slide-by-slide carousel outlines</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        <motion.div variants={fadeUp}>
          <Card className="sticky top-20">
            <div className="space-y-4">
              <Input
                label="Carousel Topic *"
                placeholder="e.g., 5 Habits That Will Make You Unstoppable"
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
              <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                <Sparkles className="w-4 h-4" />
                Generate Carousel
              </Button>

              {slides.length > 0 && (
                <div className="pt-3 border-t border-white/5">
                  <p className="text-xs text-zinc-500 mb-2">Generated {slides.length} slides</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="default" className={slideTypeColors.hook}>Hook</Badge>
                    <Badge variant="default" className={slideTypeColors.value}>Value</Badge>
                    <Badge variant="default" className={slideTypeColors.cta}>CTA</Badge>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full" />
              ))}
            </div>
          ) : slides.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-zinc-400">{slides.length}-slide carousel</p>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCopyAll}>
                    <Copy className="w-3.5 h-3.5" />
                    Copy All
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleGenerate}>
                    <RefreshCw className="w-3.5 h-3.5" />
                    Regenerate
                  </Button>
                </div>
              </div>
              <AnimatePresence>
                {slides.map((slide, i) => (
                  <motion.div
                    key={`slide-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    <Card hover className="group">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-zinc-500 bg-surface-600 px-2 py-1 rounded-lg">
                            Slide {slide.slideNumber}
                          </span>
                          <Badge
                            variant="default"
                            className={slideTypeColors[slide.type] || slideTypeColors.value}
                          >
                            {slide.type.toUpperCase()}
                          </Badge>
                        </div>
                        <button
                          onClick={() => handleCopySlide(slide, i)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedIndex === i ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-zinc-500 hover:text-brand-400" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line mb-2">
                        {slide.content}
                      </p>
                      {slide.notes && (
                        <p className="text-xs text-zinc-500 italic border-t border-white/5 pt-2 mt-2">
                          💡 {slide.notes}
                        </p>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <EmptyState
              icon={<LayoutGrid className="w-12 h-12" />}
              title="No carousel generated yet"
              description="Enter a topic to generate a complete slide-by-slide carousel outline with hook, value slides, and CTA."
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
