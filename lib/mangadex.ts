const API = "https://api.mangadex.org";
const CDN = "https://uploads.mangadex.org";

const MATURE_TAGS = ["Pornographic", "Hentai", "Mature"];

// ✅ Fetch populer
export async function fetchPopularManhwa(limit = 12, withMature = false) {
  const tagFilter = withMature
    ? ""
    : `&excludedTags[]=${MATURE_TAGS.join("&excludedTags[]=")}`;

  const res = await fetch(
    `${API}/manga?limit=${limit}&availableTranslatedLanguage[]=en&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive${tagFilter}&includes[]=cover_art`
  );
  const data = await res.json();
  return data.data;
}

// ✅ Detail manhwa
export async function fetchManhwaDetail(id: string) {
  const res = await fetch(`${API}/manga/${id}?includes[]=cover_art`);
  const data = await res.json();
  return data.data;
}

// ✅ Chapter list (sudah fix sesuai kebutuhan ChapterList.tsx)
export async function fetchChapters(mangaId: string, limit = 100) {
  const res = await fetch(
    `${API}/chapter?limit=${limit}&translatedLanguage[]=en&manga=${mangaId}&order[chapter]=desc`
  );
  const data = await res.json();

  return data.data.map((ch: any) => ({
    id: ch.id,
    chapter: ch.attributes.chapter,
    title: ch.attributes.title,
    language: ch.attributes.translatedLanguage,
  }));
}

// ✅ Gambar chapter
export async function fetchChapterImages(chapterId: string) {
  const res = await fetch(`${API}/at-home/server/${chapterId}`);
  const json = await res.json();

  const { baseUrl, chapter } = json;
  const { hash, data } = chapter;

  return data.map(
    (filename: string) => `${baseUrl}/data/${hash}/${filename}`
  );
}

// ✅ Search manhwa
export async function searchManhwa(query: string, withMature = false) {
  const tagFilter = withMature
    ? ""
    : `&excludedTags[]=${MATURE_TAGS.join("&excludedTags[]=")}`;

  const res = await fetch(
    `${API}/manga?title=${encodeURIComponent(
      query
    )}&availableTranslatedLanguage[]=en${tagFilter}&includes[]=cover_art`
  );
  const data = await res.json();
  return data.data;
}

// ✅ Genre list
export async function fetchGenres() {
  const res = await fetch(`${API}/manga/tag`);
  const data = await res.json();

  return data.data.map((tag: any) => ({
    id: tag.id,
    name: tag.attributes.name.en,
    group: tag.attributes.group,
  }));
}

// ✅ Cover URL builder
export function getCoverUrl(manga: any) {
  const coverArt = manga.relationships.find(
    (rel: any) => rel.type === "cover_art"
  );
  if (!coverArt) return "";
  return `${CDN}/covers/${manga.id}/${coverArt.attributes.fileName}.512.jpg`;
}

// ✅ Filter manhwa by genre & status
export async function getMangaByFilter({
  includedTags = [],
  status = "All",
}: {
  includedTags?: string[];
  status?: string;
}) {
  const tagFilter = includedTags
    .map((tag) => `&includedTags[]=${encodeURIComponent(tag)}`)
    .join("");

  const statusQuery =
    status !== "All" ? `&status[]=${status.toLowerCase()}` : "";

  const res = await fetch(
    `${API}/manga?limit=30&availableTranslatedLanguage[]=en&contentRating[]=safe&contentRating[]=suggestive${tagFilter}${statusQuery}&includes[]=cover_art`
  );
  const json = await res.json();

  return json.data.map((manga: any) => ({
    id: manga.id,
    title: manga.attributes.title.en || "No title",
    description:
      manga.attributes.description.en?.slice(0, 100) || "No description",
    coverImage: getCoverUrl(manga),
    slug: manga.id, // jika kamu pakai `/manhwa/[slug]`
  }));
                                     }
