'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  footerKolommen,
  footerJuridisch,
  type FooterLink,
} from '@/lib/navigation'
import { OPEN_COOKIE_INSTELLINGEN } from '@/components/CookieBanner'

const INSTAGRAM_URL = 'https://www.instagram.com/moroww.com_/'
const LINKEDIN_URL = 'https://www.linkedin.com/company/moroww/'
const CONTACT_EMAIL = 'info@moroww.com'
const STARTIT_URL = 'https://www.kbc.be/ondernemen/nl/artikel/zelfstandige-worden/eigen-zaak-starten/wat-is-kbc-start-it.html'

// Voettekst: merkblok + drie linkkolommen op desktop, gestapeld met
// uitklapbare koppen op mobiel. Het merkblok staat altijd open, de
// linkkolommen starten dicht op mobiel zodat de voettekst één scherm blijft.
// Onderaan één balk met juridisch, cookies en socials.

function FooterLinkItem({
  link,
  label,
  onClick,
}: {
  link: FooterLink
  label: string
  onClick?: () => void
}) {
  if (link.extern) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
        onClick={onClick}
      >
        {label}
      </a>
    )
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Link href={link.href as any} className="hover:text-white transition-colors" onClick={onClick}>
      {label}
    </Link>
  )
}

export function Footer() {
  const t = useTranslations('footer')

  // Open-state per kolom. Op desktop altijd open, op mobiel start dicht.
  const [open, setOpen] = useState<boolean[]>(() => footerKolommen.map(() => true))
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => {
      const mob = mq.matches
      setIsMobile(mob)
      setOpen(footerKolommen.map(() => !mob))
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const wissel = (i: number) => setOpen((o) => o.map((v, j) => (j === i ? !v : v)))

  return (
    <footer className="bg-moroww-dark text-white w-full">
      <div className="mx-auto max-w-6xl px-6 md:px-16 lg:px-24 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">

          {/* Merkblok — altijd open, ook op mobiel */}
          <div>
            <Image
              src="/images/logo.png"
              alt="moroww"
              width={100}
              height={28}
              className="h-7 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              {t('tagline')}
            </p>
            <p className="text-xs text-white/25">
              {t('address_line')}
            </p>
            <p className="text-xs text-white/25 mt-1">
              {t('vat_line')}
            </p>
            <a
              href={STARTIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex flex-col gap-2 opacity-80 hover:opacity-100 transition-opacity"
            >
              <span className="text-audit uppercase text-white/40">{t('supported_by')}</span>
              <Image
                src="/images/partners/start-it-kbc.png"
                alt="Start it @KBC"
                width={550}
                height={213}
                className="h-10 w-auto"
              />
            </a>
          </div>

          {footerKolommen.map((kolom, i) => {
            const id = `footer-${kolom.titelKey}`
            return (
              <div key={kolom.titelKey}>
                <button
                  type="button"
                  className="w-full flex items-center justify-between text-audit uppercase text-white/70 lg:pointer-events-none lg:cursor-default min-h-[44px] py-3 lg:min-h-0 lg:py-0 mb-2 lg:mb-4"
                  onClick={() => wissel(i)}
                  aria-expanded={open[i]}
                  aria-controls={id}
                >
                  <span>{t(kolom.titelKey)}</span>
                  {isMobile && (
                    <span aria-hidden className="text-sm">{open[i] ? '−' : '+'}</span>
                  )}
                </button>
                {open[i] && (
                  <ul id={id} className="flex flex-col gap-2 text-sm text-white/50">
                    {kolom.links.map((link) => (
                      <li key={link.href}>
                        <FooterLinkItem link={link} label={t(link.labelKey)} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}

        </div>

        {/* Onderste balk — juridisch, cookies, contact en socials */}
        <div className="mt-12 lg:mt-16 pt-6 border-t border-white/10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-xs text-white/40">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-white/25">{t('copyright')}</span>
            {footerJuridisch.map((link) => (
              <FooterLinkItem key={link.href} link={link} label={t(link.labelKey)} />
            ))}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_INSTELLINGEN))}
              className="text-left hover:text-white transition-colors"
            >
              {t('cookie_settings')}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">
              {CONTACT_EMAIL}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
