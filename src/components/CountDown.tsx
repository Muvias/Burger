'use client'

import Countdown from "react-countdown"

const endingDate = new Date('2023-11-23')

export default function CountDown() {
    return (
        <Countdown
            date={endingDate}
            className="text-4xl md:text-5xl font-bold text-yellow-200"
        />
    )
}
