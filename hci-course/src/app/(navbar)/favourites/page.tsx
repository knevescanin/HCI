"use client"
import ProductCard from "@/app/components/ProductCard";
import { GridProvider } from "@/app/contexts/GridContext";



function page() {
    return (
        <GridProvider gridColumns={2}>
        <div>
            <h1>User&apos;s favourites</h1>
            
            <div className="grid grid-cols-8 w-full h-max text-white relative bg-white">
                <ProductCard
                    name="Product 1"
                    imageUrl="/images/product1.jpg"
                    store="Store A"
                    price={29.99}
                />
                <ProductCard
                    name="Product 2"
                    imageUrl="/images/product2.jpg"
                    store="Store B"
                    price={49.99}
                />
                <ProductCard
                    name="Product 3"
                    imageUrl="/images/product3.jpg"
                    store="Store C"
                    price={19.99}
                />
                <ProductCard
                    name="Product 4"
                    imageUrl="/images/product4.jpg"
                    store="Store D"
                    price={39.99}
                />
            </div>
        </div>
        </GridProvider>
    );
}

export default page;