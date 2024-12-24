import SearchMainDiv from "@/app/components/SearchMainDiv";

import { unstable_cache } from 'next/cache'
import { neon } from '@neondatabase/serverless'

const fetchProducts = unstable_cache(
	async () => {
		const sql = neon(`${process.env.DATABASE_URL}`)
		const products = await sql(`SELECT * FROM products LIMIT 100`)

		return products
	},
	[''],
	{ revalidate: 3600 }
)


export default async function SearchLayout({children} : {
    children: React.ReactNode
}) {

    const products = await fetchProducts()

    return (
        
        <SearchMainDiv products={products}> 
            {children}
        </SearchMainDiv>
    );
}