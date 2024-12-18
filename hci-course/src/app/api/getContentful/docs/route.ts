import {client} from '../../../utils/contentfulClient'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export async function GET(){

    const entries = await client.getEntries({
        content_type: "docsNavigationPages",
        select: ['fields'],
        order: ['sys.createdAt']
    })

    const navigationsContent = entries.items.map(entry => {
        const path = (entry.fields.path as any)?.path;
        return {header: entry.fields.header, richTextString: documentToHtmlString(entry.fields.content as any), path: path};
    });


    return Response.json(navigationsContent)
}