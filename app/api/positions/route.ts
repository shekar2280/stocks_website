import positionsModels from "@/database/models/positions.models";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { connectToDB } from "@/database/mongoose";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const body = await req.json();
  const { symbol, side, qty, price } = body;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;

  if (!symbol || !qty || qty <= 0 || !price || !side) {
    return new Response("Invalid input", { status: 400 });
  }

  const mongoose = await connectToDB();
  const db = mongoose.connection.db;

  if (!db) {
    return new Response("DB not connected", { status: 500 });
  }

  const userDoc = await db
    .collection("user")
    .findOne({ _id: new ObjectId(userId) }, { projection: { balance: 1 } });

  const currentBalance = userDoc?.balance ?? 0;

  const deltaQty = side === "buy" ? qty : -qty;
  const transactionAmount = qty * price;

  // Check if user has enough balance for buy operations
  if (side === "buy" && currentBalance < transactionAmount) {
    return new Response("Insufficient balance", { status: 400 });
  }

  const existing = await positionsModels.findOne({ userId, symbol });

  if (!existing) {
    if (side !== "buy") {
      return new Response("Cannot sell without position", { status: 400 });
    }

    await positionsModels.create({
      userId,
      symbol,
      qty,
      averagePrice: price,
      lastUpdated: new Date().toISOString(),
    });

    await db.collection("user").updateOne(
      { _id: new ObjectId(userId) },
      { $inc: { balance: -transactionAmount } }
    );

    return new Response("OK");
  }

  const newQty = existing.qty + deltaQty;

  if (newQty < 0) {
    return new Response("Insufficient quantity", { status: 400 });
  }

  if (newQty === 0) {
    await positionsModels.deleteOne({ _id: existing._id });
 
    if (side === "sell") {
      await db.collection("user").updateOne(
        { _id: new ObjectId(userId) },
        { $inc: { balance: transactionAmount } }
      );
    }
    
    return new Response("OK");
  }

  let newAvg = existing.averagePrice;
  if (side === "buy") {
    newAvg = (existing.averagePrice * existing.qty + price * qty) / newQty;
  }

  await positionsModels.updateOne(
    { _id: existing._id },
    {
      qty: newQty,
      averagePrice: newAvg,
      lastUpdated: new Date().toISOString(),
    }
  );

  const balanceChange = side === "buy" ? -transactionAmount : transactionAmount;
  await db.collection("user").updateOne(
    { _id: new ObjectId(userId) },
    { $inc: { balance: balanceChange } }
  );

  return new Response("OK");
}