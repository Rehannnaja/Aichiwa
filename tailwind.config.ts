import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // untuk toggle dark mode manual pakai class "dark"
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#6366f1", // warna ungu indigo Aichiwa
        darkBg: "#0f0f0f",
        lightBg: "#ffffff",
      },
      boxShadow: {
        glow: "0 0 12px rgba(99,102,241,0.6)",
      },
      transitionProperty: {
        height: "height",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

