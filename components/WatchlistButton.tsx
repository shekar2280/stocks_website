"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
    addToWatchlist,
  getWatchlistSymbolsByUserId,
  removeFromWatchlist,
} from "@/lib/actions/watchlist.actions";

interface WatchlistButtonProps {
  userId: string;
  companyName: string;
  symbol: string;
}

export default function WatchlistButton({
  userId,
  companyName,
  symbol,
}: WatchlistButtonProps) {
  const [isInWatchlist, setIsInWatchlist] = useState<boolean | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchWatchlist = async () => {
      try {
        const res = await getWatchlistSymbolsByUserId(userId);
        const watchlistSet = new Set(res.map((i) => i.s));
        setIsInWatchlist(watchlistSet.has(symbol));
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
        setIsInWatchlist(false);
      }
    };

    fetchWatchlist();
  }, [userId, symbol]);

  const handleClick = async () => {
    if (!userId) {
      alert("Please log in to manage your watchlist.");
      return;
    }

    try {
      if (isInWatchlist) {
        await removeFromWatchlist(userId, symbol);
        setIsInWatchlist(false);
      } else {
        await addToWatchlist(userId, symbol, companyName);
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error("Watchlist update failed:", error);
    }
  };

  if (isInWatchlist === null) {
    return (
      <Button disabled className="yellow-btn w-full opacity-70">
        Loading...
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      className={`w-full ${
        isInWatchlist ? "bg-gray-500 hover:bg-gray-600" : "yellow-btn"
      }`}
    >
      {isInWatchlist ? "Added to Watchlist" : `Add ${symbol} to Watchlist`}
    </Button>
  );
}
