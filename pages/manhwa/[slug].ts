import type { NextApiRequest, NextApiResponse } from "next";
import {
  fetchManhwaDetail,
  fetchChapters,
  fetchGenres,
  getCoverUrl,
} from "@/lib/mangadex";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ message: "Invalid slug." });
  }

  try {
    const manga = await fetchManhwaDetail(slug);
    const chapters = await fetchChapters(slug);
    const allGenres = await fetchGenres();

    const genreIds = manga.attributes.tags.map((tag: any) => tag.id);
    const genres = allGenres
      .filter((genre: any) => genreIds.includes(genre.id))
      .map((genre: any) => genre.name);

    const data = {
      id: manga.id,
      title: manga.attributes.title?.en || "No title",
      description: manga.attributes.description?.en || "No description",
      cover: getCoverUrl(manga),
      slug: manga.id,
      genres,
      chapters: chapters.map((ch: any) => ({
        id: ch.id,
        title: ch.title || `Chapter ${ch.chapter}`,
        chapter: ch.chapter || "0",
        date: "", // bisa ditambahkan `ch.attributes.publishAt` jika ingin
        language: ch.language || "en",
      })),
    };

    res.status(200).json(data);
  } catch (err: any) {
    console.error("[API ERROR]", err.message || err);
    res.status(500).json({ message: "Gagal mengambil detail manhwa." });
  }
}
