import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function POST(
    request: NextRequest,
    { params: { orderId } }: { params: { orderId: string } }
) {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
    })

    if (order) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100 * 100,
            currency: "brl",
            automatic_payment_methods: {
                enabled: true,
            },
        })

        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                intent_id: paymentIntent.id
            }
        })

        return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 })
    }

    return NextResponse.json({ message: "Order not found!" }, { status: 404 })
}