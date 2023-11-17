'use client'

import { useState } from "react";
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

    return (
        <div className="space-y-8">
            <span className="font-bold text-3xl">R$ {total.toFixed(2).replace('.', ',')}</span>

            <div className="flex justify-between md:w-1/2">
                {options?.map((option, index) => (
                    <Button
                        key={option.title}
                        variant={'outline'}
                        className={cn("hover:text-primary/90", {
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
                    <span>{quantity}</span>

                    <div className="flex items-center gap-2">
                        <Button variant={'ghost'} className="hover:text-primary/80 px-2">{'<'}</Button>
                        <span>1</span>
                        <Button variant={'ghost'} className="hover:text-primary/80 px-2">{'>'}</Button>
                    </div>
                </div>

                <Button className="py-5 h-full rounded-none uppercase whitespace-normal sm:whitespace-nowrap">Adc ao Carrinho</Button>
            </div>
        </div>
    )
}
