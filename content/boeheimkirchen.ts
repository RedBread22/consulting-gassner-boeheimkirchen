export const gemeinde = {
  name: "Marktgemeinde Böheimkirchen",
  shortName: "Böheimkirchen",
  bundesland: "Niederösterreich",
  bezirk: "St. Pölten",
  staat: "Österreich",
  buergermeister: {
    name: "Franz Haunold",
    partei: "SPÖ",
  },
  logoSrc: "/images/logos/marktgemeinde-boeheimkirchen.webp",
  accentColor: "#C9322B",
  accentWarm: "#F4A623",
} as const;

export const gemeindeFakten: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
}[] = [
  {
    icon: "Map",
    label: "Region",
    value: "Mostviertel",
    sub: "Marktgemeinde in Niederösterreich",
  },
  {
    icon: "Users",
    label: "Einwohner",
    value: "5.243",
    sub: "Stand 1. Jänner 2024",
  },
  {
    icon: "Maximize",
    label: "Fläche",
    value: "45,55 km²",
    sub: "66 % landwirtschaftlich, 22 % bewaldet",
  },
  {
    icon: "Landmark",
    label: "Gliederung",
    value: "27 Ortschaften",
    sub: "21 Katastralgemeinden",
  },
  {
    icon: "Vote",
    label: "Gemeinderat",
    value: "25 Mitglieder",
  },
];

export const vorOrtTermin = {
  datum: "16. Januar 2026",
  dauer: "1,5 Stunden",
  ort: "Gemeindeamt Böheimkirchen",
  anwesende: [
    { name: "Christoph Gassner", rolle: "Consulting Gassner" },
    { name: "Josef Rettensteiner", rolle: "store and more GmbH" },
    { name: "Franz Haunold", rolle: "Bürgermeister Marktgemeinde Böheimkirchen" },
  ],
} as const;

export const aktuellerStand = {
  stromverbrauch_kWh: 525623,
  energiekosten_ct_kWh: 9.58,
  netzkosten_ct_kWh: 7.0,
  abgaben_ct_kWh: 2.5,
  stromkosten_ct_kWh: 19.08,
  gesamtkosten_eur: 100288.87,
  pv: {
    groesse_kWp: 146.9,
    leistung_kWh: 128189,
    eigennutzen_kWh: 93424.14,
    ueberschuss_eeg_kWh: 34769.85,
    eigennutzen_prozent: 73,
    ueberschuss_prozent: 27,
    sonnenstunden: 872.6,
  },
} as const;

export const konzeptZiele = [
  "Optimierte Auslegung der Standorte",
  "Vernetzung aller Standorte über eine Energiegemeinschaft",
  "Maximierung des Eigenverbrauchs der erzeugten Energie",
  "Zusätzliche Erlöse durch Ladeinfrastruktur (E-Ladestationen)",
  "Erhöhung der Versorgungssicherheit durch Speicher- und Notstromlösung (Blackoutfähig)",
  "Senkung des Energieverbrauchs und der Energiekosten durch Effizienzmaßnahmen",
] as const;

export type Phase = 1 | 2 | 3 | 4;

export type Standort = {
  slug: string;
  name: string;
  phase: Phase;
  typ?: string;
  adresse?: string;
  module?: number;
  leistung_kWp?: number;
  speicher_kWh?: number;
  notstrom?: boolean;
  besonderheit?: string;
  beschreibung?: string;
  bildPlatzhalter?: string;
  bildSrc?: string;
  pdf?: string;
  // Reine Kennzahlen-Karte ohne Bild/PDF/Detailseite (z. B. ein Speichersystem
  // ohne eigene PV-Fläche).
  metaOnly?: boolean;
};

// Quelle der Wahrheit: Standort-Tabelle. kWp-Werte werden direkt übernommen
// (nicht aus der Modulzahl gerechnet — z. B. Posthaus mit 330-W-Modulen).
// Stand: FINAL-Daten (händisch korrigiert) — Wirtschaftlichkeit umgestellt auf
// Phase 1 (105,75 kWp + 200 kWh Speicher), 4-Phasen-Struktur.
export const standorte: Standort[] = [
  // ── PHASE 1 — Sofortmaßnahmen / Grundstein der Energiewende ────────────
  {
    slug: "mittelschule",
    name: "Mittelschule Böheimkirchen",
    phase: 1,
    typ: "Aufdach (Eternit)",
    adresse: "Hochfeldstraße 5",
    module: 203,
    leistung_kWp: 91.35,
    notstrom: true,
    beschreibung:
      "Aufdach-Anlage auf dem Eternitdach der Mittelschule inklusive Batteriespeicher und Notstromsystem. Die Schule wird damit blackoutfähig — kritischer Standort als möglicher Notunterstands-Punkt für die Gemeinde.",
    bildPlatzhalter: "Mittelschule – Aufdach-Anlage",
    bildSrc: "/images/standorte/mittelschule.webp",
    pdf: "/pdf/Marktgemeinde_Boeheimkirchen__Mittelschule_Aufdach.pdf",
  },
  {
    slug: "sportplatz",
    name: "Sportplatz Tribüne",
    phase: 1,
    typ: "Flachdach",
    adresse: "Böheimkirchen 100",
    module: 32,
    leistung_kWp: 14.4,
    beschreibung:
      "Flachdach-Anlage auf der Sportplatz-Tribüne mit Batteriespeicher zur Lastverschiebung in die Abendstunden (Flutlichtbetrieb). Ergänzt um einen 22-kW-Ladepunkt.",
    bildPlatzhalter: "Sportplatz – Flachdach-PV",
    bildSrc: "/images/standorte/sportplatz.webp",
    pdf: "/pdf/Marktgemeinde_Boeheimkirchen__Sportplatz.pdf",
  },
  {
    // Reine Speicher-/Notstromposition ohne eigene PV-Fläche — daher kein
    // Bild, kein PDF und keine eigene Detailseite (metaOnly).
    slug: "speichersystem-mittelschule",
    name: "Speichersystem inkl. Notstrom (Mittelschule)",
    phase: 1,
    adresse: "Hochfeldstraße 5",
    speicher_kWh: 200,
    notstrom: true,
    metaOnly: true,
  },

  // ── PHASE 2 — Förder- und Entwicklungsprojekte ──────────────────────────
  {
    slug: "parkplatz-mittelschule",
    name: "Parkplatz Mittelschule",
    phase: 2,
    typ: "Carport",
    adresse: "Hochfeldstraße 5",
    module: 189,
    leistung_kWp: 85.05,
    beschreibung:
      "Überdachung des Mittelschul-Parkplatzes als Carport-Konstruktion mit integrierter Photovoltaik. Doppelter Nutzen: Wetterschutz für die Fahrzeuge und Stromerzeugung über die Mittagsspitze. Mit zwei 22-kW-Ladepunkten direkt am Standort.",
    bildPlatzhalter: "Parkplatz Mittelschule – Carport mit PV",
    bildSrc: "/images/standorte/parkplatz-mittelschule.webp",
    pdf: "/pdf/Marktgemeinde_Boeheimkirchen__Mittelschule_Carport.pdf",
  },
  {
    slug: "parkplatz-bahnhof",
    name: "Parkplatz Bahnhof",
    phase: 2,
    typ: "Carport",
    adresse: "Bahnhofstraße 2",
    module: 306,
    leistung_kWp: 137.7,
    beschreibung:
      "Größter Einzelstandort des Konzepts. Carport-Anlage am Bahnhof-Parkplatz mit hohem Eigennutzungspotenzial durch die geplanten Ladestationen direkt am Standort.",
    bildPlatzhalter: "Parkplatz Bahnhof – Carport-PV",
    bildSrc: "/images/standorte/parkplatz-bahnhof.webp",
    pdf: "/pdf/Marktgemeinde_Boeheimkirchen__Bahnhof_Carport.pdf",
  },
  {
    slug: "raiffeisen-parkplatz",
    name: "Raiffeisen Parkplatz",
    phase: 2,
    typ: "Carport",
    adresse: "Neustiftgasse 10",
    module: 174,
    leistung_kWp: 78.3,
    beschreibung:
      "Carport-Anlage am Raiffeisen-Parkplatz mit Schnelllade-Infrastruktur (100 kW) und einem zusätzlichen 22-kW-Ladepunkt — hohe Sichtbarkeit und starkes Eigennutzungspotenzial.",
    bildPlatzhalter: "Raiffeisen Parkplatz – Carport-PV",
    bildSrc: "/images/standorte/raiffeisen-parkplatz.webp",
    pdf: "/pdf/Marktgemeinde_Boeheimkirchen__Raiffeisen_Parkplatz_Carport.pdf",
  },

  // ── PHASE 3 — Mittelfristige Ausbauprojekte (2027–2028) ─────────────────
  {
    slug: "kindergarten-aufeld",
    name: "Kindergarten Aufeld",
    phase: 3,
    typ: "Aufdach (Blechfalz)",
    adresse: "Aufeldstraße 8",
    module: 49,
    leistung_kWp: 22.05,
    speicher_kWh: 36,
    beschreibung:
      "PV-Anlage auf dem Blechfalzdach des Kindergartens Aufeld inklusive Batteriespeicher für eine hohe Eigenversorgung über den Tag.",
    bildPlatzhalter: "Kindergarten Aufeld – Aufdach",
    bildSrc: "/images/standorte/kindergarten-aufeld.webp",
    pdf: "/pdf/Marktgemeinde_Boeheimkirchen__Kindergarten.pdf",
  },
  {
    slug: "bauhof",
    name: "Bauhof",
    phase: 3,
    typ: "Flachdach (Kies)",
    adresse: "Neustiftgasse 50",
    module: 130,
    leistung_kWp: 58.5,
    speicher_kWh: 36,
    beschreibung:
      "Flachdach-Anlage (Kiesdach) auf dem Bauhof mit Batteriespeicher — deckt den Eigenbedarf der gemeindeeigenen Fahrzeuge und Geräte.",
    bildPlatzhalter: "Bauhof – Flachdach-PV",
    bildSrc: "/images/standorte/bauhof.webp",
    pdf: "/pdf/Marktgemeinde_Boeheimkirchen__Bauhof.pdf",
  },
  {
    slug: "polizei",
    name: "Polizei",
    phase: 3,
    typ: "Bestand",
    adresse: "Schubertgasse 1",
    speicher_kWh: 24,
    notstrom: true,
    besonderheit: "Bestand — nur Speicher & Notstrom",
    beschreibung:
      "Bestandsgebäude — Ergänzung um Batteriespeicher und Notstromsystem. Macht den Polizeistandort blackoutfähig, ohne neue PV-Fläche.",
    bildPlatzhalter: "Polizei – Speicher & Notstrom",
    bildSrc: "/images/standorte/polizei.webp",
  },

  // ── PHASE 4 — Langfristige Infrastrukturprojekte ────────────────────────
  {
    slug: "posthaus",
    name: "Posthaus Böheimkirchen",
    phase: 4,
    typ: "Indach",
    adresse: "Untere Hauptstraße 7",
    module: 56,
    leistung_kWp: 18.48,
    besonderheit: "Indachsystem (330-W-Module, gebäudeintegriert)",
    beschreibung:
      "Gebäudeintegriertes Indachsystem mit 330-W-Modulen — die Module ersetzen Teile der Dacheindeckung und fügen sich optisch in das Gebäudebild ein.",
    bildPlatzhalter: "Posthaus – Indachsystem",
    bildSrc: "/images/standorte/posthaus.webp",
    pdf: "/pdf/Marktgemeinde_Boeheimkirchen__Posthaus.pdf",
  },
  {
    slug: "volksschule",
    name: "Volksschule",
    phase: 4,
    bildSrc: "/images/standorte/volksschule.webp",
  },
  {
    slug: "kindergarten-mauterheim",
    name: "Kindergarten Mauterheim",
    phase: 4,
    bildSrc: "/images/standorte/kindergarten-mauterheim.webp",
  },
  {
    slug: "pve",
    name: "PVE",
    phase: 4,
    bildSrc: "/images/standorte/pve.webp",
  },
  {
    slug: "friedhof",
    name: "Friedhof",
    phase: 4,
    bildSrc: "/images/standorte/friedhof.webp",
  },
  {
    slug: "gemeindeamt",
    name: "Gemeindeamt Böheimkirchen",
    phase: 4,
    bildSrc: "/images/standorte/gemeindeamt.webp",
  },
];

type PhaseMeta = {
  nummer: Phase;
  titel: string;
  zeitrahmen: string;
  anschaffungNetto_eur: number | null;
  summe: { module: number; leistung_kWp: number; speicher_kWh?: number } | null;
};

// Phasen-Metadaten inkl. Summen aus der Standort-Tabelle und Anschaffung
// netto je Phase (FINAL-Daten). Klappverhalten: Phase 1 ist
// standardmäßig offen, Phase 2 & 3 klappbar/geschlossen, Phase 4 ist nicht
// klappbar (nur Überschrift, siehe Standorte.tsx).
export const phasen: PhaseMeta[] = [
  {
    nummer: 1,
    titel: "Phase 1 — Sofortmaßnahmen / Grundstein der Energiewende",
    zeitrahmen: "Sofortige Umsetzung",
    anschaffungNetto_eur: 214400,
    summe: { module: 235, leistung_kWp: 105.75, speicher_kWh: 200 },
  },
  {
    nummer: 2,
    titel: "Phase 2 — Förder- und Entwicklungsprojekte",
    zeitrahmen: "Betrachtung im Herbst · Umsetzung Q1–Q3 2027",
    // Anschaffung netto für Phase 2 inkl. Mittelschule Parkplatz liegt noch
    // nicht vor — der alte Wert (690.158 €, ohne Mittelschule Parkplatz) wäre
    // falsch und wird bis zur finalen Zahl ausgeblendet.
    anschaffungNetto_eur: null,
    summe: { module: 669, leistung_kWp: 301.05 },
  },
  {
    nummer: 3,
    titel: "Phase 3 — Mittelfristige Ausbauprojekte (2027–2028)",
    zeitrahmen: "Betrachtung nach Phase 1 & 2",
    anschaffungNetto_eur: 250000,
    summe: { module: 179, leistung_kWp: 80.55, speicher_kWh: 96 },
  },
  {
    nummer: 4,
    titel: "Phase 4 — Langfristige Infrastrukturprojekte",
    zeitrahmen: "Langfristig zu prüfende Standorte",
    anschaffungNetto_eur: null,
    summe: null,
  },
];

// Zentrale Laufzeiten — einzige Stelle für 13,7 / 16,3 / 30 Jahre.
// Produktgarantie = Laufzeit Finanzierung + Laufzeit nach Finanzierung.
export const laufzeiten = {
  finanzierung_jahre: 13.7,
  nachFinanzierung_jahre: 16.3,
  produktgarantie_jahre: 30,
} as const;

// Quelle der Wahrheit: FINAL-Daten (händisch korrigiert) — gesamte
// Wirtschaftlichkeit umgestellt auf Phase 1 = 105,75 kWp + 200 kWh Speicher
// (sofort umsetzbar), NICHT auf einen Vollausbau.
export const ergebnis = {
  gesamtLeistung_kWp: 105.75,
  gesamtSpeicher_kWh: 200,
  pvNachher: {
    leistung_kWp: 105.75,
    leistung_kWh: 121612.5,
    sonnenstunden: 1150,
    // Eigennutzungsquote (Phase 1) — korrigierter Stand. Einzige Stelle
    // zum Anpassen.
    eigennutzen_prozent: 81,
    ueberschuss_prozent: 19,
    eigennutzen_kWh: 98239.94,
    ueberschuss_kWh: 23372.56,
  },
} as const;

export const wirtschaftlichkeit = {
  investitionskosten_eur: 214400,
  // Hinweis auf der Seite beibehalten: nicht in der Berechnung enthalten.
  moeglicheFoerderung_eur: 21391.5,
  finanzierung_ct_kWh: 14.8,
  finanzierungskostenProJahr_eur: 20292.68,
  finanzierungsdauer_jahre: laufzeiten.finanzierung_jahre,
  einsparungProJahr_finanzierung_eur: 23978.15,
  einsparungProJahr_nachFinanzierung_eur: 44270.83,
  // Headline = Netto (nach Abzug der Zusatzkosten über 30 Jahre) — ehrlicher
  // als der Brutto-Wert. Brutto und Zusatzkosten werden sekundär ausgewiesen.
  gesamteinsparung_30Jahre_netto_eur: 786675.3,
  gesamteinsparung_30Jahre_brutto_eur: 1050115.3,
  zusatzkosten_30Jahre_eur: 263440,
  // Aufgeschlüsselt nach Zeitraum (während/nach Finanzierung), je mit eigener
  // Postenliste und Zwischensumme. Nur Beträge — keine Stückzahl-Spalte.
  zusatzkostenAufschluesselung: [
    {
      phase: `Während Finanzierung (${laufzeiten.finanzierung_jahre.toLocaleString("de-AT")} J)`,
      summe_eur: 116440,
      posten: [
        { label: "Wartungsvertrag", betrag_eur: 34000 },
        { label: "Komponententausch", betrag_eur: 45000 },
        { label: "Generalwartung", betrag_eur: 16000 },
        { label: "Restwert lt. Finanzierung", betrag_eur: 21440 },
      ],
    },
    {
      phase: `Nach Finanzierung (${laufzeiten.nachFinanzierung_jahre.toLocaleString("de-AT")} J)`,
      summe_eur: 147000,
      posten: [
        { label: "Wartungsvertrag", betrag_eur: 41000 },
        { label: "Komponententausch", betrag_eur: 90000 },
        { label: "Generalwartung", betrag_eur: 16000 },
      ],
    },
  ],
} as const;

// ── Benefits ──────────────────────────────────────────────────────────────
// Eigenständige Mehrwerte des Konzepts: Finanzierung (Kapazitätsleasing),
// Digitalisierung & Monitoring (NetNomic + Video-Visualisierung der Anlage),
// Energieberatung (connesso), Energiegemeinschaft (connesso communities) und
// The Human Touch in the Age of AI (Van Tatsch).

// BENEFIT 1 — Finanzierung über Kapazitätsleasing.
// Eckdaten aus dem Finanzierungsangebot (Stand 10.08.2026): Erste Bank und
// Sparkassen Leasing GmbH, Umsetzungspartner Findustrial — Phase 1 =
// 105,75 kWp + 200 kWh Speicher, sofort umsetzbar. Preis 0,148 €/kWh,
// geplante Laufzeit 13,7 Jahre (164 Monate) bei 137.475 kWh/Jahr Auslastung.
export const finanzierung = {
  stand: "10.08.2026",
  preisProKwh_ct: 14.8,
  laufzeit_jahre: laufzeiten.finanzierung_jahre,
  anschaffungswertNetto_eur: 214400,
  moeglicheFoerderung_eur: 21391.5,
  pvLeistung_kWp: 105.75,
  speicher_kWh: 200,
  vorteile: [
    {
      icon: "RefreshCw",
      text: "Flexible Rückzahlung anhand der tatsächlichen Stromproduktion zum Fixtarif",
    },
    {
      icon: "Receipt",
      text: "Steuerlich absetzbar — die variable Rate ist zur Gänze absetzbar",
    },
    {
      icon: "Coins",
      text: "Mit Förderungen kombinierbar",
    },
    {
      icon: "Activity",
      text: "Laufendes Monitoring der Anlage durch Datenanbindung",
    },
    {
      icon: "Wallet",
      text: "Schonung der Liquidität — Leasingrate pro kWh statt hoher Anschaffungskosten",
    },
    {
      icon: "Landmark",
      text: "Erhöht den Schuldenstand der Gemeinde nicht — reine Miete ohne Kaufverpflichtung; nur die laufenden Leasingzahlungen sind im Schuldennachweis anzuführen",
    },
  ],
  // Illustrativer Jahresverlauf für das Visual „Leasingrate folgt dem PV-Ertrag“.
  // Balken = PV-Ertrag (kWh), Linie = flexible Leasingrate (kWh × Fixpreis).
  // Jahressumme ≈ 137.400 kWh, passend zur geplanten Auslastung 137.475 kWh/Jahr.
  monatsverlauf: [
    { monat: "Jän", ertrag_kWh: 4000 },
    { monat: "Feb", ertrag_kWh: 6600 },
    { monat: "Mär", ertrag_kWh: 10600 },
    { monat: "Apr", ertrag_kWh: 15400 },
    { monat: "Mai", ertrag_kWh: 17900 },
    { monat: "Jun", ertrag_kWh: 18600 },
    { monat: "Jul", ertrag_kWh: 19000 },
    { monat: "Aug", ertrag_kWh: 16800 },
    { monat: "Sep", ertrag_kWh: 12400 },
    { monat: "Okt", ertrag_kWh: 8000 },
    { monat: "Nov", ertrag_kWh: 4800 },
    { monat: "Dez", ertrag_kWh: 3300 },
  ],
} as const;

// BENEFIT 2 — Digitalisierung: Partnernetzwerk.
// Logos werden unter /images/partners/<key>.png ergänzt (optional, mit Fallback).
export const partner: {
  key: string;
  name: string;
  tagline: string;
  beschreibung: string;
  url: string;
  logoSrc: string;
  pdf?: string;
  stichpunkte?: string[];
}[] = [
  {
    key: "connesso",
    name: "connesso",
    tagline: "Beratung für erneuerbare Energien",
    beschreibung:
      "Beratung für Photovoltaik, Wind- und Wasserkraft sowie Biogas und Biomasse. connesso begleitet Energiegemeinschaften bei Gründung und Abwicklung und ist Spezialist für Förderungen (z. B. Erneuerbaren-Ausbau-Gesetz). „connesso“ ist italienisch für „verbunden“.",
    url: "https://www.connesso.at/",
    logoSrc: "/images/partners/connesso.png",
  },
  {
    // SEPARATER Eintrag — eigenes Logo (connesso-community.png), nicht das
    // connesso-Logo aus Benefit 3 (Energieberatung).
    key: "connesso-community",
    name: "connesso communities",
    tagline: "Software für Energiegemeinschaften",
    beschreibung:
      "Die Software-Lösung von connesso macht die gemeinsame Energienutzung einfach: Errichten, Abrechnen und Verwalten der Energiegemeinschaft in einer Anwendung. So behält die Gemeinde jederzeit den Überblick über Erzeugung, Verbrauch und Abrechnung — bei voller Transparenz.",
    url: "https://communities.connesso.at/",
    logoSrc: "/images/partners/connesso-community.png",
    stichpunkte: [
      "Überblick über Erzeugungs- und Verbrauchsmengen in Echtzeit",
      "Effiziente Verwaltung der Kundendaten für die Verrechnung",
      "Nachvollziehbarer Status der Abrechnungsdaten",
      "Übersichtlicher Status der Anmeldeprozesse neuer Teilnehmer",
      "Optional: Buchhaltung & steuerliche Betreuung sowie Abrechnungs-Service",
    ],
  },
  {
    key: "vantatsch",
    name: "Nadine Van Tatsch",
    tagline: "The Human Touch in the Age of AI",
    beschreibung:
      "KI-Enablement, Coaching und Trainings für Unternehmen, Führungskräfte und Professionals. Baut KI-Kompetenz, Resilienz und Mindset auf, um KI wirksam und menschenzentriert einzusetzen.",
    url: "https://www.vantatsch.com/",
    logoSrc: "/images/partners/vantatsch.png",
    pdf: "/pdf/van-tatsch-the-human-touch-in-the-age-of-ai.pdf",
  },
  {
    key: "netnomic",
    name: "NetNomic",
    tagline: "Websites · KI-Automatisierungen · IT",
    beschreibung:
      "Moderne, schnelle und mobil-optimierte Websites sowie KI-Automatisierungen (n8n-Flows, Chatbots, Buchungssysteme, Kalender- und Mail-Flows). EU-Cloud-Hosting und IT-Dienstleistungen — lokale Betreuung für regionale Betriebe.",
    url: "https://netnomic.at/",
    logoSrc: "/images/partners/netnomic.png",
  },
];

// BENEFIT 3 — Video: Visualisierung einer PV-Anlage im Betrieb.
// MP4 wird unter /videos/<datei> abgelegt.
export const video = {
  src: "/videos/pv-anlage-betrieb.mp4",
  poster: undefined as string | undefined,
  titel: "Die Anlage im Betrieb",
  beschreibung:
    "Eine Visualisierung zeigt das Zusammenspiel von Erzeugung, Speicher und Verbrauch — so wie sich die Anlage im laufenden Betrieb überwachen lässt.",
} as const;

export const kontakt = {
  unternehmen: "Consulting Gassner",
  ansprechpartner: "Christoph Gassner",
  beschreibung:
    "Energieberatung für Gemeinden und Betriebe. Seit vielen Jahren in der Energiebranche — analysiert Energieverbräuche, deckt Einsparpotenziale auf und filtert passende Fördermöglichkeiten heraus. Erarbeitet wirtschaftlich optimale, förderfähige Energiekonzepte — von der Analyse über die wirtschaftliche Auslegung bis zur Umsetzungsplanung.",
  adresse: "Rödschitz 105, 8983 Bad Mitterndorf",
  land: "Austria",
  telefon: "+43 664 5325555",
  email: "office@consulting-gassner.at",
  website: "www.consulting-gassner.at",
  terminBuchenUrl: "https://www.consulting-gassner.at/blank-4",
  logoSrc: "/images/logos/Gassner-Hoelzl.jpeg",
} as const;

// Partner für die Umsetzung — Mario Hölzl, MHZ Beratung.
export const kontaktPartner = {
  unternehmen: "MHZ Beratung",
  ansprechpartner: "Mario Hölzl",
  beschreibung:
    "Projektbegleitung und Beratung für Betriebe und Kommunen — seit über 8 Jahren. Schwerpunkte: Photovoltaik, Straßenbeleuchtung, Innenbeleuchtung und Flutlicht. Unabhängige, produktneutrale und maßgeschneiderte Gesamtlösungen — inkl. Optimierung, Konzeptionierung und Förderbegleitung.",
  adresse: "Quellstrasse 16, 3243 St. Leonhard/Forst",
  land: "Austria",
  telefon: "+43 664 645 0303",
  email: "mhz-beratung@outlook.com",
  website: "www.mhz-beratung.at",
  websiteUrl: "https://www.mhz-beratung.at/",
} as const;
