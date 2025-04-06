'use client'
import ProductCard from '@/app/components/ProductCard'
import Pagination from '@/app/components/Pagination'
import Sidebar from '@/app/components/Sidebar'
import { useEffect, useState } from 'react'
import ProductContext from '@/app/contexts/ProductContext'
import { GridProvider } from "@/app/contexts/GridContext";
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
	const [gridColumns, setGridColumns] = useState(2);


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

	const toggleGridColumns = () => {
		setGridColumns((prev) => (prev === 1 ? 2 : 1));
	};


	return (
		<>
			{products.length > 0 ? (
				<GridProvider gridColumns={gridColumns}>
					<div className="min-h-[75vh] 
				md:grid md:grid-cols-8 w-full text-white relative bg-white">
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

							<div className='w-[95vw] flex my-8 mx-auto 
							md:w-[100vw] md:flex md:justify-center md:items-center md:my-8 
							lg:block lg:my-0 lg:w-full'>
								<div className='w-1/2 md:w-auto'>
								<Sidebar searchQuery={productName} />
							</div>

							<button
								className={`md:hidden w-1/2 px-4 py-2 bg-slate-600  rounded-r-lg shadow-xl text-white font-semibold hover:bg-slate-700 transition`}
								onClick={toggleGridColumns}
							>
								{gridColumns === 1 ? '2 Columns' : '1 Column'}
							</button>
							</div>


							<div className={`
						 ${gridColumns === 1 ? 'mx-auto w-full' : 'col-start-2 col-end-9 grid sm:gap-0 overflow-x-hidden grid-cols-2'}
						md:col-start-1 md:col-end-9 md:grid md:grid-cols-3 md:gap-1 md:ml-0 md:w-auto md:my-5
						lg:col-start-2 lg:grid-cols-4 lg:gap-0 lg:ml-16 lg:h-fit
						xl:grid-cols-5 xl:gap-0 xl:ml-3`}>
								{products.map((product, index) => (
									<ProductCard
										key={index}
										name={product.name}
										imageUrl={product.image_url}
										store={product.store_name}
										price={product.price}
									/>
								))}
								<div className='col-span-full w-full flex justify-center mb-5 lg:mb-0 lg:my-auto '>
									<Pagination />
								</div>
							</div>
						</ProductContext.Provider>
					</div>
				</GridProvider>
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
								Oops! We couldn&apos;t find any products for &quot;{productName}&quot;. Please try a different search!
							</p>
						</div>
					)}
				</div>
			)}
		</>
	)
}
