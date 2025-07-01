const API = "https://api.mangadex.org";
const CDN = "https://uploads.mangadex.org";

// ✅ Fetch populer (fix full rating)
export async function fetchPopularManhwa(limit = 12) {
  try {
    const res = await fetch(
      `${API}/manga?limit=${limit}&availableTranslatedLanguage[]=en&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic&includes[]=cover_art`
    );

    if (!res.ok) {
      console.error("Gagal fetch manhwa:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("Error fetchPopularManhwa:", error);
    return [];
  }
}

// ✅ Detail manhwa
export async function fetchManhwaDetail(id: string) {
  const res = await fetch(`${API}/manga/${id}?includes[]=cover_art`);
  const data = await res.json();
  return data.data;
}

// ✅ Chapter list
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

// ✅ Search
export async function searchManhwa(query: string) {
  const res = await fetch(
    `${API}/manga?title=${encodeURIComponent(
      query
    )}&availableTranslatedLanguage[]=en&includes[]=cover_art`
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

// ✅ Cover builder
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
    `${API}/manga?limit=30&availableTranslatedLanguage[]=en&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic${tagFilter}${statusQuery}&includes[]=cover_art`
  );
  const json = await res.json();

  return json.data.map((manga: any) => ({
    id: manga.id,
    title: manga.attributes.title?.en || "No title",
    description:
      manga.attributes.description?.en?.slice(0, 100) || "No description",
    coverImage: getCoverUrl(manga),
    slug: manga.id,
  }));
}

// ✅ Trending (daily/weekly/monthly)
export async function getTrendingDaily() {
  const data = await fetchPopularManhwa(12);
  return data.map((manga: any) => ({
    id: manga.id,
    title: manga.attributes.title?.en || "No title",
    description:
      manga.attributes.description?.en?.slice(0, 100) || "No description",
    coverImage: getCoverUrl(manga),
    slug: manga.id,
  }));
}

export async function getTrendingWeekly() {
  const data = await fetchPopularManhwa(12);
  return data.map((manga: any) => ({
    id: manga.id,
    title: manga.attributes.title?.en || "No title",
    description:
      manga.attributes.description?.en?.slice(0, 100) || "No description",
    coverImage: getCoverUrl(manga),
    slug: manga.id,
  }));
}

export async function getTrendingMonthly() {
  const data = await fetchPopularManhwa(12);
  return data.map((manga: any) => ({
    id: manga.id,
    title: manga.attributes.title?.en || "No title",
    description:
      manga.attributes.description?.en?.slice(0, 100) || "No description",
    coverImage: getCoverUrl(manga),
    slug: manga.id,
  }));
}
