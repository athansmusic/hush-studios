"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import type { IndexItem } from "@/data/studio";

/**
 * An index of shows or works: one row each, so it scales to any number of them.
 * Each row carries a thumbnail of the art. Hovering a row tints the room in its colour and
 * quiets the others.
 */
export function ShowIndex({ items }: { items: IndexItem[] }) {
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
        {items.map((s, i) => (
          <div
            key={s.key}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: active === i ? 1 : 0, background: `radial-gradient(40rem 26rem at calc(50vw + var(--mx, 50%)) var(--my, 50%), color-mix(in oklab, ${s.accent} 16%, transparent), transparent 70%)` }}
          />
        ))}
      </div>

      {items.map((s, i) => (
        <li key={s.key}>
          <Reveal delay={Math.min(i, 6) * 0.06}>
            <Link
              href={s.href}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group grid grid-cols-[auto_1fr] items-center gap-x-4 border-b border-line py-6 transition-opacity duration-300 sm:grid-cols-[3rem_auto_1fr_auto] sm:gap-x-8 sm:py-8"
              style={{ opacity: active === null || active === i ? 1 : 0.3 }}
            >
              <span className="hidden font-mono text-xs text-ash sm:block">{String(i + 1).padStart(2, "0")}</span>
              {s.art ? (
                <span className="relative size-14 shrink-0 overflow-hidden ring-1 ring-line sm:size-20">
                  <Image src={s.art} alt="" fill sizes="80px" className="object-cover" />
                </span>
              ) : (
                <span className="size-14 shrink-0 bg-night-3 ring-1 ring-line sm:size-20" />
              )}
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-4 gap-y-2 transition-transform duration-500 ease-out group-hover:translate-x-2">
                  <span className="display text-4xl sm:text-6xl lg:text-7xl">{s.title}</span>
                  {s.comingSoon && <span className="bg-bone px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-night">Coming soon</span>}
                </span>
                {s.genre && <span className="label mt-2 block sm:hidden" style={{ color: s.accent }}>{s.genre}</span>}
              </span>
              <span className="hidden text-right sm:block">
                {s.genre && <span className="label block" style={{ color: s.accent }}>{s.genre}</span>}
                {s.detail && <span className="mt-1 block font-mono text-xs uppercase tracking-[0.14em] text-ash">{s.detail}</span>}
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
