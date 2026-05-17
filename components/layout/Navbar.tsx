"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const links = [
  { label: "De Collectie",     href: "/collectie" },
  { label: "Over moroww",      href: "/over-moroww" },
  { label: "Partners",         href: "/partners" },
  { label: "Eigenaar worden", href: "/eigenaar-worden" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 shadow-sm transition-all duration-300 relative ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="moroww"
            width={120}
            height={32}
            className={`h-8 w-auto object-contain transition-all duration-300 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-moroww-black/70 hover:text-moroww-black"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://book.moroww.com/nl/properties?minOccupancy=1"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white text-sm font-semibold px-5 py-2 transition-colors"
          >
            Maak een boeking
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 min-h-[44px] items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Menu openen"
        >
          <span className={`block w-6 h-0.5 transition-all duration-200 ${
            scrolled ? "bg-moroww-black" : "bg-white"
          } ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all duration-200 ${
            scrolled ? "bg-moroww-black" : "bg-white"
          } ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 transition-all duration-200 ${
            scrolled ? "bg-moroww-black" : "bg-white"
          } ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-[#FAE4D6] px-6 py-8 z-50 flex flex-col gap-2 shadow-lg">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-lg font-medium text-[#1A1A1A] py-3 min-h-[44px] flex items-center"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://book.moroww.com/nl/properties?minOccupancy=1"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-[#FEA05E] text-white rounded-full px-6 py-3 text-base font-semibold text-center min-h-[44px] flex items-center justify-center"
            onClick={() => setOpen(false)}
          >
            Maak een boeking
          </a>
        </div>
      )}
    </nav>
  );
}
