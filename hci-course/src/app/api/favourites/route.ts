import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { categoryMap } from "@/app/utils/categoryMap";


const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const itemName = req.nextUrl.searchParams.get("name");
        const userId = req.nextUrl.searchParams.get("userId");
        const stores = req.nextUrl.searchParams.get("stores")?.split(",").filter(Boolean) || [];
        const categories = req.nextUrl.searchParams.get("categories")?.split(",").filter(Boolean) || [];
        const minPrice = req.nextUrl.searchParams.get("minPrice");
        const maxPrice = req.nextUrl.searchParams.get("maxPrice");
        const sort = req.nextUrl.searchParams.get("sort") || "name-asc";
        const offset = parseInt(req.nextUrl.searchParams.get("offset") || "0", 10);
        const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);

        const allMappedSubcategories = new Set<string>();
        Object.values(categoryMap).forEach(subs => subs.forEach(sub => allMappedSubcategories.add(sub)));

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        let orderBy: any = {};
        if (sort === "name-asc") orderBy = { product: { name: "asc" } };
        else if (sort === "name-desc") orderBy = { product: { name: "desc" } };
        else if (sort === "price-asc") orderBy = { product: { price: "asc" } };
        else if (sort === "price-desc") orderBy = { product: { price: "desc" } };

        const orConditions: any[] = [];
        const expandedCategories: string[] = [];
        categories.forEach(cat => {
            if (categoryMap[cat]) {
                expandedCategories.push(...categoryMap[cat]);
            } else if (cat !== "Ostalo") {
                expandedCategories.push(cat);
            }
        });
        if (expandedCategories.length > 0) {
            orConditions.push({ category: { in: expandedCategories } });
        }
        if (categories.includes("Ostalo")) {
            orConditions.push({ category: { notIn: Array.from(allMappedSubcategories) } });
        }

        const where: any = {
            userId,
            product: {
                ...(stores.length > 0 && { store_name: { in: stores } }),
                ...(orConditions.length > 0 ? { OR: orConditions } : {}),
                ...(minPrice && { price: { gte: Number(minPrice) } }),
                ...(maxPrice && { price: { lte: Number(maxPrice) } }),
                ...(itemName && { name: { contains: itemName, mode: "insensitive" } }),
            }
        };

        const favourites = await prisma.favourite.findMany({
            where,
            include: {
                product: {
                    select: {
                        name: true,
                        price: true,
                        image_url: true,
                        store_name: true,
                        category: true,
                    }
                }
            },
            orderBy,
            skip: offset,
            take: limit ? limit : undefined,
        });

        const total = await prisma.favourite.count({ where });


        return NextResponse.json({ favourites, total }, { status: 200 });
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