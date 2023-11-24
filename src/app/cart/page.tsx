'use client'

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/utils/store";
import { GhostIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface pageProps { }

export default function Page({ }: pageProps) {
    const { products, totalItems, totalPrice, removeFromCart } = useCartStore()

    useEffect(() => {
        useCartStore.persist.rehydrate()
    }, [])

    return (
        <div className="flex flex-col lg:flex-row h-[80vh] md:h-[calc(100vh-9rem)] text-primary font-medium">
            {totalItems === 0 ? (
                <div className="flex justify-center items-center w-full gap-4 text-4xl">Seu carrinho está vazio <GhostIcon className="w-8 h-8" /></div>
            ) : (
                <>
                    <div className="flex-1 lg:flex-[2] 2xl:flex-1 flex flex-col justify-center p-4 gap-4 overflow-y-scroll sm:px-20 lg:p-20 2xl:p-40">
                        {products.map((product) => (
                            <div className="relative flex items-center justify-between gap-4" key={product.id}>
                                {product.image && (
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={100}
                                        height={100}
                                    />
                                )}

                                <div>
                                    <h2 className="uppercase font-bold text-base sm:text-xl">{product.title} ({product.quantity})</h2>
                                    <span className="font-normal mb-2">{product.optionTitle}</span>
                                </div>

                                <span className="font-bold">R${product.price}</span>

                                <X className="cursor-pointer absolute sm:static top-2 right-2 w-4 h-4 sm:w-6 sm:h-6" onClick={() => removeFromCart(product)} />
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-4 p-4 bg-red-100/50 sm:px-20 lg:p-20 2xl:p-40 2xl:text-lg">
                        <div className="flex justify-between">
                            <span>Subtotal ({totalItems} items)</span>
                            <span>R${totalPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Custo de Serviço</span>
                            <span>R$0,00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Custo de Entrega</span>
                            <span className="text-green-500">GRÁTIS</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>R${totalPrice}</span>
                        </div>
                        <Button className="uppercase self-end">Checkout</Button>
                    </div>
                </>
            )}
        </div>
    )
}
