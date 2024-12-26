"use client"

import { createContext } from "react"

const ProductContext = createContext<ProductContext>({products: [], setProductLimit: () => {}})

export default ProductContext