import React, { useState } from "react";
import OrderModal from "./OrderModal";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {

    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    return (

        <>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 overflow-hidden">

                <div className="relative bg-gray-100">

                    {/* DISCOUNT BADGE */}
                    {product.discount > 0 && (
                        <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                            SAVE {product.discount}%
                        </div>
                    )}

                    {/* PREMIUM OFFER BADGE */}
                    {product.offer && (
                        <div className="absolute top-3 right-3 z-10">
                            <div className="relative px-4 py-1.5 rounded-full text-xs font-semibold text-white
                        bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600
                        shadow-[0_4px_20px_rgba(255,200,0,0.5)]
                        border border-white/30 backdrop-blur-md overflow-hidden">

                                {/* Shine effect */}
                                <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition duration-700"></span>

                                {/* Content */}
                                <span className="relative z-10 flex items-center gap-1">
                                    👑 {product.offer}
                                </span>
                            </div>
                        </div>
                    )}

                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-52 w-full object-cover"
                    />

                </div>

                <div className="p-5">

                    <h3 className="font-semibold text-gray-800 text-lg">
                        {product.name}
                    </h3>

                    <div className="mt-3 flex items-center gap-2">

                        <span className="text-indigo-600 font-bold text-xl">
                            ৳{Math.round(product.finalPrice)}
                        </span>

                        {product.discount > 0 && (
                            <span className="text-gray-400 line-through text-sm">
                                ৳{product.price}
                            </span>
                        )}

                    </div>

                    <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="mt-5 w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700"
                    >
                        Details
                    </button>

                </div>

            </div>

            {/* MODAL */}
            {showModal && (
                <OrderModal
                    product={product}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default ProductCard;