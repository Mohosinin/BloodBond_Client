/**
 * MODIFIED BY: [Person 2 Name] + Dark/Light Mode Support
 * FEATURE: Enhanced Dashboard Layout with Analytics & Announcements + Theme Support
 * 
 * Changes Made:
 * - Added Analytics dashboard link for admins
 * - Added Announcements management link for admins
 * - Improved overall dashboard navigation structure
 * - Added dark/light mode theme support
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
    FaHandHoldingHeart, 
    FaFileAlt, 
    FaPlusCircle, 
    FaList, 
    FaSignOutAlt, 
    FaArrowLeft, 
    FaBars, 
    FaTimes,
    FaChartLine,
    FaBullhorn
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
    }

    const closeMobileMenu = () => setIsMobileOpen(false);

    // Theme-aware styles
    const sidebarClass = isDark 
        ? "bg-gray-900 border-gray-800" 
        : "bg-white border-gray-100";
    
    const navItemClass = ({ isActive }) => {
        if (isDark) {
            return `flex items-center gap-3 px-6 py-3 transition-all duration-200 group ${
                isActive 
                    ? "bg-red-900/30 text-red-400 border-r-4 border-red-500 font-medium" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-red-400"
            }`;
        } else {
            return `flex items-center gap-3 px-6 py-3 transition-all duration-200 group ${
                isActive 
                    ? "bg-red-50 text-red-600 border-r-4 border-red-600 font-medium" 
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

    const SidebarContent = () => (
        <>
            <div className={`p-4 lg:p-8 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'} flex items-center gap-4`}>
                <div className="avatar online">
                    <div className={`w-12 h-12 rounded-full ring ${isDark ? 'ring-red-900' : 'ring-red-100'} ring-offset-2 ${isDark ? 'ring-offset-gray-900' : 'ring-offset-white'}`}>
                        <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="User" />
                    </div>
                </div>
                <div>
                    <h2 className={`font-bold text-lg leading-tight ${isDark ? 'text-white' : 'text-gray-800'}`}>{user?.displayName || 'User'}</h2>
                    <span className="text-xs uppercase font-semibold text-red-500 tracking-wider">
                        {isAdmin ? 'Admin' : isVolunteer ? 'Volunteer' : 'Donor'}
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 space-y-1">
                <span className={`px-6 text-xs font-bold uppercase tracking-wider mb-2 block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Menu</span>
                
                <NavItem to="/dashboard" icon={<FaHome />} label="Overview" end={true} />
                <NavItem to="/dashboard/profile" icon={<FaUser />} label="My Profile" />

                {/* Admin Routes - Enhanced by [Person 2 Name] */}
                {isAdmin && (
                    <>
                        <div className={`my-4 border-t mx-6 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}></div>
                        <span className={`px-6 text-xs font-bold uppercase tracking-wider mb-2 block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Administration</span>
                        <NavItem to="/dashboard/all-users" icon={<FaUsers />} label="All Users" />
                        <NavItem to="/dashboard/all-blood-donation-request" icon={<FaHandHoldingHeart />} label="All Requests" />
                        <NavItem to="/dashboard/content-management" icon={<FaFileAlt />} label="Content Manager" />
                        
                        {/* NEW: Analytics & Announcements - Added by [Person 2 Name] */}
                        <div className={`my-4 border-t mx-6 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}></div>
                        <span className={`px-6 text-xs font-bold uppercase tracking-wider mb-2 block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Insights & Communication</span>
                        <NavItem to="/dashboard/analytics" icon={<FaChartLine />} label="Analytics" badge="New" />
                        <NavItem to="/dashboard/announcements" icon={<FaBullhorn />} label="Announcements" />
                    </>
                )}

                {/* Volunteer Routes */}
                {isVolunteer && (
                    <>
                        <div className={`my-4 border-t mx-6 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}></div>
                        <span className={`px-6 text-xs font-bold uppercase tracking-wider mb-2 block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Volunteer</span>
                        <NavItem to="/dashboard/all-blood-donation-request" icon={<FaHandHoldingHeart />} label="All Requests" />
                        <NavItem to="/dashboard/content-management" icon={<FaFileAlt />} label="Content Manager" />
                    </>
                )}

                <div className={`my-4 border-t mx-6 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}></div>
                <span className={`px-6 text-xs font-bold uppercase tracking-wider mb-2 block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Donation</span>
                <NavItem to="/dashboard/create-donation-request" icon={<FaPlusCircle />} label="Create Request" />
                <NavItem to="/dashboard/my-donation-requests" icon={<FaList />} label="My Requests" />

                <div className={`my-4 border-t mx-6 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}></div>
                <Link to="/" className={`flex items-center gap-3 px-6 py-3 transition-colors ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}>
                    <FaArrowLeft /> Back to Home
                </Link>
                <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-6 py-3 transition-colors text-left ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-600'}`}>
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </>
    );

    return (
        <div className={`flex min-h-screen font-sans transition-all duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* Desktop Sidebar */}
            <aside className={`w-72 shadow-xl hidden lg:flex flex-col fixed h-full z-20 ${sidebarClass}`}>
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={closeMobileMenu}></div>
            )}

            {/* Mobile Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-72 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarClass}`}>
                <div className="absolute top-2 right-2 lg:hidden z-50">
                    <button onClick={closeMobileMenu} className={`p-2 rounded-full ${isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}>
                        <FaTimes size={20} />
                    </button>
                </div>
                <SidebarContent />
            </aside>

            {/* Mobile Header (Visible only on small screens) */}
            <div className={`lg:hidden fixed w-full z-20 shadow-sm border-b p-4 flex justify-between items-center h-16 top-0 left-0 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Dashboard</span>
                <button onClick={() => setIsMobileOpen(true)} className="btn btn-ghost btn-circle text-red-500">
                    <FaBars size={24} />
                </button>
            </div>

            {/* Main Content Area */}
            <div className={`flex-1 lg:ml-72 p-4 md:p-10 mt-16 lg:mt-0 transition-all ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                <Outlet />
            </div>
        </div>
    );
};
export default DashboardLayout;
