import Image from "next/image";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";

interface ManhwaCardProps {
  id: string;
  title: string;
  cover: string;
  slug: string;
  rank?: number; // untuk halaman top (opsional)
}

export default function ManhwaCard({ id, title, cover, slug, rank }: ManhwaCardProps) {
  return (
    <div className="relative group bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <Link href={`/manhwa/${slug}`}>
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-2">
        <Link href={`/manhwa/${slug}`}>
          <h3 className="text-sm font-semibold text-white line-clamp-2 hover:underline">
            {title}
          </h3>
        </Link>
      </div>

      {/* ✅ Fixed: kirim prop satu-satu sesuai yang diminta BookmarkButton */}
      <div className="absolute top-2 right-2 z-10">
        <BookmarkButton
          mangaId={id}
          title={title}
          coverImage={cover}
        />
      </div>

      {rank !== undefined && (
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full z-10">
          #{rank}
        </div>
      )}
    </div>
  );
}
