import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import UserDropdown from "./UserDropDown";


const Header = async ({ user }: { user: User }) => {
    const initialStocks = await searchStocks(undefined, user?.email);
    const plainStocks = JSON.parse(JSON.stringify(initialStocks));

    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image src="/assets/images/stocksy_logo1.png" alt="Stocksy logo" width={180} height={42} className="h-8 w-auto cursor-pointer" />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems  userEmail={user?.email} initialStocks={plainStocks} />
                </nav>

                <UserDropdown user={user} initialStocks={plainStocks} />
            </div>
        </header>
    )
}
export default Header