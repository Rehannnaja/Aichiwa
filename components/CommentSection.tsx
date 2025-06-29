import { useState, useEffect } from "react";

interface Props {
  mangaId: string;
}

const presetComments = [
  "🔥 Ceritanya makin seru!",
  "❤️ Aku suka art-nya.",
  "😂 Scene tadi ngakak banget.",
  "😢 Chapter ini bikin nangis.",
  "🤯 Plot twist-nya gila.",
];

export default function CommentSelect({ mangaId }: Props) {
  const [comments, setComments] = useState<string[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("comments") || "{}");
    if (saved[mangaId]) {
      setComments(saved[mangaId]);
    }
  }, [mangaId]);

  const addComment = (comment: string) => {
    const updated = [...comments, comment];
    setComments(updated);
    setSelected(comment);

    const saved = JSON.parse(localStorage.getItem("comments") || "{}");
    saved[mangaId] = updated;
    localStorage.setItem("comments", JSON.stringify(saved));
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">💬 Komentar</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {presetComments.map((c, i) => (
          <button
            key={i}
            onClick={() => addComment(c)}
            className="bg-muted hover:bg-primary hover:text-white text-sm px-3 py-1 rounded-full transition"
          >
            {c}
          </button>
        ))}
      </div>

      {comments.length > 0 && (
        <ul className="space-y-2 bg-muted p-4 rounded shadow">
          {comments.map((c, idx) => (
            <li key={idx} className="text-sm text-gray-800 dark:text-gray-200">
              {c}
            </li>
          ))}
        </ul>
      )}

      {comments.length === 0 && (
        <p className="text-gray-500 text-sm">Belum ada komentar. Pilih salah satu di atas!</p>
      )}
    </div>
  );
}

