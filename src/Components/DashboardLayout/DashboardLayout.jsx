import React, { useContext, useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useVolunteer from '../../hooks/useVolunteer';

import { FaHome, FaUser, FaUsers, FaHandHoldingHeart, FaFileAlt, FaPlusCircle, FaList, FaSignOutAlt, FaArrowLeft, FaBars, FaTimes } from 'react-icons/fa';

const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer();
    const navigate = useNavigate();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const handleLogout = () => {
        logOut()
            .then(() => navigate('/'))
            .catch(err => console.error(err));
    }

    const closeMobileMenu = () => setIsMobileOpen(false);

    const NavItem = ({ to, icon, label, end = false }) => (
         <NavLink 
            to={to} 
            end={end}
            onClick={closeMobileMenu}
            className={({ isActive }) => 
                `flex items-center gap-3 px-6 py-3 transition-all duration-200 group ${
                    isActive 
                        ? "bg-red-50 text-red-600 border-r-4 border-red-600 font-medium" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-red-500"
                }`
            }
        >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </NavLink>
    );

    const SidebarContent = () => (
        <>
            <div className="p-8 border-b border-gray-100 flex items-center gap-4">
                <div className="avatar online">
                    <div className="w-12 h-12 rounded-full ring ring-red-100 ring-offset-2">
                        <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="User" />
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-gray-800 text-lg leading-tight">{user?.displayName || 'User'}</h2>
                    <span className="text-xs uppercase font-semibold text-red-500 tracking-wider">
                        {isAdmin ? 'Admin' : isVolunteer ? 'Volunteer' : 'Donor'}
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 space-y-1">
                <span className="px-6 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Menu</span>
                
                <NavItem to="/dashboard" icon={<FaHome />} label="Overview" end={true} />
                <NavItem to="/dashboard/profile" icon={<FaUser />} label="My Profile" />

                {/* Admin Routes */}
                {isAdmin && (
                    <>
                        <div className="my-4 border-t border-gray-100 mx-6"></div>
                        <span className="px-6 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Administration</span>
                        <NavItem to="/dashboard/all-users" icon={<FaUsers />} label="All Users" />
                        <NavItem to="/dashboard/all-blood-donation-request" icon={<FaHandHoldingHeart />} label="All Requests" />
                        <NavItem to="/dashboard/content-management" icon={<FaFileAlt />} label="Content Manager" />
                    </>
                )}

                {/* Volunteer Routes */}
                {isVolunteer && (
                    <>
                        <div className="my-4 border-t border-gray-100 mx-6"></div>
                        <span className="px-6 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Volunteer</span>
                        <NavItem to="/dashboard/all-blood-donation-request" icon={<FaHandHoldingHeart />} label="All Requests" />
                        <NavItem to="/dashboard/content-management" icon={<FaFileAlt />} label="Content Manager" />
                    </>
                )}

                <div className="my-4 border-t border-gray-100 mx-6"></div>
                <span className="px-6 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Donation</span>
                <NavItem to="/dashboard/create-donation-request" icon={<FaPlusCircle />} label="Create Request" />
                <NavItem to="/dashboard/my-donation-requests" icon={<FaList />} label="My Requests" />

                <div className="my-4 border-t border-gray-100 mx-6"></div>
                    <Link to="/" className="flex items-center gap-3 px-6 py-3 text-gray-500 hover:text-red-500 transition-colors">
                    <FaArrowLeft /> Back to Home
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-6 py-3 text-gray-500 hover:text-red-600 transition-colors text-left">
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </>
    );

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* Desktop Sidebar */}
            <aside className="w-72 bg-white shadow-xl hidden lg:flex flex-col fixed h-full z-20">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={closeMobileMenu}></div>
            )}

            {/* Mobile Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="absolute top-4 right-4 lg:hidden">
                    <button onClick={closeMobileMenu} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <FaTimes size={20} />
                    </button>
                </div>
                <SidebarContent />
            </aside>

            {/* Mobile Header (Visible only on small screens) */}
            <div className="lg:hidden fixed w-full bg-white z-20 shadow-sm border-b p-4 flex justify-between items-center h-16 top-0 left-0">
                 <span className="font-bold text-lg text-gray-800">Dashboard</span>
                 <button onClick={() => setIsMobileOpen(true)} className="btn btn-ghost btn-circle text-red-500">
                    <FaBars size={24} />
                 </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 lg:ml-72 p-4 md:p-10 mt-16 lg:mt-0 transition-all">
                <Outlet />
            </div>
        </div>
    );
};
export default DashboardLayout;
