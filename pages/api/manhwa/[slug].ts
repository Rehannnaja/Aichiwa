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
    const mangaRaw = await fetchManhwaDetail(slug);
    const chaptersRaw = await fetchChapters(slug);
    const allGenres = await fetchGenres();

    const genreIds = mangaRaw.relationships
      .filter((rel: any) => rel.type === "tag")
      .map((tag: any) => tag.id);

    const genres = allGenres
      .filter((g) => genreIds.includes(g.id))
      .map((g) => g.name);

    const data = {
      id: mangaRaw.id,
      title: mangaRaw.attributes?.title?.en || "No title",
      description: mangaRaw.attributes?.description?.en || "No description",
      cover: getCoverUrl(mangaRaw),
      slug: mangaRaw.id,
      genres,
      chapters: chaptersRaw.map((ch: any) => ({
        id: ch.id,
        title: ch.title || `Chapter ${ch.chapter}`,
        chapter: ch.chapter || "0",
        date: "", // bisa isi: new Date(ch.attributes.publishAt).toISOString()
        language: ch.language || "en",
      })),
    };

    return res.status(200).json(data);
  } catch (err: any) {
    console.error("[API ERROR]", err.message || err);
    return res.status(500).json({ message: "Gagal mengambil detail manhwa." });
  }
}
