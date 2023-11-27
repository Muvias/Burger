import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params: { intentId } }: { params: { intentId: string } }) {
    try {
        await prisma.order.update({
            where: {
                intent_id: intentId
            },
            data: {
                status: 'Sendo Preparado'
            }
        })

        return NextResponse.json({ message: 'Order has been updated' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong!' }, { status: 500 })
    }
}