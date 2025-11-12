import { NextRequest, NextResponse } from "next/server";
import { getCurrentPrice } from "@/lib/actions/finnhub.actions";

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol");
  if (!symbol) return NextResponse.json({ price: null });

  const price = await getCurrentPrice(symbol);
  return NextResponse.json({ price });
}
