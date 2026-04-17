import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const Main = () => {

    return (
        <div>
            <Navbar />

            <Outlet />
            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default Main;