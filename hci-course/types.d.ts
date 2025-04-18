import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeDocumentationPageFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    subtitle?: EntryFieldTypes.Symbol;
    mainContent?: EntryFieldTypes.RichText;
}

export type TypeDocumentationPageSkeleton = EntrySkeletonType<TypeDocumentationPageFields, "documentationPage">;
export type TypeDocumentationPage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeDocumentationPageSkeleton, Modifiers, Locales>;

// Submenu component
interface SubmenuProps {
	submenuNavigations: SubmenuNavigation[]
}

interface SubmenuNavigation {
	header: Header
	navigations: NavigationItem[]
	icon: Icon
}

interface Header {
	name: string
	route: string
}

interface NavigationItem {
	name: string
	route: string
}

interface Icon {
    name: string
    color: string
}

// Contentful sections response
interface Section {
	sectionText: string
	header: string
	imageUrl: string
}

interface NavigationsContent {
	header: string
	richTextString: string
	path: string
}

interface ProductCard {
	id: number
	name: string
	imageUrl: string
	store: string
	price: number
}

// Context types
interface ProductContext {
	products: Record<string, any>[]
	productLimit: number
	setProductLimit: React.Dispatch<React.SetStateAction<number>>
	productFilter: string
	setProductFilter: React.Dispatch<React.SetStateAction<string>>
	offset: number
	setOffset: React.Dispatch<React.SetStateAction<number>>
	storeFilter: string
	setStoreFilter: React.Dispatch<React.SetStateAction<string>>
}
