import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export default function ProductCard({
	name,
	imageUrl,
	store,
	price,
}: {
	name: string
	imageUrl: string
	store: string
	price: number
}) 
{

	const [isFavourite, setIsFavourite] = useState(false)

	function handleOnClick() {
		setIsFavourite(!isFavourite)
		//send to backend
		
	}
    
	return (
        <div className="bg-[#FFFFFF] rounded-xl p-4 m-1 flex flex-col items-center relative w-full h-max hover:shadow-lg transition duration-300 ease-in-out">
            <div className="w-full h-2/3 mb-4 relative">
			{/* show favourite icon if user is logged in, else don't */}
			<FontAwesomeIcon onClick={handleOnClick} icon={isFavourite ? faHeartSolid : faHeartRegular} className="absolute top-2 right-2 text-textPrimary hover:scale-110 hover:cursor-pointer" />
            <Image
				unoptimized
                src={imageUrl}
                alt="Product"
                className="w-full h-full object-cover"
				width={100}
				height={100}
            />
            </div>
			<h2 className="text-textPrimary font-latoBlack text-lg line-clamp-1">{name}</h2>
			<p className="text-gray-500">{store}</p>
			<p className="text-textPrimary font-latoBlack">{price.toFixed(2)} €</p>
		</div>
	)
}
