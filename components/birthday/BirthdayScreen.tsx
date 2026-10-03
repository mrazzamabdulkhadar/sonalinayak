"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Music, Pause, Play, Sparkles } from "lucide-react";
import { playClick } from "@/lib/sounds";

/** Autoplays whenever the birthday screen is open. */
const BACKGROUND_SONG = {
  title: "Happy Birthday to Someone Special",
  src: "/songs/birthday/bday-special.mp3",
};
/** The hand-picked "special" song. */
const SPECIAL_SONG = {
  title: "A Wonderful Birthday Song",
  artist: "Alicia Lefay",
  src: "/songs/birthday/bday-lyrics.mp3",
};
/** The fun one, played via the main play button. */
const FUN_SONG = {
  title: "Funny Birthday Song for Adults",
  src: "/songs/birthday/bday-adult.mp3",
};

const WISHES = [
  { title: "Sparkle More", text: "May your year be full of tiny, perfect moments — the kind you'll want to frame." },
  { title: "Dream Bigger", text: "Every dream you whisper at night deserves to come true. Go get every single one." },
  { title: "Stay You", text: "Kind, funny, stubborn, soft — never change the things that make you unmistakably you." },
];

/** Drifting hearts that fill the whole screen. */
function FloatingHearts({ count = 22 }: { count?: number }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    left: (i * 61.7) % 100,
    delay: (i % 6) * 3,
    duration: 16 + ((i * 7) % 12),
    size: 12 + ((i * 5) % 16),
    key: i,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <Heart
          key={h.key}
          className="absolute animate-drift fill-rose/35 text-rose/35"
          style={{
            left: `${h.left}%`,
            bottom: "-8vh",
            width: h.size,
            height: h.size,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Static heart clusters hugging the screen corners. */
function CornerHearts() {
  const clusters = [
    "top-2 left-2 rotate-[-12deg]",
    "top-2 right-2 rotate-[12deg] scale-x-[-1]",
    "bottom-2 left-2 rotate-[10deg]",
    "bottom-2 right-2 rotate-[-10deg] scale-x-[-1]",
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {clusters.map((pos, c) => (
        <div key={c} className={`absolute ${pos} flex flex-col items-center gap-1 opacity-70`}>
          {[10, 16, 8, 20, 12].map((s, i) => (
            <Heart
              key={i}
              className="fill-rose/40 text-rose/40 drop-shadow-[0_2px_6px_rgba(233,64,87,0.4)]"
              style={{ width: s + 6, height: s + 6, marginTop: i === 1 ? -6 : -2, marginLeft: (i % 2 ? 14 : -14) * ((i % 3) + 1) * 0.5 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function BirthdayScreen() {
  const [noteOpen, setNoteOpen] = useState(false);
  // which track is loaded: null = stopped, "background" | "special" | "fun"
  const [track, setTrack] = useState<"background" | "special" | "fun" | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fireBurst = useCallback(() => {
    const defaults = { scalar: 2, spread: 270, particleCount: 25, origin: { y: 0.4 }, startVelocity: 35 };

    // heart-shaped confetti (canvas-confetti draws the heart from a path)
    const heart = confetti.shapeFromPath({
      path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
    });
    confetti({ ...defaults, shapes: [heart], scalar: 1.4, colors: ["#f93963", "#a10864", "#ee0b93"] });
    confetti({ ...defaults, shapes: ["circle"], scalar: 1.5, colors: ["#ff9a00", "#ff7400", "#f3c9a5"] });
  }, []);

  // celebration cannons for 15 seconds + periodic heart bursts
  useEffect(() => {
    fireBurst();

    const duration = 15e3;
    const animationEnd = Date.now() + duration;
    const canonDefaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, canonDefaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, canonDefaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    const burstTimer = window.setInterval(fireBurst, 8000);
    return () => {
      clearInterval(interval);
      clearInterval(burstTimer);
    };
  }, [fireBurst]);

  // autoplay the special lyrics song on entry; leaving the page unmounts
  // this component, which pauses the audio automatically. If the browser
  // blocks autoplay, retry on the visitor's first interaction.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = BACKGROUND_SONG.src;
    const tryPlay = () => {
      audio.play().then(() => {
        setTrack("background");
        setPlaying(true);
      }).catch(() => {
        setTrack(null);
        setPlaying(false);
      });
    };
    tryPlay();
    window.addEventListener("pointerdown", tryPlay, { once: true });
    window.addEventListener("keydown", tryPlay, { once: true });
    return () => {
      window.removeEventListener("pointerdown", tryPlay);
      window.removeEventListener("keydown", tryPlay);
    };
  }, []);

  // play whichever track is selected
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!track) {
      audio.pause();
      setPlaying(false);
      return;
    }
    const src = track === "background" ? BACKGROUND_SONG.src : track === "special" ? SPECIAL_SONG.src : FUN_SONG.src;
    if (audio.src !== window.location.origin + src) {
      audio.src = src;
      audio.currentTime = 0;
    }
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [track]);

  const stopAll = () => {
    setTrack(null);
    playClick();
  };

  const startBackground = () => {
    setTrack("background");
    playClick();
  };

  const toggle = (t: "special" | "fun") => {
    setTrack((cur) => (cur === t && playing ? null : t));
    playClick();
  };

  const activeLabel =
    track === "background" ? BACKGROUND_SONG.title : track === "special" ? `${SPECIAL_SONG.title} · ${SPECIAL_SONG.artist}` : FUN_SONG.title;

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,#e0234e_0%,#a5164a_38%,#4d1039_72%,#171226_100%)]">
      <FloatingHearts />
      <CornerHearts />

      <audio ref={audioRef} onEnded={() => setTrack(null)} preload="auto" />

      <div className="container-page relative flex min-h-[100svh] flex-col items-center gap-10 pb-40 pt-10 md:pt-14">
        {/* ── Hero: cake + headline, cleanly stacked ───────────── */}
        <header className="relative flex flex-col items-center text-center">
          <div
            aria-hidden
            className="absolute top-[18%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ff2d55]/30 blur-3xl md:h-96 md:w-96"
          />
          <div className="relative h-64 w-64 mix-blend-screen sm:h-80 sm:w-80 md:h-[26rem] md:w-[26rem]">
            <Image src="/images/cake.gif" alt="Birthday cake with glowing candles" fill sizes="420px" className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)]" unoptimized priority />
          </div>

          <div className="-mt-10 md:-mt-16">
            <p className="font-hand text-2xl text-blush drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] md:text-3xl">
              a very special day for a very special girl
            </p>
            <h1 className="mx-auto mt-1 max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)] md:text-7xl">
              Happy Birthday
              <span className="mt-2 block font-light italic text-blush">my dear ♡</span>
            </h1>
            {/* decorative divider */}
            <div aria-hidden className="mx-auto mt-6 flex items-center justify-center gap-3 text-blush/70">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-blush/60" />
              <Heart className="size-3.5 fill-blush/80 text-blush/80" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-blush/60" />
            </div>
          </div>
        </header>

        {/* ── One unified glass panel: photo + wish ────────────── */}
        <section className="w-full max-w-4xl rounded-[2rem] border border-white/20 bg-white/[0.07] p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl md:p-8">
          <div className="grid items-start gap-6 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-10">
            {/* her photo, framed */}
            <div className="mx-auto w-full max-w-xs md:sticky md:top-8">
              <div className="relative rotate-[-2deg] rounded-3xl border border-white/50 bg-white/15 p-3 shadow-2xl transition-transform duration-500 hover:rotate-0">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image src="/images/now-pic.webp" alt="The birthday girl" fill sizes="320px" className="object-cover" priority />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#4d1039]/90 to-transparent p-4">
                    <p className="font-hand text-2xl text-white">the birthday girl ♡</p>
                  </div>
                </div>
                {/* little pinned heart badge */}
                <span className="absolute -right-2 -top-2 grid size-9 place-items-center rounded-full bg-white text-[#a5164a] shadow-lg">
                  <Heart className="size-4 fill-current" />
                </span>
              </div>
            </div>

            {/* tap-to-reveal wish note */}
            <div className="w-full">
              <button
                onClick={() => {
                  setNoteOpen((v) => !v);
                  playClick();
                }}
                aria-expanded={noteOpen}
                className="group flex w-full items-center justify-between rounded-2xl border border-white/40 bg-white/15 px-6 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-white"
              >
                <span className="flex items-center gap-3 font-display text-lg italic text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
                  <Sparkles className="size-5 text-yellow-200 transition-transform group-hover:rotate-12" />
                  A wish for you — tap to open
                </span>
                <ChevronDown className={`size-5 shrink-0 text-white transition-transform duration-300 ${noteOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {noteOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-3xl border border-white/40 bg-[#7e1440]/70 p-6 shadow-2xl md:p-7">
                      <p className="font-display text-xl italic text-white">Happy Birthday, sunshine ♡</p>
                      <p className="mt-3 text-sm leading-relaxed text-white/80">
                        Another year of you — and honestly, the world got luckier. Thank you for
                        every laugh that came too easy, every ordinary day you quietly made
                        beautiful, and every bit of light you hand out without keeping score.
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/80">
                        May this new year of your life be soft where you need softness, brave
                        where you need courage, and full of the kind of mornings that make you
                        smile before you even know why.
                      </p>
                      <p className="mt-4 font-hand text-xl text-blush">with all my love, always</p>
                    </div>

                    {/* little wishes */}
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {WISHES.map((w) => (
                        <div key={w.title} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                          <p className="text-sm font-semibold text-yellow-200">{w.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-white/75">{w.text}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <Link
          href="/"
          className="text-xs font-medium uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
        >
          ← back to her story
        </Link>
      </div>

      {/* ── Floating music dock ──────────────────────────────── */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-5">
        <div className="pointer-events-auto flex w-full max-w-xl flex-col gap-3 rounded-3xl border border-white/25 bg-[#4d1039]/70 p-3.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:flex-row sm:items-center">
          {/* now playing */}
          <div className="flex min-w-0 flex-1 items-center gap-3 px-1">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15">
              <Music className={`size-4 text-blush ${playing ? "animate-pulse" : ""}`} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {track ? activeLabel : "Nothing playing"}
              </p>
              <p className="text-[11px] text-white/55">
                {track ? (playing ? "now playing ♡" : "paused") : "pick a song below"}
              </p>
            </div>
          </div>

          {/* controls */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => toggle("fun")}
              aria-label="Play the funny birthday song"
              title="Fun song"
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all hover:-translate-y-0.5 ${
                track === "fun" && playing
                  ? "border-white bg-white/25 text-white"
                  : "border-white/35 text-white/90 hover:border-white hover:text-white"
              }`}
            >
              Fun
            </button>
            <button
              onClick={() => toggle("special")}
              aria-label="Play the wonderful birthday song"
              title="Special song"
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all hover:-translate-y-0.5 ${
                track === "special" && playing
                  ? "border-white bg-white/25 text-white"
                  : "border-white/35 text-white/90 hover:border-white hover:text-white"
              }`}
            >
              Special ♡
            </button>
            <button
              onClick={track === null ? startBackground : stopAll}
              aria-label={track === null ? "Play the birthday song" : "Stop the music"}
              className="grid size-12 place-items-center rounded-full bg-white text-[#a5164a] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform hover:scale-105 active:scale-95"
            >
              {track === null ? <Play className="size-5 fill-current" /> : <Pause className="size-5" />}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
