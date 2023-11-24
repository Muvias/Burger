import { DeleteProductButton } from "@/components/DeleteProductButton";
import { Prices } from "@/components/Prices";
import { Product } from "@/types/types";
import Image from "next/image";

async function getData(id: string) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("Failed")
    }

    return res.json()
}

export default async function Page({ params }: { params: { id: string } }) {
    const singleProduct: Product = await getData(params.id)

    return (
        <div className="relative flex flex-col md:flex-row justify-around h-screen md:h-[79vh] p-4 lg:px-20 xl:px-40 gap-20 text-primary">
            {singleProduct.image && (
                <div className="relative w-full flex-1 2xl:flex-auto lg:w-3/4">
                    <Image
                        src={singleProduct.image}
                        alt={singleProduct.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain max-w-lg mx-auto"
                    />
                </div>
            )}

            <div className="flex flex-col flex-1 justify-center gap-8 2xl:flex-auto">
                <h2 className="text-4xl lg:text-5xl font-semibold">{singleProduct.title}</h2>
                <p className="leading-relaxed text-lg">{singleProduct.description}</p>

                <Prices
                    product={singleProduct}
                />
            </div>

            <DeleteProductButton id={singleProduct.id} />
        </div>
    )
}
