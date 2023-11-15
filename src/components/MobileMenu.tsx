import { MenuIcon, PhoneIcon, ShoppingBasketIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Link from "next/link";

interface MobileMenuProps { }

export function MobileMenu({ }: MobileMenuProps) {
    return (
        <Sheet>
            <SheetTrigger className="flex items-center justify-center">
                <MenuIcon />
            </SheetTrigger>

            <SheetContent className="flex flex-col justify-between bg-primary/95 uppercase text-white">
                <SheetHeader>
                    <SheetTitle className="my-4 rounded-sm text-3xl text-center text-primary bg-white">Massimo</SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col items-center justify-center gap-8 text-2xl">
                    <SheetClose asChild>
                        <Link href='/'>Início</Link>
                    </SheetClose>
                    
                    <SheetClose asChild>
                        <Link href='/menu'>Menu</Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link href='/'>Contato</Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link href='/'>Horários</Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link href='/login'>Entrar</Link>
                    </SheetClose>

                    <Link href='/cart' className="flex items-center gap-2">
                        <ShoppingBasketIcon className="h-5 w-5 text-orange-500" />
                        Carrinho(3)
                    </Link>
                </nav>

                <span className="flex items-center w-fit mx-auto gap-2 py-1 px-4 text-xl rounded-md font-medium bg-orange-400/80 select-all">
                    <PhoneIcon className="text-white fill-white h-5 w-5" strokeWidth={0.5} />
                    11 99123-4567
                </span>
            </SheetContent>
        </Sheet>
    )
}
