"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Battery, ShieldCheck } from "lucide-react";
import { standorte, phasen, type Standort } from "../../../content/boeheimkirchen";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

function formatNumber(n: number): string {
  return n.toLocaleString("de-AT");
}

// Standorte mit konkreten Kennzahlen bekommen eine Karte + Detailseite,
// reine Prüf-Standorte (Phase 3) erscheinen nur als kurzer Listeneintrag.
function hatDaten(s: Standort): boolean {
  return s.leistung_kWp != null || s.speicher_kWh != null;
}

function StandortCard({ s, i }: { s: Standort; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
    >
      <Link
        href={`/standorte/${s.slug}`}
        className="group block border border-[#E5E5E5] hover:border-[#111111] hover:-translate-y-[2px] transition-all duration-200 h-full"
      >
        {s.bildSrc ? (
          <Image
            src={s.bildSrc}
            alt={s.name}
            width={800}
            height={600}
            unoptimized={true}
            className="w-full aspect-[4/3] object-cover"
          />
        ) : (
          <ImagePlaceholder label={s.bildPlatzhalter ?? s.name} />
        )}

        <div className="p-6">
          <h3 className="font-serif text-2xl tracking-tight mb-2">{s.name}</h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {s.typ && (
              <span className="text-xs uppercase tracking-[0.1em] text-fg-muted border border-border px-2 py-1">
                {s.typ}
              </span>
            )}
            {s.besonderheit && (
              <span className="text-xs uppercase tracking-[0.1em] text-fg-muted border border-border px-2 py-1">
                {s.besonderheit}
              </span>
            )}
          </div>

          <div className="flex items-center gap-6 text-sm text-fg-muted mb-4">
            {s.leistung_kWp != null && (
              <span>{formatNumber(s.leistung_kWp)} kWp</span>
            )}
            {s.module != null && <span>{formatNumber(s.module)} Module</span>}
            {s.speicher_kWh != null && (
              <span className="flex items-center gap-1">
                <Battery className="w-3.5 h-3.5" strokeWidth={1.5} />
                {s.speicher_kWh} kWh
              </span>
            )}
            {s.notstrom && (
              <span className="flex items-center gap-1 text-accent">
                <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                Notstrom
              </span>
            )}
          </div>

          <span className="text-sm text-fg-muted inline-flex items-center gap-1">
            Details ansehen
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function Standorte() {
  return (
    <SectionWrapper id="standorte">
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
        Standorte für eine unabhängige Gemeinde
      </h2>
      <p className="text-fg-muted text-lg mb-16 max-w-2xl">
        Das Konzept wird in drei Phasen umgesetzt — von der sofortigen Umsetzung
        bis zu langfristig zu prüfenden Standorten. Klicken Sie auf einen
        Standort für Details.
      </p>

      <div className="space-y-20">
        {phasen.map((phase) => {
          const phasenStandorte = standorte.filter((s) => s.phase === phase.nummer);
          const mitDaten = phasenStandorte.filter(hatDaten);
          const inPruefung = phasenStandorte.filter((s) => !hatDaten(s));

          return (
            <div key={phase.nummer}>
              <div className="border-t border-border pt-8 mb-10">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="font-serif text-3xl tracking-tight">
                    {phase.titel}
                  </h3>
                  {phase.summe && (
                    <p className="text-sm text-fg-muted">
                      {formatNumber(phase.summe.module)} Module ·{" "}
                      {formatNumber(phase.summe.leistung_kWp)} kWp ·{" "}
                      {formatNumber(phase.summe.speicher_kWh)} kWh Speicher
                    </p>
                  )}
                </div>
                <p className="text-sm uppercase tracking-[0.15em] text-fg-muted mt-2">
                  {phase.zeitrahmen}
                </p>
              </div>

              {mitDaten.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {mitDaten.map((s, i) => (
                    <StandortCard key={s.slug} s={s} i={i} />
                  ))}
                </div>
              )}

              {inPruefung.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-4">
                    In Prüfung
                  </p>
                  <ul className="divide-y divide-border border-t border-b border-border">
                    {inPruefung.map((s) => (
                      <li
                        key={s.slug}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3"
                      >
                        <span className="text-base">{s.name}</span>
                        {s.status && (
                          <span className="text-sm text-fg-muted">{s.status}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
