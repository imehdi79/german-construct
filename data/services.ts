import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "fliesenarbeiten",
    title: "Fliesenarbeiten",
    shortDescription: "Präzise Verlegung hochwertiger Fliesen für Bad, Küche und Wohnbereich.",
    description:
      "Wir verlegen Fliesen aller Art mit höchster Präzision und Sorgfalt. Ob großformatige Bodenfliesen, filigrane Mosaike oder elegante Wandfliesen – unser Team beherrscht jede Technik. Wir arbeiten mit modernsten Werkzeugen und verwenden ausschließlich qualitativ hochwertige Materialien für ein dauerhaftes Ergebnis.",
    icon: "grid-3x3",
    features: [
      "Groß- und Kleinformatige Fliesen",
      "Mosaikarbeiten & Dekorstreifen",
      "Gefälle- & Nassbereich-Verlegung",
      "Beheizter Boden (Fußbodenheizung)",
      "Farbige Verfugung nach Wunsch",
      "Präzise Schneidarbeiten",
    ],
    href: "/leistungen#fliesenarbeiten",
  },
  {
    id: "natursteinarbeiten",
    title: "Natursteinarbeiten",
    shortDescription: "Edle Natursteine in exklusiver Verarbeitung – Marmor, Granit, Travertin und mehr.",
    description:
      "Naturstein verleiht jedem Raum eine zeitlose Eleganz. Wir verfügen über umfangreiche Erfahrung in der Verarbeitung von Marmor, Granit, Travertin, Schiefer und anderen Naturmaterialien. Jeder Stein wird individuell betrachtet und mit dem nötigen Fachverständnis verarbeitet, um seine natürliche Schönheit optimal zur Geltung zu bringen.",
    icon: "gem",
    features: [
      "Marmor, Granit & Travertin",
      "Schiefer & Kalkstein",
      "Naturstein-Oberflächen-Behandlung",
      "Steinrestaurierung & Politur",
      "Maßgeschneiderte Waschtische",
      "Naturstein-Treppen & -Böden",
    ],
    href: "/leistungen#natursteinarbeiten",
  },
  {
    id: "verfugungen",
    title: "Verfugungen",
    shortDescription: "Professionelle Verfugung für wasserdichte und ästhetische Fugenbilder.",
    description:
      "Verfugungen sind mehr als nur Lückenfüller – sie sind ein wesentlicher Teil des Gesamtbildes und schützen den Untergrund vor Feuchtigkeit. Wir verfügen über umfangreiches Know-how bei der Auswahl des richtigen Fugenmaterials und der präzisen Ausführung, um ein sauberes und langlebiges Ergebnis zu erzielen.",
    icon: "pencil-ruler",
    features: [
      "Keramik- & Natursteinfugen",
      "Silikonarbeiten im Nassbereich",
      "Fugen-Sanierung & Erneuerung",
      "Fugenmörtel in allen Farben",
      "Dehnungsfugen & Bewegungsfugen",
      "Hygienegeprüfte Materialien",
    ],
    href: "/leistungen#verfugungen",
  },
  {
    id: "sanierungen",
    title: "Trockenbauarbeiten",
    shortDescription: "Erstellung, Begradigung und Vorbereitung von Wand- und Deckenflächen.",
    description:
      "Ein perfektes Endergebnis beginnt mit dem richtigen Untergrund. Wir übernehmen für Sie die fachgerechten Trockenbauarbeiten, um Ihre Räume optimal zu gestalten und perfekt für die nachfolgenden Beläge vorzubereiten. Ob neue Raumaufteilungen, das Verkleiden von Rohren oder das Begradigen von Wänden – wir schaffen stabile, gerade und saubere Oberflächen.",
    icon: "construction",
    features: [
      "Stellwände & Raumaufteilung",
      "Verkleidung von Sanitär- & Rohrleitungen",
      "Untergrundbegradigung mit Gipskarton",
      "Feuchtraum-Trockenbau (Bad & Dusche)",
      "Abhängen von Decken",
    ],
    href: "/leistungen#sanierungen",
  },
];
