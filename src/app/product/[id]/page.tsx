import { Prices } from "@/components/Prices";
import { singleProduct } from "@/data";
import Image from "next/image";

interface pageProps { }

export default function Page({ }: pageProps) {
    return (
        <div className="flex flex-col md:flex-row justify-around h-screen p-4 lg:px-20 xl:px-40 gap-20 text-primary">
            {singleProduct.img && (
                <div className="relative w-full flex-1 2xl:flex-auto md:w-2/4">
                    <Image
                        src={singleProduct.img}
                        alt={singleProduct.title}
                        fill
                        className="object-contain"
                    />
                </div>
            )}

            <div className="flex flex-col flex-1 justify-center gap-8 2xl:flex-auto">
                <h2 className="text-4xl font-semibold">{singleProduct.title}</h2>
                <p className="leading-relaxed text-lg md:w-3/4">{singleProduct.desc}</p>

                <Prices
                    id={singleProduct.id}
                    price={singleProduct.price}
                    options={singleProduct.options}
                />
            </div>
        </div>
    )
}
