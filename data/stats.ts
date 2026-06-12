import type { Stat } from '@/types'

export const stats: Stat[] = [
  {
    value: 100,
    suffix: '%',
    label: 'Festpreisgarantie',
    description: 'Verbindliche Angebote ohne versteckte Kosten',
  },
  {
    value: 5,
    suffix: ' Jahre',
    label: 'Gewährleistung',
    description: 'Auf unsere Verlege- und Verfugungsarbeiten',
  },
  {
    value: 24,
    suffix: 'h',
    label: 'Schnelle Rückmeldung',
    description: 'Antwort auf Ihre Anfrage werktags',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Meisterqualität',
    description: 'Jedes Projekt vom Meister abgenommen',
  },
]

export const projectCards = [
  {
    id: 'erdarbeiten',
    title: 'Erdarbeiten',
    description: 'Vorbereitung des Untergrunds für Fundamente und Bodenbeläge.',
    icon: 'shovel',
    color: 'bg-stone-100',
  },
  {
    id: 'estricharbeiten',
    title: 'Estricharbeiten',
    description: 'Ebene und tragfähige Estriche als perfekte Basis für Ihren Bodenbelag.',
    icon: 'layers',
    color: 'bg-amber-50',
  },
  {
    id: 'fliesenarbeiten',
    title: 'Fliesenarbeiten',
    description: 'Hochwertige Fliesenverlegung für Bad, Küche, Wohnraum und Außenbereiche.',
    icon: 'grid-3x3',
    color: 'bg-stone-100',
  },
  {
    id: 'verfugungsarbeiten',
    title: 'Verfugungsarbeiten',
    description: 'Präzise Verfugung für wasserdichte und ästhetische Fugenbilder.',
    icon: 'pencil-ruler',
    color: 'bg-amber-50',
  },
  {
    id: 'natursteinarbeiten',
    title: 'Natursteinarbeiten',
    description: 'Edle Natursteine – Marmor, Granit, Travertin – fachgerecht verarbeitet.',
    icon: 'gem',
    color: 'bg-stone-100',
  },
  {
    id: 'individuelle-anfrage',
    title: 'Individuelle Anfrage',
    description: 'Haben Sie ein besonderes Projekt? Sprechen Sie uns direkt an.',
    icon: 'message-circle',
    color: 'bg-aman-gold/10',
  },
]
