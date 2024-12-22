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
	const pageSize = 10
    const [paginatedProducts, setPaginatedProducts] = useState(paginate(products, currentPage, pageSize))

	const onPageChange = (page: number) => {
		setCurrentPage(page)
	}

    useEffect(() => {
        setPaginatedProducts(paginate(products, currentPage, pageSize))
    }, [currentPage, products])
        

	return (
		<div className="grid grid-cols-8 gap-11 w-[80%] h-max mx-auto p-4 text-white">
			<Sidebar />
            <div className="col-span-6 bg-[#630BBD] p-4 grid grid-cols-4 gap-3 overflow-y-auto rounded-xl">
				{/* Product Boxes */}

				{paginatedProducts.map((product) => (
					<ProductCard
						key={product.id}
						name={product.name}
						imageUrl={product.image_url}
						store={product.store}
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
