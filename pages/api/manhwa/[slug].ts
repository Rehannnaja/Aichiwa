import type { NextApiRequest, NextApiResponse } from "next";
import { fetchManhwaDetail, fetchChapters, getCoverUrl } from "@/lib/mangadex";
import { deslugify, slugify } from "@/lib/slug";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  if (typeof slug !== "string") return res.status(400).end();

  const title = deslugify(slug); // "solo_leveling" -> "solo leveling"
  const response = await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(title)}&limit=5`);
  const json = await response.json();

  if (!json.data.length) {
    return res.status(404).json({ error: "Manhwa tidak ditemukan." });
  }

  // Cari hasil yang slugify-nya sama persis
  const match = json.data.find((m: any) => slugify(m.attributes.title.en) === slug);
  const manga = match || json.data[0];

  const detail = await fetchManhwaDetail(manga.id);
  const chapters = await fetchChapters(manga.id);

  res.status(200).json({
    id: detail.id,
    slug,
    title: detail.attributes.title.en,
    description: detail.attributes.description.en,
    cover: getCoverUrl(detail),
    genres: detail.attributes.tags.map((t: any) => t.attributes.name.en),
    chapters: chapters.map((c: any) => ({
      id: c.id,
      chapter: c.attributes.chapter,
      title: c.attributes.title || `Chapter ${c.attributes.chapter}`,
      date: c.attributes.publishAt,
      language: c.attributes.translatedLanguage,
    }))
  });
}
