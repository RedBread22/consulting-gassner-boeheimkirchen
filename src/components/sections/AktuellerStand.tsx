"use client";

import { aktuellerStand } from "../../../content/boeheimkirchen";
import { SectionWrapper } from "../ui/SectionWrapper";
import { KpiNumber } from "../ui/KpiNumber";
import { PieChartDisplay } from "../ui/PieChartVorherNachher";

function formatNumber(n: number): string {
  return n.toLocaleString("de-AT");
}

export function AktuellerStand() {
  return (
    <SectionWrapper id="aktueller-stand">
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-16">
        Wo Böheimkirchen heute steht
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 lg:gap-x-20 gap-y-12 items-start mb-20">
        <KpiNumber
          value={formatNumber(aktuellerStand.stromverbrauch_kWh)}
          label="Stromverbrauch kWh"
          compact
        />
        <KpiNumber
          value={formatNumber(aktuellerStand.gesamtkosten_eur)}
          label="Gesamtkosten €"
          compact
        />
        <KpiNumber
          value={aktuellerStand.stromkosten_ct_kWh.toFixed(2).replace(".", ",")}
          label="Cent pro kWh"
          suffix="ct"
          compact
        />
        <KpiNumber
          value={formatNumber(aktuellerStand.pv.groesse_kWp)}
          label="Bestehende PV kWp"
          suffix="kWp"
          compact
        />
      </div>

      <div className="flex justify-center">
        <PieChartDisplay
          eigennutzen={aktuellerStand.pv.eigennutzen_prozent}
          ueberschuss={aktuellerStand.pv.ueberschuss_prozent}
          label={`PV-Leistung ${formatNumber(aktuellerStand.pv.groesse_kWp)} kWp · ${formatNumber(aktuellerStand.pv.leistung_kWh)} kWh · ${formatNumber(aktuellerStand.pv.sonnenstunden)} Sonnenstunden`}
        />
      </div>
    </SectionWrapper>
  );
}
