import { useEffect, useState } from "react";

interface Props {
  mangaId: string;
  title: string;
  coverImage: string;
}

export default function BookmarkButton({ mangaId, title, coverImage }: Props) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const exists = bookmarks.some((item: any) => item.mangaId === mangaId);
    setBookmarked(exists);
  }, [mangaId]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    if (bookmarked) {
      const updated = bookmarks.filter((item: any) => item.mangaId !== mangaId);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      setBookmarked(false);
    } else {
      const newBookmark = { mangaId, title, coverImage };
      localStorage.setItem("bookmarks", JSON.stringify([...bookmarks, newBookmark]));
      setBookmarked(true);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`px-4 py-2 rounded font-medium transition ${
        bookmarked
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      {bookmarked ? "Hapus Bookmark" : "Bookmark"}
    </button>
  );
}

