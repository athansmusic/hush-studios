import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Wave } from "@/components/Wave";
import { ShowCard } from "@/components/ShowCard";
import { SHOWS, getShow } from "@/data/studio";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => SHOWS.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const show = getShow((await params).slug);
  if (!show) return {};
  return {
    title: show.title,
    description: `${show.title}: ${show.logline} A ${show.genre.toLowerCase()} production from Hush Studios.`,
    openGraph: show.art ? { images: [{ url: show.art }] } : undefined,
  };
}

export default async function ShowPage({ params }: Props) {
  const show = getShow((await params).slug);
  if (!show) notFound();
  const others = SHOWS.filter((s) => s.slug !== show.slug && s.kind !== "Live").slice(0, 3);

  return (
    <div style={{ ["--accent" as string]: show.accent }}>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 right-0 h-[36rem] w-[36rem] rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${show.accent}, transparent)` }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-14 pb-16 sm:px-8 sm:pt-20 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-center">
          <div className="rise">
            <Link href="/#originals" className="label hover:text-bone">← Hush Originals</Link>
            <p className="label mt-10" style={{ color: show.accent }}>{show.kind} · {show.genre}</p>
            <h1 className="display mt-4 text-[clamp(3.5rem,10vw,8.5rem)]">{show.title}</h1>
            {show.comingSoon && (
              <p className="mt-6 inline-block bg-bone px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-night">Coming soon</p>
            )}
            <p className="mt-6 max-w-xl text-xl text-bone/85">{show.logline}</p>

            {show.listen.length > 0 && (
              <div className="mt-9 flex flex-wrap gap-3">
                {show.listen.map((l, i) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className={
                      i === 0
                        ? "px-5 py-3 text-sm font-medium text-night transition hover:brightness-110"
                        : "border border-line px-5 py-3 text-sm transition hover:border-bone"
                    }
                    style={i === 0 ? { background: show.accent } : undefined}
                  >
                    Listen on {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="rise" style={{ animationDelay: "0.15s" }}>
            {show.art ? (
              <div className="relative aspect-square ring-1 ring-line shadow-2xl shadow-black">
                <Image src={show.art} alt={`${show.title} show art`} fill priority sizes="(min-width: 1024px) 28rem, 100vw" className="object-cover" />
              </div>
            ) : (
              <div className="flex aspect-square flex-col justify-end bg-night-2 p-8 ring-1 ring-line">
                <Wave bars={40} className="h-40" />
                <p className="label mt-6" style={{ color: show.accent }}>{show.status}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-5 text-lg text-bone/85 max-w-2xl">
            {show.about.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <dl className="space-y-6 text-sm">
            {show.creators && (
              <div>
                <dt className="label">{show.kind === "Live" ? "Hosted by" : "Created by"}</dt>
                <dd className="mt-1 text-bone">{show.creators}</dd>
              </div>
            )}
            {!show.comingSoon && (
              <div>
                <dt className="label">Status</dt>
                <dd className="mt-1 text-bone">{show.status}</dd>
              </div>
            )}
            {show.site && (
              <div>
                <dt className="label">Official site</dt>
                <dd className="mt-1"><a href={show.site} className="link-u text-bone">{new URL(show.site).hostname.replace(/^www\./, "")}</a></dd>
              </div>
            )}
            {show.follow.length > 0 && (
              <div>
                <dt className="label">Follow</dt>
                <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {show.follow.map((f) => (
                    <a key={f.href} href={f.href} className="link-u text-bone">{f.label}</a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-4 sm:px-8">
        <h2 className="display border-b border-line pb-5 text-4xl sm:text-5xl">More from Hush</h2>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-3">
          {others.map((s) => <ShowCard key={s.slug} show={s} />)}
        </div>
      </section>
    </div>
  );
}
