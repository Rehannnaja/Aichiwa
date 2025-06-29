import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { getMangaDetail } from "@/lib/mangadex";

export default function ManhwaDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [manga, setManga] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchManga() {
      setLoading(true);
      const result = await getMangaDetail(id as string);
      setManga(result);
      setLoading(false);
    }

    fetchManga();
  }, [id]);

  return (
    <>
      <Head>
        <title>{manga?.title || "Loading..."} – Aichiwa</title>
      </Head>

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <p>Memuat detail manhwa...</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster */}
              <div className="w-full md:w-1/3">
                {manga?.coverImage && (
                  <Image
                    src={manga.coverImage}
                    alt={manga.title}
                    width={500}
                    height={700}
                    className="rounded-xl object-cover"
                  />
                )}
              </div>

              {/* Detail */}
              <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-bold">{manga.title}</h1>
                <p className="text-muted-foreground">{manga.description}</p>

                {/* Genre */}
                <div className="flex flex-wrap gap-2">
                  {manga.genres?.map((g: string) => (
                    <span
                      key={g}
                      className="bg-muted px-3 py-1 text-sm rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <p className="text-sm">
                  <strong>Status:</strong> {manga.status}
                </p>

                <button className="mt-4 px-5 py-2 rounded-md bg-primary text-white hover:opacity-90 transition">
                  📌 Bookmark
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

