import Image from "next/image";
import Link from "next/link";
import { Wave } from "@/components/Wave";
import { ShowCard } from "@/components/ShowCard";
import type { LinkOut, Show } from "@/data/studio";

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
  facts: { label: string; value: string }[];
  more: Show[];
};

export function ProductionPage({ p }: { p: Production }) {
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

            {p.listen.length > 0 && (
              <div className="mt-9 flex flex-wrap gap-3">
                {p.listen.map((l, i) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className={
                      i === 0
                        ? "px-5 py-3 text-sm font-medium text-night transition hover:brightness-110"
                        : "border border-line px-5 py-3 text-sm transition hover:border-bone"
                    }
                    style={i === 0 ? { background: p.accent } : undefined}
                  >
                    Listen on {l.label}
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
                <dd className="mt-1 text-bone">{f.value}</dd>
              </div>
            ))}
            {p.site && (
              <div>
                <dt className="label">Official site</dt>
                <dd className="mt-1"><a href={p.site} className="link-u text-bone">{new URL(p.site).hostname.replace(/^www\./, "")}</a></dd>
              </div>
            )}
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
