import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ManhwaGrid from "@/components/ManhwaGrid";

export default function LibraryPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(saved);
  }, []);

  return (
    <>
      <Head>
        <title>Bookmark Saya – Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">📚 Bookmark Saya</h1>

          {bookmarks.length === 0 ? (
            <p className="text-gray-500">Kamu belum menambahkan bookmark apa pun.</p>
          ) : (
            <ManhwaGrid title="Bookmark" data={bookmarks} />
          )}
        </main>
      </div>
    </>
  );
}
