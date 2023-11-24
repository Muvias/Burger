'use client'

import { useCartStore } from "@/utils/store"
import { ShoppingBasketIcon } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export function Cart() {
    const { totalItems } = useCartStore()

    useEffect(() => {
        useCartStore.persist.rehydrate()
    }, [])

    return (
        <Link href='/cart' className="flex items-center gap-2">
            <ShoppingBasketIcon className="h-5 w-5 text-orange-500" />
            Carrinho({totalItems})
        </Link>
    )
}
