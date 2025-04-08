"use client"

import { createContext } from "react"

const ProductContext = createContext<ProductContext>({
    products: [],
    productName: '',
    setProductLimit: () => { },
    productLimit: 0,
    productSort: '',
    setproductSort: () => { },
    offset: 0,
    setOffset: () => { },
    selectedStores: [],
    setSelectedStores: () => { },
    selectedCategories: [],
    setSelectedCategories: () => { },
    minPrice: '',
    setMinPrice: () => { },
    maxPrice: '',
    setMaxPrice: () => { },
})

export default ProductContext