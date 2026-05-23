"use client";

import { MapPin, User, Calendar } from "lucide-react";
import { gemeinde, vorOrtTermin } from "../../../content/boeheimkirchen";
import { SectionWrapper } from "../ui/SectionWrapper";

export function Gemeinde() {
  return (
    <SectionWrapper id="gemeinde" soft>
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-16">
        Über die Marktgemeinde
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex gap-4">
          <MapPin className="w-5 h-5 text-fg-muted mt-1 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
              Bezirk
            </p>
            <p className="text-lg">
              {gemeinde.bezirk}, {gemeinde.bundesland}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <User className="w-5 h-5 text-fg-muted mt-1 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
              Bürgermeister
            </p>
            <p className="text-lg">
              {gemeinde.buergermeister.name}
            </p>
            <p className="text-sm text-fg-muted">{gemeinde.buergermeister.partei}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Calendar className="w-5 h-5 text-fg-muted mt-1 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
              Vor-Ort-Termin
            </p>
            <p className="text-lg">{vorOrtTermin.datum}</p>
            <p className="text-sm text-fg-muted">
              {vorOrtTermin.dauer}, {vorOrtTermin.ort}
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
