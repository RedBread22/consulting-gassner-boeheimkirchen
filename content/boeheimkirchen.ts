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

export type Standort = {
  slug: string;
  name: string;
  typ: string;
  leistung_kWp: number;
  speicher_kWh?: number;
  notstrom?: boolean;
  besonderheit?: string;
  beschreibung: string;
  bildPlatzhalter: string;
  bildSrc?: string;
};

export const standorte: Standort[] = [
  {
    slug: "parkplatz-mittelschule",
    name: "Parkplatz Mittelschule",
    typ: "Carport",
    leistung_kWp: 89.10,
    speicher_kWh: 36,
    beschreibung:
      "Überdachung des Mittelschul-Parkplatzes als Carport-Konstruktion mit integrierter Photovoltaik. Doppelter Nutzen: Wetterschutz für die Fahrzeuge und Stromerzeugung über die Mittagsspitze.",
    bildPlatzhalter: "Parkplatz Mittelschule – Carport mit PV",
    bildSrc: "/images/standorte/parkplatz-mittelschule.jpg",
  },
  {
    slug: "parkplatz-bahnhof",
    name: "Parkplatz Bahnhof",
    typ: "Carport",
    leistung_kWp: 135,
    beschreibung:
      "Größter Einzelstandort des Konzepts. Carport-Anlage am Bahnhof-Parkplatz mit hohem Eigennutzungspotenzial durch die geplanten Ladestationen direkt am Standort.",
    bildPlatzhalter: "Parkplatz Bahnhof – Carport-PV",
    bildSrc: "/images/standorte/parkplatz-bahnhof.jpg",
  },
  {
    slug: "mittelschule",
    name: "Mittelschule Böheimkirchen",
    typ: "Aufdach",
    leistung_kWp: 81.45,
    speicher_kWh: 54,
    notstrom: true,
    beschreibung:
      "Aufdach-Anlage auf der Mittelschule inklusive Notstromsystem. Die Schule wird damit blackoutfähig — kritischer Standort als möglicher Notunterstands-Punkt für die Gemeinde.",
    bildPlatzhalter: "Mittelschule – Aufdach-Anlage",
    bildSrc: "/images/standorte/mittelschule.jpg",
  },
  {
    slug: "kindergarten-aufeld",
    name: "Kindergarten Aufeld",
    typ: "Aufdach (Repowering)",
    leistung_kWp: 26.10,
    speicher_kWh: 27,
    beschreibung:
      "Repowering der bestehenden PV-Anlage am Kindergarten — neue, leistungsfähigere Module bei gleicher Dachfläche, plus Batteriespeicher.",
    bildPlatzhalter: "Kindergarten Aufeld – Aufdach",
    bildSrc: "/images/standorte/kindergarten-aufeld.jpg",
  },
  {
    slug: "posthaus",
    name: "Posthaus Böheimkirchen",
    typ: "Indach",
    leistung_kWp: 22.77,
    besonderheit: "Indachsystem (gebäudeintegriert)",
    beschreibung:
      "Indachsystem statt klassischer Aufdach-Montage — die PV-Module ersetzen Teile der Dacheindeckung und fügen sich optisch in das Gebäudebild ein.",
    bildPlatzhalter: "Posthaus – Indachsystem",
    bildSrc: "/images/standorte/posthaus.jpg",
  },
  {
    slug: "gemeindeamt",
    name: "Gemeindeamt Böheimkirchen",
    typ: "Aufdach (Solumera)",
    leistung_kWp: 18,
    speicher_kWh: 36,
    notstrom: true,
    besonderheit: "Denkmalschutz — Solumera-System",
    beschreibung:
      "Denkmalgeschütztes Gebäude — Einsatz des Solumera-Systems, das optisch unauffällig in die historische Dachstruktur integriert wird. Mit Notstromsystem als blackoutfähiger Verwaltungsstandort.",
    bildPlatzhalter: "Gemeindeamt – Solumera-Integration",
    bildSrc: "/images/standorte/gemeindeamt.jpg",
  },
  {
    slug: "sportplatz",
    name: "Sportplatz Böheimkirchen",
    typ: "Aufdach (Flachdach)",
    leistung_kWp: 14.40,
    speicher_kWh: 36,
    beschreibung:
      "Flachdach-Aufdach-Anlage am Sportplatz-Gebäude mit Batteriespeicher zur Lastverschiebung in die Abendstunden (Flutlichtbetrieb).",
    bildPlatzhalter: "Sportplatz – Flachdach-PV",
    bildSrc: "/images/standorte/sportplatz.jpg",
  },
];

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

export const ladestationen = {
  anzahl: 4,
  leistungProStation_kWh: 22,
  anschaffungskosten_eur: 12000,
  tarifOeffentlich_ct_kWh: 87,
  durchschnittlicherTankvorgang_kWh: 50,
  fahrzeugeProStation: 2,
  tageProWoche: 4,
  ladevorgaengeProJahr: 1664,
  ladeleistung_kWh_proJahr: 83200,
  bruttoEinnahmen_eur: 72384,
  anteilGemeinde_eur: 57907.20,
  anteilAbrechnung_eur: 14476.80,
  amortisation_monate: 4.8,
} as const;

export const kontakt = {
  unternehmen: "Consulting Gassner",
  ansprechpartner: "Christoph Gassner",
  adresse: "Rödschitz 105, 8983 Bad Mitterndorf",
  land: "Austria",
  telefon: "+43 664 5325555",
  email: "info@consulting-gassner.at",
  website: "www.consulting-gassner.at",
  terminBuchenUrl: "https://www.consulting-gassner.at/#kontakt",
  logoSrc: "/logos/gassner-consulting.png",
} as const;
