import { useState } from 'react'
import Image from 'next/image'

function SearchUI() {

    const [searchString, setSearchString] = useState('')


	return (
		<form
			action="/search"
			method="get"
			className="pr-2 py-2 mt-10 bg-background rounded-md w-3/5 relative">
			<input
				onChange={(e) => setSearchString(e.target.value)}
				type="text"
				placeholder="Search for product and rabbit will try to fetch it..."
				className="w-full h-12 pl-16 pt-1 pr-3 bg-background outline-none font-bold"
				name="name"
				value={searchString}
			/>
			<Image
				src="/search.png"
				alt="Search"
				width={16}
				height={16}
				className="absolute left-7 top-1/2 transform -translate-y-1/2"
			/>
		</form>
	)
}

export default SearchUI
