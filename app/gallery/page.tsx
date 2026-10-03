import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import MemoriesGrid from "@/components/gallery/MemoriesGrid";
import { memories } from "@/data/memories";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Her Photo Gallery"
        hand="every picture, a paused moment"
        subtitle="A wall of little forevers — sunsets, laughs, and everything in between."
      />
      <section className="paper-texture py-16 md:py-24">
        <div className="container-page">
          <MemoriesGrid items={memories} />
        </div>
      </section>
    </>
  );
}
