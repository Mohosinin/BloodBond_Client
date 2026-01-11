/**
 * ENHANCED DASHBOARD LAYOUT
 * Features: Role-based navigation, proper menu items, responsive sidebar
 */

import React, { useContext, useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useVolunteer from '../../hooks/useVolunteer';
import useTheme from '../../hooks/useTheme';

import { 
    FaHome, 
    FaUser, 
    FaUsers, 
    FaShieldAlt,
    FaUserTie,
    FaHeart, 
    FaHandHoldingHeart, 
    FaFileAlt, 
    FaPlusCircle, 
    FaList, 
    FaSignOutAlt, 
    FaArrowLeft, 
    FaBars, 
    FaTimes,
    FaChartLine,
    FaBullhorn,
    FaTachometerAlt,
    FaCog,
    FaDonate,
    FaHistory,
    FaClipboardList,
    FaNewspaper,
    FaQuestionCircle
} from 'react-icons/fa';

const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer();
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleLogout = () => {
        logOut()
            .then(() => navigate('/'))
            .catch(err => console.error(err));
    };

    const closeMobileMenu = () => setIsMobileOpen(false);

    // Theme-aware styles
    const sidebarClass = isDark 
        ? "bg-gray-900 border-gray-800" 
        : "bg-white border-gray-100";
    
    const navItemClass = ({ isActive }) => {
        if (isDark) {
            return `flex items-center gap-3 px-5 py-3 mx-3 rounded-xl transition-all duration-200 group ${
                isActive 
                    ? "bg-red-500/10 text-red-400 font-medium" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-red-400"
            }`;
        } else {
            return `flex items-center gap-3 px-5 py-3 mx-3 rounded-xl transition-all duration-200 group ${
                isActive 
                    ? "bg-red-50 text-red-600 font-medium" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-red-500"
            }`;
        }
    };

    const NavItem = ({ to, icon, label, end = false, badge = null }) => (
         <NavLink 
            to={to} 
            end={end}
            onClick={closeMobileMenu}
            className={navItemClass}
        >
            <span className="text-lg">{icon}</span>
            <span className="flex-1">{label}</span>
            {badge && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {badge}
                </span>
            )}
        </NavLink>
    );

    const SectionTitle = ({ title }) => (
        <div className={`px-6 py-2 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {title}
        </div>
    );

    const SidebarContent = () => (
        <>
            {/* User Info */}
            <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className={`w-14 h-14 rounded-full ring-2 ring-offset-2 overflow-hidden ${
                            isDark ? 'ring-red-500/30 ring-offset-gray-900' : 'ring-red-100 ring-offset-white'
                        }`}>
                            <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className={`font-bold text-lg truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            {user?.displayName || 'User'}
                        </h2>
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            isAdmin 
                                ? 'bg-purple-100 text-purple-600' 
                                : isVolunteer 
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'bg-green-100 text-green-600'
                        }`}>
                            {isAdmin ? <FaShieldAlt /> : isVolunteer ? <FaUserTie /> : <FaHeart />}
                            {isAdmin ? 'Admin' : isVolunteer ? 'Volunteer' : 'Donor'}
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 py-4 overflow-y-auto">
                {/* Main */}
                <SectionTitle title="Main" />
                <NavItem to="/" end icon={<FaHome />} label="Home" />
                <NavItem to="/dashboard" end icon={<FaTachometerAlt />} label="Dashboard" />
                <NavItem to="/dashboard/profile" icon={<FaUser />} label="My Profile" />
                
                {/* Donor Menu Items */}
                {!isAdmin && !isVolunteer && (
                    <>
                        <div className="my-4"></div>
                        <SectionTitle title="My Activities" />
                        <NavItem to="/dashboard/create-donation-request" icon={<FaPlusCircle />} label="Create Request" />
                        <NavItem to="/dashboard/my-donation-requests" icon={<FaList />} label="My Requests" />
                    </>
                )}

                {/* Admin & Volunteer Menu Items */}
                {(isAdmin || isVolunteer) && (
                    <>
                        <div className="my-4"></div>
                        <SectionTitle title="Management" />
                        <NavItem to="/dashboard/all-blood-donation-request" icon={<FaClipboardList />} label="All Requests" />
                        <NavItem to="/dashboard/content-management" icon={<FaNewspaper />} label="Content Manager" />
                    </>
                )}

                {/* Admin Only Menu Items */}
                {isAdmin && (
                    <>
                        <div className="my-4"></div>
                        <SectionTitle title="Admin Tools" />
                        <NavItem to="/dashboard/all-users" icon={<FaUsers />} label="Manage Users" />
                        <NavItem to="/dashboard/analytics" icon={<FaChartLine />} label="Analytics" />
                        <NavItem to="/dashboard/announcements" icon={<FaBullhorn />} label="Announcements" />
                    </>
                )}

                {/* Quick Links */}
                <div className="my-4"></div>
                <SectionTitle title="Quick Links" />

                <Link 
                    to="/help"
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-5 py-3 mx-3 rounded-xl transition-all ${
                        isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                >
                    <FaQuestionCircle className="text-lg" />
                    <span>Help Center</span>
                </Link>
            </nav>

            {/* Logout */}
            <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                <button 
                    onClick={handleLogout}
                    className={`w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl transition-all font-medium ${
                        isDark 
                            ? 'bg-gray-800 text-gray-300 hover:bg-red-500/20 hover:text-red-400' 
                            : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* Desktop Sidebar */}
            <aside className={`hidden lg:flex fixed left-0 top-0 bottom-0 w-72 flex-col z-40 ${sidebarClass} glossy-glass`}>
                {/* Logo */}
                <div className={`p-6 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100/50'}`}>
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-3xl">🩸</span>
                        <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Blood<span className="text-red-500">Bond</span>
                        </span>
                    </Link>
                </div>
                <SidebarContent />
            </aside>

            {/* Mobile Header */}
            <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 border-b glossy-glass ${
                isDark ? 'border-gray-800/50' : 'border-gray-200/50'
            }`}>
                <div className="flex items-center justify-between px-4 py-3">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl">🩸</span>
                        <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Blood<span className="text-red-500">Bond</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link 
                            to="/" 
                            className={`btn btn-ghost btn-circle btn-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            <FaHome className="text-lg" />
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className={`btn btn-ghost btn-circle btn-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                            title="Logout"
                        >
                            <FaSignOutAlt className="text-lg" />
                        </button>
                        <button 
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className={`btn btn-ghost btn-circle ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            {isMobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`lg:hidden fixed top-0 left-0 bottom-0 w-72 flex-col z-50 transform transition-transform duration-300 glossy-glass ${
                isMobileOpen ? 'translate-x-0' : '-translate-x-full'
            } ${sidebarClass}`}>
                {/* Logo */}
                <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-gray-700/50' : 'border-gray-100/50'}`}>
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl">🩸</span>
                        <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Blood<span className="text-red-500">Bond</span>
                        </span>
                    </Link>
                    <button 
                        onClick={closeMobileMenu}
                        className={`btn btn-ghost btn-sm btn-circle ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                        <FaTimes />
                    </button>
                </div>
                <div className="flex flex-col flex-1 overflow-hidden">
                    <SidebarContent />
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-72 min-h-screen">
                <div className="lg:pt-0 pt-16">
                    <div className="p-4 lg:p-8">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
