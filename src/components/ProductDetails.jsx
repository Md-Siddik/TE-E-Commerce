import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderModal from "./OrderModal";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg animate-pulse">
                    Loading product...
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-8">

                {/* IMAGE */}
                <div className="relative group">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover md:h-[500px] transition-transform duration-500 group-hover:scale-105"
                    />

                    {product.discount > 0 && (
                        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow">
                            {product.discount}% OFF
                        </span>
                    )}
                </div>

                {/* DETAILS */}
                <div className="p-6 flex flex-col justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {product.name}
                        </h1>

                        <p className="text-sm text-gray-400 mb-4">
                            Brand: {product.brand}
                        </p>

                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-2xl font-bold text-indigo-600">
                                ৳{product.finalPrice || product.price}
                            </span>

                            {product.discount > 0 && (
                                <span className="line-through text-gray-400 text-sm">
                                    ৳{product.price}
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-5">
                            {product.description}
                        </p>

                        {/* FEATURES */}
                        {product.features && (
                            <div className="mb-5">
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    Features
                                </h3>
                                <ul className="space-y-1 text-sm text-gray-600">
                                    {product.features.map((f, i) => (
                                        <li key={i}>✔ {f}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* SPECIFICATIONS */}
                        {product.specifications && (
                            <div className="mb-5">
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    Specifications
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {product.specifications}
                                </p>
                            </div>
                        )}

                        {/* DELIVERY */}
                        <p className="text-sm text-gray-500 mb-6">
                            🚚 {product.delivery}
                        </p>
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg active:scale-95"
                    >
                        Buy Now
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
        </div>
    );
};

export default ProductDetails;