import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { fetchManhwaDetail, fetchGenres, fetchChapters } from '@/lib/mangadex';
import { Manhwa, Genre } from '@/types';

interface Props {
  manhwa: Manhwa;
  genres: string[];
  chapters: { id: string; title: string }[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const [manhwa, allGenres] = await Promise.all([
      fetchManhwaDetail(slug),
      fetchGenres(),
    ]);

    const genreNames = allGenres
      .filter((genre) => manhwa.genres.includes(genre.id))
      .map((genre) => genre.name);

    const chapters = await fetchChapters(slug);

    return {
      props: {
        manhwa,
        genres: genreNames,
        chapters,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function ManhwaDetailPage({ manhwa, genres, chapters }: Props) {
  return (
    <>
      <Head>
        <title>{manhwa.title} | Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-gray-950 text-white p-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <img
            src={manhwa.cover}
            alt={manhwa.title}
            className="w-full h-auto object-cover rounded-xl shadow"
          />
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{manhwa.title}</h1>
            <p className="text-sm text-gray-400 mb-4">{genres.join(', ')}</p>
            <p className="text-gray-300">{manhwa.description}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-10">
          <h2 className="text-xl font-semibold mb-4">Chapters</h2>
          {chapters.length === 0 ? (
            <p className="text-gray-400">Tidak ada chapter tersedia.</p>
          ) : (
            <ul className="space-y-2">
              {chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  className="bg-gray-800 p-3 rounded hover:bg-gray-700 transition"
                >
                  <a href={`/read/${chapter.id}`}>{chapter.title}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
