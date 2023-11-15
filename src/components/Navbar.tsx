import { PhoneIcon, ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

interface NavbarProps { }

export function Navbar({ }: NavbarProps) {
    return (
        <header className="flex justify-between lg:justify-around items-center uppercase p-4 border-b-2 border-b-red-400 text-red-600">
            <nav className="hidden lg:flex gap-8 text-lg">
                <Link href='/'>Início</Link>
                <Link href='/menu'>Menu</Link>
                <Link href='/'>Contato</Link>
            </nav>

            <Link href='/'>
                <h1 className="text-3xl font-bold">
                    Massimo
                </h1>
            </Link>

            <div className="hidden lg:flex items-center gap-4">
                <span className="flex items-center gap-2 px-2 rounded-md font-medium bg-orange-400/80 select-all">
                    <PhoneIcon className="text-white fill-white h-5 w-5" strokeWidth={0.5} />
                    11 99123-4567
                </span>
                <Link href='/orders'>Pedidos</Link>

                <div className="flex items-center gap-2">
                    <ShoppingBasketIcon className="h-5 w-5 text-orange-500" />
                    Carrinho(3)
                </div>
            </div>

            <div className="lg:hidden">
                <MobileMenu />
            </div>
        </header>
    )
}
