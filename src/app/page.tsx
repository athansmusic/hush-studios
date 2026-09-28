import Link from "next/link";
import { Waveform } from "@/components/Waveform";
import { ShowCard, WorkCard } from "@/components/ShowCard";
import { SHOWS, WORKS, STUDIO } from "@/data/studio";

export default function Home() {

  return (
    <>
      {/* Hero: almost nothing, on purpose. */}
      <section className="relative flex min-h-[calc(100svh-4rem)] flex-col">
        <h1 className="sr-only">Hush Studios</h1>
        <div className="rise flex flex-1 flex-col items-center justify-center px-4">
          <p className="display text-2xl leading-none sm:text-3xl">hush</p>
          <Waveform className="mt-5 h-20 w-full max-w-2xl text-bone/80 sm:h-24" />
        </div>
        <div className="rise mx-auto grid w-full max-w-7xl gap-6 px-4 pb-10 sm:grid-cols-[minmax(0,30rem)_auto] sm:items-end sm:justify-between sm:px-8" style={{ animationDelay: "0.4s" }}>
          <div>
            <p className="display text-2xl sm:text-3xl">
              Close <em className="text-ash">your eyes.</em>
            </p>
            <p className="mt-2 text-sm text-bone/70">
              Hush Studios makes fully immersive audio experiences, the kind you don&apos;t have to see to believe.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="#originals" className="bg-bone px-4 py-2.5 text-sm font-medium text-night transition hover:bg-white">
              Hear the shows
            </Link>
          </div>
        </div>
      </section>

      {/* Hush Originals */}
      <section id="originals" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-24 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <h2 className="display text-5xl sm:text-6xl">Hush Originals</h2>
          <p className="label">{String(SHOWS.length).padStart(2, "0")} originals</p>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
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
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {WORKS.map((w) => <WorkCard key={w.title} work={w} />)}
            </div>
          ) : (
            <p className="mt-10 border border-dashed border-line p-8 font-mono text-sm text-ash">
              [dev only] No Additional Works yet. Add them to WORKS in src/data/studio.ts.
            </p>
          )}
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="mx-auto mt-40 max-w-7xl scroll-mt-20 px-4 sm:px-8">
        <div className="grid gap-6 border-t border-line pt-10 sm:grid-cols-[12rem_1fr] sm:items-baseline">
          <h2 className="label">Contact</h2>
          <a href={`mailto:${STUDIO.email}`} className="group inline-flex items-baseline gap-4 justify-self-start">
            <span className="display text-[clamp(1.75rem,6vw,4.5rem)] leading-none transition-colors group-hover:text-ash">{STUDIO.email}</span>
            <span aria-hidden className="text-2xl text-ash transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-bone">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
