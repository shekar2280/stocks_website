import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { connectToDB } from "@/database/mongoose";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;
    
    if (!user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const mongoose = await connectToDB();
    const db = mongoose.connection.db;

    if (!db) {
      return Response.json({ error: "DB not connected" }, { status: 500 });
    }

    const doc = await db
      .collection("user")
      .findOne({ _id: new ObjectId(user.id) }, { projection: { balance: 1 } });

    return Response.json({ balance: doc?.balance ?? 0 });
  } catch (e) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
