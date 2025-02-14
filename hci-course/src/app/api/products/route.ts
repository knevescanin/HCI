import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest){
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '20')
    const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0')
    const storeName = req.nextUrl.searchParams.get('store-name') || 'store_name'
    let sort = req.nextUrl.searchParams.get('sort') || 'name-asc'

    if (sort === 'name-asc') {
        sort = 'name ASC'
    }
    else if (sort === 'price-asc') {
        sort = 'price ASC'
    }
    else if (sort === 'price-desc') {
        sort = 'price DESC'
    }
    else {
        sort = 'name ASC'
    }

    console.log(storeName)
    try {
        const sql = neon(`${process.env.DATABASE_URL}`)
        const products = await sql(`SELECT * FROM products WHERE store_name = ${storeName === 'store_name' ? 'store_name' : `'${storeName}'`} ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset}`)
        
        return NextResponse.json(products)
    }
    catch (error) {
        console.error(error)
        return NextResponse.error()
    }
    
}