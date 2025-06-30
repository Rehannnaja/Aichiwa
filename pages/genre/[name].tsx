import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import FilterSidebar from "@/components/FilterSidebar";
import { getMangaByFilter } from "@/lib/mangadex";

export default function GenreDetailPage() {
  const router = useRouter();
  const { name } = router.query;

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [mangaList, setMangaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    const genreName = decodeURIComponent(name as string);
    setSelectedGenres([capitalizeGenre(genreName)]);
  }, [name]);

  useEffect(() => {
    if (selectedGenres.length === 0) return;

    async function fetchData() {
      setLoading(true);
      const result = await getMangaByFilter({
        includedTags: selectedGenres,
        status: selectedStatus,
      });
      setMangaList(result);
      setLoading(false);
    }

    fetchData();
  }, [selectedGenres, selectedStatus]);

  return (
    <>
      <Head>
        <title>{name} Genre – Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 capitalize">{name} Manhwa</h1>

          <div className="flex flex-col md:flex-row gap-6">
            <FilterSidebar
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />

            <div className="flex-1">
              {loading ? (
                <p>Loading manhwa...</p>
              ) : mangaList.length === 0 ? (
                <p>No manhwa found for this genre and filter.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mangaList.map((manga) => (
                    <Link
                      key={manga.id}
                      href={`/manhwa/${manga.id}`}
                      className="bg-muted hover:bg-primary hover:text-white rounded overflow-hidden shadow transition"
                    >
                      <img
                        src={manga.coverImage}
                        alt={manga.title}
                        className="w-full h-60 object-cover"
                      />
                      <div className="p-2">
                        <h3 className="text-sm font-semibold truncate">{manga.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {manga.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function capitalizeGenre(str: string) {
  return str
    .split(" ")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}
