import { GetServerSideProps } from "next";
import Head from "next/head";
import { fetchGenres } from "@/lib/mangadex";

type Genre = {
  id: string;
  name: string;
};

type MangaDetail = {
  id: string;
  title: string;
  description: string;
  cover: string;
  slug: string;
  genres: string[];
};

type Props = {
  manga: MangaDetail;
};

export default function ManhwaDetailPage({ manga }: Props) {
  return (
    <>
      <Head>
        <title>{manga.title} | Aichiwa</title>
      </Head>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <img
          src={manga.cover}
          alt={manga.title}
          className="w-full rounded mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{manga.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {manga.genres.map((genre) => (
            <span
              key={genre}
              className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-full"
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
    // Fetch detail manga langsung dari API
    const res = await fetch(
      `https://api.mangadex.org/manga/${slug}?includes[]=cover_art&includes[]=tag`
    );
    const json = await res.json();
    const mangaRaw = json.data;

    // Ambil cover
    const coverRel = mangaRaw.relationships.find(
      (rel: any) => rel.type === "cover_art"
    );
    const cover = coverRel
      ? `https://uploads.mangadex.org/covers/${mangaRaw.id}/${coverRel.attributes.fileName}.512.jpg`
      : "";

    // Ambil genre ID dari relationships
    const genreIds = mangaRaw.relationships
      .filter((rel: any) => rel.type === "tag")
      .map((tag: any) => tag.id);

    // Ambil semua genre
    const allGenres = await fetchGenres();

    // Cocokkan ID
    const genres = allGenres
      .filter((genre: Genre) => genreIds.includes(genre.id))
      .map((genre: Genre) => genre.name);

    const manga: MangaDetail = {
      id: mangaRaw.id,
      title: mangaRaw.attributes.title?.en || "No title",
      description: mangaRaw.attributes.description?.en || "No description",
      cover,
      slug: mangaRaw.id,
      genres,
    };

    return { props: { manga } };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { notFound: true };
  }
};
