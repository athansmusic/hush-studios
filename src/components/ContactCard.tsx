import type { Metadata } from "next";
import Image from "next/image";
import type { Card, CardIcon, CardLink } from "@/data/cards";

/** Title, description, canonical, Open Graph and Twitter tags. The share image comes from the route's opengraph-image.tsx. */
export function cardMetadata(card: Card): Metadata {
  const url = `/${card.slug}`;
  return {
    title: { absolute: `${card.title} · ${card.org}` },
    description: card.description,
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      url,
      title: card.title,
      description: card.description,
      siteName: card.org,
      firstName: card.firstName,
      lastName: card.lastName,
      username: card.username,
    },
    twitter: { card: "summary_large_image", title: card.title, description: card.description, creator: card.twitter },
  };
}

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

const BUTTON =
  "relative flex min-h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-14 py-3 text-center leading-tight backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.1]";

/** A full-width button, Linktree style: icon at the left, label centered. */
function LinkButton({ link, sub }: { link: CardLink; sub?: string }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${BUTTON} hover:border-[var(--brand)]`}
      style={{ ["--brand" as string]: link.color }}
    >
      <span className="absolute left-4 grid size-8 place-items-center rounded-full bg-[var(--brand)] text-white">
        <Icon icon={link.icon} className="size-4" />
      </span>
      <span>
        <span className="block font-medium">{link.label}</span>
        {sub && <span className="block text-xs text-bone/50">{sub}</span>}
      </span>
    </a>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="label mt-4 text-center">{children}</p>;
}

export function ContactCard({ card }: { card: Card }) {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* The photo, blown up and blurred, gives the page its color. */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <Image src={card.image} alt="" fill sizes="100vw" className="scale-125 object-cover opacity-35 blur-3xl saturate-150" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/70 to-night" />
      </div>

      <main className="relative mx-auto flex max-w-md flex-col items-center px-5 pb-14 pt-14 sm:pt-20">
        <div className="rise relative size-32 overflow-hidden rounded-full ring-2 ring-bone/80 ring-offset-4 ring-offset-night shadow-2xl">
          <Image src={card.image} alt={card.fullName} fill unoptimized priority className="object-cover" style={{ objectPosition: `50% ${card.photoY ?? 0}%` }} />
        </div>

        <h1 className="display rise mt-7 text-6xl tracking-wide">{card.name}</h1>
        <p className="mt-1 text-bone/80">{card.fullName}</p>
        <p className="mt-2 text-sm text-bone/55">
          {card.role} · <a href={card.site} className="link-u">{card.org}</a>
        </p>

        <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
          {card.social.map((s) => (
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
          {card.booking && (
            <a
              href={card.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center rounded-2xl bg-bone px-6 py-3 font-medium text-night shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
            >
              Book a 30-minute call
            </a>
          )}
          <a
            href={`mailto:${card.email}`}
            className="flex min-h-14 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-3 leading-tight backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
          >
            <span className="font-medium">Email me</span>
            <span className="text-xs text-bone/50">{card.email}</span>
          </a>

          {card.video && (
            <>
              <Label>Watch</Label>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-night-3">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${card.video.id}?rel=0`}
                  title={card.video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              </div>
            </>
          )}

          <Label>{card.shows.length > 1 ? "Shows" : "Show"}</Label>
          {card.shows.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className={`${BUTTON} hover:border-bone/40`}>
              <Image src={s.art} alt="" width={32} height={32} className="absolute left-4 size-8 rounded-lg object-cover" />
              <span>
                <span className="block font-medium">{s.label}</span>
                <span className="block text-xs text-bone/50">{s.sub}</span>
              </span>
            </a>
          ))}

          <Label>Work</Label>
          {card.linkedin && <LinkButton link={card.linkedin} sub={card.fullName} />}
          <a href={card.site} className={BUTTON}>
            <Image src="/brand/hush.avif" alt="" width={32} height={32} className="absolute left-4 size-8 rounded-full" />
            <span>
              <span className="block font-medium">Hush Studios</span>
              <span className="block text-xs text-bone/50">{card.studioNote}</span>
            </span>
          </a>

          {card.music && card.music.length > 0 && (
            <>
              <Label>My music</Label>
              {card.music.map((m) => (
                <LinkButton key={m.label} link={m} sub={`Listen to ${card.name.charAt(0)}${card.name.slice(1).toLowerCase()}`} />
              ))}
            </>
          )}
        </div>

        <a
          href={`/${card.slug}/${card.slug}.vcf`}
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

/** The card as a vCard, for "Save contact" on phones. */
export function vcardResponse(card: Card) {
  const links = [...card.social, ...(card.music ?? [])];
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${card.fullName}`,
    `N:${card.lastName};${card.firstName};;;`,
    `NICKNAME:${card.name.charAt(0)}${card.name.slice(1).toLowerCase()}`,
    `ORG:${card.org}`,
    `TITLE:${card.role}`,
    `EMAIL;TYPE=WORK:${card.email}`,
    `URL:${card.site}`,
    ...links.map((l) => `X-SOCIALPROFILE;TYPE=${l.label.toLowerCase().replace(/\s+/g, "")}:${l.href}`),
    ...(card.booking ? [`URL;TYPE=booking:${card.booking}`] : []),
    "END:VCARD",
    "",
  ].join("\r\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${card.slug}.vcf"`,
    },
  });
}
