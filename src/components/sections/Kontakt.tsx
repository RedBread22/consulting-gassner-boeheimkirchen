"use client";

import Image from "next/image";
import { Phone, Mail, Globe } from "lucide-react";
import { kontakt } from "../../../content/boeheimkirchen";
import { SectionWrapper } from "../ui/SectionWrapper";

export function Kontakt() {
  return (
    <SectionWrapper id="kontakt" soft>
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <Image
            src={kontakt.logoSrc}
            alt="Consulting Gassner"
            width={240}
            height={72}
            className="h-16 w-auto mx-auto"
          />
        </div>

        <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
          Nächste Schritte
        </h2>
        <p className="text-lg text-fg-muted mb-12">
          Lassen Sie uns gemeinsam die Umsetzung planen.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-fg-muted">
          <a
            href={`tel:${kontakt.telefon}`}
            className="flex items-center gap-2 hover:text-fg transition-colors"
          >
            <Phone className="w-4 h-4" strokeWidth={1.5} />
            {kontakt.telefon}
          </a>
          <a
            href={`mailto:${kontakt.email}`}
            className="flex items-center gap-2 hover:text-fg transition-colors"
          >
            <Mail className="w-4 h-4" strokeWidth={1.5} />
            {kontakt.email}
          </a>
          <a
            href={`https://${kontakt.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-fg transition-colors"
          >
            <Globe className="w-4 h-4" strokeWidth={1.5} />
            {kontakt.website}
          </a>
        </div>

        <p className="text-sm text-fg-muted mb-8">
          {kontakt.ansprechpartner} · {kontakt.adresse}
        </p>

        <a
          href={kontakt.terminBuchenUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-fg text-bg border-2 border-fg px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium cursor-pointer hover:bg-bg hover:text-fg transition-colors duration-200"
        >
          Termin vereinbaren
        </a>
      </div>
    </SectionWrapper>
  );
}
