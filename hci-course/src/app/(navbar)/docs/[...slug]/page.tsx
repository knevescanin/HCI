import { unstable_cache } from 'next/cache'
import { client } from '../../../utils/contentfulClient'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
// import {BLOCKS} from '@contentful/rich-text-types';

const getCurrentLocation = unstable_cache(
	async (params: { slug: string[] }) => {
		const locations = params.slug
		const location = locations.join('/')
		const formattedLocation = '/' + location

		return formattedLocation
	}
)

const getNavigationsContent = unstable_cache(async () => {
	const entries = await client.getEntries({
		content_type: 'docsNavigationPages',
		select: ['fields'],
		order: ['sys.createdAt'],
	})

	const navigationsContent = entries.items.map((entry) => {
		const path = (entry.fields.path as any)?.path
		return {
			header: entry.fields.header,
			richTextString: documentToHtmlString(entry.fields.content as any, {
				preserveWhitespace: true,
			}),
			path: path,
			media: entry.fields.media,
		}
	})

	return navigationsContent
})

export default async function page({
	params,
}: {
	params: Promise<{ slug: string[] }>
}) {
	const parameters = await params
	const currentLocation = await getCurrentLocation(parameters)

	const navigationsContent = await getNavigationsContent()

	return (
		<>
			<div
				className="w-full h-max text-black"
				dangerouslySetInnerHTML={{
					__html:
						navigationsContent.find((nav) => nav.path === currentLocation)
							?.richTextString || '',
				}}>

				</div>

			<img src="" alt="" />
		</>
	)
}
