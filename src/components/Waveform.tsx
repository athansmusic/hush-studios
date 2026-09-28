"use client";

import { useEffect, useRef } from "react";

/**
 * Thin bars that stay in place and move like a live audio meter, driven by a heartbeat.
 * Each lub and dub kicks the bars up, rippling out from the centre, and they fall back like a
 * real meter. Between beats they keep flickering on the room tone, so the lines never sit still.
 */

const BAR_W = 1.5;
const RIPPLE = 0.22; // seconds for a beat to reach the outer bars

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** The heartbeat's loudness over time, with each beat a little different. */
function heartbeat() {
  const events: { at: number; amp: number; decay: number }[] = [];
  let nextBeat = 0.3;
  return (t: number) => {
    while (t + RIPPLE >= nextBeat) {
      const s = rand(0.8, 1);
      events.push({ at: nextBeat, amp: s, decay: 0.11 });
      events.push({ at: nextBeat + rand(0.26, 0.32), amp: s * rand(0.5, 0.7), decay: 0.08 });
      nextBeat += rand(0.98, 1.2);
    }
    while (events.length && t - events[0].at > 2.5) events.shift();
    return (at: number) => {
      let level = 0;
      for (const e of events) {
        const d = at - e.at;
        if (d < 0) continue;
        level = Math.max(level, (d < 0.02 ? d / 0.02 : Math.exp(-(d - 0.02) / e.decay)) * e.amp);
      }
      return level;
    };
  };
}

export function Waveform({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const color = getComputedStyle(canvas).color;
    const beat = heartbeat();
    let W = 0, H = 0, raf = 0, running = false, last = 0;
    let bars: { profile: number; delay: number; h: number; seed: number; speed: number }[] = [];

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pitch = W < 480 ? 3 : 4;
      const n = Math.floor(W / pitch);
      // Each bar has its own reach (louder in the middle, uneven like a real clip) and flicker.
      bars = Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        const centre = Math.sin(Math.PI * t) ** 1.2;
        return { profile: Math.max(0.12, centre * rand(0.45, 1)), delay: Math.abs(t - 0.5) * 2 * RIPPLE, h: 0.05, seed: rand(0, 100), speed: rand(6, 14) };
      });
      draw(performance.now() / 1000, 0.016);
    };

    const draw = (t: number, dt: number) => {
      const levelAt = beat(t);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = color;
      const mid = H / 2;
      const pitch = W / bars.length;
      for (let i = 0; i < bars.length; i++) {
        const b = bars[i];
        const tone = 0.06 + 0.05 * (0.5 + 0.5 * Math.sin(t * b.speed + b.seed)) * (0.5 + 0.5 * Math.sin(t * b.speed * 1.7 + b.seed * 2));
        const hit = levelAt(t - b.delay) * rand(0.75, 1);
        const target = Math.max(tone, hit) * b.profile;
        // Fast attack, slower release, like a level meter.
        b.h += (target - b.h) * Math.min(1, dt * (target > b.h ? 40 : 9));
        const h = Math.max(1, b.h * H);
        ctx.fillRect(i * pitch + (pitch - BAR_W) / 2, mid - h / 2, BAR_W, h);
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      draw(now / 1000, dt);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || reduced || document.hidden) return;
      running = true; last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    size();
    if (reduced) bars.forEach((b) => (b.h = b.profile * 0.5)), draw(0, 0);
    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block ${className}`}
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}
    />
  );
}
