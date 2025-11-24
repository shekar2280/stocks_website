"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

export default function OrderForm({
  symbol,
  side,
  profile,
  userEmail,
  price,
}: {
  symbol: string;
  side: string;
  profile: Record<string, any>;
  userEmail?: string;
  price?: number;
}) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [sellQty, setSellQty] = useState<number | null>(null);
  const [liveBalance, setLiveBalance] = useState(0);

  const PRICE = price || 0;

  useEffect(() => {
    const loadBalance = async () => {
      const res = await fetch("/api/get-balance", {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();
      setLiveBalance(data.balance ?? 0);
    };

    loadBalance();
  }, []);

  const userBalance = liveBalance;
  const total = useMemo(() => qty * PRICE, [qty, PRICE]);

  const insufficientBalance = useMemo(
    () => total > userBalance,
    [total, userBalance]
  );

  useEffect(() => {
    if (side !== "sell") return;

    const load = async () => {
      const res = await fetch(`/api/sell-quantity?symbol=${symbol}`);
      if (!res.ok) return;
      const data = await res.json();
      setSellQty(data?.qty ?? 0);
    };

    load();
  }, [side, symbol]);

  const handleOrder = async () => {
    if (insufficientBalance) return;

    await fetch("/api/generate-pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol,
        side,
        qty,
        price: PRICE,
        userEmail,
      }),
    });

    router.push(
      `/stocks/orders/payments?symbol=${symbol}&side=${side}&qty=${qty}&price=${PRICE}`
    );
  };

  return (
    <div className="w-full flex justify-center px-4 ">
      <section
        className={`rounded-2xl border p-6 sm:p-8 lg:p-10 space-y-6 w-full max-w-xl bg-gray-900  ${
          side === "buy"
            ? "shadow-lg shadow-green-500/50"
            : "shadow-lg shadow-red-500/50"
        }`}
      >
        <div className="flex flex-col space-y-5">
          <div className="flex flex-row justify-between items-center gap-4">
            <div>
              <label className="text-gray-300 text-lg whitespace-nowrap">
                Stock
              </label>
            </div>
            <div>
              <span className="flex items-center p-3 rounded-2xl bg-gray-800 grow min-w-0 gap-2">
                <img
                  src={profile.logo}
                  alt="logo"
                  className="w-6 h-6 rounded-full bg-white object-contain shrink-0"
                />

                <span className="flex-1 min-w-0 text-gray-200 truncate">
                  {profile.name}
                </span>

                <span className="text-gray-400 text-sm shrink-0 whitespace-nowrap pl-1">
                  ({symbol})
                </span>
              </span>
            </div>
          </div>

          {/* Quantity Available to sell */}
          {side === "sell" && (
            <div className="flex flex-row justify-between items-center gap-4">
              <span className="text-red-400 text-lg whitespace-nowrap">
                Available Quantity
              </span>
              <span className="text-red-400 pr-15">{sellQty}</span>
            </div>
          )}

          <div className="flex flex-row justify-between items-center gap-4">
            <label className="text-gray-300 text-lg whitespace-nowrap">
              {side === "sell" ? "Sell Quantity" : "Buy Quantity"}
            </label>

            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (side === "sell") {
                  setQty(Math.min(value, sellQty || 0));
                } else {
                  setQty(value);
                }
              }}
              className="w-full max-w-[100px] sm:max-w-[120px] bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200"
            />
          </div>
        </div>

        <hr className="border-gray-700" />

        <h2 className="text-xl font-semibold text-gray-200">Order Summary</h2>

        <div className="space-y-3 text-gray-300">
          <div className="flex justify-between">
            <span>Stock Price</span>
            <span>$ {PRICE.toFixed(2)}</span>
          </div>
          {side === "buy" && (
            <div className="flex justify-between">
              <span>Available Balance: </span>
              <span>$ {userBalance.toFixed(2)}</span>
            </div>
          )}
          <hr className="border-gray-700" />
          <div className="flex justify-between text-lg font-medium">
            <span>Total</span>
            <span>$ {total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleOrder}
            disabled={insufficientBalance}
            className={`w-full h-12 rounded-lg mt-6 ${
              insufficientBalance
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-gray-100 cursor-pointer`}
          >
            {insufficientBalance
              ? "Insufficient Balance"
              : side.toLowerCase() === "buy"
              ? "Place Buy Order"
              : "Place Sell Order"}
          </button>
        </div>
      </section>
    </div>
  );
}
