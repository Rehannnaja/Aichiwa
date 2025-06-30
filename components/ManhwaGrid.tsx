import Image from "next/image";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import ContinueReadingButton from "./ContinueReadingButton";

export interface Manhwa {
  id: string;
  title: string;
  description?: string;
  cover: string;
  slug: string;
}

interface ManhwaGridProps {
  data: Manhwa[];
  showDescription?: boolean;
  withBookmark?: boolean;
  withContinue?: boolean;
}

export default function ManhwaGrid({
  data,
  showDescription = false,
  withBookmark = true,
  withContinue = false,
}: ManhwaGridProps) {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data.map((manhwa) => (
        <div
          key={manhwa.id}
          className="relative bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
        >
          <Link href={`/manhwa/${manhwa.slug}`}>
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={manhwa.cover}
                alt={manhwa.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Link>

          <div className="p-2 space-y-1">
            <Link
              href={`/manhwa/${manhwa.slug}`}
              className="font-semibold text-sm sm:text-base text-white line-clamp-2 hover:underline"
            >
              {manhwa.title}
            </Link>

            {showDescription && manhwa.description && (
              <p className="text-xs text-zinc-400 line-clamp-2">
                {manhwa.description}
              </p>
            )}
          </div>

          {(withBookmark || withContinue) && (
            <div className="absolute top-2 right-2 flex space-x-1 z-10">
              {withBookmark && <BookmarkButton manhwa={manhwa} />}
              {withContinue && <ContinueReadingButton manhwa={manhwa} />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

