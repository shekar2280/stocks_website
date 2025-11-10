import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawCountry = searchParams.get("country") || "us";

  const countryMap: Record<string, string> = {
    IND: "in",
    USA: "us",
    GBR: "gb",
    CAN: "ca",
    AUS: "au",
  };

  const country = countryMap[rawCountry.toUpperCase()] || rawCountry.toLowerCase();

  const apiKey = process.env.NEWSDATA_API_KEY;
  const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=stock%20market,finance,investment,shares&category=business&language=en&country=${country}`;

  const res = await fetch(url, { next: { revalidate: 300 } });
  const data = await res.json();

  const sorted = (data.results || []).sort(
    (a: any, b: any) =>
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return NextResponse.json(sorted);
}