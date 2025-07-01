import { useEffect, useState } from "react";

interface Genre {
  id: string;
  name: string;
  group: string;
}

interface Props {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  allGenres?: Genre[]; // ✅ dari server (opsional)
  disabled?: boolean;  // ✅ nonaktifkan filter (opsional)
}

const statuses = ["All", "Ongoing", "Completed", "Hiatus", "Cancelled"];

export default function FilterSidebar({
  selectedGenres,
  setSelectedGenres,
  selectedStatus,
  setSelectedStatus,
  allGenres,
  disabled = false,
}: Props) {
  const [genresList, setGenresList] = useState<Genre[]>([]);

  useEffect(() => {
    if (allGenres && allGenres.length > 0) {
      setGenresList(allGenres.filter((g) => g.group === "genre"));
    } else {
      // fallback fetch dari API lokal
      async function fetchGenres() {
        try {
          const res = await fetch("/api/genres");
          const json: Genre[] = await res.json();
          setGenresList(json.filter((g) => g.group === "genre"));
        } catch (error) {
          console.error("Failed to fetch genres:", error);
        }
      }

      fetchGenres();
    }
  }, [allGenres]);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <aside className="w-full md:w-64 p-4 bg-muted rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Filter</h2>

      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {genresList.map((genre) => (
            <button
              key={genre.id}
              onClick={() => toggleGenre(genre.name)}
              disabled={disabled}
              className={`px-2 py-1 text-xs rounded-full border transition ${
                selectedGenres.includes(genre.name)
                  ? "bg-primary text-white border-primary"
                  : "bg-background text-foreground border-muted"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <h3 className="text-sm font-medium mb-1">Status</h3>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          disabled={disabled}
          className="w-full text-sm bg-background border border-muted rounded px-2 py-1"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
