"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/portfolio", { credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      setPortfolio(data.portfolio);
      setProfiles(data.profiles);
    };
    load();
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
      const res = await fetch("/api/get-balance", {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();
      setCurrentBalance(data.balance ?? 0);
    };
    loadBalance();
  }, []);

  const netWorth =
    currentBalance + portfolio.reduce((s, p) => s + (p.totalValue ?? 0), 0);

  if (!portfolio.length) {
    return (
      <div className="w-full flex justify-center py-32 text-gray-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
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
                Note: Total Value is calculated when market closes 20:30(UTC)
                /2:00AM(IST)
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
