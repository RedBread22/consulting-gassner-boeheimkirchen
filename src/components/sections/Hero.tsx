"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { gemeinde, aktuellerStand, ergebnis } from "../../../content/boeheimkirchen";
import { PieChartDisplay } from "../ui/PieChartVorherNachher";

export function Hero() {
  const [showNachher, setShowNachher] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNachher(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const eigennutzen = showNachher
    ? ergebnis.pvNachher.eigennutzen_prozent
    : aktuellerStand.pv.eigennutzen_prozent;
  const ueberschuss = showNachher
    ? ergebnis.pvNachher.ueberschuss_prozent
    : aktuellerStand.pv.ueberschuss_prozent;

  return (
    <section className="min-h-screen flex items-center pt-16 relative">
      <div className="max-w-content mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            className="flex-1 lg:max-w-[60%]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-[#F0F0EE] border border-dashed border-[#D0D0CC] flex items-center justify-center text-xs text-fg-muted">
                Logo
              </div>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] leading-[1.05] tracking-tight">
              Energiekonzept
              <br />
              {gemeinde.shortName}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-fg-muted leading-relaxed max-w-xl">
              Eine wirtschaftlich optimale, förderfähige Energielösung für die{" "}
              {gemeinde.name} — erarbeitet von Consulting Gassner.
            </p>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="text-xs uppercase tracking-[0.15em] text-fg-muted text-center mb-4">
              Eigennutzen-Quote {showNachher ? "nachher" : "vorher"}
              {!showNachher && " → nachher"}
            </p>
            <PieChartDisplay
              eigennutzen={eigennutzen}
              ueberschuss={ueberschuss}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-6 h-6 text-fg-muted/40" />
      </motion.div>
    </section>
  );
}
