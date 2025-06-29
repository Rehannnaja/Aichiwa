import type { NextApiRequest, NextApiResponse } from "next";
import { getGenres } from "@/lib/mangadex";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const genres = await getGenres();
  res.status(200).json(genres);
}
