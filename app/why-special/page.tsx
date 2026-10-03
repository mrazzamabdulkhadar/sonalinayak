import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GradientPhoto from "@/components/ui/GradientPhoto";
import { FlowerDoodle, HeartDoodle } from "@/components/ui/Doodles";
import { whySpecial } from "@/data/story";

export const metadata: Metadata = { title: "Why She Is Special" };

export default function WhySpecialPage() {
  return (
    <>
      <PageHero
        title="Why She Is Special"
        hand="100 little things... okay, six honest ones"
        subtitle="A short list that could never really be short enough."
      />
      <section className="paper-texture py-16 md:py-24">
        <div className="container-page max-w-3xl space-y-6">
          {whySpecial.map((w, i) => (
            <article
              key={w.num}
              style={{ "--reveal-delay": `${(i % 2) * 100}ms` } as React.CSSProperties}
              className="reveal group grid items-center gap-6 rounded-3xl border border-blush/70 bg-white/80 p-6 shadow-[var(--shadow-polaroid)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] md:grid-cols-[auto_120px_1fr] md:p-8"
            >
              <p className="font-display text-5xl font-semibold text-blush transition-colors duration-500 group-hover:text-dusty md:text-6xl">
                {w.num}
              </p>
              <GradientPhoto
                src={[
                  "/images/memory/childhood/pic1.jpeg",
                  "/images/memory/childhood/pic18.jpeg",
                  "/images/memory/family/pic.jpeg",
                  "/images/memory/childhood/pic32.jpeg",
                  "/images/memory/childhood/pic12.jpeg",
                  "/images/memory/childhood/pic38.jpeg",
                ][i % 6]}
                alt={w.title}
                preset={["dawn", "bloom", "meadow", "sunset", "sea", "night"][i % 6]}
                sizes="160px"
                fit="cover"
                className="hidden aspect-square md:block"
              />
              <div>
                <h3 className="font-display text-2xl font-semibold text-burgundy">{w.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{w.text}</p>
                <p className="mt-2 rotate-[-2deg] font-hand text-xl text-rose">{w.hand}</p>
              </div>
            </article>
          ))}
          <div className="relative pt-6 text-center">
            <HeartDoodle className="mx-auto size-8 text-dusty" />
            <p className="mt-3 font-display text-xl italic text-burgundy">
              ...and about ninety-four more where those came from.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
