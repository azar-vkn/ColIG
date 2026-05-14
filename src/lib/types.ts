/* ===== ColIG Type Definitions ===== */

/** User profile stored in Supabase */
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  preferred_niche: string | null;
  preferred_language: string | null;
  subscription_tier: "free" | "pro";
  generations_today: number;
  created_at: string;
  updated_at: string;
}

/** Generation record saved to Supabase */
export interface Generation {
  id: string;
  user_id: string;
  tool: GenerationTool;
  input: GenerationInput;
  output: string[];
  created_at: string;
}

/** Available AI generation tools */
export type GenerationTool =
  | "hook"
  | "caption"
  | "carousel"
  | "hashtag"
  | "rewrite";

/** Input parameters for AI generation */
export interface GenerationInput {
  topic?: string;
  niche?: string;
  tone?: string;
  audience?: string;
  content?: string;
  captionType?: "short" | "long";
  useEmoji?: boolean;
}

/** Tone options for content generation */
export const TONE_OPTIONS = [
  { value: "bold", label: "Bold", emoji: "🔥" },
  { value: "emotional", label: "Emotional", emoji: "💔" },
  { value: "luxury", label: "Luxury", emoji: "💎" },
  { value: "aggressive", label: "Aggressive", emoji: "⚡" },
  { value: "inspirational", label: "Inspirational", emoji: "✨" },
  { value: "minimal", label: "Minimal", emoji: "🤍" },
] as const;

/** Niche options for content generation */
export const NICHE_OPTIONS = [
  { value: "motivation", label: "Motivation", emoji: "💪" },
  { value: "business", label: "Business", emoji: "💼" },
  { value: "study", label: "Study", emoji: "📚" },
  { value: "fitness", label: "Fitness", emoji: "🏋️" },
  { value: "christianity", label: "Christianity", emoji: "✝️" },
  { value: "finance", label: "Finance", emoji: "💰" },
  { value: "personal-branding", label: "Personal Branding", emoji: "🎯" },
  { value: "lifestyle", label: "Lifestyle", emoji: "🌟" },
] as const;

/** Subscription plan details */
export interface SubscriptionPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

/** Sidebar navigation item */
export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  disabled?: boolean;
}

/** Carousel slide structure */
export interface CarouselSlide {
  slideNumber: number;
  type: "hook" | "value" | "cta";
  content: string;
  notes?: string;
}
