export default async function page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	return (
		<>
			<div className="w-full h-max">
				Dynamic page with CMS content for {(await params).slug}
			</div>
			<div>
                Links to next and previous pages
            </div>
		</>
	)
}
