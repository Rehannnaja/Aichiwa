import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Cek preferensi awal (localStorage / media query)
    const stored = localStorage.getItem("theme");
    if (stored) {
      setIsDark(stored === "dark");
      updateHtmlClass(stored === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      updateHtmlClass(prefersDark);
    }
  }, []);

  const toggleDark = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    const theme = newValue ? "dark" : "light";
    localStorage.setItem("theme", theme);
    updateHtmlClass(newValue);
  };

  const updateHtmlClass = (dark: boolean) => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return { isDark, toggleDark };
}

