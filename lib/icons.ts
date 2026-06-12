import {
  Award,
  Clock,
  Shield,
  ThumbsUp,
  Hammer,
  Gem,
  Layers,
  PencilRuler,
  Grid3X3,
  Flame,
  Sun,
  Construction,
  Wrench,
  Sparkles,
  HeartHandshake,
  BadgeCheck,
  Star,
  Leaf,
  Ruler,
  HardHat,
  type LucideIcon,
} from 'lucide-react'

/**
 * General icon registry for editable content (e.g. the "Warum AMAN" reasons).
 * Content stores the icon as a kebab/lowercase name; this map resolves it to a
 * Lucide component. See also `lib/plannerIcons.ts` for the planner-card subset.
 */
export const contentIcons = {
  award: Award,
  clock: Clock,
  shield: Shield,
  'thumbs-up': ThumbsUp,
  hammer: Hammer,
  gem: Gem,
  layers: Layers,
  'pencil-ruler': PencilRuler,
  'grid-3x3': Grid3X3,
  flame: Flame,
  sun: Sun,
  construction: Construction,
  wrench: Wrench,
  sparkles: Sparkles,
  'heart-handshake': HeartHandshake,
  'badge-check': BadgeCheck,
  star: Star,
  leaf: Leaf,
  ruler: Ruler,
  'hard-hat': HardHat,
} satisfies Record<string, LucideIcon>

export type ContentIconName = keyof typeof contentIcons

export const contentIconNames = Object.keys(contentIcons) as ContentIconName[]

export const DEFAULT_CONTENT_ICON: ContentIconName = 'award'

export const resolveIcon = (name: string): LucideIcon =>
  contentIcons[name as ContentIconName] ?? contentIcons[DEFAULT_CONTENT_ICON]
