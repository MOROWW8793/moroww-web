'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { mainNavItems, nlOnlyRoutes, lightHeroRoutes } from '@/lib/navigation'

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

  const bookUrl = `https://book.moroww.com/${locale}/properties?minOccupancy=1`

  // Taalwissel-knop verbergen op NL-only pagina's; anders zou een klik naar
  // een niet-bestaande EN-URL leiden (die redirect naar NL) en dat oogt stuk.
  const isNlOnly = nlOnlyRoutes.some((r) => pathname === r || pathname.startsWith(`${r}/`))

  // Op pagina's zonder donkere foto-hero: menu meteen in 'scrolled' state
  // (blush, donkere tekst) — anders is witte tekst onleesbaar op de lichte hero.
  const isLightHero = lightHeroRoutes.some((r) => pathname === r || pathname.startsWith(`${r}/`))
  const effectiveScrolled = scrolled || isLightHero

  function toggleLocale() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: locale === 'nl' ? 'en' : 'nl' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        effectiveScrolled ? 'bg-[#FAE4D6] shadow-sm' : 'bg-transparent'
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
              effectiveScrolled ? '' : 'brightness-0 invert'
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                effectiveScrolled
                  ? 'text-[#1A1A1A] hover:text-[#FEA05E]'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {t(item.labelKey)}
            </Link>
          ))}

          {/* Taalwisselaar — verborgen op NL-only pagina's */}
          {!isNlOnly && (
            <button
              onClick={toggleLocale}
              className={`text-sm font-medium transition-colors duration-300 px-2 py-1 ${
                effectiveScrolled
                  ? 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {locale === 'nl' ? 'EN' : 'NL'}
            </button>
          )}

          {/* Book CTA */}
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FEA05E] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#e8904e] transition-colors"
          >
            {t('book')}
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 min-h-[44px] items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Menu openen"
        >
          <span className={`block w-6 h-0.5 transition-all duration-200 ${
            effectiveScrolled ? 'bg-[#1A1A1A]' : 'bg-white'
          } ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-200 ${
            effectiveScrolled ? 'bg-[#1A1A1A]' : 'bg-white'
          } ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 transition-all duration-200 ${
            effectiveScrolled ? 'bg-[#1A1A1A]' : 'bg-white'
          } ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobiel menu */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-[#FAE4D6] px-6 py-8 z-50 flex flex-col gap-2 shadow-lg">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-[#1A1A1A] py-3 min-h-[44px] flex items-center"
                onClick={() => setOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            {!isNlOnly && (
              <button
                onClick={() => { toggleLocale(); setOpen(false) }}
                className="text-base font-medium text-[#1A1A1A]/60 py-3 min-h-[44px] flex items-center text-left border-t border-[#F0E4D8] mt-2 pt-4"
              >
                {locale === 'nl' ? 'English' : 'Nederlands'}
              </button>
            )}
            <a
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-[#FEA05E] text-white rounded-full px-6 py-3 text-base font-semibold text-center min-h-[44px] flex items-center justify-center"
              onClick={() => setOpen(false)}
            >
              {t('book')}
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
