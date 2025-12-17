import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: 'Login Successful',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    iconColor: '#EF4444',
                    background: '#fff',
                    color: '#1F2937'
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                    confirmButtonColor: '#EF4444',
                    background: '#fff',
                    color: '#1F2937'
                })
            })
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Left Side - Image/Info */}
                <div className="w-full md:w-1/2 bg-red-50 p-12 flex flex-col justify-center relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
                         <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#FF0000" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-8.2C81.5,4.1,70.2,14.2,60.9,23.3C51.6,32.4,44.3,40.5,35.7,46.7C27.1,52.9,17.2,57.1,5.5,62.3C-6.2,67.5,-19.7,73.7,-31.6,71.9C-43.5,70.1,-53.8,60.3,-62.4,49.1C-71,37.9,-77.9,25.3,-79.3,11.9C-80.7,-1.5,-76.6,-15.7,-68.6,-27.1C-60.6,-38.5,-48.7,-47.1,-36.4,-55.1C-24.1,-63.1,-11.4,-70.5,2.4,-74.6C16.2,-78.7,30.5,-79.6,44.7,-76.4Z" transform="translate(100 100)" />
                        </svg>
                     </div>
                     <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome Back!</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Log in to manage your donations, update your profile, and see the impact you're making in the community.
                        </p>
                        <div className="flex items-center gap-4 text-sm font-medium text-red-600 bg-red-100 p-4 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            "You are a hero for someone."
                        </div>
                     </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-12">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800">Sign In</h3>
                        <p className="text-gray-400 text-sm">Access your donor account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Email Address</span>
                            </label>
                            <input type="email" name="email" placeholder="name@example.com" className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-red-500 transition-colors" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full bg-gray-50 focus:bg-white focus:border-red-500 transition-colors" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-red-500 font-medium ml-auto">Forgot password?</a>
                            </label>
                        </div>
                        <button className="btn bg-red-500 hover:bg-red-600 text-white w-full border-none shadow-md hover:shadow-lg transition-all h-12 text-lg">
                            Login
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account? <Link to="/register" className="text-red-500 font-bold hover:underline">Register Now</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default Login;
