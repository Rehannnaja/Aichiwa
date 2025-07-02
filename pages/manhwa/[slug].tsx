import { GetServerSideProps } from "next";
import { fetchGenres } from "@/lib/mangadex";
import Head from "next/head";

type Props = {
  manga: {
    id: string;
    title: string;
    description: string;
    cover: string;
    slug: string;
    genres: string[];
  };
};

export default function ManhwaDetailPage({ manga }: Props) {
  return (
    <>
      <Head>
        <title>{manga.title} | Aichiwa</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <img src={manga.cover} alt={manga.title} className="w-full rounded-md mb-4" />
        <h1 className="text-3xl font-bold mb-2">{manga.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {manga.genres.map((genre) => (
            <span
              key={genre}
              className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
        <p className="text-gray-300">{manga.description}</p>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const res = await fetch(
      `https://api.mangadex.org/manga/${slug}?includes[]=cover_art&includes[]=tag`
    );
    const json = await res.json();
    const mangaRaw = json.data;

    // Ambil cover
    const coverArt = mangaRaw.relationships.find(
      (rel: any) => rel.type === "cover_art"
    );

    const cover = coverArt
      ? `https://uploads.mangadex.org/covers/${mangaRaw.id}/${coverArt.attributes.fileName}.512.jpg`
      : "";

    // Ambil semua genre dari API
    const allGenres = await fetchGenres();
    const genreIds = mangaRaw.relationships
      .filter((rel: any) => rel.type === "tag")
      .map((rel: any) => rel.id);

    const genres = allGenres
      .filter((genre) => genreIds.includes(genre.id))
      .map((genre) => genre.name);

    const manga = {
      id: mangaRaw.id,
      title: mangaRaw.attributes.title?.en || "No title",
      description: mangaRaw.attributes.description?.en || "No description",
      cover,
      slug: mangaRaw.id,
      genres,
    };

    return {
      props: {
        manga,
      },
    };
  } catch (error) {
    console.error("[DETAIL_ERROR]", error);
    return {
      notFound: true,
    };
  }
};
