'use client'

import Image from "next/image";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const data = [
    {
        id: 1,
        title: 'Sempre fresco & crocante & quente',
        image: '/slide1.png'
    },
    {
        id: 2,
        title: 'Entregas para São Paulo capital',
        image: '/slide2.png'
    },
    {
        id: 3,
        title: 'A melhor pizza é para compartilhar',
        image: '/slide3.png'
    },
]

export function Slider() {
    const [currentSlide, setCurrentSlide] = useState<number>(2)

    // useEffect(() => {
    //     const interval = setInterval(() => setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)), 5000)

    //     return () => clearInterval(interval)
    // }, [])

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-6.6rem)] font-bold bg-red-50/50">
            <div className="flex flex-col flex-1 items-center justify-center gap-8 text-center overflow-hidden">
                <h2 className="text-primary text-4xl sm:text-5xl md:text-6xl xl:text-7xl p-4 md:p-10 uppercase">
                    {data[currentSlide].title}
                </h2>

                <Button className="text-xl rounded-sm p-6 sm:p-8 font-bold">Pedir agora</Button>
            </div>

            <div className="flex-1 relative">
                <Image
                    src={data[currentSlide].image}
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    )
}
