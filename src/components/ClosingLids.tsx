"use client";

import { useEffect, useRef } from "react";

/**
 * The hero sits on its own colour, and scrolling closes it like an eye. The opening is the lens
 * between two great arcs, so it tapers to points at the corners; the upper lid travels most of the
 * way and they meet a little below centre, as real lids do. As it shuts, `line` ("close your
 * eyes.") surfaces in the dark. Scroll-driven, so it reopens on the way back up.
 */
export function ClosingLids({ children, line }: { children: React.ReactNode; line: React.ReactNode }) {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const upperRef = useRef<HTMLDivElement>(null);
  const lowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current!;
    const stage = stageRef.current!;
    const upper = upperRef.current!;
    const lower = lowerRef.current!;
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const W = stage.clientWidth, H = stage.clientHeight;
      const travel = Math.max(1, r.height - H);
      const raw = Math.min(1, Math.max(0, -r.top / travel));
      // The lids finish closing at 70% of the scroll; the rest is a beat in the dark with the line.
      const p = Math.min(1, raw / 0.7);
      const e = p * p * (3 - 2 * p);
      // The line fades in as the lids meet and stays; it scrolls away with the page.
      const lineIn = Math.min(1, Math.max(0, (raw - 0.35) / 0.25));
      stage.style.setProperty("--line", lineIn.toFixed(3));

      // Where each lid's edge crosses the centre line. The upper lid falls from well above the
      // screen to just below centre; the lower lid rises less far to meet it.
      const meet = H * 0.56;
      const top = -H * 0.45 + (meet + H * 0.45) * e;
      const bottom = H * 1.3 - (H * 1.3 - meet) * e;
      // Arc radius: curved enough that the opening reads as an eye well before it shuts,
      // tapering to points inside the screen once it's about a quarter open.
      const R = Math.max(W * 0.8, (1.2 * W * W) / H);

      upper.style.clipPath = `circle(${R}px at 50% ${top + R}px)`;
      lower.style.clipPath = `circle(${R}px at 50% ${bottom - R}px)`;
      stage.style.setProperty("--p", e.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={trackRef} className="relative h-[140svh]">
      <div ref={stageRef} className="lids-stage sticky top-16 isolate h-[calc(100svh-4rem)] overflow-hidden bg-night">
        {/* The view, clipped by both lids at once: below the upper arc and above the lower one. */}
        <div ref={upperRef} className="absolute inset-0">
          <div ref={lowerRef} className="absolute inset-0 flex flex-col">
            <div aria-hidden className="lids-sky absolute inset-0 -z-10" />
            <div className="lids-content relative flex flex-1 flex-col">{children}</div>
            <div aria-hidden className="lids-shade pointer-events-none absolute inset-0" />
          </div>
        </div>
        <div className="lids-line pointer-events-none absolute inset-x-0 top-[56%] flex justify-center px-4">{line}</div>
      </div>
    </section>
  );
}
