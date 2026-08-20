import Image from "next/image";
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { footerNavItems, kennisLinks } from '@/lib/navigation'

const INSTAGRAM_URL = 'https://www.instagram.com/moroww.com_/'
const LINKEDIN_URL = 'https://www.linkedin.com/company/moroww/'
const CALENDAR_URL = 'https://calendar.app.google/BH8wYeA9AGf6KrUz7'
const CONTACT_EMAIL = 'info@moroww.com'

export async function Footer() {
  const t = await getTranslations('footer')
  return (
    <footer className="bg-moroww-dark text-white w-full">
      <div className="mx-auto max-w-6xl px-6 md:px-16 lg:px-24 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {/* Links: tagline + bedrijfsregels + copyright */}
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
            <p className="text-xs text-white/25 mt-6">
              {t('copyright')}
            </p>
          </div>

          {/* Midden: kennis-kolom. Tweede interne route naar het cluster
              naast de dropdown in de nav — Google leest voettekstlinks als
              structuursignaal. */}
          <div className="flex flex-col gap-2 text-sm text-white/50">
            <p className="text-audit uppercase text-white/40 mb-2">kennis</p>
            {kennisLinks.map((k) => (
              <Link
                key={k.href}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={k.href as any}
                className="hover:text-white transition-colors"
              >
                {k.titel}
              </Link>
            ))}
          </div>

          {/* Rechts: navigatielinks + contact/social */}
          <div className="flex flex-col gap-2 text-sm text-white/50">
            {footerNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {t(item.labelKey)}
              </Link>
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
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {t('calendar_link')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
