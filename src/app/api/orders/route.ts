import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getAuthSession()

    if (!session) return new Response('Unauthorized', { status: 401 })

    try {
        if (session.user.isAdmin) {
            const orders = await prisma.order.findMany()

            return NextResponse.json(orders, { status: 200 })
        }

        const orders = await prisma.order.findMany({
            where: {
                userEmail: session.user.email!
            }
        })

        return NextResponse.json(orders, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const session = await getAuthSession()

    if (!session || !session.user) return new Response('Unauthorized', { status: 401 })

    try {
        const body = await req.json()

        const orders = await prisma.order.create({
            data: body
        })

        return NextResponse.json(orders, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 })
    }
}