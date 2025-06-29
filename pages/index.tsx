import Head from "next/head";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import GenreShelf from "@/components/GenreShelf";
import ManhwaGrid from "@/components/ManhwaGrid";

export default function Home() {
  return (
    <>
      <Head>
        <title>Aichiwa – Baca Manhwa Gratis</title>
        <meta name="description" content="Website manhwa modern dan legal – Aichiwa" />
      </Head>

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="px-4 sm:px-6 lg:px-8 py-6 space-y-10">
          <HeroBanner />

          <section>
            <h2 className="text-2xl font-bold mb-4">🔥 Trending Hari Ini</h2>
            {/* ManhwaGrid nanti diisi data API */}
            <ManhwaGrid title="Trending Today" />
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

