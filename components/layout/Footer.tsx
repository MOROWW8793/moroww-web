import Image from "next/image";
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { footerNavItems } from '@/lib/navigation'

export async function Footer() {
  const t = await getTranslations('footer')
  return (
    <footer className="bg-[#1A1A1A] text-white w-full">
      <div className="mx-auto max-w-6xl px-6 md:px-16 lg:px-24 py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Logo + tagline + adres */}
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
          </div>

          {/* Sitemap */}
          <div>
            <nav className="flex flex-col gap-2 text-sm text-white/50">
              {footerNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
