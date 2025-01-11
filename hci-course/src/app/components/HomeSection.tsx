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

	
	return (
		<div className={"flex md:mt-40 w-screen md:h-screen md:justify-evenly relative" + `${rightAligned ? "" : " flex-row-reverse"}`}>
			<div><Image unoptimized src={imageUrl} alt="Slika" width={400} height={400}/></div>
			<div className={"flex flex-col items-center w-1/2" + `${rightAligned ? " md:ml-52" : " md:mr-96"}`}>
				
					
					<div className="w-3/4 text-white font-latoRegular text-5xl text-justify">
					<div className="font-latoBlack text-7xl text-white w-full text-left mb-5">{header}</div>
						{sectionText}
					</div>
				
			</div>
		</div>
	) 
}
