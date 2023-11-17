import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pizzas } from "@/data";
import Image from "next/image";
import Link from "next/link";

interface pageProps { }

export default function Page({ }: pageProps) {
    return (
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-2 py-10">
            {pizzas.map(item => (
                <Card
                    className="flex flex-col md:w-[45%] lg:w-[30%] xl:w-1/4 h-[30vh] p-4 hover:bg-red-50/50 border-primary rounded-sm group"
                    key={item.id}
                >
                    <Link
                        href={`/product/${item.id}`}
                        className="flex flex-col h-full gap-4"
                    >
                        <CardHeader className="relative flex-1">
                            {item.img && (
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-contain"
                                />
                            )}
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col items-center justify-center w-full p-0 gap-4 text-center text-primary/90">
                            <CardTitle className="font-semibold uppercase break-words">
                                {item.title}
                            </CardTitle>

                            <span className="font-semibold h-10 text-xl group-hover:hidden">R$ {item.price.toFixed(2).replace('.', ',')}</span>

                            <Button className="uppercase h-10 hidden group-hover:block">Adc ao Carrinho</Button>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </div>
    )
}
