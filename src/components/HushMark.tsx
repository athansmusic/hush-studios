"use client";

import { useEffect, useRef } from "react";

/**
 * The word "hush" drawn as vertical bars that only exist while the heart beats.
 * Between beats it flattens to a line; a lub-dub sweeps across like an ECG. Moving the
 * pointer makes noise near it, and stillness lets the heartbeat come back.
 */

const PERIOD = 1.1; // seconds per heartbeat (~55 bpm)
const SWEEP = 0.45; // seconds for a beat to cross the word
const BONE = "#ece7de";
const FRINGE_A = "#ff3d8b"; // from the logo's pinks
const FRINGE_B = "#8b5cff"; // and purples

type Column = { x: number; spans: [number, number][] };

/** Lub (strong) then dub (softer), as two narrow bumps inside one period. */
function beat(p: number) {
  const bump = (c: number, w: number) => Math.exp(-(((p - c) / w) ** 2));
  return bump(0.06, 0.035) + 0.65 * bump(0.2, 0.04);
}

export function HushMark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, mid = 0, step = 6, barW = 3;
    let columns: Column[] = [];
    let raf = 0, visible = true, running = false;
    const pointer = { x: -1e4, energy: 0, lastX: 0, lastY: 0 };
    const seed = Array.from({ length: 2048 }, () => Math.random());

    const family = getComputedStyle(document.body).getPropertyValue("--font-geist").trim() || "system-ui";
    const font = (px: number) => `900 ${px}px ${family}`;

    function layout() {
      W = wrap.clientWidth;
      if (!W) return;
      step = W < 640 ? 4 : 6;
      barW = W < 640 ? 2 : 3;

      // Fit the word to the width, then size the canvas to the glyphs.
      const probe = document.createElement("canvas").getContext("2d")!;
      probe.font = font(100);
      const m100 = probe.measureText("hush");
      const size = (100 * W) / (m100.actualBoundingBoxLeft + m100.actualBoundingBoxRight);
      probe.font = font(size);
      const m = probe.measureText("hush");
      const ascent = m.actualBoundingBoxAscent, descent = m.actualBoundingBoxDescent;
      const xHeight = probe.measureText("x").actualBoundingBoxAscent;
      const pad = Math.round(size * 0.08);
      H = Math.ceil(ascent + descent + pad * 2);
      const baseline = pad + ascent;
      mid = baseline - xHeight / 2;

      // Rasterise once and read each column's vertical runs of ink.
      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      o.font = font(size);
      o.fillStyle = "#fff";
      o.fillText("hush", m.actualBoundingBoxLeft, baseline);
      const data = o.getImageData(0, 0, W, H).data;
      columns = [];
      for (let x = Math.floor(step / 2); x < W; x += step) {
        const spans: [number, number][] = [];
        let start = -1;
        for (let y = 0; y <= H; y++) {
          const ink = y < H && data[(y * W + x) * 4 + 3] > 127;
          if (ink && start < 0) start = y;
          if (!ink && start >= 0) { spans.push([start, y]); start = -1; }
        }
        if (spans.length) columns.push({ x, spans });
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now() / 1000);
    }

    function bars(color: string, alpha: number, amps: Float32Array, dx: number) {
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      for (let i = 0; i < columns.length; i++) {
        const a = amps[i];
        const { x, spans } = columns[i];
        for (const [y0, y1] of spans) {
          const t = mid + (y0 - mid) * a;
          const b = mid + (y1 - mid) * a;
          ctx.fillRect(x - barW / 2 + dx, Math.min(t, b), barW, Math.max(1, Math.abs(b - t)));
        }
      }
    }

    const amps = new Float32Array(4096);

    function draw(now: number) {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      // The flat line the word collapses to.
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = BONE;
      ctx.fillRect(0, mid - 0.5, W, 1);

      // A faint ghost so the word always reads.
      const ghost = new Float32Array(columns.length).fill(1);
      bars(BONE, 0.07, ghost, 0);

      let peak = 0;
      const jitterFrame = Math.floor(now * 30);
      for (let i = 0; i < columns.length; i++) {
        const x = columns[i].x;
        let a: number;
        if (reduced) {
          a = 1;
        } else {
          const phase = (((now - (x / W) * SWEEP) / PERIOD) % 1 + 1) % 1;
          const d = (x - pointer.x) / (W * 0.12);
          const noise = pointer.energy * Math.exp(-d * d) * (0.35 + 0.65 * seed[(i * 7 + jitterFrame) % seed.length]);
          // Noise drowns the heartbeat out; stillness lets it return.
          a = Math.min(1.08, 0.03 + beat(phase) * (1 - pointer.energy * 0.6) + noise);
        }
        amps[i] = a;
        if (a > peak) peak = a;
      }

      if (!reduced) {
        // Colour fringes split apart on the loudest moments, like the wordmark.
        const spread = 1 + peak * 3 + pointer.energy * 4;
        ctx.globalCompositeOperation = "lighter";
        bars(FRINGE_A, 0.55, amps, -spread);
        bars(FRINGE_B, 0.55, amps, spread);
        ctx.globalCompositeOperation = "source-over";
      }
      bars(BONE, 0.95, amps, 0);
      ctx.globalAlpha = 1;
    }

    function frame() {
      pointer.energy *= 0.94;
      draw(performance.now() / 1000);
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function onMove(e: PointerEvent) {
      const r = canvas.getBoundingClientRect();
      const speed = Math.hypot(e.clientX - pointer.lastX, e.clientY - pointer.lastY);
      pointer.lastX = e.clientX; pointer.lastY = e.clientY;
      pointer.x = e.clientX - r.left;
      pointer.energy = Math.min(1, pointer.energy + speed / 250);
    }

    const ro = new ResizeObserver(() => layout());
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    });
    const onVis = () => (document.hidden ? stop() : start());

    // Draw straight away, then again once the heavy weight has actually loaded.
    layout();
    ro.observe(wrap);
    io.observe(canvas);
    start();
    document.fonts.load(font(100)).then(layout, () => {});
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full">
      <canvas ref={canvasRef} aria-hidden className="block w-full" style={{ height: "28vw" }} />
    </div>
  );
}
