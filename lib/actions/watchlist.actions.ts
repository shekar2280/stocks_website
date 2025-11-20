"use server";

import { Stock } from "@/database/models/stock.models";
import { Watchlist } from "@/database/models/watchlist.models";
import { connectToDB } from "@/database/mongoose";

function normalizeWatchlistItemToTradingView(item: {
  symbol?: string;
  company?: string;
}) {
  const symbol = String(item.symbol || "").trim();
  const company = (item.company || "").trim();

  const display =
    company || (symbol.includes(":") ? symbol.split(":")[1] : symbol);
  return { s: symbol, d: display || symbol };
}

export async function getWatchlistSymbolsByEmail(
  email: string
): Promise<Array<{ s: string; d: string }>> {
  if (!email) return [];

  try {
    const mongoose = await connectToDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not found");

    const user = await db
      .collection("user")
      .findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || "");
    if (!userId) return [];

    const items = (await Watchlist.find({ userId })
      .populate("stockId", "symbol company")
      .lean()) as unknown as Array<{
      stockId: { symbol: string; company: string };
    }>;

    return items.map((i) =>
      normalizeWatchlistItemToTradingView({
        symbol: i.stockId.symbol,
        company: i.stockId.company,
      })
    );
  } catch (err) {
    console.error("getWatchlistSymbolsByEmail error:", err);
    return [];
  }
}

export async function addToWatchlist(
  email: string,
  symbol: string,
  company: string
) {
  if (!email || !symbol) throw new Error("Missing email or symbol");
  const mongoose = await connectToDB();
  const db = mongoose.connection.db;

  if (!db) throw new Error("MongoDB connection not found");

  const user = await db.collection("user").findOne({ email });

  if (!user) throw new Error("User not found");
  const userId = user.id || String(user._id || "");

  const stock = await Stock.findOneAndUpdate(
    { symbol },
    { symbol, company, exchange: "UNKNOWN" }, 
    { upsert: true, new: true }
  );

   await Watchlist.findOneAndUpdate(
    { userId, stockId: stock._id },
    { userId, stockId: stock._id, addedAt: new Date() },
    { upsert: true, new: true }
  );

  return { success: true };
}

export async function removeFromWatchlist(email: string, symbol: string) {
  if (!email || !symbol) throw new Error("Missing email or symbol");
  const mongoose = await connectToDB();
  const db = mongoose.connection.db;

  if (!db) throw new Error("MongoDB connection not found");

  const user = await db.collection("user").findOne({ email });

  if (!user) throw new Error("User not found");
  const userId = user.id || String(user._id || "");

  const stock = await Stock.findOne({ symbol });
  if (!stock) return { success: true };

  await Watchlist.deleteOne({ userId, stockId: stock._id });
  return { success: true };
}
