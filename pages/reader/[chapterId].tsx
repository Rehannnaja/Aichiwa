import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { getChapterImages } from "@/lib/mangadex";
import Image from "next/image";

export default function ReaderPage() {
  const router = useRouter();
  const { id } = router.query;

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchImages() {
      setLoading(true);
      const result = await getChapterImages(id as string);
      setImages(result);
      setLoading(false);
    }

    fetchImages();
  }, [id]);

  return (
    <>
      <Head>
        <title>Baca Chapter – Aichiwa</title>
      </Head>

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-3xl mx-auto">
          <h1 className="text-xl font-bold mb-4">📖 Membaca Chapter</h1>

          {loading ? (
            <p>Memuat gambar chapter...</p>
          ) : (
            <div className="space-y-4">
              {images.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Page ${i + 1}`}
                  width={800}
                  height={1200}
                  className="w-full rounded shadow-md"
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

