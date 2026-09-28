"use client";

import { useState } from "react";
import type { Episode } from "@/lib/feed";
import { formatTime, usePlayer, type Track } from "@/lib/player";
import { PlayIcon } from "@/components/PlayerBar";

type ShowInfo = { title: string; accent: string; href: string; art?: string };

const toTrack = (e: Episode, show: ShowInfo): Track => ({
  id: e.id, title: e.title, show: show.title, src: e.src, image: e.image ?? show.art, accent: show.accent, href: show.href,
});

const date = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/** A play button for the page header: "Play latest", "From the beginning". */
export function PlayButton({ episode, show, label, primary = false }: { episode: Episode; show: ShowInfo; label: string; primary?: boolean }) {
  const { track, playing, play, toggle } = usePlayer();
  const current = track?.id === episode.id;
  return (
    <button
      onClick={() => (current ? toggle() : play(toTrack(episode, show)))}
      className={`inline-flex items-center gap-3 px-5 py-3 text-sm transition ${primary ? "font-medium text-night hover:brightness-110" : "border border-line hover:border-bone"}`}
      style={primary ? { background: show.accent } : undefined}
    >
      <PlayIcon playing={current && playing} />
      {current && playing ? "Pause" : label}
    </button>
  );
}

const PAGE = 10;

/** The show's episodes, newest first, each playable in the site-wide player. */
export function Episodes({ episodes, show }: { episodes: Episode[]; show: ShowInfo }) {
  const { track, playing, play, toggle } = usePlayer();
  const [shown, setShown] = useState(PAGE);

  return (
    <div>
      <ol>
        {episodes.slice(0, shown).map((e) => {
          const current = track?.id === e.id;
          const label = e.type === "trailer" ? "Trailer" : e.type === "bonus" ? "Bonus" : e.number ? `${e.season ? `S${e.season} · ` : ""}Ep ${e.number}` : null;
          return (
            <li key={e.id} className="border-b border-line">
              <div className="group grid grid-cols-[auto_1fr] gap-x-5 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-start">
                <button
                  onClick={() => (current ? toggle() : play(toTrack(e, show)))}
                  className="mt-1 flex size-11 items-center justify-center rounded-full ring-1 transition"
                  style={current ? { background: show.accent, color: "#0a0a0b", boxShadow: "none" } : { boxShadow: `inset 0 0 0 1px ${show.accent}`, color: show.accent }}
                  aria-label={current && playing ? `Pause ${e.title}` : `Play ${e.title}`}
                >
                  <PlayIcon playing={current && playing} />
                </button>
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-ash">
                    {label && <span style={{ color: show.accent }}>{label}</span>}
                    {label && " · "}
                    {date(e.date)}
                  </p>
                  <h3 className="display mt-2 text-2xl sm:text-3xl">{e.title}</h3>
                  {e.summary && <p className="mt-2 max-w-2xl text-sm text-bone/70">{e.summary}</p>}
                </div>
                <p className="col-start-2 mt-3 font-mono text-xs text-ash sm:col-start-auto sm:mt-2">{e.seconds ? formatTime(e.seconds) : ""}</p>
              </div>
            </li>
          );
        })}
      </ol>
      {shown < episodes.length && (
        <button onClick={() => setShown((n) => n + PAGE * 2)} className="mt-8 border border-line px-5 py-3 text-sm transition hover:border-bone">
          More episodes ({episodes.length - shown})
        </button>
      )}
    </div>
  );
}
