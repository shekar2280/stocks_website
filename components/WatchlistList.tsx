"use client";

import Link from "next/link";
import { Delete, Frown } from "lucide-react";
import { removeFromWatchlist } from "@/lib/actions/watchlist.actions";
import { useRouter } from "next/navigation";

interface WatchlistListProps {
  userId: string;
  symbols: { s: string; d: string }[];
  profiles: Record<string, any>;
}

export default function WatchlistList({
  userId,
  symbols,
  profiles = {},
}: WatchlistListProps) {
  const router = useRouter();
  const handleDelete = async (symbol: string) => {
    await removeFromWatchlist(userId, symbol);
    router.refresh();
  };

  if (symbols.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center bg-white/5 rounded-2xl border border-gray-700/30 shadow-inner">
        <div className="p-4 rounded-full bg-red-500/10 border border-red-500/30 mb-4">
          <Frown size={62} className="text-red-400" />
        </div>
        <p className="text-lg font-medium text-white/90 mb-1">
          Your watchlist is empty
        </p>
        <p className="text-sm text-gray-400">
          Add stocks to keep track of them easily!
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {symbols.map((stock) => {
        const profile = profiles[stock.s];

        return (
          <li key={stock.s}>
            <div className="flex items-center justify-between px-4 py-3 bg-black text-white rounded-xl border border-gray-300 hover:bg-yellow-400 hover:text-black transition-all duration-200 group">
              <Link
                href={`/stocks/${stock.s}`}
                className="flex-1 min-w-0 flex items-center gap-3"
              >
                {profile?.logo && (
                  <img
                    src={profile.logo}
                    alt={stock.d}
                    className="w-6 h-6 rounded-full border border-gray-300"
                  />
                )}

                <div>
                  <div className="font-medium text-white truncate group-hover:text-black">
                    {stock.d}
                  </div>
                  <div className="text-xs text-white truncate group-hover:text-black/80">
                    {stock.s}
                  </div>
                </div>
              </Link>

              <button
                type="button"
                className="ml-3 text-red-500 hover:text-red-700 transition"
                onClick={() => handleDelete(stock.s)}
              >
                <Delete size={18} />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
