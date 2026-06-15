"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  X,
  type LucideIcon,
} from "lucide-react";
import {
  finanzierung,
  partner,
  video,
} from "../../../content/boeheimkirchen";
import { SectionWrapper } from "../ui/SectionWrapper";
import { LeasingChart } from "../ui/LeasingChart";

type Partner = (typeof partner)[number];

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

function PartnerLogo({
  src,
  alt,
  className = "h-16 md:h-20 w-auto max-w-[240px] object-contain object-left",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [fehlt, setFehlt] = useState(false);

  if (fehlt) {
    return (
      <div className="flex items-center">
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
      className={className}
    />
  );
}

/* Modal/Overlay mit den vollen Infos zu einem Partner.
   Schließbar per X, Backdrop-Klick und ESC. Body-Scroll gesperrt, Fokus-Falle,
   Fokus kehrt beim Schließen auf das auslösende Element zurück. */
function PartnerModal({
  p,
  scrollToPdf,
  onClose,
}: {
  p: Partner;
  scrollToPdf: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  // Body-Scroll sperren + Fokus beim Schließen zurückgeben
  useEffect(() => {
    const zuvorFokussiert = document.activeElement as HTMLElement | null;
    const overflowVorher = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowVorher;
      zuvorFokussiert?.focus?.();
    };
  }, []);

  // ESC zum Schließen + Fokus-Falle (Tab bleibt im Modal)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null || el.tagName === "IFRAME");
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Initialer Fokus ins Modal — ggf. direkt zur eingebetteten PDF scrollen
  useEffect(() => {
    const panel = panelRef.current;
    const erstes = panel?.querySelector<HTMLElement>(
      'button, a[href], [tabindex]:not([tabindex="-1"])',
    );
    erstes?.focus();

    if (scrollToPdf && pdfRef.current) {
      pdfRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [scrollToPdf]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-fg/60 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`partner-modal-${p.key}`}
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-bg shadow-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-2xl"
      >
        {/* Kopf mit Schließen-Button (bleibt beim Scrollen sichtbar) */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-bg/95 px-6 py-5 backdrop-blur md:px-8">
          <PartnerLogo
            src={p.logoSrc}
            alt={p.name}
            className="h-11 w-auto max-w-[200px] object-contain object-left"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="flex-shrink-0 -mr-2 -mt-1 flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-bg-soft hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Inhalt: Name, Steckbrieftext, Website-Link */}
        <div className="px-6 py-6 md:px-8">
          <h3
            id={`partner-modal-${p.key}`}
            className="font-serif text-2xl tracking-tight md:text-3xl"
          >
            {p.name}
          </h3>
          <p className="mt-2 text-xs uppercase tracking-[0.12em] text-fg-muted">
            {p.tagline}
          </p>
          <p className="mt-5 text-base leading-relaxed text-fg-muted">
            {p.beschreibung}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
            >
              <Globe className="h-4 w-4" strokeWidth={1.5} />
              Website
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            {p.pdf && (
              <a
                href={p.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                <FileText className="h-4 w-4" strokeWidth={1.5} />
                PDF in neuem Tab öffnen
              </a>
            )}
          </div>
        </div>

        {/* Speziell für Van Tatsch: PDF unten eingebettet, eigener Scroll */}
        {p.pdf && (
          <div
            ref={pdfRef}
            className="border-t border-border px-6 pb-6 pt-5 md:px-8"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.12em] text-fg-muted">
              Steckbrief als PDF
            </p>
            <div className="h-[60vh] w-full overflow-hidden rounded-lg border border-border bg-bg-soft sm:h-[520px]">
              <iframe
                src={p.pdf}
                title={`PDF ${p.name}`}
                className="h-full w-full"
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>,
    document.body,
  );
}

function PartnerKarte({
  p,
  onOpen,
}: {
  p: Partner;
  onOpen: (scrollToPdf: boolean) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      onClick={() => onOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(false);
        }
      }}
      className="group flex h-full cursor-pointer flex-col rounded-xl border border-border bg-bg p-6 text-left transition-colors hover:border-fg/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <PartnerLogo src={p.logoSrc} alt={p.name} />

      <p className="mt-6 text-xs uppercase tracking-[0.12em] text-fg-muted">
        {p.tagline}
      </p>
      <p className="mt-3 flex-1 text-base leading-relaxed text-fg-muted">
        {p.beschreibung}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
        >
          <Globe className="h-4 w-4" strokeWidth={1.5} />
          Website
          <ArrowRight className="h-3.5 w-3.5" />
        </a>

        {p.pdf && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(true);
            }}
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <FileText className="h-4 w-4" strokeWidth={1.5} />
            PDF ansehen
          </button>
        )}
      </div>

      <span className="mt-5 inline-flex items-center gap-1 text-xs uppercase tracking-[0.12em] text-fg-muted transition-colors group-hover:text-fg">
        Mehr erfahren
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </div>
  );
}

function Digitalisierung() {
  // Geöffneter Partner + ob direkt zur eingebetteten PDF gescrollt werden soll
  const [aktiv, setAktiv] = useState<{
    p: Partner;
    scrollToPdf: boolean;
  } | null>(null);

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
          <PartnerKarte
            key={p.key}
            p={p}
            onOpen={(scrollToPdf) => setAktiv({ p, scrollToPdf })}
          />
        ))}
      </div>

      {aktiv && (
        <PartnerModal
          p={aktiv.p}
          scrollToPdf={aktiv.scrollToPdf}
          onClose={() => setAktiv(null)}
        />
      )}
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

      {/* Nahtlose, dauerhaft laufende Animation — kein klassischer Player.
          autoPlay/loop/muted/playsInline (muted ist Pflicht fürs Autoplay),
          keine Controls, kein Play-Overlay, kein Vollbild-Button.
          Quelle ist 480×528 (≈10:11, leicht hochformatig): object-contain +
          natives Seitenverhältnis zeigt das ganze Bild ohne Beschnitt, und die
          max-width = native Breite verhindert unscharfes Hochskalieren. */}
      <div className="mx-auto w-full max-w-[480px] overflow-hidden rounded-xl border border-border bg-fg">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={video.poster}
          style={{ aspectRatio: "480 / 528" }}
          className="w-full object-contain bg-fg"
        >
          <source src={video.src} type="video/mp4" />
          Ihr Browser unterstützt das Video-Element nicht.
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
