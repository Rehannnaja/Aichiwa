// KUNCI LOCALSTORAGE YANG DIPAKAI
const SETTINGS_KEYS = {
  dark: "theme",
  mature: "mature",
};

// DARK MODE
export function getDarkMode(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(SETTINGS_KEYS.dark);
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function setDarkMode(value: boolean) {
  const theme = value ? "dark" : "light";
  localStorage.setItem(SETTINGS_KEYS.dark, theme);
  const root = window.document.documentElement;
  root.classList.toggle("dark", value);
}

// MATURE MODE
export function getMatureMode(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SETTINGS_KEYS.mature) === "true";
}

export function setMatureMode(value: boolean) {
  localStorage.setItem(SETTINGS_KEYS.mature, value.toString());
}

