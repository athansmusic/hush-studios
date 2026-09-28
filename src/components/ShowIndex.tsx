"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import type { Show } from "@/data/studio";

/**
 * The Originals as an index: one row per show, so it scales to any number of them.
 * Hovering a row tints the room in the show's colour and quiets the others. On touch screens,
 * where there is no hover, each row carries a small thumbnail.
 */
export function ShowIndex({ shows }: { shows: Show[] }) {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current!;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = list.getBoundingClientRect();
      list.style.setProperty("--mx", `${e.clientX - r.left}px`);
      list.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    list.addEventListener("pointermove", onMove);
    return () => list.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <ol ref={listRef} className="show-index relative isolate" onPointerLeave={() => setActive(null)}>
      {/* The room takes on the colour of whichever show is under the cursor. */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-[50vw] inset-y-0 -z-10">
        {shows.map((s, i) => (
          <div
            key={s.slug}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: active === i ? 1 : 0, background: `radial-gradient(40rem 26rem at calc(50vw + var(--mx, 50%)) var(--my, 50%), color-mix(in oklab, ${s.accent} 16%, transparent), transparent 70%)` }}
          />
        ))}
      </div>

      {shows.map((s, i) => (
        <li key={s.slug}>
          <Reveal delay={Math.min(i, 6) * 0.06}>
            <Link
              href={`/shows/${s.slug}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group grid grid-cols-[auto_1fr] items-center gap-x-4 border-b border-line py-6 transition-opacity duration-300 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-8 sm:py-8"
              style={{ opacity: active === null || active === i ? 1 : 0.3 }}
            >
              <span className="hidden font-mono text-xs text-ash sm:block">{String(i + 1).padStart(2, "0")}</span>
              {/* Thumbnail on touch screens, where there is no hover. */}
              {s.art && (
                <span className="relative size-14 shrink-0 overflow-hidden ring-1 ring-line sm:hidden">
                  <Image src={s.art} alt="" fill sizes="56px" className="object-cover" />
                </span>
              )}
              <span className="min-w-0">
                <span className="display block text-4xl transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-6xl lg:text-7xl">
                  {s.title}
                </span>
                <span className="label mt-2 block sm:hidden" style={{ color: s.accent }}>{s.genre}</span>
              </span>
              <span className="hidden text-right sm:block">
                <span className="label block" style={{ color: s.accent }}>{s.genre}</span>
                <span className="mt-1 block font-mono text-xs uppercase tracking-[0.14em] text-ash">{s.status}</span>
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
