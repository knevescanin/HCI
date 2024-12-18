// interface SubmenuEntry {
//     submenuHeader: string,
//     contentText: string,
//     media: Media[],
//     metadata: Metadata
// }

// interface Media {
//     metadata: {tags: string[], concepts: string[]},
//     sys: {
//         space: Object,
//         id: string,
//         type: string,
//         createdAt: string,
//         updatedAt: string,
//         environment: Object,
//         publishedVersion: number,
//         revision: number,
//         locale: string
//     },
//     fields: {
//         title: string,
//         description: string,
//         file: {
//             url: string,
//             details: {
//                 size: number,
//                 image: {
//                     width: number,
//                     height: number
//                 }
//             },
//             fileName: string,
//             contentType: string
//         }
//     }
// }

// interface Metadata {
//     router: string,
//     navigations: NavigationItem[]
// }

// interface NavigationItem {
//     name: string,
//     route: string
// }

// Submenu component
interface SubmenuProps {
    submenuNavigations: SubmenuNavigation[]
}

interface SubmenuNavigation {
    header: Header,
    navigations: NavigationItem[]
}

interface Header {
    name: string,
    route: string
}

interface NavigationItem {
    name: string,
    route: string
}

// Contentful sections response
interface SectionResponse {
    sectionText: string,
    header: string,
    imageUrl: string
}

interface NavigationsContent {
    header: string,
    richTextString: string,
    path: string
}