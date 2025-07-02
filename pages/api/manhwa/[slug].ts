import type { NextApiRequest, NextApiResponse } from "next";
import { fetchGenres } from "@/lib/mangadex";

const API = "https://api.mangadex.org";

type Genre = {
  id: string;
  name: string;
  group: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Invalid slug" });
  }

  try {
    const response = await fetch(
      `${API}/manga/${slug}?includes[]=cover_art&includes[]=tag`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch manga with status ${response.status}`);
    }

    const json = await response.json();
    const rawManga = json.data;

    // Ambil semua genre dari MangaDex
    const allGenres: Genre[] = await fetchGenres();

    // Ambil ID genre dari relasi
    const genreIds = rawManga.relationships
      .filter((rel: any) => rel.type === "tag")
      .map((rel: any) => rel.id);

    const genres = allGenres
      .filter((genre: Genre) => genreIds.includes(genre.id))
      .map((genre: Genre) => genre.name);

    // Ambil cover
    const coverArt = rawManga.relationships.find(
      (rel: any) => rel.type === "cover_art"
    );

    const coverUrl = coverArt
      ? `https://uploads.mangadex.org/covers/${rawManga.id}/${coverArt.attributes.fileName}.512.jpg`
      : "";

    const data = {
      id: rawManga.id,
      title: rawManga.attributes.title?.en || "No title",
      description: rawManga.attributes.description?.en || "No description",
      cover: coverUrl,
      slug: rawManga.id,
      genres,
    };

    res.status(200).json(data);
  } catch (error: any) {
    console.error("[API ERROR]", error.message || error);
    res
      .status(500)
      .json({ error: "Gagal mengambil data manhwa dari MangaDex." });
  }
}
