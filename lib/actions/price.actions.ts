'use server';

import { getCurrentPrice } from "@/lib/actions/finnhub.actions";

export async function getPriceForSymbol(symbol: string) {
  const price = await getCurrentPrice(symbol);
  return { symbol, price };
}
