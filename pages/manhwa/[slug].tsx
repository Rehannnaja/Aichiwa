import { GetServerSideProps } from "next";
import Head from "next/head";
import { fetchGenres } from "@/lib/mangadex";

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

export default function ManhwaDetail({ manga }: Props) {
  return (
    <>
      <Head>
        <title>{manga.title} | Aichiwa</title>
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-8 text-white">
        <img src={manga.cover} alt={manga.title} className="w-full rounded" />
        <h1 className="text-3xl font-bold mt-4">{manga.title}</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {manga.genres.map((g) => (
            <span
              key={g}
              className="bg-indigo-600 text-sm px-3 py-1 rounded-full"
            >
              {g}
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

    const tagIds = data.relationships
      .filter((rel: any) => rel.type === "tag")
      .map((rel: any) => rel.id);

    const allGenres = await fetchGenres();

    const genres = allGenres
      .filter((genre) => tagIds.includes(genre.id))
      .map((genre) => genre.name);

    return {
      props: {
        manga: {
          id: data.id,
          title,
          description,
          cover,
          slug: data.id,
          genres,
        },
      },
    };
  } catch (err) {
    console.error("Error:", err);
    return { notFound: true };
  }
};
