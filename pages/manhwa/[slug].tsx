import { GetServerSideProps } from 'next';
import { fetchManhwaDetail, fetchGenres } from '@/lib/mangadex';
import { Manhwa, Genre } from '@/types';
import Head from 'next/head';

interface Props {
  manhwa: Manhwa;
  genres: string[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const [manhwa, allGenres] = await Promise.all([
      fetchManhwaDetail(slug),
      fetchGenres(),
    ]);

    const validatedGenres = allGenres
      .filter((genre: Genre) => manhwa.genres.includes(genre.name))
      .map((genre: Genre) => genre.name);

    return {
      props: {
        manhwa,
        genres: validatedGenres,
      },
    };
  } catch (error) {
    console.error('Error loading manhwa:', error);
    return {
      notFound: true,
    };
  }
};

export default function ManhwaDetailPage({ manhwa, genres }: Props) {
  return (
    <>
      <Head>
        <title>{manhwa.title} | Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-gray-950 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
          <img
            src={manhwa.cover}
            alt={manhwa.title}
            className="w-full md:w-72 rounded-lg shadow-lg object-cover"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{manhwa.title}</h1>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="text-sm bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-gray-300 whitespace-pre-line">{manhwa.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
