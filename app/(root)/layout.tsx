import Header from "@/components/Header"
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { auth } from "@/lib/better-auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation";

const Layout = async ({children}: { children : React.ReactNode}) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if(!session){
    redirect("/sign-in");
  }

  const user = {
    id: session!.user.id,
    name: session!.user.name,
    email: session!.user.email,
  }

   const initialStocks = await searchStocks(undefined, user.email);
  const plainStocks = JSON.parse(JSON.stringify(initialStocks));

  return (
    <main className="min-h-screen text-gray-400">
        <Header user={user} initialStocks={plainStocks} />
        <div className="container py-10">
            {children}
        </div>
    </main>
  )
}

export default Layout