import Link from "next/link";
import Head from "next/head";

import Navbar from "@/components/Navbar";
import { fetchGenres } from "@/lib/mangadex";

interface GenreTag {
  id: string;
  name: string;
}

export default function GenreIndexPage({ genres }: { genres: GenreTag[] }) {
  return (
    <>
      <Head>
        <title>Browse by Genre – Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Genres</h1>

          {genres.length === 0 ? (
            <p className="text-gray-400">Genre tidak tersedia saat ini.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${encodeURIComponent(genre.name.toLowerCase())}`}
                  className="block bg-muted hover:bg-primary hover:text-white rounded px-4 py-3 text-center font-medium transition"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

// ✅ Static generation with fallback
export async function getStaticProps() {
  try {
    const allTags = await fetchGenres();

    // Filter hanya genre (bukan theme atau content warning)
    const genres = allTags.filter((tag: any) => tag.group === "genre");

    return {
      props: { genres },
      revalidate: 3600, // update tiap 1 jam
    };
  } catch (error) {
    console.error("Gagal fetch genres:", error);
    return {
      props: { genres: [] },
    };
  }
}
