import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductionPage } from "@/components/ProductionPage";
import { SHOWS, getShow } from "@/data/studio";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => SHOWS.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const show = getShow((await params).slug);
  if (!show) return {};
  return {
    title: show.title,
    description: `${show.title}: ${show.logline} A ${show.genre.toLowerCase()} production from Hush Studios.`,
    openGraph: show.art ? { images: [{ url: show.art }] } : undefined,
  };
}

export default async function ShowPage({ params }: Props) {
  const show = getShow((await params).slug);
  if (!show) notFound();
  return (
    <ProductionPage
      p={{
        back: { href: "/#originals", label: "Hush Originals" },
        kicker: `${show.kind} · ${show.genre}`,
        title: show.title,
        accent: show.accent,
        art: show.art,
        comingSoon: show.comingSoon,
        logline: show.logline,
        about: show.about,
        listen: show.listen,
        follow: show.follow,
        site: show.site,
        facts: show.comingSoon ? [] : [{ label: "Status", value: show.status }],
        more: SHOWS.filter((s) => s.slug !== show.slug).slice(0, 3),
      }}
    />
  );
}
