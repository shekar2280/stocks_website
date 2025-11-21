"use server";

import { Stock } from "@/database/models/stock.models";
import { Watchlist } from "@/database/models/watchlist.models";
import { connectToDB } from "@/database/mongoose";
import { auth } from "../better-auth/auth";
import { headers } from "next/headers";

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

export async function getWatchlistSymbolsByUserId(
  userId: string
): Promise<Array<{ s: string; d: string }>> {
  const session = await auth.api.getSession({ headers: await headers() });
  const realUser = session?.user;
  if (!realUser) throw new Error("Unauthorized");

  if (userId !== realUser.id) throw new Error("Invalid user");

  try {
    const mongoose = await connectToDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not found");

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
  userId: string,
  symbol: string,
  company: string
) {
  const session = await auth.api.getSession({ headers: await headers() });
  const realUser = session?.user;
  if (!realUser) throw new Error("Unauthorized");

  if (userId !== realUser.id) throw new Error("Invalid user");

  if (!userId || !symbol) throw new Error("Missing userId or symbol");
  const mongoose = await connectToDB();
  const db = mongoose.connection.db;

  if (!db) throw new Error("MongoDB connection not found");

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

export async function removeFromWatchlist(userId: string, symbol: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  const realUser = session?.user;
  if (!realUser) throw new Error("Unauthorized");

  if (userId !== realUser.id) throw new Error("Invalid user");

  if (!userId || !symbol) throw new Error("Missing userId or symbol");
  const mongoose = await connectToDB();
  const db = mongoose.connection.db;

  if (!db) throw new Error("MongoDB connection not found");

  const stock = await Stock.findOne({ symbol });
  if (!stock) return { success: true };

  await Watchlist.deleteOne({ userId, stockId: stock._id });
  return { success: true };
}
