import type { PlannerCard } from '@/types'

/**
 * Hardcoded project-planner cards. Each card's `id` matches a form-schema
 * key in data/formSchemas.ts.
 */
export const plannerCards: PlannerCard[] = [
  {
    "id": "Fliesenarbeiten",
    "title": "Fliesenarbeiten",
    "description": "Hochwertige Fliesen für Bad, Küche, Wohnraum und Außenbereiche.",
    "icon": "grid-3x3"
  },
  {
    "id": "Fugenarbeiten",
    "title": "Fugenarbeiten",
    "description": "Exakte Fugenarbeit, die Ihrem Raum den perfekten Rahmen gibt.",
    "icon": "pencil-ruler"
  },
  {
    "id": "Natursteinarbeiten",
    "title": "Natursteinarbeiten",
    "description": "Edle Natursteine – Marmor, Granit, Travertin – fachgerecht verarbeitet.",
    "icon": "gem"
  }
]
