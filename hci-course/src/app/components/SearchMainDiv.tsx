'use client'

import Sidebar from '@/app/components/SearchSidebar/Sidebar'
import SortTopbar from './SortTopbar'
import ProductContext from '../contexts/ProductContext'
import { useEffect, useState } from 'react'

const handleProductFetch = async (productLimit: number) => {
	const res = await fetch(
		process.env.NEXT_PUBLIC_API_URL_DEV + `/products?limit=${productLimit}&offset=0`
	)
	const data = await res.json()
	const products = data

	return products
}

export default function SearchMainDiv({
	children,
}: {
	children: React.ReactNode
}) {
	const [products, setProducts] = useState<Record<string, any>[]>([])
	const [productLimit, setProductLimit] = useState(20)

	useEffect(() => {
		handleProductFetch(productLimit).then((products: Record<string, any>[]) => {
			setProducts(products)
			console.log(products)
		})
	}, [productLimit])

	return (
		<div className="grid grid-cols-8 w-full h-max text-white relative bg-white">
			<ProductContext.Provider value={{products: products, productLimit: productLimit, setProductLimit: setProductLimit}}>
				<Sidebar />
				<SortTopbar />
				{children}
			</ProductContext.Provider>
		</div>
	)
}
