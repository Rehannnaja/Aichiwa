// pages/manhwa/[slug].tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { fetchManhwaDetail, fetchGenres } from '@/lib/mangadex';
import { Manhwa } from '@/types';

interface Props {
  manhwa: Manhwa | null;
}

export default function ManhwaDetailPage({ manhwa }: Props) {
  if (!manhwa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Manhwa tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{manhwa.title} | Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-gray-950 text-white p-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
          <img
            src={manhwa.cover}
            alt={manhwa.title}
            className="w-full md:w-64 rounded-lg shadow-lg"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{manhwa.title}</h1>
            <div className="flex flex-wrap gap-2">
              {manhwa.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-blue-700 text-sm rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-gray-300">{manhwa.description || 'Tidak ada deskripsi.'}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const manhwa = await fetchManhwaDetail(slug);
    const allGenres = await fetchGenres();

    // Jika manhwa null atau tidak ditemukan
    if (!manhwa) {
      return { props: { manhwa: null } };
    }

    // Validasi genre agar sesuai dengan daftar genre global
    const validatedGenres = allGenres
      .filter((genre) => manhwa.genres.includes(genre.name))
      .map((genre) => genre.name);

    return {
      props: {
        manhwa: {
          ...manhwa,
          genres: validatedGenres,
        },
      },
    };
  } catch (error) {
    console.error('[ERROR] Gagal load manhwa detail:', error);
    return {
      props: { manhwa: null },
    };
  }
};
