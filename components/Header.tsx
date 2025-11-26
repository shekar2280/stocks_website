import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "./UserDropDown";


const Header = async ({ user, initialStocks }: { user: User, initialStocks: StockWithWatchlistStatus[] }) => {

    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image src="/assets/images/stocksy_logo1.png" alt="Stocksy logo" width={180} height={42} className="h-8 w-auto cursor-pointer" />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems  userId={user.id} initialStocks={initialStocks} />
                </nav>

                <UserDropdown user={user} initialStocks={initialStocks}
                />
            </div>
        </header>
    )
}
export default Header