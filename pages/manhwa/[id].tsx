import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getMangaDetail, getChaptersByMangaId } from "@/lib/mangadex";
import ChapterList from "@/components/ChapterList";
import BookmarkButton from "@/components/BookmarkButton";
import CommentSelect from "@/components/CommentSelect";

export default function ManhwaDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [manga, setManga] = useState<any>(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const detail = await getMangaDetail(id as string);
      const ch = await getChaptersByMangaId(id as string);
      setManga(detail);
      setChapters(ch);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  if (loading || !manga) return <p className="p-4">Loading...</p>;

  return (
    <>
      <Head>
        <title>{manga.title} – Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="px-4 py-8 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={manga.coverImage}
              alt={manga.title}
              className="w-64 h-auto rounded shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{manga.title}</h1>
              <p className="text-sm text-gray-500 mb-2 capitalize">
                Status: {manga.status || "Unknown"}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {manga.genres.map((genre: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs bg-muted px-2 py-1 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {manga.description}
              </p>

              <BookmarkButton
                mangaId={id as string}
                title={manga.title}
                coverImage={manga.coverImage}
              />
            </div>
          </div>

          <ChapterList chapters={chapters} />
          <CommentSelect mangaId={id as string} />
        </main>
      </div>
    </>
  );
}
