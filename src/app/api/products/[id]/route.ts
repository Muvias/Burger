import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/utils/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params

    try {
        const product = await prisma.product.findUnique({
            where: {
                id,
            }
        })

        return NextResponse.json(product, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params
    const session = await getAuthSession()

    if (!session?.user.isAdmin) return new Response('Unauthorized', { status: 401 })

    try {
        await prisma.product.delete({
            where: {
                id,
            }
        })

        return NextResponse.json("Produto deletado!", { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 })
    }
}