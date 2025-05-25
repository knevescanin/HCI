'use client'
import { useEffect, useState } from 'react'
import { categoryMap } from './utils/categoryMap'
import { categoryImages } from './utils/categoryImages'
import { storeImages } from './utils/storeImages'
import { useRouter } from 'next/navigation'

export default function Home() {
	const categories = Object.keys(categoryMap)
	const [stores, setStores] = useState<{ store_name: string; product_count: number }[]>([])
	const [loadingStores, setLoadingStores] = useState(true)
	const router = useRouter()

	useEffect(() => {
		// Fetch stores from API
		setLoadingStores(true)
		fetch('/api/stores')
			.then(res => res.json())
			.then(data => setStores(data))
			.catch(() => setStores([]))
			.finally(() => setLoadingStores(false))
	}, [])

	const handleCategoryClick = (cat: string) => {
		router.push(`/search?categories=${encodeURIComponent(cat)}`)
	}

	const handleStoreClick = (storeName: string) => {
		router.push(`/search?stores=${encodeURIComponent(storeName)}`)
	}

	return (
		<>
			<h1 className="text-2xl md:text-4xl font-bold text-[#1A20AB] mt-8 mb-0 text-center">Hop Into A Category!</h1>
			<p className="text-center text-[#1A20AB]/70 mb-0 text-base md:text-lg">Swipe to explore &rarr;</p>
			<div
				className="flex overflow-x-auto gap-4 py-2 px-2 scrollbar-hide mb-20"
				style={{
					WebkitOverflowScrolling: 'touch'
				}}
			>
				{categories.map((cat) => (
					<button
						key={cat}
						onClick={() => handleCategoryClick(cat)}
						className={`
						min-w-[170px] py-4 px-6
						sm:min-w-[180px] sm:px-6 sm:py-4 sm:text-lg
						md:min-w-[220px] md:px-8 md:py-5 md:text-xl
						lg:min-w-[270px] lg:px-8 lg:py-5 rounded-2xl border border-[#1A20AB]/30 bg-white shadow-md text-[#1A20AB] font-semibold text-xl flex flex-col items-center justify-between transition-all duration-200 hover:bg-[#1A20AB] hover:text-white hover:scale-105 active:scale-95`}
					>
						<img
							src={categoryImages[cat] || '/images/categories/default.png'}
							alt={cat}
							className="my-auto lg:my-0 lg:mb-3 w-16 h-12 sm:w-24 sm:h-16 md:w-36 md:h-24 lg:w-52 lg:h-32 object-contain"
						/>
						<span className='text-sm sm:text-base md:text-2xl'>
							{cat.replace(/_/g, ' ')}
						</span>
					</button>
				))}
			</div>

			<h1 className="text-2xl md:text-4xl font-bold text-[#1A20AB] mt-4 mb-0 text-center">Where Will You Hop Next?</h1>
			<p className="text-center xl:hidden text-[#1A20AB]/70 mb-0 text-base md:text-lg">Swipe to explore &rarr;</p>
			{loadingStores ? (
				<div className="flex justify-center items-center py-10 w-full">
					<div
						className="animate-spin rounded-full h-12 w-12 border-t-4 border-r-4"
						style={{
							borderTopColor: '#1A20AB',
							borderRightColor: '#1A20AB',
							borderBottomColor: 'transparent',
							borderLeftColor: 'transparent',
						}}
					></div>
				</div>
			) : (
				<div
					className="flex xl:mx-auto overflow-x-auto gap-4 py-4 px-2 scrollbar-hide"
					style={{
						WebkitOverflowScrolling: 'touch'
					}}
				>
					{stores.map((store) => (
						<div
							key={store.store_name}
							onClick={() => handleStoreClick(store.store_name)}
							className={`group min-w-[170px] py-4 px-6
						sm:min-w-[160px] sm:px-6 sm:py-4 sm:text-lg
						md:min-w-[220px] md:px-8 md:py-5 md:text-xl
						lg:min-w-[270px] lg:px-8 lg:py-5
						rounded-2xl border border-[#1A20AB]/30 bg-white shadow-md text-[#1A20AB] font-semibold text-lg flex flex-col items-center justify-center transition-all duration-200 hover:bg-[#1A20AB] hover:text-white hover:scale-105 active:scale-95`}
						>
							<img
								src={storeImages[store.store_name] || '/images/stores/default.png'}
								alt={store.store_name}
								className="my-auto lg:my-0 lg:mb-3 w-18 h-16 sm:w-24 sm:h-16 md:w-36 md:h-24 lg:w-52 lg:h-32 object-contain"
							/>
							<span className='text-base sm:text-lg md:text-2xl text-center mb-2'>{store.store_name}</span>
							<span className="text-xs sm:text-sm md:text-md text-center text-[#1A20AB]/60 group-hover:text-white">{store.product_count} products</span>
						</div>
					))}
				</div >
			)}
			< style jsx global>{`
                .scrollbar-hide {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style >
		</>
	)
}