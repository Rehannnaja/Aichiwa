import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ContinueReadingButton } from "@/components/ContinueReadingButton";
import ChapterList from "@/components/ChapterList";

interface ManhwaDetail {
  id: string;
  title: string;
  description: string;
  cover: string;
  slug: string;
  genres: string[];
  chapters: {
    id: string;
    title: string;
    number: number;
    date: string;
  }[];
}

export default function ManhwaDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [manhwa, setManhwa] = useState<ManhwaDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/manhwa/${slug}`);
        const data = await res.json();
        setManhwa(data);
      } catch (err) {
        console.error("Failed to fetch manhwa:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading || !manhwa) {
    return <div className="p-4 text-white">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div className="relative w-full md:w-1/3 aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={manhwa.cover}
            alt={manhwa.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{manhwa.title}</h1>

          <div className="flex gap-2 flex-wrap">
            {manhwa.genres.map((genre) => (
              <span
                key={genre}
                className="text-sm bg-blue-700/60 px-3 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="text-sm text-zinc-300 whitespace-pre-line">
            {manhwa.description}
          </p>

          <div className="flex gap-3 mt-2">
            <BookmarkButton manhwa={manhwa} />
            <ContinueReadingButton manhwa={manhwa} />
          </div>
        </div>
      </div>

      {/* Chapter list */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Chapters</h2>
        <ChapterList chapters={manhwa.chapters} />
      </div>
    </div>
  );
}
