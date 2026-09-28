// Card revision 3. The image URL is versioned from this file's contents, not from the design in
// src/og/card.tsx, so bump the number whenever the card changes or apps keep the old preview.
import { OG_SIZE, studioCard } from "@/og/card";

export const alt = "Hush Studios: close your eyes.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return studioCard();
}
