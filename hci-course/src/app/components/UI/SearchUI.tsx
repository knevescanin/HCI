import { useState, useContext } from 'react'
import Image from 'next/image'
import ProductContext from '../../contexts/ProductContext'

function SearchUI() {

	const [searchString, setSearchString] = useState('')
	const context = useContext(ProductContext);

	const { productName
	 } = context;

	return (
		<form 
			action={`/search?name=${searchString}`}
			method='GET'
			className="w-3/6 px-2 bg-background rounded-lg relative mt-14 py-1 md:mt-0 md:px-0 md:py-2 md:w-3/5 ">
			<input
				onChange={(e) => setSearchString(e.target.value)}
				type="text"
				placeholder={
					productName.trim() !== '' // Check if productName is not empty
					  ? productName // Show productName if not empty
					  : 'Search for a product and rabbit will try to fetch it...' // Default placeholder
				  }
				className="w-full text-sm pl-7 bg-background outline-none font-bold md:w-full md:h-12 md:pl-16 md:pt-1"
				name="name"
				value={searchString}
			/>
			<Image
				src="/search.png"
				alt="Search"
				width={16}
				height={16}
				className="absolute  left-2 md:left-7 top-1/2 transform -translate-y-1/2"
			/>
		</form>
	)
}

export default SearchUI
