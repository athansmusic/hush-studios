"use client";

import { useEffect, useRef } from "react";

/**
 * A live-looking audio waveform of a heartbeat, scrolling right to left as if it were playing.
 * Each lub and dub is a burst of bars over a low noise floor, with the odd breath between; no two
 * beats are quite the same. Bars are mirrored around the centre line, like any audio editor.
 */

const SPEED = 110; // px per second
const BAR_W = 1.5;

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

/** Produces the level (0..1) of the next bar, one bar-duration at a time. */
function heartbeatStream(barSeconds: number) {
  let t = 0;
  let nextBeat = rand(0.2, 0.5);
  let nextBreath = rand(3, 7);
  const events: { at: number; amp: number; decay: number; noisy?: boolean }[] = [];
  return () => {
    t += barSeconds;
    if (t >= nextBeat) {
      const strength = rand(0.8, 1);
      events.push({ at: nextBeat, amp: strength, decay: 0.09 });
      events.push({ at: nextBeat + rand(0.26, 0.32), amp: strength * rand(0.5, 0.68), decay: 0.07 });
      nextBeat += rand(0.98, 1.2);
    }
    if (t >= nextBreath) {
      events.push({ at: nextBreath, amp: rand(0.18, 0.3), decay: 0.35, noisy: true });
      nextBreath += rand(5, 10);
    }
    let level = rand(0.03, 0.07);
    for (let i = events.length - 1; i >= 0; i--) {
      const e = events[i];
      const d = t - e.at;
      if (d > e.decay * 6) { events.splice(i, 1); continue; }
      const env = d < 0 ? 0 : (d < 0.018 ? d / 0.018 : Math.exp(-(d - 0.018) / e.decay)) * e.amp;
      level = Math.max(level, env * (e.noisy ? rand(0.3, 1) : rand(0.7, 1)));
    }
    return Math.min(1, level);
  };
}

export function Waveform({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, pitch = 4, raf = 0, running = false, last = 0, offset = 0;
    let levels: number[] = [];
    let next = heartbeatStream(pitch / SPEED);
    const color = getComputedStyle(canvas).color;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pitch = W < 480 ? 3 : 4;
      next = heartbeatStream(pitch / SPEED);
      // Pre-roll so the screen is already full of sound on load.
      levels = Array.from({ length: Math.ceil(W / pitch) + 2 }, () => next());
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = color;
      const mid = H / 2;
      for (let i = 0; i < levels.length; i++) {
        const x = i * pitch - offset;
        const h = Math.max(1, levels[i] * H * 0.96);
        ctx.fillRect(x, mid - h / 2, BAR_W, h);
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      offset += SPEED * dt;
      while (offset >= pitch) {
        offset -= pitch;
        levels.shift();
        levels.push(next());
      }
      draw();
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || reduced || document.hidden) return;
      running = true; last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    size();
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
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)" }}
    />
  );
}
