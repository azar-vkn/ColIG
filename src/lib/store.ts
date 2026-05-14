import { create } from 'zustand';
import type { UserProfile, Generation, GenerationTool } from '@/lib/types';

/* ===== Auth Store ===== */
interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));

/* ===== Generation Store ===== */
interface GenerationState {
  generations: Generation[];
  isGenerating: boolean;
  currentTool: GenerationTool | null;
  setGenerations: (generations: Generation[]) => void;
  addGeneration: (generation: Generation) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setCurrentTool: (tool: GenerationTool | null) => void;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  generations: [],
  isGenerating: false,
  currentTool: null,
  setGenerations: (generations) => set({ generations }),
  addGeneration: (generation) =>
    set((state) => ({
      generations: [generation, ...state.generations],
    })),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setCurrentTool: (tool) => set({ currentTool: tool }),
}));

/* ===== Sidebar Store ===== */
interface SidebarState {
  isOpen: boolean;
  isMobileOpen: boolean;
  toggle: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  isMobileOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleMobile: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  closeMobile: () => set({ isMobileOpen: false }),
}));
