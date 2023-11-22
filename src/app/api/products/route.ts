import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const categorie = searchParams.get('cat')

    try {
        const products = await prisma.product.findMany({
            where: {
                ...(categorie ? {
                    categorySlug: categorie
                } : {
                    isFeatured: true
                })
            }
        })

        return new NextResponse(JSON.stringify(products), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }), { status: 500 })
    }
}