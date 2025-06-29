import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { saveReadingProgress } from "@/lib/reading";

export default function ReaderPage() {
  const router = useRouter();
  const { id } = router.query; // chapterId

  const [chapter, setChapter] = useState<any>(null);
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchChapter() {
      const res = await fetch(`https://api.mangadex.org/at-home/server/${id}`);
      const server = await res.json();

      const chapterRes = await fetch(`https://api.mangadex.org/chapter/${id}`);
      const chapterData = await chapterRes.json();

      const hash = server.chapter.hash;
      const baseUrl = server.baseUrl;
      const images = chapterData.data.attributes.data;

      const imageUrls = images.map(
        (file: string) => `${baseUrl}/data/${hash}/${file}`
      );

      setChapter({
        mangaId: chapterData.data.relationships.find((r: any) => r.type === "manga")?.id,
        chapter: chapterData.data.attributes.chapter || "?",
        title: chapterData.data.attributes.title || "",
      });

      setPages(imageUrls);
      setLoading(false);
    }

    fetchChapter();
  }, [id]);

  useEffect(() => {
    if (chapter && chapter.mangaId && id) {
      saveReadingProgress(
        chapter.mangaId,
        id as string,
        chapter.chapter,
        chapter.title
      );
    }
  }, [chapter, id]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <>
      <Head>
        <title>Baca Chapter {chapter.chapter} – Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="px-4 py-6 max-w-4xl mx-auto">
          <h1 className="text-xl font-bold mb-4">
            Chapter {chapter.chapter} – {chapter.title}
          </h1>

          <div className="space-y-4">
            {pages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Page ${i + 1}`}
                className="w-full rounded shadow"
                loading="lazy"
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
