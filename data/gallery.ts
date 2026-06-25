import type { GalleryItem } from '@/types'

export const galleryItems: GalleryItem[] = [
  {
    "id": "1",
    "title": "Elegantes Badezimmer mit Travertin",
    "category": "bad",
    "image": "/gallery/bad-travertin.jpg",
    "width": 800,
    "height": 1000,
    "description": "Luxuriöses Badezimmer mit Travertin-Fliesen in warmen Erdtönen"
  },
  {
    "id": "2",
    "title": "Granit-Wohnzimmerboden",
    "category": "boden",
    "image": "/gallery/boden-granit.jpg",
    "width": 1200,
    "height": 800,
    "description": "Großformatige Granitplatten 120×120 cm im offenen Wohnbereich"
  },
  {
    "id": "3",
    "title": "Naturstein-Terrasse",
    "category": "terrasse",
    "image": "/gallery/terrasse-naturstein.jpg",
    "width": 1200,
    "height": 900,
    "description": "Terrassengestaltung mit frostsicheren Kalkstein-Platten"
  },
  {
    "id": "4",
    "title": "Modernes Duschbad",
    "category": "bad",
    "image": "/gallery/bad-modern.jpg",
    "width": 800,
    "height": 1000,
    "description": "Ebenerdige Dusche mit gefliesten Nischen und Regenduschelement"
  },
  {
    "id": "5",
    "title": "Marmor Eingangsbereich",
    "category": "naturstein",
    "image": "/gallery/eingang-marmor.jpg",
    "width": 900,
    "height": 1100,
    "description": "Repräsentativer Eingangsbereich mit Carrara-Marmor und goldenen Akzenten"
  },
  {
    "id": "6",
    "title": "Fliesen-Küchenspiegel",
    "category": "fliesen",
    "image": "/gallery/kueche-fliesen.jpg",
    "width": 1000,
    "height": 750,
    "description": "Handgefertigte Metrofliesen als Küchenrückwand in zartem Grau"
  },
  {
    "id": "7",
    "title": "Pool-Umrandung",
    "category": "terrasse",
    "image": "/gallery/pool-fliesen.jpg",
    "width": 1200,
    "height": 800,
    "description": "Rutschhemmende Naturstein-Umrandung für den Außenpool"
  },
  {
    "id": "8",
    "title": "Wellness-Sauna-Bereich",
    "category": "naturstein",
    "image": "/gallery/sauna-stein.jpg",
    "width": 800,
    "height": 1000,
    "description": "Hochwertige Naturstein-Wandverkleidung im privaten Saunabereich"
  },
  {
    "id": "9",
    "title": "Großformat-Fliesen Flur",
    "category": "fliesen",
    "image": "/gallery/flur-grossformat.jpg",
    "width": 900,
    "height": 1100,
    "description": "Großformatige Feinsteinzeug-Fliesen 80×160 cm im langen Hausflur"
  },
  {
    "id": "10",
    "title": "Außenbereich Restaurant",
    "category": "terrasse",
    "image": "/gallery/restaurant-terrasse.jpg",
    "width": 1200,
    "height": 850,
    "description": "Gewerbliche Terrassenfläche mit rutschhemmenden Keramikplatten"
  },
  {
    "id": "11",
    "title": "Mosaik-Wandgestaltung",
    "category": "fliesen",
    "image": "/gallery/mosaik-wand.jpg",
    "width": 800,
    "height": 1000,
    "description": "Individuell gestalteter Mosaikfries in einem Hotellobbybad"
  },
  {
    "id": "12",
    "title": "Kalkstein-Wohnzimmer",
    "category": "naturstein",
    "image": "/gallery/wohnzimmer-kalkstein.jpg",
    "width": 1200,
    "height": 800,
    "description": "Heller Kalksteinboden bringt mediterrane Wärme ins Wohnzimmer"
  },
  {
    "id": "bild-1781215722140",
    "title": "Neues Bild",
    "category": "fliesen",
    "image": "/gallery/bad-modern.jpg",
    "width": 800,
    "height": 1000,
    "description": ""
  }
]

export const galleryCategories = [
  { value: 'alle', label: 'Alle Projekte' },
  { value: 'bad', label: 'Bad & Wellness' },
  { value: 'boden', label: 'Böden' },
  { value: 'fliesen', label: 'Fliesen' },
  { value: 'naturstein', label: 'Naturstein' },
  { value: 'terrasse', label: 'Terrasse' },
] as const
