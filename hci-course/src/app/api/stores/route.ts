import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const stores = await sql(`SELECT DISTINCT store_name FROM products`);

        return NextResponse.json(stores);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

