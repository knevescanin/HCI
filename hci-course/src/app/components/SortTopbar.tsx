import { useContext } from "react";

import ProductContext from "../contexts/ProductContext";

export default function SortTopbar() {

    const {productLimit, setProductLimit} = useContext(ProductContext)

    

    return (
        <div className="mx-6 w-full h-16 bg-white flex justify-between items-center col-start-2 col-end-9 row-start-1 row-end-2 self-center">
            <div className="flex space-x-4">
                <button className="px-4 py-2 bg-gray-500 rounded">Option 1</button>
                <button className="px-4 py-2 bg-gray-500 rounded">Option 2</button>
                <button className="px-4 py-2 bg-gray-500 rounded">Option 3</button>
            </div>
            <div className="flex items-center space-x-2">
                <span>Items shown:</span>
                <select value={productLimit} onChange={e => setProductLimit(e.target.value)} className="px-2 py-1 bg-gray-500 rounded">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
    );
}