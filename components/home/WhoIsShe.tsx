import {
  Bookmark, Cake, CalendarHeart, Heart, HeartHandshake, MapPin, Palette, UtensilsCrossed, Smile, Sparkles,
} from "lucide-react";
import GradientPhoto from "@/components/ui/GradientPhoto";
import { FlowerDoodle, HeartDoodle } from "@/components/ui/Doodles";
import { profile } from "@/data/story";

const INFO = [
  { icon: Smile, label: "Name", value: `${profile.name} (${profile.nickname})` },
  { icon: Cake, label: "Birthday", value: profile.birthday },
  { icon: MapPin, label: "Hometown", value: profile.hometown },
  { icon: Palette, label: "Favorite Color", value: profile.favoriteColor },
  { icon: UtensilsCrossed, label: "Favorite Food", value: profile.favoriteFood },
  { icon: Sparkles, label: "Hobbies", value: profile.hobbies },
  { icon: HeartHandshake, label: "Personality", value: profile.personality },
  { icon: Bookmark, label: "Little Habits", value: profile.littleHabits },
];

export default function WhoIsShe() {
  return (
    <section id="who-is-she" className="paper-texture relative overflow-hidden py-20 md:py-28">
      <FlowerDoodle className="pointer-events-none absolute -left-8 top-16 size-40 text-blush/50" />
      <HeartDoodle className="pointer-events-none absolute right-6 top-8 size-16 text-blush/70" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="reveal">
          <p className="font-hand text-2xl text-dusty">a beautiful soul, a kind heart,</p>
          <h2 className="mt-1 font-display text-4xl font-semibold text-burgundy md:text-5xl">
            Who is she?
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
            A beautiful soul with a kind heart, big dreams and a million little
            quirks.
          </p>

          <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {INFO.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-blush/35 text-rose">
                  <item.icon className="size-4" />
                </span>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink">{item.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal relative mx-auto w-full max-w-sm" style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
          <div className="polaroid rotate-2 transition-transform duration-500 hover:rotate-0">
            <GradientPhoto src="/images/sona-whoisshe.jpeg" alt="Her portrait" preset="meadow" sizes="600px" className="aspect-[4/5] w-full" />
          </div>
          <p className="absolute -bottom-4 right-2 rotate-[-4deg] font-hand text-2xl text-rose">
            she's not perfect, but perfectly her ♡
          </p>
          <HeartDoodle className="absolute -right-4 -top-5 size-10 text-dusty/70" />
        </div>
      </div>

      {/* things she loves */}
      <div className="container-page relative mt-16">
        <div className="reveal mx-auto max-w-2xl rounded-3xl border border-blush/70 bg-white/70 p-8 shadow-[var(--shadow-soft)] backdrop-blur md:p-10">
          <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-burgundy">
            <CalendarHeart className="size-5 text-dusty" /> Things She Loves
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {profile.thingsSheLoves.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm text-ink/85">
                <Heart className="size-3.5 shrink-0 fill-dusty text-dusty" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
