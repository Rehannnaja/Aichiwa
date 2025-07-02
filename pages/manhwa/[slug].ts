import { GetServerSideProps } from 'next';
import { fetchManhwaDetail, fetchGenres } from '@/lib/mangadex';
import { Manhwa } from '@/types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const manhwa = await fetchManhwaDetail(slug);
    const allGenres = await fetchGenres();

    if (!manhwa) {
      return {
        notFound: true,
      };
    }

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
    console.error('Error in getServerSideProps:', error);
    return {
      notFound: true,
    };
  }
};

export default function Placeholder() {
  // Halaman ini tidak akan dipakai karena kita tidak render apapun di .ts.
  return null;
}
