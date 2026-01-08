/**
 * CREATED BY: [Person 2 Name]
 * FEATURE: Quick Actions Widget
 * 
 * A dashboard widget providing quick action buttons for common tasks
 * with beautiful animations and hover effects
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaPlusCircle, 
    FaSearch, 
    FaUsers, 
    FaFileAlt, 
    FaTint, 
    FaChartLine,
    FaBullhorn,
    FaCog 
} from 'react-icons/fa';

const QuickActions = ({ isAdmin = false }) => {
    const adminActions = [
        {
            id: 1,
            title: 'Add Request',
            description: 'Create new donation request',
            icon: FaPlusCircle,
            link: '/dashboard/create-donation-request',
            gradient: 'from-red-500 to-rose-600',
            bgGlow: 'shadow-red-500/20'
        },
        {
            id: 2,
            title: 'Manage Users',
            description: 'View and manage all users',
            icon: FaUsers,
            link: '/dashboard/all-users',
            gradient: 'from-blue-500 to-indigo-600',
            bgGlow: 'shadow-blue-500/20'
        },
        {
            id: 3,
            title: 'All Requests',
            description: 'View all donation requests',
            icon: FaTint,
            link: '/dashboard/all-blood-donation-request',
            gradient: 'from-rose-500 to-pink-600',
            bgGlow: 'shadow-rose-500/20'
        },
        {
            id: 4,
            title: 'Content',
            description: 'Manage blog & content',
            icon: FaFileAlt,
            link: '/dashboard/content-management',
            gradient: 'from-purple-500 to-violet-600',
            bgGlow: 'shadow-purple-500/20'
        },
        {
            id: 5,
            title: 'Analytics',
            description: 'View statistics & reports',
            icon: FaChartLine,
            link: '/dashboard/analytics',
            gradient: 'from-emerald-500 to-teal-600',
            bgGlow: 'shadow-emerald-500/20'
        },
        {
            id: 6,
            title: 'Announce',
            description: 'Create announcements',
            icon: FaBullhorn,
            link: '/dashboard/announcements',
            gradient: 'from-amber-500 to-orange-600',
            bgGlow: 'shadow-amber-500/20'
        }
    ];

    const userActions = [
        {
            id: 1,
            title: 'Request Blood',
            description: 'Create a donation request',
            icon: FaPlusCircle,
            link: '/dashboard/create-donation-request',
            gradient: 'from-red-500 to-rose-600',
            bgGlow: 'shadow-red-500/20'
        },
        {
            id: 2,
            title: 'Find Donors',
            description: 'Search for blood donors',
            icon: FaSearch,
            link: '/search',
            gradient: 'from-blue-500 to-indigo-600',
            bgGlow: 'shadow-blue-500/20'
        },
        {
            id: 3,
            title: 'My Requests',
            description: 'View your requests',
            icon: FaTint,
            link: '/dashboard/my-donation-requests',
            gradient: 'from-rose-500 to-pink-600',
            bgGlow: 'shadow-rose-500/20'
        },
        {
            id: 4,
            title: 'Profile',
            description: 'Update your profile',
            icon: FaCog,
            link: '/dashboard/profile',
            gradient: 'from-gray-500 to-gray-600',
            bgGlow: 'shadow-gray-500/20'
        }
    ];

    const actions = isAdmin ? adminActions : userActions;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {isAdmin ? 'Admin' : 'User'} Tools
                </span>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {actions.map((action) => (
                    <Link
                        key={action.id}
                        to={action.link}
                        className={`group relative overflow-hidden rounded-xl p-4 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg ${action.bgGlow}`}
                    >
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <action.icon className="text-white text-xl" />
                        </div>

                        {/* Text */}
                        <h4 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                            {action.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {action.description}
                        </p>

                        {/* Hover Arrow */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>

                        {/* Background Gradient on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
