'use client'
import ProductCard from '@/app/components/ProductCard'
import Pagination from '@/app/components/Pagination'
import Sidebar from '@/app/components/Sidebar'
import { useEffect, useState } from 'react'
import ProductContext from '@/app/contexts/ProductContext'
import CardSkeletonLoader from '@/app/components/UI/CardSkeletonLoader'
import { useSearchParams } from 'next/navigation'

const baseURL = process.env.NEXT_PUBLIC_IS_PROD === "true" ? process.env.NEXT_PUBLIC_API_URL_PROD : process.env.NEXT_PUBLIC_API_URL_DEV

const handleProductFetch = async (
	selectedStores: string[] = [],
	selectedCategories: string[] = [],
	productLimit: number,
	productSort: string,
	offset: number,
	productName?: string | null,
	minPrice?: string,
	maxPrice?: string
) => {
	try {
		const queryParams = new URLSearchParams();

		if (productName) queryParams.append("name", productName);
		if (selectedStores.length > 0) queryParams.append("stores", selectedStores.join(","));
		if (selectedCategories.length > 0) queryParams.append("categories", selectedCategories.join(";"));
		queryParams.append("limit", productLimit.toString());
		queryParams.append("offset", offset.toString());

		// Handle sorting by price or name
		if (productSort === "price-asc") {
			queryParams.append("sort_by_price", "asc");
		} else if (productSort === "price-desc") {
			queryParams.append("sort_by_price", "desc");
		} else if (productSort === "name-asc") {
			queryParams.append("sort_by_name", "asc");
		} else if (productSort === "name-desc") {
			queryParams.append("sort_by_name", "desc");
		} else {
			queryParams.append("sort_by_name", "asc");
		}

		if (minPrice) queryParams.append("min_price", minPrice);
		if (maxPrice) queryParams.append("max_price", maxPrice);



		const res = await fetch(`${baseURL}/search?${queryParams.toString()}`);
		console.log(`${baseURL}/search?${queryParams.toString()}`)
		if (!res.ok) throw new Error("Failed to fetch products");

		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
};



export default function Page() {
	const [products, setProducts] = useState<Record<string, any>[]>([])
	const [productLimit, setProductLimit] = useState(10)
	const [productSort, setproductSort] = useState('name-asc')
	const [offset, setOffset] = useState(0)
	const [selectedStores, setSelectedStores] = useState<string[]>([])
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [loading, setLoading] = useState(true)
	const productName = useSearchParams().get('name') || '';
	const [minPrice, setMinPrice] = useState<string>('0');
	const [maxPrice, setMaxPrice] = useState<string>('0');

	useEffect(() => {
		setLoading(true)
		setOffset(0)
		setProducts([])
		handleProductFetch(selectedStores, selectedCategories, productLimit, productSort, 0, productName, minPrice, maxPrice).then((prods) => {
			setProducts(prods)
			setLoading(false)
		})
	}, [productName, selectedStores, selectedCategories, productLimit, productSort, minPrice, maxPrice])

	useEffect(() => {
		if (offset === 0) return; // Prevent duplicate first fetch
		setLoading(true);
		handleProductFetch(selectedStores, selectedCategories, productLimit, productSort, offset, productName, minPrice, maxPrice).then(
			(prods) => {
				setProducts((prevProducts) => [...prevProducts, ...prods]); // Append new products
				setLoading(false);
			}
		);
	}, [offset]);


	return (
		<>
			{products.length > 0 ? (
				<div className="h-full grid grid-cols-1 md:grid-cols-8 w-full text-white relative bg-white">
					<ProductContext.Provider
						value={{
							products: products,
							productName: productName,
							productLimit: productLimit,
							setProductLimit: setProductLimit,
							productSort: productSort,
							setproductSort: setproductSort,
							offset: offset,
							setOffset: setOffset,
							selectedStores: selectedStores,
							setSelectedStores: setSelectedStores,
							selectedCategories: selectedCategories,
							setSelectedCategories: setSelectedCategories,
							minPrice: minPrice,
							setMinPrice: setMinPrice,
							maxPrice: maxPrice,
							setMaxPrice: setMaxPrice
						}}>
						
						<Sidebar searchQuery={productName} />

						<div className="col-start-2 col-end-9 grid grid-cols-5 gap-3 mx-16 overflow-x-hidden">
							{products.map((product, index) => (
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
			) : (
				<div className='h-full my-auto' >
					{loading ? (
						<div className="col-start-2 col-end-9 grid grid-cols-5 gap-3 mx-16 overflow-x-hidden">
							{Array.from({ length: productLimit }).map((_, index) => (
								<CardSkeletonLoader key={index} />
							))}
						</div>) : (
						<div className='my-auto mx-auto px-10 flex flex-col justify-center items-center'>
							<p className='text-[#1A20AB] text-5xl font-bold text-center'>
								Oops! We couldn't find any products for "{productName}". Please try a different search!
							</p>
						</div>
					)}
				</div>
			)}
		</>
	)
}
