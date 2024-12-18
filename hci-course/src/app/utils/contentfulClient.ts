import * as contentful from 'contentful'

// contentful client
	let client = contentful.createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	})

export { client }