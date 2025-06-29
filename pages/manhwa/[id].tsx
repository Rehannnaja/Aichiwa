import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import ChapterList from "@/components/ChapterList";
import CommentSelect from "@/components/CommentSelect";
import DetailHeader from "@/components/DetailHeader";

import { getMangaDetail, getChaptersByMangaId } from "@/lib/mangadex";

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
          <DetailHeader
            mangaId={id as string}
            title={manga.title}
            status={manga.status}
            genres={manga.genres}
            description={manga.description}
            coverImage={manga.coverImage}
          />

          <ChapterList chapters={chapters} />
          <CommentSelect mangaId={id as string} />
        </main>
      </div>
    </>
  );
}
