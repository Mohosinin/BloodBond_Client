/**
 * MODIFIED BY: [Person 1 Name]
 * FEATURE: Dark/Light Mode Support + UI Improvements
 * 
 * Changes Made:
 * - Added useTheme hook for theme-aware styling
 * - Dynamic background, text, and card colors based on theme
 * - Improved animations and hover effects
 * - Enhanced glassmorphism effects
 */

import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../../assets/hero_bg.png';
import { FaEnvelope, FaFacebook, FaHeart, FaInstagram, FaMap, FaPhone, FaTwitter, FaUsers, FaUserShield} from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';

const Home = () => {
    const { isDark } = useTheme();

    return (
        <div className={`font-sans transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <div className={`relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className={`relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                        <svg className={`hidden lg:block absolute right-0 inset-y-0 h-full w-48 transform translate-x-1/2 ${isDark ? 'text-gray-900' : 'text-white'}`} fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>

                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <div className={`inline-block px-4 py-1.5 font-semibold rounded-full text-sm mb-6 border animate-pulse ${
                                    isDark 
                                        ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                        : 'bg-red-50 text-red-600 border-red-100'
                                }`}>
                                     ❤️ Saving Lives, Together
                                </div>
                                <h1 className={`text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    <span className="block xl:inline">Donate Blood,</span>{' '}
                                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400 xl:inline">Save a Life.</span>
                                </h1>
                                <p className={`mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Your donation is the power to save lives. It's safe, simple, and makes a huge difference. Join our community of heroes today.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25">
                                            Become a Donor
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link to="/search" className={`w-full flex items-center justify-center px-8 py-3 border text-base font-medium rounded-full md:py-4 md:text-lg transition-all hover:scale-105 ${
                                            isDark 
                                                ? 'border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700 hover:border-gray-600' 
                                                : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300'
                                        }`}>
                                            Find Donors
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className={`lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 ${isDark ? 'bg-red-950/50' : 'bg-red-50'}`}>
                    <img className={`h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full ${isDark ? 'opacity-70' : 'opacity-90'}`} src={heroBg} alt="Blood Donation Community" />
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Safe & Secure", desc: "100% sterile & safe process", icon: <FaUserShield className="text-red-500"></FaUserShield> },
                        { title: "2400+ Donors", desc: "Active donors ready to help", icon: <FaUsers className="text-red-500"></FaUsers> },
                        { title: "Lives Saved", desc: "Helping thousands recover", icon: <FaHeart className="text-red-500"></FaHeart> }
                    ].map((stat, idx) => (
                        <div key={idx} className={`backdrop-blur-md border shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex items-center gap-6 ${
                            isDark 
                                ? 'bg-gray-800/80 border-gray-700/50 hover:border-red-500/30' 
                                : 'bg-white/80 border-white/20'
                        }`}>
                            <div className={`text-4xl w-16 h-16 rounded-full flex items-center justify-center shadow-inner ${
                                isDark ? 'bg-gradient-to-br from-red-900/50 to-red-950/50' : 'bg-gradient-to-br from-red-100 to-red-50'
                            }`}>
                                {stat.icon}
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.title}</h3>
                                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>{stat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Impact Section */}
            <div className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase">Why Donate?</h2>
                        <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            The Gift of Life
                        </p>
                        <p className={`mt-4 max-w-2xl text-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Blood is the most precious gift that anyone can give to another person – the gift of life.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop", title: "Free Health Check", desc: "Get a mini-physical checkup before every donation." },
                            { img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=2070&auto=format&fit=crop", title: "Community Impact", desc: "Directly help people in your local community recover." },
                            { img: "https://www.ribc.org/wp-content/uploads/sites/2/2024/07/CBC_24_Blood_Emergency_Web-Carousel-1200x894-1-1024x763.png", title: "Emergency Support", desc: "Be the hero during critical emergencies and disasters." },
                        ].map((item, idx) => (
                            <div key={idx} className={`flex flex-col rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border ${
                                isDark 
                                    ? 'bg-gray-800 border-gray-700 hover:border-red-500/30' 
                                    : 'bg-white border-gray-100'
                            }`}>
                                <div className="flex-shrink-0 overflow-hidden">
                                    <img className="h-48 w-full object-cover hover:scale-110 transition-transform duration-500" src={item.img} alt={item.title} />
                                </div>
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</p>
                                        <p className={`mt-3 text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Us Section */}
            <div className={`py-24 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className={`max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="md:w-1/2 p-12 bg-gradient-to-br from-red-600 to-red-700 text-white flex flex-col justify-between relative overflow-hidden">
                             {/* Decorative circles */}
                             <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10"></div>
                             <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-white opacity-10"></div>
                             
                            <div>
                                <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
                                <p className="text-red-100 mb-8 text-lg">Have questions about donating? Our team is available 24/7 to assist you.</p>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><FaPhone></FaPhone></div>
                                        <span className="text-lg">+880 1234 567 890</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><FaEnvelope></FaEnvelope></div>
                                        <span className="text-lg">contact@bloodbond.com</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><FaMap></FaMap></div>
                                        <span className="text-lg">123 Health Street, Dhaka</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-12 flex gap-4">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors text-white">
                                    <FaFacebook />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors text-white">
                                    <FaTwitter />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors text-white">
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>
                        
                        <div className={`md:w-1/2 p-12 ${isDark ? 'bg-gray-800' : ''}`}>
                            <form className="space-y-6">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                                    <input type="text" placeholder="Your Name" className={`w-full px-4 py-3 rounded-xl border focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all ${
                                        isDark 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                                            : 'bg-gray-50 border-gray-200 focus:bg-white'
                                    }`} />
                                </div>
                                <div>
                                     <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                                    <input type="email" placeholder="Your Email" className={`w-full px-4 py-3 rounded-xl border focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all ${
                                        isDark 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                                            : 'bg-gray-50 border-gray-200 focus:bg-white'
                                    }`} />
                                </div>
                                <div>
                                     <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                                    <textarea rows="4" placeholder="Your Message" className={`w-full px-4 py-3 rounded-xl border focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all resize-none ${
                                        isDark 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                                            : 'bg-gray-50 border-gray-200 focus:bg-white'
                                    }`}></textarea>
                                </div>
                                <button className={`w-full font-bold py-4 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg ${
                                    isDark 
                                        ? 'bg-red-600 hover:bg-red-700 text-white hover:shadow-red-500/25' 
                                        : 'bg-gray-900 hover:bg-black text-white'
                                }`}>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative bg-gray-900 py-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full z-0 opacity-30">
                     <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-[128px]"></div>
                     <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[128px]"></div>
                </div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
                        Ready to make a difference?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Your contribution can help save a life. Join our community of donors and become a hero today.
                    </p>
                    <Link to="/register" className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-full text-red-600 bg-white hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl hover:shadow-white/20">
                        Start Donating Now
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Home;
