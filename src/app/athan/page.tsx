import type { Metadata } from "next";
import Image from "next/image";
import { CARD, type CardIcon, type CardLink } from "./card";

export const metadata: Metadata = {
  title: "Athan",
  description: `${CARD.fullName} (Athan), ${CARD.role} at ${CARD.org}. Socials, music and a link to book a call.`,
  openGraph: { images: [CARD.image] },
};

function Icon({ icon, className = "size-5" }: { icon: CardIcon; className?: string }) {
  if (icon === "linkedin") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}

/** A full-width button, Linktree style: icon at the left, label centered. */
function LinkButton({ link, sub }: { link: CardLink; sub?: string }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-14 py-3 text-center backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[var(--brand)] hover:bg-white/[0.1]"
      style={{ ["--brand" as string]: link.color }}
    >
      <span className="absolute left-4 grid size-8 place-items-center rounded-full bg-[var(--brand)] text-white">
        <Icon icon={link.icon} className="size-4" />
      </span>
      <span className="leading-tight">
        <span className="block font-medium">{link.label}</span>
        {sub && <span className="block text-xs text-bone/50">{sub}</span>}
      </span>
    </a>
  );
}

export default function AthanCard() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* The photo, blown up and blurred, gives the page its color. */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <Image src={CARD.image} alt="" fill sizes="100vw" className="scale-125 object-cover opacity-35 blur-3xl saturate-150" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/70 to-night" />
      </div>

      <main className="relative mx-auto flex max-w-md flex-col items-center px-5 pb-14 pt-14 sm:pt-20">
        <div className="rise relative size-32 overflow-hidden rounded-full ring-2 ring-bone/80 ring-offset-4 ring-offset-night shadow-2xl">
          <Image src={CARD.image} alt={CARD.fullName} fill unoptimized priority className="object-cover object-top" />
        </div>

        <h1 className="display rise mt-7 text-6xl tracking-wide">{CARD.name}</h1>
        <p className="mt-1 text-bone/80">{CARD.fullName}</p>
        <p className="mt-2 text-sm text-bone/55">
          {CARD.role} · <a href={CARD.site} className="link-u">{CARD.org}</a>
        </p>

        <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
          {CARD.social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label}: ${s.handle}`}
                title={`${s.label} · ${s.handle}`}
                className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-bone/85 transition hover:-translate-y-0.5 hover:border-transparent hover:bg-[var(--brand)] hover:text-white"
                style={{ ["--brand" as string]: s.color }}
              >
                <Icon icon={s.icon} className="size-5" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid w-full gap-3">
          {CARD.booking && (
            <a
              href={CARD.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center rounded-2xl bg-bone px-6 py-3 font-medium text-night shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
            >
              Book a 30-minute call
            </a>
          )}
          <a
            href={`mailto:${CARD.email}`}
            className="flex min-h-14 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-3 leading-tight backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
          >
            <span className="font-medium">Email me</span>
            <span className="text-xs text-bone/50">{CARD.email}</span>
          </a>

          <p className="label mt-4 text-center">Shows</p>
          {CARD.shows.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex min-h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-14 py-3 text-center leading-tight backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-bone/40 hover:bg-white/[0.1]"
            >
              <Image src={s.art} alt="" width={32} height={32} className="absolute left-4 size-8 rounded-lg object-cover" />
              <span>
                <span className="block font-medium">{s.label}</span>
                <span className="block text-xs text-bone/50">{s.sub}</span>
              </span>
            </a>
          ))}

          <p className="label mt-4 text-center">Work</p>
          <LinkButton link={CARD.social.find((s) => s.label === "LinkedIn")!} sub={CARD.fullName} />
          <a
            href={CARD.site}
            className="group relative flex min-h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-14 py-3 text-center leading-tight backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
          >
            <Image src="/brand/hush.avif" alt="" width={32} height={32} className="absolute left-4 size-8 rounded-full" />
            <span>
              <span className="block font-medium">Hush Studios</span>
              <span className="block text-xs text-bone/50">REDACTED, The Grotto and more</span>
            </span>
          </a>

          <p className="label mt-4 text-center">My music</p>
          {CARD.music.map((m) => (
            <LinkButton key={m.label} link={m} sub="Listen to Athan" />
          ))}
        </div>

        <a
          href="/athan/athan.vcf"
          download
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-bone/85 transition hover:border-bone/60 hover:text-bone"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
          </svg>
          Save contact
        </a>
      </main>
    </div>
  );
}
