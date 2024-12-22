'use client'

import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'
import { paginate } from '@/app/components/Pagination'
import Sidebar from '@/app/components/SearchSidebar/Sidebar'
import ProductCard from '@/app/components/ProductCard'

export default function SearchMainDiv({
	products,
}: {
	products: Record<string, any>[]
}) {
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 12
    const [paginatedProducts, setPaginatedProducts] = useState(paginate(products, currentPage, pageSize))

	const onPageChange = (page: number) => {
		setCurrentPage(page)
	}

    useEffect(() => {
        setPaginatedProducts(paginate(products, currentPage, pageSize))
    }, [currentPage, products])
        

	return (
		<div className="grid grid-cols-8 grid-rows-1 w-full h-max text-white relative bg-white">
			<Sidebar />
            <div className="row-start-1 row-end-2 col-start-2 col-end-9 grid grid-cols-5 gap-3 overflow-y-auto mx-16">
				{/* Product Boxes */}

				{paginatedProducts.map((product) => (
					<ProductCard
						key={product.id}
						name={product.name}
						imageUrl={product.image_url}
						store={product.store_name}
						price={product.price}
					/>
				))}
			</div>

			<Pagination
				numOfProducts={products.length}
				currentPage={currentPage}
				pageSize={pageSize}
				onPageChange={onPageChange}
			/>
		</div>
	)
}
