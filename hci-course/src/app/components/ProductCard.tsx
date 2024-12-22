import Image from "next/image"

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
    
	return (
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative w-full h-max">
            <div className="w-full h-2/3 mb-4">
            <Image
				unoptimized
                src={imageUrl}
                alt="Product"
                className="w-full h-full object-cover"
				width={100}
				height={100}
            />
            </div>
			<h2 className="text-textPrimary text-lg line-clamp-1">{name}</h2>
			<p className="text-gray-500">{store}</p>
			<p className="text-green-600">{price.toFixed(2)} €</p>
		</div>
	)
}
