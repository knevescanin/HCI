'use client'
import ProductCard from '@/app/components/ProductCard'
import Pagination from '@/app/components/Pagination'
import Sidebar from '@/app/components/Sidebar'
import { useEffect, useState } from 'react'
import ProductContext from '@/app/contexts/ProductContext'
import CardSkeletonLoader from '@/app/components/UI/CardSkeletonLoader'

const handleProductFetch = async (
  productLimit: number,
  productFilter: string
) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL_DEV +
        `/products?limit=${productLimit}&offset=0&sort=${productFilter}`
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
  const [productFilter, setProductFilter] = useState('default')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    handleProductFetch(productLimit, productFilter).then((products) => {
      setProducts(products)
      setLoading(false)
    })
  }, [productLimit, productFilter])

  return (
    <div className="grid grid-cols-8 w-full h-max text-white relative bg-white">
      <ProductContext.Provider
        value={{
          products: products,
          productLimit: productLimit,
          setProductLimit: setProductLimit,
          productFilter: productFilter,
          setProductFilter: setProductFilter,
        }}
      >
        <Sidebar />

        <div className="col-start-2 col-end-9 grid grid-cols-3 gap-3 mx-16 overflow-x-hidden">
		  {loading ? (
			Array.from({ length: productLimit }).map((_, index) => (
			  <CardSkeletonLoader key={index} />
			))
		  ) : (
			products.map((product) => (
			  <ProductCard
				key={product.id}
				name={product.name}
				imageUrl={product.image_url}
				store={product.store_name}
				price={product.price}
			  />
			))
		  )}
        </div>
        <Pagination />
      </ProductContext.Provider>
    </div>
  )
}