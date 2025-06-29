const ANILIST_API = "https://graphql.anilist.co";

export async function fetchAnilist(query: string, variables?: Record<string, any>) {
  const res = await fetch(ANILIST_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) throw new Error("Gagal fetch dari AniList");

  const json = await res.json();
  return json.data;
}

