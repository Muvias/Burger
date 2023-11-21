import { Prices } from "@/components/Prices";
import { singleProduct } from "@/data";
import Image from "next/image";

interface pageProps { }

export default function Page({ }: pageProps) {
    return (
        <div className="flex flex-col md:flex-row justify-around h-screen md:h-[79vh] p-4 lg:px-20 xl:px-40 gap-20 text-primary">
            {singleProduct.img && (
                <div className="relative w-full flex-1 2xl:flex-auto lg:w-3/4">
                    <Image
                        src={singleProduct.img}
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
                <p className="leading-relaxed text-lg">{singleProduct.desc}</p>

                <Prices
                    id={singleProduct.id}
                    price={singleProduct.price}
                    options={singleProduct.options}
                />
            </div>
        </div>
    )
}
