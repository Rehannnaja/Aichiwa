import Link from "next/link";

interface Chapter {
  id: string;
  chapter: string;
  title?: string;
  volume?: string;
  language: string;
}

export default function ChapterList({ chapters }: { chapters: Chapter[] }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">📚 Chapter</h2>
      <ul className="space-y-3">
        {chapters.map((ch) => (
          <li key={ch.id}>
            <Link
              href={`/reader/${ch.id}`}
              className="block px-4 py-3 rounded-lg bg-muted hover:bg-primary hover:text-white transition shadow-sm"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  Chapter {ch.chapter || "?"}
                  {ch.title ? ` – ${ch.title}` : ""}
                </span>
                <span className="text-xs text-gray-500">{ch.language.toUpperCase()}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

