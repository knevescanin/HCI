import {client} from '../../../utils/contentfulClient'

export async function GET(){
    const entries = await client.getEntries({
        content_type: 'homeSections',
        select: ['fields'],
        order: ['sys.createdAt']
    })

    const section = entries.items.map(entry => new Object({sectionText: entry.fields.sectionText, header: entry.fields.header}))
    
    
    return Response.json(section)
}   