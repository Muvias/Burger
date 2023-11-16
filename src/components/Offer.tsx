import Image from "next/image";
import CountDown from "./CountDown";
import { Button } from "./ui/button";

export function Offer() {
    return (
        <section className="flex flex-col md:flex-row h-screen md:h-[70vh] bg-black text-white md:bg-[url('/offerBg.png')]">
            <div className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-12 px-8 xl:px-20 text-center">
                <h2 className="mt-6 text-4xl sm:text-5xl xl:text-6xl font-extrabold">Deliciosos Hambúrgueres & Batatas Fritas</h2>

                <p className="leading-relaxed xl:text-xl">Simplifique progressivamente varejistas eletrônicos eficazes e métodos de capacitação centrados em processos. Pontifique rapidamente em paralelo.</p>

                <CountDown />

                <Button className="text-lg md:text-xl p-6">Pedir Agora</Button>
            </div>

            <div className="relative flex-1">
                <Image
                    src='/offerProduct.png'
                    alt=""
                    fill
                    className="object-contain"
                />
            </div>
        </section>
    )
}
