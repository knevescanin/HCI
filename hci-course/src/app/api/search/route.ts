import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log(req.nextUrl.searchParams.get("name"));
    const itemName = req.nextUrl.searchParams.get("name");
    // console.log(itemName);
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const products = await sql(
            `SELECT * FROM products WHERE name LIKE $1`, [`%${itemName}%`]
        );

        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}