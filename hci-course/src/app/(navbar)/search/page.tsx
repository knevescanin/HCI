import { unstable_cache } from 'next/cache'
import ProductCard from '@/app/components/ProductCard'

const fetchProducts = unstable_cache(async () => {
	const res = await fetch(
		'https://my-json-server.typicode.com/knevescanin/HCI/products'
	)
	const data = await res.json()
	return data
}, [""], { revalidate: 3600})

export default function Page() {
	const products: Promise<ProductCard[]> = fetchProducts()

	return (
		<div className="grid grid-cols-8 gap-11 w-[80%] h-max mx-auto p-4 text-white">
			<div className="col-span-2 bg-[#630BBD] h-max flex flex-col p-4 rounded-lg">
				<h2 className="text-xl font-semibold text-center mb-4">
					Filter Products
				</h2>

				<div className="mb-6">
					<input
						type="text"
						placeholder="Search products..."
						className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#630BBD] text-[#630BBD]"
					/>
				</div>

				<div className="mb-6">
					<h3 className="font-bold mb-2">Categories</h3>
					<ul>
						<li className="mb-1">
							<button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">
								Fruits
							</button>
						</li>
						<li className="mb-1">
							<button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">
								Vegetables
							</button>
						</li>
						<li className="mb-1">
							<button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">
								Dairy
							</button>
						</li>
						<li className="mb-1">
							<button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">
								Bakery
							</button>
						</li>
					</ul>
				</div>

				<div className="mb-6">
					<h3 className="font-bold mb-2">Stores</h3>
					<ul>
						<li className="mb-1">
							<button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">
								Konzum
							</button>
						</li>
						<li className="mb-1">
							<button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">
								Lidl
							</button>
						</li>
						<li className="mb-1">
							<button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">
								Spar
							</button>
						</li>
						<li className="mb-1">
							<button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">
								Plodine
							</button>
						</li>
					</ul>
				</div>

				<div className="mb-6">
					<h3 className="font-bold mb-2">Price Range</h3>
					<input
						type="range"
						min="0"
						max="1000"
						step="1"
						className="w-full"
					/>
					<div className="flex justify-between text-sm mt-2">
						<span>0 €</span>
						<span>1000 €</span>
					</div>
				</div>

				<div className="mb-6">
					<h3 className="font-bold mb-2">Sort By</h3>
					<select className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
						<option value="low-high">Price: Low to High</option>
						<option value="high-low">Price: High to Low</option>
					</select>
				</div>
			</div>

			<div className="col-span-6 bg-[#630BBD] p-4 grid grid-cols-4 gap-3 overflow-y-auto rounded-xl">
				{/* Product Boxes */}

				{products.then((products) =>
					products.map((product) => (
						<ProductCard
							key={product.id}
							name={product.name}
							imageUrl={product.imageUrl}
							store={product.store}
							price={product.price}
						/>
					))
				)}
			</div>
		</div>
	)
}
