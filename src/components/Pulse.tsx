"use client";

import { useEffect, useRef } from "react";

/**
 * A thin monitor trace running edge to edge: room tone, a heartbeat, now and then a murmur.
 * A small "hush" sits on the line, and the signal goes flat as it passes beneath it.
 */

const SPEED = 0.22; // share of the width the trace travels per second
const BEAT = 1.1; // seconds per heartbeat

const g = (p: number, c: number, w: number) => Math.exp(-(((p - c) / w) ** 2));
/** One heartbeat: P wave, QRS spike, T wave. Positive is up. */
const ecg = (p: number) => 0.1 * g(p, 0.1, 0.025) - 0.12 * g(p, 0.18, 0.008) + g(p, 0.2, 0.009) - 0.28 * g(p, 0.222, 0.01) + 0.2 * g(p, 0.4, 0.045);
const smooth = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

export function Pulse({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const word = wordRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0, running = false;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now() / 1000);
    };

    /** The signal at a point in "time", measured in seconds along the trace. */
    const signal = (s: number) => {
      const beat = ecg((((s / BEAT) % 1) + 1) % 1);
      // A murmur: a short burst of fast wiggle every few seconds.
      const env = smooth((Math.sin(s * 0.9) - 0.82) / 0.18) * smooth((Math.sin(s * 0.37 + 2) + 0.2) / 0.4);
      const murmur = env * 0.22 * (Math.sin(s * 71) * 0.6 + Math.sin(s * 113 + 1) * 0.4) * (0.6 + 0.4 * Math.sin(s * 9));
      const tone = 0.012 * (Math.sin(s * 37) + Math.sin(s * 59 + 2) + Math.sin(s * 97 + 4));
      return beat + murmur + tone;
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      const mid = H / 2, amp = H * 0.42;
      const cx = W / 2, half = word.offsetWidth / 2 + 8, ramp = Math.max(40, word.offsetWidth * 0.8);
      const secondsAcross = 1 / SPEED;
      const t = reduced ? 0 : now;

      ctx.beginPath();
      for (let x = 0; x <= W; x += 1) {
        // The trace moves right to left, like a monitor.
        const s = t + (x / W) * secondsAcross;
        const quiet = smooth((Math.abs(x - cx) - half) / ramp);
        const y = mid - signal(s) * amp * quiet;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(236, 231, 222, 0.85)";
      ctx.lineWidth = 1.25;
      ctx.lineJoin = "round";
      ctx.stroke();
    };

    const frame = () => {
      draw(performance.now() / 1000);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || reduced || document.hidden) return;
      running = true;
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
    document.fonts.ready.then(() => draw(performance.now() / 1000));

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="block h-full w-full"
        style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}
      />
      <p ref={wordRef} aria-hidden className="display absolute bottom-1/2 left-1/2 -translate-x-1/2 pb-1.5 text-2xl leading-none sm:text-3xl">
        hush
      </p>
    </div>
  );
}
