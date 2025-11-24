"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface PaymentFormProps {
  symbol: string;
  side: string;
  qty: number;
  price: number;
  profile: {
    logo?: string;
    name?: string;
  } | null;
  userEmail: string;
}

export default function PaymentsForm({
  symbol,
  side,
  qty,
  price,
  profile,
  userEmail,
}: PaymentFormProps) {

  if (Number.isNaN(qty) || Number.isNaN(price)) {
    return <div>Invalid payment data</div>;
  }

  const total = useMemo(() => qty * price, [qty, price]);

  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "result">("idle");
  const [result, setResult] = useState<"success" | "fail" | null>(null);

  const [pin, setPin] = useState("");

  const handlePayment = async () => {
    setStatus("loading");

    const pinRes = await fetch("/api/verify-pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol, side, pin, userEmail }),
    });

    const pinData = await pinRes.json();

    if (!pinData.success) {
      setResult("fail");
      setStatus("result");
      return;
    }

    const posRes = await fetch("/api/positions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol,
        side,
        qty,
        price,
      }),
    });
    if (!posRes.ok) {
      setResult("fail");
      setStatus("result");
      return;
    }

    setResult("success");
    setStatus("result");

    setTimeout(() => {
      router.push(`/stocks/${symbol}`);
    }, 8000);
  };

  if (status === "loading") {
    return (
      <div className="w-full flex justify-center py-32 text-gray-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (status === "result") {
    return (
      <div className="w-full flex flex-col items-center py-32 space-y-6">
        {result === "success" && (
          <div className="flex flex-col items-center space-y-3">
            <CheckCircle className="w-20 h-20 text-green-400" />
            <div className="text-green-400 text-3xl font-bold">
              Transaction Successful
            </div>
          </div>
        )}

        {result === "fail" && (
          <div className="flex flex-col items-center space-y-3">
            <XCircle className="w-20 h-20 text-red-400" />
            <div className="text-red-400 text-3xl font-bold">
              Transaction Failed
            </div>
          </div>
        )}

        <p className="text-gray-400 text-sm">Redirecting…</p>
      </div>
    );
  }

  if (!profile) return <p className="mt-10">Invalid stock symbol.</p>;

  return (
    <div className="w-full flex justify-center px-4">
      <section
        className={`rounded-2xl border p-6 sm:p-8 lg:p-10 space-y-2 w-full max-w-2xl bg-gray-900 ${
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

          <div className="flex flex-row justify-between items-center gap-4">
            <span className="text-gray-200 text-lg whitespace-nowrap">
              Quantity
            </span>
            <span className="text-gray-200">{qty}</span>
          </div>

          <div className="flex flex-row justify-between items-center gap-4">
            <span className="text-gray-200 text-lg whitespace-nowrap">
              Total
            </span>
            <span className="text-gray-200">$ {total.toFixed(2)}</span>
          </div>
        </div>

        <hr className="border-gray-700" />

        <div className="space-y-3 mt-6 flex flex-row justify-between items-center">
          <label className="text-gray-300 text-lg">Enter PIN</label>

          <div className="flex flex-col">
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full max-w-[120px] sm:max-w[200px] bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 tracking-widest text-center"
            />
            <p className="text-white text-[10px] text-right mt-1">
              *PIN is sent to your email
            </p>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={pin.length !== 6}
          className={`w-full h-12 rounded-lg mt-6 ${
            pin.length !== 6
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-gray-100 cursor-pointer`}
        >
          Confirm Order
        </button>
      </section>
    </div>
  );
}
