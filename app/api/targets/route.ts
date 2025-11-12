import { Alert } from "@/database/models/alert.models";
import { connectToDB } from "@/database/mongoose";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const symbol = searchParams.get("symbol");

    if (!userId || !symbol)
      return new Response("Missing params", { status: 400 });

    await connectToDB();
    const alert = await Alert.findOne({ userId, symbol });

    return new Response(JSON.stringify(alert), { status: 200 });
  } catch (err) {
    console.error("GET /api/targets error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, symbol, upperTarget, lowerTarget } = body;

    if (!userId || !symbol) {
      return new Response("Missing field", { status: 400 });
    }

    const updateData: any = {};
    if (upperTarget !== undefined && upperTarget !== null)
      updateData.upperTarget = upperTarget;
    if (lowerTarget !== undefined && lowerTarget !== null)
      updateData.lowerTarget = lowerTarget;

    await connectToDB();

    await Alert.findOneAndUpdate(
      { userId, symbol },
      {
        $set: {
          ...updateData,
          active: true,
          lastTriggered: null,
          notified: false,
          createdAt: new Date(),
        },
        $setOnInsert: { userId, symbol },
      },
      { upsert: true, new: true }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("GET /api/targets error:", err);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const symbol = searchParams.get("symbol");

    if (!userId || !symbol)
      return new Response("Missing params", { status: 400 });

    await connectToDB();
    await Alert.deleteOne({ userId, symbol });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("DELETE /api/targets error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
