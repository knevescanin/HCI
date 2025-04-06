import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useGridContext } from "@/app/contexts/GridContext";

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
}) {

	const [isFavourite, setIsFavourite] = useState(false)
	const { gridColumns } = useGridContext();

	function handleOnClick() {
		setIsFavourite(!isFavourite)
		//send to backend

	}

	return (
		<div className={`${gridColumns === 1 ? 'mb-4 shadow-md' : 'shadow-md mb-7'}
		group bg-[#FFFFFF] rounded-xl border shadow-lg mx-auto lg:mx-0  flex flex-col items-center justify-between relative w-11/12 h-[250px] sm:h-[400px] hover:shadow-xl transition duration-300 ease-in-out`}>
			<div className="w-full aspect-[4/3] sm:aspect-[3/3] mb-0 relative overflow-hidden rounded-md">
				{/* show favourite icon if user is logged in, else don't */}
				<FontAwesomeIcon
					onClick={handleOnClick}
					icon={isFavourite ? faHeartSolid : faHeartRegular}
					className="absolute top-2 right-2 text-textPrimary hover:scale-110 hover:cursor-pointer z-10"
				/>
				<Image
					unoptimized
					src={imageUrl}
					alt="Product"
					className="w-full h-full object-scale-down lg:object-cover xl:object-contain lg:p-1"
					fill
				/>
			</div>


			<div className="px-2 py-2 flex flex-col justify-between flex-grow w-full items-center group-hover:rounded-b-xl group-hover:bg-slate-300 group-hover:bg-opacity-40 transition duration-300 ease-in-out">

				<h2 className={`${gridColumns === 1 ? 'text-md' : 'text-sm'}
				text-textPrimary font-sans font-bold sm:text-lg md:text-xl  lg:text-lg flex flex-wrap text-center line-clamp-1 px-1`}>{name}</h2>
				<div className="flex flex-col items-center justify-end ">
					<p className="text-gray-500 font-sans font-semibold font italic">{store}</p>
					<p className="text-[#1A20AB] font-sans font-bold">{price} €</p>
				</div>
			</div>
		</div>
	)
}
