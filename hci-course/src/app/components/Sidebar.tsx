import { useContext } from 'react'

import ProductContext from '../contexts/ProductContext'

export default function Sidebar() {
	const { productLimit, setProductLimit, productFilter, setProductFilter, storeFilter} =
		useContext(ProductContext)

	return (
		<div className="col-start-1 col-end-2 h-max w-max flex flex-col rounded-lg sticky top-0 text-textPrimary">
			<h2 className="text-xl font-semibold text-center mb-4">
				Filter Products
			</h2>

			<div className="mb-6">
				<input
					type="text"
					placeholder="Search products..."
					className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#630BBD]"
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
					{['Konzum', 'Lidl', 'Spar', 'Plodine'].map((store) => (
						<li className="mb-1" key={store}>
							<label className="flex items-center">
								{/* <input
									type="checkbox"
									className="mr-2"
									checked={storeFilter.includes(store)}
									onChange={(e) => {
										console.log(e.target.checked)
									}}
								/> */}
								<button
									className={`w-full text-left p-2 px-8 rounded-md ${storeFilter.includes(store) ? 'bg-[#FFFFFF] text-black' : 'hover:bg-[#FFFFFF] hover:text-black'}`}
									// onClick={() => {
										
									// }}
								>
									{store}
								</button>
							</label>
						</li>
					))}
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
				<select
					value={productFilter}
					onChange={(e) => setProductFilter(e.target.value)}
					className="px-2 py-1 rounded">
					<option value="name-asc">Name A-Z</option>
					<option value="price-desc">Price Descending</option>
					<option value="price-asc">Price Ascending</option>
					{/* <option value="date-desc">Newest</option>
                    <option value="views-desc">Most Viewed</option> */}
				</select>
			</div>
			<div className="mb-6">
				<h3 className="font-bold mb-2">Items Per Page</h3>
				<select
					value={productLimit}
					onChange={(e) => setProductLimit(parseInt(e.target.value))}
					className="px-2 py-1 rounded">
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>
		</div>
	)
}
