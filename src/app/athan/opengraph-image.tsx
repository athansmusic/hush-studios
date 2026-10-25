// Card revision 3. The image URL is versioned from this file's contents, not from the design in
// src/og/card.tsx, so bump the number whenever the card changes or apps keep the old preview.
import { OG_SIZE, personCard } from "@/og/card";
import { CARDS } from "@/data/cards";

const card = CARDS.athan;

export const alt = `${card.fullName} (Athan), ${card.role} at ${card.org}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return personCard({ name: card.name, fullName: card.fullName, role: `${card.role}, ${card.org}`, photo: card.image, path: `/${card.slug}` });
}
