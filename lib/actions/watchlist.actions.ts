'use server';

import { Watchlist } from "@/database/models/watchlist.models";
import { connectToDB } from "@/database/mongoose";

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Better Auth stores users in the "user" collection
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}


export async function addToWatchlist(email:string, symbol: string, company: string ){
  if (!email || !symbol) throw new Error("Missing email or symbol");
  const mongoose = await connectToDB();
  const db = mongoose.connection.db;
  
  if (!db) throw new Error('MongoDB connection not found');

  const user = await db.collection("user").findOne({ email });

  if (!user) throw new Error("User not found");
  const userId = user.id || String(user._id || "");

  const item = await Watchlist.findOneAndUpdate(
    { userId, symbol },
    { userId, symbol, company, addedAt: new Date() },
    { upsert: true, new: true }
  );

  return { success: true };
}

export async function removeFromWatchlist(email: string, symbol: string) {
  if (!email || !symbol) throw new Error("Missing email or symbol");
  const mongoose = await connectToDB();
  const db = mongoose.connection.db;

  if (!db) throw new Error('MongoDB connection not found');

  const user = await db.collection("user").findOne({ email });

  if (!user) throw new Error("User not found");
  const userId = user.id || String(user._id || "");

  await Watchlist.deleteOne({ userId, symbol });
  return { success: true };
}