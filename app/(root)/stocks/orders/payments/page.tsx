import PaymentsForm from "@/components/PaymentsForm";
import { getCompanyProfile } from "@/lib/actions/finnhub.actions";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{
    symbol?: string;
    side?: string;
    qty?: string;
    price?: string;
  }>;
}) {
  const params = await searchParams;
  const { symbol, side, qty, price } = params;

  if (!symbol || !side || !qty || !price) {
    return <p className="mt-10">Missing payment parameters.</p>;
  }

  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    return (
      <p className="text-center mt-10">
        Please log in to add in to your watchlist.
      </p>
    );
  }

  const numQty = Number(qty);
  const numPrice = Number(price);

  const profile = await getCompanyProfile(symbol);

  return (
    <PaymentsForm
      symbol={symbol}
      side={side}
      qty={numQty}
      price={numPrice}
      profile={profile}
      userEmail={user.email}
    />
  );
}
