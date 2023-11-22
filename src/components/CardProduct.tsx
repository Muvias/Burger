'use client'

import { buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const spanAnimation = {
    default: { scale: 1 },
    hover: { scale: 0, display: 'none' },
}

const buttonAnimation = {
    default: { display: 'none', scale: 0, ease: "easeOut", duration: 0.2 },
    hover: { display: 'block', scale: 1 },
}

interface CardProductProps {
    product: Product
}

export function CardProduct({ product }: CardProductProps) {
    return (
        <Card
            className="flex flex-col md:w-[45%] lg:w-[30%] xl:w-1/4 h-[30vh] hover:bg-red-50/50 border-primary rounded-sm"
            key={product.id}
        >
            <Link
                href={`/product/${product.id}`}
                className="flex flex-col h-full gap-4  p-4"
            >
                <CardHeader className="relative flex-1">
                    {product.image && (
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-contain"
                        />
                    )}
                </CardHeader>

                <motion.div
                    className="flex-1 flex flex-col items-center justify-center w-full p-0 gap-4 text-center text-primary/90"
                    whileHover="hover"
                    initial='default'
                >
                    <CardTitle className="font-semibold uppercase break-words">
                        {product.title}
                    </CardTitle>

                    <motion.span
                        className="font-semibold h-10 text-xl"
                        variants={spanAnimation}
                    >
                        R$ {product.price}
                    </motion.span>

                    <motion.button
                        className={buttonVariants({ className: "uppercase h-10" })}
                        variants={buttonAnimation}
                    >
                        Adc ao Carrinho
                    </motion.button>
                </motion.div>
            </Link>
        </Card>
    )
}
