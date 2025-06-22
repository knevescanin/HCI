'use client'
import { useEffect, useRef, useState } from 'react'
import { categoryMap } from './utils/categoryMap'
import { categoryImages } from './utils/categoryImages'
import { storeImages } from './utils/storeImages'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Home() {
	const categories = Object.keys(categoryMap)
	const [stores, setStores] = useState<{ store_name: string; product_count: number }[]>([])
	const [loadingStores, setLoadingStores] = useState(true)
	const router = useRouter()

	// Scroll refs & state for categories
	const categoryScrollRef = useRef<HTMLDivElement>(null)
	const [catCanScrollLeft, setCatCanScrollLeft] = useState(false)
	const [catCanScrollRight, setCatCanScrollRight] = useState(false)
	const [categoriesCentered, setCategoriesCentered] = useState(false)

	// Scroll refs & state for stores
	const storeScrollRef = useRef<HTMLDivElement>(null)
	const [storeCanScrollLeft, setStoreCanScrollLeft] = useState(false)
	const [storeCanScrollRight, setStoreCanScrollRight] = useState(false)
	const [storesCentered, setStoresCentered] = useState(false)

	useEffect(() => {
		// Fetch stores from API
		setLoadingStores(true)
		fetch('/api/stores')
			.then(res => res.json())
			.then(data => setStores(data))
			.catch(() => setStores([]))
			.finally(() => setLoadingStores(false))
	}, [])

	// Category scroll check & centering
	useEffect(() => {
		const el = categoryScrollRef.current
		if (!el) return
		const checkScroll = () => {
			setCatCanScrollLeft(el.scrollLeft > 0)
			setCatCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
			setCategoriesCentered(el.scrollWidth <= el.clientWidth + 1)
		}
		checkScroll()
		el.addEventListener('scroll', checkScroll)
		window.addEventListener('resize', checkScroll)
		return () => {
			el.removeEventListener('scroll', checkScroll)
			window.removeEventListener('resize', checkScroll)
		}
	}, [categories])

	const scrollCategories = (dir: 'left' | 'right') => {
		const el = categoryScrollRef.current
		if (!el) return
		const amount = el.clientWidth * 0.7
		el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
	}

	// Store scroll check & centering
	useEffect(() => {
		const el = storeScrollRef.current
		if (!el) return
		const checkScroll = () => {
			setStoreCanScrollLeft(el.scrollLeft > 0)
			setStoreCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
			setStoresCentered(el.scrollWidth <= el.clientWidth + 1)
		}
		checkScroll()
		el.addEventListener('scroll', checkScroll)
		window.addEventListener('resize', checkScroll)
		return () => {
			el.removeEventListener('scroll', checkScroll)
			window.removeEventListener('resize', checkScroll)
		}
	}, [loadingStores, stores])

	const scrollStores = (dir: 'left' | 'right') => {
		const el = storeScrollRef.current
		if (!el) return
		const amount = el.clientWidth * 0.7
		el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
	}

	const handleCategoryClick = (cat: string) => {
		router.push(`/search?categories=${encodeURIComponent(cat)}`)
	}

	const handleStoreClick = (storeName: string) => {
		router.push(`/search?stores=${encodeURIComponent(storeName)}`)
	}

	return (
		<>
			<h1 className="text-2xl md:text-4xl font-bold text-[#1A20AB] mt-8 mb-0 text-center">Hop Into A Category!</h1>
			{!categoriesCentered && (
				<p className="text-center text-[#1A20AB]/70 mb-0 text-base md:text-lg">&larr; Swipe to explore &rarr;</p>
			)}
			<div className="relative">
				{catCanScrollLeft && !categoriesCentered && (
					<button
						className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur border border-[#1A20AB]/20 shadow-lg lg:hover:bg-[#e6eaff] lg:hover:shadow-lg lg:hover:border-[#1A20AB] lg:hover:scale-125 active:scale-95 transition-all duration-150 rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center"
						onClick={() => scrollCategories('left')}
						aria-label="Scroll left"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>
				)}
				<div
					ref={categoryScrollRef}
					className={`flex gap-4 py-2 px-2 scrollbar-hide ${categoriesCentered ? 'justify-center' : 'overflow-x-auto'}`}
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
                                lg:min-w-[270px] lg:px-8 lg:py-5 rounded-2xl border border-[#1A20AB]/30 bg-white shadow-md text-[#1A20AB] font-semibold text-xl flex flex-col items-center justify-between transition-all duration-200 lg:hover:bg-[#e6eaff] lg:hover:text-[#1A20AB] lg:hover:shadow-lg lg:hover:border-[#1A20AB] hover:scale-105 active:scale-95`}
						>
							<Image
								src={categoryImages[cat] || '/images/categories/default.png'}
								width={100}
								height={100}
								alt={cat}
								className="my-auto lg:my-0 lg:mb-3 w-16 h-12 sm:w-24 sm:h-16 md:w-36 md:h-24 lg:w-52 lg:h-32 object-contain"
							/>
							<span className='text-sm sm:text-base md:text-2xl'>
								{cat.replace(/_/g, ' ')}
							</span>
						</button>
					))}
				</div>
				{catCanScrollRight && !categoriesCentered && (
					<button
						className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur border border-[#1A20AB]/20 shadow-lg lg:hover:bg-[#e6eaff] lg:hover:shadow-lg lg:hover:border-[#1A20AB] lg:hover:scale-125 active:scale-95 transition-all duration-150 rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center"
						onClick={() => scrollCategories('right')}
						aria-label="Scroll right"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>
				)}
			</div>

			<h1 className="text-2xl md:text-4xl font-bold text-[#1A20AB] mt-24 mb-0 text-center">Where Will You Hop Next?</h1>
			{!storesCentered && (
				<p className="text-center text-[#1A20AB]/70 mb-0 text-base md:text-lg">&larr; Swipe to explore &rarr;</p>
			)}
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
				<div className="relative">
					{storeCanScrollLeft && !storesCentered && (
						<button
							className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur border border-[#1A20AB]/20 shadow-lg lg:hover:bg-[#e6eaff] lg:hover:shadow-lg lg:hover:border-[#1A20AB] lg:hover:scale-125 active:scale-95 transition-all duration-150 rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center"
							onClick={() => scrollStores('left')}
							aria-label="Scroll left"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</button>
					)}
					<div
						ref={storeScrollRef}
						className={`flex xl:mx-auto gap-4 py-4 px-2 scrollbar-hide ${storesCentered ? 'justify-center' : 'overflow-x-auto'}`}
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
                                    rounded-2xl border border-[#1A20AB]/30 bg-white shadow-md text-[#1A20AB] font-semibold text-lg flex flex-col items-center justify-center transition-all duration-200 lg:hover:bg-[#e6eaff] lg:hover:text-[#1A20AB] lg:hover:shadow-lg lg:hover:border-[#1A20AB] hover:scale-105 active:scale-95`}
							>
								<Image
									src={storeImages[store.store_name] || '/images/stores/default.png'}
									width={100}
									height={100}
									alt={store.store_name}
									className="my-auto lg:my-0 lg:mb-3 w-18 h-16 sm:w-24 sm:h-16 md:w-36 md:h-24 lg:w-52 lg:h-32 object-contain"
								/>
								<span className='text-base sm:text-lg md:text-2xl text-center mb-2'>{store.store_name}</span>
								<span className="text-xs sm:text-sm md:text-md text-center text-[#1A20AB]/60">{store.product_count} products</span>
							</div>
						))}
					</div>
					{storeCanScrollRight && !storesCentered && (
						<button
							className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur border border-[#1A20AB]/20 shadow-lg hover:bg-[#e6eaff] hover:shadow-lg hover:border-[#1A20AB] hover:scale-125 active:scale-95 transition-all duration-150 rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center"
							onClick={() => scrollStores('right')}
							aria-label="Scroll right"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</button>
					)}
				</div>
			)}
			<style jsx global>{`
                .scrollbar-hide {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
		</>
	)
}