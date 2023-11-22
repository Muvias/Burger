import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "@/types/types";
import Link from "next/link";

async function getData() {
    const res = await fetch('http://localhost:3000/api/categories', {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("Failed")
    }

    return res.json()
}

export default async function Page() {
    const menu: Menu = await getData()

    return (
        <div className="flex flex-col md:flex-row items-center p-4 lg:px-20 2xl:px-40 h-[calc(100vh-6.6rem)]">
            {menu.map((category) => (
                <Link href={`/menu/${category.slug}`} key={category.id} className="flex flex-col justify-between w-full h-1/3 md:h-1/2 p-8 bg-cover group" style={{ backgroundImage: `url(${category.image})` }}>
                    <div className={`flex flex-col gap-4 w-[55%] sm:w-1/2 text-${category.color} lg:group-hover:scale-105 transition-transform`}>
                        <h2 className="text-3xl md:text-4xl font-bold uppercase">{category.title}</h2>
                        <p className="text-sm md:text-base">{category.description}</p>
                    </div>
                    <Button
                        className={cn(`hidden xl:block w-1/2 bg-${category.color} text-primary font-bold hover:bg-${category.color} hover:bg-opacity-80`, {
                            'text-white': category.color === 'black'
                        })}
                    >
                        Explorar
                    </Button>
                </Link>
            ))}
        </div>
    )
}
