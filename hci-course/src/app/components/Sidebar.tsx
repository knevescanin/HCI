import { useContext, useEffect, useState } from 'react'

import ProductContext from '../contexts/ProductContext'

export default function Sidebar() {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error('ProductContext is not provided');
    }

    const { productLimit,
        setProductLimit,
        productSort,
        setproductSort,
        selectedStores,
        setSelectedStores,
        selectedCategories,
        setSelectedCategories,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice
    } = context;
    const [stores, setStores] = useState<string[]>([]);
    const [localMinPrice, setLocalMinPrice] = useState(minPrice);
    const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const categories = [
        { name: "Meso" },
        { name: "Voće" },
        { name: "Povrće" },
        { name: "Pekarnica" },
        { name: "Suhomesnati" },
        { name: "Mliječni proizvodi" },
        { name: "Jaja, sirevi i namazi" },
        { name: "Riba" },
        { name: "Bezalkoholna pića" },
        { name: "Alkoholna pića" },
        { name: "Umaci i začini" },
        { name: "Tjestenina, riža i njoki" },
        { name: "Njega i higijena" },
        { name: "Kućni ljubimci" },
        { name: "Konzervirana hrana, juhe, gotova jela" },
        { name: "Zdravo" }
    ];

    const sortOptions = [
        { value: "name-asc", label: "Name A-Z" },
        { value: "name-desc", label: "Name Z-A" },
        { value: "price-desc", label: "Price Descending" },
        { value: "price-asc", label: "Price Ascending" }
    ];

    const itemsPerPageOptions = [10, 20, 50, 100];



    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await fetch('../api/stores'); // Use absolute path
                if (!response.ok) throw new Error('Failed to fetch stores');

                const data = await response.json();
                setStores(data.map((store: { store_name: string }) => store.store_name)); // Correct extraction
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };

        fetchStores();
    }, []);


    const handleStoreChange = (store: string) => {
        setSelectedStores((prev) =>
            prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
        );
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const applyFilters = () => {
        setMinPrice(localMinPrice);
        setMaxPrice(localMaxPrice);
    };

    const defaultPriceRange = () => {
        setLocalMinPrice("0");
        setLocalMaxPrice("0");
        setMinPrice("0");
        setMaxPrice("0");
    };

    const toggleSection = (section: string) => {
        setVisibleSections((prev) => {
          const newVisibleSections = new Set(prev);
          if (newVisibleSections.has(section)) {
            newVisibleSections.delete(section); 
          } else {
            newVisibleSections.add(section); 
          }
          return newVisibleSections;
        });
      };

    return (
        <div className="fixed top-50 flex-row justify-center left-0 bg-white shadow-lg w-max p-4 rounded-lg text-textPrimary md:h-fit">
            <h2 className="text-xl font-semibold text-center mb-4 text-[#1A20AB]">
                Filter Products
            </h2>

            <div className="mb-6">
                <h3 className="font-bold mb-2 cursor-pointer text-[#1A20AB]" onClick={() => toggleSection('categories')}>Categories</h3>
                {visibleSections.has('categories') && (
                <div className="space-y-2">
                    {categories.map((category) => (
                         <div key={category.name} className="flex items-center ml-5">
                         <input
                             type="checkbox"
                             checked={selectedCategories.includes(category.name)}
                             onChange={() => handleCategoryChange(category.name)}
                             className="mr-2"
                         />
                         <label htmlFor={category.name}>{category.name}</label>
                     </div>
                    ))}
                </div>
                )}
            </div>

            <div className="mb-6">
                <h3 className="font-bold mb-2 cursor-pointer text-[#1A20AB]" onClick={() => toggleSection('stores')}>Stores</h3>
                    {visibleSections.has('stores') && (
                        <ul>
                        {stores.map((store) => (
                            <li key={store} className="mb-1 ml-5">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={selectedStores.includes(store)}
                                        onChange={() => handleStoreChange(store)}
                                    />
                                    {store}
                                </label>
                            </li>
                        ))}
                    </ul>
                    )}
            </div>

            <div className="mb-6">
				<div className='flex-row justify-around items-center'>
                <h3 className="font-bold mb-2 cursor-pointer text-[#1A20AB]" onClick={() => toggleSection('priceRange')}>Price Range</h3>
				<h3 className='font-bold mb-2 cursor-pointer text-[#1A20AB]'>+</h3>
				</div>
                {visibleSections.has('priceRange') && (
                    <div>
                        <div className="flex items-center space-x-2 w-full mb-2">
                            <input
                                type="number"
                                step="0.01"
                                value={localMinPrice}
                                onChange={(e) => setLocalMinPrice(e.target.value)}
                                min="0"
                                placeholder="Min"
                                className="w-1/2 px-2 py-1 border rounded"
                            />
                            <span className="text-lg font-semibold">-</span>
                            <input
                                type="number"
                                step="0.01"
                                value={localMaxPrice}
                                onChange={(e) => setLocalMaxPrice(e.target.value)}
                                placeholder="Max"
                                className="w-1/2 px-2 py-1 border rounded"
                            />
                        </div>
                        <button
                            onClick={applyFilters}
                            className="mt-2 px-4 w-full py-2 bg-[#1A20AB] text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Apply
                        </button>

                        <button
                            onClick={defaultPriceRange}
                            className="mt-2 px-4 w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            Reset
                        </button>
                    </div>
                )}
            </div>

            <div className="mb-6">
                <h3 className="font-bold mb-2 cursor-pointer text-[#1A20AB]" onClick={() => toggleSection('sortBy')}>Sort By</h3>
                {visibleSections.has('sortBy') && (
                <select
                    value={productSort}
                    onChange={(e) => setproductSort(e.target.value)}
                    className="px-2 py-1 w-full rounded border"
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                )}
            </div>
            <div className="mb-6">
                <h3 className="font-bold mb-2 cursor-pointer text-[#1A20AB]" onClick={() => toggleSection('itemsPerPage')}>Items Per Page</h3>
                {visibleSections.has('itemsPerPage') && (
                <select
                    value={productLimit}
                    onChange={(e) => setProductLimit(parseInt(e.target.value))}
                    className="px-2 py-1 rounded"
                >
                    {itemsPerPageOptions.map((limit) => (
                        <option key={limit} value={limit}>
                            {limit}
                        </option>
                    ))}
                </select>
                )}
            </div>
        </div>
    )
}

