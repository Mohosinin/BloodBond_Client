/**
 * PREMIUM LOGIN PAGE
 * Features: Beautiful visuals, animations, user-friendly icons, premium UI
 */

import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { 
    FaEye, FaEyeSlash, FaLock, FaEnvelope, FaRocket, 
    FaHeart, FaUserShield, FaHandHoldingHeart, FaTint,
    FaCheckCircle, FaArrowRight
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useTheme from '../hooks/useTheme';

const Login = () => {
    const { signIn, signInWithGoogle, resetPassword } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark } = useTheme();

    const from = location.state?.from?.pathname || "/";

    // Demo credentials
    const DEMO_EMAIL = "demo@demo1.com";
    const DEMO_PASSWORD = "Demo@1234";

    const validateForm = (email, password) => {
        const newErrors = {};
        
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email";
        }
        
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const { value: email } = await Swal.fire({
            title: 'Reset Password',
            input: 'email',
            inputLabel: 'Enter your email address',
            inputPlaceholder: 'name@example.com',
            showCancelButton: true,
            confirmButtonText: 'Send Reset Link',
            confirmButtonColor: '#EF4444',
            background: isDark ? '#1a1a24' : '#fff',
            color: isDark ? '#f8fafc' : '#1F2937',
            customClass: {
                input: isDark ? 'bg-gray-800 text-white border-gray-600' : ''
            },
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write your email!'
                }
            }
        });

        if (email) {
             try {
                await resetPassword(email);
                Swal.fire({
                    icon: 'success',
                    title: 'Email Sent',
                    text: 'Password reset link sent to your email.',
                    confirmButtonColor: '#EF4444',
                    background: isDark ? '#1a1a24' : '#fff',
                    color: isDark ? '#f8fafc' : '#1F2937'
                });
             } catch (error) {
                 Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                    confirmButtonColor: '#EF4444',
                    background: isDark ? '#1a1a24' : '#fff',
                    color: isDark ? '#f8fafc' : '#1F2937'
                });
             }
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        
        if (!validateForm(email, password)) return;
        
        setIsLoading(true);
        
        try {
            await signIn(email, password);
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
                background: isDark ? '#1a1a24' : '#fff',
                color: isDark ? '#f8fafc' : '#1F2937'
            });
            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message,
                confirmButtonColor: '#EF4444',
                background: isDark ? '#1a1a24' : '#fff',
                color: isDark ? '#f8fafc' : '#1F2937'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
            Swal.fire({
                icon: 'success',
                title: 'Welcome Back!',
                text: 'Google Login Successful',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                iconColor: '#EF4444',
                background: isDark ? '#1a1a24' : '#fff',
                color: isDark ? '#f8fafc' : '#1F2937'
            });
            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message,
                confirmButtonColor: '#EF4444',
                background: isDark ? '#1a1a24' : '#fff',
                color: isDark ? '#f8fafc' : '#1F2937'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoLogin = () => {
        const emailInput = document.querySelector('input[name="email"]');
        const passwordInput = document.querySelector('input[name="password"]');
        
        if (emailInput && passwordInput) {
            emailInput.value = DEMO_EMAIL;
            passwordInput.value = DEMO_PASSWORD;
            
            Swal.fire({
                icon: 'info',
                title: 'Demo Credentials Filled',
                text: 'Click "Sign In" to continue with demo account',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                background: isDark ? '#1a1a24' : '#fff',
                color: isDark ? '#f8fafc' : '#1F2937'
            });
        }
    };

    const inputClass = `input input-bordered w-full pl-12 h-14 text-base transition-all duration-300 ${
        isDark 
            ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
            : 'bg-gray-50 border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
    }`;

    const features = [
        { icon: FaHeart, text: "Save lives with your donation" },
        { icon: FaUserShield, text: "Secure & verified platform" },
        { icon: FaHandHoldingHeart, text: "Connect with donors" },
    ];

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-gradient-to-br from-red-50 via-white to-pink-50'}`}>
            
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${isDark ? 'bg-red-900/20' : 'bg-red-200/60'}`}></div>
                <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 ${isDark ? 'bg-pink-900/20' : 'bg-pink-200/60'}`}></div>
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-red-900/10' : 'bg-red-100/40'}`}></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10 ${isDark ? 'bg-gray-900/90 backdrop-blur-xl border border-gray-800' : 'bg-white/90 backdrop-blur-xl'}`}
            >
                
                {/* Left Side - Visual Section */}
                <div className="w-full lg:w-1/2 relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-rose-600"></div>
                    
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
                    <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float delay-1000"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 p-10 lg:p-14 flex flex-col justify-center min-h-[400px] lg:min-h-full">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Logo/Brand */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                    <FaTint className="text-red-500 text-2xl" />
                                </div>
                                <span className="text-2xl font-bold text-white">BloodBond</span>
                            </div>
                            
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                Welcome Back,<br />
                                <span className="text-red-200">Hero!</span>
                            </h2>
                            
                            <p className="text-red-100 text-lg mb-8 leading-relaxed">
                                Every login brings you closer to saving another life. Continue your journey of hope.
                            </p>
                            
                            {/* Features */}
                            <div className="space-y-4">
                                {features.map((feature, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                        className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl"
                                    >
                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                            <feature.icon className="text-white text-lg" />
                                        </div>
                                        <span className="text-white font-medium">{feature.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className={`w-full lg:w-1/2 p-8 lg:p-14 ${isDark ? '' : ''}`}>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="text-center lg:text-left mb-8">
                            <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                Sign In
                            </h3>
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Access your donor account to continue
                            </p>
                        </div>

                        {/* Demo Login Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className={`mb-8 p-4 rounded-2xl border-2 border-dashed ${
                                isDark ? 'border-amber-500/30 bg-amber-500/5' : 'border-amber-400 bg-amber-50'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
                                        <FaRocket className={isDark ? 'text-amber-400' : 'text-amber-500'} />
                                    </div>
                                    <div>
                                        <p className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>Try Demo</p>
                                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Quick access to explore</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleDemoLogin}
                                    className={`btn btn-sm gap-2 rounded-full ${
                                        isDark 
                                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30' 
                                            : 'bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200'
                                    }`}
                                >
                                    Fill <FaArrowRight />
                                </button>
                            </div>
                        </motion.div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="form-control">
                                <label className={`label font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="flex items-center gap-2">
                                        <FaEnvelope className="text-red-500" />
                                        Email Address
                                    </span>
                                </label>
                                <div className="relative">
                                    <FaEnvelope className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="name@example.com" 
                                        className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`}
                                        required 
                                    />
                                </div>
                                {errors.email && <span className="text-red-500 text-sm mt-1 flex items-center gap-1"><FaCheckCircle /> {errors.email}</span>}
                            </div>

                            <div className="form-control">
                                <label className={`label font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="flex items-center gap-2">
                                        <FaLock className="text-red-500" />
                                        Password
                                    </span>
                                </label>
                                <div className="relative">
                                    <FaLock className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        placeholder="••••••••" 
                                        className={`${inputClass} pr-12 ${errors.password ? 'border-red-500' : ''}`}
                                        required 
                                    />
                                    <button 
                                        type="button"
                                        className={`absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                                            isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                        }`}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-red-500 text-sm mt-1 flex items-center gap-1"><FaCheckCircle /> {errors.password}</span>}
                                <label className="label">
                                    <a href="#" onClick={handleForgotPassword} className="label-text-alt link link-hover text-red-500 font-medium ml-auto">Forgot password?</a>
                                </label>
                            </div>

                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="btn w-full h-14 text-lg font-semibold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-none shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 hover:-translate-y-0.5 rounded-xl"
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner loading-md"></span>
                                ) : (
                                    <>Sign In <FaArrowRight className="ml-2" /></>
                                )}
                            </button>
                        </form>

                        <div className={`divider my-8 ${isDark ? 'before:bg-gray-700 after:bg-gray-700 text-gray-500' : 'before:bg-gray-200 after:bg-gray-200 text-gray-400'}`}>
                            or continue with
                        </div>

                        <button 
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className={`btn btn-outline w-full h-14 text-base font-medium flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-0.5 rounded-xl ${
                                isDark 
                                    ? 'border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-gray-300' 
                                    : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700'
                            }`}
                        >
                            <FcGoogle className="text-2xl" />
                            Continue with Google
                        </button>

                        <div className={`mt-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Don't have an account?{' '}
                            <Link to="/register" className="text-red-500 font-bold hover:underline inline-flex items-center gap-1">
                                Register Now <FaArrowRight className="text-xs" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
