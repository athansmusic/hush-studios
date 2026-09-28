import Image from "next/image";
import Link from "next/link";
import type { Show, Work } from "@/data/studio";

export function ShowCard({ show, priority = false }: { show: Show; priority?: boolean }) {
  return (
    <Link
      href={`/shows/${show.slug}`}
      style={{ ["--accent" as string]: show.accent }}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden bg-night-3 ring-1 ring-line transition-[box-shadow] duration-500 group-hover:ring-[var(--accent)]">
        {show.art && (
          <Image
            src={show.art}
            alt={`${show.title} show art`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 ease-out grayscale-[35%] group-hover:grayscale-0 group-hover:scale-[1.03]"
          />
        )}
        {!show.art && (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center" style={{ background: `radial-gradient(circle at 50% 80%, color-mix(in oklab, ${show.accent} 35%, transparent), transparent 70%)` }}>
            <span className="display text-4xl">{show.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <p className="absolute bottom-3 left-3 right-3 translate-y-2 text-sm opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {show.logline}
        </p>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="display text-3xl">{show.title}</h3>
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: show.accent }} aria-hidden />
      </div>
      <p className="label mt-1">{show.genre}</p>
    </Link>
  );
}

export function WorkCard({ work }: { work: Work }) {
  const body = (
    <>
      <div className="relative aspect-square overflow-hidden bg-night-3 ring-1 ring-line transition-[box-shadow] duration-500 group-hover:ring-[var(--accent)]">
        {work.art ? (
          <Image src={work.art} alt={`${work.title} art`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]" />
        ) : (
          <span className="display absolute inset-0 flex items-center justify-center p-6 text-center text-4xl">{work.title}</span>
        )}
        {work.comingSoon && (
          <span className="absolute left-3 top-3 bg-bone px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-night">Coming soon</span>
        )}
      </div>
      <h3 className="display mt-4 text-3xl">{work.title}</h3>
      {work.genre && <p className="label mt-1">{work.genre}</p>}
      <p className="mt-1 text-sm text-ash">{work.role}</p>
    </>
  );
  return (
    <Link href={`/works/${work.slug}`} style={{ ["--accent" as string]: work.accent }} className="group block">{body}</Link>
  );
}
