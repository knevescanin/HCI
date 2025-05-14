"use client"
import ProductCard from "@/app/components/ProductCard";
import { GridProvider } from "@/app/contexts/GridContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function page() {

    const [favourites, setFavourites] = useState<{ id: string; product: { name: string; image_url: string; store_name: string; price: number; }; productId: number; }[]>([]);
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [gridColumns, setGridColumns] = useState(2);

    useEffect(() => {
        if (userId) {
            fetch(`/api/favourites?userId=${userId}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => { // Debug API response
                    console.log("Fetched Favourites:", data);
                    setFavourites(data);
                })
                .catch((error) => console.error("Failed to fetch favourites:", error));
        }
    }, [userId]);

    function handleToggleFavourite(productId: number, isFavourite: boolean) {
        if (isFavourite) {
            // Add to favourites
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
                    setFavourites((prev) => [...prev, newFavourite]); // Add new favorite to state
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
                    setFavourites((prev) => prev.filter((fav) => fav.productId !== productId)); // Remove favorite from state
                })
                .catch((error) => console.error("Failed to remove from favourites:", error));
        }
    }


    return (
        <GridProvider gridColumns={gridColumns}>
            <div>
                <h1>User&apos;s favourites</h1>
                {favourites.length === 0 ? (
                    <p>No favourites found.</p>
                ) : (
                    <div className={`
                         ${gridColumns === 1 ? 'mx-auto w-full' : 'col-start-1 col-end-9 grid gap-0 overflow-x-hidden grid-cols-2'}
                        md:col-start-1 md:col-end-9 md:grid md:grid-cols-3 md:w-auto md:my-0
                        lg:col-start-2 lg:grid-cols-4 lg:gap-0 lg:ml-3 lg:h-fit lg:my-5
                        xl:grid-cols-5 xl:gap-2 xl:ml-2`}>
                        {favourites.map((fav) => {
                            console.log("Product ID:", fav.productId); // Log the product ID
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
                )}
            </div>
        </GridProvider>
    );
}

export default page;