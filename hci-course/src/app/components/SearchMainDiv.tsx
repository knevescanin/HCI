'use client'

import Sidebar from '@/app/components/Sidebar'
import ProductContext from '../contexts/ProductContext'
import { useEffect, useState } from 'react'

const handleProductFetch = async (productLimit: number, productFilter: string) => {
	try {

		const res = await fetch(
			process.env.NEXT_PUBLIC_API_URL_DEV + `/products?limit=${productLimit}&offset=0&sort=${productFilter}`
		)
		const data = await res.json()
		const products = data
	
		return products
	}
	catch (error) {
		console.error(error)
		return []
	}
}


export default function SearchMainDiv({
	children,
}: {
	children: React.ReactNode
}) {
	const [products, setProducts] = useState<Record<string, any>[]>([])
	const [productLimit, setProductLimit] = useState(20)
	const [productFilter, setProductFilter] = useState('name-asc')

	useEffect(() => {
		handleProductFetch(productLimit, productFilter).then((products: Record<string, any>[]) => {
			setProducts(products)
			console.log(products)
		})
	}, [productLimit, productFilter])


	return (
		<div className="grid grid-cols-8 w-full h-max text-white relative bg-white">
			<ProductContext.Provider value={{products: products, productLimit: productLimit, setProductLimit: setProductLimit, productFilter: productFilter, setProductFilter: setProductFilter}}>
				<Sidebar />
				{children}
			</ProductContext.Provider>
		</div>
	)
}
