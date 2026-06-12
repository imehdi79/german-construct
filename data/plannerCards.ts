import type { PlannerCard } from '@/types'

/**
 * Default project-planner cards. Each card's `id` matches a form-schema key in
 * `components/Form-Builder/schemas`. Editable via the admin (content store).
 */
export const plannerCards: PlannerCard[] = [
  {
    id: 'Bodenarbeiten',
    title: 'Bodenarbeiten',
    description: 'Neuer Bodenbelag – Fliesen, Vinyl, Laminat & mehr, fachgerecht verlegt.',
    icon: 'layers',
  },
  {
    id: 'Estricharbeiten',
    title: 'Estricharbeiten',
    description: 'Ebene, tragfähige Estriche als perfekte Basis für Ihren Bodenbelag.',
    icon: 'hammer',
  },
  {
    id: 'Fliesenarbeiten',
    title: 'Fliesenarbeiten',
    description: 'Hochwertige Fliesen für Bad, Küche, Wohnraum und Außenbereiche.',
    icon: 'grid-3x3',
  },
  {
    id: 'Fugenarbeiten',
    title: 'Fugenarbeiten',
    description: 'Präzise Verfugung für wasserdichte und ästhetische Fugenbilder.',
    icon: 'pencil-ruler',
  },
  {
    id: 'Fußbodenheizung',
    title: 'Fußbodenheizung',
    description: 'Elektrische oder wasserführende Fußbodenheizung – effizient eingebaut.',
    icon: 'flame',
  },
  {
    id: 'Natursteinarbeiten',
    title: 'Natursteinarbeiten',
    description: 'Edle Natursteine – Marmor, Granit, Travertin – fachgerecht verarbeitet.',
    icon: 'gem',
  },
]
