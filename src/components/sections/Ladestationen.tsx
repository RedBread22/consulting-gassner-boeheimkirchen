"use client";

import { ladestationen } from "../../../content/boeheimkirchen";
import { SectionWrapper } from "../ui/SectionWrapper";
import { KpiNumber } from "../ui/KpiNumber";

function formatNumber(n: number): string {
  return n.toLocaleString("de-AT");
}

export function Ladestationen() {
  return (
    <SectionWrapper id="ladestationen">
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-16">
        Zusätzliches Potenzial: E-Ladeinfrastruktur
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-lg leading-relaxed text-fg-muted mb-6">
            Mit vier 22-kWh-Ladestationen am Bahnhofs-Parkplatz erschließt die
            Gemeinde eine zusätzliche Einnahmequelle. Die Ladestationen werden
            direkt mit dem erzeugten PV-Strom gespeist — die
            Anschaffungskosten von {formatNumber(ladestationen.anschaffungskosten_eur)} €
            amortisieren sich bereits nach{" "}
            {ladestationen.amortisation_monate.toLocaleString("de-AT")} Monaten.
          </p>
          <p className="text-lg leading-relaxed text-fg-muted">
            Pro Station werden durchschnittlich{" "}
            {ladestationen.fahrzeugeProStation} Fahrzeuge an{" "}
            {ladestationen.tageProWoche} Tagen pro Woche geladen. Das ergibt{" "}
            {formatNumber(ladestationen.ladevorgaengeProJahr)} Ladevorgänge pro
            Jahr bei einem öffentlichen Tarif von{" "}
            {ladestationen.tarifOeffentlich_ct_kWh} Cent/kWh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <KpiNumber
            value={formatNumber(ladestationen.ladevorgaengeProJahr)}
            label="Ladevorgänge / Jahr"
          />
          <KpiNumber
            value={formatNumber(ladestationen.anteilGemeinde_eur)}
            label="Einnahmen € / Jahr"
            suffix="€"
          />
          <KpiNumber
            value={ladestationen.amortisation_monate.toLocaleString("de-AT")}
            label="Monate Amortisation"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
