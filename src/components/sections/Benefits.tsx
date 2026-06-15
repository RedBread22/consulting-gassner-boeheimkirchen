"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  Receipt,
  Coins,
  Activity,
  Wallet,
  Landmark,
  Network,
  Play,
  ArrowRight,
  Globe,
  FileText,
  type LucideIcon,
} from "lucide-react";
import {
  finanzierung,
  partner,
  video,
} from "../../../content/boeheimkirchen";
import { SectionWrapper } from "../ui/SectionWrapper";
import { LeasingChart } from "../ui/LeasingChart";

const vorteilIcons: Record<string, LucideIcon> = {
  RefreshCw,
  Receipt,
  Coins,
  Activity,
  Wallet,
  Landmark,
};

function formatNumber(n: number): string {
  return n.toLocaleString("de-AT");
}

function formatCt(n: number): string {
  return n.toLocaleString("de-AT", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

/* ── Karten-Hülle ───────────────────────────────────────────────────────── */

function BenefitCard({
  index,
  kicker,
  titel,
  Icon,
  children,
}: {
  index: number;
  kicker: string;
  titel: string;
  Icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-bg p-6 md:p-10"
    >
      <div className="flex items-start gap-4 mb-8">
        <div className="flex-shrink-0 w-11 h-11 rounded-sm border border-border flex items-center justify-center">
          <Icon className="w-5 h-5 text-fg-muted" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-fg-muted">
            Benefit {index} · {kicker}
          </p>
          <h3 className="font-serif text-2xl md:text-3xl tracking-tight mt-1">
            {titel}
          </h3>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

/* ── Benefit 1 — Finanzierung ───────────────────────────────────────────── */

function Finanzierung() {
  const kennzahlen = [
    {
      label: "Preis pro kWh (Fixtarif)",
      value: `${formatCt(finanzierung.preisProKwh_ct)} ct`,
    },
    {
      label: "Geplante Laufzeit",
      value: `${finanzierung.laufzeit_jahre.toLocaleString("de-AT")} Jahre`,
    },
    {
      label: "Anschaffungswert (netto)",
      value: `${formatNumber(finanzierung.anschaffungswertNetto_eur)} €`,
    },
    {
      label: "PV-Leistung · Speicher",
      value: `${formatNumber(finanzierung.pvLeistung_kWp)} kWp · ${formatNumber(
        finanzierung.speicher_kWh,
      )} kWh`,
    },
  ];

  return (
    <BenefitCard index={1} kicker="Finanzierung" titel="Kapazitätsleasing" Icon={Wallet}>
      <p className="text-base md:text-lg leading-relaxed text-fg-muted mb-8 max-w-3xl">
        Die PV-Anlage wird nicht klassisch gekauft, sondern über den
        tatsächlichen Ertrag finanziert. Die Leasingrate richtet sich nach der
        PV-Produktion — im ertragsstarken Sommer höher, im Winter niedriger.
        <span className="block mt-3 text-fg">
          Rate = PV-Ertrag (kWh) × Fixpreis pro kWh
        </span>
      </p>

      {/* Kennzahlen-Block aus dem Richtangebot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden mb-10">
        {kennzahlen.map((k) => (
          <div key={k.label} className="bg-bg p-5">
            <p className="font-serif text-2xl md:text-3xl tracking-tight">
              {k.value}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-fg-muted leading-snug">
              {k.label}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-fg-muted mb-10 -mt-6">
        Eckdaten aus dem Richtangebot · Consulting Gassner · Stand{" "}
        {finanzierung.stand}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Vorteile */}
        <ul className="space-y-4">
          {finanzierung.vorteile.map((v) => {
            const Icon = vorteilIcons[v.icon] ?? Receipt;
            return (
              <li key={v.text} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bg-soft flex items-center justify-center mt-0.5">
                  <Icon className="w-4 h-4 text-fg" strokeWidth={1.5} />
                </div>
                <p className="text-base leading-relaxed pt-1">{v.text}</p>
              </li>
            );
          })}
        </ul>

        {/* Visual: Leasingrate folgt dem PV-Ertrag */}
        <div className="rounded-xl bg-bg-soft border border-border p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.15em] text-fg-muted mb-1">
            Leasingrate folgt dem PV-Ertrag
          </p>
          <p className="text-sm text-fg-muted mb-5">
            Illustrativer Jahresverlauf über 12 Monate
          </p>
          <LeasingChart
            daten={finanzierung.monatsverlauf}
            preisProKwh_ct={finanzierung.preisProKwh_ct}
          />
        </div>
      </div>
    </BenefitCard>
  );
}

/* ── Benefit 2 — Digitalisierung ────────────────────────────────────────── */

function PartnerLogo({ src, alt }: { src: string; alt: string }) {
  const [fehlt, setFehlt] = useState(false);

  if (fehlt) {
    return (
      <div className="h-12 flex items-center">
        <span className="font-serif text-xl tracking-tight">{alt}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFehlt(true)}
      className="h-12 w-auto max-w-[180px] object-contain object-left"
    />
  );
}

function PartnerKarte({ p }: { p: (typeof partner)[number] }) {
  const [pdfOffen, setPdfOffen] = useState(false);

  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-bg p-6">
      <PartnerLogo src={p.logoSrc} alt={p.name} />

      <p className="mt-5 text-xs uppercase tracking-[0.12em] text-fg-muted">
        {p.tagline}
      </p>
      <p className="mt-3 text-base leading-relaxed text-fg-muted flex-1">
        {p.beschreibung}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent transition-colors"
        >
          <Globe className="w-4 h-4" strokeWidth={1.5} />
          Website
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        {p.pdf && (
          <button
            type="button"
            onClick={() => setPdfOffen((o) => !o)}
            aria-expanded={pdfOffen}
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors"
          >
            <FileText className="w-4 h-4" strokeWidth={1.5} />
            {pdfOffen ? "PDF ausblenden" : "PDF ansehen"}
          </button>
        )}
      </div>

      {p.pdf && pdfOffen && (
        <div className="mt-5">
          <div className="w-full h-[60vh] min-h-[360px] border border-border rounded-lg bg-bg-soft overflow-hidden">
            <iframe src={p.pdf} title={`PDF ${p.name}`} className="w-full h-full" />
          </div>
          <a
            href={p.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-fg-muted underline hover:text-fg transition-colors"
          >
            PDF in neuem Tab öffnen
          </a>
        </div>
      )}
    </div>
  );
}

function Digitalisierung() {
  return (
    <BenefitCard
      index={2}
      kicker="Digitalisierung"
      titel="Ein starkes Partnernetzwerk"
      Icon={Network}
    >
      <p className="text-base md:text-lg leading-relaxed text-fg-muted mb-8 max-w-3xl">
        Über die Anlage hinaus begleitet ein Netzwerk spezialisierter Partner die
        Gemeinde — von der Energieberatung über KI-Kompetenz bis zu Web- und
        IT-Dienstleistungen.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {partner.map((p) => (
          <PartnerKarte key={p.key} p={p} />
        ))}
      </div>
    </BenefitCard>
  );
}

/* ── Benefit 3 — Video ──────────────────────────────────────────────────── */

function VideoBenefit() {
  return (
    <BenefitCard index={3} kicker="Video" titel={video.titel} Icon={Play}>
      <p className="text-base md:text-lg leading-relaxed text-fg-muted mb-8 max-w-3xl">
        {video.beschreibung}
      </p>

      <div className="rounded-xl overflow-hidden border border-border bg-fg">
        <video
          controls
          preload="metadata"
          playsInline
          poster={video.poster}
          className="w-full aspect-video bg-fg"
        >
          <source src={video.src} type="video/mp4" />
          Ihr Browser unterstützt das Video-Element nicht.{" "}
          <a href={video.src} className="underline">
            Video herunterladen
          </a>
          .
        </video>
      </div>
    </BenefitCard>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */

export function Benefits() {
  return (
    <SectionWrapper id="benefits">
      <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
        Drei Benefits für die Gemeinde
      </h2>
      <p className="text-fg-muted text-lg mb-16 max-w-2xl">
        Das Konzept bringt mehr als günstigen Strom: eine ertragsabhängige
        Finanzierung, ein digitales Partnernetzwerk und volle Transparenz über
        den Betrieb der Anlage.
      </p>

      <div className="space-y-6 md:space-y-8">
        <Finanzierung />
        <Digitalisierung />
        <VideoBenefit />
      </div>
    </SectionWrapper>
  );
}
