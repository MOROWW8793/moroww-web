import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: { canonical: "https://www.moroww.com/contact" },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')
  return (
    <div className="bg-moroww-blush min-h-screen flex items-center">
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-moroww-orange mb-4">
          {t('label')}
        </p>
        <h1 className="font-bold text-moroww-black text-4xl md:text-5xl mb-6 leading-tight">
          {t('h1')}
        </h1>
        <p className="text-moroww-black/60 text-lg mb-10 leading-relaxed">
          {t('subtitle')}
        </p>

        <div className="flex flex-col gap-4 items-center">
          <a
            href="mailto:info@moroww.com"
            className="inline-flex items-center justify-center w-full max-w-xs rounded-full border-2 border-moroww-black text-moroww-black font-semibold px-8 py-4 text-base hover:bg-moroww-black hover:text-white transition-colors duration-200"
          >
            info@moroww.com
          </a>

          <a
            href="https://www.instagram.com/moroww.com_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full max-w-xs rounded-full border-2 border-moroww-black text-moroww-black font-semibold px-8 py-4 text-base hover:bg-moroww-black hover:text-white transition-colors duration-200"
          >
            Instagram
          </a>

          <a
            href="https://calendar.app.google/BH8wYeA9AGf6KrUz7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full max-w-xs rounded-full bg-moroww-orange hover:bg-moroww-orange/85 text-white font-semibold px-8 py-4 text-base transition-colors duration-200"
          >
            {t('cta_calendar')}
          </a>
        </div>

        <p className="mt-10 text-sm text-moroww-black/40">
          {t('footnote')}
        </p>
      </div>
    </div>
  );
}
