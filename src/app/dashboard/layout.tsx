'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Zap, Sparkles, LayoutGrid, Hash, RefreshCw,
  History, Settings, LogOut, Menu, X, ChevronLeft,
  Film, Lightbulb, Calendar, TrendingUp, Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/lib/store';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Badge } from '@/components/ui';

/* ===== Navigation Items ===== */
const mainNav = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Hook Generator', href: '/dashboard/hooks', icon: Zap },
  { title: 'Caption Generator', href: '/dashboard/captions', icon: Sparkles },
  { title: 'Carousel Generator', href: '/dashboard/carousel', icon: LayoutGrid },
  { title: 'Hashtag Generator', href: '/dashboard/hashtags', icon: Hash },
  { title: 'Rewrite Better', href: '/dashboard/rewrite', icon: RefreshCw },
];

const secondaryNav = [
  { title: 'History', href: '/dashboard/history', icon: History },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const comingSoon = [
  { title: 'Reel Script Generator', icon: Film },
  { title: 'AI Thumbnail Ideas', icon: Lightbulb },
  { title: 'Content Calendar', icon: Calendar },
  { title: 'Trend Prediction', icon: TrendingUp },
];

/* ===== Sidebar Component ===== */
function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, isMobileOpen, toggle, closeMobile } = useSidebarStore();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      router.push('/');
      router.refresh();
    } catch {
      router.push('/');
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={closeMobile}>
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          {isOpen && <span className="text-lg font-bold gradient-text">ColIG</span>}
        </Link>
        {/* Desktop toggle */}
        <button
          onClick={toggle}
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all"
        >
          <ChevronLeft className={cn('w-4 h-4 transition-transform', !isOpen && 'rotate-180')} />
        </button>
        {/* Mobile close */}
        <button
          onClick={closeMobile}
          className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg hover:bg-white/5 text-zinc-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="mb-2 px-3">
          {isOpen && <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">Tools</span>}
        </div>
        {mainNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon className={cn('w-[18px] h-[18px] shrink-0', isActive && 'text-brand-400')} />
              {isOpen && <span>{item.title}</span>}
            </Link>
          );
        })}

        <div className="my-4 border-t border-white/5" />
        <div className="mb-2 px-3">
          {isOpen && <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">Account</span>}
        </div>
        {secondaryNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {isOpen && <span>{item.title}</span>}
            </Link>
          );
        })}

        {/* Coming Soon Section */}
        {isOpen && (
          <>
            <div className="my-4 border-t border-white/5" />
            <div className="mb-2 px-3">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">Coming Soon</span>
            </div>
            {comingSoon.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-600 cursor-not-allowed"
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                <span>{item.title}</span>
                <Badge variant="default" className="ml-auto text-[10px]">Soon</Badge>
              </div>
            ))}
          </>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-4 border-t border-white/5">
        {isOpen && (
          <div className="mb-3 p-3 rounded-xl bg-gradient-to-r from-brand-500/10 to-electric-500/10 border border-brand-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-semibold text-brand-400">Upgrade to Pro</span>
            </div>
            <p className="text-[11px] text-zinc-500">Unlimited generations & more</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {isOpen && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isOpen ? 260 : 72 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-surface-800 border-r border-white/5 z-40 overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[260px] bg-surface-800 border-r border-white/5 z-50 overflow-hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ===== Dashboard Layout ===== */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, toggleMobile } = useSidebarStore();

  return (
    <div className="min-h-screen bg-surface-900">
      <Sidebar />

      {/* Main Content */}
      <div
        className={cn(
          'transition-all duration-200',
          isOpen ? 'lg:ml-[260px]' : 'lg:ml-[72px]'
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 sm:px-6 bg-surface-900/80 backdrop-blur-md border-b border-white/5">
          <button
            onClick={toggleMobile}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/5 text-zinc-400"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-700 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-zinc-400">Free Plan</span>
              <span className="text-xs text-zinc-600">• 5/5 left</span>
            </div>
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              U
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl">
          {children}
        </main>
      </div>
    </div>
  );
}
