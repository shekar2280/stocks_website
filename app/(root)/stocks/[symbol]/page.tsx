import TradingViewWidget from "@/components/TradingViewWidget";
import { Button } from "@/components/ui/button";
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/constants";

interface StockDetailsProps {
  params: Promise<{ symbol: string }>;
}

const scriptUrl = "https://s3.tradingview.com/external-embedding/embed-widget-";

export default async function StockDetails({ params }: StockDetailsProps) {
  const { symbol: rawSymbol } = await params;

  const formatTradingViewSymbol = (sym: string) => {
    if (!sym) return "";
    const upper = sym.toUpperCase();
    if (upper.endsWith(".NS")) return `NSE:${upper.replace(".NS", "")}`;
    if (upper.endsWith(".BO")) return `BSE:${upper.replace(".BO", "")}`;
    if (upper.endsWith(".TO")) return `TSX:${upper.replace(".TO", "")}`;
    return upper;
  };

  const symbol = formatTradingViewSymbol(rawSymbol);

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
          <Button type="submit" className="yellow-btn w-full mt-3 lg:hidden">
            Add to Watchlist
          </Button>
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
        <Button type="submit" className="yellow-btn w-full">
          Add to Watchlist
        </Button>

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
