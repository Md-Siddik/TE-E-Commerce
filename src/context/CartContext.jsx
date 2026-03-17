import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

    // ✅ Load from localStorage
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    // ✅ Save to localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {

        const exist = cart.find(item => item._id === product._id);

        if (exist) {
            setCart(cart.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const increaseQty = (id) => {
        setCart(cart.map(item =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQty = (id) => {
        setCart(cart.map(item =>
            item._id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ));
    };

    const removeItem = (id) => {
        setCart(cart.filter(item => item._id !== id));
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            increaseQty,
            decreaseQty,
            removeItem,
            setCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;