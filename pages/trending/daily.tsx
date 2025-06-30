import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TrendingTabs from "@/components/TrendingTabs";
import { getTrendingDaily } from "@/lib/mangadex";
import ManhwaGrid from "@/components/ManhwaGrid";

export default function TrendingDaily() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchDaily() {
      try {
        const result = await getTrendingDaily();
        if (mounted) {
          setData(result);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch daily trending:", error);
      }
    }

    fetchDaily();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Trending Harian – Aichiwa</title>
      </Head>

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">🔥 Trending Hari Ini</h1>
          <TrendingTabs />
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <ManhwaGrid title="Harian" data={data} />
          )}
        </main>
      </div>
    </>
  );
}
