import { CardProduct } from "@/components/CardProduct";
import { Product } from "@/types/types";

async function getData(category: string) {
    const res = await fetch(`http://localhost:3000/api/products?cat=${category}`, {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("Failed")
    }

    return res.json()
}

interface pageProps {
    params: {
        category: string
    }
}

export default async function Page({ params: { category } }: pageProps) {
    const products: Product[] = await getData(category)

    return (
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-2 py-10">
            {products.map(product => (
                <CardProduct product={product} />
            ))}
        </div>
    )
}
