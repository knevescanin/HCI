'use client'
import ProductCard from '@/app/components/ProductCard'
import Pagination from '@/app/components/Pagination'
import Sidebar from '@/app/components/Sidebar'
import { useEffect, useState } from 'react'
import ProductContext from '@/app/contexts/ProductContext'
import CardSkeletonLoader from '@/app/components/UI/CardSkeletonLoader'
import { useSearchParams } from 'next/navigation'

const baseURL = process.env.NEXT_PUBLIC_IS_PROD === "true" ?  process.env.NEXT_PUBLIC_API_URL_PROD : process.env.NEXT_PUBLIC_API_URL_DEV

const handleProductFetch = async (
// 	productLimit: number,
// 	productFilter: string,
// 	offset?: number,
//   storeName?: string,
  productName?: string | null
) => {
	
	try {
		const res = await fetch(
			baseURL +
				`/search?name=${productName}`
		)
		const data = await res.json()
		const products = data

		return products
	} catch (error) {
		console.error(error)
		return []
	}
}

export default function Page() {
	const [products, setProducts] = useState<Record<string, any>[]>([])
	const [productLimit, setProductLimit] = useState(10)
	const [productFilter, setProductFilter] = useState('name-asc')
	const [offset, setOffset] = useState(0)
  const [storeFilter, setStoreFilter] = useState('store_name') // Defaults to showing every store
  // const [productName, setProductName] = useState('')
	const [loading, setLoading] = useState(true)
	const productName = useSearchParams().get('name')

	useEffect(() => {
		setLoading(true)
	setOffset(0)
	setProducts([])
		handleProductFetch(productName).then((prods) => {
	  setProducts(prods)
			setLoading(false)
		})
	}, [productLimit, productFilter])

	useEffect(() => {
		setLoading(true)
		handleProductFetch(productName).then((prods) => {
			setProducts(products.concat(prods))
			setLoading(false)
		})
	}, [offset])

	return (
		<div className="grid grid-cols-8 w-full h-max text-white relative bg-white">
			<ProductContext.Provider
				value={{
					products: products,
					productLimit: productLimit,
					setProductLimit: setProductLimit,
					productFilter: productFilter,
					setProductFilter: setProductFilter,
					offset: offset,
					setOffset: setOffset,
          storeFilter: storeFilter,
          setStoreFilter: setStoreFilter
				}}>
				<Sidebar />

				<div className="col-start-2 col-end-9 grid grid-cols-5 gap-3 mx-16 overflow-x-hidden">
					{loading
						? Array.from({ length: productLimit }).map((_, index) => (
								<CardSkeletonLoader key={index} />
						  ))
						: products.map((product, index) => (
								<ProductCard
									key={index}
									name={product.name}
									imageUrl={product.image_url}
									store={product.store_name}
									price={product.price}
								/>
						  ))}
				</div>
				<Pagination />
			</ProductContext.Provider>
		</div>
	)
}
