import Image from "next/image"
import { Button } from "./ui/button"
import { Product } from "@/types/types"

async function getData() {
    const res = await fetch('http://localhost:3000/api/products', {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("Failed")
    }

    return res.json()
}

export async function Featured() {
    const featuredProducts: Product[] = await getData()

    return (
        <section className="w-full overflow-x-scroll">
            <div className="flex w-max">
                {featuredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col items-center justify-around w-screen md:w-[50vw] xl:w-[33vw] p-6 gap-8 text-center text-primary h-[70vh] xl:h-[80vh] hover:bg-red-50/50"
                    >
                        <div className="flex-1 relative w-full">
                            {product.image && (
                                <Image
                                    src={product.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                    className="object-contain"
                                />
                            )}
                        </div>

                        <div className="flex flex-col flex-1 items-center justify-around gap-4">
                            <h3 className="font-bold text-xl uppercase xl:text-2xl 2xl:text-3xl">{product.title}</h3>
                            <p className="text-lg lg:text-xl leading-relaxed sm:px-6 2xl:px-8">{product.description}</p>

                            <span className="font-extrabold text-xl">R$ {product.price}</span>

                            <Button className="font-semibold text-base">Adicionar ao Carrinho</Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
