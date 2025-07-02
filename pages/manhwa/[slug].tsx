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
  genreIds: string[];
};

type Props = {
  manga: MangaDetail;
  genres: Genre[];
};

export default function ManhwaDetail({ manga, genres }: Props) {
  return (
    <>
      <Head>
        <title>{manga.title} | Aichiwa</title>
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-8 text-white">
        <img src={manga.cover} alt={manga.title} className="w-full rounded" />
        <h1 className="text-3xl font-bold mt-4">{manga.title}</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {genres.map((g) => (
            <span
              key={g.id}
              className="bg-indigo-600 text-sm px-3 py-1 rounded-full"
            >
              {g.name}
            </span>
          ))}
        </div>
        <p className="mt-4 text-gray-300">{manga.description}</p>
      </main>
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
    const data = json.data;

    const title = data.attributes.title?.en || "No title";
    const description = data.attributes.description?.en || "No description";

    const coverRel = data.relationships.find(
      (rel: any) => rel.type === "cover_art"
    );
    const cover = coverRel
      ? `https://uploads.mangadex.org/covers/${data.id}/${coverRel.attributes.fileName}.512.jpg`
      : "";

    const genreIds = data.relationships
      .filter((rel: any) => rel.type === "tag")
      .map((rel: any) => rel.id);

    const allGenres = await fetchGenres();
    const genres = allGenres.filter((g) => genreIds.includes(g.id));

    return {
      props: {
        manga: {
          id: data.id,
          title,
          description,
          cover,
          slug: data.id,
          genreIds,
        },
        genres,
      },
    };
  } catch (error) {
    console.error("Error fetching manhwa detail:", error);
    return { notFound: true };
  }
};
