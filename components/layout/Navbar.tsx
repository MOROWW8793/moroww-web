"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Collectie",      href: "/collectie" },
  { label: "Over moroww",   href: "/over-moroww" },
  { label: "Eigenaar worden", href: "/eigenaar-worden" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-moroww-blush/90 backdrop-blur-sm border-b border-moroww-border">
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.png" alt="moroww" width={120} height={32} className="h-8 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-moroww-black/70 hover:text-moroww-black transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/collectie"
            className="rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white text-sm font-semibold px-5 py-2 transition-colors"
          >
            Ontdek de collectie
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-moroww-border bg-moroww-blush px-6 py-4 space-y-3">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-sm font-medium py-2"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/collectie"
            className="block rounded-full bg-moroww-orange text-white text-sm font-semibold px-5 py-3 text-center"
            onClick={() => setOpen(false)}
          >
            Ontdek de collectie
          </Link>
        </div>
      )}
    </nav>
  );
}
