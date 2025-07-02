import type { NextApiRequest, NextApiResponse } from "next";
import { fetchManhwaDetail, fetchChapters } from "@/lib/mangadex";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (typeof slug !== "string") {
    return res.status(400).json({ error: "Slug tidak valid." });
  }

  try {
    // Ambil detail dan chapter
    const detail = await fetchManhwaDetail(slug);
    const chapters = await fetchChapters(slug);

    // Format final untuk dikirim ke frontend
    res.status(200).json({
      id: detail.id,
      slug: detail.slug,
      title: detail.title,
      description: detail.description,
      cover: detail.cover,
      genres: detail.genres,
      chapters,
    });
  } catch (err: any) {
    console.error("[API ERROR]", err.message || err);
    res.status(500).json({ error: "Manhwa tidak ditemukan atau gagal diambil." });
  }
}
