"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Ambil data dari API MangaDex langsung
async function getTags() {
  const res = await fetch("https://api.mangadex.org/manga/tag");
  const data = await res.json();
  return data.data;
}

interface Tag {
  id: string;
  attributes: {
    name: { en: string };
    group: string;
  };
}

export default function GenreShelf() {
  const [genres, setGenres] = useState<Tag[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      const allTags = await getTags();
      const genreTags = allTags.filter(
        (tag: Tag) => tag.attributes.group === "genre"
      );
      setGenres(genreTags);
    }
    fetchGenres();
  }, []);

  return (
    <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
      {genres.map((tag) => {
        const genre = tag.attributes.name.en;
        const urlSafeGenre = genre.toLowerCase().replace(/\s+/g, "-");

        return (
          <Link
            key={tag.id}
            href={`/genre/${urlSafeGenre}`}
            className="bg-muted px-4 py-2 rounded-full whitespace-nowrap text-sm hover:bg-primary hover:text-white transition"
          >
            {genre}
          </Link>
        );
      })}
    </div>
  );
}

