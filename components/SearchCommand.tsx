"use client";

interface SearchCommandProps {
  renderAs?: "text" | "button";
  label?: string;
  initialStocks: StockWithWatchlistStatus[];
  userEmail?: string | null;
}

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Loader2, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { useDebounce } from "@/hooks/useDebounce";
import {
  addToWatchlist,
  getWatchlistSymbolsByEmail,
  removeFromWatchlist,
} from "@/lib/actions/watchlist.actions";
import { useRouter } from "next/navigation";

export default function SearchCommand({
  renderAs = "button",
  label = "Add stock",
  initialStocks,
  userEmail,
}: SearchCommandProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] =
    useState<StockWithWatchlistStatus[]>(initialStocks);

  const router = useRouter();

  useEffect(() => {
  if (!userEmail) return;

  const fetchWatchlist = async () => {
    try {
      const res = await getWatchlistSymbolsByEmail(userEmail);
      const watchlistSet = new Set(res.map((i) => i.s));

      setStocks(prev =>
        prev.map(stock => ({
          ...stock,
          isInWatchlist: watchlistSet.has(stock.symbol),
        }))
      );
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
    }
  };

  fetchWatchlist();
}, [userEmail]);

  const isSearchMode = !!searchTerm.trim();
  const uniqueStocks = Array.from(
    new Map(stocks.map((s) => [s.symbol, s])).values()
  );

  const displayStocks = isSearchMode ? uniqueStocks : uniqueStocks.slice(0, 10);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSearch = async () => {
    if (!isSearchMode) return setStocks(initialStocks);

    setLoading(true);
    try {
      const results = await searchStocks(searchTerm.trim());
      setStocks(results);
    } catch {
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm]);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm("");
    setStocks(initialStocks);
  };

  return (
    <>
      {renderAs === "text" ? (
        <span onClick={() => setOpen(true)} className="search-text">
          {label}
        </span>
      ) : (
        <Button onClick={() => setOpen(true)} className="search-btn">
          {label}
        </Button>
      )}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="search-dialog"
      >
        <div className="search-field">
          <CommandInput
            value={searchTerm}
            onValueChange={setSearchTerm}
            placeholder="Search stocks..."
            className="search-input"
          />
          {loading && <Loader2 className="search-loader" />}
        </div>
        <CommandList className="search-list">
          {loading ? (
            <CommandEmpty className="search-list-empty">
              Loading stocks...
            </CommandEmpty>
          ) : displayStocks?.length === 0 ? (
            <div className="search-list-indicator">
              {isSearchMode ? "No results found" : "No stocks available"}
            </div>
          ) : (
            <ul>
              <div className="search-count">
                {isSearchMode ? "Search results" : "Popular stocks"}
                {` `}({displayStocks?.length || 0})
              </div>
              {displayStocks?.map((stock, i) => (
                <li
                  key={`${stock.symbol}-${stock.name}-${i}`}
                  className="search-item"
                >
                  <Link
                    href={`/stocks/${stock.symbol}`}
                    onClick={handleSelectStock}
                    className="search-item-link"
                  >
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <div className="flex-1">
                      <div className="search-item-name">{stock.name}</div>
                      <div className="text-sm text-gray-500">
                        {stock.symbol} | {stock.exchange} | {stock.type}
                      </div>
                    </div>

                    {/* Add to watchlist */}
                    <Star
                      className={`h-5 w-5 cursor-pointer ${
                        stock.isInWatchlist
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-500"
                      }`}
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (!userEmail) {
                          alert("Please log in to save to your watchlist.");
                          return;
                        }

                        try {
                          if (stock.isInWatchlist) {
                            await removeFromWatchlist(userEmail, stock.symbol);
                          } else {
                            await addToWatchlist(
                              userEmail,
                              stock.symbol,
                              stock.name
                            );
                          }

                          setStocks((prev) =>
                            prev.map((s) =>
                              s.symbol === stock.symbol
                                ? { ...s, isInWatchlist: !s.isInWatchlist }
                                : s
                            )
                          );

                          router.refresh();
                        } catch (error) {
                          console.error("Failed to update watchlist:", error);
                        }
                      }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
