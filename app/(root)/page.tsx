import TradingViewWidget from "@/components/TradingViewWidget";
import { Button } from "@/components/ui/button";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  SECTOR_TICKER_TAPE_WIDGET_CONFIG,
  TICKER_TAPE_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";
import { connectToDB } from "@/database/mongoose";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import HomePageWidgets from "@/components/HomePageWidgets";

const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const userId = session.user.id;

  const mongoose = await connectToDB();
  const db = mongoose.connection.db;
  if(!db) throw new Error("Connection to DB not established");
  const user = await db.collection("user").findOne(
    { _id: new ObjectId(userId) },
    { projection: { country: 1 } }
  );

  const country = user?.country || "US"; 

  return <HomePageWidgets country={country} />;
};

