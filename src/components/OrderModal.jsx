import React, { useState } from "react";

const OrderModal = ({ product, onClose }) => {

    const [quantity, setQuantity] = useState(1);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
    const [payment, setPayment] = useState("cod");
    const [trxId, setTrxId] = useState("");

    const discountedPrice =
        product.discount > 0
            ? product.price - (product.price * product.discount) / 100
            : product.price;

    const total = Math.round(discountedPrice * quantity);

    const handleOrder = () => {

        if (!phone || !address) {
            alert("⚠️ Phone & Address required");
            return;
        }

        if ((payment === "bkash" || payment === "nagad") && !trxId) {
            alert("⚠️ Transaction ID দিতে হবে");
            return;
        }

        const orderData = {
            productId: product._id,
            name: product.name,
            price: discountedPrice,
            quantity,
            phone,
            address,
            location,
            paymentMethod: payment,
            trxId: payment === "cod" ? null : trxId,
            total
        };

        fetch("http://localhost:5000/orders", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(orderData)
        })
            .then(res => res.json())
            .then(data => {

                if (data.success) {
                    alert("✅ Order Confirmed!");
                    onClose();
                } else {
                    alert("❌ Order Failed");
                }

            })
            .catch(() => alert("❌ Server Error"));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white w-full max-w-md p-6 rounded-xl">

                <h2 className="text-xl font-bold mb-4">
                    Order: {product.name}
                </h2>

                {/* Quantity */}
                <div className="flex gap-3 mb-4">
                    <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="px-3 border">-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 border">+</button>
                </div>

                {/* Phone */}
                <input
                    type="text"
                    placeholder="Contact Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border p-2 mb-3 rounded"
                />

                {/* Address */}
                <textarea
                    placeholder="Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border p-2 mb-3 rounded"
                />

                {/* Google Map Location (Optional) */}
                <input
                    type="text"
                    placeholder="Google Map Location (optional link)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border p-2 mb-3 rounded"
                />

                {/* Payment */}
                <div className="mb-3">
                    <p className="font-semibold mb-2">Payment Method</p>

                    <select
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="cod">Cash on Delivery</option>
                        <option value="bkash">bKash</option>
                        <option value="nagad">Nagad</option>
                    </select>
                </div>

                {/* bKash / Nagad Info */}
                {(payment === "bkash" || payment === "nagad") && (
                    <div className="mb-3">

                        <p className="text-sm text-gray-600 mb-1">
                            Send money to:
                        </p>

                        <p className="font-bold text-indigo-600 mb-2">
                            {payment === "bkash" ? "01XXXXXXXXX (bKash)" : "01XXXXXXXXX (Nagad)"}
                        </p>

                        <input
                            type="text"
                            placeholder="Transaction ID"
                            value={trxId}
                            onChange={(e) => setTrxId(e.target.value)}
                            className="w-full border p-2 rounded"
                        />

                    </div>
                )}

                {/* Total */}
                <p className="font-bold mb-4">
                    Total: ৳{total}
                </p>

                {/* Buttons */}
                <div className="flex gap-2">

                    <button
                        onClick={handleOrder}
                        className="flex-1 bg-indigo-600 text-white py-2 rounded"
                    >
                        Confirm Order
                    </button>

                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-300 py-2 rounded"
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>
    );
};

export default OrderModal;