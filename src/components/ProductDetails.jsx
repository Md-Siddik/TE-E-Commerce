import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Truck, ShieldCheck, Tag, ChevronRight, CheckCircle2, Box } from "lucide-react";
import OrderModal from "./OrderModal";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#f8f8fb] gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center animate-pulse">
                    <Box size={20} className="text-indigo-400" />
                </div>
                <p className="text-zinc-400 text-base font-mono animate-pulse">Loading product...</p>
            </div>
        );
    }

    const features = Array.isArray(product.features)
        ? product.features
        : typeof product.features === "string"
            ? product.features.split(",").map(f => f.trim()).filter(Boolean)
            : [];

    const specifications = Array.isArray(product.specifications)
        ? product.specifications
        : typeof product.specifications === "string"
            ? product.specifications.split(",").map(s => s.trim()).filter(Boolean)
            : [];

    return (
        <div className="bg-[#f8f8fb] min-h-screen">

            {/* Breadcrumb */}
            <div className="bg-white border-b border-zinc-100">
                <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm font-mono text-zinc-400">
                    <span>Home</span>
                    <ChevronRight size={13} />
                    <span>Shop</span>
                    <ChevronRight size={13} />
                    <span className="text-indigo-500 truncate max-w-[200px]">{product.name}</span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* ── TOP SECTION ── */}
                <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden grid md:grid-cols-2 gap-0 shadow-sm">

                    {/* ── LEFT: Images ── */}
                    <div className="p-6 border-r border-zinc-100">

                        {/* Main image */}
                        <div className="relative rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 mb-4">
                            {product.discount > 0 && (
                                <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-rose-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                    <Tag size={11} /> {product.discount}% OFF
                                </span>
                            )}
                            {product.offer && (
                                <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-semibold px-3 py-1.5 rounded-full">
                                    ★ {product.offer}
                                </span>
                            )}
                            <img
                                src={"http://localhost:5000" + product.images?.[activeImage]}
                                alt={product.name}
                                className="w-full h-[380px] object-cover transition-all duration-500"
                            />
                        </div>

                        {/* Thumbnails */}
                        {product.images?.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                                            activeImage === i
                                                ? "border-indigo-500 shadow-md shadow-indigo-100"
                                                : "border-zinc-100 hover:border-zinc-300"
                                        }`}
                                    >
                                        <img src={"http://localhost:5000" + img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT: Details ── */}
                    <div className="p-8 flex flex-col gap-6">

                        {/* Category + Brand */}
                        <div className="flex items-center gap-2">
                            {product.category && (
                                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-md">
                                    {product.category}
                                </span>
                            )}
                            {product.brand && (
                                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 bg-zinc-50 border border-zinc-100 px-3 py-1.5 rounded-md">
                                    {product.brand}
                                </span>
                            )}
                        </div>

                        {/* Name */}
                        <h1 className="text-3xl font-bold text-zinc-900 leading-snug tracking-tight">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-bold text-indigo-600 tracking-tight">
                                ৳{Number(product.finalPrice || product.price).toLocaleString()}
                            </span>
                            {product.discount > 0 && (
                                <>
                                    <span className="text-lg text-zinc-400 line-through">
                                        ৳{Number(product.price).toLocaleString()}
                                    </span>
                                    <span className="text-base font-semibold text-emerald-600">
                                        Save ৳{(product.price - (product.finalPrice || product.price)).toLocaleString()}
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="border-t border-zinc-100" />

                        {/* Short description */}
                        {product.shortDescription && (
                            <p className="text-base text-zinc-500 leading-relaxed">
                                {product.shortDescription}
                            </p>
                        )}

                        {/* Features */}
                        {features.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Key Features</p>
                                <ul className="grid grid-cols-1 gap-2.5">
                                    {features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-base text-zinc-700">
                                            <CheckCircle2 size={17} className="text-indigo-500 shrink-0 mt-0.5" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="border-t border-zinc-100" />

                        {/* Delivery + Warranty pills */}
                        <div className="flex flex-wrap gap-3">
                            {product.delivery && (
                                <div className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 bg-zinc-50 border border-zinc-100 px-4 py-2.5 rounded-xl">
                                    <Truck size={15} className="text-indigo-500" />
                                    {product.delivery}
                                </div>
                            )}
                            <div className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 bg-zinc-50 border border-zinc-100 px-4 py-2.5 rounded-xl">
                                <ShieldCheck size={15} className="text-emerald-500" />
                                Official Warranty
                            </div>
                            <div className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 bg-zinc-50 border border-zinc-100 px-4 py-2.5 rounded-xl">
                                <Tag size={15} className="text-amber-500" />
                                100% Authentic
                            </div>
                        </div>

                        {/* Stock */}
                        {product.quantity !== undefined && (
                            <p className="text-sm font-mono text-zinc-400">
                                <span className={product.quantity > 0 ? "text-emerald-500" : "text-rose-500"}>
                                    ● {product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
                                </span>
                            </p>
                        )}

                        {/* Buy Button */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="group relative w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold py-4 rounded-xl transition-all duration-150 shadow-lg shadow-indigo-200 overflow-hidden text-lg"
                        >
                            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            Buy Now
                        </button>
                    </div>
                </div>

                {/* ── BOTTOM: Specs + Description ── */}
                <div className="mt-6 grid md:grid-cols-2 gap-6">

                    {/* Specifications */}
                    {specifications.length > 0 && (
                        <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-5">Specifications</p>
                            <ul className="space-y-3">
                                {specifications.map((s, i) => (
                                    <li key={i} className="flex items-start gap-3 text-base text-zinc-700 pb-3 border-b border-zinc-50 last:border-0 last:pb-0">
                                        <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0 mt-2" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Description */}
                    {product.description && (
                        <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-5">Description</p>
                            <p className="text-base text-zinc-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <OrderModal product={product} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default ProductDetails;