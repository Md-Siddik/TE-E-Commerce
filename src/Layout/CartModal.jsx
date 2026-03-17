import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartModal = ({ showCart, setShowCart }) => {

    const { cart, increaseQty, decreaseQty, removeItem } = useContext(CartContext);

    const total = cart.reduce((sum, item) => {
        const price = item.discount > 0
            ? item.price - (item.price * item.discount) / 100
            : item.price;

        return sum + price * item.quantity;
    }, 0);

    return (
        <>
            {/* Overlay */}
            <div
                onClick={() => setShowCart(false)}
                className={`fixed inset-0 bg-black/40 z-40 transition ${showCart ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-lg transform transition-transform duration-300
                ${showCart ? "translate-x-0" : "translate-x-full"}
            `}>

                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="font-bold text-lg">Your Cart</h2>
                    <button onClick={() => setShowCart(false)}>✕</button>
                </div>

                <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">

                    {cart.length === 0 && <p>No items</p>}

                    {cart.map(item => {

                        const price = item.discount > 0
                            ? item.price - (item.price * item.discount) / 100
                            : item.price;

                        return (
                            <div key={item._id} className="mb-4 border-b pb-2">

                                <p className="text-sm font-medium">{item.name}</p>

                                <div className="flex justify-between items-center mt-1">

                                    <div className="flex gap-2 items-center">
                                        <button onClick={() => decreaseQty(item._id)} className="px-2 border">-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => increaseQty(item._id)} className="px-2 border">+</button>
                                    </div>

                                    <p className="text-sm font-semibold">
                                        ৳{Math.round(price * item.quantity)}
                                    </p>

                                </div>

                                <button
                                    onClick={() => removeItem(item._id)}
                                    className="text-red-500 text-xs mt-1"
                                >
                                    Remove
                                </button>

                            </div>
                        );
                    })}

                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white">

                    <p className="font-bold mb-3">
                        Total: ৳{Math.round(total)}
                    </p>

                    <button className="w-full bg-indigo-600 text-white py-2 rounded">
                        Checkout
                    </button>

                </div>

            </div>
        </>
    );
};

export default CartModal;