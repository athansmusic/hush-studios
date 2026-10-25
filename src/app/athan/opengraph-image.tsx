// Card revision 2. The image URL is versioned from this file's contents, not from the design in
// src/og/card.tsx, so bump the number whenever the card changes or apps keep the old preview.
import { OG_SIZE, personCard } from "@/og/card";
import { CARD } from "./card";

export const alt = `${CARD.fullName} (Athan), ${CARD.role} at ${CARD.org}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return personCard({ name: CARD.name, fullName: CARD.fullName, role: `${CARD.role}, ${CARD.org}`, photo: CARD.image, path: "/athan" });
}
