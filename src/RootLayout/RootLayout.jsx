/**
 * MERGED BY: Person 1 & Person 2
 * FEATURES: 
 * - Person 1: Dark/Light Mode Toggle & Theme-Aware Layout
 * - Person 2: Blood Compatibility navigation & Emergency Contact
 * 
 * Changes Made:
 * - Added ThemeToggle component to navbar (Person 1)
 * - Added theme-aware CSS classes for dynamic styling (Person 1)
 * - Added nav link for Blood Compatibility page (Person 2)
 * - Added EmergencyContact floating widget (Person 2)
 */

import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import { FaBars, FaFacebook, FaTwitter, FaInstagram, FaTint } from 'react-icons/fa';
import ThemeToggle from '../Components/ThemeToggle/ThemeToggle';
import EmergencyContact from '../Components/EmergencyContact/EmergencyContact';

const RootLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logOut } = useAuth();
    const { isDark } = useTheme();

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    // Dynamic classes based on theme (Person 1)
    const navbarClass = isDark 
        ? "navbar bg-gray-900 shadow-lg sticky top-0 z-50 transition-all duration-500 border-b border-gray-800"
        : "navbar bg-white shadow-md sticky top-0 z-50 transition-all duration-500 border-b border-gray-200";
    
    const dropdownClass = isDark
        ? "menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-gray-900 rounded-2xl w-52 text-gray-300 border border-gray-800"
        : "menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-white rounded-2xl w-52 text-gray-700 border border-gray-200";

    const logoTextClass = isDark ? "text-white tracking-tight" : "text-gray-900 tracking-tight";
    
    const navLinkClass = ({ isActive }) => {
        if (isDark) {
            return isActive 
                ? "text-red-500 font-bold bg-gray-800 rounded-lg" 
                : "text-gray-300 hover:text-red-500 font-medium hover:bg-gray-800 rounded-lg transition-all";
        } else {
            return isActive 
                ? "text-red-500 font-bold bg-gray-100 rounded-lg" 
                : "text-gray-700 hover:text-red-500 font-medium hover:bg-gray-100 rounded-lg transition-all";
        }
    };

    const footerClass = isDark 
        ? "footer p-14 bg-gray-900 text-gray-400 transition-all duration-500"
        : "footer p-14 bg-gray-100 text-gray-600 transition-all duration-500";

    const footerTitleClass = isDark ? "text-white" : "text-gray-900";

    const renderNavOptions = (handleLinkClick = () => {}) => (
        <>
            <li onClick={handleLinkClick}><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li onClick={handleLinkClick}><NavLink to="/donation-requests" className={navLinkClass}>Donation Requests</NavLink></li>
            <li onClick={handleLinkClick}><NavLink to="/search" className={navLinkClass}>Search</NavLink></li>
            {/* NEW: Blood Compatibility Link - Added by Person 2 */}
            <li onClick={handleLinkClick}>
                <NavLink to="/blood-compatibility" className={({ isActive }) => {
                    const baseClass = isDark 
                        ? (isActive ? "text-red-500 font-bold bg-gray-800 rounded-lg" : "text-gray-300 hover:text-red-500 font-medium hover:bg-gray-800 rounded-lg transition-all")
                        : (isActive ? "text-red-500 font-bold bg-gray-100 rounded-lg" : "text-gray-700 hover:text-red-500 font-medium hover:bg-gray-100 rounded-lg transition-all");
                    return `${baseClass} flex items-center gap-1`;
                }}>
                    <FaTint className="text-xs" />Blood Types
                </NavLink>
            </li>
            <li onClick={handleLinkClick}><NavLink to="/blog" className={navLinkClass}>Blog</NavLink></li>
            {user && <li onClick={handleLinkClick}><NavLink to="/funding" className={navLinkClass}>Funding</NavLink></li>}
            {!user && (
                <li onClick={handleLinkClick}><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>
            )}
        </>
    );

    return (
        <div className={`flex flex-col min-h-screen font-sans transition-all duration-500 ${isDark ? 'bg-gray-950 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
            {/* Navbar */}
            <div className={navbarClass}>
                <div className="navbar-start">
                    <div className={`dropdown ${isMenuOpen ? 'dropdown-open' : ''}`}>
                        <div role="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className={`btn btn-ghost lg:hidden ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} text-red-600`}>
                            <FaBars className="text-xl" />
                        </div>
                        <ul className={dropdownClass}>
                            {renderNavOptions(() => setIsMenuOpen(false))}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl lg:text-2xl font-bold gap-1 lg:gap-2 hover:bg-transparent px-0 ml-2 lg:ml-4 group">
                        <span className="text-2xl lg:text-3xl group-hover:scale-110 transition-transform">🩸</span>
                        <span className={logoTextClass}>Blood<span className="text-red-500">Bond</span></span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className={`menu menu-horizontal px-1 gap-8 text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {renderNavOptions()}
                    </ul>
                </div>
                <div className="navbar-end pr-2 lg:pr-4 flex items-center gap-2 lg:gap-4">
                    {/* Theme Toggle Button - Person 1 Feature */}
                    <ThemeToggle />
                    

                    
                    {user && (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className={`btn btn-ghost btn-circle avatar border ${isDark ? 'border-red-900 hover:border-red-700' : 'border-red-100 hover:border-red-300'} transition-all`}>
                                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full ring ring-offset-2 ${isDark ? 'ring-red-900 ring-offset-gray-900' : 'ring-red-50 ring-offset-white'}`}>
                                    <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt={user.displayName} />
                                </div>
                            </label>
                            <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl rounded-2xl w-56 border ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                                <li className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Signed in as</li>
                                <li className={`mb-2 px-4 text-sm font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.displayName || 'User'}</li>
                                <div className={`divider my-0 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}></div>
                                <li><Link to="/dashboard" className={`py-3 font-medium ${isDark ? 'hover:bg-gray-800 hover:text-red-500 text-gray-300' : 'hover:bg-gray-100 hover:text-red-500 text-gray-700'}`}>Dashboard</Link></li>
                                <li><button onClick={handleLogout} className={`py-3 font-medium ${isDark ? 'hover:bg-gray-800 hover:text-red-500 text-gray-300' : 'hover:bg-gray-100 hover:text-red-500 text-gray-700'}`}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                    {!user && (
                        <Link to="/register" className="btn btn-sm lg:btn-md bg-red-600 hover:bg-red-700 text-white border-none rounded-full px-4 lg:px-8 shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:-translate-y-0.5 font-semibold tracking-wide">Donate Now</Link>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
                <Outlet />
            </div>

            {/* Footer */}
            <footer className={footerClass}>
                <aside>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-4xl text-red-500">🩸</span>
                        <span className={`text-2xl font-bold ${footerTitleClass}`}>BloodBond</span>
                    </div>
                    <p className="max-w-xs leading-relaxed text-sm">
                        Connecting donors with those in need. Join our mission to save lives, one drop at a time.
                    </p>
                    <div className="mt-6 flex gap-4">
                         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-white ${isDark ? 'bg-gray-800' : 'bg-gray-300 text-gray-700 hover:text-white'}`}>
                             <FaFacebook />
                         </a>
                         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-white ${isDark ? 'bg-gray-800' : 'bg-gray-300 text-gray-700 hover:text-white'}`}>
                             <FaTwitter />
                         </a>
                         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-white ${isDark ? 'bg-gray-800' : 'bg-gray-300 text-gray-700 hover:text-white'}`}>
                             <FaInstagram />
                         </a>
                    </div>
                </aside>
                <nav>
                    <header className={`footer-title opacity-100 mb-4 ${footerTitleClass}`}>Services</header>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Blood Donation</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Health Checkup</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Emergency Request</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Campaigns</a>
                </nav>
                <nav>
                    <header className={`footer-title opacity-100 mb-4 ${footerTitleClass}`}>Company</header>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">About us</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Contact</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Careers</a>
                </nav>
                <nav>
                    <header className={`footer-title opacity-100 mb-4 ${footerTitleClass}`}>Legal</header>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Terms of use</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Privacy policy</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Cookie policy</a>
                </nav>
            </footer>

            {/* Emergency Contact Floating Widget - Person 2 Feature */}
            <EmergencyContact />
        </div>
    );
};
export default RootLayout;
