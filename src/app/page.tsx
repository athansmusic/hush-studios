import Link from "next/link";
import { Wave } from "@/components/Wave";
import { ShowCard, WorkCard } from "@/components/ShowCard";
import { SHOWS, WORKS, PEOPLE, STUDIO, getShow } from "@/data/studio";

export default function Home() {
  const series = SHOWS.filter((s) => s.kind !== "Live");
  const fire = getShow("frights-by-fire")!;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-8 sm:pt-32">
          <p className="label rise">Independent horror audio studio</p>
          <h1 className="display rise mt-6 text-[clamp(3.5rem,13vw,11.5rem)]" style={{ animationDelay: "0.1s" }}>
            Close <em className="text-ash">your eyes.</em>
          </h1>
          <div className="rise mt-10 grid gap-8 sm:grid-cols-[minmax(0,34rem)_auto] sm:items-end sm:justify-between" style={{ animationDelay: "0.25s" }}>
            <p className="text-lg text-bone/80">
              Hush Studios makes fully immersive audio experiences, the kind you don&apos;t have to see to believe.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#originals" className="bg-bone px-5 py-3 text-sm font-medium text-night transition hover:bg-white">
                Hear the shows
              </Link>
              <Link href="/shows/frights-by-fire" className="border border-line px-5 py-3 text-sm transition hover:border-bone">
                Live Thursdays
              </Link>
            </div>
          </div>
        </div>
        <Wave bars={96} className="mx-auto h-24 max-w-7xl px-4 text-bone/25 sm:h-32 sm:px-8" />
      </section>

      {/* Hush Originals */}
      <section id="originals" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-24 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <h2 className="display text-5xl sm:text-6xl">Hush Originals</h2>
          <p className="label">{String(SHOWS.length).padStart(2, "0")} originals</p>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {SHOWS.map((s, i) => (
            <ShowCard key={s.slug} show={s} priority={i < 2} />
          ))}
        </div>
      </section>

      {/* Additional Works: hidden in production until there is something to list. */}
      {(WORKS.length > 0 || process.env.NODE_ENV === "development") && (
        <section id="works" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-24 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
            <h2 className="display text-5xl sm:text-6xl">Additional Works</h2>
            <p className="label">Production consulting · Collaborations</p>
          </div>
          {WORKS.length > 0 ? (
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
              {WORKS.map((w) => <WorkCard key={w.title} work={w} />)}
            </div>
          ) : (
            <p className="mt-10 border border-dashed border-line p-8 font-mono text-sm text-ash">
              [dev only] No Additional Works yet. Add them to WORKS in src/data/studio.ts.
            </p>
          )}
        </section>
      )}

      {/* Live */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-8">
        <Link
          href={`/shows/${fire.slug}`}
          className="group relative block overflow-hidden border border-line bg-night-2 px-6 py-12 sm:px-12 sm:py-16"
        >
          <div
            aria-hidden
            className="absolute -bottom-40 left-1/2 h-80 w-[48rem] max-w-[140%] -translate-x-1/2 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
            style={{ background: `radial-gradient(closest-side, ${fire.accent}, transparent)` }}
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="label flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: fire.accent }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: fire.accent }} />
                </span>
                {fire.status}
              </p>
              <h2 className="display mt-4 text-6xl sm:text-8xl">{fire.title}</h2>
              <p className="mt-4 max-w-xl text-bone/80">{fire.logline} Hosted by {fire.creators}.</p>
            </div>
            <span className="text-sm text-bone/80 transition group-hover:text-bone">Pull up a seat →</span>
          </div>
        </Link>
      </section>

      {/* Studio */}
      <section className="mx-auto mt-32 max-w-7xl px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="label">The studio</p>
            <p className="display mt-5 text-4xl sm:text-5xl">
              Fear is mostly <em className="text-ash">listening</em>: the creak in the next room, the breath on the tape.
            </p>
          </div>
          <div className="space-y-5 text-bone/80 lg:pt-10">
            <p>
              Hush started with two creators and two shows: Athan&apos;s <em>The Grotto</em> and Jamie
              Petronis&apos;s <em>The Cellar Letters</em>. Together they built <em>REDACTED</em>, and the studio
              grew around it.
            </p>
            <p>
              Today Hush produces full-cast audio drama with original music, analog horror, and a weekly live
              show where the community brings the stories. Our series are released on the{" "}
              <a href={STUDIO.network.url} className="link-u text-bone">{STUDIO.network.name}</a> network.
            </p>
            <Link href="/about" className="link-u inline-block text-bone">Meet the people behind it</Link>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
          {[
            [String(series.length), "Series"],
            ["1", "Live weekly show"],
            [String(PEOPLE.length), "Core team"],
            [STUDIO.network.name, "Network"],
          ].map(([n, l]) => (
            <li key={l} className="bg-night px-5 py-6">
              <p className="display text-4xl">{n}</p>
              <p className="label mt-2">{l}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto mt-32 max-w-7xl scroll-mt-20 px-4 sm:px-8">
        <div className="border-t border-line pt-12">
          <p className="label">Get in touch</p>
          <h2 className="display mt-5 max-w-4xl text-5xl sm:text-7xl">
            Press, partnerships, or a story that won&apos;t leave you alone?
          </h2>
          <a href={`mailto:${STUDIO.email}`} className="link-u mt-8 inline-block font-mono text-lg sm:text-2xl">
            {STUDIO.email}
          </a>
        </div>
      </section>
    </>
  );
}
