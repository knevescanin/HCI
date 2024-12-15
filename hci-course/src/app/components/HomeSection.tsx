export default function HomeSection({
	sectionText,
	header,
	rightAligned = false,
}: {
	sectionText: Promise<string>
	header: Promise<string>
	rightAligned?: boolean
}) {
	return rightAligned ? (
		<>
			<div>Section image</div>
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
			<div>Section image</div>
		</>
	)
}
