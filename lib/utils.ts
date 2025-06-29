// Format: "2023-08-22T12:00:00Z" → "22 Aug 2023"
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Potong teks panjang → "Lorem ipsum dolor sit amet..." (max 100 karakter misalnya)
export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

// Capitalize huruf pertama: "manhwa keren" → "Manhwa keren"
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Konversi detik ke "mm:ss" → 90 detik → "01:30"
export function secondsToTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

// Format angka besar → 1000 → 1K, 1.5M
export function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

