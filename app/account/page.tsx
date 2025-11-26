import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Header from "@/components/Header";
import AccountDetails from "@/components/AccountDetails";
import { connectToDB } from "@/database/mongoose";
import { ObjectId } from "mongodb";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const AccountPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) return null;

  const mongoose = await connectToDB();
  const db = mongoose.connection.db;

  if (!db) throw new Error("DB not connected");
  
  const extended = await db
    .collection("user")
    .findOne({ _id: new ObjectId(user.id) });

  const fullUser = {
    ...user,
    country: extended?.country,
    investmentGoals: extended?.investmentGoals,
    riskTolerance: extended?.riskTolerance,
    preferredIndustry: extended?.preferredIndustry,
  };

   const initialStocks = await searchStocks(undefined, user.email);
  const plainStocks = JSON.parse(JSON.stringify(initialStocks));

  return (
    <div>
      <Header user={fullUser} initialStocks={plainStocks} />
      <div className="text-white">
        <AccountDetails user={fullUser} />
      </div>
    </div>
  );
};

export default AccountPage;
