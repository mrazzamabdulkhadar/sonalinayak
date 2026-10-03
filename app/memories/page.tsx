import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import MemoriesGrid from "@/components/gallery/MemoriesGrid";
import { memories } from "@/data/memories";

export const metadata: Metadata = { title: "Memories" };

export default function MemoriesPage() {
  return (
    <>
      <PageHero
        title="Moments Worth Keeping Forever"
        hand="a gallery of smiles, adventures and beautiful chaos"
        subtitle="Click any memory to open it. Use arrow keys to wander through them."
      />
      <section className="paper-texture py-16 md:py-24">
        <div className="container-page">
          <MemoriesGrid items={memories} />
        </div>
      </section>
    </>
  );
}
