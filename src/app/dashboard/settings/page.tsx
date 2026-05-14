'use client';

import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Moon, Sun, Globe, Target, User, Crown } from 'lucide-react';
import { Card, Select, Button, Input, Toggle, Badge } from '@/components/ui';
import { useTheme } from '@/components/providers/theme-provider';
import { NICHE_OPTIONS } from '@/lib/types';
import { useState } from 'react';
import { toast } from 'sonner';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const languages = [{ value: 'en', label: 'English' }, { value: 'ta', label: 'Tamil' }];

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState('en');
  const [niche, setNiche] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => toast.success('Settings saved!');

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      <motion.div variants={fadeUp} className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-500 to-zinc-700 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-sm text-zinc-500">Manage your preferences</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6 max-w-2xl">
        {/* Appearance */}
        <motion.div variants={fadeUp}>
          <Card>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-brand-400" /> : <Sun className="w-5 h-5 text-yellow-400" />}
              Appearance
            </h2>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-sm font-medium text-zinc-200">Dark Mode</p>
                <p className="text-xs text-zinc-500">Toggle between dark and light theme</p>
              </div>
              <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
            </div>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div variants={fadeUp}>
          <Card>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-400" /> Preferences
            </h2>
            <div className="space-y-4">
              <Select label="Preferred Language" options={languages} value={language} onChange={setLanguage} />
              <Select label="Default Niche" options={NICHE_OPTIONS} value={niche} onChange={setNiche} placeholder="Select default niche..." />
            </div>
          </Card>
        </motion.div>

        {/* Account */}
        <motion.div variants={fadeUp}>
          <Card>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-brand-400" /> Account
            </h2>
            <div className="space-y-4">
              <Input label="Full Name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
              <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </Card>
        </motion.div>

        {/* Subscription */}
        <motion.div variants={fadeUp}>
          <Card className="bg-gradient-to-r from-brand-500/5 to-electric-500/5 border-brand-500/10">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-brand-400" /> Subscription
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-zinc-200">Free Plan</p>
                  <Badge variant="default">Active</Badge>
                </div>
                <p className="text-xs text-zinc-500">5 generations per day</p>
              </div>
              <Button variant="outline" size="sm">
                <Crown className="w-3.5 h-3.5" /> Upgrade to Pro
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div variants={fadeUp}>
          <Card className="border-red-500/10">
            <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-200">Delete Account</p>
                <p className="text-xs text-zinc-500">Permanently delete your account and data</p>
              </div>
              <Button variant="danger" size="sm">Delete Account</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
