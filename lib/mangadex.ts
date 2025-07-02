const API = "https://api.mangadex.org";
const CDN = "https://uploads.mangadex.org";

// ✅ Cover builder
export function getCoverUrl(manga: any) {
  const coverArt = manga.relationships.find(
    (rel: any) => rel.type === "cover_art"
  );
  if (!coverArt) return "";
  return `${CDN}/covers/${manga.id}/${coverArt.attributes.fileName}.512.jpg`;
}

// ✅ Fetch populer (berdasarkan followers)
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

// ✅ Detail manhwa fix untuk [slug].tsx
export async function fetchManhwaDetail(id: string) {
  const res = await fetch(`${API}/manga/${id}?includes[]=cover_art&includes[]=tag`);
  if (!res.ok) throw new Error("Gagal fetch detail");

  const json = await res.json();
  const manga = json.data;

  const title = manga.attributes.title?.en || "No title";
  const description = manga.attributes.description?.en || "No description";
  const cover = getCoverUrl(manga);
  const genres = manga.relationships
    .filter((rel: any) => rel.type === "tag")
    .map((tag: any) => tag.attributes.name?.en || "Unknown");

  return {
    id: manga.id,
    title,
    description,
    cover,
    slug: manga.id,
    genres,
  };
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
    date: ch.attributes.publishAt,
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
  return await getTrendingDaily();
}

export async function getTrendingMonthly() {
  return await getTrendingDaily();
}
