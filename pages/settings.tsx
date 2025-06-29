import Head from "next/head";
import useMatureMode from "@/hooks/useMatureMode";
import { Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const { isMatureVisible, toggleMature } = useMatureMode();

  return (
    <>
      <Head>
        <title>Settings | Aichiwa</title>
      </Head>
      <main className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Pengaturan</h1>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Tampilkan Konten 18+</h2>
              <p className="text-zinc-400 text-sm">
                Konten dengan label <strong>Mature</strong> atau <strong>Hentai</strong> akan dimunculkan.
              </p>
            </div>
            <button
              onClick={toggleMature}
              className={`px-4 py-2 rounded-md text-white transition ${
                isMatureVisible ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"
              }`}
            >
              {isMatureVisible ? (
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Aktif
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <EyeOff className="w-4 h-4" />
                  Nonaktif
                </span>
              )}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

