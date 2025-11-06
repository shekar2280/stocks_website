import TradingViewWidget from "@/components/TradingViewWidget";
import { Button } from "@/components/ui/button";
import WatchlistButton from "@/components/WatchlistButton";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { auth } from "@/lib/better-auth/auth";
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/constants";
import { headers } from "next/headers";

interface StockDetailsProps {
  params: Promise<{ symbol: string }>;
}

const scriptUrl = "https://s3.tradingview.com/external-embedding/embed-widget-";

export default async function StockDetails({ params }: StockDetailsProps) {
  const { symbol: rawSymbol } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    return (
      <p className="text-center mt-10">
        Please log in to add in to your watchlist.
      </p>
    );
  }
  const userEmail = user.email;

  const formatTradingViewSymbol = (sym: string) => {
    if (!sym) return "";
    const upper = sym.toUpperCase();
    if (upper.endsWith(".NS")) return `NSE:${upper.replace(".NS", "")}`;
    if (upper.endsWith(".BO")) return `BSE:${upper.replace(".BO", "")}`;
    if (upper.endsWith(".TO")) return `TSX:${upper.replace(".TO", "")}`;
    return upper;
  };

  const symbol = formatTradingViewSymbol(rawSymbol);
  const stocks = await searchStocks(symbol);
  const stock = stocks.find((s) => s.symbol === symbol);
  const companyName = stock?.name || symbol;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] min-h-screen gap-6">
      <section className="rounded-2xl shadow-md p-6 space-y-5">
        <div>
          <TradingViewWidget
            title=""
            scriptUrl={`${scriptUrl}symbol-info.js`}
            config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
            height={170}
          />
          <div className="space-y-2 lg:hidden mt-3">
            <WatchlistButton
              userEmail={userEmail}
              companyName={companyName}
              symbol={symbol}
            />
            <TradingViewWidget
              title=""
              scriptUrl={`${scriptUrl}technical-analysis.js`}
              config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
              height={400}
            />
          </div>
        </div>

        <TradingViewWidget
          title=""
          scriptUrl={`${scriptUrl}advanced-chart.js`}
          config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
          height={600}
        />

        <TradingViewWidget
          title=""
          scriptUrl={`${scriptUrl}advanced-chart.js`}
          config={BASELINE_WIDGET_CONFIG(symbol)}
          height={600}
        />
      </section>

      <section className="rounded-2xl shadow-md p-6 hidden lg:flex flex-col space-y-5">
        <WatchlistButton
          userEmail={userEmail}
          companyName={companyName}
          symbol={symbol}
        />

        <TradingViewWidget
          title=""
          scriptUrl={`${scriptUrl}technical-analysis.js`}
          config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
          height={400}
        />

        <TradingViewWidget
          title=""
          scriptUrl={`${scriptUrl}symbol-profile.js`}
          config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
          height={440}
        />

        <TradingViewWidget
          title=""
          scriptUrl={`${scriptUrl}financials.js`}
          config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
          height={464}
        />
      </section>
    </div>
  );
}
