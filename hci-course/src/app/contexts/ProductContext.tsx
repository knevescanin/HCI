"use client"

import { createContext } from "react"

const ProductContext = createContext<Record<string, any>[]>([])

export default ProductContext