import type { Metadata } from "next";
import Image from "next/image";
import { Anton } from "next/font/google";
import "./lab.css";
import { LightsOut, TapeClock, CodeBlue } from "./parts";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });

export const metadata: Metadata = { title: "Hero lab", robots: { index: false, follow: false } };

const Tag = ({ children }: { children: React.ReactNode }) => <p className="lab-tag">{children}</p>;

export default function Lab() {
  return (
    <div className={`lab ${anton.variable}`}>
      {/* A — Comic cover */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden" style={{ background: "var(--deep)" }}>
        <Tag>A · Comic cover</Tag>
        <div className="a-halftone absolute inset-0 -z-10" />
        <div className="a-logo absolute -right-[12vw] top-1/2 -z-10 w-[min(95vw,62rem)] -translate-y-1/2 sm:right-[-6vw]">
          <Image src="/brand/hush.avif" alt="" width={1200} height={1200} priority className="w-full rounded-full ring-[10px] ring-[#0b0a14]" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-8">
          <svg viewBox="0 0 260 150" className="a-bubble mb-2 w-44 sm:w-60" aria-hidden>
            <path d="M20 10 H240 a14 14 0 0 1 14 14 V96 a14 14 0 0 1 -14 14 H90 L44 146 L58 110 H20 a14 14 0 0 1 -14 -14 V24 a14 14 0 0 1 14 -14Z" fill="#f4ecf6" stroke="#0b0a14" strokeWidth="6" />
            <text x="130" y="76" textAnchor="middle" fontFamily="var(--font-anton)" fontSize="48" fill="#0b0a14">shhh…</text>
          </svg>
          <h2 className="a-hush text-[clamp(7rem,30vw,24rem)]">HUSH</h2>
          <p className="mt-8 inline-block rotate-[-1.5deg] border-[3px] border-[#0b0a14] bg-[#f4ecf6] px-4 py-2 font-[family-name:var(--font-anton)] text-2xl uppercase tracking-wide text-[#0b0a14] shadow-[6px_6px_0_#0b0a14] sm:text-3xl">
            Close your eyes.
          </p>
        </div>
      </section>

      {/* B — Lights out */}
      <LightsOut>
        <Tag>B · Lights out</Tag>
      </LightsOut>

      {/* C — Found tape */}
      <section className="c-screen relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden">
        <Tag>C · Found tape</Tag>
        <div className="c-roll absolute inset-x-0 top-0 z-10" />
        <div className="c-scan absolute inset-0 z-10" />
        <div className="c-osd absolute left-6 top-32 z-20 text-lg text-white sm:left-10 sm:text-2xl">
          PLAY <span className="c-blink">▶</span>
        </div>
        <div className="c-osd absolute right-6 top-32 z-20 flex items-center gap-2 text-sm text-white sm:right-10">
          <Image src="/brand/hush.avif" alt="" width={48} height={48} className="size-9 rounded-full opacity-80 grayscale-[30%]" />
          CH 03
        </div>
        <div className="relative text-center">
          <h2 className="c-hush text-[clamp(7rem,32vw,26rem)]">HUSH</h2>
          <p className="c-osd mt-6 text-sm uppercase text-white/80 sm:text-base">Close your eyes. Keep the tape rolling.</p>
        </div>
        <TapeClock />
      </section>

      {/* D — Code blue */}
      <CodeBlue>
        <Tag>D · Code blue</Tag>
      </CodeBlue>
    </div>
  );
}
