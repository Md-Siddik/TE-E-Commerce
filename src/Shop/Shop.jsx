import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { addToCart } = useContext(CartContext);

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
            {filteredProducts.map(product => {

              const discountedPrice =
                product.discount > 0
                  ? product.price - (product.price * product.discount) / 100
                  : product.price;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 overflow-hidden"
                >

                  {/* Image */}
                  <div className="relative bg-gray-100">
                    {product.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
                        SAVE {product.discount}%
                      </div>
                    )}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-52 w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {product.name}
                    </h3>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-indigo-600 font-bold text-xl">
                        ৳{Math.round(discountedPrice)}
                      </span>

                      {product.discount > 0 && (
                        <span className="text-gray-400 line-through text-sm">
                          ৳{product.price}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="mt-5 w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 active:scale-95 transition"
                    >
                      Add to Cart
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;