import { useEffect, useState } from 'react'
import FiltersIcon from '../../../public/Filters.png'
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";

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
    refreshKey,
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
    refreshKey?: number;
}) {

    const [stores, setStores] = useState<{ store_name: string; product_count: number }[]>([]);
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
    const [categories, setCategories] = useState<Record<string, number>>({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const pathname = usePathname();
    const isFavouritesPage = pathname.includes('favourites');
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const sortOptions = [
        { value: "name-asc", label: "Name A-Z" },
        { value: "name-desc", label: "Name Z-A" },
        { value: "price-desc", label: "Price Descending" },
        { value: "price-asc", label: "Price Ascending" }
    ];
    const itemsPerPageOptions = [10, 20, 50, 100];

    useEffect(() => {
        if (isFavouritesPage && !userId) return;
        const queryParams = new URLSearchParams();

        if (isFavouritesPage && userId)
            queryParams.append("user_id", userId);

        if (searchQuery)
            queryParams.append("name", searchQuery);

        if (selectedCategories.length > 0)
            queryParams.append("categories", selectedCategories.join(";"));

        if (minPrice)
            queryParams.append("min_price", minPrice);

        if (maxPrice)
            queryParams.append("max_price", maxPrice);

        if (selectedStores.length > 0)
            queryParams.append("stores", selectedStores.join(","));

        const fetchCategories = async () => {
            let endpoint = "../api/categories";
            if (isFavouritesPage) {
                endpoint = "../api/favourites_categories";
            }
            const response = await fetch(`${endpoint}?${queryParams.toString()}`);
            const data = await response.json();
            setCategories(data.categoryCounts);

        };

        fetchCategories();
    }, [searchQuery, selectedStores, selectedCategories, minPrice, maxPrice, isFavouritesPage, userId, refreshKey]);



    useEffect(() => {
        const fetchStores = async () => {
            try {
                if (isFavouritesPage && !userId) return;
                const queryParams = new URLSearchParams();

                if (searchQuery)
                    queryParams.append("name", searchQuery);

                if (isFavouritesPage && userId)
                    queryParams.append("user_id", userId);

                if (selectedCategories.length > 0)
                    queryParams.append("categories", selectedCategories.join(";"));

                if (selectedStores.length > 0)
                    queryParams.append("stores", selectedStores.join(","));

                if (minPrice)
                    queryParams.append("min_price", minPrice);

                if (maxPrice)
                    queryParams.append("max_price", maxPrice);

                let endpoint = "/api/stores";
                if (isFavouritesPage) {
                    endpoint = "/api/favourites_stores";
                }

                const response = await fetch(`${endpoint}?${queryParams.toString()}`);
                if (!response.ok) throw new Error('Failed to fetch stores');

                const data = await response.json();
                setStores(data);

            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };

        fetchStores();
    }, [searchQuery, selectedCategories, selectedStores, minPrice, maxPrice, isFavouritesPage, userId, refreshKey]);


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
            <div className="lg:hidden flex flex-row items-center space-x-2 p-3 bg-gray-100 rounded-full shadow-md hover:scale-105 transition-all duration-100 cursor-pointer"
                onClick={toggleSidebar}>
                <div className="
                lg:hidden">
                    <img
                        src={FiltersIcon.src}
                        alt="Filters Icon"
                    />
                </div>
                <p className='text-[#1A20AB] font-sans font-semibold lg:hidden'>Filters</p>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div className={`fixed top-0 left-0 w-3/5 h-full p-4 rounded-r-lg text-textPrimary z-50 transition-transform transform
            ${isSidebarOpen ? 'bg-white text-[#1A20AB] translate-x-0 overflow-y-auto' : '-translate-x-full'} 
            lg:bg-white lg:sticky lg:bg-transparent lg:translate-x-0 lg:min-w-[180px] lg:w-full lg:h-auto lg:max-h-full lg:mt-5
            2xl:min-w-[200px] 2xl:w-full`}>

                <div className="mb-6">
                    <h3 className="font-bold 2xl:text-lg mb-2 cursor-pointer text-[#1A20AB] font-sans flex justify-between" onClick={() => toggleSection('categories')}>Categories <span className="transition duration-200 ease-in-out my-auto">{visibleSections.has('categories') ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1A20AB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1A20AB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>}</span></h3>
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
                    <h3 className="font-bold 2xl:text-lg mb-2 cursor-pointer text-[#1A20AB] font-sans flex justify-between" onClick={() => toggleSection('stores')}>Stores <span className="transition duration-200 ease-in-out my-auto">{visibleSections.has('stores') ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1A20AB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1A20AB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>}</span></h3>
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
                        <h3 className="font-bold 2xl:text-lg mb-2 cursor-pointer text-[#1A20AB] font-sans flex justify-between" onClick={() => toggleSection('priceRange')}>Price Range <span className="transition duration-200 ease-in-out my-auto">{visibleSections.has('priceRange') ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1A20AB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1A20AB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>}</span></h3>
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
                    <h3 className="font-bold 2xl:text-lg mb-2 cursor-pointer text-[#1A20AB] font-sans flex justify-between" onClick={() => toggleSection('sortBy')}>Sort By</h3>
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
                </div>
                <div className="mb-6">
                    <h3 className="font-bold 2xl:text-lg mb-2 cursor-pointer text-[#1A20AB] font-sans flex justify-between" onClick={() => toggleSection('itemsPerPage')}>Items Per Page</h3>
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

