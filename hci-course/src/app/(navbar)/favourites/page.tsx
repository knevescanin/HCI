'use client'
import ProductCard from "@/app/components/ProductCard";
import { GridProvider } from "@/app/contexts/GridContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation'
import Sidebar from "@/app/components/Sidebar";
import CardSkeletonLoader from "@/app/components/UI/CardSkeletonLoader";
import Grid_1 from '../../../../public/grid.png'
import Grid_2 from '../../../../public/grid-2.png'
import { useRouter } from 'next/navigation';


export default function Page() {

    const [favourites, setFavourites] = useState<{ id: string; product: { name: string; image_url: string; store_name: string; price: number; }; productId: number; }[]>([]);
    const [total, setTotal] = useState(0);
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [gridColumns, setGridColumns] = useState(2);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const router = useRouter();

    // Sidebar
    const [sort, setproductSort] = useState("name-asc");
    const [selectedStores, setSelectedStores] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [productName, setProductName] = useState<string>(useSearchParams().get('name') || '')

    useEffect(() => {
        if (userId) {
            setLoading(true)
            const params = new URLSearchParams();
            if (productName) params.append("name", productName)
            if (userId) params.append("userId", userId);
            if (sort) params.append("sort", sort);
            if (selectedStores.length > 0) params.append("stores", selectedStores.join(","));
            if (selectedCategories.length > 0) params.append("categories", selectedCategories.join(","));
            if (minPrice) params.append("minPrice", minPrice);
            if (maxPrice) params.append("maxPrice", maxPrice);

            fetch(`/api/favourites?${params.toString()}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    setFavourites(data.favourites);
                    setTotal(data.total);
                    setLoading(false);
                })
                .catch((error) => console.error("Failed to fetch favourites:", error));


        }
    }, [userId, productName, sort, selectedStores, selectedCategories, minPrice, maxPrice]);

    function handleToggleFavourite(productId: number, isFavourite: boolean) {
        if (isFavourite) {
            fetch("/api/favourites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, productId }),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((newFavourite) => {
                    setFavourites((prev) => [...prev, newFavourite]);
                })
                .catch((error) => console.error("Failed to add to favourites:", error));
        } else {
            // Remove from favourites
            fetch(`/api/favourites?userId=${userId}&productId=${productId}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    setFavourites((prev) => prev.filter((fav) => fav.productId !== productId));
                    setTotal(data.total);
                    setRefreshKey(prev => prev + 1);
                })

                .catch((error) => console.error("Failed to remove from favourites:", error));
        }
    }

    const resetFilters = () => {
        setSelectedStores([]);
        setSelectedCategories([]);
        setMinPrice('');
        setMaxPrice('');
        setproductSort('name-asc');
        setFavourites([]);
        if (productName) {
            setProductName('');
            router.push('/favourites');
        }
    }

    return (

        <div className="min-h-[80vh] flex flex-col lg:grid lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 w-full text-white relative bg-white">


            <div className='w-[95vw] flex my-5 mx-auto
                md:w-[100vw] md:flex md:justify-center md:items-center
                lg:block lg:my-0 lg:w-full'>
                <div className='w-[100vw] flex flex-row justify-center relative 
					lg:w-auto lg:flex-none lg:justify-normal lg:static'>
                    <div className={`${favourites.length > 0 ? '' : 'w-full'} lg:w-full`}>
                        <Sidebar
                            searchQuery={productName}
                            selectedStores={selectedStores}
                            setSelectedStores={setSelectedStores}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            minPrice={minPrice}
                            setMinPrice={setMinPrice}
                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}
                            productLimit={0}
                            setProductLimit={() => { }}
                            productSort={sort}
                            setproductSort={setproductSort}
                            resetFilters={resetFilters}
                            refreshKey={refreshKey}
                        />
                    </div>
                    {favourites.length > 0 ? (
                        <div className="absolute top-11 right-0 md:hidden flex flex-row justify-end items-end mb-0 space-x-6 mr-2">
                            <div className='bg-gray-100 rounded-full shadow-md hover:shadow-md transition-all duration-200 cursor-pointer'
                                onClick={() => setGridColumns(2)}
                            >
                                <img
                                    src={Grid_2.src}
                                    alt="columns"
                                    width={18}
                                    className='hover:scale-110'

                                />
                            </div>
                            <div className='bg-gray-100 rounded-full shadow-md hover:shadow-md transition-all duration-200 cursor-pointer'
                                onClick={() => setGridColumns(1)}>
                                <img
                                    src={Grid_1.src}
                                    alt="column"
                                    width={18}
                                    className='hover:scale-110'
                                />
                            </div>
                        </div>
                    ) : ('')
                    }

                </div>
            </div>
            {favourites.length === 0 ? (
                loading ? (
                    <div className="col-start-2 col-end-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mx-4 sm:mx-8 md:mx-16 overflow-x-hidden">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <CardSkeletonLoader key={index} />
                        ))}
                    </div>
                ) : (
                    <div className='col-start-1 lg:col-start-2 col-end-9 my-auto lg:mx-auto px-8 sm:px-8 md:px-16'>
                        <p className='text-[#1A20AB] font-sans text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-center'>No favourites found!</p>
                    </div>
                )
            ) : (
                <GridProvider gridColumns={gridColumns}>
                    <div className="flex flex-col items-center col-start-1 col-end-9 
                    md:col-start-1 md:col-end-9
                    lg:col-start-2">
                        <h1 className="text-[#1A20AB] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-3xl lg:text-4xl font-bold text-center my-3 lg:my-7 ">
                            Things You've Hopped On
                        </h1>
                        <div className={`
                         ${gridColumns === 1 ? 'mx-auto w-full' : 'col-start-1 col-end-9 grid gap-0 overflow-x-hidden grid-cols-2'}
						md:col-start-1 md:col-end-9 md:grid md:grid-cols-3 md:w-auto md:my-0
						lg:col-start-2 lg:grid-cols-4 lg:gap-0 lg:ml-3 lg:h-fit
						xl:grid-cols-5 xl:gap-2 xl:ml-2`}>
                            {favourites.map((fav) => {
                                return (
                                    <ProductCard
                                        key={fav.id}
                                        name={fav.product.name}
                                        imageUrl={fav.product.image_url}
                                        store={fav.product.store_name}
                                        price={fav.product.price}
                                        productId={fav.productId}
                                        isFavourite={true}
                                        onToggleFavourite={handleToggleFavourite}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </GridProvider >

            )
            }
        </div >

    );
}