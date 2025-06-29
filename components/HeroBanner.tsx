import Image from "next/image";
import Link from "next/link";

interface HeroBannerProps {
  title: string;
  description: string;
  cover: string;
  slug: string;
}

export default function HeroBanner({ title, description, cover, slug }: HeroBannerProps) {
  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
      {/* Background image */}
      <Image
        src={cover}
        alt={title}
        fill
        priority
        className="object-cover brightness-[0.4]"
        sizes="100vw"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-2xl">{title}</h1>
        <p className="text-sm md:text-base text-zinc-200 max-w-2xl line-clamp-4">
          {description}
        </p>
        <Link
          href={`/manhwa/${slug}`}
          className="mt-6 w-fit px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          Baca Sekarang
        </Link>
      </div>
    </div>
  );
}

