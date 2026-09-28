import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WORKS, getWork } from "@/data/studio";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => WORKS.map((w) => ({ slug: w.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getWork((await params).slug);
  if (!work) return {};
  return {
    title: work.title,
    description: `${work.title}, with Hush Studios as ${work.role}.`,
    openGraph: work.art ? { images: [{ url: work.art }] } : undefined,
  };
}

/** Shown only while running locally, where something still needs filling in. */
function Todo({ children }: { children: React.ReactNode }) {
  return <p className="border border-dashed border-line p-4 font-mono text-sm text-ash">[local only] {children}</p>;
}

export default async function WorkPage({ params }: Props) {
  const work = getWork((await params).slug);
  if (!work) notFound();
  const dev = process.env.NODE_ENV === "development";

  return (
    <div style={{ ["--accent" as string]: work.accent }}>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 right-0 h-[36rem] w-[36rem] rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${work.accent}, transparent)` }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-14 pb-16 sm:px-8 sm:pt-20 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-center">
          <div className="rise">
            <Link href="/#works" className="label hover:text-bone">← Additional Works</Link>
            <p className="label mt-10" style={{ color: work.accent }}>{work.genre ?? work.role}</p>
            <h1 className="display mt-4 text-[clamp(3.5rem,10vw,8.5rem)]">{work.title}</h1>
            {work.comingSoon && (
              <p className="mt-6 inline-block bg-bone px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-night">Coming soon</p>
            )}

            {work.listen && work.listen.length > 0 && (
              <div className="mt-9 flex flex-wrap gap-3">
                {work.listen.map((l, i) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className={i === 0 ? "px-5 py-3 text-sm font-medium text-bone transition hover:brightness-110" : "border border-line px-5 py-3 text-sm transition hover:border-bone"}
                    style={i === 0 ? { background: work.accent } : undefined}
                  >
                    Listen on {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {work.art && (
            <div className="rise relative aspect-square ring-1 ring-line shadow-2xl shadow-black" style={{ animationDelay: "0.15s" }}>
              <Image src={work.art} alt={`${work.title} art`} fill priority sizes="(min-width: 1024px) 28rem, 100vw" className="object-cover" />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[1fr_20rem]">
          <div className="max-w-2xl space-y-5 text-lg text-bone/85">
            {work.about?.length ? work.about.map((p, i) => <p key={i}>{p}</p>) : dev && <Todo>No description yet. Add `about` to this work in src/data/studio.ts.</Todo>}
            {dev && !work.comingSoon && !work.listen?.length && <Todo>No listen links yet.</Todo>}
          </div>
          <dl className="space-y-6 text-sm">
            <div>
              <dt className="label">Hush Studios</dt>
              <dd className="mt-1 text-bone">{work.role}</dd>
            </div>
            {work.site && (
              <div>
                <dt className="label">Official site</dt>
                <dd className="mt-1"><a href={work.site} className="link-u text-bone">{new URL(work.site).hostname.replace(/^www\./, "")}</a></dd>
              </div>
            )}
            {work.follow && work.follow.length > 0 && (
              <div>
                <dt className="label">Follow</dt>
                <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {work.follow.map((f) => <a key={f.href} href={f.href} className="link-u text-bone">{f.label}</a>)}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>
    </div>
  );
}
