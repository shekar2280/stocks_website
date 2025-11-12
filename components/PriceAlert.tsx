"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { inngest } from "@/lib/inngest/client";

async function fetchPrice(symbol: string): Promise<number | null> {
  const res = await fetch(`/api/price?symbol=${symbol}`);
  const data = await res.json();
  return data.price ?? null;
}

export default function PriceAlert({
  symbol,
  userId,
  userEmail,
  companyName,
}: {
  symbol: string;
  userId: string;
  companyName: string;
  userEmail: string;
}) {
  const [price, setPrice] = useState<number | null>(null);
  const [upperInput, setUpperInput] = useState<string>("");
  const [lowerInput, setLowerInput] = useState<string>("");
  const [upperTarget, setUpperTarget] = useState<number | null>(null);
  const [lowerTarget, setLowerTarget] = useState<number | null>(null);
  const [upperActive, setUpperActive] = useState(false);
  const [lowerActive, setLowerActive] = useState(false);

  const saveAlert = async (upper?: number | null, lower?: number | null) => {
    await fetch("/api/targets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        symbol,
        upperTarget: upper ?? null,
        lowerTarget: lower ?? null,
      }),
    });
  };

  const deleteAlert = async () => {
    await fetch(`/api/targets?userId=${userId}&symbol=${symbol}`, {
      method: "DELETE",
    });
  };

  const handleUpperAlert = async () => {
    if (!upperInput) return;
    const upper = parseFloat(upperInput);
    setUpperTarget(upper);
    setUpperActive(true);
    await saveAlert(upper, null);
  };

  const handleLowerAlert = async () => {
    if (!lowerInput) return;
    const lower = parseFloat(lowerInput);
    setLowerTarget(lower);
    setLowerActive(true);
    await saveAlert(null, lower);
  };

  useEffect(() => {
    const loadExistingAlert = async () => {
      const res = await fetch(`/api/targets?userId=${userId}&symbol=${symbol}`);
      if (!res.ok) return;
      const data = await res.json();
      if (!data) return;

      if (data.upperTarget) {
        setUpperTarget(data.upperTarget);
        setUpperInput(String(data.upperTarget));
        setUpperActive(true);
      }
      if (data.lowerTarget) {
        setLowerTarget(data.lowerTarget);
        setLowerInput(String(data.lowerTarget));
        setLowerActive(true);
      }
    };

    loadExistingAlert();
  }, [userId, symbol]);

  useEffect(() => {
    const update = async () => {
      const p = await fetchPrice(symbol);
      setPrice(p);

      if (p !== null) {
        if (upperActive && upperTarget && p >= upperTarget) {
          alert(`${symbol} hit upper limit ${upperTarget}`);

          await fetch("/api/alerts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tpye: "upper",
              userEmail,
              symbol,
              companyName,
              currentPrice: p,
              targetPrice: upperTarget,
              timestamp: new Date().toISOString(),
            }),
          });

          await deleteAlert();
          setUpperActive(false);
          setLowerActive(false);
          setUpperTarget(null);
          setLowerTarget(null);
          setUpperInput("");
          setLowerInput("");
        }
        if (lowerActive && lowerTarget && p <= lowerTarget) {
          alert(`${symbol} hit lower limit ${lowerTarget}`);

          await fetch("/api/alerts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type:"lower",
              userEmail,
              symbol,
              companyName,
              currentPrice: p,
              targetPrice: upperTarget,
              timestamp: new Date().toISOString(),
            }),
          });

          await deleteAlert();
          setLowerActive(false);
          setUpperActive(false);
          setLowerTarget(null);
          setUpperTarget(null);
          setLowerInput("");
          setUpperInput("");
        }
      }
    };

    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, [userEmail, symbol, upperTarget, lowerTarget, upperActive, lowerActive]);

  return (
    <div className="border border-gray-700 rounded-2xl p-4 shadow-md bg-[#0f0f0f] flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-yellow-400">
        Price Alerts via Email
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
        <Input
          className="w-full sm:w-1/2 p-3 sm:p-6 text-sm sm:text-base"
          type="number"
          value={upperInput}
          onChange={(e) => setUpperInput(e.target.value)}
          placeholder="Enter upper target"
        />
        <Button
          className={`w-full sm:w-[140] ${
            upperActive ? "black-btn" : "yellow-btn"
          }`}
          onClick={handleUpperAlert}
          disabled={upperActive}
        >
          {upperActive ? "Alert set" : "Set Upper Alert"}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
        <Input
          className="w-full sm:w-1/2 p-3 sm:p-6 text-sm sm:text-base"
          type="number"
          value={lowerInput}
          onChange={(e) => setLowerInput(e.target.value)}
          placeholder="Enter lower target"
        />
        <Button
          className={`w-full sm:w-[140] ${
            lowerActive ? "black-btn" : "yellow-btn"
          }`}
          onClick={handleLowerAlert}
          disabled={lowerActive}
        >
          {lowerActive ? "Alert set" : "Set Lower Alert"}
        </Button>
      </div>

      <div className="alert-price">Current Price: {price ?? "—"}</div>
    </div>
  );
}
