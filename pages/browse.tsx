import Head from "next/head";
import Navbar from "@/components/Navbar";
import FilterSidebar from "@/components/FilterSidebar";
import ManhwaGrid from "@/components/ManhwaGrid";

export default function Browse() {
  return (
    <>
      <Head>
        <title>Browse Manhwa – Aichiwa</title>
        <meta name="description" content="Jelajahi semua manhwa berdasarkan genre, status, dan lainnya." />
      </Head>

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-6 gap-6">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-1/4">
            <FilterSidebar />
          </aside>

          {/* Manhwa Grid */}
          <section className="flex-1">
            <h1 className="text-2xl font-bold mb-4">📚 Semua Manhwa</h1>
            <ManhwaGrid title="Semua Manhwa" />
          </section>
        </main>
      </div>
    </>
  );
}

