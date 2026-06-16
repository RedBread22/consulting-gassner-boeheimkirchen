"use client";

import {
  aktuellerStand,
  ergebnis,
  wirtschaftlichkeit,
} from "../../../content/boeheimkirchen";
import { SectionWrapper } from "../ui/SectionWrapper";
import { PieChartDisplay } from "../ui/PieChartVorherNachher";

function formatNumber(n: number): string {
  return n.toLocaleString("de-AT", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatKwp(n: number): string {
  return n.toLocaleString("de-AT", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function formatEur(n: number): string {
  return n.toLocaleString("de-AT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function Ergebnis() {
  const pvHeute = aktuellerStand.pv.groesse_kWp;
  const pvNachher = ergebnis.pvNachher.leistung_kWp;
  const pvFaktor = (pvNachher / pvHeute).toLocaleString("de-AT", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <SectionWrapper id="ergebnis" soft>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-6">
        Das Ergebnis: vom Verbraucher zum Selbstversorger
      </h2>

      <p className="text-base md:text-lg text-fg-muted leading-relaxed max-w-2xl mb-16">
        Die folgenden Zahlen beziehen sich auf{" "}
        <span className="text-fg font-medium">
          Phase 1 — den sofort umsetzbaren Ausbauschritt mit{" "}
          {formatKwp(ergebnis.pvNachher.leistung_kWp)} kWp
        </span>{" "}
        — und nicht auf einen späteren Vollausbau.
      </p>

      {/* Direkter Vergleich Ist-Zustand ↔ Phase 1 */}
      <div className="mb-20">
        <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-6">
          Heute vs. nach Phase 1
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* HEUTE */}
          <div className="rounded-2xl border border-border p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-6">
              Heute (Ist-Zustand)
            </p>
            <dl className="space-y-5">
              <div>
                <dt className="text-sm text-fg-muted">Bestehende PV-Leistung</dt>
                <dd className="font-serif text-3xl">{formatKwp(pvHeute)} kWp</dd>
              </div>
              <div>
                <dt className="text-sm text-fg-muted">Eigennutzungsquote</dt>
                <dd className="font-serif text-3xl">
                  {aktuellerStand.pv.eigennutzen_prozent} %
                  <span className="text-base text-fg-muted ml-2">
                    / {aktuellerStand.pv.ueberschuss_prozent} % Überschuss
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-fg-muted">Stromkosten / Jahr</dt>
                <dd className="font-serif text-3xl">
                  {formatEur(aktuellerStand.gesamtkosten_eur)} €
                </dd>
              </div>
            </dl>
          </div>

          {/* NACHHER */}
          <div className="rounded-2xl bg-fg text-bg p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.15em] text-bg/60 mb-6">
              Nach Phase 1
            </p>
            <dl className="space-y-5">
              <div>
                <dt className="text-sm text-bg/60">PV-Leistung</dt>
                <dd className="font-serif text-3xl">
                  {formatKwp(pvNachher)} kWp
                  <span className="text-base text-bg/60 ml-2">≈ {pvFaktor}×</span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-bg/60">Eigennutzungsquote</dt>
                <dd className="font-serif text-3xl">
                  {ergebnis.pvNachher.eigennutzen_prozent} %
                  <span className="text-base text-bg/60 ml-2">
                    / {ergebnis.pvNachher.ueberschuss_prozent} % Überschuss
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-bg/60">Einsparung / Jahr (nach Finanzierung)</dt>
                <dd className="font-serif text-3xl">
                  {formatEur(wirtschaftlichkeit.einsparungProJahr_nachFinanzierung_eur)} €
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* PV-Leistung als Balkenvergleich */}
        <div className="mt-8 space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-fg-muted">PV-Leistung heute</span>
              <span className="tabular-nums">{formatKwp(pvHeute)} kWp</span>
            </div>
            <div className="h-3 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-fg-muted"
                style={{ width: `${(pvHeute / pvNachher) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">PV-Leistung nach Phase 1</span>
              <span className="tabular-nums font-medium">{formatKwp(pvNachher)} kWp</span>
            </div>
            <div className="h-3 rounded-full bg-border overflow-hidden">
              <div className="h-full w-full rounded-full bg-fg" />
            </div>
          </div>
        </div>

        <p className="mt-8 text-base md:text-lg text-fg-muted leading-relaxed max-w-2xl">
          Rund <span className="text-fg font-medium">{pvFaktor}× mehr PV-Leistung</span>,
          die Eigennutzungsquote steigt von{" "}
          <span className="text-fg font-medium">
            {aktuellerStand.pv.eigennutzen_prozent} % auf{" "}
            {ergebnis.pvNachher.eigennutzen_prozent} %
          </span>{" "}
          — und nach der Finanzierung spart die Gemeinde{" "}
          <span className="text-fg font-medium">
            {formatEur(wirtschaftlichkeit.einsparungProJahr_nachFinanzierung_eur)} € pro Jahr
          </span>
          . Investition: {formatEur(wirtschaftlichkeit.investitionskosten_eur)} €,
          finanziert in{" "}
          {wirtschaftlichkeit.finanzierungsdauer_jahre.toLocaleString("de-AT")} Jahren.
        </p>
      </div>

      <div className="mb-20 text-center">
        <p className="font-serif text-7xl md:text-8xl tracking-tight text-fg">
          {formatNumber(wirtschaftlichkeit.gesamteinsparung_30Jahre_netto_eur)}
          <span className="text-4xl md:text-5xl ml-2">€</span>
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.15em] text-fg-muted font-sans">
          Gesamteinsparung auf 30 Jahre · netto (€)
        </p>
        <p className="mt-5 mx-auto max-w-xl text-sm text-fg-muted leading-relaxed">
          Brutto{" "}
          {formatEur(wirtschaftlichkeit.gesamteinsparung_30Jahre_brutto_eur)} €
          abzüglich Zusatzkosten über 30 Jahre{" "}
          {formatNumber(wirtschaftlichkeit.zusatzkosten_30Jahre_eur)} € (
          {wirtschaftlichkeit.zusatzkostenAufschluesselung
            .map((z) => `${z.label} ${formatNumber(z.betrag_eur)} €`)
            .join(" · ")}
          ) ={" "}
          {formatEur(wirtschaftlichkeit.gesamteinsparung_30Jahre_netto_eur)} €
          netto.
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
              <td className="py-4 text-fg-muted">Investition gesamt</td>
              <td className="py-4 text-right font-serif text-lg">
                {formatEur(wirtschaftlichkeit.investitionskosten_eur)} €
              </td>
            </tr>
            <tr>
              <td className="py-4 text-fg-muted">Mögliche Förderung</td>
              <td className="py-4 text-right font-serif text-lg">
                {formatEur(wirtschaftlichkeit.moeglicheFoerderung_eur)} €
              </td>
            </tr>
            <tr>
              <td className="py-4 text-fg-muted">Finanzierung</td>
              <td className="py-4 text-right font-serif text-lg">
                {wirtschaftlichkeit.finanzierung_ct_kWh.toLocaleString("de-AT", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                ct/kWh
                <span className="block text-sm text-fg-muted font-sans">
                  {formatEur(wirtschaftlichkeit.finanzierungskostenProJahr_eur)} €
                  / Jahr
                </span>
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
