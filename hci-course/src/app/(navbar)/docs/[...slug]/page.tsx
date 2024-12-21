import { unstable_cache } from 'next/cache'
import {client} from '../../../utils/contentfulClient'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';


async function getCurrentLocation(params: Promise<{ slug: string[] }>) {
	const locations = (await params).slug
	const location = locations.join('/')
	const formattedLocation = '/' + location

	return formattedLocation
}

const getNavigationsContent = unstable_cache(async () => {
	const entries = await client.getEntries({
        content_type: "docsNavigationPages",
        select: ['fields'],
        order: ['sys.createdAt']
    })

    const navigationsContent = entries.items.map(entry => {
        const path = (entry.fields.path as any)?.path;
        return {header: entry.fields.header, richTextString: documentToHtmlString(entry.fields.content as any), path: path};
    });

	return navigationsContent
})

export default async function page({
	params,
}: {
	params: Promise<{ slug: string[] }>
}) {
	const currentLocation = await getCurrentLocation(params)

	const navigationsContent = await getNavigationsContent()

	return (
		<>
			<div
				className="w-full h-max text-white"
				dangerouslySetInnerHTML={{
					__html:
						(await navigationsContent).find(
							(nav) => nav.path === currentLocation
						)?.richTextString || '',
				}}></div>
			<div>Links to next and previous pages</div>
		</>
	)
}
