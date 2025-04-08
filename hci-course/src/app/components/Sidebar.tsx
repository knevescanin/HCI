import { useEffect, useState } from 'react'




export default function Sidebar({
    searchQuery,
    selectedStores,
    setSelectedStores,
    selectedCategories,
    setSelectedCategories,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    productLimit,
    setProductLimit,
    productSort,
    setproductSort,
    resetFilters,
}: {
    searchQuery: string;
    selectedStores: string[];
    setSelectedStores: React.Dispatch<React.SetStateAction<string[]>>;
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    minPrice: string;
    setMinPrice: React.Dispatch<React.SetStateAction<string>>;
    maxPrice: string;
    setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
    productLimit: number;
    setProductLimit: React.Dispatch<React.SetStateAction<number>>;
    productSort: string;
    setproductSort: React.Dispatch<React.SetStateAction<string>>;
    resetFilters: () => void;
}) {

    const [stores, setStores] = useState<{ store_name: string; product_count: number }[]>([]);
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const [categories, setCategories] = useState<Record<string, number>>({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sortOptions = [
        { value: "name-asc", label: "Name A-Z" },
        { value: "name-desc", label: "Name Z-A" },
        { value: "price-desc", label: "Price Descending" },
        { value: "price-asc", label: "Price Ascending" }
    ];

    const itemsPerPageOptions = [10, 20, 50, 100];


    useEffect(() => {
        if (!searchQuery) return;
        const queryParams = new URLSearchParams();

        if (searchQuery)
            queryParams.append("name", searchQuery);

        if (minPrice)
            queryParams.append("min_price", minPrice);

        if (maxPrice)
            queryParams.append("max_price", maxPrice);

        if (selectedStores.length > 0)
            queryParams.append("stores", selectedStores.join(","));

        const fetchCategories = async () => {
            console.log("I'm here!")
            const response = await fetch(`../api/categories?${queryParams.toString()}`);
            const data = await response.json();
            setCategories(data.categoryCounts);
        };

        fetchCategories();
    }, [searchQuery, selectedStores, minPrice, maxPrice]);



    useEffect(() => {
        const fetchStores = async () => {
            try {

                const queryParams = new URLSearchParams();

                if (searchQuery)
                    queryParams.append("name", searchQuery);

                if (selectedCategories.length > 0)
                    queryParams.append("categories", selectedCategories.join(";"));

                if (minPrice)
                    queryParams.append("min_price", minPrice);

                if (maxPrice)
                    queryParams.append("max_price", maxPrice);

                const response = await fetch(`/api/stores?${queryParams.toString()}`);
                if (!response.ok) throw new Error('Failed to fetch stores');

                const data = await response.json();
                setStores(data);
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };

        fetchStores();
    }, [searchQuery, selectedCategories, minPrice, maxPrice]);


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

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
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
        <>
            <button
                className="sticky w-full bg-[#1A20AB] text-white font-semibold px-4 py-2 shadow-xl rounded-lg
                md:w-auto md:top-auto md:left-auto  
                lg:hidden"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? 'Close Filters' : 'Open Filters'}
            </button>


            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div className={`fixed top-0 left-0 w-3/5 h-full p-4 rounded-r-lg text-textPrimary z-50 transition-transform transform
            ${isSidebarOpen ? 'bg-white text-[#1A20AB] translate-x-0 overflow-y-auto' : '-translate-x-full'} 
            lg:bg-white lg:sticky lg:bg-transparent lg:translate-x-0 lg:min-w-[180px] lg:w-full lg:h-auto lg:max-h-full
            2xl:min-w-[200px] 2xl:w-full`}>
                {/* <h2 className="text-4xl font-semibold text-center mb-4 text-white lg:text-[#1A20AB]">
                    Filters
                </h2> */}

                <div className="mb-6">
                    <h3 className="font-bold 2xl:text-lg mb-2 cursor-pointer text-[#1A20AB] font-sans flex justify-between" onClick={() => toggleSection('categories')}>Categories <span className=' transition duration-300 ease-in-out'>{visibleSections.has('categories') ? '-' : '+'}</span></h3>
                    {visibleSections.has('categories') && (
                        <div className="space-y-2">
                            {categories && Object.entries(categories).length > 0 ? (
                                Object.entries(categories).map(([category, count]) => (
                                    <div key={category} className="flex items-center ml-2 font-sans italic">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={category}>
                                            {category.replace(/_/g, ' ')} ({count})
                                        </label>
                                    </div>
                                ))
                            ) : ('')}
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <h3 className="font-bold 2xl:text-lg mb-2 cursor-pointer text-[#1A20AB] font-sans flex justify-between" onClick={() => toggleSection('stores')}>Stores <span className=' transition duration-300 ease-in-out'>{visibleSections.has('stores') ? '-' : '+'}</span></h3>
                    {visibleSections.has('stores') && (
                        <ul>
                            {stores.map((store) => (
                                <li key={store.store_name} className="mb-1 ml-2 font-san italic">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={selectedStores.includes(store.store_name)}
                                            onChange={() => handleStoreChange(store.store_name)}
                                        />
                                        {store.store_name} ({store.product_count})
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mb-6">
                    <div className='flex-row justify-around items-center'>
                        <h3 className="font-bold 2xl:text-lg mb-2 cursor-pointer text-[#1A20AB] font-sans flex justify-between" onClick={() => toggleSection('priceRange')}>Price Range <span className=' transition duration-300 ease-in-out'>{visibleSections.has('priceRange') ? '-' : '+'}</span></h3>
                    </div>
                    {visibleSections.has('priceRange') && (
                        <div>
                            <div className="flex items-center space-x-2 w-full mb-2 font-sans">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    min="0"
                                    placeholder="Min"
                                    className="w-1/2 px-2 py-1 border rounded text-black font-sans"
                                />
                                <span className="2xl:text-lg font-semibold">-</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder="Max"
                                    className="w-1/2 px-2 py-1 border rounded text-black font-sans"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <h3 className="font-bold 2xl:text-lg mb-2 cursor-pointer text-[#1A20AB] font-sans flex justify-between" onClick={() => toggleSection('sortBy')}>Sort By <span className=' transition duration-300 ease-in-out'>{visibleSections.has('sortBy') ? '-' : '+'}</span></h3>
                    {visibleSections.has('sortBy') && (
                        <select
                            value={productSort}
                            onChange={(e) => setproductSort(e.target.value)}
                            className="px-2 py-1 w-full rounded border text-black font-sans"
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
                    <h3 className="font-bold 2xl:text-lg mb-2 cursor-pointer text-[#1A20AB] font-sans flex justify-between" onClick={() => toggleSection('itemsPerPage')}>Items Per Page <span className=' transition duration-300 ease-in-out'>{visibleSections.has('itemsPerPage') ? '-' : '+'}</span></h3>
                    {visibleSections.has('itemsPerPage') && (
                        <select
                            value={productLimit}
                            onChange={(e) => setProductLimit(parseInt(e.target.value))}
                            className="px-2 py-1 rounded text-black font-sans"
                        >
                            {itemsPerPageOptions.map((limit) => (
                                <option key={limit} value={limit}>
                                    {limit}
                                </option>
                            ))}
                        </select>
                    )}

                </div>

                <button
                    onClick={resetFilters}
                    className="mt-2 px-4 w-full py-2 bg-gray-500 text-white font-sans font-semibold rounded-lg hover:bg-gray-600 transition"
                >
                    Reset
                </button>
            </div>
        </>
    )
}

