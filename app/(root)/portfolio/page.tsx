"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Meh } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PortfolioItem = {
  symbol: string;
  name: string;
  qty: number;
  averagePrice: number;
  closePrice: number;
  totalValue: number;
  profit: number;
};

const Portfolio = () => {
  const router = useRouter();

  const [currentBalance, setCurrentBalance] = useState(0);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [profiles, setProfiles] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const pRes = await fetch("/api/portfolio", { credentials: "include" });
      const bRes = await fetch("/api/get-balance", { credentials: "include" });

      if (pRes.ok) {
        const data = await pRes.json();
        setPortfolio(data.portfolio ?? []);
        setProfiles(data.profiles ?? {});
      }

      if (bRes.ok) {
        const bal = await bRes.json();
        setCurrentBalance(bal.balance ?? 0);
      }

      setLoading(false);
    };

    load();
  }, []);

  const netWorth =
    currentBalance + portfolio.reduce((s, p) => s + (p.totalValue ?? 0), 0);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-32 text-gray-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!loading && portfolio.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-white">
        <div className="border border-gray-700 bg-gray-900/40 px-8 py-10 rounded-xl text-center">
          <div className="flex flex-col items-center gap-2">
            <Meh className="w-20 h-20 text-yellow-400" />
            <div className="text-xl font-semibold mb-2">Portfolio Empty</div>
          </div>
          <div className="text-gray-400 text-sm">
            Your holdings will appear here once you start trading.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 p-5 border-2 border-white rounded-lg text-white">
        <div className="flex flex-col justify-between md:flex-row md:items-center border-b border-gray-300 pl-5 pr-5 pb-4 mb-4">
          <h2 className="flex flex-col text-left mb-3 md:mb-0">
            <span className="text-sm text-gray-400 tracking-wide">
              Net Worth
            </span>
            <span
              className={`text-2xl font-bold ${
                netWorth >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              ${netWorth.toLocaleString("en-US")}
            </span>
          </h2>

          <h2 className="flex flex-col text-right md:items-end md:text-right">
            <span className="text-sm text-gray-400 tracking-wide">
              Current Balance
            </span>
            <div
              className={`text-2xl font-bold ${
                currentBalance > 0 ? "text-green-400" : "text-red-500"
              }`}
            >
              ${currentBalance.toLocaleString("en-US")}
            </div>
          </h2>
        </div>

        <Table>
          <TableCaption>
            <div className="flex flex-col items-center text-gray-400 gap-2 mt-5">
              <span>
                Note: Total Value is calculated when market closes 20:30(UTC) /
                2:00AM(IST)
              </span>
              <span>
                Newly purchased stocks Total Value and Profit will be estimated
                after market closes
              </span>
            </div>
          </TableCaption>

          <TableHeader className="items-center text-center">
            <TableRow>
              <TableHead className="text-center">Symbol</TableHead>
              <TableHead className="text-center hidden lg:table-cell">
                Name
              </TableHead>
              <TableHead className="text-center">Shares</TableHead>
              <TableHead className="text-center hidden lg:table-cell">
                Buying Price
              </TableHead>
              <TableHead className="text-center hidden lg:table-cell">
                Current Price
              </TableHead>
              <TableHead className="text-center">Total Value</TableHead>
              <TableHead className="text-center">P/L</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {portfolio.map((item) => {
              const profile = profiles[item.symbol];
              return (
                <TableRow
                  key={item.symbol}
                  className="cursor-pointer hover:bg-gray-800"
                  onClick={() => router.push(`/stocks/${item.symbol}`)}
                >
                  <TableCell className="px-4 py-2">
                    <div className="flex items-center justify-center gap-2">
                      {profile?.logo && (
                        <img
                          src={profile.logo}
                          alt={item.symbol}
                          className="w-6 h-6 rounded-full border border-gray-300"
                        />
                      )}
                      <span className="whitespace-nowrap">{item.symbol}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center hidden lg:table-cell">
                    {profile?.name ?? "-"}
                  </TableCell>
                  <TableCell className="text-center">{item.qty}</TableCell>
                  <TableCell className="text-center hidden lg:table-cell">
                    {item.averagePrice != null
                      ? item.averagePrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center hidden lg:table-cell">
                    {item.closePrice != null
                      ? item.closePrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.totalValue != null
                      ? item.totalValue.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell
                    className={`text-center ${
                      item.profit >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {item.profit != null ? item.profit.toFixed(2) + "%" : "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Portfolio;
