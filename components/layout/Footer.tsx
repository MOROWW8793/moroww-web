'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  footerCollectieLinks,
  footerEigenaarLinks,
  type FooterLink,
} from '@/lib/navigation'

const INSTAGRAM_URL = 'https://www.instagram.com/moroww.com_/'
const LINKEDIN_URL = 'https://www.linkedin.com/company/moroww/'
const CONTACT_EMAIL = 'info@moroww.com'

// Voettekst in drie kolommen op desktop, gestapeld met uitklapbare koppen
// op mobiel. Kolom 1 (bedrijfsgegevens) staat altijd open — kolom 2 en 3
// starten dicht op mobiel zodat de voettekst één scherm blijft.

function FooterLinkItem({ link, onClick }: { link: FooterLink; onClick?: () => void }) {
  if (link.extern) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
        onClick={onClick}
      >
        {link.titel}
      </a>
    )
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Link href={link.href as any} className="hover:text-white transition-colors" onClick={onClick}>
      {link.titel}
    </Link>
  )
}

export function Footer() {
  const t = useTranslations('footer')

  // Open-state per kolom. Op desktop altijd open, op mobiel start dicht.
  // matchMedia bepaalt eenmalig bij mount + volgt resize.
  const [col2Open, setCol2Open] = useState(true)
  const [col3Open, setCol3Open] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => {
      const mob = mq.matches
      setIsMobile(mob)
      // Op resize naar mobiel: sluit beide kolommen. Naar desktop: open beide.
      setCol2Open(!mob)
      setCol3Open(!mob)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <footer className="bg-moroww-dark text-white w-full">
      <div className="mx-auto max-w-6xl px-6 md:px-16 lg:px-24 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">

          {/* Kolom 1 — altijd open, ook op mobiel */}
          <div>
            <Image
              src="/images/logo.png"
              alt="moroww"
              width={100}
              height={28}
              className="h-7 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              niets aan het toeval overgelaten.
            </p>
            <p className="text-xs text-white/25">
              {t('address_line')}
            </p>
            <p className="text-xs text-white/25 mt-1">
              {t('vat_line')}
            </p>
            <p className="text-xs text-white/25 mt-6">
              {t('copyright')}
            </p>
          </div>

          {/* Kolom 2 — de collectie */}
          <div>
            <button
              type="button"
              className="w-full flex items-center justify-between text-audit uppercase text-white/70 lg:pointer-events-none lg:cursor-default py-2 lg:py-0 mb-2 lg:mb-4"
              onClick={() => setCol2Open((v) => !v)}
              aria-expanded={col2Open}
              aria-controls="footer-col-collectie"
            >
              <span>de collectie</span>
              {isMobile && (
                <span aria-hidden className="text-sm">{col2Open ? '−' : '+'}</span>
              )}
            </button>
            {col2Open && (
              <ul id="footer-col-collectie" className="flex flex-col gap-2 text-sm text-white/50">
                {footerCollectieLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Kolom 3 — voor eigenaars + contact/social */}
          <div>
            <button
              type="button"
              className="w-full flex items-center justify-between text-audit uppercase text-white/70 lg:pointer-events-none lg:cursor-default py-2 lg:py-0 mb-2 lg:mb-4"
              onClick={() => setCol3Open((v) => !v)}
              aria-expanded={col3Open}
              aria-controls="footer-col-eigenaars"
            >
              <span>voor eigenaars</span>
              {isMobile && (
                <span aria-hidden className="text-sm">{col3Open ? '−' : '+'}</span>
              )}
            </button>
            {col3Open && (
              <div id="footer-col-eigenaars" className="flex flex-col gap-2 text-sm text-white/50">
                {footerEigenaarLinks.map((link) => (
                  <FooterLinkItem key={link.href} link={link} />
                ))}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-white transition-colors mt-4"
                >
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </footer>
  )
}
