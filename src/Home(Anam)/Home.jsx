import React from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const products = useLoaderData();

    const categories = [
        'Processor',
        'Motherboard',
        'RAM',
        'SSD',
        'Graphics Card',
        'Power Supply',
        'Laptop',
        'Accessories'
    ];

    return (
        <div className="w-full overflow-hidden">

            {/* HERO */}
            <section className="relative bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_60%)]" />

                <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/20 text-sm font-semibold">
                            ⚡ Smart Compatibility System
                        </span>

                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                            Build Your <span className="text-yellow-300">Perfect PC</span><br />
                            With Zero Risk
                        </h1>

                        <p className="text-lg md:text-xl text-white/90 mb-8">
                            Build custom PCs with automatic compatibility checks and get the best price from verified vendors.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate('/pc-builder')}
                                className="px-8 py-3 rounded-full bg-white text-blue-700 font-semibold shadow-lg hover:scale-105 transition"
                            >
                                Start PC Builder
                            </button>

                            <button
                                onClick={() => navigate('/shop')}
                                className="px-8 py-3 rounded-full border border-white/70 font-semibold hover:bg-white hover:text-blue-700 transition"
                            >
                                Browse Shop
                            </button>
                        </div>
                    </div>

                    {/* preview */}
                    <div className="hidden md:block">
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
                            <p className="text-sm mb-4 font-semibold">PC Builder Preview</p>

                            {[
                                'Processor Selected',
                                'Motherboard Compatible',
                                'RAM Matched',
                                'Power Supply Calculated'
                            ].map(item => (
                                <div key={item} className="flex items-center gap-3 bg-white/10 p-3 rounded-lg mb-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400" />
                                    <span className="text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>


            {/* TRUST */}
            <section className="bg-white py-14">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {["Genuine Products", "Verified Vendors", "Best Price Guarantee", "Transparent Invoice"].map(item => (
                        <div key={item} className="p-4 rounded-xl border shadow-sm font-semibold text-gray-700">
                            {item}
                        </div>
                    ))}
                </div>
            </section>


            {/* CATEGORIES */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Explore Categories
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {categories.map(item => (
                            <div
                                key={item}
                                onClick={() => navigate(`/shop/${item.toLowerCase().replace(/\s+/g, '-')}`)}
                                className="group bg-white rounded-2xl p-8 text-center shadow hover:shadow-xl transition cursor-pointer"
                            >
                                <p className="font-semibold text-gray-700 group-hover:text-blue-600">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* HOT DEALS */}
            <section className="bg-gradient-to-b from-white to-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">🔥 Hot Deals</h2>
                        <button
                            onClick={() => navigate('/shop')}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            View All →
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                        {products?.slice(0, 8).map(product => {

                            const finalPrice =
                                product.price - (product.price * product.discount / 100);

                            return (

                                <div key={product._id} className="relative bg-white rounded-xl border hover:shadow-lg transition overflow-hidden">

                                    <span className="absolute mt-3 ml-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                                        -{product.discount}%
                                    </span>

                                    <div className="bg-gray-100 h-52 flex items-center justify-center p-6">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="max-h-36 object-contain"
                                        />
                                    </div>

                                    <div className="p-5">

                                        <h3 className="font-semibold mb-3">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center gap-3 mb-5">
                                            <span className="text-lg font-bold">
                                                ৳{finalPrice}
                                            </span>

                                            <span className="line-through text-gray-400 text-sm">
                                                ৳{product.price}
                                            </span>
                                        </div>

                                        <button className="w-full py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                                            Add to Cart
                                        </button>

                                    </div>

                                </div>

                            )

                        })}

                    </div>
                </div>
            </section>


            {/* FEATURES */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center mb-14">
                    Why Anam Tech is Different
                </h2>

                <div className="grid md:grid-cols-3 gap-10">

                    <div className="p-8 rounded-3xl bg-white shadow hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-3">Smart PC Builder</h3>
                        <p className="text-gray-600">Automatic compatibility checking ensures zero mistakes.</p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white shadow hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-3">Vendor Price Battle</h3>
                        <p className="text-gray-600">Multiple sellers compete so you always get the best price.</p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white shadow hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-3">Business Grade System</h3>
                        <p className="text-gray-600">Invoices, warranty & purchase history fully tracked.</p>
                    </div>

                </div>
            </section>


            {/* VENDOR CTA */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Vendor & Trader Opportunity</h2>
                    <p className="mb-8 text-white/90">
                        Submit your best prices and win more deals with Anam Tech.
                    </p>
                    <button className="px-10 py-3 rounded-full bg-white text-indigo-600 font-semibold hover:scale-105 transition">
                        Become a Vendor
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Home;