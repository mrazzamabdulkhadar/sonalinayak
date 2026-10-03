"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Heart, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import type { Song, SongTab } from "@/data/story";
import { songTabs } from "@/data/story";
import GradientPhoto from "@/components/ui/GradientPhoto";
import { playClick } from "@/lib/sounds";

const fmt = (t: number) => {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

/** Three little bars that dance while a track is playing. */
function Equalizer({ animate }: { animate: boolean }) {
  return (
    <span aria-hidden className="flex h-3.5 items-end gap-[2px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full bg-nightrose ${animate ? "eq-bar" : ""}`}
          style={{ height: animate ? undefined : "40%", animationDelay: `${i * 140}ms` }}
        />
      ))}
    </span>
  );
}

export default function SongList({ songs }: { songs: Song[] }) {
  // tabs that actually have songs, in the canonical order
  const tabs = useMemo(
    () => songTabs.filter((t) => songs.some((s) => s.tab === t)),
    [songs]
  );
  const [activeTab, setActiveTab] = useState<SongTab>(tabs[0]);

  // the full queue follows the active tab
  const queue = useMemo(() => songs.filter((s) => s.tab === activeTab), [songs, activeTab]);

  const [currentId, setCurrentId] = useState<string>(queue[0]?.id ?? songs[0]?.id);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const current = useMemo(() => queue.findIndex((s) => s.id === currentId), [queue, currentId]);
  const song = queue[current] ?? queue[0];

  // when the tab changes, point at its first track (don't auto-play)
  useEffect(() => {
    if (!queue.length) return;
    if (!queue.some((s) => s.id === currentId)) {
      setCurrentId(queue[0].id);
      setPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // load the current track whenever it changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song?.audio) return;
    audio.src = song.audio;
    audio.load();
    setProgress(0);
    setTime(0);
    setDuration(0);
    if (playing) audio.play().catch(() => setPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [playing]);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!queue.length) return;
      const i = queue.findIndex((s) => s.id === currentId);
      const next = (i + dir + queue.length) % queue.length;
      setCurrentId(queue[next].id);
    },
    [queue, currentId]
  );

  const onEnded = useCallback(() => step(1), [step]);

  const select = (id: string) => {
    if (id === currentId) {
      setPlaying((p) => !p);
    } else {
      setCurrentId(id);
      setPlaying(true);
    }
    playClick();
  };

  const seek = (pct: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration === 0) return;
    audio.currentTime = (pct / 100) * audio.duration;
  };

  const toggleLike = (id: string) => {
    setLiked((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
    playClick();
  };

  return (
    <div className="mx-auto max-w-2xl">
      <audio
        ref={audioRef}
        onEnded={onEnded}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setTime(a.currentTime);
          if (a.duration) setProgress((a.currentTime / a.duration) * 100);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        preload="none"
      />

      {/* ── Tabs ─────────────────────────────────────────────── */}
      <div className="scrollbar-none -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-center md:px-0">
        {tabs.map((t) => {
          const count = songs.filter((s) => s.tab === t).length;
          const active = t === activeTab;
          return (
            <button
              key={t}
              onClick={() => { setActiveTab(t); playClick(); }}
              aria-pressed={active}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all md:text-sm ${
                active
                  ? "border-nightrose/60 bg-nightrose/15 text-nightrose shadow-[0_0_20px_-6px] shadow-nightrose/50"
                  : "border-white/10 bg-white/[0.03] text-mooncream/60 hover:border-white/25 hover:text-mooncream"
              }`}
            >
              {t}
              <span className={`ml-1.5 tabular-nums ${active ? "text-nightrose/70" : "text-mooncream/30"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Track list ───────────────────────────────────────── */}
      <ol className="space-y-2.5 pb-28">
        {queue.map((s, i) => {
          const isCurrent = s.id === currentId;
          const isPlaying = isCurrent && playing;
          return (
            <li key={s.id}>
              <div
                className={`group/row relative flex items-center gap-3 overflow-hidden rounded-2xl border p-3 transition-all md:gap-4 md:p-4 ${
                  isCurrent
                    ? "border-nightrose/50 bg-white/[0.07] shadow-[0_8px_30px_-12px] shadow-nightrose/40"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                }`}
              >
                {/* soft glow accent on the active row */}
                {isCurrent && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-10 top-1/2 size-32 -translate-y-1/2 rounded-full bg-nightrose/20 blur-3xl"
                  />
                )}

                {/* track index / equalizer */}
                <span className="hidden w-5 shrink-0 justify-center text-xs tabular-nums text-mooncream/30 sm:flex">
                  {isPlaying ? <Equalizer animate /> : i + 1}
                </span>

                {/* artwork + play toggle */}
                <button
                  onClick={() => select(s.id)}
                  aria-label={`${isPlaying ? "Pause" : "Play"} ${s.title}`}
                  className="group relative size-12 shrink-0 overflow-hidden rounded-xl md:size-14"
                >
                  <GradientPhoto preset={s.preset} rounded="rounded-none" className="h-full w-full" />
                  <span
                    className={`absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-[2px] transition-opacity ${
                      isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="size-5 text-white" />
                    ) : (
                      <Play className="size-5 fill-white text-white" />
                    )}
                  </span>
                </button>

                {/* title / artist / reason */}
                <button onClick={() => select(s.id)} className="min-w-0 flex-1 text-left">
                  <p className={`truncate text-sm font-semibold ${isCurrent ? "text-nightrose" : "text-mooncream"}`}>
                    {s.title}
                  </p>
                  <p className="truncate text-xs text-mooncream/50">{s.artist}</p>
                  <p className="mt-0.5 hidden truncate text-xs italic text-mooncream/40 sm:block">{s.reason}</p>
                </button>

                <span className="hidden text-xs tabular-nums text-mooncream/40 sm:block">
                  {isCurrent && duration ? fmt(duration) : s.duration}
                </span>

                <button
                  onClick={() => toggleLike(s.id)}
                  aria-label={liked.has(s.id) ? `Unlike ${s.title}` : `Like ${s.title}`}
                  aria-pressed={liked.has(s.id)}
                  className="rounded-full p-2 text-mooncream/40 transition-all hover:scale-110 hover:text-nightrose"
                >
                  <Heart className={`size-4 ${liked.has(s.id) ? "fill-nightrose text-nightrose" : ""}`} />
                </button>
              </div>
            </li>
          );
        })}
      </ol>

      {/* ── Mini player bar ──────────────────────────────────── */}
      <div className="sticky bottom-4 z-20 -mt-24 rounded-2xl border border-white/15 bg-plumnight/85 p-3.5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {/* now-playing artwork */}
          <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
            <GradientPhoto preset={song?.preset ?? "sunset"} rounded="rounded-none" className="h-full w-full" />
            {playing && (
              <span className="absolute inset-0 grid place-items-center bg-black/35">
                <Equalizer animate />
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-nightrose">{song?.title}</p>
            <p className="truncate text-[11px] text-mooncream/55">{song?.artist}</p>
          </div>

          <button aria-label="Previous song" onClick={() => { step(-1); playClick(); }} className="rounded-full p-2 text-mooncream/70 transition-colors hover:text-nightrose">
            <SkipBack className="size-4" />
          </button>
          <button
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => { setPlaying((p) => !p); playClick(); }}
            className="grid size-10 place-items-center rounded-full bg-nightrose text-midnight shadow-lg shadow-nightrose/30 transition-transform hover:scale-105 active:scale-95"
          >
            {playing ? <Pause className="size-4.5" /> : <Play className="size-4.5 fill-current" />}
          </button>
          <button aria-label="Next song" onClick={() => { step(1); playClick(); }} className="rounded-full p-2 text-mooncream/70 transition-colors hover:text-nightrose">
            <SkipForward className="size-4" />
          </button>
          <Volume2 className="hidden size-4 text-mooncream/40 sm:block" />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="w-10 text-right text-[10px] tabular-nums text-mooncream/40">{fmt(time)}</span>
          <div
            className="group/seek h-1.5 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/10"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              seek(((e.clientX - rect.left) / rect.width) * 100);
            }}
            role="progressbar"
            aria-label="Seek"
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") seek(Math.min(progress + 5, 100));
              if (e.key === "ArrowLeft") seek(Math.max(progress - 5, 0));
            }}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-nightrose to-blush transition-[width] duration-150 group-hover/seek:brightness-110"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="w-10 text-[10px] tabular-nums text-mooncream/40">
            {duration ? fmt(duration) : song?.duration}
          </span>
        </div>
      </div>
    </div>
  );
}
