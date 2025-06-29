import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import RenderImageList from "@/components/RenderImageList";

export default function ReaderPage() {
  const router = useRouter();
  const { id } = router.query;

  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchChapter() {
      try {
        const res = await fetch(`https://api.mangadex.org/at-home/server/${id}`);
        const data = await res.json();

        const baseUrl = data.baseUrl;
        const hash = data.chapter.hash;
        const pages: string[] = data.chapter.data;

        const fullUrls = pages.map(
          (fileName: string) => `${baseUrl}/data/${hash}/${fileName}`
        );

        setImages(fullUrls);

        // Optional: Fetch chapter info (for title)
        const chapterRes = await fetch(`https://api.mangadex.org/chapter/${id}`);
        const chapterJson = await chapterRes.json();
        const chapTitle = chapterJson.data.attributes.title || `Chapter ${chapterJson.data.attributes.chapter}`;
        setTitle(chapTitle);
      } catch (err) {
        console.error("Failed to fetch chapter", err);
      } finally {
        setLoading(false);
      }
    }

    fetchChapter();
  }, [id]);

  return (
    <>
      <Head>
        <title>{title || "Reading..."} – Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-xl font-bold mb-6">{title}</h1>

          {loading ? (
            <p className="text-center">Loading chapter...</p>
          ) : (
            <RenderImageList images={images} />
          )}
        </main>
      </div>
    </>
  );
}
