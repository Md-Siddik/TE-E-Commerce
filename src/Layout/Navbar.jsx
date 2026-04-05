import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthProvider';

const Navbar = () => {

    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));

        navigate('/');
    }

    const navLinks = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "border-b-2 border-blue-500 py-2 px-3 mx-1"
                        : "hover:border-b-2 hover:border-blue-500 py-2 px-3"
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/shop">Shop</NavLink>
        </li>

        <li>
            <NavLink to="/sell">Sell</NavLink>
        </li>
        <li>
            <NavLink to="/vendors">Vendors</NavLink>
        </li>
        <li>
            <NavLink to="/contact">Contact</NavLink>
        </li>
        <li className={user? "block" : "hidden"}>
            <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
    </>

    return (
        <nav className="w-full bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800">
                        Anam <span className="text-blue-600">Tech</span>
                    </div>

                    {/* Menu */}
                    <ul className="hidden md:flex items-center gap-6 font-medium">
                        {navLinks}
                    </ul>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">

                        {/* PC Builder */}
                        <a
                            href="/pcBuilder"
                            className="relative px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg overflow-hidden group"
                        >
                            <span className="relative z-10">PC Builder</span>
                        </a>

                        {
                            user ? <button onClick={handleLogOut}>Log Out</button>
                                :
                                <Link to="/login">
                                    <button>Login</button>
                                </Link>
                        }

                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;