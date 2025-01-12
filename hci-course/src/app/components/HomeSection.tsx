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
		<div className={"flex flex-col items-center md:flex-row mb-20 md:mb-0 mt-20 md:mt-0 w-screen md:h-screen md:justify-evenly relative" + `${rightAligned ? "" : " md:flex-row-reverse"}`}>
			<div className="relative h-[170px] w-[170px] md:w-[400px] md:h-[400px] mb-4 md:mb-0"><Image unoptimized src={imageUrl} alt="Slika" fill={true} /></div>
			<div className={"flex flex-col items-center w-1/2" + `${rightAligned ? " md:ml-52" : " md:mr-52"}`}>
				
					
					<div className=" md:w-3/4 text-white font-latoRegular text-xl md:text-5xl text-center md:text-justify">
					<div className="font-latoBlack text-4xl md:text-7xl text-white w-full text-center md:text-left mb-5">{header}</div>
						{sectionText}
					</div>
				
			</div>
		</div>
	) 
}