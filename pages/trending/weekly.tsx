import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TrendingTabs from "@/components/TrendingTabs";
import { getTrendingWeekly } from "@/lib/mangadex";
import ManhwaGrid from "@/components/ManhwaGrid";

export default function TrendingWeekly() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchWeekly() {
      try {
        const result = await getTrendingWeekly();
        if (mounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        console.error("Gagal fetch trending mingguan:", err);
      }
    }

    fetchWeekly();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Trending Mingguan – Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">📅 Trending Mingguan</h1>
          <TrendingTabs />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ManhwaGrid title="Mingguan" data={data} />
          )}
        </main>
      </div>
    </>
  );
}
