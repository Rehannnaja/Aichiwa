import Head from "next/head";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import GenreShelf from "@/components/GenreShelf";
import ManhwaGrid from "@/components/ManhwaGrid";

import { fetchPopularManhwa, getCoverUrl } from "@/lib/mangadex";

export default function Home() {
  const [topManhwa, setTopManhwa] = useState<any | null>(null);
  const [trending, setTrending] = useState<any[]>([]);

  useEffect(() => {
    async function loadManhwa() {
      try {
        const result = await fetchPopularManhwa(13); // 1 untuk hero, 12 untuk grid
        if (result && result.length > 0) {
          setTopManhwa(result[0]);
          setTrending(result.slice(1));
        }
      } catch (err) {
        console.error("Failed to load manhwa:", err);
      }
    }

    loadManhwa();
  }, []);

  return (
    <>
      <Head>
        <title>Aichiwa – Baca Manhwa Gratis</title>
        <meta name="description" content="Website manhwa modern dan legal – Aichiwa" />
      </Head>

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="px-4 sm:px-6 lg:px-8 py-6 space-y-10">
          {topManhwa && (
            <HeroBanner
              title={topManhwa.attributes.title.en || "Manhwa Pilihan"}
              description={
                topManhwa.attributes.description?.en?.slice(0, 120) ||
                "Baca manhwa pilihan terbaik minggu ini secara gratis dan legal!"
              }
              cover={getCoverUrl(topManhwa)}
              slug={`/manhwa/${topManhwa.id}`}
            />
          )}

          <section>
            <h2 className="text-2xl font-bold mb-4">🔥 Trending Hari Ini</h2>
            <ManhwaGrid
              data={trending.map((m) => ({
                id: m.id,
                title: m.attributes.title.en,
                description: m.attributes.description?.en,
                cover: getCoverUrl(m),
                slug: m.id,
              }))}
              withBookmark
              withContinue
              showDescription
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">📚 Jelajahi Berdasarkan Genre</h2>
            <GenreShelf />
          </section>
        </main>
      </div>
    </>
  );
}
