import React, { useEffect, useState } from "react";

const Dashboard = () => {

    const [products, setProducts] = useState([]);
    const [images, setImages] = useState(Array(6).fill(null));
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    // IMAGE SLOT CHANGE
    const handleImageChange = (index, file) => {

        const newImages = [...images];
        newImages[index] = file;

        setImages(newImages);
    };

    // EDIT PRODUCT
    const handleEdit = (product) => {
        setEditingProduct(product);
    };


    // ADD PRODUCT
    const handleAddProduct = (e) => {

        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const price = form.price.value;
        const discount = form.discount.value;
        const category = form.category.value;

        const uploadedImages = images
            .filter(img => img !== null)
            .map(img => URL.createObjectURL(img));

        const product = {
            name,
            price: Number(price),
            discount: Number(discount),
            category,
            image: uploadedImages[0]
        };

        fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {

                setProducts([...products, product]);

                form.reset();
                setImages(Array(6).fill(null));

            });
    };


    // UPDATE PRODUCT
    const handleUpdateProduct = (e) => {

        e.preventDefault();

        const form = e.target;

        const updatedProduct = {
            name: form.name.value,
            price: Number(form.price.value),
            discount: Number(form.discount.value),
            category: form.category.value
        };

        fetch(`http://localhost:5000/products/${editingProduct._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(() => {

                const updatedProducts = products.map(p =>
                    p._id === editingProduct._id
                        ? { ...p, ...updatedProduct }
                        : p
                );

                setProducts(updatedProducts);
                setEditingProduct(null);

            });

    };


    // DELETE PRODUCT
    const handleDelete = (id) => {

        if (!window.confirm("Delete this product?")) return;

        fetch(`http://localhost:5000/products/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(() => {

                const remaining = products.filter(p => p._id !== id);
                setProducts(remaining);

            });

    };


    return (

        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-8">
                Product Dashboard
            </h1>

            {/* ADD / UPDATE PRODUCT FORM */}

            <form
                onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                className="bg-white p-6 rounded-xl shadow mb-10 grid md:grid-cols-2 gap-4"
            >

                <input
                    name="name"
                    placeholder="Product Name"
                    defaultValue={editingProduct?.name || ""}
                    required
                    className="border p-2 rounded"
                />

                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    defaultValue={editingProduct?.price || ""}
                    required
                    className="border p-2 rounded"
                />

                <input
                    name="discount"
                    type="number"
                    placeholder="Discount %"
                    defaultValue={editingProduct?.discount || ""}
                    className="border p-2 rounded"
                />

                <select
                    name="category"
                    defaultValue={editingProduct?.category || ""}
                    className="border p-2 rounded"
                    required
                >

                    <option value="">Select Category</option>
                    <option value="Mobile Accessories">Mobile Accessories</option>
                    <option value="Computer Accessories">Computer Accessories</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Network">Network</option>

                </select>


                {/* IMAGE SLOT UPLOADER */}

                <div className="md:col-span-2">

                    <label className="font-semibold mb-3 block">
                        Product Images (Max 6)
                    </label>

                    <div className="grid grid-cols-3 gap-4">

                        {images.map((img, index) => (

                            <label
                                key={index}
                                className="relative h-28 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-500"
                            >

                                {img ? (

                                    <img
                                        src={URL.createObjectURL(img)}
                                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                    />

                                ) : (

                                    <span className="text-gray-400 text-2xl">
                                        +
                                    </span>

                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                        handleImageChange(index, e.target.files[0])
                                    }
                                />

                            </label>

                        ))}

                    </div>

                </div>

                <button
                    className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 md:col-span-2"
                >
                    {editingProduct ? "Update Product" : "Add Product"}
                </button>

            </form>


            {/* PRODUCT LIST */}

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

                {products.map(product => (

                    <div
                        key={product._id}
                        className="bg-white border rounded-lg p-2 shadow-sm hover:shadow-md transition"
                    >

                        {/* PRODUCT IMAGE */}

                        <div className="w-full h-24 overflow-hidden rounded-md bg-gray-100">

                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />

                        </div>

                        {/* PRODUCT INFO */}

                        <div className="mt-2">

                            <h3 className="text-xs font-semibold leading-tight line-clamp-2">
                                {product.name}
                            </h3>

                            <p className="text-xs text-gray-500">
                                {product.category}
                            </p>

                            <p className="text-sm font-bold text-indigo-600">
                                ৳{product.price}
                            </p>

                        </div>

                        {/* ACTION BUTTONS */}

                        <div className="flex gap-1 mt-2">

                            <button
                                onClick={() => handleEdit(product)}
                                className="flex-1 bg-yellow-500 text-white text-xs py-1 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(product._id)}
                                className="flex-1 bg-red-600 text-white text-xs py-1 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Dashboard;
