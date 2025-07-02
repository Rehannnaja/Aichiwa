export interface Genre {
  id: string;
  name: string;
}

export interface Manhwa {
  id: string;
  title: string;
  description: string;
  cover: string;
  slug: string;
  genres: string[];
}
