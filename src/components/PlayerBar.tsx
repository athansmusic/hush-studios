"use client";

import Image from "next/image";
import Link from "next/link";
import { formatTime, usePlayer } from "@/lib/player";

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" className="size-5 translate-x-px" fill="currentColor" aria-hidden><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
  );
}

/** The site-wide player, pinned to the bottom once something is playing. */
export function PlayerBar() {
  const { track, playing, time, duration, toggle, seek, skip, close } = usePlayer();

  return (
    <>
      {/* Keeps the footer clear of the bar. */}
      {track && <div aria-hidden className="h-24 sm:h-20" />}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-night/90 backdrop-blur-md transition-transform duration-500 ${track ? "translate-y-0" : "translate-y-full"}`}
        style={track ? { ["--accent" as string]: track.accent } : undefined}
        aria-hidden={!track}
      >
        {track && (
          <>
            {/* Scrubber along the top edge. */}
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={1}
              value={Math.min(time, duration || 0)}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Seek"
              className="player-scrub absolute inset-x-0 -top-[7px] w-full"
              style={{ ["--pct" as string]: `${duration ? (time / duration) * 100 : 0}%` }}
            />
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-8">
              {track.image && (
                <Link href={track.href} className="relative size-12 shrink-0 overflow-hidden ring-1 ring-line">
                  <Image src={track.image} alt="" fill sizes="48px" className="object-cover" unoptimized />
                </Link>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{track.title}</p>
                <p className="truncate text-xs text-ash">
                  <Link href={track.href} className="hover:text-bone">{track.show}</Link>
                  <span className="ml-2 font-mono">{formatTime(time)} / {formatTime(duration)}</span>
                </p>
              </div>
              <button onClick={() => skip(-15)} className="hidden font-mono text-xs text-ash hover:text-bone sm:block" aria-label="Back 15 seconds">−15</button>
              <button
                onClick={toggle}
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-night transition hover:brightness-110"
                style={{ background: track.accent }}
                aria-label={playing ? "Pause" : "Play"}
              >
                <PlayIcon playing={playing} />
              </button>
              <button onClick={() => skip(30)} className="hidden font-mono text-xs text-ash hover:text-bone sm:block" aria-label="Forward 30 seconds">+30</button>
              <button onClick={close} className="text-ash hover:text-bone" aria-label="Close player">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export { PlayIcon };
