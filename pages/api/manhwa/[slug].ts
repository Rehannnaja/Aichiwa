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
    const rawManga = await fetchManhwaDetail(slug); // ini masih utuh
    const rawChapters = await fetchChapters(slug);
    const allGenres = await fetchGenres();

    // Ambil genre dari rawManga.relationships (bukan dari data yang sudah di-map)
    const genreIds = rawManga.relationships
      .filter((rel: any) => rel.type === "tag")
      .map((rel: any) => rel.id);

    const genres = allGenres
      .filter((genre) => genreIds.includes(genre.id))
      .map((genre) => genre.name);

    const data = {
      id: rawManga.id,
      title: rawManga.attributes?.title?.en || "No title",
      description: rawManga.attributes?.description?.en || "No description",
      cover: getCoverUrl(rawManga),
      slug: rawManga.id,
      genres,
      chapters: rawChapters.map((ch: any) => ({
        id: ch.id,
        title: ch.title || `Chapter ${ch.chapter}`,
        chapter: ch.chapter || "0",
        date: "", // bisa kamu isi tanggal publish kalau mau
        language: ch.language || "en",
      })),
    };

    return res.status(200).json(data);
  } catch (err: any) {
    console.error("[API ERROR]", err.message || err);
    return res.status(500).json({ message: "Gagal mengambil detail manhwa." });
  }
}
