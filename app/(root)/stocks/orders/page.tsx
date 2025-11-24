import OrderForm from "@/components/OrderForm";
import { getCompanyProfile } from "@/lib/actions/finnhub.actions";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export default async function OrdersPage(props: {
  searchParams: Promise<{ symbol?: string; side?: string }>;
}) {
  const searchParams = await props.searchParams;
  const { symbol, side } = searchParams;

  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    return (
      <p className="text-center mt-10">
        Please log in to add in to your watchlist.
      </p>
    );
  }

  const fetchPrice = async (symbol: string): Promise<number | null> => {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${base}/api/price?symbol=${symbol}`);
    const data = await res.json();
    return data.price ?? null;
  };

  const price = await fetchPrice(symbol || "");

  if (price === null) {
    return <p className="text-center mt-10">Invalid stock symbol.</p>;
  }

  const profile = await getCompanyProfile(symbol || "");

  if (!profile) {
    return <p className="text-center mt-10">Invalid stock symbol.</p>;
  }

  return (
    <OrderForm
      symbol={symbol || ""}
      side={side || ""}
      profile={profile}
      userEmail={user?.email}
      price={price}
    />
  );
}
