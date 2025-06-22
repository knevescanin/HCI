import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { useGridContext } from "@/app/contexts/GridContext";
import { useSession } from "next-auth/react";

export default function ProductCard({
	name,
	imageUrl,
	store,
	price,
	productId,
	isFavourite,
	onToggleFavourite,
}: {
	name: string
	imageUrl: string
	store: string
	price: number
	productId: number
	isFavourite: boolean
	onToggleFavourite: (productId: number, isFavourite: boolean) => void;
}) {

	const { gridColumns } = useGridContext();
	const { data: session } = useSession();
	const userId = session?.user?.id;

	function handleOnClick() {

		if (!userId) {
			alert("Please log in to add this product to your favourites.");
			return;
		}
		onToggleFavourite(productId, !isFavourite);
	}

	return (
		<div className={`${gridColumns === 1 ? 'mb-6 shadow-md' : 'shadow-md mb-6'}
		group bg-[#FFFFFF] rounded-xl border shadow-lg mx-auto flex flex-col items-stretch relative w-11/12 h-[250px] md:h-[360px] lg:h-[360px] xl:h-[390px] 
		md:mb-6 lg:my-3 transition duration-300 ease-in-out lg:hover:shadow-lg lg:hover:border-[#1A20AB] lg:hover:scale-105 active:scale-95`}>
			<div className="w-full aspect-[4/3] sm:aspect-[3/3] mb-0 relative overflow-hidden rounded-md">
				{/* show favourite icon if user is logged in, else don't */}
				<FontAwesomeIcon
					onClick={handleOnClick}
					icon={isFavourite ? faHeartSolid : faHeartRegular}
					className="absolute top-2 right-2 text-pink-500 transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer z-10 text-lg md:text-xl"
				/>
				<Image
					unoptimized
					src={imageUrl}
					alt="Product"
					className="object-scale-down lg:object-cover 2xl:object-scale-down lg:p-5 lg:group-hover:scale-105 transition-transform duration-300 ease-in-out"
					fill

				/>
			</div>


			<div className="flex flex-col justify-between items-center w-full px-3 py-3 transition-all duration-200 lg:group-hover:bg-[#e6eaff] lg:group-hover:text-[#1A20AB] group-hover:rounded-b-xl flex-grow">

				<h2 className={`${gridColumns === 1 ? 'text-md' : 'text-sm'}
				text-gray-800 font-sans font-semibold sm:text-lg md:text-xl lg:text-lg xl:text-lg 2xl:text-lg flex flex-wrap text-center px-1`}>{name}</h2>
				<div className="flex flex-col items-center justify-end ">
					<p className="text-gray-500 font-sans font-medium font italic">{store}</p>
					<p className="text-[#1A20AB] group-hover:shadow-2xl font-sans font-extrabold sm:text-lg md:text-xl lg:text-lg xl:text-lg 2xl:text-lg mt-3">{price} €</p>
				</div>
			</div>
		</div>
	)
}
