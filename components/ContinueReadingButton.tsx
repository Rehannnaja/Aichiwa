import { useEffect, useState } from "react";
import Link from "next/link";

export default function ContinueReadingButton({ mangaId }: { mangaId: string }) {
  const [progress, setProgress] = useState<{
    chapterId: string;
    chapter: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("progress") || "{}");
    if (saved[mangaId]) {
      setProgress(saved[mangaId]);
    }
  }, [mangaId]);

  if (!progress) return null;

  return (
    <Link
      href={`/reader/${progress.chapterId}`}
      className="inline-block mt-4 px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 transition text-sm font-medium"
    >
      👉 Lanjutkan Membaca: Chapter {progress.chapter}
    </Link>
  );
}

