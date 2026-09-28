import Link from "next/link";
import { Waveform } from "@/components/Waveform";
import { ShowCard, WorkCard } from "@/components/ShowCard";
import { SHOWS, WORKS, PEOPLE, STUDIO } from "@/data/studio";

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
              Today Hush produces full-cast audio drama with original music, alongside analog horror.
            </p>
            <Link href="/about" className="link-u inline-block text-bone">Meet the people behind it</Link>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-px border border-line bg-line">
          {[
            [String(SHOWS.length), "Series"],
            [String(PEOPLE.length), "Core team"],
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
