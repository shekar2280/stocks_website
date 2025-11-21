import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import TradingViewWidget from "@/components/TradingViewWidget";
import {
  CRYPTO_WIDGET_CONFIG,
  TICKER_TAPE_WIDGET_CONFIG,
  WATCHLIST_OVERVIEW_WIDGET_CONFIG,
  WATCHLIST_OVERVIEW_WIDGET_CONFIG_MOBILE,
} from "@/lib/constants";
import WatchlistList from "@/components/WatchlistList";
import { getCompanyProfile } from "@/lib/actions/finnhub.actions";
import { getWatchlistSymbolsByUserId } from "@/lib/actions/watchlist.actions";

const scriptUrl = "https://s3.tradingview.com/external-embedding/embed-widget-";

const WatchlistPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    return (
      <p className="text-center mt-10">Please log in to view your watchlist.</p>
    );
  }

  const symbols = await getWatchlistSymbolsByUserId(user.id);

  const profiles: Record<string, any> = {};

  for (const item of symbols) {
    profiles[item.s] = await getCompanyProfile(item.s);
  }

  const tickerSymbols = symbols.map((sym) => sym.s);

  return (
    <div className="flex flex-col">
      <div className="mb-3">
        <div className="relative">
          <div className="pointer-events-none">
            <TradingViewWidget
              title=""
              scriptUrl={`${scriptUrl}ticker-tape.js`}
              config={TICKER_TAPE_WIDGET_CONFIG(tickerSymbols)}
              height={600}
              className="custom-chart"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="hidden md:block flex-1">
          <TradingViewWidget
            title=""
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={WATCHLIST_OVERVIEW_WIDGET_CONFIG(symbols)}
            height={600}
          />
        </div>
        <div className="block md:hidden w-full">
          <TradingViewWidget
            title=""
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={WATCHLIST_OVERVIEW_WIDGET_CONFIG_MOBILE(symbols)}
            height={400}
          />
        </div>

        <div className="w-full md:w-1/3 bg-white/5 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-md max-h-[500px] overflow-y-auto scrollbar-hide">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Your Watchlist
          </h2>
          <WatchlistList userId={user.id} symbols={symbols} profiles={profiles} />
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
