'use client'

import Sidebar from '@/app/components/SearchSidebar/Sidebar'
import SortTopbar from './SortTopbar'
import ProductContext from '../contexts/ProductContext'

export default function SearchMainDiv({
	children,
	products,
}: {
	children: React.ReactNode
	products: Record<string, any>[]
}) {
	return (
		<div className="grid grid-cols-8 w-full h-max text-white relative bg-white">
			<ProductContext.Provider value={products}>
				<Sidebar />
				<SortTopbar />
				{children}
			</ProductContext.Provider>
		</div>
	)
}
