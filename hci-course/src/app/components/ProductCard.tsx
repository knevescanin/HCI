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
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
            <div className="w-full h-2/3 mb-4">
            <Image
                src={imageUrl}
                alt="Product"
                className="w-full h-full object-cover"
            />
            </div>
			<h2 className="text-black text-lg">{name}</h2>
			<p className="text-gray-500">{store}</p>
			<p className="text-[#FE7163]">{price} €</p>
		</div>
	)
}
