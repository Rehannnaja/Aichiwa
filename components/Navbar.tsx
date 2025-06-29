"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun, Eye, EyeOff, LogIn, LogOut, Settings, Bookmark } from "lucide-react";
import useDarkMode from "@/hooks/useDarkMode";
import useMatureMode from "@/hooks/useMatureMode";
import useUser from "@/hooks/useUser";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Genre", href: "/genre" },
  { name: "Bookmark", href: "/bookmark", icon: <Bookmark className="w-4 h-4" /> },
  { name: "Pengaturan", href: "/settings", icon: <Settings className="w-4 h-4" /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isDark, toggleDark } = useDarkMode();
  const { isMatureVisible, toggleMature } = useMatureMode();
  const { isLoggedIn, logout } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // biar gak hydration warning
  }, []);

  if (!mounted) return null;

  return (
    <nav className="w-full bg-zinc-950 border-b border-zinc-800 shadow-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white hover:text-indigo-400 transition">
          Aichiwa
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition hover:text-indigo-400 ${
                pathname === item.href ? "text-indigo-400" : "text-zinc-300"
              }`}
            >
              {item.icon ? (
                <span className="flex items-center gap-1">{item.icon} {item.name}</span>
              ) : (
                item.name
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Mature Toggle */}
          <button
            onClick={toggleMature}
            title="Konten 18+"
            className="p-2 rounded-lg hover:bg-zinc-800 transition"
          >
            {isMatureVisible ? (
              <Eye className="w-5 h-5 text-green-400" />
            ) : (
              <EyeOff className="w-5 h-5 text-red-400" />
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            title="Toggle Dark Mode"
            className="p-2 rounded-lg hover:bg-zinc-800 transition"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </button>

          {/* Login / Logout */}
          {isLoggedIn ? (
            <button
              onClick={logout}
              title="Keluar"
              className="p-2 rounded-lg hover:bg-zinc-800 transition"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          ) : (
            <Link href="/login" title="Masuk">
              <LogIn className="w-5 h-5 text-white hover:text-indigo-400 transition" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

