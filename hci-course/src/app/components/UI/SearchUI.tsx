import { useState, useContext } from 'react'
import Image from 'next/image'
import ProductContext from '../../contexts/ProductContext'
import { usePathname } from 'next/navigation';

function SearchUI() {

	const [searchString, setSearchString] = useState('')
	const context = useContext(ProductContext);
	const pathname = usePathname();
	const isFavouritesPage = pathname.includes('favourites');

	const { productName
	} = context;

	return (

		<form
			action={isFavouritesPage ? `/favourites` : `/search?name=${searchString}`}
			method='GET'
			className={`${isFavouritesPage ? 'w-full bg-background mx-auto relative mb-4 ' : ''} 
			${(pathname.includes("search") || pathname === "/") ? 'w-11/12 px-2 bg-background rounded-lg relative mt-14 py-1 md:mt-0 md:px-0 md:py-2 md:w-3/5' : ''}`}>
			<input
				onChange={(e) => setSearchString(e.target.value)}
				type="text"
				placeholder={
					isFavouritesPage
						? 'Search your favourites'
						: (pathname === "/" || pathname.includes("search"))
							? (productName.trim() !== '' ? productName : 'Search for a product and rabbit will try to fetch it...')
							: ''
				}
				className={`
					${(pathname.includes("search") || pathname === "/") ? 'w-full text-sm pl-7 bg-background outline-none font-bold md:w-full md:h-12 md:pl-16 md:pt-1' : ''}
					${isFavouritesPage ? 'w-full text-sm pl-7 py-3 bg-background outline-none font-bold md:w-full md:h-12 md:pl-6 md:pt-auto border-2 border-[#1A20AB] rounded-lg lg:text-xs 2xl:text-sm' : ''}
					`}
				name="name"
				value={searchString}
			/>
			<Image
				src="/search.png"
				alt="Search"
				width={16}
				height={16}
				className={`${(pathname.includes("search") || pathname === "/") ? 'absolute  left-2 md:left-7 top-1/2 transform -translate-y-1/2' : ''}
				${isFavouritesPage ? 'absolute top-1/2 transform -translate-y-1/2 left-2' : ''}
					`}
			/>
		</form>
	)
}

export default SearchUI
