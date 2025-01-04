"use client"

import { createContext } from "react"

const ProductContext = createContext<ProductContext>({products: [], setProductLimit: () => {}, productLimit: 0, productFilter: '', setProductFilter: () => {}, offset: 0, setOffset: () => {}})

export default ProductContext