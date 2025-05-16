import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { categoryMap } from "@/app/utils/categoryMap";

export async function GET(req: NextRequest) {


    try {
        const itemName = req.nextUrl.searchParams.get("name");
        const userId = req.nextUrl.searchParams.get("user_id");
        const stores = req.nextUrl.searchParams.get("stores")?.split(",") || [];
        const minPrice = parseFloat(req.nextUrl.searchParams.get("min_price") || "0");
        const maxPrice = parseFloat(req.nextUrl.searchParams.get("max_price") || "0");
        const filterCategory = req.nextUrl.searchParams.get("categories")?.split(";");
        if (!userId) {
            return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
        }

        const sql = neon(`${process.env.DATABASE_URL}`);
        // Build the query to join favourites and products for the user
        let query = `
            SELECT p.name, p.category, p.store_name, p.price
            FROM "Favourite" f
            JOIN products p ON f."productId" = p.id
            WHERE f."userId" = $1
        `;
        const queryParams: any[] = [userId];
        if (itemName) {
            query += ` AND unaccent(p.name) ILIKE unaccent($${queryParams.length + 1})`;
            queryParams.push(`%${itemName}%`);
        }

        // Add store filter if provided
        if (stores.length > 0 && stores[0] !== "") {
            query += ` AND p.store_name IN (${stores.map((_, idx) => `$${queryParams.length + idx + 1}::TEXT`).join(", ")})`;
            queryParams.push(...stores);
        }

        // Add price range filter if provided
        if (minPrice) {
            query += ` AND p.price >= $${queryParams.length + 1}`;
            queryParams.push(minPrice);
        }
        if (maxPrice) {
            query += ` AND p.price <= $${queryParams.length + 1}`;
            queryParams.push(maxPrice);
        }

        const result = await sql(query, queryParams);

        if (!Array.isArray(result)) {
            return NextResponse.json({ error: "Invalid response from database" }, { status: 500 });
        }

        // Create a reverse lookup map for categories
        const categoryReverseMap: Record<string, string> = {};
        for (const [parentCategory, subcategories] of Object.entries(categoryMap)) {
            subcategories.forEach(sub => {
                categoryReverseMap[sub] = parentCategory;


            });
        }

        const categoryCounts: Record<string, number> = {};
        const filteredProducts: any[] = [];

        result.forEach((row: Record<string, any>) => {
            const category = row.category as string | undefined;
            let matchedCategory = "Ostalo"; // Default to "Ostalo"


            if (category && categoryReverseMap[category]) {
                matchedCategory = categoryReverseMap[category];

            }
            categoryCounts[matchedCategory] = (categoryCounts[matchedCategory] || 0) + 1;
            // If filtering by category, only include relevant products
            if (filterCategory?.length === 0 || filterCategory?.includes(matchedCategory)) {
                filteredProducts.push(row);
            }

        });
        return NextResponse.json({ categoryCounts, favourites: filteredProducts, total: filteredProducts.length });


    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}