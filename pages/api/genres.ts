import type { NextApiRequest, NextApiResponse } from "next";
import { fetchGenres } from "@/lib/mangadex";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const genres = await fetchGenres();
    res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ error: "Failed to fetch genres" });
  }
}
