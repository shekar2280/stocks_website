import positionsModels from "@/database/models/positions.models";
import { connectToDB } from "@/database/mongoose";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;

  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol");

    if (!symbol) return new Response("Missing params", { status: 400 });

    await connectToDB();
    const qty = await positionsModels.findOne({ userId, symbol });

    return new Response(JSON.stringify(qty), { status: 200 });
  } catch (err) {
    console.error("Error getting selling quantity:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
