import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import ManhwaGrid from "@/components/ManhwaGrid";
import { useEffect, useState } from "react";
import { getMangaByGenre } from "@/lib/mangadex";

export default function GenrePage() {
  const router = useRouter();
  const { name } = router.query;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    async function fetchGenreManga() {
      setLoading(true);
      const mangaList = await getMangaByGenre(name as string);
      setData(mangaList);
      setLoading(false);
    }

    fetchGenreManga();
  }, [name]);

  return (
    <>
      <Head>
        <title>Genre: {name} – Aichiwa</title>
        <meta name="description" content={`Manhwa genre ${name} terbaik dan terbaru`} />
      </Head>

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold mb-6 capitalize">
            Genre: {name?.toString().replace("-", " ")}
          </h1>

          {loading ? (
            <p>Memuat data genre {name}...</p>
          ) : (
            <ManhwaGrid title={`Manhwa Genre ${name}`} data={data} />
          )}
        </main>
      </div>
    </>
  );
}

