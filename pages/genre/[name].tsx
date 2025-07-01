import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";

import Navbar from "@/components/Navbar";
import FilterSidebar from "@/components/FilterSidebar";
import { getMangaByFilter, fetchGenres } from "@/lib/mangadex";

export default function GenreDetailPage({
  name,
  genreId,
  mangaList,
  allGenres,
}: {
  name: string;
  genreId: string;
  mangaList: any[];
  allGenres: { id: string; name: string }[];
}) {
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
              selectedGenres={[genreId]}
              setSelectedGenres={() => {}}
              selectedStatus={"All"}
              setSelectedStatus={() => {}}
              disabled
              allGenres={allGenres}
            />

            <div className="flex-1">
              {mangaList.length === 0 ? (
                <p>No manhwa found for this genre.</p>
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

// ✅ Server-side data fetch
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params as { name: string };
  const allGenres = await fetchGenres();
  const matched = allGenres.find(
    (g) => g.name.toLowerCase() === decodeURIComponent(name).toLowerCase()
  );

  if (!matched) {
    return { notFound: true };
  }

  const mangaList = await getMangaByFilter({
    includedTags: [matched.id],
    status: "All",
  });

  return {
    props: {
      name,
      genreId: matched.id,
      mangaList,
      allGenres,
    },
  };
};
