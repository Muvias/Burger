import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

interface pageProps { }

export default function Page({ }: pageProps) {
    return (
        <div className="flex flex-col lg:flex-row h-[80vh] md:h-[calc(100vh-9rem)] text-primary font-medium">
            <div className="flex-1 lg:flex-[2] 2xl:flex-1 flex flex-col justify-center p-4 gap-4 overflow-y-scroll sm:px-20 lg:p-20 2xl:p-40">
                <div className="relative flex items-center justify-between gap-4">
                    <Image
                        src='/temporary/p1.png'
                        alt=""
                        width={100}
                        height={100}
                    />

                    <div className="">
                        <h2 className="uppercase font-bold text-base sm:text-xl">Sicilian Pizza</h2>
                        <span className="font-normal mb-2">Large</span>
                    </div>

                    <span className="font-bold">R$79,90</span>

                    <X className="cursor-pointer absolute sm:static top-2 right-2 w-4 h-4 sm:w-6 sm:h-6" />
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-4 p-4 bg-red-100/50 sm:px-20 lg:p-20 2xl:p-40 2xl:text-lg">
                <div className="flex justify-between">
                    <span>Subtotal (3 items)</span>
                    <span>R$81,70</span>
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
                    <span>R$81,70</span>
                </div>
                <Button className="uppercase self-end">Checkout</Button>
            </div>
        </div>
    )
}
