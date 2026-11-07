'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import {
  gastenNavItems,
  nlOnlyRoutes,
  isDarkHeroPath,
} from '@/lib/navigation'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const locale = useLocale()
  const t = useTranslations('nav')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Escape sluit het mobiele menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const isNlOnly = nlOnlyRoutes.some((r) => pathname === r || pathname.startsWith(`${r}/`))

  const isDarkHero = isDarkHeroPath(pathname)
  const effectiveScrolled = scrolled || !isDarkHero

  function toggleLocale() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: locale === 'nl' ? 'en' : 'nl' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ease-out ${
        effectiveScrolled ? 'bg-moroww-blush shadow-sm' : 'bg-transparent'
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
            className={`h-8 w-auto object-contain transition-all duration-150 ${
              effectiveScrolled ? '' : 'brightness-0 invert'
            }`}
          />
        </Link>

        {/* Desktop nav — gastenkant links, eigenaarskant rechts (bouwspec 5A) */}
        <div className="hidden md:flex items-center gap-8">
          {gastenNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-150 ${
                effectiveScrolled
                  ? 'text-moroww-dark hover:text-moroww-orange'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {t(item.labelKey)}
            </Link>
          ))}

          {/* Kennisbank: eigen ingang (nov 2026) */}
          <Link
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            href={'/kennis' as any}
            className={`text-sm font-medium transition-colors duration-150 ${
              effectiveScrolled
                ? 'text-moroww-dark hover:text-moroww-orange'
                : 'text-white/90 hover:text-white'
            }`}
          >
            {t('knowledge')}
          </Link>

          {/* voor eigenaars: één knop naar het overzicht van de drie takken: label, how en hub (nov 2026). */}
          <Link
            href="/voor-eigenaars"
            className={`rounded-full px-5 py-2.5 text-sm font-semibold border transition-colors duration-150 ${
              effectiveScrolled
                ? 'border-moroww-dark text-moroww-dark hover:bg-moroww-dark hover:text-white'
                : 'border-white/80 text-white hover:bg-white hover:text-moroww-dark'
            }`}
          >
            {t('for_owners')}
          </Link>

          {/* Taalwisselaar */}
          {!isNlOnly && (
            <button
              onClick={toggleLocale}
              className={`text-sm font-medium transition-colors duration-150 px-2 py-1 ${
                effectiveScrolled
                  ? 'text-moroww-dark/60 hover:text-moroww-dark'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {locale === 'nl' ? 'EN' : 'NL'}
            </button>
          )}

          {/* CTA rechts: leidt naar /boeken (nov 2026), zoeken op data over de
              hele collectie op moroww.com. Niet naar book.moroww.com. */}
          <Link
            href="/boeken"
            className="bg-moroww-orange text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-moroww-orange/85 transition-colors"
          >
            {t('book')}
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 min-h-[44px] items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Menu openen"
          aria-expanded={open}
        >
          <span className={`block w-6 h-0.5 transition-all duration-200 ${
            effectiveScrolled ? 'bg-moroww-dark' : 'bg-white'
          } ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-200 ${
            effectiveScrolled ? 'bg-moroww-dark' : 'bg-white'
          } ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-200 ${
            effectiveScrolled ? 'bg-moroww-dark' : 'bg-white'
          } ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobiel menu — gastenkant + eigenaars-accordeon + taal + boek */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-moroww-blush px-6 py-8 z-50 flex flex-col gap-2 shadow-lg">
            {gastenNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-moroww-dark py-3 min-h-[44px] flex items-center"
                onClick={() => setOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}

            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={'/kennis' as any}
              className="text-lg font-medium text-moroww-dark py-3 min-h-[44px] flex items-center"
              onClick={() => setOpen(false)}
            >
              {t('knowledge')}
            </Link>
            <Link
              href="/voor-eigenaars"
              className="mt-2 border border-moroww-dark text-moroww-dark rounded-full px-6 py-3 text-base font-semibold text-center min-h-[44px] flex items-center justify-center"
              onClick={() => setOpen(false)}
            >
              {t('for_owners')}
            </Link>

            {!isNlOnly && (
              <button
                onClick={() => { toggleLocale(); setOpen(false) }}
                className="text-base font-medium text-moroww-dark/60 py-3 min-h-[44px] flex items-center text-left border-t border-moroww-rule mt-2 pt-4"
              >
                {locale === 'nl' ? 'English' : 'Nederlands'}
              </button>
            )}
            <Link
              href="/boeken"
              className="mt-2 bg-moroww-orange text-white rounded-full px-6 py-3 text-base font-semibold text-center min-h-[44px] flex items-center justify-center"
              onClick={() => setOpen(false)}
            >
              {t('book')}
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
