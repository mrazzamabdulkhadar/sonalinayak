import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CompareSlider from "@/components/story/CompareSlider";
import SectionHeading from "@/components/ui/SectionHeading";
import { thenNowChips } from "@/data/story";

export const metadata: Metadata = { title: "Then & Now" };

export default function ThenAndNowPage() {
  return (
    <>
      <PageHero
        title="Then & Now"
        hand="the same girl, different chapters"
        subtitle="Drag the handle and watch the years slide past."
      />
      <section className="paper-texture py-16 md:py-24">
        <div className="container-page">
          <CompareSlider
            thenText="Little girl with big dreams."
            nowText="Still dreaming. Just a little bigger now."
            thenPreset="dawn"
            nowPreset="sunset"
            thenSrc="/images/memory/childhood/pic24.jpeg"
            nowSrc="/images/memory/childhood/pic.jpeg"
          />
          <div className="mt-16">
            <SectionHeading
              title="More Sides of Her"
              subtitle="Every then holds a now. Every now holds a next."
            />
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {thenNowChips.map((chip, i) => (
                <span
                  key={chip}
                  style={{ "--reveal-delay": `${i * 90}ms`, rotate: `${(i % 2 ? 1 : -1) * 1.2}deg` } as React.CSSProperties}
                  className="reveal rounded-full border border-blush bg-white px-5 py-2.5 text-sm font-medium text-burgundy shadow-sm transition-transform hover:-translate-y-1 hover:rotate-0"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
