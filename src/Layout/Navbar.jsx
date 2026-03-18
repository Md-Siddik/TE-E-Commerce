import React from 'react';

const Navbar = () => {

    return (
        <nav className="w-full bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800">
                        Anam <span className="text-blue-600">Tech</span>
                    </div>

                    {/* Menu */}
                    <div className="hidden md:flex items-center gap-6 font-medium">
                        <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
                        <a href="/shop" className="text-gray-700 hover:text-blue-600">Shop</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600">Sell</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600">Vendors</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
                        <a href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</a>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">

                        {/* PC Builder */}
                        <a
                            href="/pcBuilder"
                            className="relative px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg overflow-hidden group"
                        >
                            <span className="relative z-10">PC Builder</span>
                        </a>

                        <button className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition">
                            Login
                        </button>

                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;