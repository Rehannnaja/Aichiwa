import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TrendingTabs from "@/components/TrendingTabs";
import { getTrendingMonthly } from "@/lib/mangadex";
import ManhwaGrid from "@/components/ManhwaGrid";

export default function TrendingMonthly() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchMonthly() {
      try {
        const result = await getTrendingMonthly();
        if (mounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        console.error("Gagal fetch trending bulanan:", err);
      }
    }

    fetchMonthly();

    return () => {
      mounted = false; // mencegah update state saat unmounted
    };
  }, []);

  return (
    <>
      <Head>
        <title>Trending Bulanan – Aichiwa</title>
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">🗓️ Trending Bulanan</h1>
          <TrendingTabs />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ManhwaGrid title="Bulanan" data={data} />
          )}
        </main>
      </div>
    </>
  );
}
