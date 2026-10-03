"use client";

import { useEffect, useRef, useState } from "react";
import type { Chapter } from "@/data/story";
import GradientPhoto from "@/components/ui/GradientPhoto";
import { FlowerDoodle } from "@/components/ui/Doodles";
import { playChime } from "@/lib/sounds";

/**
 * Vertical timeline. The line "draws" as the user scrolls
 * (height driven by scroll progress), chapter cards fade upward,
 * and a soft chime plays when the final chapter appears (once).
 */
export default function ChapterTimeline({ items }: { items: Chapter[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh * 0.4;
      const seen = Math.min(Math.max(vh * 0.7 - rect.top, 0), Math.max(total, 1));
      setProgress(Math.min(seen / Math.max(total, 1), 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const done = progress >= 0.999;

  return (
    <div ref={wrapRef} className="relative mx-auto max-w-3xl">
      {/* rail */}
      <div
        aria-hidden
        className="absolute left-5 top-0 h-full w-px bg-dusty/20 md:left-1/2"
      />
      <div
        aria-hidden
        className="absolute left-5 top-0 w-px origin-top bg-gradient-to-b from-dusty to-rose transition-[height] duration-300 md:left-1/2"
        style={{ height: `${progress * 100}%` }}
      />

      <ol className="space-y-14 md:space-y-24">
        {items.map((c, i) => {
          const left = i % 2 === 0;
          return (
            <li key={c.year} className="relative pl-14 md:pl-0">
              {/* node */}
              <span
                aria-hidden
                className={`absolute left-5 top-7 z-10 grid size-4 -translate-x-1/2 place-items-center rounded-full border-2 border-dusty bg-ivory transition-colors duration-500 md:left-1/2 ${
                  done || progress > (i + 0.5) / items.length ? "bg-rose" : ""
                }`}
              />
              <div
                className={`reveal flex flex-col gap-6 md:items-center md:gap-10 ${
                  left ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ "--reveal-delay": `${(i % 2) * 120}ms` } as React.CSSProperties}
              >
                <div className={`md:w-1/2 ${left ? "md:pr-12" : "md:pl-12"}`}>
                  <GradientPhoto
                    src={c.src}
                    alt={c.title}
                    preset={c.preset}
                    caption={c.year}
                    fit="cover"
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="aspect-[3/4] w-full transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
                <div
                  className={`md:w-1/2 ${
                    left ? "md:pl-4 md:text-left" : "md:pr-4 md:text-right"
                  }`}
                >
                  <p className="font-display text-4xl font-semibold text-blush md:text-5xl">
                    {c.year}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-burgundy md:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {c.text}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {done && (
        <div className="pointer-events-none absolute -bottom-10 left-5 flex -translate-x-1/2 items-center gap-2 md:left-1/2">
          <FlowerDoodle className="size-8 text-dusty" />
          <p className="font-hand text-xl text-rose">still writing...</p>
        </div>
      )}
      {/* chime when the line completes (subtle, once) */}
      <SoundOnDone done={done} />
    </div>
  );
}

function SoundOnDone({ done }: { done: boolean }) {
  const played = useRef(false);
  useEffect(() => {
    if (done && !played.current) {
      played.current = true;
      playChime();
    }
  }, [done]);
  return null;
}
