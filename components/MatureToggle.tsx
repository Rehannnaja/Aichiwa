"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function MatureToggle() {
  const [showMature, setShowMature] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("showMature");
    if (saved === "true") setShowMature(true);
  }, []);

  const toggle = () => {
    const newValue = !showMature;
    setShowMature(newValue);
    localStorage.setItem("showMature", newValue.toString());
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition"
    >
      {showMature ? (
        <>
          <Eye className="w-4 h-4" />
          <span>Tampilkan Mature: Aktif</span>
        </>
      ) : (
        <>
          <EyeOff className="w-4 h-4" />
          <span>Tampilkan Mature: Nonaktif</span>
        </>
      )}
    </button>
  );
}

