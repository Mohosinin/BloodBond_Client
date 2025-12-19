import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaUserShield, FaUserTie, FaBan, FaCheckCircle, FaEllipsisV } from 'react-icons/fa';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState('all');

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
                        background: '#fff',
                        color: '#1F2937'
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
                        background: '#fff',
                        color: '#1F2937'
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
                        background: '#fff',
                        color: '#1F2937'
                    });
                }
            })
    }

    const filteredUsers = users.filter(user => {
        if (filter === 'all') return true;
        return user.status === filter;
    });

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">All Users</h2>
                    <p className="text-gray-500 mt-1">Manage user roles and statuses.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">Filter Status:</span>
                    <select 
                        className="select select-sm select-bordered rounded-full focus:ring-red-500 focus:border-red-500 bg-white" 
                        onChange={(e) => setFilter(e.target.value)} 
                        value={filter}
                    >
                        <option value="all">All Users</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                {/* Desktop Table View */}
                <div className="overflow-x-auto hidden md:block">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs tracking-wider">
                            <tr>
                                <th className="py-4 pl-4 lg:pl-6">User</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="text-left pl-4 lg:pl-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-red-50/30 transition-colors">
                                    <td className="py-4 pl-4 lg:pl-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12 bg-gray-100 ring-2 ring-white shadow-sm">
                                                    <img src={user.avatar} alt="Avatar" onError={(e) => e.target.src = 'https://i.ibb.co/4pDNDk1/avatar.png'} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{user.name}</div>
                                                <div className="text-sm opacity-50 font-medium">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                            user.role === 'admin' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                            user.role === 'volunteer' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                            'bg-blue-100 text-blue-700 border-blue-200'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                            user.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
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
                                                    className="btn btn-sm btn-circle btn-ghost text-red-500 hover:bg-red-100 tooltip" 
                                                    data-tip="Block User">
                                                    <FaBan />
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => handleStatusUpdate(user, 'active')}
                                                    className="btn btn-sm btn-circle btn-ghost text-green-500 hover:bg-green-100 tooltip" 
                                                    data-tip="Unblock User">
                                                    <FaCheckCircle />
                                                </button>
                                            )}

                                            {/* Role Options */}
                                            {user.role !== 'admin' && (
                                                <div className="dropdown dropdown-end dropdown-hover">
                                                    <label tabIndex={0} className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-gray-100">
                                                        <FaEllipsisV />
                                                    </label>
                                                    <ul tabIndex={0} className="dropdown-content z-[2] menu p-2 shadow-xl bg-white rounded-xl w-48 border border-gray-100">
                                                        <li>
                                                            <button onClick={() => handleMakeAdmin(user)} className="text-gray-600 hover:text-purple-600 font-medium">
                                                                <FaUserShield className="mr-2" /> Make Admin
                                                            </button>
                                                        </li>
                                                        {user.role !== 'volunteer' && (
                                                            <li>
                                                                <button onClick={() => handleMakeVolunteer(user)} className="text-gray-600 hover:text-orange-600 font-medium">
                                                                    <FaUserTie className="mr-2" /> Make Volunteer
                                                                </button>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden flex flex-col gap-4 p-4 bg-gray-50">
                    {filteredUsers.map((user) => (
                        <div key={user._id} className="bg-white p-4 rounded-xl shadow border border-gray-100 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12 bg-gray-100 ring-1 ring-gray-200">
                                        <img src={user.avatar} alt="Avatar" onError={(e) => e.target.src = 'https://i.ibb.co/4pDNDk1/avatar.png'} />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
                                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <span className="text-xs font-bold text-gray-500 uppercase">Role</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase border ${
                                    user.role === 'admin' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                    user.role === 'volunteer' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                    'bg-blue-100 text-blue-700 border-blue-200'
                                }`}>
                                    {user.role}
                                </span>
                            </div>

                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <span className="text-xs font-bold text-gray-500 uppercase">Status</span>
                                <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold border ${
                                    user.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                                }`}>
                                    <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    {user.status || 'active'}
                                </span>
                            </div>

                            <div className="flex justify-end pt-2 border-t border-gray-100 gap-2">
                                {user.status === 'active' ? (
                                    <button 
                                        onClick={() => handleStatusUpdate(user, 'blocked')}
                                        className="btn btn-sm bg-white border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 w-full flex-1">
                                        <FaBan className="mr-2" /> Block
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handleStatusUpdate(user, 'active')}
                                        className="btn btn-sm bg-white border-green-200 text-green-500 hover:bg-green-50 hover:border-green-300 w-full flex-1">
                                        <FaCheckCircle className="mr-2" /> Unblock
                                    </button>
                                )}

                                {user.role !== 'admin' && (
                                    <div className="dropdown dropdown-end dropdown-top">
                                        <label tabIndex={0} className="btn btn-sm btn-ghost bg-gray-100 text-gray-600">
                                            <FaEllipsisV />
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content z-[2] menu p-2 shadow-xl bg-white rounded-xl w-48 border border-gray-100 mb-2">
                                            <li>
                                                <button onClick={() => handleMakeAdmin(user)} className="text-gray-600">
                                                    <FaUserShield className="mr-2" /> Make Admin
                                                </button>
                                            </li>
                                            {user.role !== 'volunteer' && (
                                                <li>
                                                    <button onClick={() => handleMakeVolunteer(user)} className="text-gray-600">
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
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-400">
                Showing {filteredUsers.length} users
            </div>
        </div>
    );
};
export default AllUsers;
