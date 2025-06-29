import Link from "next/link";
import { Github, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-zinc-950 to-zinc-900 border-t border-zinc-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-10 md:flex-row md:justify-between">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Aichiwa</h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-sm">
            Sebuah platform modern dengan pengalaman terbaik. Didesain untuk pembaca yang ingin menikmati konten secara maksimal.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-2">
            <p className="text-white font-medium">Navigasi</p>
            <Link href="/" className="text-zinc-400 hover:text-white transition">Beranda</Link>
            <Link href="/genre" className="text-zinc-400 hover:text-white transition">Genre</Link>
            <Link href="/search" className="text-zinc-400 hover:text-white transition">Pencarian</Link>
          </div>

          <div className="space-y-2">
            <p className="text-white font-medium">Informasi</p>
            <Link href="/top-weekly" className="text-zinc-400 hover:text-white transition">Top Mingguan</Link>
            <Link href="/top-monthly" className="text-zinc-400 hover:text-white transition">Top Bulanan</Link>
            <Link href="/bookmark" className="text-zinc-400 hover:text-white transition">Bookmark</Link>
          </div>

          <div className="space-y-2">
            <p className="text-white font-medium">Kontak</p>
            <a href="mailto:support@example.com" className="text-zinc-400 hover:text-white transition">Email</a>
            <a href="https://instagram.com" className="text-zinc-400 hover:text-white transition">Instagram</a>
            <a href="https://github.com" className="text-zinc-400 hover:text-white transition">GitHub</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-800 py-6 px-6 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-xs">
        <span>© {new Date().getFullYear()} YourSite. All rights reserved.</span>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <Github className="w-4 h-4" />
          </a>
          <a href="mailto:support@example.com" className="hover:text-white transition">
            <Mail className="w-4 h-4" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

