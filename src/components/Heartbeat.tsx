/**
 * A waveform that beats like a heart a few times, then flatlines and says "hush".
 * One CSS timeline drives the bars, the flat line and the word, so they stay in step. No client JS.
 */

const BEATS = 5;
const BEAT = 1.1; // seconds per heartbeat
const CYCLE = 9.5; // beats, then the flatline, then around again

// One lub-dub, as [offset within the beat in seconds, height as a share of the bar's peak].
const LUB_DUB: [number, number][] = [
  [0, 0],
  [0.077, 1],
  [0.165, 0.2],
  [0.253, 0.7],
  [0.396, 0],
];

const pct = (s: number) => `${((s / CYCLE) * 100).toFixed(2)}%`;

function barKeyframes() {
  const rest = "transform: scaleY(0.06)";
  const frames: string[] = [];
  for (let b = 0; b < BEATS; b++) {
    for (const [t, h] of LUB_DUB) {
      const scale = h === 0 ? rest : `transform: scaleY(max(0.06, calc(var(--peak, 1) * ${h})))`;
      frames.push(`${pct(b * BEAT + t)} { ${scale}; }`);
    }
  }
  frames.push(`100% { ${rest}; }`);
  return `@keyframes hb-bars { ${frames.join(" ")} }`;
}

const lastBeatEnds = (BEATS - 1) * BEAT + 0.4;
const css = `
${barKeyframes()}
@keyframes hb-line {
  0%, ${pct(lastBeatEnds)} { opacity: 0; }
  ${pct(lastBeatEnds + 0.3)}, ${pct(CYCLE - 0.4)} { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes hb-dots {
  0%, ${pct(lastBeatEnds)} { opacity: 1; }
  ${pct(lastBeatEnds + 0.3)}, ${pct(CYCLE - 0.4)} { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes hb-word {
  0%, ${pct(lastBeatEnds + 0.6)} { opacity: 0; letter-spacing: 0.02em; filter: blur(6px); }
  ${pct(lastBeatEnds + 1.6)}, ${pct(CYCLE - 1.2)} { opacity: 1; letter-spacing: -0.02em; filter: blur(0); }
  ${pct(CYCLE - 0.5)}, 100% { opacity: 0; letter-spacing: -0.02em; filter: blur(4px); }
}
.wave.hb { animation: hb-dots ${CYCLE}s linear infinite; }
.wave.hb span { animation: hb-bars ${CYCLE}s linear infinite; }
.hb-line { animation: hb-line ${CYCLE}s linear infinite; }
.hb-word { animation: hb-word ${CYCLE}s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .wave.hb span { animation: none; transform: scaleY(0.06); }
  .wave.hb { animation: none; opacity: 0; }
  .hb-line, .hb-word { animation: none; opacity: 1; }
}
`;

export function Heartbeat({ bars = 96, className = "" }: { bars?: number; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <style>{css}</style>

      <div aria-hidden className="wave hb flex h-full items-center gap-[3px] text-bone/35">
        {Array.from({ length: bars }, (_, i) => {
          // Loudest in the middle, falling off to the edges, with a little deterministic jitter.
          const t = i / (bars - 1);
          const envelope = Math.sin(Math.PI * t) ** 1.5;
          const jitter = 0.55 + 0.45 * Math.abs(Math.sin(i * 12.9898));
          const peak = Math.max(0.08, envelope * jitter);
          return (
            <div key={i} className="h-full flex-1">
              <span style={{ ["--peak" as string]: peak.toFixed(3), animationDelay: `${(Math.abs(t - 0.5) * 0.35).toFixed(3)}s` }} />
            </div>
          );
        })}
      </div>

      {/* The flatline, with a gap for the word. */}
      <div aria-hidden className="hb-line pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center opacity-0">
        <span className="h-px flex-1 bg-bone/60" />
        <span className="w-[clamp(9rem,26vw,20rem)]" />
        <span className="h-px flex-1 bg-bone/60" />
      </div>
      <p className="hb-word display pointer-events-none absolute inset-0 flex items-center justify-center text-[clamp(4rem,11vw,9rem)] opacity-0">
        hush
      </p>
    </div>
  );
}
