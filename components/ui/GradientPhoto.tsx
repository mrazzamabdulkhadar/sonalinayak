import Image from "next/image";

/**
 * Photo slot: renders a real photograph when `src` is given, and falls
 * back to an atmospheric gradient artwork otherwise so the layout always
 * looks intentional.
 */
const PRESETS: Record<string, { bg: string }> = {
  sunset: {
    bg: "linear-gradient(180deg,#2a1f3d 0%,#5a3050 34%,#a95c68 62%,#e0988e 84%,#f5c9a8 100%)",
  },
  night: {
    bg: "linear-gradient(180deg,#14122a 0%,#282039 55%,#3d2c4e 80%,#5a3050 100%)",
  },
  dawn: {
    bg: "linear-gradient(180deg,#f2d5d2 0%,#e5b8b8 45%,#c98587 75%,#8a4a5c 100%)",
  },
  meadow: {
    bg: "linear-gradient(180deg,#f7d9e0 0%,#e8b4c8 40%,#a06a8c 80%,#5e3a5e 100%)",
  },
  sea: {
    bg: "linear-gradient(180deg,#1b1e3a 0%,#43356b 45%,#8a5a83 75%,#e0a58e 100%)",
  },
  bloom: {
    bg: "linear-gradient(180deg,#fff3e4 0%,#f2c4c4 50%,#c96f85 85%,#7a3a52 100%)",
  },
};

export default function GradientPhoto({
  src,
  alt = "",
  preset = "sunset",
  label,
  caption,
  className = "",
  rounded = "rounded-lg",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fit = "cover",
}: {
  src?: string;
  alt?: string;
  preset?: keyof typeof PRESETS;
  label?: string;
  caption?: string;
  className?: string;
  rounded?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  const p = PRESETS[preset] ?? PRESETS.sunset;
  return (
    <figure
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ background: p.bg }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || label || caption || "photo"}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
      ) : (
        <>
          {/* soft sun / moon glow */}
          <span
            aria-hidden
            className="absolute rounded-full bg-white/25 blur-2xl"
            style={{ width: "45%", aspectRatio: "1", left: "58%", top: "12%" }}
          />
          {/* silhouette hill */}
          <svg
            aria-hidden
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-[42%] w-full text-ink/45"
          >
            <path
              d="M0 40 L0 26 Q18 14 34 22 Q50 30 66 16 Q84 4 100 18 L100 40 Z"
              fill="currentColor"
            />
          </svg>
        </>
      )}
      {label && (
        <figcaption className="absolute left-3 top-3 rounded-full bg-black/25 px-3 py-1 text-[11px] font-medium tracking-wide text-white/90 backdrop-blur-sm">
          {label}
        </figcaption>
      )}
      {caption && (
        <span
          aria-hidden
          className="absolute bottom-2 left-1/2 -translate-x-1/2 font-hand text-lg text-white/85"
        >
          {caption}
        </span>
      )}
    </figure>
  );
}
