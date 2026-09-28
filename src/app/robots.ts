import type { MetadataRoute } from "next";
import { STUDIO } from "@/data/studio";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${STUDIO.url}/sitemap.xml` };
}
