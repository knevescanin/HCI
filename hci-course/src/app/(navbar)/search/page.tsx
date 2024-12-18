export default function Page() {
  return (
    <div className="grid grid-cols-8 gap-11 w-[80%] max-h-[70vh] mx-auto p-4">
      {/* Sidebar */}
      <div className="col-span-2 bg-[#630BBD] flex flex-col p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Filter Products</h2>
        
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#630BBD] text-[#630BBD]"
          />
        </div>
        
        {/* Categories */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Categories</h3>
          <ul>
            <li className="mb-1">
              <button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">Fruits</button>
            </li>
            <li className="mb-1">
              <button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">Vegetables</button>
            </li>
            <li className="mb-1">
              <button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">Dairy</button>
            </li>
            <li className="mb-1">
              <button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">Bakery</button>
            </li>
          </ul>
        </div>

        {/* Stores */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Stores</h3>
          <ul>
            <li className="mb-1">
              <button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">Konzum</button>
            </li>
            <li className="mb-1">
              <button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">Lidl</button>
            </li>
            <li className="mb-1">
              <button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">Spar</button>
            </li>
            <li className="mb-1">
              <button className="w-full text-left p-2 px-8 hover:bg-[#FFFFFF] hover:text-black rounded-md">Plodine</button>
            </li>
          </ul>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Price Range</h3>
          <input
            type="range"
            min="0"
            max="1000"
            step="1"
            className="w-full"
          />
          <div className="flex justify-between text-sm mt-2">
            <span>0 €</span>
            <span>1000 €</span>
          </div>
        </div>

        {/* Sort by Price */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Sort By</h3>
          <select className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>
      
      {/* Product Section */}
      <div className="col-span-6 bg-[#630BBD] p-4 grid grid-cols-4 gap-3 overflow-y-auto rounded-xl">
        {/* Product Boxes */}
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
          <img src="image-url" alt="Product" className="w-full h-auto mb-2" />
          <h2 className="text-black text-lg">Product Name</h2>
          <p className="text-gray-500">Grocery Store</p>
          <p className="text-[#FE7163]">Price</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
          <img src="image-url" alt="Product" className="w-full h-auto mb-2" />
          <h2 className="text-black text-lg">Product Name</h2>
          <p className="text-gray-500">Grocery Store</p>
          <p className="text-[#FE7163]">Price</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
          <img src="image-url" alt="Product" className="w-full h-auto mb-2" />
          <h2 className="text-black text-lg">Product Name</h2>
          <p className="text-gray-500">Grocery Store</p>
          <p className="text-[#FE7163]">Price</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
          <img src="image-url" alt="Product" className="w-full h-auto mb-2" />
          <h2 className="text-black text-lg">Product Name</h2>
          <p className="text-gray-500">Grocery Store</p>
          <p className="text-[#FE7163]">Price</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
          <img src="image-url" alt="Product" className="w-full h-auto mb-2" />
          <h2 className="text-black text-lg">Product Name</h2>
          <p className="text-gray-500">Grocery Store</p>
          <p className="text-[#FE7163]">Price</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
          <img src="image-url" alt="Product" className="w-full h-auto mb-2" />
          <h2 className="text-black text-lg">Product Name</h2>
          <p className="text-gray-500">Grocery Store</p>
          <p className="text-[#FE7163]">Price</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
          <img src="image-url" alt="Product" className="w-full h-auto mb-2" />
          <h2 className="text-black text-lg">Product Name</h2>
          <p className="text-gray-500">Grocery Store</p>
          <p className="text-[#FE7163]">Price</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
          <img src="image-url" alt="Product" className="w-full h-auto mb-2" />
          <h2 className="text-black text-lg">Product Name</h2>
          <p className="text-gray-500">Grocery Store</p>
          <p className="text-[#FE7163]">Price</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
          <img src="image-url" alt="Product" className="w-full h-auto mb-2" />
          <h2 className="text-black text-lg">Product Name</h2>
          <p className="text-gray-500">Grocery Store</p>
          <p className="text-[#FE7163]">Price</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
          <img src="image-url" alt="Product" className="w-full h-auto mb-2" />
          <h2 className="text-black text-lg">Product Name</h2>
          <p className="text-gray-500">Grocery Store</p>
          <p className="text-[#FE7163]">Price</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
          <img src="image-url" alt="Product" className="w-full h-auto mb-2" />
          <h2 className="text-black text-lg">Product Name</h2>
          <p className="text-gray-500">Grocery Store</p>
          <p className="text-[#FE7163]">Price</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-xl p-4 flex flex-col items-center relative">
          <img src="image-url" alt="Product" className="w-full h-auto mb-2" />
          <h2 className="text-black text-lg">Product Name</h2>
          <p className="text-gray-500">Grocery Store</p>
          <p className="text-[#FE7163]">Price</p>
        </div>
        
      </div>
    </div>
  );
}