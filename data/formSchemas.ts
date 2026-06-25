import type { FormSchemasContent } from '@/types'

/** Hardcoded project-planner form schemas, keyed by planner-card id. */
export const formSchemas: FormSchemasContent = {
  "Fliesenarbeiten": [
    {
      "id": "fb-mqc5ivua-tcta",
      "title": "Räume auswählen",
      "fields": [
        {
          "id": "fb-mqc5ivua-assu",
          "type": "checkbox",
          "label": "In welchen Räumen sollen Fliesen verlegt werden?",
          "required": true,
          "options": [
            {
              "label": "Bad",
              "value": "Bad"
            },
            {
              "label": "WC",
              "value": "WC"
            },
            {
              "label": "Wohnzimmer",
              "value": "Wohnzimmer"
            },
            {
              "label": "Treppe",
              "value": "Treppe"
            },
            {
              "label": "Keller",
              "value": "Keller"
            },
            {
              "label": "Balkon/Terrasse",
              "value": "Balkon/Terrasse"
            },
            {
              "label": "Sonstiges",
              "value": "Sonstiges",
              "hasNote": true
            }
          ]
        }
      ]
    },
    {
      "id": "fb-54",
      "title": "Was soll gefliest werden?",
      "fields": [
        {
          "id": "Was soll gefliest werden?",
          "label": "",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "Boden",
              "value": "Boden"
            },
            {
              "label": "Wand",
              "value": "Wand"
            },
            {
              "label": "Dusche",
              "value": "Dusche"
            },
            {
              "label": "Treppe",
              "value": "Treppe"
            },
            {
              "label": "Sonstiges",
              "value": "Sonstiges",
              "hasNote": true
            }
          ]
        }
      ]
    },
    {
      "id": "fb-55",
      "title": "Welches Fliesenformat ist gewünscht?",
      "fields": [
        {
          "id": "Welche Fliesenart ist geplant?",
          "label": "",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "Kleinformat / Mosaik (bis 10 x 10 cm)",
              "value": "Kleinformat / Mosaik (bis 10 x 10 cm)"
            },
            {
              "label": "Standardformat (z. B. 30 x 60 cm oder 60 x 60 cm)",
              "value": "Standardformat (z. B. 30 x 60 cm oder 60 x 60 cm)"
            },
            {
              "label": "Großformat (z. B. 80 x 80 cm oder 120 x 60 cm)",
              "value": "Großformat (z. B. 80 x 80 cm oder 120 x 60 cm)"
            },
            {
              "label": "XXL-Großformat / Megaslabs (ab 120 x 120 cm oder 100 x 300 cm)",
              "value": "XXL-Großformat / Megaslabs (ab 120 x 120 cm oder 100 x 300 cm)"
            },
            {
              "label": "Riegel- / Dielenformat (z. B. Fliesen in Holzoptik, 20 x 120 cm)",
              "value": "Riegel- / Dielenformat (z. B. Fliesen in Holzoptik, 20 x 120 cm)"
            },
            {
              "label": "Ich bin mir noch unsicher / Beratung gewünscht",
              "value": "Ich bin mir noch unsicher / Beratung gewünscht"
            }
          ]
        }
      ]
    },
    {
      "id": "fb-56",
      "title": "Müssen alte Fliesen entfernt werden?",
      "fields": [
        {
          "id": "Müssen alte Fliesen entfernt werden?",
          "label": "",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "Ja",
              "value": "Ja"
            },
            {
              "label": "Nein",
              "value": "Nein"
            }
          ]
        }
      ]
    },
    {
      "id": "fb-57",
      "title": "Wie groß ist die zu fliesende Fläche?",
      "fields": [
        {
          "id": "Wie groß ist die zu fliesende Fläche?",
          "label": "",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "Unter 5 m²",
              "value": "Unter 5 m²"
            },
            {
              "label": "5–15 m²",
              "value": "5–15 m²"
            },
            {
              "label": "Über 20 m²",
              "value": "Über 20 m²"
            },
            {
              "label": "Ungefähr (bitte angeben)",
              "value": "Ungefähr (bitte angeben)",
              "hasNote": true
            }
          ]
        }
      ]
    },
    {
      "id": "fb-58",
      "title": "Bitte beschreiben Sie Ihren Auftrag:",
      "description": "Je mehr Details Sie angeben, desto besser können wir ein passendes Angebot für Sie erstellen.",
      "fields": [
        {
          "id": "Bitte beschreiben Sie Ihren Auftrag:",
          "label": "",
          "type": "textarea",
          "description": "Was soll erledigt werden? Welches Budget haben Sie eingeplant? Geben Sie gerne Informationen zu Vorarbeiten, Geräteherstellern oder Förderungen an."
        }
      ]
    },
    {
      "id": "fb-59",
      "title": "In welchem Budgetrahmen bewegt sich Ihr Projekt?",
      "fields": [
        {
          "id": "In welchem Budgetrahmen bewegt sich Ihr Projekt?",
          "label": "",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "Unter 1.000 €",
              "value": "Unter 1.000 €"
            },
            {
              "label": "1.000 – 5.000 €",
              "value": "1.000 - 5.000 €"
            },
            {
              "label": "5.000 – 10.000 €",
              "value": "5.000 - 10.000 €"
            },
            {
              "label": "10.000 – 25.000 €",
              "value": "10.000 - 25.000 €"
            },
            {
              "label": "25.000 – 50.000 €",
              "value": "25.000 - 50.000 €"
            },
            {
              "label": "Über 50.000 €",
              "value": "Über 50.000 €"
            },
            {
              "label": "Noch kein Budget festgelegt",
              "value": "Noch kein Budget festgelegt"
            },
            {
              "label": "Möchte erst beraten werden",
              "value": "Möchte erst einmal beraten werden"
            }
          ]
        }
      ]
    },
    {
      "id": "fb-60",
      "title": "Anhänge (optional)",
      "fields": [
        {
          "id": "Anhänge (optional)",
          "label": "Ihre Anfrage erhält eine genauere Einschätzung, wenn Sie relevante Bilder oder Pläne anfügen.",
          "type": "dropzone",
          "accept": "image/*,application/pdf"
        }
      ]
    },
    {
      "id": "fb-61",
      "title": "Wann soll die Arbeit durchgeführt werden?",
      "mutex": true,
      "fields": [
        {
          "id": "Wann soll die Arbeit durchgeführt werden?",
          "label": "Zeitraum wählen",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "So schnell wie möglich",
              "value": "So schnell wie möglich"
            },
            {
              "label": "Im nächsten Monat",
              "value": "Im nächsten Monat"
            },
            {
              "label": "In den nächsten 3 Monaten",
              "value": "In den nächsten 3 Monaten"
            },
            {
              "label": "Ich weiß es noch nicht",
              "value": "Ich weiß es noch nicht"
            }
          ]
        },
        {
          "id": "Wunschtermin",
          "label": "Konkretes Datum",
          "type": "date",
          "required": true
        }
      ]
    },
    {
      "id": "fb-62",
      "title": "Wo befindet sich der Auftragsort?",
      "fields": [
        {
          "id": "Wo befindet sich der Auftragsort?",
          "label": "",
          "type": "autocomplete",
          "required": true,
          "options": [
            {
              "label": "Aachen",
              "value": "Aachen"
            },
            {
              "label": "Aalen",
              "value": "Aalen"
            },
            {
              "label": "Augsburg",
              "value": "Augsburg"
            },
            {
              "label": "Bad Homburg",
              "value": "Bad Homburg"
            },
            {
              "label": "Bamberg",
              "value": "Bamberg"
            },
            {
              "label": "Bayreuth",
              "value": "Bayreuth"
            },
            {
              "label": "Bergisch Gladbach",
              "value": "Bergisch Gladbach"
            },
            {
              "label": "Berlin",
              "value": "Berlin"
            },
            {
              "label": "Bielefeld",
              "value": "Bielefeld"
            },
            {
              "label": "Bocholt",
              "value": "Bocholt"
            },
            {
              "label": "Bochum",
              "value": "Bochum"
            },
            {
              "label": "Bonn",
              "value": "Bonn"
            },
            {
              "label": "Bottrop",
              "value": "Bottrop"
            },
            {
              "label": "Brandenburg an der Havel",
              "value": "Brandenburg an der Havel"
            },
            {
              "label": "Braunschweig",
              "value": "Braunschweig"
            },
            {
              "label": "Bremen",
              "value": "Bremen"
            },
            {
              "label": "Bremerhaven",
              "value": "Bremerhaven"
            },
            {
              "label": "Chemnitz",
              "value": "Chemnitz"
            },
            {
              "label": "Cottbus",
              "value": "Cottbus"
            },
            {
              "label": "Darmstadt",
              "value": "Darmstadt"
            },
            {
              "label": "Dessau-Roßlau",
              "value": "Dessau-Roßlau"
            },
            {
              "label": "Dillingen an der Donau",
              "value": "Dillingen an der Donau"
            },
            {
              "label": "Dortmund",
              "value": "Dortmund"
            },
            {
              "label": "Dresden",
              "value": "Dresden"
            },
            {
              "label": "Duisburg",
              "value": "Duisburg"
            },
            {
              "label": "Düren",
              "value": "Düren"
            },
            {
              "label": "Düsseldorf",
              "value": "Düsseldorf"
            },
            {
              "label": "Erfurt",
              "value": "Erfurt"
            },
            {
              "label": "Erlangen",
              "value": "Erlangen"
            },
            {
              "label": "Esslingen am Neckar",
              "value": "Esslingen am Neckar"
            },
            {
              "label": "Flensburg",
              "value": "Flensburg"
            },
            {
              "label": "Frankfurt am Main",
              "value": "Frankfurt am Main"
            },
            {
              "label": "Freiburg im Breisgau",
              "value": "Freiburg im Breisgau"
            },
            {
              "label": "Friedrichshafen",
              "value": "Friedrichshafen"
            },
            {
              "label": "Fürth",
              "value": "Fürth"
            },
            {
              "label": "Gelsenkirchen",
              "value": "Gelsenkirchen"
            },
            {
              "label": "Gera",
              "value": "Gera"
            },
            {
              "label": "Gießen",
              "value": "Gießen"
            },
            {
              "label": "Göppingen",
              "value": "Göppingen"
            },
            {
              "label": "Görlitz",
              "value": "Görlitz"
            },
            {
              "label": "Göttingen",
              "value": "Göttingen"
            },
            {
              "label": "Günzburg",
              "value": "Günzburg"
            },
            {
              "label": "Gütersloh",
              "value": "Gütersloh"
            },
            {
              "label": "Hagen",
              "value": "Hagen"
            },
            {
              "label": "Halle (Saale)",
              "value": "Halle (Saale)"
            },
            {
              "label": "Hamburg",
              "value": "Hamburg"
            },
            {
              "label": "Hamm",
              "value": "Hamm"
            },
            {
              "label": "Hanau",
              "value": "Hanau"
            },
            {
              "label": "Hannover",
              "value": "Hannover"
            },
            {
              "label": "Heidelberg",
              "value": "Heidelberg"
            },
            {
              "label": "Heidenheim an der Brenz",
              "value": "Heidenheim an der Brenz"
            },
            {
              "label": "Heilbronn",
              "value": "Heilbronn"
            },
            {
              "label": "Herne",
              "value": "Herne"
            },
            {
              "label": "Hildesheim",
              "value": "Hildesheim"
            },
            {
              "label": "Illertissen",
              "value": "Illertissen"
            },
            {
              "label": "Ingolstadt",
              "value": "Ingolstadt"
            },
            {
              "label": "Iserlohn",
              "value": "Iserlohn"
            },
            {
              "label": "Jena",
              "value": "Jena"
            },
            {
              "label": "Kaiserslautern",
              "value": "Kaiserslautern"
            },
            {
              "label": "Karlsruhe",
              "value": "Karlsruhe"
            },
            {
              "label": "Kassel",
              "value": "Kassel"
            },
            {
              "label": "Kaufbeuren",
              "value": "Kaufbeuren"
            },
            {
              "label": "Kempten (Allgäu)",
              "value": "Kempten (Allgäu)"
            },
            {
              "label": "Kiel",
              "value": "Kiel"
            },
            {
              "label": "Koblenz",
              "value": "Koblenz"
            },
            {
              "label": "Köln",
              "value": "Köln"
            },
            {
              "label": "Konstanz",
              "value": "Konstanz"
            },
            {
              "label": "Krefeld",
              "value": "Krefeld"
            },
            {
              "label": "Landshut",
              "value": "Landshut"
            },
            {
              "label": "Leipzig",
              "value": "Leipzig"
            },
            {
              "label": "Leverkusen",
              "value": "Leverkusen"
            },
            {
              "label": "Lindau (Bodensee)",
              "value": "Lindau (Bodensee)"
            },
            {
              "label": "Lübeck",
              "value": "Lübeck"
            },
            {
              "label": "Ludwigsburg",
              "value": "Ludwigsburg"
            },
            {
              "label": "Ludwigshafen am Rhein",
              "value": "Ludwigshafen am Rhein"
            },
            {
              "label": "Lünen",
              "value": "Lünen"
            },
            {
              "label": "Magdeburg",
              "value": "Magdeburg"
            },
            {
              "label": "Mainz",
              "value": "Mainz"
            },
            {
              "label": "Mannheim",
              "value": "Mannheim"
            },
            {
              "label": "Marburg",
              "value": "Marburg"
            },
            {
              "label": "Memmingen",
              "value": "Memmingen"
            },
            {
              "label": "Mindelheim",
              "value": "Mindelheim"
            },
            {
              "label": "Mönchengladbach",
              "value": "Mönchengladbach"
            },
            {
              "label": "Mülheim an der Ruhr",
              "value": "Mülheim an der Ruhr"
            },
            {
              "label": "München",
              "value": "München"
            },
            {
              "label": "Münster",
              "value": "Münster"
            },
            {
              "label": "Neu-Ulm",
              "value": "Neu-Ulm"
            },
            {
              "label": "Neubrandenburg",
              "value": "Neubrandenburg"
            },
            {
              "label": "Neuburg an der Donau",
              "value": "Neuburg an der Donau"
            },
            {
              "label": "Neuss",
              "value": "Neuss"
            },
            {
              "label": "Neustadt an der Weinstraße",
              "value": "Neustadt an der Weinstraße"
            },
            {
              "label": "Nördlingen",
              "value": "Nördlingen"
            },
            {
              "label": "Nürnberg",
              "value": "Nürnberg"
            },
            {
              "label": "Oberhausen",
              "value": "Oberhausen"
            },
            {
              "label": "Offenbach am Main",
              "value": "Offenbach am Main"
            },
            {
              "label": "Offenburg",
              "value": "Offenburg"
            },
            {
              "label": "Oldenburg",
              "value": "Oldenburg"
            },
            {
              "label": "Osnabrück",
              "value": "Osnabrück"
            },
            {
              "label": "Paderborn",
              "value": "Paderborn"
            },
            {
              "label": "Passau",
              "value": "Passau"
            },
            {
              "label": "Pforzheim",
              "value": "Pforzheim"
            },
            {
              "label": "Potsdam",
              "value": "Potsdam"
            },
            {
              "label": "Recklinghausen",
              "value": "Recklinghausen"
            },
            {
              "label": "Regensburg",
              "value": "Regensburg"
            },
            {
              "label": "Remscheid",
              "value": "Remscheid"
            },
            {
              "label": "Reutlingen",
              "value": "Reutlingen"
            },
            {
              "label": "Rosenheim",
              "value": "Rosenheim"
            },
            {
              "label": "Rostock",
              "value": "Rostock"
            },
            {
              "label": "Saarbrücken",
              "value": "Saarbrücken"
            },
            {
              "label": "Salzgitter",
              "value": "Salzgitter"
            },
            {
              "label": "Schwäbisch Gmünd",
              "value": "Schwäbisch Gmünd"
            },
            {
              "label": "Schweinfurt",
              "value": "Schweinfurt"
            },
            {
              "label": "Senden",
              "value": "Senden"
            },
            {
              "label": "Siegen",
              "value": "Siegen"
            },
            {
              "label": "Sindelfingen",
              "value": "Sindelfingen"
            },
            {
              "label": "Solingen",
              "value": "Solingen"
            },
            {
              "label": "Stuttgart",
              "value": "Stuttgart"
            },
            {
              "label": "Trier",
              "value": "Trier"
            },
            {
              "label": "Tübingen",
              "value": "Tübingen"
            },
            {
              "label": "Ulm",
              "value": "Ulm"
            },
            {
              "label": "Villingen-Schwenningen",
              "value": "Villingen-Schwenningen"
            },
            {
              "label": "Weiden in der Oberpfalz",
              "value": "Weiden in der Oberpfalz"
            },
            {
              "label": "Weingarten",
              "value": "Weingarten"
            },
            {
              "label": "Wiesbaden",
              "value": "Wiesbaden"
            },
            {
              "label": "Wolfsburg",
              "value": "Wolfsburg"
            },
            {
              "label": "Worms",
              "value": "Worms"
            },
            {
              "label": "Wuppertal",
              "value": "Wuppertal"
            },
            {
              "label": "Würzburg",
              "value": "Würzburg"
            },
            {
              "label": "Zwickau",
              "value": "Zwickau"
            },
            {
              "label": "Sonstiger Ort",
              "value": "Sonstiger Ort"
            }
          ]
        }
      ]
    },
    {
      "id": "fb-63",
      "title": "Ihre Kontaktdaten",
      "description": "Damit wir Ihre Anfrage bearbeiten und ein passendes Angebot erstellen können, benötigen wir Ihre Kontaktinformationen. Pflichtfelder sind mit einem Sternchen (*) gekennzeichnet.",
      "fields": [
        {
          "id": "Anrede",
          "label": "Anrede *",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "Herr",
              "value": "Herr"
            },
            {
              "label": "Frau",
              "value": "Frau"
            },
            {
              "label": "Divers / keine Anrede",
              "value": "Divers/keine Anrede"
            }
          ]
        },
        {
          "id": "Vorname",
          "label": "Vorname *",
          "type": "text",
          "description": "Ihr Vorname",
          "required": true
        },
        {
          "id": "Nachname",
          "label": "Nachname *",
          "type": "text",
          "description": "Ihr Nachname",
          "required": true
        },
        {
          "id": "E-Mail Adresse",
          "label": "E-Mail-Adresse *",
          "type": "text",
          "description": "z. B. ihre@email.de",
          "required": true,
          "validation": {
            "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            "patternMessage": "Bitte geben Sie eine gültige E-Mail-Adresse ein."
          }
        },
        {
          "id": "Telefonnummer",
          "label": "Telefonnummer *",
          "type": "text",
          "description": "z. B. +49 30 123456",
          "required": true
        },
        {
          "id": "Handynummer",
          "label": "Mobilnummer",
          "type": "text",
          "description": "z. B. +49 170 123456"
        },
        {
          "id": "fb-64",
          "label": "Bevorzugter Kontaktweg *",
          "type": "label"
        },
        {
          "id": "fb-65",
          "label": "Wir werden Sie vorrangig über diesen Weg kontaktieren. Im Bedarfsfall können wir auch alternative Kanäle nutzen, um eine schnelle Bearbeitung Ihrer Anfrage sicherzustellen.",
          "type": "label",
          "variant": "subtitle"
        },
        {
          "id": "Bevorzugte Kontaktmethode",
          "label": "Bevorzugter Kontaktweg *",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "E-Mail",
              "value": "E-Mail"
            },
            {
              "label": "Telefon",
              "value": "Telefon"
            },
            {
              "label": "WhatsApp (Nachricht)",
              "value": "WhatsApp (Nachricht)"
            }
          ]
        },
        {
          "id": "fb-66",
          "label": "Wann möchten Sie kontaktiert werden? *",
          "type": "label"
        },
        {
          "id": "Wann möchten Sie kontaktiert werden?",
          "label": "Erreichbarkeit *",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "Vormittags (09:00 – 12:00 Uhr)",
              "value": "Vormittags (09:00 - 12:00 Uhr)"
            },
            {
              "label": "Nachmittags (12:00 – 16:00 Uhr)",
              "value": "Nachmittags (12:00 - 16:00 Uhr)"
            },
            {
              "label": "Abends (16:00 – 19:00 Uhr)",
              "value": "Abends (16:00 - 19:00 Uhr)"
            }
          ]
        }
      ]
    }
  ],
  "Fugenarbeiten": [
    {
      "id": "fb-14",
      "title": "Welches Fugenmaterial wird verwendet?",
      "fields": [
        {
          "id": "Welches Fugenmaterial wird verwendet?",
          "label": "",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "Silikon",
              "value": "Silikon"
            },
            {
              "label": "Zement",
              "value": "Zement"
            },
            {
              "label": "Epoxidharz",
              "value": "Epoxidharz"
            },
            {
              "label": "Sonstiges",
              "value": "Sonstiges",
              "hasNote": true
            }
          ]
        }
      ]
    },
    {
      "id": "fb-15",
      "title": "Müssen alte Fugen entfernt werden?",
      "fields": [
        {
          "id": "Müssen alte Fugen entfernt werden?",
          "label": "",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "Ja",
              "value": "Ja"
            },
            {
              "label": "Nein",
              "value": "Nein"
            }
          ]
        }
      ]
    },
    {
      "id": "fb-16",
      "title": "In welchem Bereich befinden sich die Fugen?",
      "fields": [
        {
          "id": "In welchem Bereich befinden sich die Fugen?",
          "label": "",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "Bad",
              "value": "Bad"
            },
            {
              "label": "Küche",
              "value": "Küche"
            },
            {
              "label": "Boden",
              "value": "Boden"
            },
            {
              "label": "Außenbereich",
              "value": "Außenbereich"
            },
            {
              "label": "Sonstiges",
              "value": "Sonstiges",
              "hasNote": true
            }
          ]
        }
      ]
    },
    {
      "id": "fb-17",
      "title": "Welche Fläche soll bearbeitet werden?",
      "fields": [
        {
          "id": "Welche Fläche soll bearbeitet werden?",
          "label": "",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "Unter 5 m²",
              "value": "Unter 5 m²"
            },
            {
              "label": "5–20 m²",
              "value": "5–20 m²"
            },
            {
              "label": "Über 20 m²",
              "value": "Über 20 m²"
            },
            {
              "label": "Ungefähr (bitte angeben)",
              "value": "Ungefähr (bitte angeben)",
              "hasNote": true
            }
          ]
        }
      ]
    },
    {
      "id": "fb-18",
      "title": "Bitte beschreiben Sie Ihren Auftrag:",
      "description": "Je mehr Details Sie angeben, desto besser können wir ein passendes Angebot für Sie erstellen.",
      "fields": [
        {
          "id": "Bitte beschreiben Sie Ihren Auftrag:",
          "label": "",
          "type": "textarea",
          "description": "Was soll erledigt werden? Welches Budget haben Sie eingeplant? Geben Sie gerne Informationen zu Vorarbeiten, Geräteherstellern oder Förderungen an."
        }
      ]
    },
    {
      "id": "fb-19",
      "title": "In welchem Budgetrahmen bewegt sich Ihr Projekt?",
      "fields": [
        {
          "id": "In welchem Budgetrahmen bewegt sich Ihr Projekt?",
          "label": "",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "Unter 1.000 €",
              "value": "Unter 1.000 €"
            },
            {
              "label": "1.000 – 5.000 €",
              "value": "1.000 - 5.000 €"
            },
            {
              "label": "5.000 – 10.000 €",
              "value": "5.000 - 10.000 €"
            },
            {
              "label": "10.000 – 25.000 €",
              "value": "10.000 - 25.000 €"
            },
            {
              "label": "25.000 – 50.000 €",
              "value": "25.000 - 50.000 €"
            },
            {
              "label": "Über 50.000 €",
              "value": "Über 50.000 €"
            },
            {
              "label": "Noch kein Budget festgelegt",
              "value": "Noch kein Budget festgelegt"
            },
            {
              "label": "Möchte erst beraten werden",
              "value": "Möchte erst einmal beraten werden"
            }
          ]
        }
      ]
    },
    {
      "id": "fb-20",
      "title": "Anhänge (optional)",
      "fields": [
        {
          "id": "Anhänge (optional)",
          "label": "Ihre Anfrage erhält eine genauere Einschätzung, wenn Sie relevante Bilder oder Pläne anfügen.",
          "type": "dropzone",
          "accept": "image/*,application/pdf"
        }
      ]
    },
    {
      "id": "fb-21",
      "title": "Wann soll die Arbeit durchgeführt werden?",
      "mutex": true,
      "fields": [
        {
          "id": "Wann soll die Arbeit durchgeführt werden?",
          "label": "Zeitraum wählen",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "So schnell wie möglich",
              "value": "So schnell wie möglich"
            },
            {
              "label": "Im nächsten Monat",
              "value": "Im nächsten Monat"
            },
            {
              "label": "In den nächsten 3 Monaten",
              "value": "In den nächsten 3 Monaten"
            },
            {
              "label": "Ich weiß es noch nicht",
              "value": "Ich weiß es noch nicht"
            }
          ]
        },
        {
          "id": "Wunschtermin",
          "label": "Konkretes Datum",
          "type": "date",
          "required": true
        }
      ]
    },
    {
      "id": "fb-22",
      "title": "Wo befindet sich der Auftragsort?",
      "description": "Für die Suche nach Fachbetrieben in Ihrer Nähe.",
      "fields": [
        {
          "id": "Wo befindet sich der Auftragsort?",
          "label": "",
          "type": "autocomplete",
          "required": true,
          "options": [
            {
              "label": "Aachen",
              "value": "Aachen"
            },
            {
              "label": "Aalen",
              "value": "Aalen"
            },
            {
              "label": "Augsburg",
              "value": "Augsburg"
            },
            {
              "label": "Bad Homburg",
              "value": "Bad Homburg"
            },
            {
              "label": "Bamberg",
              "value": "Bamberg"
            },
            {
              "label": "Bayreuth",
              "value": "Bayreuth"
            },
            {
              "label": "Bergisch Gladbach",
              "value": "Bergisch Gladbach"
            },
            {
              "label": "Berlin",
              "value": "Berlin"
            },
            {
              "label": "Bielefeld",
              "value": "Bielefeld"
            },
            {
              "label": "Bocholt",
              "value": "Bocholt"
            },
            {
              "label": "Bochum",
              "value": "Bochum"
            },
            {
              "label": "Bonn",
              "value": "Bonn"
            },
            {
              "label": "Bottrop",
              "value": "Bottrop"
            },
            {
              "label": "Brandenburg an der Havel",
              "value": "Brandenburg an der Havel"
            },
            {
              "label": "Braunschweig",
              "value": "Braunschweig"
            },
            {
              "label": "Bremen",
              "value": "Bremen"
            },
            {
              "label": "Bremerhaven",
              "value": "Bremerhaven"
            },
            {
              "label": "Chemnitz",
              "value": "Chemnitz"
            },
            {
              "label": "Cottbus",
              "value": "Cottbus"
            },
            {
              "label": "Darmstadt",
              "value": "Darmstadt"
            },
            {
              "label": "Dessau-Roßlau",
              "value": "Dessau-Roßlau"
            },
            {
              "label": "Dillingen an der Donau",
              "value": "Dillingen an der Donau"
            },
            {
              "label": "Dortmund",
              "value": "Dortmund"
            },
            {
              "label": "Dresden",
              "value": "Dresden"
            },
            {
              "label": "Duisburg",
              "value": "Duisburg"
            },
            {
              "label": "Düren",
              "value": "Düren"
            },
            {
              "label": "Düsseldorf",
              "value": "Düsseldorf"
            },
            {
              "label": "Erfurt",
              "value": "Erfurt"
            },
            {
              "label": "Erlangen",
              "value": "Erlangen"
            },
            {
              "label": "Esslingen am Neckar",
              "value": "Esslingen am Neckar"
            },
            {
              "label": "Flensburg",
              "value": "Flensburg"
            },
            {
              "label": "Frankfurt am Main",
              "value": "Frankfurt am Main"
            },
            {
              "label": "Freiburg im Breisgau",
              "value": "Freiburg im Breisgau"
            },
            {
              "label": "Friedrichshafen",
              "value": "Friedrichshafen"
            },
            {
              "label": "Fürth",
              "value": "Fürth"
            },
            {
              "label": "Gelsenkirchen",
              "value": "Gelsenkirchen"
            },
            {
              "label": "Gera",
              "value": "Gera"
            },
            {
              "label": "Gießen",
              "value": "Gießen"
            },
            {
              "label": "Göppingen",
              "value": "Göppingen"
            },
            {
              "label": "Görlitz",
              "value": "Görlitz"
            },
            {
              "label": "Göttingen",
              "value": "Göttingen"
            },
            {
              "label": "Günzburg",
              "value": "Günzburg"
            },
            {
              "label": "Gütersloh",
              "value": "Gütersloh"
            },
            {
              "label": "Hagen",
              "value": "Hagen"
            },
            {
              "label": "Halle (Saale)",
              "value": "Halle (Saale)"
            },
            {
              "label": "Hamburg",
              "value": "Hamburg"
            },
            {
              "label": "Hamm",
              "value": "Hamm"
            },
            {
              "label": "Hanau",
              "value": "Hanau"
            },
            {
              "label": "Hannover",
              "value": "Hannover"
            },
            {
              "label": "Heidelberg",
              "value": "Heidelberg"
            },
            {
              "label": "Heidenheim an der Brenz",
              "value": "Heidenheim an der Brenz"
            },
            {
              "label": "Heilbronn",
              "value": "Heilbronn"
            },
            {
              "label": "Herne",
              "value": "Herne"
            },
            {
              "label": "Hildesheim",
              "value": "Hildesheim"
            },
            {
              "label": "Illertissen",
              "value": "Illertissen"
            },
            {
              "label": "Ingolstadt",
              "value": "Ingolstadt"
            },
            {
              "label": "Iserlohn",
              "value": "Iserlohn"
            },
            {
              "label": "Jena",
              "value": "Jena"
            },
            {
              "label": "Kaiserslautern",
              "value": "Kaiserslautern"
            },
            {
              "label": "Karlsruhe",
              "value": "Karlsruhe"
            },
            {
              "label": "Kassel",
              "value": "Kassel"
            },
            {
              "label": "Kaufbeuren",
              "value": "Kaufbeuren"
            },
            {
              "label": "Kempten (Allgäu)",
              "value": "Kempten (Allgäu)"
            },
            {
              "label": "Kiel",
              "value": "Kiel"
            },
            {
              "label": "Koblenz",
              "value": "Koblenz"
            },
            {
              "label": "Köln",
              "value": "Köln"
            },
            {
              "label": "Konstanz",
              "value": "Konstanz"
            },
            {
              "label": "Krefeld",
              "value": "Krefeld"
            },
            {
              "label": "Landshut",
              "value": "Landshut"
            },
            {
              "label": "Leipzig",
              "value": "Leipzig"
            },
            {
              "label": "Leverkusen",
              "value": "Leverkusen"
            },
            {
              "label": "Lindau (Bodensee)",
              "value": "Lindau (Bodensee)"
            },
            {
              "label": "Lübeck",
              "value": "Lübeck"
            },
            {
              "label": "Ludwigsburg",
              "value": "Ludwigsburg"
            },
            {
              "label": "Ludwigshafen am Rhein",
              "value": "Ludwigshafen am Rhein"
            },
            {
              "label": "Lünen",
              "value": "Lünen"
            },
            {
              "label": "Magdeburg",
              "value": "Magdeburg"
            },
            {
              "label": "Mainz",
              "value": "Mainz"
            },
            {
              "label": "Mannheim",
              "value": "Mannheim"
            },
            {
              "label": "Marburg",
              "value": "Marburg"
            },
            {
              "label": "Memmingen",
              "value": "Memmingen"
            },
            {
              "label": "Mindelheim",
              "value": "Mindelheim"
            },
            {
              "label": "Mönchengladbach",
              "value": "Mönchengladbach"
            },
            {
              "label": "Mülheim an der Ruhr",
              "value": "Mülheim an der Ruhr"
            },
            {
              "label": "München",
              "value": "München"
            },
            {
              "label": "Münster",
              "value": "Münster"
            },
            {
              "label": "Neu-Ulm",
              "value": "Neu-Ulm"
            },
            {
              "label": "Neubrandenburg",
              "value": "Neubrandenburg"
            },
            {
              "label": "Neuburg an der Donau",
              "value": "Neuburg an der Donau"
            },
            {
              "label": "Neuss",
              "value": "Neuss"
            },
            {
              "label": "Neustadt an der Weinstraße",
              "value": "Neustadt an der Weinstraße"
            },
            {
              "label": "Nördlingen",
              "value": "Nördlingen"
            },
            {
              "label": "Nürnberg",
              "value": "Nürnberg"
            },
            {
              "label": "Oberhausen",
              "value": "Oberhausen"
            },
            {
              "label": "Offenbach am Main",
              "value": "Offenbach am Main"
            },
            {
              "label": "Offenburg",
              "value": "Offenburg"
            },
            {
              "label": "Oldenburg",
              "value": "Oldenburg"
            },
            {
              "label": "Osnabrück",
              "value": "Osnabrück"
            },
            {
              "label": "Paderborn",
              "value": "Paderborn"
            },
            {
              "label": "Passau",
              "value": "Passau"
            },
            {
              "label": "Pforzheim",
              "value": "Pforzheim"
            },
            {
              "label": "Potsdam",
              "value": "Potsdam"
            },
            {
              "label": "Recklinghausen",
              "value": "Recklinghausen"
            },
            {
              "label": "Regensburg",
              "value": "Regensburg"
            },
            {
              "label": "Remscheid",
              "value": "Remscheid"
            },
            {
              "label": "Reutlingen",
              "value": "Reutlingen"
            },
            {
              "label": "Rosenheim",
              "value": "Rosenheim"
            },
            {
              "label": "Rostock",
              "value": "Rostock"
            },
            {
              "label": "Saarbrücken",
              "value": "Saarbrücken"
            },
            {
              "label": "Salzgitter",
              "value": "Salzgitter"
            },
            {
              "label": "Schwäbisch Gmünd",
              "value": "Schwäbisch Gmünd"
            },
            {
              "label": "Schweinfurt",
              "value": "Schweinfurt"
            },
            {
              "label": "Senden",
              "value": "Senden"
            },
            {
              "label": "Siegen",
              "value": "Siegen"
            },
            {
              "label": "Sindelfingen",
              "value": "Sindelfingen"
            },
            {
              "label": "Solingen",
              "value": "Solingen"
            },
            {
              "label": "Stuttgart",
              "value": "Stuttgart"
            },
            {
              "label": "Trier",
              "value": "Trier"
            },
            {
              "label": "Tübingen",
              "value": "Tübingen"
            },
            {
              "label": "Ulm",
              "value": "Ulm"
            },
            {
              "label": "Villingen-Schwenningen",
              "value": "Villingen-Schwenningen"
            },
            {
              "label": "Weiden in der Oberpfalz",
              "value": "Weiden in der Oberpfalz"
            },
            {
              "label": "Weingarten",
              "value": "Weingarten"
            },
            {
              "label": "Wiesbaden",
              "value": "Wiesbaden"
            },
            {
              "label": "Wolfsburg",
              "value": "Wolfsburg"
            },
            {
              "label": "Worms",
              "value": "Worms"
            },
            {
              "label": "Wuppertal",
              "value": "Wuppertal"
            },
            {
              "label": "Würzburg",
              "value": "Würzburg"
            },
            {
              "label": "Zwickau",
              "value": "Zwickau"
            },
            {
              "label": "Sonstiger Ort",
              "value": "Sonstiger Ort"
            }
          ]
        }
      ]
    },
    {
      "id": "fb-23",
      "title": "Ihre Kontaktdaten",
      "description": "Damit wir Ihre Anfrage bearbeiten und ein passendes Angebot erstellen können, benötigen wir Ihre Kontaktinformationen. Pflichtfelder sind mit einem Sternchen (*) gekennzeichnet.",
      "fields": [
        {
          "id": "Anrede",
          "label": "Anrede *",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "Herr",
              "value": "Herr"
            },
            {
              "label": "Frau",
              "value": "Frau"
            },
            {
              "label": "Divers / keine Anrede",
              "value": "Divers/keine Anrede"
            }
          ]
        },
        {
          "id": "Vorname",
          "label": "Vorname *",
          "type": "text",
          "description": "Ihr Vorname",
          "required": true
        },
        {
          "id": "Nachname",
          "label": "Nachname *",
          "type": "text",
          "description": "Ihr Nachname",
          "required": true
        },
        {
          "id": "E-Mail Adresse",
          "label": "E-Mail-Adresse *",
          "type": "text",
          "description": "z. B. ihre@email.de",
          "required": true,
          "validation": {
            "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            "patternMessage": "Bitte geben Sie eine gültige E-Mail-Adresse ein."
          }
        },
        {
          "id": "Telefonnummer",
          "label": "Telefonnummer *",
          "type": "text",
          "description": "z. B. +49 30 123456",
          "required": true
        },
        {
          "id": "Handynummer",
          "label": "Mobilnummer",
          "type": "text",
          "description": "z. B. +49 170 123456"
        },
        {
          "id": "fb-24",
          "label": "Bevorzugter Kontaktweg *",
          "type": "label"
        },
        {
          "id": "fb-25",
          "label": "Wir werden Sie vorrangig über diesen Weg kontaktieren. Im Bedarfsfall können wir auch alternative Kanäle nutzen, um eine schnelle Bearbeitung Ihrer Anfrage sicherzustellen.",
          "type": "label",
          "variant": "subtitle"
        },
        {
          "id": "Bevorzugte Kontaktmethode",
          "label": "Bevorzugter Kontaktweg *",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "E-Mail",
              "value": "E-Mail"
            },
            {
              "label": "Telefon",
              "value": "Telefon"
            },
            {
              "label": "WhatsApp (Nachricht)",
              "value": "WhatsApp (Nachricht)"
            }
          ]
        },
        {
          "id": "fb-26",
          "label": "Wann möchten Sie kontaktiert werden? *",
          "type": "label"
        },
        {
          "id": "Wann möchten Sie kontaktiert werden?",
          "label": "Erreichbarkeit *",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "Vormittags (09:00 – 12:00 Uhr)",
              "value": "Vormittags (09:00 - 12:00 Uhr)"
            },
            {
              "label": "Nachmittags (12:00 – 16:00 Uhr)",
              "value": "Nachmittags (12:00 - 16:00 Uhr)"
            },
            {
              "label": "Abends (16:00 – 19:00 Uhr)",
              "value": "Abends (16:00 - 19:00 Uhr)"
            }
          ]
        }
      ]
    }
  ],
  "Natursteinarbeiten": [
    {
      "id": "fb-27",
      "title": "Welcher Naturstein wird gewünscht?",
      "fields": [
        {
          "id": "Welcher Naturstein wird gewünscht?",
          "label": "",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "Granit",
              "value": "Granit"
            },
            {
              "label": "Marmor",
              "value": "Marmor"
            },
            {
              "label": "Schiefer",
              "value": "Schiefer"
            },
            {
              "label": "Sandstein",
              "value": "Sandstein"
            },
            {
              "label": "Weiß ich nicht",
              "value": "Weiß ich nicht"
            },
            {
              "label": "Sonstige",
              "value": "Sonstige",
              "hasNote": true
            }
          ]
        }
      ]
    },
    {
      "id": "fb-28",
      "title": "In welchem Bereich erfolgt die Verlegung?",
      "fields": [
        {
          "id": "In welchem Bereich erfolgt die Verlegung?",
          "label": "",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "Innenbereich",
              "value": "Innenbereich"
            },
            {
              "label": "Außenbereich",
              "value": "Außenbereich"
            },
            {
              "label": "Treppe",
              "value": "Treppe"
            },
            {
              "label": "Fassade",
              "value": "Fassade"
            },
            {
              "label": "Sonstige",
              "value": "Sonstige",
              "hasNote": true
            }
          ]
        }
      ]
    },
    {
      "id": "fb-29",
      "title": "Welche Fläche soll mit Naturstein versehen werden?",
      "fields": [
        {
          "id": "Welche Fläche soll mit Naturstein versehen werden?",
          "label": "",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "Unter 5 m²",
              "value": "Unter 5 m²"
            },
            {
              "label": "5–20 m²",
              "value": "5–20 m²"
            },
            {
              "label": "Über 20 m²",
              "value": "Über 20 m²"
            },
            {
              "label": "Ungefähr (bitte angeben)",
              "value": "Ungefähr (bitte angeben)",
              "hasNote": true
            }
          ]
        }
      ]
    },
    {
      "id": "fb-30",
      "title": "Ist eine Imprägnierung des Steins gewünscht?",
      "fields": [
        {
          "id": "Ist eine Imprägnierung des Steins gewünscht?",
          "label": "",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "Ja",
              "value": "Ja"
            },
            {
              "label": "Nein",
              "value": "Nein"
            },
            {
              "label": "Weiß ich noch nicht",
              "value": "Weiß ich noch nicht"
            }
          ]
        }
      ]
    },
    {
      "id": "fb-31",
      "title": "Soll der alte Belag entfernt werden?",
      "fields": [
        {
          "id": "Soll der alte Belag entfernt werden?",
          "label": "",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "Ja",
              "value": "Ja"
            },
            {
              "label": "Nein",
              "value": "Nein"
            }
          ]
        }
      ]
    },
    {
      "id": "fb-32",
      "title": "Bitte beschreiben Sie Ihren Auftrag:",
      "description": "Je mehr Details Sie angeben, desto besser können wir ein passendes Angebot für Sie erstellen.",
      "fields": [
        {
          "id": "Bitte beschreiben Sie Ihren Auftrag:",
          "label": "",
          "type": "textarea",
          "description": "Was soll erledigt werden? Welches Budget haben Sie eingeplant? Geben Sie gerne Informationen zu Vorarbeiten, Geräteherstellern oder Förderungen an."
        }
      ]
    },
    {
      "id": "fb-33",
      "title": "In welchem Budgetrahmen bewegt sich Ihr Projekt?",
      "fields": [
        {
          "id": "In welchem Budgetrahmen bewegt sich Ihr Projekt?",
          "label": "",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "Unter 1.000 €",
              "value": "Unter 1.000 €"
            },
            {
              "label": "1.000 – 5.000 €",
              "value": "1.000 - 5.000 €"
            },
            {
              "label": "5.000 – 10.000 €",
              "value": "5.000 - 10.000 €"
            },
            {
              "label": "10.000 – 25.000 €",
              "value": "10.000 - 25.000 €"
            },
            {
              "label": "25.000 – 50.000 €",
              "value": "25.000 - 50.000 €"
            },
            {
              "label": "Über 50.000 €",
              "value": "Über 50.000 €"
            },
            {
              "label": "Noch kein Budget festgelegt",
              "value": "Noch kein Budget festgelegt"
            },
            {
              "label": "Möchte erst beraten werden",
              "value": "Möchte erst einmal beraten werden"
            }
          ]
        }
      ]
    },
    {
      "id": "fb-34",
      "title": "Anhänge (optional)",
      "fields": [
        {
          "id": "Anhänge (optional)",
          "label": "Ihre Anfrage erhält eine genauere Einschätzung, wenn Sie relevante Bilder oder Pläne anfügen.",
          "type": "dropzone",
          "accept": "image/*,application/pdf"
        }
      ]
    },
    {
      "id": "fb-35",
      "title": "Wann soll die Arbeit durchgeführt werden?",
      "mutex": true,
      "fields": [
        {
          "id": "Wann soll die Arbeit durchgeführt werden?",
          "label": "Zeitraum wählen",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "So schnell wie möglich",
              "value": "So schnell wie möglich"
            },
            {
              "label": "Im nächsten Monat",
              "value": "Im nächsten Monat"
            },
            {
              "label": "In den nächsten 3 Monaten",
              "value": "In den nächsten 3 Monaten"
            },
            {
              "label": "Ich weiß es noch nicht",
              "value": "Ich weiß es noch nicht"
            }
          ]
        },
        {
          "id": "Wunschtermin",
          "label": "Konkretes Datum",
          "type": "date",
          "required": true
        }
      ]
    },
    {
      "id": "fb-36",
      "title": "Wo befindet sich der Auftragsort?",
      "description": "Für die Suche nach Fachbetrieben in Ihrer Nähe.",
      "fields": [
        {
          "id": "Wo befindet sich der Auftragsort?",
          "label": "",
          "type": "autocomplete",
          "required": true,
          "options": [
            {
              "label": "Aachen",
              "value": "Aachen"
            },
            {
              "label": "Aalen",
              "value": "Aalen"
            },
            {
              "label": "Augsburg",
              "value": "Augsburg"
            },
            {
              "label": "Bad Homburg",
              "value": "Bad Homburg"
            },
            {
              "label": "Bamberg",
              "value": "Bamberg"
            },
            {
              "label": "Bayreuth",
              "value": "Bayreuth"
            },
            {
              "label": "Bergisch Gladbach",
              "value": "Bergisch Gladbach"
            },
            {
              "label": "Berlin",
              "value": "Berlin"
            },
            {
              "label": "Bielefeld",
              "value": "Bielefeld"
            },
            {
              "label": "Bocholt",
              "value": "Bocholt"
            },
            {
              "label": "Bochum",
              "value": "Bochum"
            },
            {
              "label": "Bonn",
              "value": "Bonn"
            },
            {
              "label": "Bottrop",
              "value": "Bottrop"
            },
            {
              "label": "Brandenburg an der Havel",
              "value": "Brandenburg an der Havel"
            },
            {
              "label": "Braunschweig",
              "value": "Braunschweig"
            },
            {
              "label": "Bremen",
              "value": "Bremen"
            },
            {
              "label": "Bremerhaven",
              "value": "Bremerhaven"
            },
            {
              "label": "Chemnitz",
              "value": "Chemnitz"
            },
            {
              "label": "Cottbus",
              "value": "Cottbus"
            },
            {
              "label": "Darmstadt",
              "value": "Darmstadt"
            },
            {
              "label": "Dessau-Roßlau",
              "value": "Dessau-Roßlau"
            },
            {
              "label": "Dillingen an der Donau",
              "value": "Dillingen an der Donau"
            },
            {
              "label": "Dortmund",
              "value": "Dortmund"
            },
            {
              "label": "Dresden",
              "value": "Dresden"
            },
            {
              "label": "Duisburg",
              "value": "Duisburg"
            },
            {
              "label": "Düren",
              "value": "Düren"
            },
            {
              "label": "Düsseldorf",
              "value": "Düsseldorf"
            },
            {
              "label": "Erfurt",
              "value": "Erfurt"
            },
            {
              "label": "Erlangen",
              "value": "Erlangen"
            },
            {
              "label": "Esslingen am Neckar",
              "value": "Esslingen am Neckar"
            },
            {
              "label": "Flensburg",
              "value": "Flensburg"
            },
            {
              "label": "Frankfurt am Main",
              "value": "Frankfurt am Main"
            },
            {
              "label": "Freiburg im Breisgau",
              "value": "Freiburg im Breisgau"
            },
            {
              "label": "Friedrichshafen",
              "value": "Friedrichshafen"
            },
            {
              "label": "Fürth",
              "value": "Fürth"
            },
            {
              "label": "Gelsenkirchen",
              "value": "Gelsenkirchen"
            },
            {
              "label": "Gera",
              "value": "Gera"
            },
            {
              "label": "Gießen",
              "value": "Gießen"
            },
            {
              "label": "Göppingen",
              "value": "Göppingen"
            },
            {
              "label": "Görlitz",
              "value": "Görlitz"
            },
            {
              "label": "Göttingen",
              "value": "Göttingen"
            },
            {
              "label": "Günzburg",
              "value": "Günzburg"
            },
            {
              "label": "Gütersloh",
              "value": "Gütersloh"
            },
            {
              "label": "Hagen",
              "value": "Hagen"
            },
            {
              "label": "Halle (Saale)",
              "value": "Halle (Saale)"
            },
            {
              "label": "Hamburg",
              "value": "Hamburg"
            },
            {
              "label": "Hamm",
              "value": "Hamm"
            },
            {
              "label": "Hanau",
              "value": "Hanau"
            },
            {
              "label": "Hannover",
              "value": "Hannover"
            },
            {
              "label": "Heidelberg",
              "value": "Heidelberg"
            },
            {
              "label": "Heidenheim an der Brenz",
              "value": "Heidenheim an der Brenz"
            },
            {
              "label": "Heilbronn",
              "value": "Heilbronn"
            },
            {
              "label": "Herne",
              "value": "Herne"
            },
            {
              "label": "Hildesheim",
              "value": "Hildesheim"
            },
            {
              "label": "Illertissen",
              "value": "Illertissen"
            },
            {
              "label": "Ingolstadt",
              "value": "Ingolstadt"
            },
            {
              "label": "Iserlohn",
              "value": "Iserlohn"
            },
            {
              "label": "Jena",
              "value": "Jena"
            },
            {
              "label": "Kaiserslautern",
              "value": "Kaiserslautern"
            },
            {
              "label": "Karlsruhe",
              "value": "Karlsruhe"
            },
            {
              "label": "Kassel",
              "value": "Kassel"
            },
            {
              "label": "Kaufbeuren",
              "value": "Kaufbeuren"
            },
            {
              "label": "Kempten (Allgäu)",
              "value": "Kempten (Allgäu)"
            },
            {
              "label": "Kiel",
              "value": "Kiel"
            },
            {
              "label": "Koblenz",
              "value": "Koblenz"
            },
            {
              "label": "Köln",
              "value": "Köln"
            },
            {
              "label": "Konstanz",
              "value": "Konstanz"
            },
            {
              "label": "Krefeld",
              "value": "Krefeld"
            },
            {
              "label": "Landshut",
              "value": "Landshut"
            },
            {
              "label": "Leipzig",
              "value": "Leipzig"
            },
            {
              "label": "Leverkusen",
              "value": "Leverkusen"
            },
            {
              "label": "Lindau (Bodensee)",
              "value": "Lindau (Bodensee)"
            },
            {
              "label": "Lübeck",
              "value": "Lübeck"
            },
            {
              "label": "Ludwigsburg",
              "value": "Ludwigsburg"
            },
            {
              "label": "Ludwigshafen am Rhein",
              "value": "Ludwigshafen am Rhein"
            },
            {
              "label": "Lünen",
              "value": "Lünen"
            },
            {
              "label": "Magdeburg",
              "value": "Magdeburg"
            },
            {
              "label": "Mainz",
              "value": "Mainz"
            },
            {
              "label": "Mannheim",
              "value": "Mannheim"
            },
            {
              "label": "Marburg",
              "value": "Marburg"
            },
            {
              "label": "Memmingen",
              "value": "Memmingen"
            },
            {
              "label": "Mindelheim",
              "value": "Mindelheim"
            },
            {
              "label": "Mönchengladbach",
              "value": "Mönchengladbach"
            },
            {
              "label": "Mülheim an der Ruhr",
              "value": "Mülheim an der Ruhr"
            },
            {
              "label": "München",
              "value": "München"
            },
            {
              "label": "Münster",
              "value": "Münster"
            },
            {
              "label": "Neu-Ulm",
              "value": "Neu-Ulm"
            },
            {
              "label": "Neubrandenburg",
              "value": "Neubrandenburg"
            },
            {
              "label": "Neuburg an der Donau",
              "value": "Neuburg an der Donau"
            },
            {
              "label": "Neuss",
              "value": "Neuss"
            },
            {
              "label": "Neustadt an der Weinstraße",
              "value": "Neustadt an der Weinstraße"
            },
            {
              "label": "Nördlingen",
              "value": "Nördlingen"
            },
            {
              "label": "Nürnberg",
              "value": "Nürnberg"
            },
            {
              "label": "Oberhausen",
              "value": "Oberhausen"
            },
            {
              "label": "Offenbach am Main",
              "value": "Offenbach am Main"
            },
            {
              "label": "Offenburg",
              "value": "Offenburg"
            },
            {
              "label": "Oldenburg",
              "value": "Oldenburg"
            },
            {
              "label": "Osnabrück",
              "value": "Osnabrück"
            },
            {
              "label": "Paderborn",
              "value": "Paderborn"
            },
            {
              "label": "Passau",
              "value": "Passau"
            },
            {
              "label": "Pforzheim",
              "value": "Pforzheim"
            },
            {
              "label": "Potsdam",
              "value": "Potsdam"
            },
            {
              "label": "Recklinghausen",
              "value": "Recklinghausen"
            },
            {
              "label": "Regensburg",
              "value": "Regensburg"
            },
            {
              "label": "Remscheid",
              "value": "Remscheid"
            },
            {
              "label": "Reutlingen",
              "value": "Reutlingen"
            },
            {
              "label": "Rosenheim",
              "value": "Rosenheim"
            },
            {
              "label": "Rostock",
              "value": "Rostock"
            },
            {
              "label": "Saarbrücken",
              "value": "Saarbrücken"
            },
            {
              "label": "Salzgitter",
              "value": "Salzgitter"
            },
            {
              "label": "Schwäbisch Gmünd",
              "value": "Schwäbisch Gmünd"
            },
            {
              "label": "Schweinfurt",
              "value": "Schweinfurt"
            },
            {
              "label": "Senden",
              "value": "Senden"
            },
            {
              "label": "Siegen",
              "value": "Siegen"
            },
            {
              "label": "Sindelfingen",
              "value": "Sindelfingen"
            },
            {
              "label": "Solingen",
              "value": "Solingen"
            },
            {
              "label": "Stuttgart",
              "value": "Stuttgart"
            },
            {
              "label": "Trier",
              "value": "Trier"
            },
            {
              "label": "Tübingen",
              "value": "Tübingen"
            },
            {
              "label": "Ulm",
              "value": "Ulm"
            },
            {
              "label": "Villingen-Schwenningen",
              "value": "Villingen-Schwenningen"
            },
            {
              "label": "Weiden in der Oberpfalz",
              "value": "Weiden in der Oberpfalz"
            },
            {
              "label": "Weingarten",
              "value": "Weingarten"
            },
            {
              "label": "Wiesbaden",
              "value": "Wiesbaden"
            },
            {
              "label": "Wolfsburg",
              "value": "Wolfsburg"
            },
            {
              "label": "Worms",
              "value": "Worms"
            },
            {
              "label": "Wuppertal",
              "value": "Wuppertal"
            },
            {
              "label": "Würzburg",
              "value": "Würzburg"
            },
            {
              "label": "Zwickau",
              "value": "Zwickau"
            },
            {
              "label": "Sonstiger Ort",
              "value": "Sonstiger Ort"
            }
          ]
        }
      ]
    },
    {
      "id": "fb-37",
      "title": "Ihre Kontaktdaten",
      "description": "Damit wir Ihre Anfrage bearbeiten und ein passendes Angebot erstellen können, benötigen wir Ihre Kontaktinformationen. Pflichtfelder sind mit einem Sternchen (*) gekennzeichnet.",
      "fields": [
        {
          "id": "Anrede",
          "label": "Anrede *",
          "type": "radio",
          "required": true,
          "options": [
            {
              "label": "Herr",
              "value": "Herr"
            },
            {
              "label": "Frau",
              "value": "Frau"
            },
            {
              "label": "Divers / keine Anrede",
              "value": "Divers/keine Anrede"
            }
          ]
        },
        {
          "id": "Vorname",
          "label": "Vorname *",
          "type": "text",
          "description": "Ihr Vorname",
          "required": true
        },
        {
          "id": "Nachname",
          "label": "Nachname *",
          "type": "text",
          "description": "Ihr Nachname",
          "required": true
        },
        {
          "id": "E-Mail Adresse",
          "label": "E-Mail-Adresse *",
          "type": "text",
          "description": "z. B. ihre@email.de",
          "required": true,
          "validation": {
            "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            "patternMessage": "Bitte geben Sie eine gültige E-Mail-Adresse ein."
          }
        },
        {
          "id": "Telefonnummer",
          "label": "Telefonnummer *",
          "type": "text",
          "description": "z. B. +49 30 123456",
          "required": true
        },
        {
          "id": "Handynummer",
          "label": "Mobilnummer",
          "type": "text",
          "description": "z. B. +49 170 123456"
        },
        {
          "id": "fb-38",
          "label": "Bevorzugter Kontaktweg *",
          "type": "label"
        },
        {
          "id": "fb-39",
          "label": "Wir werden Sie vorrangig über diesen Weg kontaktieren. Im Bedarfsfall können wir auch alternative Kanäle nutzen, um eine schnelle Bearbeitung Ihrer Anfrage sicherzustellen.",
          "type": "label",
          "variant": "subtitle"
        },
        {
          "id": "Bevorzugte Kontaktmethode",
          "label": "Bevorzugter Kontaktweg *",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "E-Mail",
              "value": "E-Mail"
            },
            {
              "label": "Telefon",
              "value": "Telefon"
            },
            {
              "label": "WhatsApp (Nachricht)",
              "value": "WhatsApp (Nachricht)"
            }
          ]
        },
        {
          "id": "fb-40",
          "label": "Wann möchten Sie kontaktiert werden? *",
          "type": "label"
        },
        {
          "id": "Wann möchten Sie kontaktiert werden?",
          "label": "Erreichbarkeit *",
          "type": "checkbox",
          "required": true,
          "options": [
            {
              "label": "Vormittags (09:00 – 12:00 Uhr)",
              "value": "Vormittags (09:00 - 12:00 Uhr)"
            },
            {
              "label": "Nachmittags (12:00 – 16:00 Uhr)",
              "value": "Nachmittags (12:00 - 16:00 Uhr)"
            },
            {
              "label": "Abends (16:00 – 19:00 Uhr)",
              "value": "Abends (16:00 - 19:00 Uhr)"
            }
          ]
        }
      ]
    }
  ]
}
