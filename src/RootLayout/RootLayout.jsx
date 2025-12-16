import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaBars, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const RootLayout = () => {
    const { user, logOut } = useAuth();

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-red-500 font-bold bg-gray-800 rounded-lg" : "text-gray-300 hover:text-red-500 font-medium hover:bg-gray-800 rounded-lg transition-all"}>Home</NavLink></li>
            <li><NavLink to="/donation-requests" className={({ isActive }) => isActive ? "text-red-500 font-bold bg-gray-800 rounded-lg" : "text-gray-300 hover:text-red-500 font-medium hover:bg-gray-800 rounded-lg transition-all"}>Donation Requests</NavLink></li>
            <li><NavLink to="/search" className={({ isActive }) => isActive ? "text-red-500 font-bold bg-gray-800 rounded-lg" : "text-gray-300 hover:text-red-500 font-medium hover:bg-gray-800 rounded-lg transition-all"}>Search</NavLink></li>
            <li><NavLink to="/blog" className={({ isActive }) => isActive ? "text-red-500 font-bold bg-gray-800 rounded-lg" : "text-gray-300 hover:text-red-500 font-medium hover:bg-gray-800 rounded-lg transition-all"}>Blog</NavLink></li>
            {user && <li><NavLink to="/funding" className={({ isActive }) => isActive ? "text-red-500 font-bold bg-gray-800 rounded-lg" : "text-gray-300 hover:text-red-500 font-medium hover:bg-gray-800 rounded-lg transition-all"}>Funding</NavLink></li>}
            {!user && (
                <li><NavLink to="/login" className={({ isActive }) => isActive ? "text-red-500 font-bold bg-gray-800 rounded-lg" : "text-gray-300 hover:text-red-500 font-medium hover:bg-gray-800 rounded-lg transition-all"}>Login</NavLink></li>
            )}
        </>
    );

    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-800">
            {/* Navbar */}
            <div className="navbar bg-gray-900 shadow-lg sticky top-0 z-50 transition-all border-b border-gray-800">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-gray-800 text-red-600">
                            <FaBars className="text-xl" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-gray-900 rounded-2xl w-52 text-gray-300 border border-gray-800">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-2xl font-bold gap-2 hover:bg-transparent px-0 ml-4 group">
                        <span className="text-3xl group-hover:scale-110 transition-transform">🩸</span>
                        <span className="text-white tracking-tight">Blood<span className="text-red-500">Bond</span></span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-8 text-base font-medium text-gray-300">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end pr-4 flex items-center gap-4">
                    {user && (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-red-100 hover:border-red-300 transition-all">
                                <div className="w-10 rounded-full ring ring-offset-2 ring-red-50">
                                    <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt={user.displayName} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-gray-900 rounded-2xl w-56 border border-gray-800">
                                <li className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Signed in as</li>
                                <li className="mb-2 px-4 text-sm font-bold text-white truncate">{user.displayName || 'User'}</li>
                                <div className="divider my-0 border-gray-700"></div>
                                <li><Link to="/dashboard" className="hover:bg-gray-800 hover:text-red-500 py-3 font-medium text-gray-300">Dashboard</Link></li>
                                <li><button onClick={handleLogout} className="hover:bg-gray-800 hover:text-red-500 py-3 font-medium text-gray-300">Logout</button></li>
                            </ul>
                        </div>
                    )}
                    {!user && (
                        <Link to="/register" className="btn bg-red-600 hover:bg-red-700 text-white border-none rounded-full px-8 shadow-lg hover:shadow-red-200 transition-all duration-300 transform hover:-translate-y-0.5 font-semibold tracking-wide">Donate Now</Link>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
                <Outlet />
            </div>

            {/* Footer */}
            <footer className="footer p-14 bg-gray-900 text-gray-400">
                <aside>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-4xl text-red-500">🩸</span>
                        <span className="text-2xl font-bold text-white">BloodBond</span>
                    </div>
                    <p className="max-w-xs leading-relaxed text-sm">
                        Connecting donors with those in need. Join our mission to save lives, one drop at a time.
                    </p>
                    <div className="mt-6 flex gap-4">
                         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-white">
                             <FaFacebook />
                         </a>
                         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-white">
                             <FaTwitter />
                         </a>
                         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-white">
                             <FaInstagram />
                         </a>
                    </div>
                </aside>
                <nav>
                    <header className="footer-title text-white opacity-100 mb-4">Services</header>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Blood Donation</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Health Checkup</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Emergency Request</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Campaigns</a>
                </nav>
                <nav>
                    <header className="footer-title text-white opacity-100 mb-4">Company</header>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">About us</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Contact</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Careers</a>
                </nav>
                <nav>
                    <header className="footer-title text-white opacity-100 mb-4">Legal</header>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Terms of use</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Privacy policy</a>
                    <a className="link link-hover hover:text-red-500 transition-colors mb-2 block">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
};
export default RootLayout;
