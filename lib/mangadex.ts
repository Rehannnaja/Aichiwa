const API = "https://api.mangadex.org";
const CDN = "https://uploads.mangadex.org";

const MATURE_TAGS = ["Pornographic", "Hentai", "Mature"];

export async function fetchPopularManhwa(limit = 12, withMature = false) {
  const tagFilter = withMature ? "" : `&excludedTags[]=${MATURE_TAGS.join("&excludedTags[]=")}`;

  const res = await fetch(
    `${API}/manga?limit=${limit}&availableTranslatedLanguage[]=en&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive${tagFilter}`
  );
  const data = await res.json();
  return data.data;
}

export async function fetchManhwaDetail(id: string) {
  const res = await fetch(`${API}/manga/${id}?includes[]=cover_art`);
  const data = await res.json();
  return data.data;
}

export async function fetchChapters(mangaId: string, limit = 100) {
  const res = await fetch(
    `${API}/chapter?limit=${limit}&translatedLanguage[]=en&manga=${mangaId}&order[chapter]=desc`
  );
  const data = await res.json();
  return data.data.map((ch: any) => ({
    id: ch.id,
    title: ch.attributes.title,
    number: ch.attributes.chapter,
    date: ch.attributes.publishAt,
  }));
}

export async function fetchChapterImages(chapterId: string) {
  const res = await fetch(`${API}/at-home/server/${chapterId}`);
  const json = await res.json();
  const { baseUrl, chapter } = json;
  const { hash, data } = chapter;

  const imageUrls = data.map(
    (filename: string) => `${baseUrl}/data/${hash}/${filename}`
  );
  return imageUrls;
}

export async function searchManhwa(query: string, withMature = false) {
  const tagFilter = withMature ? "" : `&excludedTags[]=${MATURE_TAGS.join("&excludedTags[]=")}`;

  const res = await fetch(
    `${API}/manga?title=${encodeURIComponent(query)}&availableTranslatedLanguage[]=en${tagFilter}`
  );
  const data = await res.json();
  return data.data;
}

export async function fetchGenres() {
  const res = await fetch(`${API}/manga/tag`);
  const data = await res.json();

  return data.data.map((tag: any) => ({
    id: tag.id,
    name: tag.attributes.name.en,
    group: tag.attributes.group,
  }));
}

export function getCoverUrl(manga: any) {
  const coverArt = manga.relationships.find((rel: any) => rel.type === "cover_art");
  if (!coverArt) return "";
  return `${CDN}/covers/${manga.id}/${coverArt.attributes.fileName}.512.jpg`;
}

// ✅ Tambahan: Fungsi untuk filter genre & status
export async function getMangaByFilter({
  limit = 20,
  includedTags = [],
  status = "",
  withMature = false,
}: {
  limit?: number;
  includedTags?: string[];
  status?: string;
  withMature?: boolean;
}) {
  const tagFilter = includedTags.map(tag => `includedTags[]=${tag}`).join("&");
  const statusFilter = status ? `&status[]=${status}` : "";
  const matureFilter = withMature
    ? ""
    : `&excludedTags[]=${MATURE_TAGS.join("&excludedTags[]=")}`;

  const query = `${API}/manga?limit=${limit}&availableTranslatedLanguage[]=en&${tagFilter}${statusFilter}${matureFilter}&order[followedCount]=desc`;

  const res = await fetch(query);
  const data = await res.json();
  return data.data;
}
