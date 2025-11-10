import { connectToDB } from "@/database/mongoose";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import HomePageWidgets from "@/components/HomePageWidgets";

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
}
