import { BiHide, BiShowAlt } from 'react-icons/bi';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { AuthContext } from "./AuthProvider";

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        if (email !== "abusiddik9994@gmail.com" || password !== "ExploreTechify-84@19912344") {
            Swal.fire({ icon: 'error', title: 'Access Denied', text: 'Invalid credentials', confirmButtonText: 'Back' });
            return;
        }

        signIn(email, password)
            .then(() => navigate(location?.state || '/'))
            .catch(() => Swal.fire({ icon: 'error', title: 'Error', text: 'Login failed', confirmButtonText: 'Back' }));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Helmet><title>Explore Techify | Login</title></Helmet>

            <div className="w-full max-w-[860px] grid grid-cols-2 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

                {/* ── Left panel ── */}
                <div className="bg-[#1a1a1a] p-12 flex flex-col justify-between min-h-[560px]">

                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                                <rect x="2" y="2" width="5" height="5" rx="1" fill="#1a1a1a"/>
                                <rect x="9" y="2" width="5" height="5" rx="1" fill="#1a1a1a"/>
                                <rect x="2" y="9" width="5" height="5" rx="1" fill="#1a1a1a"/>
                                <rect x="9" y="9" width="5" height="5" rx="1" fill="#1a1a1a" opacity="0.3"/>
                            </svg>
                        </div>
                        <span className="text-white text-[16px] font-medium tracking-wide">Explore Techify</span>
                    </div>

                    {/* Headline */}
                    <div className="flex-1 flex flex-col justify-center py-10">
                        <h2 className="text-white text-[30px] font-medium leading-snug mb-3">
                            Your tech store,<br />smarter.
                        </h2>
                        <p className="text-[#888] text-[15px] leading-relaxed">
                            Manage inventory, orders,<br />and insights — all in one place.
                        </p>

                        <div className="flex flex-col gap-3.5 mt-10">
                            {[
                                'Real-time inventory sync',
                                'Order & sales analytics',
                                'Secure admin access',
                            ].map(f => (
                                <div key={f} className="flex items-center gap-2.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#555] flex-shrink-0" />
                                    <span className="text-[#777] text-[14px]">{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <span className="text-[#444] text-[13px]">© 2025 Explore Techify</span>
                </div>

                {/* ── Right panel ── */}
                <div className="p-12 flex flex-col justify-center">
                    <h3 className="text-[26px] font-medium text-gray-900 mb-2">Welcome back</h3>
                    <p className="text-[15px] text-gray-500 mb-9">Sign in to your admin account</p>

                    <form onSubmit={handleLogin} className="flex flex-col">

                        {/* Email */}
                        <div className="mb-5">
                            <label className="block text-[13px] font-medium text-gray-500 mb-1.5">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                className="w-full h-[46px] bg-gray-50 border border-gray-200 rounded-[10px] px-3.5 text-[15px] text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-black/5 transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label className="block text-[13px] font-medium text-gray-500 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="••••••••"
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full h-[46px] bg-gray-50 border border-gray-200 rounded-[10px] px-3.5 pr-11 text-[15px] text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-2 focus:ring-black/5 transition-all"
                                />
                                {password && (
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(p => !p)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <BiHide size={18} /> : <BiShowAlt size={18} />}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Forgot */}
                        <div className="text-right mb-6">
                            <a href="#" className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full h-12 bg-[#1a1a1a] hover:bg-[#333] active:scale-[0.98] rounded-[10px] text-white text-[16px] font-medium tracking-wide transition-all"
                        >
                            Sign in
                        </button>

                        <p className="text-center text-[13px] text-gray-400 mt-6">
                            Need access?{' '}
                            <a href="#" className="text-gray-700 font-medium hover:underline">
                                Contact support
                            </a>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;