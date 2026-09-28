// Card revision 3. The image URL is versioned from this file's contents, not from the design in
// src/og/card.tsx, so bump the number whenever the card changes or apps keep the old preview.
import { OG_SIZE, productionCard } from "@/og/card";
import { WORKS, getWork } from "@/data/studio";

export const alt = "Hush Studios: Additional Works";
export const size = OG_SIZE;
export const contentType = "image/png";
export const generateStaticParams = () => WORKS.map((w) => ({ slug: w.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const work = getWork((await params).slug)!;
  return productionCard({ title: work.title, kicker: work.genre, art: work.art, accent: work.accent, comingSoon: work.comingSoon });
}
