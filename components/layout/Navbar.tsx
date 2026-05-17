'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { label: 'De Collectie',   href: '/collectie' },
  { label: 'Over moroww',    href: '/over-moroww' },
  { label: 'Partners',       href: '/partners' },
  { label: 'Eigenaar worden', href: '/eigenaar-worden' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'bg-[#FAE4D6] shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 h-16 relative">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="moroww"
            width={120}
            height={32}
            className={`h-8 w-auto object-contain transition-all duration-300 ${
              scrolled ? '' : 'brightness-0 invert'
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? 'text-[#1A1A1A] hover:text-[#FEA05E]'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://book.moroww.com/nl/properties?minOccupancy=1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FEA05E] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#e8904e] transition-colors"
          >
            Maak een boeking
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 min-h-[44px] items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Menu openen"
        >
          <span className={`block w-6 h-0.5 transition-all duration-200 ${
            scrolled ? 'bg-[#1A1A1A]' : 'bg-white'
          } ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-200 ${
            scrolled ? 'bg-[#1A1A1A]' : 'bg-white'
          } ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-200 ${
            scrolled ? 'bg-[#1A1A1A]' : 'bg-white'
          } ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobiel menu */}
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
    </header>
  )
}
