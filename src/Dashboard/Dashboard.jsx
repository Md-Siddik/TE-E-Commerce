import React, { useEffect, useState } from "react";

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

    // IMAGE
    const handleImageChange = (index, file) => {
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
    };

    // EDIT
    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    // ADD PRODUCT
    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;

        const price = Number(form.price.value);
        const finalPrice = Number(form.finalPrice.value || price);

        let discount = 0;
        if (finalPrice < price) {
            discount = Math.round(((price - finalPrice) / price) * 100);
        }

        const product = {
            name: form.name.value,
            quantity: Number(form.quantity.value),
            price,
            finalPrice,
            discount,
            category: form.category.value,
            offer: form.offer.value,

            description: form.description.value,
            features: form.features.value.split(",").map(f => f.trim()),
            brand: form.brand.value,
            specifications: form.specifications.value,
            delivery: form.delivery.value,

            image: images.filter(i => i)[0]
                ? URL.createObjectURL(images.filter(i => i)[0])
                : ""
        };

        fetch("http://localhost:5000/products", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then((data) => {

                if (data.insertedId) {
                    setProducts([...products, { ...product, _id: data.insertedId }]);
                }

                form.reset();
                setImages(Array(6).fill(null));
                setShowForm(false);
            })
            .catch(() => alert("❌ Product add failed"));
    };

    // UPDATE PRODUCT
    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const form = e.target;

        const price = Number(form.price.value);
        const finalPrice = Number(form.finalPrice.value || price);

        let discount = 0;
        if (finalPrice < price) {
            discount = Math.round(((price - finalPrice) / price) * 100);
        }

        const updatedProduct = {
            name: form.name.value,
            quantity: Number(form.quantity.value),
            price,
            finalPrice,
            discount,
            category: form.category.value,
            offer: form.offer.value,

            description: form.description.value,
            features: form.features.value.split(",").map(f => f.trim()),
            brand: form.brand.value,
            specifications: form.specifications.value,
            delivery: form.delivery.value,
        };

        fetch(`http://localhost:5000/products/${editingProduct._id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then((data) => {

                if (data.modifiedCount > 0 || data.success) {

                    const updated = products.map(p =>
                        p._id === editingProduct._id
                            ? { ...p, ...updatedProduct }
                            : p
                    );

                    setProducts(updated);
                    setEditingProduct(null);
                    setShowForm(false);

                } else {
                    alert("❌ Update failed");
                }

            })
            .catch(() => alert("❌ Server error"));
    };

    // DELETE PRODUCT
    const handleDelete = (id) => {
        if (!window.confirm("Delete this product?")) return;

        fetch(`http://localhost:5000/products/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(() => {
                setProducts(products.filter(p => p._id !== id));
            });
    };

    // ORDER COMPLETE
    const handleCompleteOrder = (id) => {
        fetch(`http://localhost:5000/orders/${id}`, { method: "PUT" })
            .then(res => res.json())
            .then(() => {
                setOrders(orders.map(o =>
                    o._id === id ? { ...o, status: "completed" } : o
                ));
            });
    };

    const handleDeleteOrder = (id) => {
        if (!window.confirm("Cancel this order?")) return;

        fetch(`http://localhost:5000/orders/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => {
                setOrders(orders.filter(o => o._id !== id));
            });
    };

    const newOrders = orders.filter(o =>
        !o.status || o.status === "New"
    );

    const completedOrders = orders.filter(o =>
        o.status === "completed"
    );

    return (
        <div className="flex">

            {/* SIDEBAR */}
            <div className="w-56 min-h-screen bg-gray-900 text-white p-4 space-y-3">
                <h2 className="text-xl font-bold mb-6">Dashboard</h2>

                <button onClick={() => setActiveTab("products")} className="block w-full text-left hover:text-indigo-400">
                    Products
                </button>

                <button onClick={() => setActiveTab("new")} className="block w-full text-left hover:text-indigo-400">
                    New Orders
                </button>

                <button onClick={() => setActiveTab("completed")} className="block w-full text-left hover:text-indigo-400">
                    Completed Orders
                </button>
            </div>

            <div className="flex-1 p-6 max-w-7xl mx-auto">

                {/* PRODUCTS */}
                {activeTab === "products" && (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold">Product Dashboard</h1>

                            <button
                                onClick={() => {
                                    setShowForm(true);
                                    setEditingProduct(null);
                                }}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                            >
                                + Add Product
                            </button>
                        </div>

                        {/* FORM */}
                        {showForm && (
                            <form
                                onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                                className="bg-white p-6 rounded-xl shadow mb-10 grid md:grid-cols-2 gap-4"
                            >

                                <input name="name" placeholder="Product Name" defaultValue={editingProduct?.name || ""} required className="border p-2 rounded" />
                                <input name="quantity" type="number" placeholder="Quantity" defaultValue={editingProduct?.quantity || ""} required className="border p-2 rounded" />
                                <input name="price" type="number" placeholder="Price" defaultValue={editingProduct?.price || ""} required className="border p-2 rounded" />

                                <input name="finalPrice" type="number" placeholder="Final Price" defaultValue={editingProduct?.finalPrice || ""} className="border p-2 rounded" />

                                <select name="category" defaultValue={editingProduct?.category || ""} className="border p-2 rounded" required>
                                    <option value="">Select Category</option>
                                    <option value="Mobile Accessories">Mobile Accessories</option>
                                    <option value="Computer Accessories">Computer Accessories</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Network">Network</option>
                                </select>

                                <select name="offer" defaultValue={editingProduct?.offer || ""} className="border p-2 rounded">
                                    <option value="">No Offer</option>
                                    <option value="Buy 2 Get 1 Free">Buy 2 Get 1 Free</option>
                                    <option value="Special Discount">Special Discount</option>
                                    <option value="Buy & Get Gift">Buy & Get Gift</option>
                                    <option value="Eid Offer">Eid Offer</option>
                                </select>

                                <input name="brand" placeholder="Brand" defaultValue={editingProduct?.brand || ""} className="border p-2 rounded" />
                                <input name="delivery" placeholder="Delivery Info" defaultValue={editingProduct?.delivery || ""} className="border p-2 rounded" />

                                <textarea name="description" placeholder="Description" defaultValue={editingProduct?.description || ""} className="border p-2 rounded md:col-span-2" />

                                <input name="features" placeholder="Features (comma separated)" defaultValue={editingProduct?.features?.join(", ") || ""} className="border p-2 rounded md:col-span-2" />

                                <textarea name="specifications" placeholder="Specifications" defaultValue={editingProduct?.specifications || ""} className="border p-2 rounded md:col-span-2" />

                                {/* IMAGE */}
                                <div className="md:col-span-2 grid grid-cols-3 gap-4">
                                    {images.map((img, i) => (
                                        <label key={i} className="relative h-24 border-2 border-dashed rounded flex items-center justify-center cursor-pointer">
                                            {img ? (
                                                <img src={URL.createObjectURL(img)} className="absolute w-full h-full object-cover rounded" />
                                            ) : "+"
                                            }
                                            <input type="file" hidden onChange={(e) => handleImageChange(i, e.target.files[0])} />
                                        </label>
                                    ))}
                                </div>

                                <button className="bg-indigo-600 text-white py-2 rounded md:col-span-2">
                                    {editingProduct ? "Update" : "Add Product"}
                                </button>

                                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white py-2 rounded md:col-span-2">
                                    Cancel
                                </button>

                            </form>
                        )}

                        {/* PRODUCTS GRID */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

                            {products.map(p => (
                                <div key={p._id} className="bg-white border rounded-lg p-2">

                                    <img src={p.image} className="h-24 w-full object-cover rounded" />

                                    <h3 className="text-xs font-semibold">{p.name}</h3>
                                    <p className="text-xs text-gray-500">{p.category}</p>
                                    <p className="text-sm font-bold text-indigo-600">৳{p.price}</p>

                                    <div className="flex gap-1 mt-2">
                                        <button onClick={() => handleEdit(p)} className="flex-1 bg-yellow-500 text-white text-xs py-1 rounded">Edit</button>
                                        <button onClick={() => handleDelete(p._id)} className="flex-1 bg-red-600 text-white text-xs py-1 rounded">Delete</button>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </>
                )}

                {/* NEW ORDERS */}
                {activeTab === "new" && (
                    <>
                        <h1 className="text-2xl font-bold mb-6">New Orders</h1>

                        <div className="space-y-4">

                            {newOrders.map(order => (

                                <div key={order._id} className="bg-white p-4 rounded-xl shadow flex gap-4 items-center">

                                    <img
                                        src={order.image || "https://via.placeholder.com/100"}
                                        className="w-20 h-20 object-cover rounded"
                                    />

                                    <div className="flex-1 grid grid-cols-5 gap-4 text-sm">

                                        <p className="font-semibold">
                                            {order.productName || order.name || "No Name"}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            👤 {order.name || "No Name"}
                                        </p>

                                        <p>Qty: {order.quantity || order.qty || 1}</p>

                                        <p>📞 {order.phone}</p>
                                        <p>📍 {order.address}</p>
                                        <p>💳 {order.payment || order.paymentMethod}</p>
                                        <p>🧾 {order.trxId || "No TrxID"}</p>

                                        <div className="flex items-center gap-1 overflow-hidden">
                                            <p>📍</p>
                                            <a href={order.location} className="text-blue-500 truncate">
                                                {order.location || "No Location"}
                                            </a>
                                        </div>

                                    </div>

                                    {/* ACTION */}
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleCompleteOrder(order._id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                                        >
                                            Complete
                                        </button>

                                        <button
                                            onClick={() => handleDeleteOrder(order._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                </div>

                            ))}

                        </div>
                    </>
                )}

                {/* COMPLETED */}
                {activeTab === "completed" && (
                    <>
                        <h1 className="text-2xl font-bold mb-6">Completed Orders</h1>

                        <div className="grid gap-4">

                            {completedOrders.map(order => (

                                <div
                                    key={order._id}
                                    className="bg-white p-5 rounded-xl shadow flex items-center justify-between gap-4 border-l-4 border-green-500"
                                >

                                    {/* LEFT */}
                                    <div className="flex items-center gap-4">

                                        <img
                                            src={order.image || "https://via.placeholder.com/100"}
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />

                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {order.productName || "No Product"}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                👤 {order.name || "No Name"}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Qty: {order.quantity}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                📞 {order.phone}
                                            </p>
                                        </div>

                                    </div>

                                    {/* MIDDLE */}
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>📍 {order.address}</p>
                                        <p>💳 {order.paymentMethod}</p>
                                        <p>🧾 {order.trxId}</p>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex flex-col items-end gap-2">

                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                            ✔ Delivered
                                        </span>

                                        <button
                                            onClick={() => handleDeleteOrder(order._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default Dashboard;