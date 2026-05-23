"use client";

import { ergebnis, wirtschaftlichkeit } from "../../../content/boeheimkirchen";
import { SectionWrapper } from "../ui/SectionWrapper";
import { PieChartDisplay } from "../ui/PieChartVorherNachher";

function formatNumber(n: number): string {
  return n.toLocaleString("de-AT", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatEur(n: number): string {
  return n.toLocaleString("de-AT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function Ergebnis() {
  return (
    <SectionWrapper id="ergebnis" soft>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-16">
        Das Ergebnis: vom Verbraucher zum Selbstversorger
      </h2>

      <div className="mb-20 text-center">
        <p className="font-serif text-7xl md:text-8xl tracking-tight text-fg">
          {formatNumber(wirtschaftlichkeit.gesamteinsparung_30Jahre_eur)}
          <span className="text-4xl md:text-5xl ml-2">€</span>
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.15em] text-fg-muted font-sans">
          Gesamteinsparung auf 30 Jahre (€)
        </p>
      </div>

      <div className="flex justify-center mb-20">
        <PieChartDisplay
          eigennutzen={ergebnis.pvNachher.eigennutzen_prozent}
          ueberschuss={ergebnis.pvNachher.ueberschuss_prozent}
          label={`PV-Leistung ${ergebnis.pvNachher.leistung_kWp.toLocaleString("de-AT")} kWp · ${formatNumber(ergebnis.pvNachher.leistung_kWh)} kWh · ${ergebnis.pvNachher.sonnenstunden.toLocaleString("de-AT")} Sonnenstunden`}
        />
      </div>

      <div className="max-w-2xl mx-auto">
        <table className="w-full text-left">
          <tbody className="divide-y divide-border">
            <tr>
              <td className="py-4 text-fg-muted">Investitionskosten</td>
              <td className="py-4 text-right font-serif text-lg">
                {formatEur(wirtschaftlichkeit.investitionskosten_eur)} €
              </td>
            </tr>
            <tr>
              <td className="py-4 text-fg-muted">
                Einsparung / Jahr (während Finanzierung)
              </td>
              <td className="py-4 text-right font-serif text-lg">
                {formatEur(wirtschaftlichkeit.einsparungProJahr_finanzierung_eur)} €
              </td>
            </tr>
            <tr>
              <td className="py-4 text-fg-muted">
                Einsparung / Jahr (nach Finanzierung)
              </td>
              <td className="py-4 text-right font-serif text-lg">
                {formatEur(wirtschaftlichkeit.einsparungProJahr_nachFinanzierung_eur)} €
              </td>
            </tr>
            <tr>
              <td className="py-4 text-fg-muted">Finanzierungsdauer</td>
              <td className="py-4 text-right font-serif text-lg">
                {wirtschaftlichkeit.finanzierungsdauer_jahre.toLocaleString("de-AT")} Jahre
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}
