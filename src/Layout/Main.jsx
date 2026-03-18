import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar";

const Main = () => {

    return (
        <div>
            <Navbar />

            <Outlet />
            {/* FOOTER */}
            <footer className="bg-gray-900 text-gray-400 text-center py-10">

                © {new Date().getFullYear()} TechStore. All rights reserved.

            </footer>
        </div>
    );
};

export default Main;