import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  // 🔍 filter products by search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold mb-8 text-center">
          Shop Products
        </h1>

        {/* SEARCH BAR */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No products found 😔
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">

            {filteredProducts.map(product => (
              <ProductCard
                key={product._id || product.id} // ✅ safe key
                product={product}
              />
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;