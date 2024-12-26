"use client"
import ProductCard from '@/app/components/ProductCard'
import Pagination from '@/app/components/Pagination'

import { useContext } from 'react'
import ProductContext from '@/app/contexts/ProductContext'


export default function Page() {
	
const {products} = useContext(ProductContext)

	return (
		<>	
			<div className="col-start-2 col-end-9 grid grid-cols-3 gap-3 mx-16 overflow-x-hidden">
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
