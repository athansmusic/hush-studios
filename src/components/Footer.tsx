import Link from "next/link";
import { SHOWS, STUDIO } from "@/data/studio";

export function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-5xl">Hush.</p>
          <p className="mt-3 max-w-xs text-sm text-ash">Horror audio, made to be heard in the dark. Released on the {STUDIO.network.name} network.</p>
        </div>
        <div>
          <p className="label mb-3">Hush Originals</p>
          <ul className="space-y-1.5 text-sm">
            {SHOWS.map((s) => (
              <li key={s.slug}>
                <Link href={`/shows/${s.slug}`} className="text-bone/80 hover:text-bone">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-3">Elsewhere</p>
          <ul className="space-y-1.5 text-sm">
            <li><a href={STUDIO.youtube} className="text-bone/80 hover:text-bone">YouTube</a></li>
            <li><a href={STUDIO.network.url} className="text-bone/80 hover:text-bone">{STUDIO.network.name}</a></li>
            <li><a href={`mailto:${STUDIO.email}`} className="text-bone/80 hover:text-bone">{STUDIO.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl justify-between gap-4 px-4 pb-10 sm:px-8 text-xs text-ash">
        <p>© {new Date().getFullYear()} Hush Studios</p>
        <p className="font-mono">shhh.</p>
      </div>
    </footer>
  );
}
