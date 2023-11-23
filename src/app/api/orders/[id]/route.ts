import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params

    try {
        const body = await req.json()

        await prisma.order.update({
            where: {
                id,
            },
            data: {
                status: body
            }
        })

        return NextResponse.json({ message: 'Os status foram atualizados!' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 })
    }
}