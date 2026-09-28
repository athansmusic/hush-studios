/** A row of bars that swell and settle back to near-silence. Pure CSS, no client JS. */
export function Wave({ bars = 48, className = "" }: { bars?: number; className?: string }) {
  return (
    <div aria-hidden className={`wave flex items-center gap-[3px] ${className}`}>
      {Array.from({ length: bars }, (_, i) => {
        // Loudest in the middle, falling off to the edges, with a little deterministic jitter.
        const t = i / (bars - 1);
        const envelope = Math.sin(Math.PI * t) ** 1.5;
        const jitter = 0.55 + 0.45 * Math.abs(Math.sin(i * 12.9898));
        const peak = Math.max(0.08, envelope * jitter);
        return (
          <div key={i} className="h-full flex-1">
            <span style={{ ["--peak" as string]: peak.toFixed(3), animationDelay: `${(-i * 0.09).toFixed(2)}s` }} />
          </div>
        );
      })}
    </div>
  );
}
