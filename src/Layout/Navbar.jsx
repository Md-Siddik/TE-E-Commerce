import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authentication/AuthProvider';
import { Menu, X, Monitor, LogOut, LogIn, Zap } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
        navigate('/');
    };

    const links = [
        { to: "/", label: "Home" },
        { to: "/shop", label: "Shop" },
        { to: "/sell", label: "Sell" },
        { to: "/vendors", label: "Vendors" },
        { to: "/contact", label: "Contact" },
        ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : []),
    ];

    return (
        <nav
            className="w-full sticky top-0 z-50 border-b border-white/[0.08]"
            style={{
                background: "rgba(10, 10, 20, 0.80)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
            }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-[68px]">

                    {/* ── Logo ── */}
                    <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                        <div className="w-9 h-9 rounded-[10px] bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/60 group-hover:bg-indigo-500 transition-colors duration-200">
                            <Zap size={16} className="text-white" />
                        </div>
                        <span className="text-[17px] font-extrabold text-white tracking-tight">
                            Explore<span className="text-indigo-400">Techify</span>
                        </span>
                    </Link>

                    {/* ── Desktop Nav ── */}
                    <ul className="hidden md:flex items-center gap-0.5">
                        {links.map(({ to, label }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    end={to === "/"}
                                    className={({ isActive }) =>
                                        `text-[14px] font-semibold px-3.5 py-2 rounded-[10px] transition-all duration-150 border ${
                                            isActive
                                                ? "text-white bg-indigo-500/15 border-indigo-500/35"
                                                : "text-white/50 border-transparent hover:text-white/90 hover:bg-white/[0.07] hover:border-white/10"
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* ── Right Actions ── */}
                    <div className="hidden md:flex items-center gap-2 shrink-0">

                        {/* PC Builder */}
                        <Link to="/pcBuilder">
                            <button className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-bold transition-colors duration-150 shadow-lg shadow-indigo-900/50 overflow-hidden">
                                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <Monitor size={14} /> PC Builder
                            </button>
                        </Link>

                        {/* Auth */}
                        {user ? (
                            <button
                                onClick={handleLogOut}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-[13px] font-bold text-white/50 hover:text-rose-400 border border-white/10 hover:border-rose-500/40 hover:bg-rose-500/10 transition-all duration-150"
                            >
                                <LogOut size={14} /> Log Out
                            </button>
                        ) : (
                            <Link to="/login">
                                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-[13px] font-bold text-white/50 hover:text-indigo-300 border border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-150">
                                    <LogIn size={14} /> Login
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* ── Mobile Hamburger ── */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-[10px] text-white/50 hover:text-white hover:bg-white/[0.08] border border-white/10 transition-all duration-150"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* ── Mobile Menu ── */}
            {mobileOpen && (
                <div
                    className="md:hidden border-t border-white/[0.08] px-5 py-4 space-y-1"
                    style={{
                        background: "rgba(10, 10, 20, 0.95)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                    }}
                >
                    {links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `block px-4 py-2.5 rounded-[10px] text-[14px] font-semibold transition-all duration-150 border ${
                                    isActive
                                        ? "bg-indigo-500/15 text-white border-indigo-500/35"
                                        : "text-white/50 hover:text-white hover:bg-white/[0.07] border-transparent"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}

                    <div className="pt-3 border-t border-white/[0.08] space-y-2">
                        <Link to="/pcBuilder" onClick={() => setMobileOpen(false)}>
                            <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] bg-indigo-600 hover:bg-indigo-500 text-white text-[14px] font-bold transition-colors duration-150">
                                <Monitor size={15} /> PC Builder
                            </button>
                        </Link>

                        {user ? (
                            <button
                                onClick={() => { handleLogOut(); setMobileOpen(false); }}
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] text-[14px] font-bold text-rose-400 border border-rose-500/30 bg-rose-500/10 transition-all duration-150"
                            >
                                <LogOut size={15} /> Log Out
                            </button>
                        ) : (
                            <Link to="/login" onClick={() => setMobileOpen(false)}>
                                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] text-[14px] font-bold text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 transition-all duration-150">
                                    <LogIn size={15} /> Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;