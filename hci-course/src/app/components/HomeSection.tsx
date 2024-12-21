"use client"

import Image from "next/image"

export default function HomeSection({
	sectionText,
	header,
	rightAligned = false,
	imageUrl
}: {
	sectionText: string
	header: string
	rightAligned?: boolean,
	imageUrl: string
}) {

	
	return rightAligned ? (
		<>
			<div><Image unoptimized src={imageUrl} alt="Slika" width={300} height={300}/></div>
			<div className="flex flex-col align-middle w-1/2">
				<div className="font-latoBlack text-5xl text-white text-center">{header}</div>
				<div className="w-1/2 text-white font-latoRegular text-4xl text-justify">
					{sectionText}
				</div>
			</div>
		</>
	) : (
		<>
			<div className="flex flex-col align-middle w-1/2">
				<div className="font-latoBlack text-5xl text-white text-center">{header}</div>
				<div className="w-1/2 text-white font-latoRegular text-4xl text-justify">
					{sectionText}
				</div>
			</div>
			<div><Image unoptimized src={imageUrl} alt="Slika" width={300} height={300}/></div>
		</>
	)
}
