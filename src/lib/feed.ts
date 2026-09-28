import { XMLParser } from "fast-xml-parser";

export type Episode = {
  id: string;
  title: string;
  date: string; // ISO
  seconds: number;
  src: string;
  image?: string;
  /** Plain-text summary, first paragraph only. */
  summary: string;
  season?: number;
  number?: number;
  type: "full" | "trailer" | "bonus";
  link?: string;
};

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@", cdataPropName: "#cdata" });

/** "54:18", "1:02:03" or plain seconds, to seconds. */
function toSeconds(v: unknown) {
  const s = String(v ?? "").trim();
  if (!s) return 0;
  return s.split(":").reduce((acc, part) => acc * 60 + (Number(part) || 0), 0);
}

function text(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  const o = v as Record<string, unknown>;
  return text(o["#cdata"] ?? o["#text"] ?? "");
}

function firstParagraph(html: string) {
  const first = html.split(/<\/p>|<br\s*\/?>|\n\n/i).map((p) => p.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').trim()).find(Boolean) ?? "";
  return first.length > 280 ? `${first.slice(0, 277).trimEnd()}…` : first;
}

/**
 * Episodes from a podcast RSS feed, newest first. Cached and refreshed hourly, so new episodes
 * appear without a redeploy. Returns an empty list rather than failing the page if the feed is down.
 */
export async function getEpisodes(feedUrl: string): Promise<Episode[]> {
  try {
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const doc = parser.parse(await res.text());
    const raw = doc?.rss?.channel?.item;
    const items: Record<string, unknown>[] = Array.isArray(raw) ? raw : raw ? [raw] : [];
    return items
      .map((it): Episode => {
        const enclosure = it.enclosure as Record<string, string> | undefined;
        const image = it["itunes:image"] as Record<string, string> | undefined;
        const type = String(it["itunes:episodeType"] ?? "full") as Episode["type"];
        return {
          id: text(it.guid) || enclosure?.["@url"] || text(it.title),
          title: text(it["itunes:title"]) || text(it.title),
          date: new Date(text(it.pubDate)).toISOString(),
          seconds: toSeconds(it["itunes:duration"]),
          src: enclosure?.["@url"] ?? "",
          image: image?.["@href"],
          summary: firstParagraph(text(it.description) || text(it["itunes:summary"])),
          season: Number(it["itunes:season"]) || undefined,
          number: Number(it["itunes:episode"]) || undefined,
          type: type === "trailer" || type === "bonus" ? type : "full",
          link: text(it.link) || undefined,
        };
      })
      .filter((e) => e.src)
      .sort((a, b) => b.date.localeCompare(a.date));
  } catch {
    return [];
  }
}
