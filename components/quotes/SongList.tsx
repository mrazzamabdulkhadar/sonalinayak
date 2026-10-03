"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Heart,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
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

  // ── volume / mute ───────────────────────────────────────
  const [volume, setVolume] = useState(1); // 0-1
  const [muted, setMuted] = useState(false);
  const lastVolume = useRef(1); // remember level to restore after unmute

  // ── seek dragging ───────────────────────────────────────
  const [dragging, setDragging] = useState(false);
  const [dragPct, setDragPct] = useState(0);
  const seekRef = useRef<HTMLDivElement | null>(null);

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

  // keep the <audio> element in sync with volume / mute state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!queue.length) return;
      const i = queue.findIndex((s) => s.id === currentId);
      const next = (i + dir + queue.length) % queue.length;
      setCurrentId(queue[next].id);
      setPlaying(true);
    },
    [queue, currentId]
  );

  // when a track finishes naturally, roll on to the next one
  const onEnded = useCallback(() => {
    if (!queue.length) return;
    const i = queue.findIndex((s) => s.id === currentId);
    const next = (i + 1) % queue.length;
    setCurrentId(queue[next].id);
    setPlaying(true);
  }, [queue, currentId]);

  const select = (id: string) => {
    if (id === currentId) {
      // same track → just toggle; never restart from the top
      setPlaying((p) => !p);
    } else {
      // user switched tracks on purpose → start the new one
      setCurrentId(id);
      setPlaying(true);
    }
    playClick();
  };

  const seekToPct = (pct: number) => {
    const audio = audioRef.current;
    const clamped = Math.min(100, Math.max(0, pct));
    if (!audio || !Number.isFinite(audio.duration) || audio.duration === 0) return;
    audio.currentTime = (clamped / 100) * audio.duration;
    setProgress(clamped);
    setTime((clamped / 100) * audio.duration);
  };

  // translate a pointer x-position into a 0-100 percentage of the bar
  const pctFromClientX = useCallback((clientX: number) => {
    const bar = seekRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  // drag-to-seek: track the pointer while held, commit on release
  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => setDragPct(pctFromClientX(e.clientX));
    const up = (e: PointerEvent) => {
      seekToPct(pctFromClientX(e.clientX));
      setDragging(false);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging, pctFromClientX]);

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      if (next) {
        lastVolume.current = volume || 1;
      } else if (volume === 0) {
        setVolume(lastVolume.current || 1);
      }
      return next;
    });
    playClick();
  };

  const changeVolume = (v: number) => {
    const clamped = Math.min(1, Math.max(0, v));
    setVolume(clamped);
    setMuted(clamped === 0);
    if (clamped > 0) lastVolume.current = clamped;
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

  // what the seek bar should display: the live drag value while dragging
  const shownPct = dragging ? dragPct : progress;
  const shownTime = dragging && duration ? (dragPct / 100) * duration : time;

  return (
    <div className="mx-auto max-w-2xl">
      <audio
        ref={audioRef}
        onEnded={onEnded}
        onTimeUpdate={(e) => {
          if (dragging) return; // don't fight the user's drag
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
                  <GradientPhoto
                    src={s.cover}
                    alt={`${s.title} — ${s.artist}`}
                    preset={s.preset}
                    rounded="rounded-none"
                    className="h-full w-full"
                    sizes="56px"
                  />
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
            <GradientPhoto
              src={song?.cover}
              alt={song ? `${song.title} — ${song.artist}` : "Now playing"}
              preset={song?.preset ?? "sunset"}
              rounded="rounded-none"
              className="h-full w-full"
              sizes="44px"
            />
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

          {/* mute / unmute + volume slider */}
          <div className="group/vol hidden items-center gap-1.5 sm:flex">
            <button
              aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
              aria-pressed={muted || volume === 0}
              onClick={toggleMute}
              className="rounded-full p-2 text-mooncream/60 transition-colors hover:text-nightrose"
            >
              {muted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              aria-label="Volume"
              className="h-1 w-0 cursor-pointer appearance-none rounded-full bg-white/15 opacity-0 transition-all duration-200 accent-nightrose group-hover/vol:w-20 group-hover/vol:opacity-100 focus-visible:w-20 focus-visible:opacity-100"
            />
          </div>
          {/* compact mute toggle on small screens */}
          <button
            aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
            aria-pressed={muted || volume === 0}
            onClick={toggleMute}
            className="rounded-full p-2 text-mooncream/60 transition-colors hover:text-nightrose sm:hidden"
          >
            {muted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="w-10 text-right text-[10px] tabular-nums text-mooncream/40">{fmt(shownTime)}</span>
          <div
            ref={seekRef}
            className="group/seek relative h-4 flex-1 cursor-pointer touch-none select-none"
            onPointerDown={(e) => {
              e.preventDefault();
              const pct = pctFromClientX(e.clientX);
              setDragPct(pct);
              setDragging(true);
            }}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(shownPct)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") seekToPct(shownPct + 5);
              if (e.key === "ArrowLeft") seekToPct(shownPct - 5);
            }}
          >
            {/* track */}
            <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-nightrose to-blush group-hover/seek:brightness-110"
                style={{ width: `${shownPct}%` }}
              />
            </div>
            {/* draggable knob */}
            <span
              aria-hidden
              className={`absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mooncream shadow-md shadow-nightrose/40 transition-opacity ${
                dragging ? "opacity-100 scale-110" : "opacity-0 group-hover/seek:opacity-100"
              }`}
              style={{ left: `${shownPct}%` }}
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
