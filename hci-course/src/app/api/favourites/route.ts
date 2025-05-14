import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        const favourites = await prisma.favourite.findMany({
            where: { userId },
            include: {
                product: {
                    select: {
                        name: true,
                        price: true,
                        image_url: true,
                        store_name: true
                    }
                }
            }
        });

        return NextResponse.json(favourites, { status: 200 });
    } catch (error) {
        console.error("Error fetching favourites:", error);
        return NextResponse.json({ error: "Failed to fetch favourites" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId, productId } = await req.json();

        if (!userId || !productId) {
            return NextResponse.json({ error: "Missing userId or productId" }, { status: 400 });
        }

        const favourite = await prisma.favourite.create({
            data: {
                userId,
                productId,
            },
        });

        return NextResponse.json(favourite, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to add to favourites" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        const productId = req.nextUrl.searchParams.get("productId");

        if (!userId || !productId) {
            return NextResponse.json({ error: "Missing userId or productId" }, { status: 400 });
        }

        await prisma.favourite.deleteMany({
            where: { userId, productId: Number(productId) },
        });

        return NextResponse.json({ message: "Favourite removed" }, { status: 200 });
    } catch (error) {
        console.error("Error removing favourite:", error);
        return NextResponse.json({ error: "Failed to remove favourite" }, { status: 500 });
    }
}