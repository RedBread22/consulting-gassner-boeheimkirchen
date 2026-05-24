"use client";

import { motion } from "framer-motion";

type Props = {
  value: string;
  label: string;
  suffix?: string;
};

export function KpiNumber({ value, label, suffix }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center min-w-0 overflow-hidden"
    >
      <p className="font-serif text-5xl md:text-6xl tracking-tight text-fg leading-none">
        {value}
        {suffix && (
          <span className="text-2xl text-fg-muted ml-1 align-baseline">
            {suffix}
          </span>
        )}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-fg-muted font-sans">
        {label}
      </p>
    </motion.div>
  );
}
