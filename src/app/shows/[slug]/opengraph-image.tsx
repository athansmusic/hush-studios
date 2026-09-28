import { OG_SIZE, productionCard } from "@/og/card";
import { SHOWS, getShow } from "@/data/studio";

export const alt = "A Hush Studios original";
export const size = OG_SIZE;
export const contentType = "image/png";
export const generateStaticParams = () => SHOWS.map((s) => ({ slug: s.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const show = getShow((await params).slug)!;
  return productionCard({ title: show.title, kicker: show.genre, art: show.art, accent: show.accent, comingSoon: show.comingSoon });
}
