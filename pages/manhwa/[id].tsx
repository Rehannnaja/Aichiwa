import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import ChapterList from "@/components/ChapterList";
import CommentSelect from "@/components/CommentSelect";
import DetailHeader from "@/components/DetailHeader";

import {
  fetchManhwaDetail,
  fetchChapters,
  getCoverUrl,
} from "@/lib/mangadex";

export default function ManhwaDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [manga, setManga] = useState<any>(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const detail = await fetchManhwaDetail(id as string);
        const ch = await fetchChapters(id as string);

        setManga({
          id: detail.id,
          title: detail.attributes.title.en || "No title",
          description:
            detail.attributes.description.en?.slice(0, 300) || "No description",
          status: detail.attributes.status || "unknown",
          genres: detail.attributes.tags.map(
            (tag: any) => tag.attributes.name.en
          ),
          coverImage: getCoverUrl(detail),
          slug: detail.id, // ✅ Tambahkan slug agar tidak error di DetailHeader
        });

        setChapters(ch);
      } catch (err) {
        console.error("Failed to load manga:", err);
      } finally {
        setLoading(false);
      }
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
            mangaId={manga.id}
            title={manga.title}
            status={manga.status}
            genres={manga.genres}
            description={manga.description}
            coverImage={manga.coverImage}
            slug={manga.slug} // ✅ Perlu agar build tidak gagal
          />

          <ChapterList chapters={chapters} />
          <CommentSelect mangaId={manga.id} />
        </main>
      </div>
    </>
  );
}
