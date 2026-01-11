/**
 * ENHANCED ROOT LAYOUT
 * Features: Dropdown menus, improved mobile navigation, responsive design
 */

import React, { useState, useEffect } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import { AnimatePresence, motion } from 'framer-motion';
import { 
    FaBars, FaFacebook, FaTwitter, FaInstagram, FaTint, FaLinkedin, FaYoutube, 
    FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTimes, FaChevronDown, FaInfoCircle,
    FaQuestionCircle, FaPhone, FaHome, FaHandHoldingHeart, FaSearch, FaNewspaper,
    FaDonate, FaUser, FaSignOutAlt, FaTachometerAlt
} from 'react-icons/fa';
import ThemeToggle from '../Components/ThemeToggle/ThemeToggle';
import EmergencyContact from '../Components/EmergencyContact/EmergencyContact';

const RootLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
    const { user, logOut } = useAuth();
    const { isDark } = useTheme();
    const location = useLocation();

    // Handle scroll for sticky navbar effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isMenuOpen && !e.target.closest('.mobile-menu-container')) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    // Dynamic classes based on theme and scroll
    const navbarClass = `navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
            ? isDark 
                ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800' 
                : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : isDark 
                ? 'bg-gray-900 border-b border-gray-800' 
                : 'bg-white border-b border-gray-200'
    }`;

    const navLinkClass = ({ isActive }) => {
        if (isDark) {
            return isActive 
                ? "text-red-500 font-semibold" 
                : "text-gray-300 hover:text-red-500 font-medium transition-colors";
        } else {
            return isActive 
                ? "text-red-500 font-semibold" 
                : "text-gray-700 hover:text-red-500 font-medium transition-colors";
        }
    };

    const mobileNavLinkClass = ({ isActive }) => {
        if (isDark) {
            return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                    ? "bg-red-500/10 text-red-500 font-semibold" 
                    : "text-gray-300 hover:bg-gray-800"
            }`;
        } else {
            return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                    ? "bg-red-50 text-red-500 font-semibold" 
                    : "text-gray-700 hover:bg-gray-100"
            }`;
        }
    };

    const footerClass = isDark 
        ? "bg-gray-900 text-gray-400 transition-all duration-500"
        : "bg-gray-100 text-gray-600 transition-all duration-500";

    const footerTitleClass = isDark ? "text-white" : "text-gray-900";

    return (
        <div className={`flex flex-col min-h-screen font-sans transition-all duration-500 ${isDark ? 'bg-gray-950 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
            {/* Navbar */}
            <nav className={navbarClass}>
                <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 py-2">
                        <span className="text-2xl lg:text-3xl">🩸</span>
                        <span className={`text-xl lg:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Blood<span className="text-red-500">Bond</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        <NavLink to="/" className={navLinkClass}>Home</NavLink>
                        <NavLink to="/donation-requests" className={navLinkClass}>Donation Requests</NavLink>
                        <NavLink to="/search" className={navLinkClass}>Find Donors</NavLink>
                        <NavLink to="/blood-compatibility" className={({ isActive }) => 
                            `flex items-center gap-1 ${navLinkClass({ isActive })}`
                        }>
                            <FaTint className="text-xs" />Blood Types
                        </NavLink>
                        <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
                        
                        {/* More Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                                onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
                                className={`flex items-center gap-1 font-medium transition-colors ${
                                    isDark ? 'text-gray-300 hover:text-red-500' : 'text-gray-700 hover:text-red-500'
                                }`}
                            >
                                More <FaChevronDown className={`text-xs transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {moreDropdownOpen && (
                                <div className={`absolute top-full right-0 mt-2 w-48 rounded-xl shadow-xl border py-2 z-50 ${
                                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                }`}>
                                    <Link 
                                        to="/about" 
                                        className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                                            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        <FaInfoCircle className="text-red-500" /> About Us
                                    </Link>
                                    <Link 
                                        to="/contact" 
                                        className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                                            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        <FaPhone className="text-red-500" /> Contact
                                    </Link>
                                    <Link 
                                        to="/help" 
                                        className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                                            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        <FaQuestionCircle className="text-red-500" /> Help Center
                                    </Link>
                                    {user && (
                                        <Link 
                                            to="/funding" 
                                            className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                                                isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                                            }`}
                                        >
                                            <FaDonate className="text-red-500" /> Funding
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className={`btn btn-ghost btn-circle avatar border-2 transition-all ${
                                    isDark ? 'border-red-900 hover:border-red-700' : 'border-red-100 hover:border-red-300'
                                }`}>
                                    <div className="w-9 h-9 rounded-full overflow-hidden">
                                        <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt={user.displayName} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow-xl rounded-2xl w-56 border ${
                                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                }`}>
                                    <li className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        Signed in as
                                    </li>
                                    <li className={`mb-2 px-4 text-sm font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {user.displayName || 'User'}
                                    </li>
                                    <div className={`divider my-0 ${isDark ? 'before:bg-gray-700 after:bg-gray-700' : ''}`}></div>
                                    <li>
                                        <Link to="/dashboard" className={`py-3 gap-3 ${
                                            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                                        }`}>
                                            <FaTachometerAlt className="text-red-500" /> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/profile" className={`py-3 gap-3 ${
                                            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                                        }`}>
                                            <FaUser className="text-red-500" /> Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className={`py-3 gap-3 ${
                                            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                                        }`}>
                                            <FaSignOutAlt className="text-red-500" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link to="/login" className={`btn btn-sm btn-ghost rounded-full ${
                                    isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                                }`}>
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none rounded-full px-5 shadow-md hover:shadow-lg transition-all">
                                    Donate Now
                                </Link>
                            </div>
                        )}
                        
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMenuOpen(!isMenuOpen);
                            }}
                            className={`lg:hidden btn btn-ghost btn-circle ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`mobile-menu-container lg:hidden fixed inset-x-0 top-[65px] transition-all duration-300 overflow-hidden ${
                    isMenuOpen ? 'max-h-[calc(100vh-65px)] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className={`mx-4 my-2 rounded-2xl shadow-2xl border overflow-hidden ${
                        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                        <div className="p-4 max-h-[70vh] overflow-y-auto">
                            {/* Main Navigation */}
                            <div className="space-y-1">
                                <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
                                    <FaHome className="text-red-500" /> Home
                                </NavLink>
                                <NavLink to="/donation-requests" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
                                    <FaHandHoldingHeart className="text-red-500" /> Donation Requests
                                </NavLink>
                                <NavLink to="/search" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
                                    <FaSearch className="text-red-500" /> Find Donors
                                </NavLink>
                                <NavLink to="/blood-compatibility" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
                                    <FaTint className="text-red-500" /> Blood Types
                                </NavLink>
                                <NavLink to="/blog" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
                                    <FaNewspaper className="text-red-500" /> Blog
                                </NavLink>
                            </div>

                            {/* Divider */}
                            <div className={`my-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}></div>

                            {/* Additional Links */}
                            <p className={`px-4 text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                More
                            </p>
                            <div className="space-y-1">
                                <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
                                    <FaInfoCircle className="text-red-500" /> About Us
                                </NavLink>
                                <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
                                    <FaPhone className="text-red-500" /> Contact
                                </NavLink>
                                <NavLink to="/help" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
                                    <FaQuestionCircle className="text-red-500" /> Help Center
                                </NavLink>
                                {user && (
                                    <NavLink to="/funding" onClick={() => setIsMenuOpen(false)} className={mobileNavLinkClass}>
                                        <FaDonate className="text-red-500" /> Funding
                                    </NavLink>
                                )}
                            </div>

                            {/* Auth Buttons for Mobile */}
                            {!user && (
                                <>
                                    <div className={`my-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}></div>
                                    <div className="flex gap-3">
                                        <Link 
                                            to="/login" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`flex-1 btn btn-outline rounded-xl ${
                                                isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''
                                            }`}
                                        >
                                            Login
                                        </Link>
                                        <Link 
                                            to="/register" 
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex-1 btn bg-red-600 hover:bg-red-700 text-white border-none rounded-xl"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer for fixed navbar */}
            <div className="h-[65px]"></div>

            {/* Main Content */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={location.pathname}
                    initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut"
                    }}
                    className="flex-grow w-full"
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>

            {/* Enhanced Footer */}
            <footer className={footerClass}>
                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Brand Section */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-3xl lg:text-4xl">🩸</span>
                                <span className={`text-xl lg:text-2xl font-bold ${footerTitleClass}`}>BloodBond</span>
                            </div>
                            <p className="leading-relaxed text-sm mb-6">
                                Connecting donors with those in need. Join our mission to save lives, one drop at a time.
                            </p>
                            <div className="flex gap-3">
                                {[
                                    { icon: <FaFacebook />, href: "https://facebook.com" },
                                    { icon: <FaTwitter />, href: "https://twitter.com" },
                                    { icon: <FaInstagram />, href: "https://instagram.com" },
                                    { icon: <FaLinkedin />, href: "https://linkedin.com" },
                                    { icon: <FaYoutube />, href: "https://youtube.com" },
                                ].map((social, idx) => (
                                    <a 
                                        key={idx}
                                        href={social.href} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                                            isDark 
                                                ? 'bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white' 
                                                : 'bg-gray-200 hover:bg-red-600 text-gray-600 hover:text-white'
                                        }`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className={`font-bold text-lg mb-4 lg:mb-6 ${footerTitleClass}`}>Quick Links</h4>
                            <ul className="space-y-2 lg:space-y-3">
                                {[
                                    { name: 'Find Donors', path: '/search' },
                                    { name: 'Donation Requests', path: '/donation-requests' },
                                    { name: 'Blood Compatibility', path: '/blood-compatibility' },
                                    { name: 'Blog', path: '/blog' },
                                    { name: 'About Us', path: '/about' },
                                ].map((link, idx) => (
                                    <li key={idx}>
                                        <Link to={link.path} className="hover:text-red-500 transition-colors text-sm lg:text-base">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className={`font-bold text-lg mb-4 lg:mb-6 ${footerTitleClass}`}>Support</h4>
                            <ul className="space-y-2 lg:space-y-3">
                                {[
                                    { name: 'Help Center', path: '/help' },
                                    { name: 'Contact Us', path: '/contact' },
                                    { name: 'Privacy Policy', path: '/help' },
                                    { name: 'Terms of Service', path: '/help' },
                                    { name: 'FAQs', path: '/help' },
                                ].map((link, idx) => (
                                    <li key={idx}>
                                        <Link to={link.path} className="hover:text-red-500 transition-colors text-sm lg:text-base">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className={`font-bold text-lg mb-4 lg:mb-6 ${footerTitleClass}`}>Contact</h4>
                            <ul className="space-y-3 lg:space-y-4">
                                <li className="flex items-start gap-3 text-sm lg:text-base">
                                    <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                                    <span>123 Health Street, Dhanmondi, Dhaka 1205</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm lg:text-base">
                                    <FaPhoneAlt className="text-red-500 flex-shrink-0" />
                                    <a href="tel:+8801234567890" className="hover:text-red-500 transition-colors">
                                        +880 1234 567 890
                                    </a>
                                </li>
                                <li className="flex items-center gap-3 text-sm lg:text-base">
                                    <FaEnvelope className="text-red-500 flex-shrink-0" />
                                    <a href="mailto:contact@bloodbond.com" className="hover:text-red-500 transition-colors">
                                        contact@bloodbond.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-center sm:text-left">
                                © {new Date().getFullYear()} BloodBond. All rights reserved.
                            </p>
                            <div className="flex gap-4 lg:gap-6 text-sm">
                                <Link to="/help" className="hover:text-red-500 transition-colors">Privacy</Link>
                                <Link to="/help" className="hover:text-red-500 transition-colors">Terms</Link>
                                <Link to="/help" className="hover:text-red-500 transition-colors">Cookies</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Emergency Contact Floating Widget */}
            <EmergencyContact />
        </div>
    );
};

export default RootLayout;
