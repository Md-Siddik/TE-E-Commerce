import React, { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X, PackageSearch } from "lucide-react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, []);

    const categories = ["All", ...new Set(products.map(p => p.category))];

    const filteredProducts = products
        .filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) &&
            (selectedCategory === "All" || p.category === selectedCategory)
        )
        .sort((a, b) => {
            if (sortBy === "price-asc") return a.finalPrice - b.finalPrice;
            if (sortBy === "price-desc") return b.finalPrice - a.finalPrice;
            if (sortBy === "discount") return b.discount - a.discount;
            return 0;
        });

    return (
        <div className="bg-[#f8f8fb] min-h-screen">

            {/* ── PAGE HEADER ── */}
            <div className="bg-white border-b border-zinc-100">
                <div className="max-w-7xl mx-auto px-6 py-12">

                    <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-500 mb-2">
                        Our Collection
                    </p>
                    <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
                        Shop Products
                    </h1>
                    <p className="text-zinc-400 mt-2 text-sm">
                        {products.length} products available
                    </p>

                    {/* ── SEARCH + SORT ROW ── */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">

                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-500 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            )}
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-9 pr-9 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all placeholder:text-zinc-400"
                            />
                        </div>

                        {/* Sort */}
                        <div className="relative">
                            <SlidersHorizontal size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="pl-9 pr-8 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all text-zinc-600 appearance-none cursor-pointer"
                            >
                                <option value="default">Sort: Default</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="discount">Most Discounted</option>
                            </select>
                        </div>
                    </div>

                    {/* ── CATEGORY PILLS ── */}
                    <div className="mt-5 flex flex-wrap gap-2">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                                    selectedCategory === cat
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                                        : "bg-white text-zinc-500 border-zinc-200 hover:border-indigo-300 hover:text-indigo-500"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── PRODUCTS ── */}
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Result count */}
                {(search || selectedCategory !== "All") && (
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-zinc-400">
                            <span className="font-semibold text-zinc-700">{filteredProducts.length}</span> results found
                            {search && <span> for "<span className="text-indigo-500">{search}</span>"</span>}
                            {selectedCategory !== "All" && <span> in <span className="text-indigo-500">{selectedCategory}</span></span>}
                        </p>
                        <button
                            onClick={() => { setSearch(""); setSelectedCategory("All"); setSortBy("default"); }}
                            className="text-xs font-medium text-zinc-400 hover:text-rose-500 inline-flex items-center gap-1 transition-colors"
                        >
                            <X size={12} /> Clear filters
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-300 mb-4">
                            <PackageSearch size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-700 mb-1">No products found</h3>
                        <p className="text-sm text-zinc-400 mb-6">Try a different keyword or category</p>
                        <button
                            onClick={() => { setSearch(""); setSelectedCategory("All"); }}
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id || product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;