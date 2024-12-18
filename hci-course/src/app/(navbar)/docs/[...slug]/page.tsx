export default async function page({
	params
}: {
	params: Promise<{ slug: string[] }>
}) {

	async function getCurrentLocatin(){
		const locations = (await params).slug;
		const location = locations.join('/')
		const formattedLocation = '/' + location;
		
		return formattedLocation;
	}

	const currentLocation = await getCurrentLocatin();

	async function getNavigationsContent(){
	
			const res = await fetch(process.env.NEXT_PUBLIC_IS_PROD === "true" ? `${process.env.NEXT_PUBLIC_API_URL_PROD}/getContentful/docs` : `${process.env.NEXT_PUBLIC_API_URL_DEV}/getContentful/docs`)
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			
			const data = await res.json()
			return data;
		}
	
		const navigationsContent: Promise<NavigationsContent[]> = getNavigationsContent()



	return (
		<>
			<div className="w-full h-max text-white" dangerouslySetInnerHTML={{__html: (await navigationsContent).find(nav => nav.path === currentLocation)?.richTextString || ''}}>
				
			</div>
			<div>
                Links to next and previous pages
            </div>
		</>
	)
}
