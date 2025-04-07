import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { categoryMap } from "@/app/utils/categoryMap";

export async function GET(req: NextRequest) {
    const itemName = req.nextUrl.searchParams.get("name");
    const selectedCategories = req.nextUrl.searchParams.get("categories")?.split(";").filter(Boolean) || [];
    const minPrice = parseFloat(req.nextUrl.searchParams.get("min_price") || "0");
    const maxPrice = parseFloat(req.nextUrl.searchParams.get("max_price") || "0");

    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        let query = `SELECT store_name, COUNT(*) as product_count FROM products WHERE 1=1`;
        const queryParams: any[] = [];

        // Filter by product name
        if (itemName) {
            query += ` AND unaccent(name) ILIKE unaccent($${queryParams.length + 1})`;
            queryParams.push(`%${itemName}%`);
        }


        // Filter by categories
        const categoryConditions: string[] = [];
        const categoryValues: string[] = [];

        selectedCategories.forEach(parentCategory => {
            if (categoryMap[parentCategory]) {
                categoryValues.push(...categoryMap[parentCategory]);
            }
        });

        if (categoryValues.length > 0) {
            const categoryPlaceholders = categoryValues.map((_, index) => `$${queryParams.length + index + 1}`).join(", ");
            categoryConditions.push(`category IN (${categoryPlaceholders})`);
            queryParams.push(...categoryValues);
        }

        if (selectedCategories.includes("Ostalo")) {

            const allMappedCategories = new Set<string>();
            Object.values(categoryMap).forEach(subcategories => {
                subcategories.forEach(subcategory => allMappedCategories.add(subcategory));
            });


            const allCategoriesArray = [...allMappedCategories];
            const allCategoriesPlaceholders = allCategoriesArray
                .map((_, index) => `$${queryParams.length + index + 1}`)
                .join(", ");


            categoryConditions.push(
                `(category IS NULL OR category NOT IN (${allCategoriesPlaceholders}))`
            );
            queryParams.push(...allCategoriesArray);
        }

        if (categoryConditions.length > 0) {
            query += ` AND (${categoryConditions.join(" OR ")})`;
        }



        // Filter by price range
        if (minPrice > 0) {
            query += ` AND price >= $${queryParams.length + 1}`;
            queryParams.push(minPrice);
        }
        if (maxPrice > 0) {
            query += ` AND price <= $${queryParams.length + 1}`;
            queryParams.push(maxPrice);
        }

        query += ` GROUP BY store_name`;


        const stores = await sql(query, queryParams);

        return NextResponse.json(stores);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
