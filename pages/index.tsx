import Head from "next/head";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import GenreShelf from "@/components/GenreShelf";
import ManhwaGrid from "@/components/ManhwaGrid";

import { fetchPopularManhwa, getCoverUrl } from "@/lib/mangadex";

export default function Home({ topManhwa, trending }: any) {
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
              title={topManhwa.attributes.title?.en || "Manhwa Pilihan"}
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
            {trending.length === 0 ? (
              <p className="text-center text-gray-400">
                Tidak ada manhwa yang tersedia saat ini.
              </p>
            ) : (
              <ManhwaGrid
                data={trending.map((m: any) => ({
                  id: m.id,
                  title: m.attributes.title?.en || "Tanpa Judul",
                  description:
                    m.attributes.description?.en?.slice(0, 100) || "Deskripsi belum tersedia.",
                  cover: getCoverUrl(m),
                  slug: m.id,
                }))}
                withBookmark
                withContinue
                showDescription
              />
            )}
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

// ✅ Server-side fetch supaya aman dari blokir CORS atau browser
export async function getServerSideProps() {
  try {
    const result = await fetchPopularManhwa(13); // 1 hero + 12 trending
    const topManhwa = result[0] || null;
    const trending = result.slice(1);
    return {
      props: {
        topManhwa,
        trending,
      },
    };
  } catch (error) {
    console.error("Gagal load manhwa:", error);
    return {
      props: {
        topManhwa: null,
        trending: [],
      },
    };
  }
}
