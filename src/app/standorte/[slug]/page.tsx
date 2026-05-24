import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Battery, ShieldCheck } from "lucide-react";
import { standorte } from "../../../../content/boeheimkirchen";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function generateStaticParams() {
  return standorte.map((s) => ({ slug: s.slug }));
}

type Props = {
  params: { slug: string };
};

function formatNumber(n: number): string {
  return n.toLocaleString("de-AT");
}

export default function StandortDetail({ params }: Props) {
  const standort = standorte.find((s) => s.slug === params.slug);

  if (!standort) {
    notFound();
  }

  return (
    <main className="pt-16">
      <div className="max-w-content mx-auto px-6 py-12 md:py-20">
        <Link
          href="/#standorte"
          className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Übersicht
        </Link>

        <div className="mb-12">
          {standort.bildSrc ? (
            <Image
              src={standort.bildSrc}
              alt={standort.name}
              width={800}
              height={600}
              unoptimized={true}
              className="w-full aspect-[4/3] object-cover"
            />
          ) : (
            <ImagePlaceholder label={standort.bildPlatzhalter} />
          )}
        </div>

        <h1 className="font-serif text-4xl md:text-6xl tracking-tight mb-6">
          {standort.name}
        </h1>

        <p className="text-lg text-fg-muted leading-relaxed max-w-3xl mb-12">
          {standort.beschreibung}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-border">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
              Leistung
            </p>
            <p className="font-serif text-3xl">
              {formatNumber(standort.leistung_kWp)}{" "}
              <span className="text-lg text-fg-muted">kWp</span>
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
              Typ
            </p>
            <p className="text-lg">{standort.typ}</p>
          </div>

          {standort.speicher_kWh && (
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
                Speicher
              </p>
              <p className="font-serif text-3xl flex items-center gap-2">
                <Battery className="w-5 h-5 text-fg-muted" strokeWidth={1.5} />
                {standort.speicher_kWh}{" "}
                <span className="text-lg text-fg-muted">kWh</span>
              </p>
            </div>
          )}

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
              Notstrom
            </p>
            {standort.notstrom ? (
              <p className="text-lg flex items-center gap-2 text-accent">
                <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
                Blackoutfähig
              </p>
            ) : (
              <p className="text-lg text-fg-muted">Nicht vorgesehen</p>
            )}
          </div>
        </div>

        {standort.besonderheit && (
          <div className="mt-8 p-6 bg-bg-soft border border-border">
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-2">
              Besonderheit
            </p>
            <p className="text-lg">{standort.besonderheit}</p>
          </div>
        )}
      </div>
    </main>
  );
}
