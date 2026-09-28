import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductionPage } from "@/components/ProductionPage";
import { SHOWS, WORKS, getWork } from "@/data/studio";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => WORKS.map((w) => ({ slug: w.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getWork((await params).slug);
  if (!work) return {};
  return {
    title: work.title,
    description: `${work.title}, with Hush Studios as ${work.role}.`,
    openGraph: work.art ? { images: [{ url: work.art }] } : undefined,
  };
}

export default async function WorkPage({ params }: Props) {
  const work = getWork((await params).slug);
  if (!work) notFound();
  return (
    <ProductionPage
      p={{
        back: { href: "/#works", label: "Additional Works" },
        kicker: work.genre ?? "Additional Work",
        title: work.title,
        accent: work.accent,
        art: work.art,
        comingSoon: work.comingSoon,
        logline: work.logline,
        about: work.about ?? [],
        listen: work.listen ?? [],
        follow: work.follow ?? [],
        site: work.site,
        facts: [{ label: "Hush Studios", value: work.role }],
        more: SHOWS.slice(0, 3),
        href: `/works/${work.slug}`,
      }}
    />
  );
}
