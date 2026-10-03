import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GradientPhoto from "@/components/ui/GradientPhoto";
import { peopleGroups } from "@/data/story";

export const metadata: Metadata = { title: "People In Her Story" };

export default function PeoplePage() {
  return (
    <>
      <PageHero
        title="The People In Her Story"
        hand="the ones who make her world feel like home"
        subtitle="Every good story has a cast. Hers is full of keepers."
      />
      <section className="paper-texture py-16 md:py-24">
        <div className="container-page space-y-16">
          {peopleGroups.map((g, gi) => (
            <div key={g.group}>
              <h2 className="reveal font-display text-2xl font-semibold text-burgundy md:text-3xl">
                {g.group}
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {g.members.map((m, i) => (
                  <div
                    key={m.name}
                    style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                    className="reveal group overflow-hidden rounded-3xl border border-blush/70 bg-white shadow-[var(--shadow-polaroid)] transition-all duration-500 hover:-translate-y-1.5"
                  >
                    <GradientPhoto
                      src={m.src}
                      alt={m.name}
                      preset={m.preset}
                      rounded="rounded-none"
                      fit="cover"
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105 [&_img]:object-top"
                    />
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-burgundy">{m.name}</h3>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-dusty">
                        {m.relation}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{m.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              {gi < peopleGroups.length - 1 && (
                <div aria-hidden className="mt-14 h-px bg-gradient-to-r from-transparent via-blush to-transparent" />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
