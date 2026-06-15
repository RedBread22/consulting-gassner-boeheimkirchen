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
  logoSrc: "/logos/marktgemeinde-boeheimkirchen.png",
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
    icon: "Navigation",
    label: "Lage",
    value: "10 km östlich von St. Pölten",
    sub: "an Michelbach und Perschling",
  },
  {
    icon: "Maximize",
    label: "Fläche",
    value: "45,55 km²",
    sub: "66 % landwirtschaftlich, 22 % bewaldet",
  },
  {
    icon: "Route",
    label: "Verkehr",
    value: "Westautobahn (A1)",
    sub: "und alte Westbahn-Strecke",
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

export type Phase = 1 | 2 | 3;

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
};

// Quelle der Wahrheit: Standort-Tabelle. kWp-Werte werden direkt übernommen
// (nicht aus der Modulzahl gerechnet — z. B. Posthaus mit 330-W-Modulen).
export const standorte: Standort[] = [
  // ── PHASE 1 — kurzfristig ──────────────────────────────────────────────
  {
    slug: "parkplatz-mittelschule",
    name: "Parkplatz Mittelschule",
    phase: 1,
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
    phase: 1,
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
    slug: "mittelschule",
    name: "Mittelschule Böheimkirchen",
    phase: 1,
    typ: "Aufdach (Eternit)",
    adresse: "Hochfeldstraße 5",
    module: 203,
    leistung_kWp: 91.35,
    speicher_kWh: 84,
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
    speicher_kWh: 24,
    beschreibung:
      "Flachdach-Anlage auf der Sportplatz-Tribüne mit Batteriespeicher zur Lastverschiebung in die Abendstunden (Flutlichtbetrieb). Ergänzt um einen 22-kW-Ladepunkt.",
    bildPlatzhalter: "Sportplatz – Flachdach-PV",
    bildSrc: "/images/standorte/sportplatz.webp",
    pdf: "/pdf/Marktgemeinde_Boeheimkirchen__Sportplatz.pdf",
  },

  // ── PHASE 2 — mittelfristig ────────────────────────────────────────────
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
    pdf: "/pdf/Marktgemeinde_Boeheimkirchen__Raiffeisen_Parkplatz_Carport.pdf",
  },
  {
    slug: "kindergarten-aufeld",
    name: "Kindergarten Aufeld",
    phase: 2,
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
    phase: 2,
    typ: "Flachdach (Kies)",
    adresse: "Neustiftgasse 50",
    module: 130,
    leistung_kWp: 58.5,
    speicher_kWh: 36,
    beschreibung:
      "Flachdach-Anlage (Kiesdach) auf dem Bauhof mit Batteriespeicher — deckt den Eigenbedarf der gemeindeeigenen Fahrzeuge und Geräte.",
    bildPlatzhalter: "Bauhof – Flachdach-PV",
    pdf: "/pdf/Marktgemeinde_Boeheimkirchen__Bauhof.pdf",
  },
  {
    slug: "polizei",
    name: "Polizei",
    phase: 2,
    typ: "Bestand",
    adresse: "Schubertgasse 1",
    speicher_kWh: 24,
    notstrom: true,
    besonderheit: "Bestand — nur Speicher & Notstrom",
    beschreibung:
      "Bestandsgebäude — Ergänzung um Batteriespeicher und Notstromsystem. Macht den Polizeistandort blackoutfähig, ohne neue PV-Fläche.",
    bildPlatzhalter: "Polizei – Speicher & Notstrom",
  },

  // ── PHASE 3 — langfristig ──────────────────────────────────────────────
  {
    slug: "posthaus",
    name: "Posthaus Böheimkirchen",
    phase: 3,
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
    phase: 3,
  },
  {
    slug: "kindergarten-mauterheim",
    name: "Kindergarten Mauterheim",
    phase: 3,
  },
  {
    slug: "pve",
    name: "PVE",
    phase: 3,
  },
  {
    slug: "friedhof",
    name: "Friedhof",
    phase: 3,
  },
  {
    slug: "gemeindeamt",
    name: "Gemeindeamt Böheimkirchen",
    phase: 3,
  },
];

// Phasen-Metadaten inkl. Summen aus der Standort-Tabelle (Phase 1 & 2).
export const phasen = [
  {
    nummer: 1 as Phase,
    titel: "Phase 1 — Kurzfristig",
    zeitrahmen: "Sofortige Umsetzung",
    summe: { module: 730, leistung_kWp: 328.5, speicher_kWh: 108 },
  },
  {
    nummer: 2 as Phase,
    titel: "Phase 2 — Mittelfristig",
    zeitrahmen: "Beschluss im Herbst · Umsetzung Q1–Q3 2027",
    summe: { module: 353, leistung_kWp: 158.85, speicher_kWh: 96 },
  },
  {
    nummer: 3 as Phase,
    titel: "Phase 3 — Langfristig",
    zeitrahmen: "Beschluss Q3/Q4 2027 · Umsetzung 2028",
    summe: null,
  },
] as const;

export const ergebnis = {
  gesamtLeistung_kWp: 386.82,
  gesamtSpeicher_kWh: 216,
  pvNachher: {
    leistung_kWp: 533.10,
    leistung_kWh: 526244.68,
    sonnenstunden: 987.1,
    nutzenDirekt_kWh: 417938.05,
    ueberschussOemag_kWh: 68980.76,
    eigennutzen_prozent: 86,
    ueberschuss_prozent: 14,
  },
} as const;

export const wirtschaftlichkeit = {
  investitionskosten_eur: 871871.45,
  finanzierung_ct_kWh: 15,
  stromverbrauch_neu_kWh: 200521.89,
  stromkosten_neu_eur: 38261.48,
  verguetungUeberschuss_eur: 4483.75,
  finanzierungskosten_eur: 59709.35,
  tatsaechlicheKosten_neu_eur: 93486.09,
  einsparungProJahr_finanzierung_eur: 6802.78,
  finanzierungsdauer_jahre: 13.8,
  einsparungProJahr_nachFinanzierung_eur: 66511.13,
  zeitNachFinanzierung_jahre: 16.2,
  gesamteinsparung_30Jahre_eur: 1171358.73,
  mindestfoerderung_eur: 267434.13,
} as const;

// ── Benefits ──────────────────────────────────────────────────────────────
// Drei gleichwertige Mehrwerte des Konzepts: Finanzierung (Kapazitätsleasing),
// Digitalisierung (Partnernetzwerk) und eine Video-Visualisierung der Anlage.

// BENEFIT 1 — Finanzierung über Kapazitätsleasing.
// Eckdaten aus dem Richtangebot (Consulting Gassner, Stand 01.04.2026).
export const finanzierung = {
  stand: "01.04.2026",
  preisProKwh_ct: 15.0,
  laufzeit_jahre: 13.8,
  anschaffungswertNetto_eur: 871871,
  pvLeistung_kWp: 386,
  speicher_kWh: 216,
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
  monatsverlauf: [
    { monat: "Jän", ertrag_kWh: 11000 },
    { monat: "Feb", ertrag_kWh: 18000 },
    { monat: "Mär", ertrag_kWh: 29000 },
    { monat: "Apr", ertrag_kWh: 42000 },
    { monat: "Mai", ertrag_kWh: 49000 },
    { monat: "Jun", ertrag_kWh: 51000 },
    { monat: "Jul", ertrag_kWh: 52000 },
    { monat: "Aug", ertrag_kWh: 46000 },
    { monat: "Sep", ertrag_kWh: 34000 },
    { monat: "Okt", ertrag_kWh: 22000 },
    { monat: "Nov", ertrag_kWh: 13000 },
    { monat: "Dez", ertrag_kWh: 9000 },
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
  adresse: "Rödschitz 105, 8983 Bad Mitterndorf",
  land: "Austria",
  telefon: "+43 664 5325555",
  email: "info@consulting-gassner.at",
  website: "www.consulting-gassner.at",
  terminBuchenUrl: "https://www.consulting-gassner.at/blank-4",
  logoSrc: "/logos/gassner-consulting.png",
} as const;
