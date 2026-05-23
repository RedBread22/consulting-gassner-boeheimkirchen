"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Battery, ShieldCheck } from "lucide-react";
import { standorte, ergebnis } from "../../../content/boeheimkirchen";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";

function formatNumber(n: number): string {
  return n.toLocaleString("de-AT");
}

export function Standorte() {
  return (
    <SectionWrapper id="standorte">
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
        Sieben Standorte für eine unabhängige Gemeinde
      </h2>
      <p className="text-fg-muted text-lg mb-16 max-w-2xl">
        Insgesamt {formatNumber(ergebnis.gesamtLeistung_kWp)} kWp installierte
        Leistung und {ergebnis.gesamtSpeicher_kWh} kWh Speicherkapazität.
        Klicken Sie auf einen Standort für Details.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {standorte.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link
              href={`/standorte/${s.slug}`}
              className="group block border border-[#E5E5E5] hover:border-[#111111] hover:-translate-y-[2px] transition-all duration-200"
            >
              <ImagePlaceholder label={s.bildPlatzhalter} />

              <div className="p-6">
                <h3 className="font-serif text-2xl tracking-tight mb-2">
                  {s.name}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs uppercase tracking-[0.1em] text-fg-muted border border-border px-2 py-1">
                    {s.typ}
                  </span>
                  {s.besonderheit && (
                    <span className="text-xs uppercase tracking-[0.1em] text-fg-muted border border-border px-2 py-1">
                      {s.besonderheit}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-6 text-sm text-fg-muted mb-4">
                  <span>{formatNumber(s.leistung_kWp)} kWp</span>
                  {s.speicher_kWh && (
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
        ))}
      </div>
    </SectionWrapper>
  );
}
