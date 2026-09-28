import { Poppins } from "next/font/google";

const mark = Poppins({ subsets: ["latin"], weight: "500", display: "swap" });

/**
 * "hush", redrawn as live type with a light VHS treatment: colour edges that don't quite line
 * up, faint scanlines, and a short tracking glitch every few seconds. All CSS.
 */
export function VhsMark({ className = "" }: { className?: string }) {
  return (
    <span aria-label="hush" role="img" className={`vhs ${mark.className} ${className}`} data-text="hush">
      <span aria-hidden className="vhs-core">hush</span>
      <span aria-hidden className="vhs-core vhs-slice">hush</span>
      <span aria-hidden className="vhs-core vhs-slice vhs-slice-b">hush</span>
      <span aria-hidden className="vhs-static" />
    </span>
  );
}
