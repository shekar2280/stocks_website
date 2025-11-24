import pinsModels from "@/database/models/pins.models";
import { inngest } from "@/lib/inngest/client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { symbol, side, qty, price, userEmail } = body;

  const eventName =
    side === "buy"
      ? "app/orders.buy_pin_generated"
      : "app/orders.sell_pin_generated";

  const pin = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = await bcrypt.hash(pin, 10);

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await pinsModels.deleteMany({ userEmail, symbol, side });

  await pinsModels.create({
    userEmail,
    symbol,
    side,
    hash,
    expiresAt,
  });

  await inngest.send({
    name: eventName,
    data: {
      userEmail,
      symbol,
      qty,
      price,
      pin,
      ttl: 5,
      timestamp: new Date().toISOString(),
    },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
