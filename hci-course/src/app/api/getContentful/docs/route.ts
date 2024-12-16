import {client} from '../../../utils/contentfulClient'

export async function GET(){

    const entries = await client.getEntries({
        content_type: "docsNavigationPages",
        select: ['fields'],
        order: ['sys.createdAt']
    })

    console.log(entries.items)

    return Response.json({})
}