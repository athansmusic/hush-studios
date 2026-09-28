import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { Show } from "@/data/studio";

/** Dark or light text, whichever reads on the accent. */
function onAccent(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.45 ? "#0a0a0b" : "#ece7de";
}

/** One Original, given the whole width: its art as a blurred backdrop, its colour, its hook. */
export function ShowFeature({ show, index }: { show: Show; index: number }) {
  const flip = index % 2 === 1;
  const listen = show.listen[0];

  return (
    <section
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden py-24"
      style={{ ["--accent" as string]: show.accent }}
    >
      {/* Backdrop: the art, blurred into atmosphere, with the show's colour bleeding through. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {show.art && (
          // A tiny copy stretched to fill is already soft, so it only needs a light (cheap) blur.
          <Image src={show.art} alt="" fill sizes="64px" quality={40} className="drift scale-125 object-cover opacity-30 blur-md saturate-150" />
        )}
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 50% at ${flip ? "25%" : "75%"} 50%, color-mix(in oklab, ${show.accent} 22%, transparent), transparent 70%)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/40 to-night" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className={flip ? "lg:order-2" : ""}>
          <Link href={`/shows/${show.slug}`} className="group block">
            <div className="parallax relative mx-auto aspect-square w-full max-w-md shadow-2xl shadow-black ring-1 ring-white/10 transition duration-700 group-hover:ring-[var(--accent)] lg:max-w-none">
              {show.art && (
                <Image src={show.art} alt={`${show.title} show art`} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
              )}
            </div>
          </Link>
        </Reveal>

        <div>
          <Reveal>
            <p className="flex items-baseline gap-4 font-mono text-xs tracking-[0.2em] text-ash">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="uppercase" style={{ color: show.accent }}>{show.genre}</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="display mt-5 text-[clamp(3.25rem,7vw,6.5rem)]">{show.title}</h3>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg text-bone/80">{show.logline}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {listen && (
                <a href={listen.href} className="px-5 py-3 text-sm font-medium transition hover:brightness-110" style={{ background: show.accent, color: onAccent(show.accent) }}>
                  Listen on {listen.label}
                </a>
              )}
              <Link href={`/shows/${show.slug}`} className="border border-white/20 px-5 py-3 text-sm transition hover:border-bone">
                Explore
              </Link>
              <span className="ml-2 font-mono text-xs uppercase tracking-[0.2em] text-ash">{show.status}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
