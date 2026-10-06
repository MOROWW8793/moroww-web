import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Register } from "@/components/Register";
import { Link } from "@/i18n/navigation";
import { boekbareWoning } from "@/lib/boeking";

interface Props {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ code?: string }>;
}

export const metadata = { robots: { index: false, follow: false } };

export default async function BevestigdPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { code } = await searchParams;
  const woning = boekbareWoning(id);
  if (!woning || !code) notFound();

  const t = await getTranslations("booking");

  return (
    <Register kant="gast">
      <div className="mx-auto max-w-2xl px-mw-4 pt-32 pb-mw-10">
        <p className="text-audit uppercase text-moroww-label">{t("confirmed_kicker")}</p>
        <h1 className="mt-mw-3 text-h2 text-moroww-dark">{woning.naam}</h1>
        <p className="mt-mw-4 text-body text-moroww-dark max-w-mw-gast">{t("confirmed_body")}</p>
        <p className="mt-mw-4 text-body text-moroww-ink-2">
          {t("confirmation_code")}: <span className="font-semibold text-moroww-dark">{code}</span>
        </p>
        <Link
          href={{ pathname: "/collectie/[id]", params: { id: woning.id } }}
          className="mt-mw-5 inline-block text-body text-moroww-dark underline underline-offset-4"
        >
          {t("back_to_home")}
        </Link>
      </div>
    </Register>
  );
}
