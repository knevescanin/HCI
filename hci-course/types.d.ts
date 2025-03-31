// Submenu component
interface SubmenuProps {
	submenuNavigations: SubmenuNavigation[]
}

interface SidebarProps {
    searchQuery: string;
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
	productName : string
	productLimit: number
	setProductLimit: React.Dispatch<React.SetStateAction<number>>
	productSort: string
	setproductSort: React.Dispatch<React.SetStateAction<string>>
	offset: number
	setOffset: React.Dispatch<React.SetStateAction<number>>
	selectedStores: string[]
	setSelectedStores: React.Dispatch<React.SetStateAction<string[]>>
	selectedCategories: string[];
  	setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
	minPrice: string 
	setMinPrice: React.Dispatch<React.SetStateAction<string>> 
	maxPrice: string 
	setMaxPrice: React.Dispatch<React.SetStateAction<string>>
}
