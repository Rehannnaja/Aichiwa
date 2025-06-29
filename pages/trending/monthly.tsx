import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getTrendingMonthly } from "@/lib/mangadex";
import ManhwaGrid from "@/components/ManhwaGrid";

export default function TrendingMonthly() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMonthly() {
      const result = await getTrendingMonthly();
      setData(result);
      setLoading(false);
    }
    fetchMonthly();
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
          {loading ? <p>Loading...</p> : <ManhwaGrid title="Trending Bulan Ini" data={data} />}
        </main>
      </div>
    </>
  );
}

