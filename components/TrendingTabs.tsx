import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

const tabs = [
  { name: "🔥 Harian", href: "/trending/daily" },
  { name: "📅 Mingguan", href: "/trending/weekly" },
  { name: "🗓️ Bulanan", href: "/trending/monthly" },
];

export default function TrendingTabs() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {tabs.map((tab) => {
        const isActive = router.pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-primary text-white shadow"
                : "bg-muted hover:bg-primary hover:text-white"
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
