import type { MetadataRoute } from "next";
import { SHOWS, STUDIO, WORKS } from "@/data/studio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: STUDIO.url },
    { url: `${STUDIO.url}/about` },
    ...SHOWS.map((s) => ({ url: `${STUDIO.url}/shows/${s.slug}` })),
    ...WORKS.map((w) => ({ url: `${STUDIO.url}/works/${w.slug}` })),
  ];
}
