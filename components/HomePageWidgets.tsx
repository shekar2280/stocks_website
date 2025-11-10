"use client";
import TradingViewWidget from "@/components/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  SECTOR_TICKER_TAPE_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";
import MarketNews from "./MarketNews";

const scriptUrl = "https://s3.tradingview.com/external-embedding/embed-widget-";

export default function HomePageWidgets({ country }: { country: string }) {
//   const sectorConfig = SECTOR_TICKER_TAPE_WIDGET_CONFIG(country);
  const heatmapConfig = HEATMAP_WIDGET_CONFIG(country);
  return (
    <div className="flex min-h-screen home-wrapper">
      <TradingViewWidget
        title=""
        scriptUrl={`${scriptUrl}ticker-tape.js`}
        config={SECTOR_TICKER_TAPE_WIDGET_CONFIG()}
        height={600}
      />

      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            height={600}
            className="custom-chart"
          />
        </div>

        <div className="md-col-span xl:col-span-2">
          <TradingViewWidget
            title="Stock HeatMap"
            scriptUrl={`${scriptUrl}stock-heatmap.js`}
            config={heatmapConfig}
            height={600}
          />
        </div>
      </section>

      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <MarketNews country={country} />
        </div>

        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>
    </div>
  );
}
