import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import CartModal from "../context/CartContext";
import CartProvider from "../context/CartContext"; // ✅ MUST

const Main = () => {

    const [showCart, setShowCart] = useState(false);

    return (
        <CartProvider>

            <Navbar setShowCart={setShowCart} />

            <Outlet />

            <CartModal
                showCart={showCart}
                setShowCart={setShowCart}
            />

        </CartProvider>
    );
};

export default Main;