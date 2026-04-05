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

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = e => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        const allowedEmail = "abusiddik9994@gmail.com";
        const allowedPassword = "ExploreTechify-84@19912344";

        if (email !== allowedEmail || password !== allowedPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'Invalid credentials',
                confirmButtonText: 'Back'
            });
            return;
        }

        signIn(email, password)
            .then(result => {
                navigate(location?.state || '/');
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Login failed',
                    confirmButtonText: 'Back'
                });
            });
    };

    return (
        <div className="relative"> {/* Ensure the container is relative */}
            <Helmet>
                <title>Techno Espial | Login</title>
            </Helmet>
            <div className="container mx-auto flex justify-center">
                <div className="w-full flex items-center justify-center py-16">

                    {/* Form Div */}
                    <div className="relative z-10 py-8 border text-black">
                        <p className="text-3xl text-white text-center font-bold">Login</p>
                        <form onSubmit={handleLogin} className="w-[550px] text-center flex flex-col justify-between p-8 gap-8">
                            <input className="w-full p-2 border text-xl" type="email" name="email" placeholder="Email" />

                            <div className="flex items-center relative">
                                <input
                                    className="w-full p-2 border text-xl pr-8"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    onChange={handlePasswordChange}
                                />
                                {password && (
                                    showPassword ? (
                                        <BiHide
                                            className="absolute right-2 text-xl cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        />
                                    ) : (
                                        <BiShowAlt
                                            className="absolute right-2 text-xl cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        />
                                    )
                                )}
                            </div>

                            <input className="btn bg-[#00A4B0] text-xl font-bold text-white" type="submit" value="Login" />

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;