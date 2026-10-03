import Link from "next/link";
import Hero from "@/components/home/Hero";
import WhoIsShe from "@/components/home/WhoIsShe";
import Ending from "@/components/home/Ending";
import ChapterTimeline from "@/components/story/ChapterTimeline";
import MemoriesGrid from "@/components/gallery/MemoriesGrid";
import QuoteCarousel from "@/components/quotes/QuoteCarousel";
import SectionHeading from "@/components/ui/SectionHeading";
import GradientPhoto from "@/components/ui/GradientPhoto";
import { chapters, shayari } from "@/data/story";
import { memories } from "@/data/memories";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoIsShe />

      {/* Timeline preview */}
      <section className="bg-cream/60 py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="a journey of dreams, lessons and beautiful moments"
            title="The Chapters of Her Life"
            subtitle="Every year, a page. Every page, a piece of her."
          />
          <div className="mt-16">
            <ChapterTimeline items={chapters} />
          </div>
          <div className="mt-16 text-center">
            <Link
              href="/story"
              
              className="inline-flex items-center gap-2 rounded-full border border-burgundy/30 px-7 py-3 text-sm font-semibold text-burgundy transition-all hover:-translate-y-0.5 hover:bg-burgundy hover:text-white"
            >
              Read the Full Story →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured memories */}
      <section className="paper-texture py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="a gallery of smiles, adventures and beautiful chaos"
            title="Moments Worth Keeping Forever"
            subtitle="Some days are small. Some days become everything."
          />
          <div className="mt-14">
            <MemoriesGrid items={memories.slice(0, 12)} showFilters={false} />
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/memories"
              
              className="inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-burgundy"
            >
              Explore All Memories →
            </Link>
          </div>
        </div>
      </section>

      {/* Quote / shayari teaser */}
      <section className="night-texture relative overflow-hidden py-20 md:py-28">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 size-72 -translate-x-1/2 rounded-full bg-nightrose/15 blur-3xl"
        />
        <div className="container-page relative">
          <SectionHeading
            dark
            eyebrow="a collection of shayari, emotions and unspoken feelings"
            title="Words That Feel Like Her"
            subtitle="Some feelings are too big for ordinary sentences."
          />
          <div className="mt-14">
            <QuoteCarousel quotes={shayari} showFilters={false} />
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/shayari"
              
              className="inline-flex items-center gap-2 rounded-full border border-nightrose/50 px-7 py-3 text-sm font-semibold text-nightrose transition-all hover:-translate-y-0.5 hover:bg-nightrose hover:text-midnight"
            >
              Read All Shayari →
            </Link>
          </div>
        </div>
      </section>

      <Ending />
    </>
  );
}
