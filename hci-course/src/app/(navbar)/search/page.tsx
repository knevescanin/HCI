'use client'
import ProductCard from '@/app/components/ProductCard'
import Pagination from '@/app/components/Pagination'
import Sidebar from '@/app/components/Sidebar'
import { useEffect, useState } from 'react'
// import ProductContext from '@/app/contexts/ProductContext'
import { GridProvider } from "@/app/contexts/GridContext";
import CardSkeletonLoader from '@/app/components/UI/CardSkeletonLoader'
import { useSearchParams } from 'next/navigation'
import Grid_1 from '../../../../public/grid.png'
import Grid_2 from '../../../../public/grid-2.png'
import { useSession } from "next-auth/react";
import Image from 'next/image'

export default function Page() {
	const searchParams = useSearchParams();

	const [products, setProducts] = useState<Record<string, any>[]>([])
	const [productLimit, setProductLimit] = useState(10)
	const [productSort, setproductSort] = useState('name-asc')
	const [offset, setOffset] = useState(0)
	const [selectedStores, setSelectedStores] = useState<string[]>(searchParams.get('stores')?.split(',').filter(Boolean) || [])
	const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get('categories')?.split(';').filter(Boolean) || []);
	const productName = useSearchParams().get('name') || '';
	const [minPrice, setMinPrice] = useState<string>('0');
	const [maxPrice, setMaxPrice] = useState<string>('0');
	const [gridColumns, setGridColumns] = useState(2);
	const [totalProducts, setTotalProducts] = useState(0);

	const [loading, setLoading] = useState(true)
	const [paginationLoading, setPaginationLoading] = useState(false);

	const { data: session } = useSession();
	const userId = session?.user?.id;
	const [favourites, setFavourites] = useState<{ id: string; product: { name: string; image_url: string; store_name: string; price: number; }; productId: number; }[]>([]);

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
			if (!res.ok) throw new Error("Failed to fetch products");

			const data = await res.json();
			return data;
		} catch (error) {
			console.error("Error fetching products:", error);
			return { products: [], totalProcuts: 0 };
		}
	};

	useEffect(() => {
		setLoading(true)
		setOffset(0)
		setProducts([])
		handleProductFetch(selectedStores, selectedCategories, productLimit, productSort, 0, productName, minPrice, maxPrice).then((data) => {
			setProducts(data.products);
			setTotalProducts(data.totalProducts);
			setLoading(false)
		})
	}, [productName, selectedStores, selectedCategories, productLimit, productSort, minPrice, maxPrice])

	useEffect(() => {
		if (offset === 0) return; // Prevent duplicate first fetch
		setPaginationLoading(true);
		handleProductFetch(selectedStores, selectedCategories, productLimit, productSort, offset, productName, minPrice, maxPrice).then(
			(data) => {
				setProducts((prevProducts) => [...prevProducts, ...data.products]); // Append new products
				setPaginationLoading(false);
			}
		);
	}, [offset]);

	const resetFilters = () => {
		setSelectedStores([]);
		setSelectedCategories([]);
		setMinPrice('0');
		setMaxPrice('0');
		setProductLimit(10);
		setproductSort('name-asc');
		setOffset(0);
	};

	useEffect(() => {
		if (userId) {
			fetch(`/api/favourites?userId=${userId}&limit=undefined`)
				.then((res) => {
					if (!res.ok) {
						throw new Error(`HTTP error! status: ${res.status}`);
					}
					return res.json();
				})
				.then((data) => { // Debug API response
					setFavourites(data.favourites);
				})
				.catch((error) => console.error("Failed to fetch favourites:", error));
		}
	}, [products.length]);

	function handleToggleFavourite(productId: number, isFavourite: boolean) {

		if (!userId) {
			console.error("User is not logged in");
			alert("Please log in to manage your favourites.");
			return;
		}

		if (isFavourite) {
			// Add to favourites
			fetch("/api/favourites", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId, productId }),
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(`HTTP error! status: ${res.status}`);
					}
					return res.json();
				})
				.then((newFavourite) => {
					setFavourites((prev) => [...prev, newFavourite]);
				})
				.catch((error) => console.error("Failed to add to favourites:", error));
		} else {
			// Remove from favourites
			fetch(`/api/favourites?userId=${userId}&productId=${productId}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(`HTTP error! status: ${res.status}`);
					}
					setFavourites((prev) => prev.filter((fav) => fav.productId !== productId));
				})
				.catch((error) => console.error("Failed to remove from favourites:", error));
		}
	}

	return (
		<>

			<div className="min-h-[75vh] 
				flex flex-col lg:grid lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 w-full text-white relative bg-white">

				<div className='w-[95vw] flex my-5 mx-auto
                md:w-[100vw] md:flex md:justify-center md:items-center
                lg:block lg:my-0 lg:w-full'>
					<div className='w-[100vw] flex flex-row justify-center relative 
					lg:w-auto lg:flex-none lg:justify-normal lg:static'>
						<div className={`${products.length > 0 ? '' : 'w-full'} lg:w-full`}>
							<Sidebar
								searchQuery={productName}
								selectedStores={selectedStores}
								setSelectedStores={setSelectedStores}
								selectedCategories={selectedCategories}
								setSelectedCategories={setSelectedCategories}
								minPrice={minPrice}
								setMinPrice={setMinPrice}
								maxPrice={maxPrice}
								setMaxPrice={setMaxPrice}
								productLimit={productLimit}
								setProductLimit={setProductLimit}
								productSort={productSort}
								setproductSort={setproductSort}
								resetFilters={resetFilters}
							/>
						</div>
						{products.length > 0 ? (
							<div className="absolute top-11 right-0 md:hidden flex flex-row justify-end items-end mb-0 space-x-6 mr-2">
								<div className={`${gridColumns == 2 ? 'hidden' : ''} bg-gray-100 rounded-full shadow-md hover:shadow-md transition-all duration-200 cursor-pointer`}
									onClick={() => setGridColumns(2)}
								>
									<Image
										src={Grid_2.src}
										alt="columns"
										width={18}
										height={18}
										className='hover:scale-110'

									/>
								</div>
								<div className={`${gridColumns == 1 ? 'hidden' : ''} bg-gray-100 rounded-full shadow-md hover:shadow-md transition-all duration-200 cursor-pointer`}
									onClick={() => setGridColumns(1)}>
									<Image
										src={Grid_1.src}
										alt="column"
										width={18}
										height={18}
										className='hover:scale-110'
									/>
								</div>
							</div>
						) : ('')
						}
					</div>
				</div>

				{products.length > 0 ? (
					<GridProvider gridColumns={gridColumns}>
						{/* <ProductContext.Provider
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
								setMaxPrice: setMaxPrice,
							}}> */}

						<div className={`
						 ${gridColumns === 1 ? 'mx-auto w-full' : 'col-start-1 col-end-9 grid gap-0 overflow-x-hidden grid-cols-2'}
						md:col-start-1 md:col-end-9 md:grid md:grid-cols-3 md:w-auto md:my-0
						lg:col-start-2 lg:grid-cols-4 lg:gap-0 lg:ml-3 lg:h-fit lg:my-5
						xl:grid-cols-5 xl:gap-2 xl:ml-2`}>
							{products.map((product, index) => {
								const isFavourite = favourites.some((fav) => fav.productId === product.id);
								return (
									< ProductCard
										key={index}
										name={product.name}
										imageUrl={product.image_url}
										store={product.store_name}
										price={product.price}
										productId={product.id}
										isFavourite={isFavourite}
										onToggleFavourite={handleToggleFavourite}

									/>
								);
							})}
							{offset + productLimit < totalProducts && (
								<div className='col-span-full w-full flex justify-center mb-5 lg:mb-0 lg:my-auto '>
									<Pagination
										offset={offset}
										productLimit={productLimit}
										setOffset={setOffset} />
									loading={paginationLoading}
								</div>
							)}
						</div>

						{/* </ProductContext.Provider> */}
					</GridProvider>
				) : (
					<>
						{loading ? (
							<div className="col-start-2 col-end-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mx-4 sm:mx-8 md:mx-16 overflow-x-hidden">
								{Array.from({ length: productLimit }).map((_, index) => (
									<CardSkeletonLoader key={index} />
								))}
							</div>
						) : (
							<div className='col-start-1 lg:col-start-2 col-end-9 my-auto lg:mx-auto px-8 sm:px-8 md:px-16'>
								<p className='text-[#1A20AB] font-sans text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-center'>
									Oops! We couldn&apos;t find any products for &quot;{productName}&quot;. Please try a different search!
								</p>
							</div>
						)}
					</>
				)}
			</div >
		</>
	)
}
