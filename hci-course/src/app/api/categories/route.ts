import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { categoryMap } from "@/app/utils/categoryMap";

export async function GET(req: NextRequest) {
    const itemName = req.nextUrl.searchParams.get("name");
    const stores = req.nextUrl.searchParams.get("stores")?.split(",") || [];
    const minPrice = parseFloat(req.nextUrl.searchParams.get("min_price") || "0");
    const maxPrice = parseFloat(req.nextUrl.searchParams.get("max_price") || "0");
    const filterCategory = req.nextUrl.searchParams.get("category"); // New: Get the category filter

    if (!itemName) {
        return NextResponse.json({ error: "Missing product name" }, { status: 400 });
    }

    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        // Start with the base query to search for products by name
        let query = `SELECT name, category, store_name, price FROM products WHERE name ILIKE $1`;
        const queryParams: any[] = [`%${itemName}%`]; // Start with product name as the filter

        // Add store filter if provided
        if (stores.length > 0) {
            query += ` AND store_name IN (${stores.map((_, i) => `$${queryParams.length + 2}`).join(", ")})`;
            queryParams.push(...stores);
        }

        // Add price range filter if provided
        if (minPrice) {
            query += ` AND price >= $${queryParams.length + 1}`;
            queryParams.push(minPrice);
        }
        if (maxPrice) {
            query += ` AND price <= $${queryParams.length + 1}`;
            queryParams.push(maxPrice);
        }

        // Execute the query
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
            if (!filterCategory || filterCategory === matchedCategory) {
                filteredProducts.push(row);
            }
        });

        return NextResponse.json({ categoryCounts, products: filteredProducts });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
