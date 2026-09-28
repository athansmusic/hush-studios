"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type Track = {
  id: string;
  title: string;
  show: string;
  src: string;
  image?: string;
  accent: string;
  href: string;
};

type Player = {
  track: Track | null;
  playing: boolean;
  time: number;
  duration: number;
  play: (t: Track) => void;
  toggle: () => void;
  seek: (seconds: number) => void;
  skip: (delta: number) => void;
  close: () => void;
};

const PlayerContext = createContext<Player | null>(null);

export const usePlayer = () => {
  const p = useContext(PlayerContext);
  if (!p) throw new Error("usePlayer outside PlayerProvider");
  return p;
};

const RESUME_KEY = "hush:resume";

/**
 * One audio element for the whole site. It lives in the root layout, so playback carries on
 * while people move between pages. Where each episode was left off is remembered per browser.
 */
export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const resumeAt = useRef(0);

  const savePosition = useCallback((id: string, t: number) => {
    try {
      const all = JSON.parse(localStorage.getItem(RESUME_KEY) ?? "{}");
      all[id] = Math.floor(t);
      localStorage.setItem(RESUME_KEY, JSON.stringify(all));
    } catch {}
  }, []);

  const play = useCallback((t: Track) => {
    const a = audioRef.current!;
    if (track?.id === t.id) {
      a.play();
      return;
    }
    setTrack(t);
    setTime(0);
    setDuration(0);
    a.src = t.src;
    try {
      resumeAt.current = JSON.parse(localStorage.getItem(RESUME_KEY) ?? "{}")[t.id] ?? 0;
    } catch {
      resumeAt.current = 0;
    }
    a.play().catch(() => setPlaying(false));
  }, [track?.id]);

  const toggle = useCallback(() => {
    const a = audioRef.current!;
    if (a.paused) a.play(); else a.pause();
  }, []);
  const seek = useCallback((s: number) => { audioRef.current!.currentTime = s; }, []);
  const skip = useCallback((d: number) => {
    const a = audioRef.current!;
    a.currentTime = Math.max(0, Math.min(a.duration || Infinity, a.currentTime + d));
  }, []);
  const close = useCallback(() => {
    const a = audioRef.current!;
    a.pause();
    a.removeAttribute("src");
    a.load();
    setTrack(null);
    setPlaying(false);
  }, []);

  // Lock screen, headphones and media keys.
  useEffect(() => {
    if (!track || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.show,
      album: "Hush Studios",
      artwork: track.image ? [{ src: track.image, sizes: "512x512" }] : [],
    });
    navigator.mediaSession.setActionHandler("play", () => audioRef.current?.play());
    navigator.mediaSession.setActionHandler("pause", () => audioRef.current?.pause());
    navigator.mediaSession.setActionHandler("seekbackward", () => skip(-15));
    navigator.mediaSession.setActionHandler("seekforward", () => skip(30));
  }, [track, skip]);

  const value = useMemo(() => ({ track, playing, time, duration, play, toggle, seek, skip, close }), [track, playing, time, duration, play, toggle, seek, skip, close]);

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => {
          setPlaying(false);
          if (track) savePosition(track.id, audioRef.current!.currentTime);
        }}
        onTimeUpdate={(e) => {
          const t = e.currentTarget.currentTime;
          setTime(t);
          if (track && Math.floor(t) % 10 === 0) savePosition(track.id, t);
        }}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          if (resumeAt.current) {
            e.currentTarget.currentTime = resumeAt.current;
            resumeAt.current = 0;
          }
        }}
        onEnded={() => track && savePosition(track.id, 0)}
      />
    </PlayerContext.Provider>
  );
}

export function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
  return h ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`;
}
