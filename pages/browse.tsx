import Head from "next/head";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FilterSidebar from "@/components/FilterSidebar";
import ManhwaGrid from "@/components/ManhwaGrid";
import { fetchPopularManhwa } from "@/lib/mangadex";

export default function Browse() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [manhwaList, setManhwaList] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await fetchPopularManhwa(24);
      setManhwaList(data);
    }
    load();
  }, []);

  return (
    <>
      <Head>
        <title>Browse Manhwa – Aichiwa</title>
        <meta
          name="description"
          content="Jelajahi semua manhwa berdasarkan genre, status, dan lainnya."
        />
      </Head>

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-6 gap-6">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-1/4">
            <FilterSidebar
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </aside>

          {/* Manhwa Grid */}
          <section className="flex-1">
            <h1 className="text-2xl font-bold mb-4">📚 Semua Manhwa</h1>
            <ManhwaGrid data={manhwaList} />
          </section>
        </main>
      </div>
    </>
  );
}
