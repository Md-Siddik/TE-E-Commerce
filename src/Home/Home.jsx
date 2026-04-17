import React, { useEffect, useState } from "react";
import { ShoppingCart, ArrowRight, Zap, Shield, Truck, Headphones } from "lucide-react";
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
                const uniqueCategories = [...new Set(data.map(p => p.category))];
                setCategories(uniqueCategories);
            })
            .catch(err => console.log(err));
    }, []);

    const featuredProducts = products
        .filter(p => p.offer)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

    const seen = new Set();
    const offers = products.filter(p => {
        if (!p.offer || seen.has(p.offer)) return false;
        seen.add(p.offer);
        return true;
    });

    const perks = [
        { icon: <Truck size={18} />, title: "Fast Delivery", desc: "Nationwide shipping" },
        { icon: <Shield size={18} />, title: "Official Warranty", desc: "Guaranteed authentic" },
        { icon: <Zap size={18} />, title: "Best Price", desc: "Price match promise" },
        { icon: <Headphones size={18} />, title: "Expert Support", desc: "Tech help anytime" },
    ];

    return (
        <div className="bg-[#f8f8fb] font-sans">

            {/* ── HERO ── */}
            <section className="relative bg-[#0a0a0f] min-h-[90vh] flex items-center">

                {/* Background layer — overflow hidden এখানে */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">

                    {/* Animated grid lines */}
                    <div className="absolute inset-0"
                        style={{
                            backgroundImage: `linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />

                    {/* Radial glow center */}
                    <div className="absolute inset-0"
                        style={{
                            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)"
                        }}
                    />

                    {/* Corner glows */}
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
                    />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)" }}
                    />

                    {/* Floating orbs */}
                    <div className="absolute top-24 right-1/4 w-2 h-2 rounded-full bg-indigo-400 opacity-60 animate-pulse" />
                    <div className="absolute top-1/3 left-16 w-1.5 h-1.5 rounded-full bg-purple-400 opacity-40 animate-pulse [animation-delay:1s]" />
                    <div className="absolute bottom-32 right-16 w-1 h-1 rounded-full bg-indigo-300 opacity-50 animate-pulse [animation-delay:2s]" />
                    <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-violet-400 opacity-30 animate-pulse [animation-delay:0.5s]" />

                    {/* Scan line */}
                    <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent animate-scanline" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 items-center gap-16 w-full">

                    {/* ── LEFT ── */}
                    <div>

                        {/* Status badge */}
                        <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                                New Arrivals Available
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-[3.4rem] font-bold leading-[1.08] tracking-tight mb-6">
                            <span className="text-white">Premium Tech,</span>
                            <br />
                            <span
                                className="animate-shimmer"
                                style={{
                                    background: "linear-gradient(90deg, #fff 0%, #a5b4fc 40%, #fff 60%, #fff 100%)",
                                    backgroundSize: "200% auto",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Unbeatable Prices.
                            </span>
                        </h1>

                        {/* Terminal-style subtext */}
                        <div className="mb-10 font-mono text-sm text-indigo-300/70 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 inline-block">
                            <span className="text-indigo-400/60 mr-2">$</span>
                            Laptops · Gaming Gear · Networking · Security
                            <span className="ml-1 text-indigo-400 animate-blink">▋</span>
                        </div>

                        {/* CTA buttons */}
                        <div className="flex items-center gap-4">
                            <Link to="/shop">
                                <button className="group relative inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-900/50 overflow-hidden">
                                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                    <ShoppingCart size={16} /> Shop Now
                                </button>
                            </Link>
                            <Link to="/shop">
                                <button className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-indigo-400 transition-colors duration-150 border border-white/10 hover:border-indigo-500/40 px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-indigo-500/10">
                                    Browse Deals <ArrowRight size={15} />
                                </button>
                            </Link>
                        </div>

                        {/* Tech spec pills */}
                        <div className="mt-10 flex flex-wrap gap-2">
                            {["500+ Products", "Official Warranty", "EMI Available", "Fast Delivery"].map((tag, i) => (
                                <span key={i} className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 border border-white/10 px-3 py-1 rounded-full bg-white/[0.03]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT ── */}
                    <div className="relative">

                        {/* Glow behind image */}
                        <div className="absolute inset-8 bg-indigo-600/20 rounded-3xl blur-3xl" />

                        {/* Main image */}
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-950/80 animate-float">
                            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2.5 bg-black/40 backdrop-blur-sm border-b border-white/10">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-rose-500 opacity-80" />
                                    <span className="w-2 h-2 rounded-full bg-amber-500 opacity-80" />
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 opacity-80" />
                                </div>
                                <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">sys.display — active</span>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-indigo-400/60">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                    LIVE
                                </div>
                            </div>

                            <img
                                src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6"
                                alt="tech setup"
                                className="w-full object-cover brightness-75"
                                style={{ height: "380px" }}
                            />

                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Premium Collection 2025</div>
                                    <div className="font-mono text-[10px] text-indigo-400/60">◈ Ready</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating card — discount */}
                        <div className="animate-float2 absolute -bottom-6 -left-6 bg-[#0f0f1a] border border-white/10 shadow-2xl rounded-2xl px-4 py-3.5 flex items-center gap-3 backdrop-blur-sm">
                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                <Zap size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">This week only</p>
                                <p className="text-sm font-bold text-white">Up to 30% Off</p>
                            </div>
                        </div>

                        {/* Floating card — authentic */}
                        <div className="animate-float absolute -top-6 -right-6 bg-[#0f0f1a] border border-white/10 shadow-2xl rounded-2xl px-4 py-3.5 flex items-center gap-3 backdrop-blur-sm">
                            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                                <Shield size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">All products</p>
                                <p className="text-sm font-bold text-white">100% Authentic</p>
                            </div>
                        </div>

                        {/* Corner bracket decorations */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-indigo-500/40 rounded-tl-lg" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-indigo-500/40 rounded-tr-lg" />
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-indigo-500/40 rounded-bl-lg" />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-indigo-500/40 rounded-br-lg" />
                    </div>
                </div>
            </section>

            {/* ── PERKS BAR ── */}
            <section className="relative bg-[#0d0d14] border-b border-white/[0.06]">

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0"
                        style={{
                            backgroundImage: `linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)`,
                            backgroundSize: "40px 40px",
                        }}
                    />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
                    {perks.map((p, i) => (
                        <div key={i} className="group flex items-center gap-3 px-6 first:pl-0 last:pr-0 py-4 cursor-default">
                            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 group-hover:text-indigo-300 transition-all duration-200">
                                {p.icon}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-200">
                                    {p.title}
                                </p>
                                <p className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors duration-200">
                                    {p.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── OFFERS ── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-500 mb-2">Promotions</p>
                            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Available Offers</h2>
                        </div>
                        <Link to="/shop" className="text-sm font-medium text-zinc-400 hover:text-indigo-600 inline-flex items-center gap-1 transition-colors">
                            All deals <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="flex gap-5">
                        {offers.map((offer, i) => (
                            <div key={i} className="group relative flex-1 bg-white rounded-2xl border border-zinc-200 p-6 overflow-hidden hover:shadow-lg hover:shadow-indigo-50/80 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300 rounded-l-2xl" />
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-indigo-500 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md mb-5">
                                    <span className="w-1 h-1 rounded-full bg-indigo-400" />
                                    Exclusive
                                </span>
                                <h2 className="text-xl font-semibold text-zinc-800 leading-snug">{offer.offer}</h2>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block animate-pulse" />
                                        Limited time
                                    </span>
                                    <button className="text-[11px] font-semibold text-indigo-500 hover:text-indigo-700 inline-flex items-center gap-1 transition-colors">
                                        Claim now <ArrowRight size={11} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CATEGORIES ── */}
            <section className="py-24 bg-white border-y border-zinc-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-500 mb-2">Browse</p>
                        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Shop by Category</h2>
                    </div>
                    <div className="flex gap-4">
                        {categories.map((cat, i) => (
                            <Link
                                to={`/shop?category=${cat}`}
                                key={i}
                                className="group relative overflow-hidden rounded-2xl border border-zinc-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                                    className="object-cover group-hover:scale-110 transition duration-500 brightness-90"
                                    alt={cat}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/75 via-zinc-900/10 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="text-white text-2xl font-semibold">{cat}</h3>
                                    <p className="text-white/60 text-[15px] mt-0.5 inline-flex items-center gap-1">
                                        Shop now <ArrowRight size={10} />
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURED PRODUCTS ── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-500 mb-2">Handpicked</p>
                            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Featured Products</h2>
                        </div>
                        <Link to="/shop" className="text-sm font-medium text-zinc-400 hover:text-indigo-600 inline-flex items-center gap-1 transition-colors">
                            See all <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {featuredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <div className="text-center mt-14">
                        <Link to="/shop">
                            <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-10 py-3 rounded-xl font-semibold text-sm transition-all duration-150 shadow-lg shadow-indigo-200">
                                See More Products <ArrowRight size={15} />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── PROMO BANNER ── */}
            <section className="relative bg-[#0a0a0f] py-24">

                {/* Background layer */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0"
                        style={{
                            backgroundImage: `linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)`,
                            backgroundSize: "50px 50px",
                        }}
                    />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl"
                        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%)" }}
                    />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl bg-purple-600/15" />
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl bg-indigo-600/15" />
                    <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent animate-scanline" />
                    <div className="absolute top-10 left-1/4 w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-50 animate-pulse" />
                    <div className="absolute bottom-10 right-1/3 w-1 h-1 rounded-full bg-purple-400 opacity-40 animate-pulse [animation-delay:1.2s]" />
                </div>

                {/* Corner brackets */}
                <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-lg" />
                <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-indigo-500/30 rounded-tr-lg" />
                <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-indigo-500/30 rounded-bl-lg" />
                <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-indigo-500/30 rounded-br-lg" />

                <div className="relative z-10 text-center px-6">

                    {/* Status badge */}
                    <div className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                            Limited Time Offer
                        </span>
                    </div>

                    {/* Headline */}
                    <h2
                        className="text-5xl font-bold tracking-tight mb-4 animate-shimmer"
                        style={{
                            background: "linear-gradient(90deg, #fff 0%, #a5b4fc 40%, #fff 60%, #fff 100%)",
                            backgroundSize: "200% auto",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Special Tech Deals
                    </h2>

                    {/* Terminal line */}
                    <div className="inline-block font-mono text-sm text-indigo-300/60 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-2.5 mb-10">
                        <span className="text-indigo-400/50 mr-2">$</span>
                        Save up to 30% on top brands this week
                        <span className="ml-1 text-indigo-400 animate-blink">▋</span>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-center gap-4">
                        <Link to="/shop">
                            <button className="group relative inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-900/60 overflow-hidden">
                                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <Zap size={15} /> Shop Deals
                            </button>
                        </Link>
                        <Link to="/shop">
                            <button className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-indigo-400 transition-colors duration-150 border border-white/10 hover:border-indigo-500/40 px-6 py-3 rounded-xl bg-white/[0.03] hover:bg-indigo-500/10">
                                View All <ArrowRight size={15} />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;