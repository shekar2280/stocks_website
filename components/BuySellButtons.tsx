"use client";

import Link from "next/link";

export default function BuySellButtons({ symbol, marketOpen }: { symbol: string; marketOpen: boolean }) {
  return (
    <div className="flex flex-row w-full gap-3 mt-5">
      <Link
        href={marketOpen ? `/stocks/orders?symbol=${symbol}&side=buy` : "#"}
        onClick={(e) => {
          if (!marketOpen) e.preventDefault();
        }}
        className={`green-btn w-full flex items-center justify-center text-white! ${
          !marketOpen ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        BUY
      </Link>

      <Link
        href={marketOpen ? `/stocks/orders?symbol=${symbol}&side=sell` : "#"}
        onClick={(e) => {
          if (!marketOpen) e.preventDefault();
        }}
        className={`red-btn w-full flex items-center justify-center text-white! ${
          !marketOpen ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        SELL
      </Link>
    </div>
  );
}
