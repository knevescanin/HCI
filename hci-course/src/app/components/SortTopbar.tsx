import { useContext } from "react";

import ProductContext from "../contexts/ProductContext";

export default function SortTopbar() {

    const {productLimit, setProductLimit, productFilter, setProductFilter} = useContext(ProductContext)

    return (
        <div className="mx-6 w-full h-16 bg-white flex justify-between items-center col-start-5 col-end-9 row-start-1 row-end-2 self-center text-textPrimary">
            
            <div className="flex items-center">
                <span className="mr-2">Items per page:</span>
                <select value={productLimit} onChange={e => setProductLimit(e.target.value)} className="px-2 py-1 rounded">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            
            <div className="flex items-center">
                <span className="mr-2">Filter by:</span>
                <select value={productFilter} onChange={e => setProductFilter(e.target.value)} className="px-2 py-1 rounded">
                    <option value="name-asc">Name A-Z</option>
                    <option value="price-desc">Price Descending</option>
                    <option value="price-asc">Price Ascending</option>
                    {/* <option value="date-desc">Newest</option>
                    <option value="views-desc">Most Viewed</option> */}
                </select>
            </div>
        </div>
    );
}