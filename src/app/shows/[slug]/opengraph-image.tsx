// Card revision 3. The image URL is versioned from this file's contents, not from the design in
// src/og/card.tsx, so bump the number whenever the card changes or apps keep the old preview.
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
