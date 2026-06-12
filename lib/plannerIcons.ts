import {
  Layers,
  Hammer,
  Grid3X3,
  PencilRuler,
  Flame,
  Gem,
  Construction,
  Sun,
  Paintbrush,
  Ruler,
  Wrench,
  Home,
  Droplets,
  Blocks,
  Thermometer,
  Square,
  Package,
  Mountain,
  Brush,
  type LucideIcon,
} from 'lucide-react'

/**
 * Curated set of icons available for project-planner cards. Cards store the
 * icon as a string name (kebab-case) so it can live in the JSON content store;
 * this map resolves the name back to a Lucide component for rendering.
 */
export const plannerIcons = {
  layers: Layers,
  hammer: Hammer,
  'grid-3x3': Grid3X3,
  'pencil-ruler': PencilRuler,
  flame: Flame,
  gem: Gem,
  construction: Construction,
  sun: Sun,
  paintbrush: Paintbrush,
  ruler: Ruler,
  wrench: Wrench,
  home: Home,
  droplets: Droplets,
  blocks: Blocks,
  thermometer: Thermometer,
  square: Square,
  package: Package,
  mountain: Mountain,
  brush: Brush,
} satisfies Record<string, LucideIcon>

export type PlannerIconName = keyof typeof plannerIcons

export const plannerIconNames = Object.keys(plannerIcons) as PlannerIconName[]

export const DEFAULT_PLANNER_ICON: PlannerIconName = 'layers'

/** Resolve a stored icon name to a Lucide component, falling back to a default. */
export const resolvePlannerIcon = (name: string): LucideIcon =>
  plannerIcons[name as PlannerIconName] ?? plannerIcons[DEFAULT_PLANNER_ICON]
