import { Button } from "@/components/ui/button";
import { menu } from "@/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface pageProps { }

export default function Page({ }: pageProps) {
    return (
        <div className="flex flex-col md:flex-row items-center p-4 lg:px-20 xl:px-40 h-[calc(100vh-6.6rem)]">
            {menu.map((item) => (
                <Link href={`/menu/${item.slug}`} key={item.id} className="flex flex-col justify-between w-full h-1/3 md:h-1/2 p-8 bg-cover group" style={{ backgroundImage: `url(${item.img})` }}>
                    <div className={`flex flex-col gap-4 w-[55%] sm:w-1/2 text-${item.color} lg:group-hover:scale-105 transition-transform`}>
                        <h2 className="text-3xl md:text-4xl font-bold uppercase">{item.title}</h2>
                        <p className="text-sm md:text-base">{item.desc}</p>
                    </div>
                    <Button
                        className={cn(`hidden 2xl:block w-1/2 bg-${item.color} text-primary font-bold hover:bg-${item.color} hover:bg-opacity-80`, {
                            'text-white': item.color === 'black'
                        })}
                    >
                        Explorar
                    </Button>
                </Link>
            ))}
        </div>
    )
}
