"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ── B: Lights out ─────────────────────────────────────────────── */

const WHISPERS: [string, string][] = [
  ["did you hear that?", "left-[8%] top-[18%]"],
  ["don't turn around", "right-[10%] top-[22%]"],
  ["it's closer now", "left-[14%] bottom-[16%]"],
  ["shhh", "right-[16%] bottom-[20%]"],
  ["keep your eyes closed", "left-[40%] top-[10%]"],
];

export function LightsOut({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current!;
    let raf = 0, lastMove = 0, t0 = performance.now();
    const set = (x: number, y: number) => {
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      lastMove = performance.now();
      set(e.clientX - r.left, e.clientY - r.top);
    };
    // With nobody steering, the light wanders on its own.
    const wander = (now: number) => {
      if (now - lastMove > 2500) {
        const t = (now - t0) / 1000;
        const { width: w, height: h } = el.getBoundingClientRect();
        set(w * (0.5 + 0.36 * Math.sin(t * 0.45)), h * (0.5 + 0.3 * Math.sin(t * 0.71 + 1)));
      }
      raf = requestAnimationFrame(wander);
    };
    // The torch cuts out now and then.
    let flick: ReturnType<typeof setTimeout>;
    const flicker = () => {
      const seq = [0, 70, 140, 210, 420];
      seq.forEach((d, i) => setTimeout(() => el.style.setProperty("--r", i % 2 ? "180px" : "0px"), d));
      setTimeout(() => el.style.setProperty("--r", "180px"), 520);
      flick = setTimeout(flicker, 5000 + Math.random() * 6000);
    };
    flick = setTimeout(flicker, 4000);
    el.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(wander);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(flick);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-black" style={{ ["--r" as string]: "180px" }}>
      {children}
      <p className="absolute inset-x-0 bottom-10 text-center font-mono text-xs uppercase tracking-[0.3em] text-white/30">
        It&apos;s dark in here. Move your light.
      </p>

      <div className="b-reveal absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 50%, #2a1f45, #0b0914 70%)" }}>
        <Image src="/brand/hush.avif" alt="" width={1200} height={1200} className="absolute left-1/2 top-1/2 w-[min(85vw,52rem)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="b-hush relative text-[clamp(7rem,30vw,24rem)] mix-blend-screen">HUSH</h2>
          <p className="b-whisper mt-4 text-3xl text-white sm:text-5xl">Close your eyes.</p>
        </div>
        {WHISPERS.map(([w, pos]) => (
          <p key={w} className={`b-whisper absolute text-xl sm:text-3xl ${pos}`}>{w}</p>
        ))}
      </div>
    </section>
  );
}

/* ── C: Found tape ─────────────────────────────────────────────── */

export function TapeClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return null;
  const date = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase().replace(",", "");
  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return (
    <>
      <div className="c-osd absolute bottom-8 left-6 z-20 text-lg text-white sm:left-10 sm:text-2xl">
        {time}
        <br />
        {date}
      </div>
      <div className="c-osd absolute bottom-8 right-6 z-20 text-lg text-white sm:right-10 sm:text-2xl">SP</div>
    </>
  );
}

/* ── D: Code blue ──────────────────────────────────────────────── */

const g = (p: number, c: number, w: number) => Math.exp(-(((p - c) / w) ** 2));
/** One heartbeat of an ECG trace: P wave, QRS spike, T wave. */
const ecg = (p: number) => 0.12 * g(p, 0.1, 0.025) - 0.15 * g(p, 0.18, 0.008) + g(p, 0.2, 0.01) - 0.3 * g(p, 0.225, 0.01) + 0.25 * g(p, 0.4, 0.04);

export function CodeBlue({ children }: { children?: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bpmRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const [slam, setSlam] = useState(false);

  useEffect(() => {
    const section = sectionRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0, last = 0, visible = true;
    let x = 0, y = 0, phase = 0, bpm = 64, elapsed = 0, mode: "beat" | "flat" | "dark" = "beat", modeT = 0;

    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = section.clientWidth; H = section.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      x = 0; y = H / 2;
    };
    const reset = () => {
      ctx.clearRect(0, 0, W, H);
      x = 0; y = H / 2; phase = 0; bpm = 64; elapsed = 0; mode = "beat"; modeT = 0;
      setSlam(false);
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      elapsed += dt; modeT += dt;
      const base = H * 0.5, amp = H * 0.28;

      if (mode === "beat") {
        bpm = Math.min(168, 64 + elapsed * elapsed * 1.1);
        const prev = phase;
        phase += (dt * bpm) / 60;
        if (Math.floor(phase) !== Math.floor(prev) && dotRef.current) {
          dotRef.current.animate([{ opacity: 1, transform: "scale(1.6)" }, { opacity: 0.3, transform: "scale(1)" }], { duration: 260 });
        }
        if (bpmRef.current) bpmRef.current.textContent = String(Math.round(bpm));
        if (bpm >= 168) { mode = "flat"; modeT = 0; if (bpmRef.current) bpmRef.current.textContent = "---"; }
      } else if (mode === "flat" && modeT > 1.6) {
        mode = "dark"; modeT = 0; setSlam(true);
      } else if (mode === "dark" && modeT > 3.2) {
        reset();
      }

      if (mode !== "dark") {
        const speed = W / 3.2;
        const nx = x + speed * dt;
        const ny = mode === "beat" ? base - amp * ecg(phase % 1) : base;
        // Erase just ahead of the pen, like a monitor sweeping over its old trace.
        ctx.clearRect(nx % W, 0, 40, H);
        ctx.strokeStyle = "#ff6ec7";
        ctx.lineWidth = 3;
        ctx.shadowColor = "#ff6ec7";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        if (nx >= W) { ctx.moveTo(0, ny); x = nx - W; } else { ctx.moveTo(x, y); x = nx; }
        ctx.lineTo(x, ny);
        ctx.stroke();
        y = ny;
      } else {
        ctx.clearRect(0, 0, W, H);
      }
      raf = requestAnimationFrame(step);
    };

    size();
    const ro = new ResizeObserver(size);
    ro.observe(section);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) { last = 0; raf = requestAnimationFrame(step); }
    });
    io.observe(section);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <section ref={sectionRef} className="d-grid relative isolate min-h-[100svh] overflow-hidden bg-[#07060d]">
      {children}
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      <div className="absolute right-6 top-16 z-10 text-right font-mono text-[#ff6ec7] sm:right-10">
        <p className="flex items-center justify-end gap-2 text-xs tracking-[0.3em]">
          <span ref={dotRef} className="inline-block size-2.5 rounded-full bg-[#ff6ec7] opacity-30" /> HR
        </p>
        <p className="text-6xl sm:text-8xl"><span ref={bpmRef}>64</span></p>
      </div>
      <p className="absolute bottom-10 left-6 z-10 font-mono text-xs uppercase tracking-[0.3em] text-[#ff6ec7]/70 sm:left-10">
        Close your eyes.
      </p>
      <div
        className={`d-hush absolute inset-0 z-20 flex items-center justify-center bg-black text-[clamp(7rem,30vw,24rem)] transition-all duration-300 ${slam ? "scale-100 opacity-100" : "pointer-events-none scale-150 opacity-0"}`}
        style={{ transitionTimingFunction: "cubic-bezier(.2,1.6,.4,1)" }}
      >
        HUSH
      </div>
    </section>
  );
}
