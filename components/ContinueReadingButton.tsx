import { useEffect, useState } from "react";
import Link from "next/link";

interface ContinueReadingButtonProps {
  mangaId: string;
  title: string;
  coverImage: string;
  slug: string;
}

interface ProgressData {
  chapterId: string;
  chapter: string;
  title: string;
}

export default function ContinueReadingButton({
  mangaId,
  title,
  coverImage,
  slug,
}: ContinueReadingButtonProps) {
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = JSON.parse(localStorage.getItem("progress") || "{}");
    if (saved[mangaId]) {
      setProgress(saved[mangaId]);
    }
  }, [mangaId]);

  if (!progress) return null;

  return (
    <Link
      href={`/reader/${progress.chapterId}`}
      className="inline-block px-3 py-1.5 text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      👉 Lanjut: Chapter {progress.chapter}
    </Link>
  );
}
