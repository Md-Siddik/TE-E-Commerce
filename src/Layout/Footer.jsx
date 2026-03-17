import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Anam <span className="text-blue-500">Tech</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            Build your perfect PC with confidence. Smart compatibility checks, best vendor pricing, and a transparent buying experience.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">Shop</a></li>
                            <li><a href="#" className="hover:text-white">PC Builder</a></li>
                            <li><a href="#" className="hover:text-white">Sell</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Help Center</a></li>
                            <li><a href="#" className="hover:text-white">Warranty Policy</a></li>
                            <li><a href="#" className="hover:text-white">Return Policy</a></li>
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Vendor CTA */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">For Vendors</h3>
                        <p className="text-gray-400 mb-4">
                            Sell smarter. Submit your best prices and grow your business with Anam Tech.
                        </p>
                        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:scale-105 transition">
                            Become a Vendor
                        </button>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Anam Tech. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-gray-400">
                        <a href="#" className="hover:text-white">Facebook</a>
                        <a href="#" className="hover:text-white">YouTube</a>
                        <a href="#" className="hover:text-white">LinkedIn</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;