import type { NextApiRequest, NextApiResponse } from "next";
import {
  fetchManhwaDetail,
  fetchChapters,
  getCoverUrl,
} from "@/lib/mangadex";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "Invalid slug" });
  }

  try {
    const manga = await fetchManhwaDetail(slug);
    const chaptersRaw = await fetchChapters(slug);

    const data = {
      id: manga.id,
      title: manga.attributes.title?.en || "No title",
      description: manga.attributes.description?.en || "No description",
      cover: getCoverUrl(manga),
      slug: manga.id,
      genres: manga.attributes.tags.map((tag: any) => tag.attributes.name.en),
      chapters: chaptersRaw,
    };

    res.status(200).json(data);
  } catch (err: any) {
    console.error("[API ERROR]", err.message || err);
    res.status(500).json({ error: "Gagal mengambil data manhwa" });
  }
}
