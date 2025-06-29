import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

import Navbar from "@/components/Navbar";

interface GenreTag {
  id: string;
  name: string;
}

export default function GenreIndexPage() {
  const [genres, setGenres] = useState<GenreTag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch("https://api.mangadex.org/manga/tag");
      const json = await res.json();

      const filtered = json.data
        .filter((tag: any) => tag.attributes.group === "genre")
        .map((tag: any) => ({
          id: tag.id,
          name: tag.attributes.name.en,
        }));

      setGenres(filtered);
      setLoading(false);
    }

    fetchGenres();
  }, []);

  return (
    <>
      <Head>
        <title>Browse by Genre – Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Genres</h1>

          {loading ? (
            <p>Loading genres...</p>
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
