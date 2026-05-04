"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "De Collectie",     href: "/collectie" },
  { label: "Over moroww",      href: "/over-moroww" },
  { label: "Partners",         href: "/partners" },
  { label: "Founding Partner", href: "/eigenaar-worden" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
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
            href="https://book.moroww.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white text-sm font-semibold px-5 py-2 transition-colors"
          >
            Maak een boeking
          </a>
        </div>

        <button
          className={`md:hidden p-2 transition-colors ${
            scrolled ? "text-moroww-black" : "text-white"
          }`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-moroww-border bg-white px-6 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-sm font-medium py-2 text-moroww-black"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://book.moroww.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-full bg-moroww-orange text-white text-sm font-semibold px-5 py-3 text-center"
            onClick={() => setOpen(false)}
          >
            Maak een boeking
          </a>
        </div>
      )}
    </nav>
  );
}
