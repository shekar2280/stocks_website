"use client";

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchCommand from "@/components/SearchCommand";

const NavItems = ({
  userId,
  initialStocks,
}: {
  userId?: string | null;
  initialStocks: StockWithWatchlistStatus[];
}) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";

    return pathname.startsWith(path);
  };

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        if (href === "/search")
          return (
            <li key="search-trigger"  className="flex items-center gap-2 hover:text-yellow-500">
              <Icon className="w-4 h-4" />
              <SearchCommand
                renderAs="text"
                label="Search"
                initialStocks={initialStocks}
                userId={userId}
              />
            </li>
          );

        return (
          <li key={href}>
            <Link
              href={href}
              className={`flex items-center gap-2 hover:text-yellow-500 transition-colors ${
                isActive(href) ? "text-gray-100" : ""
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default NavItems;
