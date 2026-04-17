import React, { useEffect, useState } from "react";
import {
    LayoutGrid, ShoppingBag, CheckCircle2, Plus, X,
    Pencil, Trash2, PackageCheck, XCircle, Upload,
    ChevronRight, Box
} from "lucide-react";

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [images, setImages] = useState(Array(6).fill(null));
    const [editingProduct, setEditingProduct] = useState(null);
    const [activeTab, setActiveTab] = useState("products");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data));
        fetch("http://localhost:5000/orders")
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);

    const handleImageChange = (index, file) => {
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
        const existing = product.images || [];
        setImages([...existing, ...Array(6 - existing.length).fill(null)]);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData();
        const price = Number(form.price.value);
        const finalPrice = Number(form.finalPrice.value || price);
        let discount = 0;
        if (finalPrice < price) discount = Math.round(((price - finalPrice) / price) * 100);
        formData.append("name", form.name.value);
        formData.append("quantity", form.quantity.value);
        formData.append("price", price);
        formData.append("finalPrice", finalPrice);
        formData.append("discount", discount);
        formData.append("category", form.category.value);
        formData.append("offer", form.offer.value);
        formData.append("features", form.features.value);
        formData.append("shortDescription", form.shortDescription.value);
        formData.append("specifications", form.specifications.value);
        formData.append("description", form.description.value);
        formData.append("brand", form.brand.value);
        formData.append("delivery", form.delivery.value);
        images.filter(i => i).forEach(img => formData.append("images", img));
        fetch("http://localhost:5000/products", { method: "POST", body: formData })
            .then(res => res.json())
            .then((data) => {
                if (data.insertedId) setProducts([...products, { _id: data.insertedId }]);
                form.reset();
                setImages(Array(6).fill(null));
                setShowForm(false);
            })
            .catch(() => alert("❌ Product add failed"));
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData();
        const price = Number(form.price.value);
        const finalPrice = Number(form.finalPrice.value || price);
        let discount = 0;
        if (finalPrice < price) discount = Math.round(((price - finalPrice) / price) * 100);
        formData.append("name", form.name.value);
        formData.append("quantity", form.quantity.value);
        formData.append("price", price);
        formData.append("finalPrice", finalPrice);
        formData.append("discount", discount);
        formData.append("category", form.category.value);
        formData.append("offer", form.offer.value);
        formData.append("features", form.features.value);
        formData.append("shortDescription", form.shortDescription.value);
        formData.append("specifications", form.specifications.value);
        formData.append("description", form.description.value);
        formData.append("brand", form.brand.value);
        formData.append("delivery", form.delivery.value);
        formData.append("oldImages", JSON.stringify(editingProduct.images || []));
        images.filter(i => i).forEach(img => formData.append("images", img));
        fetch(`http://localhost:5000/products/${editingProduct._id}`, { method: "PUT", body: formData })
            .then(res => res.json())
            .then((data) => {
                if (data.success) {
                    setProducts(products.map(p =>
                        p._id === editingProduct._id
                            ? { ...p, ...Object.fromEntries(formData), images: data.images || p.images }
                            : p
                    ));
                    setEditingProduct(null);
                    setShowForm(false);
                } else alert("❌ Update failed");
            })
            .catch(() => alert("❌ Server error"));
    };

    const handleDelete = (id) => {
        if (!window.confirm("Delete this product?")) return;
        fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => setProducts(products.filter(p => p._id !== id)));
    };

    const handleCompleteOrder = (id) => {
        fetch(`http://localhost:5000/orders/${id}`, { method: "PUT" })
            .then(res => res.json())
            .then(() => setOrders(orders.map(o => o._id === id ? { ...o, status: "completed" } : o)));
    };

    const handleDeleteOrder = (id) => {
        if (!window.confirm("Cancel this order?")) return;
        fetch(`http://localhost:5000/orders/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => setOrders(orders.filter(o => o._id !== id)));
    };

    const newOrders = orders.filter(o => !o.status || o.status === "New");
    const completedOrders = orders.filter(o => o.status === "completed");

    const inputCls = "w-full bg-[#0d0d14] border border-white/10 text-white/80 placeholder:text-zinc-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all";
    const labelCls = "text-[11px] font-semibold uppercase tracking-widest text-zinc-500 mb-1.5 block";

    const navItems = [
        { id: "products", label: "Products", icon: <LayoutGrid size={16} />, count: products.length },
        { id: "new", label: "New Orders", icon: <ShoppingBag size={16} />, count: newOrders.length },
        { id: "completed", label: "Completed", icon: <CheckCircle2 size={16} />, count: completedOrders.length },
    ];

    return (
        <div className="flex min-h-screen bg-[#07070d] font-sans">

            {/* ── SIDEBAR ── */}
            <aside className="w-60 shrink-0 bg-[#0a0a0f] border-r border-white/[0.06] flex flex-col">

                {/* Logo */}
                <div className="px-5 py-6 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <Box size={15} className="text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">AdminPanel</p>
                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">v1.0.0</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 px-3 py-2">Menu</p>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                activeTab === item.id
                                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                            }`}
                        >
                            <span className="flex items-center gap-2.5">
                                {item.icon} {item.label}
                            </span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                                activeTab === item.id ? "bg-indigo-500/20 text-indigo-400" : "bg-white/[0.05] text-zinc-600"
                            }`}>
                                {item.count}
                            </span>
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/[0.06]">
                    <p className="text-[10px] font-mono text-zinc-700 text-center">sys.admin — active</p>
                </div>
            </aside>

            {/* ── MAIN ── */}
            <main className="flex-1 overflow-auto">

                {/* ══ PRODUCTS TAB ══ */}
                {activeTab === "products" && (
                    <div className="p-8">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <div className="flex items-center gap-2 text-zinc-600 text-xs font-mono mb-1">
                                    <span>dashboard</span><ChevronRight size={12} /><span className="text-indigo-400">products</span>
                                </div>
                                <h1 className="text-2xl font-bold text-white">Products</h1>
                            </div>
                            <button
                                onClick={() => { setShowForm(true); setEditingProduct(null); setImages(Array(6).fill(null)); }}
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-150 shadow-lg shadow-indigo-900/40"
                            >
                                <Plus size={15} /> Add Product
                            </button>
                        </div>

                        {/* ── FORM ── */}
                        {showForm && (
                            <div className="bg-[#0a0a0f] border border-white/[0.07] rounded-2xl p-6 mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-base font-bold text-white">
                                        {editingProduct ? "Edit Product" : "New Product"}
                                    </h2>
                                    <button onClick={() => setShowForm(false)} className="text-zinc-600 hover:text-zinc-300 transition-colors">
                                        <X size={18} />
                                    </button>
                                </div>

                                <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
                                    <div className="grid md:grid-cols-2 gap-5">

                                        <div>
                                            <label className={labelCls}>Product Name</label>
                                            <input name="name" placeholder="e.g. Mechanical Keyboard" defaultValue={editingProduct?.name || ""} required className={inputCls} />
                                        </div>
                                        <div>
                                            <label className={labelCls}>Quantity</label>
                                            <input name="quantity" type="number" placeholder="0" defaultValue={editingProduct?.quantity || ""} required className={inputCls} />
                                        </div>
                                        <div>
                                            <label className={labelCls}>Price (৳)</label>
                                            <input name="price" type="number" placeholder="0" defaultValue={editingProduct?.price || ""} required className={inputCls} />
                                        </div>
                                        <div>
                                            <label className={labelCls}>Final Price (৳)</label>
                                            <input name="finalPrice" type="number" placeholder="0" defaultValue={editingProduct?.finalPrice || ""} className={inputCls} />
                                        </div>
                                        <div>
                                            <label className={labelCls}>Category</label>
                                            <select name="category" defaultValue={editingProduct?.category || ""} required className={inputCls}>
                                                <option value="">Select Category</option>
                                                <option value="Mobile Accessories">Mobile Accessories</option>
                                                <option value="Computer Accessories">Computer Accessories</option>
                                                <option value="Laptop">Laptop</option>
                                                <option value="Network">Network</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelCls}>Offer</label>
                                            <select name="offer" defaultValue={editingProduct?.offer || ""} className={inputCls}>
                                                <option value="">No Offer</option>
                                                <option value="Buy 2 Get 1 Free">Buy 2 Get 1 Free</option>
                                                <option value="Special Discount">Special Discount</option>
                                                <option value="Buy & Get Gift">Buy & Get Gift</option>
                                                <option value="Eid Offer">Eid Offer</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelCls}>Brand</label>
                                            <input name="brand" placeholder="e.g. Logitech" defaultValue={editingProduct?.brand || ""} className={inputCls} />
                                        </div>
                                        <div>
                                            <label className={labelCls}>Delivery Info</label>
                                            <input name="delivery" placeholder="e.g. 2-3 days" defaultValue={editingProduct?.delivery || ""} className={inputCls} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className={labelCls}>Features (comma separated)</label>
                                            <input name="features" placeholder="e.g. RGB, Wireless, USB-C" defaultValue={Array.isArray(editingProduct?.features) ? editingProduct?.features?.join(", ") : editingProduct?.features || ""} className={inputCls} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className={labelCls}>Short Description</label>
                                            <textarea name="shortDescription" rows={2} placeholder="Brief product summary..." defaultValue={editingProduct?.shortDescription || ""} className={inputCls} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className={labelCls}>Specifications (comma separated)</label>
                                            <textarea name="specifications" rows={2} placeholder="e.g. Weight: 100g, Color: Black" defaultValue={Array.isArray(editingProduct?.specifications) ? editingProduct?.specifications?.join(", ") : editingProduct?.specifications || ""} className={inputCls} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className={labelCls}>Description</label>
                                            <textarea name="description" rows={3} placeholder="Full product description..." defaultValue={editingProduct?.description || ""} className={inputCls} />
                                        </div>

                                        {/* Images */}
                                        <div className="md:col-span-2">
                                            <label className={labelCls}>Product Images (up to 6)</label>
                                            <div className="grid grid-cols-6 gap-3">
                                                {images.map((img, i) => (
                                                    <label key={i} className="group relative aspect-square rounded-xl border border-dashed border-white/10 hover:border-indigo-500/50 bg-white/[0.02] flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-200">
                                                        {img ? (
                                                            <img
                                                                src={typeof img === "string" ? `http://localhost:5000${img}` : URL.createObjectURL(img)}
                                                                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                                            />
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-1 text-zinc-700 group-hover:text-indigo-500 transition-colors">
                                                                <Upload size={14} />
                                                                <span className="text-[9px] font-mono">IMG {i + 1}</span>
                                                            </div>
                                                        )}
                                                        <input type="file" hidden onChange={(e) => handleImageChange(i, e.target.files[0])} />
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3 mt-6">
                                        <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors duration-150">
                                            {editingProduct ? "Update Product" : "Add Product"}
                                        </button>
                                        <button type="button" onClick={() => setShowForm(false)} className="px-6 bg-white/[0.05] hover:bg-white/[0.08] text-zinc-400 py-2.5 rounded-xl text-sm font-semibold border border-white/10 transition-colors duration-150">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {products.map(p => (
                                <div key={p._id} className="group bg-[#0a0a0f] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-950/50 transition-all duration-200">
                                    <div className="relative bg-zinc-900 overflow-hidden">
                                        <img
                                            src={"http://localhost:5000" + p.images?.[0]}
                                            className="h-28 w-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                                        />
                                        {p.discount > 0 && (
                                            <span className="absolute top-2 left-2 text-[9px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded-md">
                                                -{p.discount}%
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <p className="text-xs font-semibold text-white/80 line-clamp-1 mb-0.5">{p.name}</p>
                                        <p className="text-[10px] font-mono text-zinc-600 mb-1">{p.category}</p>
                                        <p className="text-sm font-bold text-indigo-400">৳{p.finalPrice || p.price}</p>
                                        <div className="flex gap-1.5 mt-3">
                                            <button onClick={() => handleEdit(p)} className="flex-1 inline-flex items-center justify-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-[10px] font-semibold py-1.5 rounded-lg transition-colors">
                                                <Pencil size={10} /> Edit
                                            </button>
                                            <button onClick={() => handleDelete(p._id)} className="flex-1 inline-flex items-center justify-center gap-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-[10px] font-semibold py-1.5 rounded-lg transition-colors">
                                                <Trash2 size={10} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ══ NEW ORDERS TAB ══ */}
                {activeTab === "new" && (
                    <div className="p-8">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 text-zinc-600 text-xs font-mono mb-1">
                                <span>dashboard</span><ChevronRight size={12} /><span className="text-indigo-400">new orders</span>
                            </div>
                            <h1 className="text-2xl font-bold text-white">New Orders
                                <span className="ml-3 text-sm font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-lg">{newOrders.length}</span>
                            </h1>
                        </div>

                        <div className="space-y-4">
                            {newOrders.map(order => (
                                <div key={order._id} className="bg-[#0a0a0f] border border-white/[0.07] rounded-2xl p-5 flex gap-5 items-start hover:border-indigo-500/20 transition-all duration-200">

                                    {/* Image */}
                                    <img
                                        src={order.image || "https://via.placeholder.com/100"}
                                        className="w-20 h-20 object-cover rounded-xl border border-white/10 shrink-0"
                                    />

                                    {/* Info grid */}
                                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
                                        <div className="md:col-span-2">
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Product</p>
                                            <p className="text-sm font-semibold text-white/90">{order.productName || order.name || "No Name"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Customer</p>
                                            <p className="text-sm text-zinc-300">{order.name || "—"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Quantity</p>
                                            <p className="text-sm text-zinc-300">{order.quantity || order.qty || 1}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Phone</p>
                                            <p className="text-sm text-zinc-300">{order.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Payment</p>
                                            <p className="text-sm text-zinc-300">{order.payment || order.paymentMethod}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">TrxID</p>
                                            <p className="text-sm font-mono text-indigo-400">{order.trxId || "—"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Address</p>
                                            <p className="text-sm text-zinc-300 truncate">{order.address}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Location</p>
                                            <a href={order.location} className="text-sm text-indigo-400 hover:text-indigo-300 truncate block transition-colors">
                                                {order.location ? "View Map" : "—"}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 shrink-0">
                                        <button onClick={() => handleCompleteOrder(order._id)} className="inline-flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
                                            <PackageCheck size={13} /> Complete
                                        </button>
                                        <button onClick={() => handleDeleteOrder(order._id)} className="inline-flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
                                            <XCircle size={13} /> Cancel
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {newOrders.length === 0 && (
                                <div className="text-center py-24 text-zinc-700">
                                    <ShoppingBag size={36} className="mx-auto mb-3 opacity-30" />
                                    <p className="text-sm font-mono">No new orders</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ══ COMPLETED TAB ══ */}
                {activeTab === "completed" && (
                    <div className="p-8">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 text-zinc-600 text-xs font-mono mb-1">
                                <span>dashboard</span><ChevronRight size={12} /><span className="text-emerald-400">completed</span>
                            </div>
                            <h1 className="text-2xl font-bold text-white">Completed Orders
                                <span className="ml-3 text-sm font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg">{completedOrders.length}</span>
                            </h1>
                        </div>

                        <div className="space-y-4">
                            {completedOrders.map(order => (
                                <div key={order._id} className="bg-[#0a0a0f] border border-white/[0.07] border-l-2 border-l-emerald-500/60 rounded-2xl p-5 flex gap-5 items-start hover:border-emerald-500/20 transition-all duration-200">

                                    <img
                                        src={order.image || "https://via.placeholder.com/100"}
                                        className="w-20 h-20 object-cover rounded-xl border border-white/10 shrink-0"
                                    />

                                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
                                        <div className="md:col-span-2">
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Product</p>
                                            <p className="text-sm font-semibold text-white/90">{order.productName || "No Product"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Customer</p>
                                            <p className="text-sm text-zinc-300">{order.name || "—"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Quantity</p>
                                            <p className="text-sm text-zinc-300">{order.quantity}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Phone</p>
                                            <p className="text-sm text-zinc-300">{order.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Address</p>
                                            <p className="text-sm text-zinc-300">{order.address}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Payment</p>
                                            <p className="text-sm text-zinc-300">{order.paymentMethod}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">TrxID</p>
                                            <p className="text-sm font-mono text-indigo-400">{order.trxId}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 shrink-0 items-end">
                                        <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-[11px] font-semibold">
                                            <CheckCircle2 size={11} /> Delivered
                                        </span>
                                        <button onClick={() => handleDeleteOrder(order._id)} className="inline-flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
                                            <Trash2 size={12} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {completedOrders.length === 0 && (
                                <div className="text-center py-24 text-zinc-700">
                                    <CheckCircle2 size={36} className="mx-auto mb-3 opacity-30" />
                                    <p className="text-sm font-mono">No completed orders yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;