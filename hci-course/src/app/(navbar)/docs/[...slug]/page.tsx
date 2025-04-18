


function slugify(slug: string[]): string {
	return slug.join('/')
}



export default async function Page({
	params,
}: {
	params: Promise<{ slug: string[] }>
}) {
    const slug = slugify((await params).slug)
    
   

    
	

	return <h1>Hello</h1>
}

// // src/app/docs/[...slug]/page.tsx (Example path for catch-all)

// import React from 'react'
// import type { Asset } from 'contentful'
// import {
// 	documentToReactComponents,
// 	Options,
// } from '@contentful/rich-text-react-renderer'
// import { BLOCKS, Document } from '@contentful/rich-text-types'
// import { client } from '../../../../app/utils/contentfulClient' // ADJUST PATH
// import { unstable_cache } from 'next/cache'
// import { notFound } from 'next/navigation'
// import Link from 'next/link'
// import slugify from 'slugify' // INSTALL: npm install slugify @types/slugify
// import Image from 'next/image'

// // Your custom icon component
// import AnchorLinkIcon from '@/app/components/UI/AnchorLinkIcon' // ADJUST PATH

// // Import the full Entry type and Skeleton
// import type {
// 	TypeDocumentationPage,
// 	TypeDocumentationPageSkeleton,
// } from '../../../../../types' // ADJUST PATH

// // --- Data Fetching Function (Corrected) ---
// // Fetches a single documentation page based on its slug string
// const getPageContentBySlug = unstable_cache(
// 	// Return the full Entry object or null
// 	async (
// 		slug: string
// 	): Promise<TypeDocumentationPage<'WITHOUT_UNRESOLVABLE_LINKS'> | null> => {
// 		try {
// 			// Use the Skeleton type in the generic for better type safety
// 			const entries = await client.getEntries<TypeDocumentationPageSkeleton>({
// 				content_type: 'documentationPage', // Content Type ID from Skeleton
// 				'fields.slug': slug, // Filter by the slug field
// 				limit: 1, // Expect only one entry
// 				include: 2, // Include linked assets/entries
// 				// Select can still be used if desired
// 				// select: ['sys', 'fields.title', 'fields.subtitle', 'fields.mainContent', 'fields.slug'],
// 			})

// 			if (entries.items.length === 0) {
// 				return null // Not found
// 			}
// 			// Return the full Entry object
// 			return entries
// 				.items[0] as TypeDocumentationPage<'WITHOUT_UNRESOLVABLE_LINKS'>
// 		} catch (error) {
// 			console.error('Error fetching documentation page from Contentful:', error)
// 			return null // Handle potential fetch errors
// 		}
// 	}
// 	// Optional: Add tags for revalidation if needed: , ['contentful', 'docs']
// )

// // --- Helper Function to Extract Raw Text for Slugify ---
// type RichTextNode = {
// 	nodeType: string
// 	value?: string
// 	content?: RichTextNode[]
// }
// const getRawTextFromNode = (node: RichTextNode): string => {
// 	if (node.nodeType === 'text' && node.value) {
// 		return node.value
// 	}
// 	if (Array.isArray(node.content)) {
// 		return node.content.map(getRawTextFromNode).join('')
// 	}
// 	return ''
// }

// // --- Page Component (Corrected) ---
// export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
// 	// Get the last part of the slug array
// 	const currentSlug = (await params).slug[(await params).slug.length - 1]

// 	// Fetch the full page Entry data
// 	const pageData = await getPageContentBySlug(currentSlug)

// 	// If no page data, trigger 404
// 	if (!pageData) {
// 		notFound()
// 	}

// 	// Destructure fields from the Entry object - types are correct now
// 	const { title, subtitle, mainContent } = pageData.fields

// 	// --- Rich Text Renderer Configuration ---
// 	const options: Options = {
// 		renderNode: {
// 			// Render paragraphs with specific styling
// 			[BLOCKS.PARAGRAPH]: (node, children) => (
// 				<p className="text-textPrimary my-4">{children}</p> // ADJUST STYLING
// 			),
// 			// Custom renderer for H2 elements with anchor links
// 			[BLOCKS.HEADING_2]: (node, children) => {
// 				const headingText = getRawTextFromNode(node as RichTextNode)
// 				const id = slugify(headingText, { lower: true, strict: true })
// 				return (
// 					<h2
// 						className="text-4xl font-bold mb-[32px] mt-[72px]"
// 						id={id}>
// 						{' '}
// 						{/* ADJUST STYLING */}
// 						<Link
// 							href={`#${id}`}
// 							aria-label={`Link to section: ${headingText}`}>
// 							<AnchorLinkIcon />
// 						</Link>
// 						{children}
// 					</h2>
// 				)
// 			},
// 			// // Custom renderer for embedded assets (images) - RE-ADDED
// 			// [BLOCKS.EMBEDDED_ASSET]: (node) => {
// 			// 	const asset = node.data.target as Asset | undefined
// 			// 	if (
// 			// 		!asset?.fields?.file?.url ||
// 			// 		!asset.fields.file.contentType?.startsWith('image/')
// 			// 	) {
// 			// 		return null
// 			// 	}
// 			// 	const { url } = asset.fields.file
// 			// 	const { width, height } = asset.fields.file.details?.image || {}
// 			// 	const altText =
// 			// 		(asset.fields.description as string | undefined) ||
// 			// 		(asset.fields.title as string | undefined) ||
// 			// 		'Content image'
// 			// 	const imageUrl = url.startsWith('//') ? `https:${url}` : url

// 			// 	if (width && height) {
// 			// 		return (
// 			// 			<div className="my-6">
// 			// 				{' '}
// 			// 				{/* ADJUST STYLING */}
// 			// 				<Image
// 			// 					src={imageUrl}
// 			// 					alt={altText}
// 			// 					width={width}
// 			// 					height={height}
// 			// 					className="mx-auto max-w-full h-auto rounded-md shadow-sm" /* ADJUST STYLING */
// 			// 				/>
// 			// 			</div>
// 			// 		)
// 			// 	} else {
// 			// 		console.warn(
// 			// 			`Asset ${asset.sys.id} missing width/height. Using standard <img>.`
// 			// 		)
// 			// 		return (
// 			// 			<img
// 			// 				src={imageUrl}
// 			// 				alt={altText}
// 			// 				loading="lazy"
// 			// 				className="my-6 mx-auto max-w-full h-auto rounded-md shadow-sm" /* ADJUST STYLING */
// 			// 			/>
// 			// 		)
// 			// 	}
// 			// },
// 			// Add other renderers if needed
// 		},
// 	}

// 	return (
// 		// Apply overall page padding/styling
// 		<div className="pl-8 pt-10">
// 			{' '}
// 			{/* ADJUST STYLING */}
// 			{/* Render Title */}
// 			<h1 className="text-5xl font-bold mb-10">{title}</h1>{' '}
// 			{/* ADJUST STYLING */}
// 			{/* Render Subtitle if it exists */}
// 			{subtitle && (
// 				<p className="text-textPrimary my-4">{subtitle}</p> // ADJUST STYLING
// 			)}
// 			{/* Render the main Rich Text content only if it exists */}
// 			{/* Check mainContent before rendering - crucial as it's optional */}
// 			{mainContent &&
// 				documentToReactComponents(mainContent as Document, options)}
// 		</div>
// 	)
// }

// // Optional: Add generateStaticParams if using SSG
// // Adjust logic if slugs can contain '/' and you need full path segments
// // export async function generateStaticParams() {
// //     const entries = await client.getEntries<TypeDocumentationPageSkeleton>({
// //         content_type: 'documentationPage',
// //         select: ['fields.slug']
// //     });
// //
// //     return entries.items
// //         .filter(item => !!item.fields.slug)
// //         .map((item) => ({
// //             // For [...slug], params need to be an array of strings
// //             slug: (item.fields.slug as string).split('/').filter(Boolean),
// //         }));
// // }
