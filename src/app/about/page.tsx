import type { Metadata } from "next";
import Image from "next/image";
import { PEOPLE, SHOWS } from "@/data/studio";

export const metadata: Metadata = {
  title: "The studio",
  description: "Who makes Hush Studios: the team behind REDACTED, The Grotto, The Cellar Letters, The Seven Planes and CORRUPTED.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8">
      <section className="pt-16 sm:pt-24">
        <p className="label rise">The studio</p>
        <h1 className="display rise mt-6 max-w-5xl text-[clamp(3rem,8vw,7rem)]" style={{ animationDelay: "0.1s" }}>
          Small studio.
        </h1>
        <div className="rise mt-10 grid gap-6 text-lg text-bone/80 md:grid-cols-2 max-w-5xl" style={{ animationDelay: "0.2s" }}>
          <p>
            Hush Studios is an independent audio studio making horror in every register, from grief-soaked
            liminal drama to monster-of-the-week comedy and recovered analog tapes.
          </p>
          <p>
            Every series is made with a full cast and a lot of care for sound. We work with independent actors, writers, composers and artists across the world.
          </p>
        </div>
      </section>

      <section className="mt-28">
        <h2 className="display border-b border-line pb-5 text-4xl sm:text-5xl">People</h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PEOPLE.map((p) => (
            <li key={p.name} className="flex gap-5 border border-line bg-night-2 p-5">
              <div className="relative size-24 shrink-0 overflow-hidden bg-night-3">
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill sizes="96px" className="object-cover object-top grayscale" />
                ) : (
                  <span className="display flex h-full items-center justify-center text-4xl text-ash" aria-hidden>
                    {p.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="display text-2xl">{p.name}</p>
                <p className="label mt-1">{p.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-28">
        <h2 className="display border-b border-line pb-5 text-4xl sm:text-5xl">Slate</h2>
        <ol className="mt-4">
          {SHOWS.map((s, i) => (
            <li key={s.slug} className="border-b border-line">
              <a href={`/shows/${s.slug}`} className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-5 sm:grid-cols-[3rem_1fr_auto]">
                <span className="font-mono text-xs text-ash">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-3xl transition-colors sm:text-4xl group-hover:text-[var(--c)]" style={{ ["--c" as string]: s.accent }}>{s.title}</span>
                <span className="label hidden sm:block">{s.genre}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
