import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientPhoto from "@/components/ui/GradientPhoto";
import { Award, Compass, Heart, Home, Briefcase, Plane } from "lucide-react";
import { StarField } from "@/components/ui/Doodles";

export const metadata: Metadata = { title: "Her Dreams" };

const ICONS: Record<string, typeof Plane> = {
  plane: Plane, briefcase: Briefcase, home: Home, heart: Heart, compass: Compass, award: Award,
};

export default function DreamsPage() {
  return (
    <>
      <PageHero
        title="Her Dreams"
        hand="big dreams, soft heart, endless possibilities"
        subtitle="Some are written in the stars. Some she's already chasing."
      />
      <section className="night-texture relative overflow-hidden py-16 md:py-24">
        <StarField count={36} />
        <div className="container-page relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              { icon: "plane", title: "Places To Visit", text: "Beyond Cuttack — the mountains, the sea, and cities full of colour." },
              { icon: "briefcase", title: "Career Dreams", text: "Turn her art, photography and creativity into a life she loves." },
              { icon: "home", title: "Future Dreams", text: "A cosy home in purple, black and silver, filled with joy and people." },
              { icon: "heart", title: "Relationship Dreams", text: "A love story worth telling — soft, honest, and hers." },
              { icon: "compass", title: "Experiences", text: "Dance under open skies, capture a thousand moments, taste every momo in sight." },
              { icon: "award", title: "Achievements", text: "Make her family proud and prove her stubborn heart right." },
            ] as const
          ).map((d, i) => {
            const Icon = ICONS[d.icon];
            return (
              <div
                key={d.title}
                style={{ "--reveal-delay": `${(i % 3) * 120}ms` } as React.CSSProperties}
                className="reveal group rounded-3xl border border-white/12 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-nightrose/50 hover:bg-white/[0.07]"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-nightrose/15 text-nightrose transition-all duration-500 group-hover:scale-110 group-hover:bg-nightrose group-hover:text-midnight">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-mooncream">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mooncream/55">{d.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
