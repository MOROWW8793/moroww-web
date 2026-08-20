'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import {
  gastenNavItems,
  eigenaarDropdown,
  nlOnlyRoutes,
  lightHeroRoutes,
} from '@/lib/navigation'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileEigenaarOpen, setMobileEigenaarOpen] = useState(false)
  const locale = useLocale()
  const t = useTranslations('nav')
  const router = useRouter()
  const pathname = usePathname()

  const dropdownWrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Escape sluit dropdown en mobiel menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (dropdownOpen) setDropdownOpen(false)
      if (open) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [dropdownOpen, open])

  // Klik buiten de dropdown sluit hem — anders blijft hij open na tab-navigatie.
  useEffect(() => {
    if (!dropdownOpen) return
    const onClick = (e: MouseEvent) => {
      if (!dropdownWrapper.current) return
      if (!dropdownWrapper.current.contains(e.target as Node)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [dropdownOpen])

  const bookUrl = `https://book.moroww.com/${locale}/properties?minOccupancy=1`

  const isNlOnly = nlOnlyRoutes.some((r) => pathname === r || pathname.startsWith(`${r}/`))

  const isLightHero = lightHeroRoutes.some((r) => pathname === r || pathname.startsWith(`${r}/`))
  const effectiveScrolled = scrolled || isLightHero

  function toggleLocale() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: locale === 'nl' ? 'en' : 'nl' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
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
            className={`h-8 w-auto object-contain transition-all duration-300 ${
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
              className={`text-sm font-medium transition-colors duration-300 ${
                effectiveScrolled
                  ? 'text-moroww-dark hover:text-moroww-orange'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {t(item.labelKey)}
            </Link>
          ))}

          {/* Dropdown "voor eigenaars ▾" */}
          <div
            ref={dropdownWrapper}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              onFocus={() => setDropdownOpen(true)}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              className={`text-sm font-medium transition-colors duration-300 inline-flex items-center gap-1.5 ${
                effectiveScrolled
                  ? 'text-moroww-dark hover:text-moroww-orange'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {t('for_owners')}
              <span aria-hidden className="text-xs">▾</span>
            </button>

            {dropdownOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-3 w-[22rem] bg-moroww-paper border border-moroww-rule p-mw-4"
                style={{ borderRadius: 2 }}
              >
                <ul className="flex flex-col">
                  {eigenaarDropdown.map((item) => (
                    <li key={item.href}>
                      <Link
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        href={item.href as any}
                        role="menuitem"
                        className="block py-mw-3 px-mw-3 hover:bg-moroww-rule/40 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <p className="text-moroww-dark font-semibold text-sm">{item.titel}</p>
                        <p className="text-audit uppercase text-moroww-ink-2 mt-1">
                          {item.toelichting}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <hr className="my-mw-3 border-0 border-t border-moroww-rule" aria-hidden />
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={'/kennis' as any}
                  role="menuitem"
                  className="block py-mw-3 px-mw-3 text-audit uppercase text-moroww-dark hover:bg-moroww-rule/40 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  alle kennispagina&apos;s →
                </Link>
              </div>
            )}
          </div>

          {/* Taalwisselaar */}
          {!isNlOnly && (
            <button
              onClick={toggleLocale}
              className={`text-sm font-medium transition-colors duration-300 px-2 py-1 ${
                effectiveScrolled
                  ? 'text-moroww-dark/60 hover:text-moroww-dark'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {locale === 'nl' ? 'EN' : 'NL'}
            </button>
          )}

          {/* Book CTA — blijft rechts, oranje */}
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-moroww-orange text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-moroww-orange/85 transition-colors"
          >
            {t('book')}
          </a>
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

            {/* voor eigenaars — uitklapbaar accordeon */}
            <div className="border-t border-moroww-rule mt-2 pt-2">
              <button
                type="button"
                className="w-full text-lg font-medium text-moroww-dark py-3 min-h-[44px] flex items-center justify-between"
                onClick={() => setMobileEigenaarOpen((v) => !v)}
                aria-expanded={mobileEigenaarOpen}
              >
                <span>{t('for_owners')}</span>
                <span aria-hidden className="text-sm">{mobileEigenaarOpen ? '−' : '+'}</span>
              </button>
              {mobileEigenaarOpen && (
                <ul className="flex flex-col pl-4 border-l border-moroww-rule">
                  {eigenaarDropdown.map((item) => (
                    <li key={item.href}>
                      <Link
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        href={item.href as any}
                        className="block py-3 min-h-[44px]"
                        onClick={() => setOpen(false)}
                      >
                        <p className="text-moroww-dark font-medium">{item.titel}</p>
                        <p className="text-audit uppercase text-moroww-ink-2 mt-0.5">
                          {item.toelichting}
                        </p>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      href={'/kennis' as any}
                      className="block py-3 text-audit uppercase text-moroww-dark"
                      onClick={() => setOpen(false)}
                    >
                      alle kennispagina&apos;s →
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {!isNlOnly && (
              <button
                onClick={() => { toggleLocale(); setOpen(false) }}
                className="text-base font-medium text-moroww-dark/60 py-3 min-h-[44px] flex items-center text-left border-t border-moroww-rule mt-2 pt-4"
              >
                {locale === 'nl' ? 'English' : 'Nederlands'}
              </button>
            )}
            <a
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-moroww-orange text-white rounded-full px-6 py-3 text-base font-semibold text-center min-h-[44px] flex items-center justify-center"
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
