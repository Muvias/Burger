'use client'

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/types/types";
import { useCartStore } from "@/utils/store";
import { toast } from "sonner";

interface PricesProps {
    product: Product
}

export function Prices({ product }: PricesProps) {
    const [total, setTotal] = useState(product.price)
    const [quantity, setQuantity] = useState(1)
    const [selected, setSelected] = useState(0)

    const { addToCart } = useCartStore()

    useEffect(() => {
        useCartStore.persist.rehydrate()
    }, [])

    useEffect(() => {
        if (product.options?.length) {
            setTotal(quantity * (+product.price + +product.options[selected].additionalPrice))
        }
    }, [quantity, selected, product])

    function handleCart() {
        addToCart({
            id: product.id,
            title: product.title,
            image: product.image,
            price: total,
            ...(product.options?.length && { optionTitle: product.options[selected].title }),
            quantity: quantity,
        })

        toast.success('Adicionado ao carrinho')
    }

    return (
        <div className="space-y-8">
            <span className="font-bold text-3xl">R$ {total}</span>

            <div className="flex gap-4 md:w-1/2">
                {product.options?.map((option, index) => (
                    <Button
                        key={option.title}
                        variant={'outline'}
                        className={cn("min-w-[5rem] sm:min-w-[6rem] hover:text-primary/90", {
                            'bg-primary text-white hover:bg-primary hover:text-white': index === selected
                        })}
                        onClick={() => setSelected(index)}
                    >
                        {option.title}
                    </Button>
                ))}
            </div>

            <div className="flex items-center h-16">
                <div className="flex items-center justify-between w-full h-full px-2 md:px-4 border border-primary">
                    <span>Quantidade</span>

                    <div className="flex items-center gap-2">
                        <Button
                            variant={'ghost'}
                            className="hover:text-primary/80 px-2"
                            disabled={quantity <= 1}
                            onClick={() => setQuantity((prev) => prev > 1 ? prev - 1 : 1)}
                        >
                            {'<'}
                        </Button>
                        <span>{quantity}</span>
                        <Button
                            variant={'ghost'}
                            className="hover:text-primary/80 px-2"
                            disabled={quantity >= 9}
                            onClick={() => setQuantity((prev) => prev < 9 ? prev + 1 : 9)}
                        >
                            {'>'}
                        </Button>
                    </div>
                </div>

                <Button
                    onClick={() => handleCart()}
                    className="py-5 h-full rounded-none uppercase text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap"
                >
                    Adc ao Carrinho
                </Button>
            </div>
        </div>
    )
}
