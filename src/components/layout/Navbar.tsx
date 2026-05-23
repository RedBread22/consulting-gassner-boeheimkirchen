"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Gemeinde", href: "#gemeinde" },
  { label: "Ist-Zustand", href: "#aktueller-stand" },
  { label: "Konzept", href: "#konzept" },
  { label: "Standorte", href: "#standorte" },
  { label: "Ergebnis", href: "#ergebnis" },
  { label: "Ladestationen", href: "#ladestationen" },
  { label: "Kontakt", href: "#kontakt" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border">
      <div className="max-w-content mx-auto px-6 flex items-center justify-between h-16">
        <a href="/" className="font-serif text-lg tracking-tight">
          Energiekonzept
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-fg-muted hover:text-fg transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2"
          aria-label="Menü öffnen"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-bg border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-fg-muted hover:text-fg transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
