import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { siteMetadata } from "@/lib/seo/siteMetadata";
import { voorwaarden } from "@/lib/voorwaarden";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === "nl";
  return siteMetadata({
    titel: isNl ? "Algemene voorwaarden voor gasten" : "Terms and conditions for guests",
    beschrijving: isNl
      ? "De voorwaarden voor een verblijf in een moroww-woning: boeking, betaling, annulering en aansprakelijkheid."
      : "The terms for a stay in a moroww home: booking, payment, cancellation and liability.",
    pad: isNl ? "/voorwaarden" : "/en/terms",
    locale: isNl ? "nl" : "en",
    hreflang: { nl: "/voorwaarden", en: "/en/terms" },
  });
}

export default async function VoorwaardenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const v = voorwaarden[locale === "en" ? "en" : "nl"];

  return (
    <div className="bg-moroww-blush min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <h1 className="text-h2 text-moroww-dark">{v.titel}</h1>
        {v.intro.map((p) => (
          <p key={p} className="mt-mw-3 text-body text-moroww-ink-2">
            {p}
          </p>
        ))}

        {v.delen.map((deel) => (
          <section key={deel.titel} className="mt-mw-8">
            <h2 className="text-audit uppercase text-moroww-label">{deel.titel}</h2>
            {deel.artikelen.map((artikel) => (
              <div key={artikel.titel} className="mt-mw-5">
                <h3 className="text-h3 text-moroww-dark">{artikel.titel}</h3>
                {artikel.leden.map((lid, i) =>
                  Array.isArray(lid) ? (
                    <ul key={i} className="mt-mw-2 list-disc pl-5 space-y-1 text-body text-moroww-dark">
                      {lid.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i} className="mt-mw-2 text-body text-moroww-dark">
                      {lid}
                    </p>
                  ),
                )}
              </div>
            ))}
          </section>
        ))}

        <hr className="my-mw-8 border-0 border-t border-moroww-rule" aria-hidden />
        {v.voet.map((p) => (
          <p key={p} className="text-sm text-moroww-ink-2">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
