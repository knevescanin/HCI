import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { categoryMap } from "@/app/utils/categoryMap";

export async function GET(req: NextRequest) {
    const itemName = req.nextUrl.searchParams.get("name");
    const stores = req.nextUrl.searchParams.get("stores")?.split(",") || [];
    const rawCategories = req.nextUrl.searchParams.getAll("categories");
    const categories = rawCategories
        .map(decodeURIComponent)
        .map(cat =>
            cat.split(';')
                .map(category => category.trim().replace(/\s+/g, "_"))
        )
        .flat();

    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);
    const offset = parseInt(req.nextUrl.searchParams.get("offset") || "0", 10);

    const sortByPrice = req.nextUrl.searchParams.get("sort_by_price");
    const sortByName = req.nextUrl.searchParams.get("sort_by_name");

    const minPrice = parseFloat(req.nextUrl.searchParams.get("min_price") || "0");
    const maxPrice = parseFloat(req.nextUrl.searchParams.get("max_price") || "0");

    if (!itemName) {
        return NextResponse.json({ error: "Missing product name" }, { status: 400 });
    }

    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        let query = `SELECT * FROM products WHERE 1=1`;
        let countQuery = `SELECT COUNT(*) AS total FROM products WHERE 1=1`;
        const queryParams: any[] = [];

        // Filter by Product Name
        
        if (itemName) {
            query += ` AND unaccent(name) ILIKE unaccent($${queryParams.length + 1})`;
            countQuery += ` AND unaccent(name) ILIKE unaccent($${queryParams.length + 1})`;
            queryParams.push(`%${itemName}%`);
        }


        // Categories filter
        if (categories.length > 0) {
            const categoryValues: string[] = [];
        
            categories.forEach(category => {
                const formattedCategory = category.replace(/\s+/g, "_").replace(/,/g, "");
                if (categoryMap[formattedCategory]) {
                    categoryValues.push(...categoryMap[formattedCategory]);
                }
            });
        
            const allMappedCategories = new Set<string>();
            Object.values(categoryMap).forEach(subcategories => {
                subcategories.forEach(subcategory => allMappedCategories.add(subcategory));
            });
        
            const categoryConditions: string[] = [];
            const localQueryParams: string[] = [];
        
            if (categoryValues.length > 0) {
                categoryConditions.push(
                    `category IN (${categoryValues.map((_, index) => `$${queryParams.length + index + 1}`).join(", ")})`
                );
                localQueryParams.push(...categoryValues);
            }
        
            if (categories.includes("Ostalo")) {
                categoryConditions.push(
                    `(category IS NULL OR category NOT IN (${[...allMappedCategories]
                        .map((_, index) => `$${queryParams.length + localQueryParams.length + index + 1}`)
                        .join(", ")}))`
                );
                localQueryParams.push(...allMappedCategories);
            }
        
            if (categoryConditions.length > 0) {
                query += ` AND (${categoryConditions.join(" OR ")})`;
                countQuery += ` AND (${categoryConditions.join(" OR ")})`;
                queryParams.push(...localQueryParams);
            }
        }
        
        if (categories.includes("Jaja_sirevi_i_namazi")) {
            query += ` AND NOT (category = 'Namazi' AND store_name = 'Konzum')`;
            countQuery += ` AND NOT (category = 'Namazi' AND store_name = 'Konzum')`;
        }

        if (categories.includes("Kućni_ljubimci")) {
            query += ` AND NOT (category = 'Hrana' AND store_name = 'Wolt-Ribola')`;
            countQuery += ` AND NOT (category = 'Hrana' AND store_name = 'Wolt-Ribola')`;
        }



        // Stores filter
        if (stores.length > 0) {
            query += ` AND store_name IN (${stores.map((_, index) => `$${index + queryParams.length + 1}`).join(", ")})`;
            countQuery += ` AND store_name IN (${stores.map((_, index) => `$${index + queryParams.length + 1}`).join(", ")})`;
            queryParams.push(...stores);
        }


        // Price range filter
        if (minPrice > 0 && maxPrice === 0) {
            query += ` AND price > $${queryParams.length + 1}`;
            countQuery += ` AND price > $${queryParams.length + 1}`;
            queryParams.push(minPrice);
        } else if (minPrice === 0 && maxPrice > 0) {
            query += ` AND price < $${queryParams.length + 1}`;
            countQuery += ` AND price < $${queryParams.length + 1}`;
            queryParams.push(maxPrice);
        } else if (minPrice > 0 && maxPrice > 0) {
            query += ` AND price BETWEEN $${queryParams.length + 1} AND $${queryParams.length + 2}`;
            countQuery += ` AND price BETWEEN $${queryParams.length + 1} AND $${queryParams.length + 2}`;
            queryParams.push(minPrice, maxPrice);
        }


        // Sort by (Price / Name)
        if (sortByPrice) {
            query += ` ORDER BY price ${sortByPrice.toUpperCase()} LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
            queryParams.push(limit, offset);
        } else if (sortByName) {
            query += ` ORDER BY name COLLATE "und-x-icu" ${sortByName.toUpperCase()} LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
            queryParams.push(limit, offset);
        }


        const totalProductsResult = await sql(countQuery, queryParams.slice(0, queryParams.length - 2));
        const totalProducts = parseInt(totalProductsResult[0].total, 10);

        const products = await sql(query, queryParams);

        return NextResponse.json({ products, totalProducts });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
