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

  const donker = !effectiveScrolled
  const actief = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  const link = (aan: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
      donker
        ? aan ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/15 hover:text-white'
        : aan ? 'bg-moroww-dark/[0.06] text-moroww-dark' : 'text-moroww-dark hover:bg-moroww-dark/[0.06]'
    }`

  // Zwevende glazen balk. Over een donkere hero is het glas donker en de
  // tekst wit; zodra je scrolt of op een lichte pagina staat, licht glas.
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <nav
        className={`relative mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border pl-5 pr-2 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-200 ease-out motion-reduce:transition-none ${
          donker
            ? 'bg-white/[0.12] border-white/25 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)]'
            : 'bg-white/75 border-white/70 shadow-[0_20px_50px_-30px_rgba(26,26,26,0.45)]'
        }`}
      >
        <Link href="/" className="shrink-0" aria-label="moroww">
          <Image
            src="/images/logo.png"
            alt="moroww"
            width={120}
            height={32}
            className={`h-7 w-auto object-contain transition-[filter] duration-150 motion-reduce:transition-none ${donker ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        {/* Desktop nav: gastenkant, dan de eigenaarskant, taal en de boekknop. */}
        <div className="hidden md:flex items-center gap-1">
          {gastenNavItems.map((item) => (
            <Link key={item.href} href={item.href} className={link(actief(item.href))} aria-current={actief(item.href) ? 'page' : undefined}>
              {t(item.labelKey)}
            </Link>
          ))}

          <Link
            href="/voor-eigenaars"
            className={`ml-1 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-150 ${
              donker
                ? 'border-white/50 text-white hover:bg-white hover:text-moroww-dark'
                : 'border-moroww-dark/25 text-moroww-dark hover:bg-moroww-dark hover:text-white'
            }`}
          >
            {t('for_owners')}
          </Link>

          {!isNlOnly && (
            <button
              onClick={toggleLocale}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                donker ? 'text-white/70 hover:bg-white/15 hover:text-white' : 'text-moroww-dark/60 hover:bg-moroww-dark/[0.06] hover:text-moroww-dark'
              }`}
            >
              {locale === 'nl' ? 'EN' : 'NL'}
            </button>
          )}

          {/* CTA rechts: leidt naar /boeken (nov 2026), zoeken op data over de
              hele collectie op moroww.com. Niet naar book.moroww.com. */}
          <Link
            href="/boeken"
            className="ml-1 bg-moroww-orange text-moroww-dark rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moroww-dark active:bg-moroww-orange/75 hover:bg-moroww-orange/85 transition-colors"
          >
            {t('book')}
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`md:hidden flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full transition-colors ${donker ? 'hover:bg-white/15' : 'hover:bg-moroww-dark/[0.06]'}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu openen"
          aria-expanded={open}
        >
          {[open ? 'rotate-45 translate-y-2' : '', open ? 'opacity-0' : '', open ? '-rotate-45 -translate-y-2' : ''].map((stand, i) => (
            <span
              key={i}
              className={`block w-5 h-0.5 transition-[transform,opacity,background-color] duration-200 motion-reduce:transition-none ${donker && !open ? 'bg-white' : 'bg-moroww-dark'} ${stand}`}
            />
          ))}
        </button>

        {/* Mobiel menu: glazen kaart onder de balk. */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 rounded-3xl border border-white/70 bg-white/90 backdrop-blur-xl backdrop-saturate-150 p-4 z-50 flex flex-col gap-1 shadow-[0_30px_80px_-30px_rgba(26,26,26,0.5)]">
            {gastenNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 text-lg font-medium text-moroww-dark min-h-[44px] flex items-center ${actief(item.href) ? 'bg-moroww-dark/[0.06]' : 'hover:bg-moroww-dark/[0.04]'}`}
                onClick={() => setOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}

            <Link
              href="/voor-eigenaars"
              className="mt-2 border border-moroww-dark/25 text-moroww-dark rounded-full px-6 py-3 text-base font-semibold text-center min-h-[44px] flex items-center justify-center"
              onClick={() => setOpen(false)}
            >
              {t('for_owners')}
            </Link>

            {!isNlOnly && (
              <button
                onClick={() => { toggleLocale(); setOpen(false) }}
                className="rounded-2xl px-4 text-base font-medium text-moroww-dark/60 py-3 min-h-[44px] flex items-center text-left"
              >
                {locale === 'nl' ? 'English' : 'Nederlands'}
              </button>
            )}
            <Link
              href="/boeken"
              className="bg-moroww-orange text-moroww-dark rounded-full px-6 py-3 text-base font-semibold text-center min-h-[44px] flex items-center justify-center"
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
