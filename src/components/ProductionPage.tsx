import Image from "next/image";
import Link from "next/link";
import { Wave } from "@/components/Wave";
import { ShowCard } from "@/components/ShowCard";
import { Episodes, PlayButton } from "@/components/Episodes";
import type { LinkOut, Show } from "@/data/studio";
import type { Episode } from "@/lib/feed";

/** The page layout every production shares, Originals and Additional Works alike. */
export type Production = {
  back: { href: string; label: string };
  kicker: string;
  title: string;
  accent: string;
  art?: string;
  comingSoon?: boolean;
  logline?: string;
  about: string[];
  listen: LinkOut[];
  follow: LinkOut[];
  site?: string;
  /** Extra facts for the side panel, such as status or Hush's credit. */
  facts: { label: string; value: string; href?: string }[];
  links?: { heading: string; label: string; href: string }[];
  more: Show[];
  /** From the RSS feed, newest first. */
  episodes?: Episode[];
  /** Where the page lives, so the player can link back to it. */
  href: string;
};

export function ProductionPage({ p }: { p: Production }) {
  const episodes = p.episodes ?? [];
  // Feed drops, bonus content and trailers aren't where anyone should start.
  const full = episodes.filter((e) => e.type === "full");
  const latest = full[0] ?? episodes[0];
  const first = full.length > 1 ? full[full.length - 1] : undefined;
  const info = { title: p.title, accent: p.accent, href: p.href, art: p.art };
  return (
    <div style={{ ["--accent" as string]: p.accent }}>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 right-0 h-[36rem] w-[36rem] rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${p.accent}, transparent)` }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-14 pb-16 sm:px-8 sm:pt-20 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-center">
          <div className="rise">
            <Link href={p.back.href} className="label hover:text-bone">← {p.back.label}</Link>
            <p className="label mt-10" style={{ color: p.accent }}>{p.kicker}</p>
            <h1 className="display mt-4 text-[clamp(3.5rem,10vw,8.5rem)]">{p.title}</h1>
            {p.comingSoon && (
              <p className="mt-6 inline-block bg-bone px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-night">Coming soon</p>
            )}
            {p.logline && <p className="mt-6 max-w-xl text-xl text-bone/85">{p.logline}</p>}

            {(episodes.length > 0 || p.listen.length > 0) && (
              <div className="mt-9 flex flex-wrap gap-3">
                {latest && <PlayButton episode={latest} show={info} label="Play latest" primary />}
                {first && <PlayButton episode={first} show={info} label="From the beginning" />}
                {p.listen.map((l, i) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className={
                      i === 0 && !episodes.length
                        ? "px-5 py-3 text-sm font-medium text-night transition hover:brightness-110"
                        : "border border-line px-5 py-3 text-sm transition hover:border-bone"
                    }
                    style={i === 0 && !episodes.length ? { background: p.accent } : undefined}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="rise" style={{ animationDelay: "0.15s" }}>
            {p.art ? (
              <div className="relative aspect-square ring-1 ring-line shadow-2xl shadow-black">
                <Image src={p.art} alt={`${p.title} art`} fill priority sizes="(min-width: 1024px) 28rem, 100vw" className="object-cover" />
              </div>
            ) : (
              <div className="flex aspect-square flex-col justify-end bg-night-2 p-8 ring-1 ring-line">
                <Wave bars={40} className="h-40" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[1fr_20rem]">
          <div className="max-w-2xl space-y-5 text-lg text-bone/85">
            {p.about.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <dl className="space-y-6 text-sm">
            {p.facts.map((f) => (
              <div key={f.label}>
                <dt className="label">{f.label}</dt>
                <dd className="mt-1 text-bone">{f.href ? <a href={f.href} className="link-u">{f.value}</a> : f.value}</dd>
              </div>
            ))}
            {p.site && (
              <div>
                <dt className="label">Official site</dt>
                <dd className="mt-1"><a href={p.site} className="link-u text-bone">{new URL(p.site).hostname.replace(/^www\./, "")}</a></dd>
              </div>
            )}
            {p.links?.map((l) => (
              <div key={l.href}>
                <dt className="label">{l.heading}</dt>
                <dd className="mt-1"><a href={l.href} className="link-u text-bone">{l.label}</a></dd>
              </div>
            ))}
            {p.follow.length > 0 && (
              <div>
                <dt className="label">Follow</dt>
                <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {p.follow.map((f) => (
                    <a key={f.href} href={f.href} className="link-u text-bone">{f.label}</a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {episodes.length > 0 && (
        <section id="episodes" className="mx-auto mt-24 max-w-7xl scroll-mt-20 px-4 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
            <h2 className="display text-4xl sm:text-5xl">Episodes</h2>
            <p className="label">{episodes.length} episodes</p>
          </div>
          <Episodes episodes={episodes} show={info} />
        </section>
      )}

      {p.more.length > 0 && (
        <section className="mx-auto mt-28 max-w-7xl px-4 sm:px-8">
          <h2 className="display border-b border-line pb-5 text-4xl sm:text-5xl">More from Hush</h2>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-3">
            {p.more.map((s) => <ShowCard key={s.slug} show={s} />)}
          </div>
        </section>
      )}
    </div>
  );
}
