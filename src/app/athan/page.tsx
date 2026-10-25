import type { Metadata } from "next";
import Image from "next/image";
import type { SimpleIcon } from "simple-icons";
import { Wave } from "@/components/Wave";
import { CARD, type CardLink } from "./card";

export const metadata: Metadata = {
  title: "Athan",
  description: `Athan, ${CARD.role} at ${CARD.org}. Contact, socials and music.`,
};

function Icon({ icon, className = "size-5" }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg role="img" aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}

function LinkList({ title, links }: { title: string; links: CardLink[] }) {
  return (
    <section className="mt-8 w-full text-left">
      <p className="label mb-2">{title}</p>
      <ul className="divide-y divide-line border-y border-line text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 py-3 text-bone/80 transition-colors hover:text-bone"
              style={{ ["--brand" as string]: `#${l.icon.hex}` }}
            >
              <Icon icon={l.icon} className="size-5 shrink-0 text-bone/60 transition-colors group-hover:text-[var(--brand)]" />
              <span>{l.label}</span>
              <span className="ml-auto truncate font-mono text-xs text-ash">{l.handle}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function AthanCard() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <article className="rise w-full max-w-sm border border-line bg-night-2">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <a href={CARD.site} aria-label={CARD.org} className="transition-opacity hover:opacity-80">
            <Image src="/brand/hush.avif" alt="" width={40} height={40} priority className="size-9" />
          </a>
          <Wave bars={20} className="h-6 w-24 text-bone/30" />
        </div>

        <div className="flex flex-col items-center px-6 pb-8 pt-10 text-center">
          <div className="relative size-32 overflow-hidden bg-night-3">
            <Image src={CARD.image} alt="Athan" fill sizes="128px" priority className="object-cover object-top grayscale" />
          </div>
          <h1 className="display mt-6 text-6xl tracking-wide">{CARD.name}</h1>
          {CARD.fullName && <p className="mt-2 text-sm text-bone/70">{CARD.fullName}</p>}
          <p className="label mt-3">{CARD.role}</p>
          <p className="mt-1 text-sm text-ash">{CARD.org}</p>

          <a href={`mailto:${CARD.email}`} className="link-u mt-8 text-bone/90">{CARD.email}</a>

          <LinkList title="Follow" links={CARD.social} />
          <LinkList title="Listen" links={CARD.music} />

          <div className="mt-8 grid w-full gap-3">
            {CARD.booking && (
              <a
                href={CARD.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-line py-3 text-sm text-bone transition-colors hover:border-bone/60"
              >
                <Icon icon={CARD.calendlyIcon} className="size-4" />
                Book a call
              </a>
            )}
            <a href="/athan/athan.vcf" download className="bg-bone py-3 text-sm font-medium text-night transition-opacity hover:opacity-90">
              Save contact
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
