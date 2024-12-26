import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest){
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '20')
    const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0')

    try {
        const sql = neon(`${process.env.DATABASE_URL}`)
        const products = await sql(`SELECT * FROM products LIMIT $1 OFFSET $2`, [limit, offset])

        return NextResponse.json(products)
    }
    catch (error) {
        console.error(error)
        return NextResponse.error()
    }
    
}