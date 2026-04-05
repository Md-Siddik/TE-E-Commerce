import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => {

                setProducts(data);

                // get unique categories
                const uniqueCategories = [...new Set(data.map(p => p.category))];
                setCategories(uniqueCategories);

            })
            .catch(err => console.log(err));

    }, []);


    const featuredProducts = products.slice(0, 4);

    const seen = new Set();

    const offers = products.filter(p => {
        if (!p.offer || seen.has(p.offer)) {
            return false;
        }
        seen.add(p.offer);
        return true;
    });


    return (
        <div className="bg-slate-50">

            {/* HERO */}
            <section className="relative bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 text-white">
                <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 items-center gap-12">

                    <div>
                        <h1 className="text-5xl font-bold leading-tight mb-6">
                            Next Level IT Products
                        </h1>

                        <p className="text-lg text-indigo-200 mb-8">
                            Laptops, Gaming Accessories, Networking & Security Devices —
                            Everything in one place.
                        </p>

                        <Link to="/shop">
                            <button className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition">
                                <ShoppingCart size={20} /> Shop Now
                            </button>
                        </Link>
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6"
                        alt="tech setup"
                        className="rounded-3xl shadow-2xl border border-white/20"
                    />
                </div>
            </section>

            <section className="bg-white py-20">
                {/* Header */}
                <div className="text-center mb-14 px-6">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                        Available Offers
                    </h1>
                    <p className="text-gray-500 mt-3">
                        Discover exclusive deals crafted just for you
                    </p>
                </div>

                {/* Grid */}
                <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">

                    {offers.map((offer, i) => (
                        <div
                            key={i}
                            className="group relative rounded-2xl border border-gray-200 bg-white p-6 overflow-hidden 
        hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                        >
                            {/* Soft gradient glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 
        bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>

                            {/* Content */}
                            <div className="relative z-10">

                                {/* Tag */}
                                <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-4">
                                    Exclusive
                                </span>

                                {/* Offer text */}
                                <h2 className="text-lg font-semibold text-gray-800 leading-snug group-hover:text-gray-900 transition">
                                    {offer.offer}
                                </h2>

                                {/* Bottom */}
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-sm text-gray-400">
                                        Limited time
                                    </span>

                                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition">
                                        Claim →
                                    </button>
                                </div>
                            </div>

                            {/* Accent line */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-indigo-500 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    ))}

                </div>
            </section>

            {/* CATEGORY CARDS */}
            <section className="max-w-7xl mx-auto px-6 py-16">

                <h2 className="text-3xl font-bold text-center mb-12">
                    Shop Categories
                </h2>

                <div className="grid md:grid-cols-4 gap-8">

                    {categories.map((cat, i) => (

                        <Link
                            to={`/shop?category=${cat}`}
                            key={i}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer"
                        >

                            <img
                                src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                                className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"
                            />

                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

                                <h3 className="text-white text-xl font-semibold">
                                    {cat}
                                </h3>

                            </div>

                        </Link>

                    ))}

                </div>

            </section>


            {/* FEATURED PRODUCTS */}
            <section className="bg-white py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-3xl font-bold text-center mb-14">
                        Featured Products
                    </h2>


                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">

                        {featuredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}

                    </div>


                    <div className="text-center mt-16">

                        <Link to="/shop">

                            <button className="bg-indigo-600 text-white px-10 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
                                See More Products
                            </button>

                        </Link>

                    </div>

                </div>

            </section>


            {/* PROMO */}
            <section className="bg-indigo-700 text-white py-16 text-center">

                <h2 className="text-4xl font-bold mb-4">
                    ⚡ Special Tech Deals
                </h2>

                <p className="mb-6">
                    Save up to 30% this week
                </p>

                <Link to="/shop">

                    <button className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
                        Shop Deals
                    </button>

                </Link>

            </section>

        </div>
    );
};

export default Home;