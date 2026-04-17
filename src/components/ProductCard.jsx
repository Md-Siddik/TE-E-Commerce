import React, { useState } from "react";
import OrderModal from "./OrderModal";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const [showModal, setShowModal] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [likes, setLikes] = useState(product.likes || 0);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    const discountedPrice = Math.round(product.finalPrice);
    const originalPrice = product.price;

    return (
        <>
            <div className="group relative bg-white rounded-2xl border border-zinc-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1">

                {/* ── Image area ── */}
                <div className="relative bg-zinc-50 overflow-hidden">

                    {/* Skeleton shimmer */}
                    {!imgLoaded && (
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-100" />
                    )}

                    <img
                        src={"http://localhost:5000" + product.images?.[0]}
                        alt={product.name}
                        onLoad={() => setImgLoaded(true)}
                        className={`h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"
                            }`}
                    />

                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                    {/* Discount pill */}
                    {product.discount > 0 && (
                        <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-rose-500 text-white text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full shadow-sm">
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 10">
                                <path d="M8.5 1.5L1.5 8.5M3 2.5a.5.5 0 110-1 .5.5 0 010 1zm4 4a.5.5 0 110-1 .5.5 0 010 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                            {product.discount}% OFF
                        </span>
                    )}

                    {/* Offer badge */}
                    {product.offer && (
                        <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full shadow-sm">
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 10 10">
                                <path d="M5 0l1.12 3.45H9.5L6.69 5.58l1.07 3.3L5 6.8l-2.76 2.08 1.07-3.3L.5 3.45h3.38z" />
                            </svg>
                            {product.offer}
                        </span>
                    )}
                </div>

                {/* ── Body ── */}
                <div className="p-5 flex flex-col gap-4">

                    {/* Name + category */}
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-zinc-800 text-base leading-snug line-clamp-2">
                            {product.name}
                        </h3>
                        {product.category && (
                            <span className="shrink-0 max-w-[90px] truncate text-[10px] font-medium uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                                {product.category}
                            </span>
                        )}
                    </div>

                    {/* Price row */}
                    <div className="flex items-baseline gap-2.5">
                        <span className="text-2xl font-bold text-indigo-600 tracking-tight">
                            ৳{discountedPrice.toLocaleString()}
                        </span>
                        {product.discount > 0 && (
                            <span className="text-sm text-zinc-400 line-through">
                                ৳{Number(originalPrice).toLocaleString()}
                            </span>
                        )}
                        {product.discount > 0 && (
                            <span className="ml-auto text-xs font-semibold text-emerald-600">
                                Save ৳{(originalPrice - discountedPrice).toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-zinc-100" />

                    {/* Actions */}
                    <div className="flex items-center gap-2.5">
                        <button
                            onClick={() => navigate(`/product/${product._id}`)}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors duration-150 flex items-center justify-center gap-2"
                        >
                            View Details
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <button
                            onClick={() => setShowModal(true)}
                            title="Quick Order"
                            className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-400 hover:text-indigo-600 transition-colors duration-150"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                                <path d="M2 2h1.5l2 8h7l1.5-5.5H5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="7" cy="13" r="1" fill="currentColor" />
                                <circle cx="11" cy="13" r="1" fill="currentColor" />
                            </svg>
                        </button>

                        <div className="relative group">
                            <button
                                onClick={() => {
                                    if (!liked) {
                                        setLikes(prev => prev + 1);
                                        setLiked(true);
                                    }
                                }}
                                title="Wishlist"
                                className={`p-2.5 rounded-xl border transition-colors duration-150 
        ${liked
                                        ? "text-rose-500 border-rose-200 bg-rose-50"
                                        : "border-zinc-200 text-zinc-400 hover:text-rose-500 hover:bg-zinc-50"
                                    }`}
                            >
                                <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} viewBox="0 0 16 16">
                                    <path
                                        d="M8 13.5S1.5 9.5 1.5 5.5a3.5 3.5 0 016.5-1.8A3.5 3.5 0 0114.5 5.5C14.5 9.5 8 13.5 8 13.5z"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {/* 🔴 Badge */}
                            {likes > 0 && (
                                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                    {likes}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hover accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-500 rounded-l-2xl scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300" />
            </div>

            {showModal && (
                <OrderModal product={product} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};

export default ProductCard;