import React, { useState } from "react";
import OrderModal from "./OrderModal";

const ProductCard = ({ product }) => {

    const [showModal, setShowModal] = useState(false);

    const discountedPrice =
        product.discount > 0
            ? product.price - (product.price * product.discount) / 100
            : product.price;

    return (

        <>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 overflow-hidden">

                <div className="relative bg-gray-100">

                    {product.discount > 0 && (
                        <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                            SAVE {product.discount}%
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
                            ৳{Math.round(discountedPrice)}
                        </span>

                        {product.discount > 0 && (
                            <span className="text-gray-400 line-through text-sm">
                                ৳{product.price}
                            </span>
                        )}

                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-5 w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700"
                    >
                        Order Now
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