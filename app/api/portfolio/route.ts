import { ClosingPrice } from "@/database/models/closingPrices.models";
import positionsModels from "@/database/models/positions.models";
import { connectToDB } from "@/database/mongoose";
import { getCompanyProfile } from "@/lib/actions/finnhub.actions";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  await connectToDB();
  const userId = session.user.id;

  const positions = await positionsModels.find({ userId });

  if (!positions.length) {
    return Response.json({ portfolio: [] });
  }

  const symbols = positions.map((p) => p.symbol);

  const latestPrices = await ClosingPrice.find({
    symbol: { $in: symbols },
  });

  const priceMap = new Map();
  latestPrices.forEach((p) => priceMap.set(p.symbol, p.closePrice));

  const profiles: Record<string, any> = {};
  for (const symbol of symbols) {
    profiles[symbol] = await getCompanyProfile(symbol);
  }

  const portfolio = positions.map((p) => {
    const close = priceMap.get(p.symbol) ?? null;
    const totalValue = close ? close * p.qty : 0;
    const profit = close
      ? ((close - p.averagePrice) / p.averagePrice) * 100
      : 0;

    return {
      symbol: p.symbol,
      qty: p.qty,
      averagePrice: p.averagePrice,
      closePrice: close,
      totalValue,
      profit,
    };
  });

  return Response.json({ portfolio, profiles });
}
