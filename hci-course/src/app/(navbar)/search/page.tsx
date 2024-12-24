import { unstable_cache } from 'next/cache'
import { neon } from '@neondatabase/serverless'

import ProductCard from '@/app/components/ProductCard'
import Pagination from '@/app/components/Pagination'

const fetchProducts = unstable_cache(
	async () => {
		const sql = neon(`${process.env.DATABASE_URL}`)
		const products = await sql(`SELECT * FROM products LIMIT 100`)

		return products
	},
	[''],
	{ revalidate: 3600 }
)

export default async function Page() {
	const products = await fetchProducts()

	return (
		<>
			<div className="row-start-1 row-end-2 col-start-2 col-end-9 grid grid-cols-3 gap-3 mx-16 overflow-x-hidden">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						name={product.name}
						imageUrl={product.image_url}
						store={product.store_name}
						price={product.price}
					/>
				))}
				
			</div>
			<Pagination />
		</>
	)
}
