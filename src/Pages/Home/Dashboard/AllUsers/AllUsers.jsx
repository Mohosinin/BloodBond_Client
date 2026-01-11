/**
 * ENHANCED ALL USERS PAGE
 * Features: Dark mode support, improved UI
 */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useTheme from '../../../../hooks/useTheme';
import Swal from 'sweetalert2';
import { FaUserShield, FaUserTie, FaBan, FaCheckCircle, FaEllipsisV, FaUsers, FaSearch } from 'react-icons/fa';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { isDark } = useTheme();
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleStatusUpdate = (user, newStatus) => {
        axiosSecure.patch(`/users/status/${user._id}`, { status: newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: `${user.name} is now ${newStatus}!`,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        iconColor: '#EF4444',
                        background: isDark ? '#1a1a24' : '#fff',
                        color: isDark ? '#f8fafc' : '#1F2937'
                    });
                }
            })
    }

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        iconColor: '#EF4444',
                        background: isDark ? '#1a1a24' : '#fff',
                        color: isDark ? '#f8fafc' : '#1F2937'
                    });
                }
            })
    }

    const handleMakeVolunteer = user => {
        axiosSecure.patch(`/users/volunteer/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: `${user.name} is a Volunteer Now!`,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        iconColor: '#EF4444',
                        background: isDark ? '#1a1a24' : '#fff',
                        color: isDark ? '#f8fafc' : '#1F2937'
                    });
                }
            })
    }

    const filteredUsers = users.filter(user => {
        const matchesStatus = filter === 'all' || user.status === filter;
        const matchesSearch = !searchTerm || 
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="w-full">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
            >
                <div>
                    <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        <FaUsers className="inline mr-3 text-red-500" />All Users
                    </h2>
                    <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Manage user roles and statuses. Total: {users.length} users
                    </p>
                </div>
                
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Search */}
                    <div className="relative">
                        <FaSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`input input-sm pl-10 w-48 rounded-full ${
                                isDark 
                                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                                    : 'bg-white border-gray-200 placeholder-gray-400'
                            }`}
                        />
                    </div>
                    
                    {/* Filter */}
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status:</span>
                        <select 
                            className={`select select-sm select-bordered rounded-full ${
                                isDark 
                                    ? 'bg-gray-800 border-gray-700 text-white' 
                                    : 'bg-white border-gray-200'
                            }`}
                            onChange={(e) => setFilter(e.target.value)} 
                            value={filter}
                        >
                            <option value="all">All Users</option>
                            <option value="active">Active</option>
                            <option value="blocked">Blocked</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Table Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`shadow-xl rounded-2xl overflow-hidden border ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                }`}
            >
                {/* Desktop Table View */}
                <div className="overflow-x-auto hidden md:block">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className={`font-semibold uppercase text-xs tracking-wider ${
                            isDark ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-500'
                        }`}>
                            <tr>
                                <th className="py-4 pl-4 lg:pl-6">User</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="text-left pl-4 lg:pl-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-100'}`}>
                            {filteredUsers.map((user, idx) => (
                                <motion.tr 
                                    key={user._id} 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className={`transition-colors ${
                                        isDark ? 'hover:bg-gray-700/50' : 'hover:bg-red-50/30'
                                    }`}
                                >
                                    <td className="py-4 pl-4 lg:pl-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="avatar">
                                                <div className={`mask mask-squircle w-12 h-12 ring-2 shadow-sm ${
                                                    isDark ? 'bg-gray-700 ring-gray-600' : 'bg-gray-100 ring-white'
                                                }`}>
                                                    <img src={user.avatar} alt="Avatar" onError={(e) => e.target.src = 'https://i.ibb.co/4pDNDk1/avatar.png'} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
                                                <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                            user.role === 'admin' || user.role === 'Admin' 
                                                ? isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-200' 
                                                : user.role === 'volunteer' || user.role === 'Volunteer'
                                                    ? isDark ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-200'
                                                    : isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200'
                                        }`}>
                                            {user.role || 'donor'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                            user.status === 'active' 
                                                ? isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200' 
                                                : isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200'
                                        }`}>
                                            <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            {user.status || 'active'}
                                        </span>
                                    </td>
                                    <td className="text-left pl-4 lg:pl-6">
                                        <div className="flex justify-start gap-2">
                                            {/* Status Toggle */}
                                            {user.status === 'active' ? (
                                                <button 
                                                    onClick={() => handleStatusUpdate(user, 'blocked')}
                                                    className={`btn btn-sm btn-circle btn-ghost tooltip ${
                                                        isDark ? 'text-red-400 hover:bg-red-500/20' : 'text-red-500 hover:bg-red-100'
                                                    }`}
                                                    data-tip="Block User">
                                                    <FaBan />
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => handleStatusUpdate(user, 'active')}
                                                    className={`btn btn-sm btn-circle btn-ghost tooltip ${
                                                        isDark ? 'text-green-400 hover:bg-green-500/20' : 'text-green-500 hover:bg-green-100'
                                                    }`}
                                                    data-tip="Unblock User">
                                                    <FaCheckCircle />
                                                </button>
                                            )}

                                            {/* Role Options */}
                                            {user.role !== 'admin' && user.role !== 'Admin' && (
                                                <div className="dropdown dropdown-end dropdown-hover">
                                                    <label tabIndex={0} className={`btn btn-sm btn-circle btn-ghost ${
                                                        isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
                                                    }`}>
                                                        <FaEllipsisV />
                                                    </label>
                                                    <ul tabIndex={0} className={`dropdown-content z-[2] menu p-2 shadow-xl rounded-xl w-48 border ${
                                                        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                                                    }`}>
                                                        <li>
                                                            <button 
                                                                onClick={() => handleMakeAdmin(user)} 
                                                                className={`font-medium ${
                                                                    isDark ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/10' : 'text-gray-600 hover:text-purple-600'
                                                                }`}
                                                            >
                                                                <FaUserShield className="mr-2" /> Make Admin
                                                            </button>
                                                        </li>
                                                        {user.role !== 'volunteer' && user.role !== 'Volunteer' && (
                                                            <li>
                                                                <button 
                                                                    onClick={() => handleMakeVolunteer(user)} 
                                                                    className={`font-medium ${
                                                                        isDark ? 'text-gray-300 hover:text-orange-400 hover:bg-orange-500/10' : 'text-gray-600 hover:text-orange-600'
                                                                    }`}
                                                                >
                                                                    <FaUserTie className="mr-2" /> Make Volunteer
                                                                </button>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className={`md:hidden flex flex-col gap-4 p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    {filteredUsers.map((user) => (
                        <div key={user._id} className={`p-4 rounded-xl shadow border flex flex-col gap-4 ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                        }`}>
                            <div className="flex items-center gap-4">
                                <div className="avatar">
                                    <div className={`mask mask-squircle w-12 h-12 ring-1 ${
                                        isDark ? 'bg-gray-700 ring-gray-600' : 'bg-gray-100 ring-gray-200'
                                    }`}>
                                        <img src={user.avatar} alt="Avatar" onError={(e) => e.target.src = 'https://i.ibb.co/4pDNDk1/avatar.png'} />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</h3>
                                    <p className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                                </div>
                            </div>

                            <div className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                <span className={`text-xs font-bold uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Role</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase border ${
                                    user.role === 'admin' || user.role === 'Admin'
                                        ? isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-200'
                                        : user.role === 'volunteer' || user.role === 'Volunteer'
                                            ? isDark ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-200'
                                            : isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200'
                                }`}>
                                    {user.role || 'donor'}
                                </span>
                            </div>

                            <div className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                <span className={`text-xs font-bold uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Status</span>
                                <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold border ${
                                    user.status === 'active' 
                                        ? isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200' 
                                        : isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200'
                                }`}>
                                    <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    {user.status || 'active'}
                                </span>
                            </div>

                            <div className={`flex justify-end pt-2 border-t gap-2 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                                {user.status === 'active' ? (
                                    <button 
                                        onClick={() => handleStatusUpdate(user, 'blocked')}
                                        className={`btn btn-sm flex-1 ${
                                            isDark 
                                                ? 'bg-gray-700 border-red-500/30 text-red-400 hover:bg-red-500/20' 
                                                : 'bg-white border-red-200 text-red-500 hover:bg-red-50'
                                        }`}>
                                        <FaBan className="mr-2" /> Block
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handleStatusUpdate(user, 'active')}
                                        className={`btn btn-sm flex-1 ${
                                            isDark 
                                                ? 'bg-gray-700 border-green-500/30 text-green-400 hover:bg-green-500/20' 
                                                : 'bg-white border-green-200 text-green-500 hover:bg-green-50'
                                        }`}>
                                        <FaCheckCircle className="mr-2" /> Unblock
                                    </button>
                                )}

                                {user.role !== 'admin' && user.role !== 'Admin' && (
                                    <div className="dropdown dropdown-end dropdown-top">
                                        <label tabIndex={0} className={`btn btn-sm btn-ghost ${
                                            isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            <FaEllipsisV />
                                        </label>
                                        <ul tabIndex={0} className={`dropdown-content z-[2] menu p-2 shadow-xl rounded-xl w-48 border mb-2 ${
                                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                                        }`}>
                                            <li>
                                                <button onClick={() => handleMakeAdmin(user)} className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                                    <FaUserShield className="mr-2" /> Make Admin
                                                </button>
                                            </li>
                                            {user.role !== 'volunteer' && user.role !== 'Volunteer' && (
                                                <li>
                                                    <button onClick={() => handleMakeVolunteer(user)} className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                                        <FaUserTie className="mr-2" /> Make Volunteer
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                    <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <FaUsers className="text-4xl mx-auto mb-4 opacity-50" />
                        <p>No users found matching your criteria.</p>
                    </div>
                )}
            </motion.div>
            
            <div className={`mt-4 text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Showing {filteredUsers.length} of {users.length} users
            </div>
        </div>
    );
};

export default AllUsers;
