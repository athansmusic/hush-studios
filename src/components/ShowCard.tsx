import Image from "next/image";
import Link from "next/link";
import type { Show } from "@/data/studio";

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
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <p className="absolute bottom-3 left-3 right-3 translate-y-2 text-sm opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {show.logline}
        </p>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="display text-3xl">{show.title}</h3>
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: show.accent }} aria-hidden />
      </div>
      <p className="label mt-1">{show.genre} · {show.creators}</p>
    </Link>
  );
}
