import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Register } from "@/components/Register";
import { Link } from "@/i18n/navigation";
import { boekbareWoning, isIsoDatum } from "@/lib/boeking";

interface Props {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ code?: string; aankomst?: string }>;
}

export const metadata = { robots: { index: false, follow: false } };

export default async function BevestigdPage({ params, searchParams }: Props) {
  const { id, locale } = await params;
  const { code, aankomst } = await searchParams;
  const woning = boekbareWoning(id);
  if (!woning || !code) notFound();

  const t = await getTranslations("booking");
  const aankomstLabel = isIsoDatum(aankomst)
    ? new Intl.DateTimeFormat(locale === "nl" ? "nl-BE" : "en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: "UTC",
      }).format(new Date(`${aankomst}T00:00:00Z`))
    : null;

  // Een echte volgorde, dus genummerd: zo verloopt het na de boeking.
  const stappen = [
    t("next_1"),
    t("next_2"),
    t("next_3"),
    t("next_4", { time: woning.inCheckin }),
  ];

  return (
    <Register kant="gast">
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image src={woning.heroFoto} alt={woning.naam} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-mw-4 pb-mw-6">
          <p className="text-body-lg text-white/85">
            {aankomstLabel ? t("confirmed_line_date", { date: aankomstLabel }) : t("confirmed_line")}
          </p>
          <h1 className="mt-mw-2 text-display text-white" style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}>
            {t("see_you_in", { place: woning.naam })}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-mw-4 py-mw-8 lg:grid lg:grid-cols-12 lg:gap-mw-6">
        <div className="lg:col-span-6">
          <p className="max-w-mw-gast text-body-lg text-moroww-dark">{t("confirmed_body")}</p>
          <p className="mt-mw-4 text-body text-moroww-ink-2">
            {t("confirmation_code")}: <span className="font-semibold text-moroww-dark">{code}</span>
          </p>
        </div>
        <div className="mt-mw-6 lg:col-span-5 lg:col-start-8 lg:mt-0">
          <h2 className="text-h3 text-moroww-dark">{t("next_title")}</h2>
          <ol className="mt-mw-3 space-y-mw-3">
            {stappen.map((s, i) => (
              <li key={i} className="flex gap-mw-3 text-body text-moroww-dark">
                <span className="tabular-nums text-moroww-label font-semibold">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <Link
            href={{ pathname: "/collectie/[id]", params: { id: woning.id } }}
            className="mt-mw-6 inline-block text-body text-moroww-dark underline underline-offset-4"
          >
            {t("back_to_home")}
          </Link>
        </div>
      </div>
    </Register>
  );
}
