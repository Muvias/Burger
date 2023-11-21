'use client'

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface PricesProps {
    id: number
    price: number
    options?: { title: string; additionalPrice: number }[]
}

export function Prices({ id, price, options }: PricesProps) {
    const [total, setTotal] = useState(price)
    const [quantity, setQuantity] = useState(1)
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        setTotal(quantity * (options ? price + options[selected].additionalPrice : price))
    }, [quantity, selected, options, price])

    return (
        <div className="space-y-8">
            <span className="font-bold text-3xl">R$ {total.toFixed(2).replace('.', ',')}</span>

            <div className="flex gap-4 md:w-1/2">
                {options?.map((option, index) => (
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

                <Button className="py-5 h-full rounded-none uppercase text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap">Adc ao Carrinho</Button>
            </div>
        </div>
    )
}
