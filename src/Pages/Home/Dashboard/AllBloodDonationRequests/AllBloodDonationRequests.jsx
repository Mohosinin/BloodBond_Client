/**
 * ENHANCED ALL BLOOD DONATION REQUESTS PAGE (Admin/Volunteer)
 * Features: Dark mode support, improved UI, animations
 */

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useTheme from '../../../../hooks/useTheme';
import useAdmin from '../../../../hooks/useAdmin';
import useVolunteer from '../../../../hooks/useVolunteer';
import { FaEdit, FaTrash, FaEye, FaTasks, FaTint, FaCalendarAlt, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const AllBloodDonationRequests = () => {
    const { user } = useContext(AuthContext);
    const { isDark } = useTheme();
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer();
    const location = useLocation();
    
    const [allRequests, setAllRequests] = useState([]);
    const [displayedRequests, setDisplayedRequests] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 6;

    const fetchRequests = () => {
        setIsLoading(true);
        axiosSecure.get('/donation-requests/all')
            .then(res => {
                setAllRequests(res.data);
            })
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        fetchRequests();
    }, [axiosSecure]);

    useEffect(() => {
        let filtered = allRequests;
        
        // Apply status filter
        if (filter !== 'all') {
            filtered = filtered.filter(req => req.status === filter);
        }
        
        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(req => 
                req.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.requesterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.bloodGroup?.includes(searchTerm)
            );
        }
        
        // Pagination Logic
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
        
        setDisplayedRequests(currentItems);
    }, [allRequests, filter, searchTerm, currentPage]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); 
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Request?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, delete it',
            background: isDark ? '#1a1a24' : '#fff',
            color: isDark ? '#f8fafc' : '#1F2937'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donation-requests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Deleted!',
                                text: 'Request has been deleted.',
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                background: isDark ? '#1a1a24' : '#fff',
                                color: isDark ? '#f8fafc' : '#1F2937'
                            });
                            fetchRequests();
                        }
                    })
            }
        })
    }

    const handleStatusUpdate = (id, newStatus) => {
        axiosSecure.patch(`/donation-requests/${id}`, { status: newStatus })
        .then(res => {
             if (res.data.modifiedCount > 0) {
                 fetchRequests();
                 Swal.fire({
                    icon: 'success',
                    title: `Status: ${newStatus}`,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    background: isDark ? '#1a1a24' : '#fff',
                    color: isDark ? '#f8fafc' : '#1F2937'
                });
             }
        })
    }

    const getFilteredCount = () => {
        if (filter === 'all') return allRequests.length;
        return allRequests.filter(req => req.status === filter).length;
    };

    const totalPages = Math.ceil(getFilteredCount() / itemsPerPage);

    const getStatusStyle = (status) => {
        const styles = {
            done: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200',
            canceled: isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-200',
            inprogress: isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200',
            pending: isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
        };
        return styles[status] || styles.pending;
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
            >
                <div>
                    <h1 className={`text-3xl font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        <FaTint className="text-red-500" />
                        All Donation Requests
                    </h1>
                    <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Manage all blood donation requests in the system. Total: {allRequests.length}
                    </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Search */}
                    <div className="relative">
                        <FaSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`input input-sm pl-10 w-40 rounded-full ${
                                isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-200'
                            }`}
                        />
                    </div>
                    <select 
                        className={`select select-bordered rounded-full ${
                            isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
                        }`}
                        value={filter} 
                        onChange={handleFilterChange}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {[
                    { label: 'Total', count: allRequests.length, color: 'gray' },
                    { label: 'Pending', count: allRequests.filter(r => r.status === 'pending').length, color: 'yellow' },
                    { label: 'In Progress', count: allRequests.filter(r => r.status === 'inprogress').length, color: 'blue' },
                    { label: 'Completed', count: allRequests.filter(r => r.status === 'done').length, color: 'green' },
                    { label: 'Canceled', count: allRequests.filter(r => r.status === 'canceled').length, color: 'red' }
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-105 ${
                            isDark ? 'bg-gray-800 border-gray-700 hover:border-red-500/30' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
                        } ${filter === stat.label.toLowerCase().replace(' ', '') ? 'ring-2 ring-red-500' : ''}`}
                        onClick={() => setFilter(stat.label === 'Total' ? 'all' : stat.label.toLowerCase().replace(' ', ''))}
                    >
                        <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.count}</p>
                    </motion.div>
                ))}
            </div>

            {/* Table Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`shadow-xl rounded-2xl overflow-hidden border min-h-[400px] ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                }`}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <span className="loading loading-spinner loading-lg text-red-500"></span>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="overflow-x-auto hidden md:block">
                            <table className="table w-full">
                                <thead className={`text-sm uppercase font-semibold ${
                                    isDark ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-500'
                                }`}>
                                    <tr>
                                        <th className="py-4 pl-6">Requester</th>
                                        <th>Recipient</th>
                                        <th>Location</th>
                                        <th>Date</th>
                                        <th>Blood</th>
                                        <th>Status</th>
                                        <th>Donor</th>
                                        <th className="text-center px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-100'}`}>
                                    {displayedRequests.map((req, idx) => (
                                        <motion.tr 
                                            key={req._id} 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: idx * 0.03 }}
                                            className={`transition-colors ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}
                                        >
                                            <td className="py-4 pl-6">
                                                <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{req.requesterName}</div>
                                                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{req.requesterEmail}</div>
                                            </td>
                                            <td className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{req.recipientName}</td>
                                            <td className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                                <span className="flex items-center gap-1 text-sm">
                                                    <FaMapMarkerAlt className="text-red-400 text-xs" />
                                                    {req.recipientUpazila}, {req.recipientDistrict}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="text-sm">
                                                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{req.donationDate}</div>
                                                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{req.donationTime}</div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                                                    isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                                                }`}>
                                                    {req.bloodGroup}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusStyle(req.status)}`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td>
                                                {req.status === 'inprogress' || req.status === 'done' ? (
                                                    <div className="text-sm">
                                                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{req.donorName || 'Unknown'}</div>
                                                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{req.donorEmail || 'N/A'}</div>
                                                    </div>
                                                ) : <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>-</span>}
                                            </td>
                                            <td className="text-center">
                                                <div className="flex justify-center items-center gap-2">
                                                    {/* Status Update Button */}
                                                    <button 
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: 'Update Status',
                                                                input: 'select',
                                                                inputOptions: {
                                                                    'pending': 'Pending',
                                                                    'inprogress': 'In Progress',
                                                                    'done': 'Done',
                                                                    'canceled': 'Canceled'
                                                                },
                                                                inputValue: req.status,
                                                                showCancelButton: true,
                                                                confirmButtonText: 'Update',
                                                                confirmButtonColor: '#EF4444',
                                                                cancelButtonColor: '#6B7280',
                                                                background: isDark ? '#1a1a24' : '#fff',
                                                                color: isDark ? '#f8fafc' : '#1F2937'
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    handleStatusUpdate(req._id, result.value);
                                                                }
                                                            });
                                                        }}
                                                        className={`btn btn-sm btn-circle border-0 text-lg shadow-none ${
                                                            isDark ? 'bg-gray-700/50 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-yellow-600 hover:bg-gray-200'
                                                        }`}
                                                        title="Update Status"
                                                    >
                                                        <FaTasks />
                                                    </button>

                                                    {isAdmin && (
                                                        <>
                                                            <Link 
                                                                to={`/dashboard/update-donation-request/${req._id}`} 
                                                                state={{ from: location.pathname }} 
                                                                className={`btn btn-sm btn-circle border-0 text-lg shadow-none ${
                                                                    isDark ? 'bg-gray-700/50 text-blue-400 hover:bg-gray-700' : 'bg-blue-50 text-blue-500 hover:bg-blue-100'
                                                                }`}
                                                                title="Edit Request"
                                                            >
                                                                <FaEdit />
                                                            </Link>
                                                            <button 
                                                                onClick={() => handleDelete(req._id)} 
                                                                className={`btn btn-sm btn-circle border-0 text-lg shadow-none ${
                                                                    isDark ? 'bg-gray-700/50 text-red-400 hover:bg-gray-700' : 'bg-red-50 text-red-500 hover:bg-red-100'
                                                                }`}
                                                                title="Delete Request"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </>
                                                    )}
                                                    
                                                    <Link 
                                                        to={`/dashboard/donation-request-details/${req._id}`} 
                                                        className={`btn btn-sm btn-circle border-0 text-lg shadow-none ${
                                                            isDark ? 'bg-gray-700/50 text-green-400 hover:bg-gray-700' : 'bg-green-50 text-green-500 hover:bg-green-100'
                                                        }`}
                                                        title="View Details"
                                                    >
                                                        <FaEye />
                                                    </Link>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className={`md:hidden flex flex-col gap-4 p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                            {displayedRequests.map(req => (
                                <div key={req._id} className={`p-5 rounded-xl shadow border flex flex-col gap-4 ${
                                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                                }`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`text-xs uppercase font-bold mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Recipient</p>
                                            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{req.recipientName}</h3>
                                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{req.recipientUpazila}, {req.recipientDistrict}</p>
                                        </div>
                                        <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                                            isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                                        }`}>
                                            {req.bloodGroup}
                                        </span>
                                    </div>

                                    <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                                        <p className={`text-xs uppercase font-bold mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Requester</p>
                                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{req.requesterName}</div>
                                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{req.requesterEmail}</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                            <p className={`text-xs uppercase font-bold mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Date</p>
                                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{req.donationDate}</p>
                                        </div>
                                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                            <p className={`text-xs uppercase font-bold mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Time</p>
                                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{req.donationTime}</p>
                                        </div>
                                    </div>
                                    
                                    <div className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                        <span className={`text-xs font-bold uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Status</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusStyle(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </div>
                                    
                                    {(req.status === 'inprogress' || req.status === 'done') && (
                                        <div className={`p-3 rounded-lg border ${isDark ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-100'}`}>
                                            <p className={`text-xs uppercase font-bold mb-1 ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>Donor Info</p>
                                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{req.donorName || 'Unknown'}</p>
                                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{req.donorEmail}</p>
                                        </div>
                                    )}

                                    <div className={`flex justify-end pt-3 border-t gap-2 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                                        <button 
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'Update Status',
                                                    input: 'select',
                                                    inputOptions: {
                                                        'pending': 'Pending',
                                                        'inprogress': 'In Progress',
                                                        'done': 'Done',
                                                        'canceled': 'Canceled'
                                                    },
                                                    inputValue: req.status,
                                                    showCancelButton: true,
                                                    confirmButtonText: 'Update',
                                                    confirmButtonColor: '#EF4444',
                                                    cancelButtonColor: '#6B7280',
                                                    background: isDark ? '#1a1a24' : '#fff',
                                                    color: isDark ? '#f8fafc' : '#1F2937'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        handleStatusUpdate(req._id, result.value);
                                                    }
                                                });
                                            }}
                                            className={`btn btn-sm flex-1 ${isDark ? 'btn-outline border-gray-600 text-gray-400' : 'btn-outline'}`}
                                        >
                                            <FaTasks /> Status
                                        </button>
                                        
                                        {isAdmin && (
                                            <>
                                                <Link to={`/dashboard/update-donation-request/${req._id}`} state={{ from: location.pathname }} className={`btn btn-sm ${isDark ? 'btn-outline border-blue-500/50 text-blue-400' : 'btn-outline btn-info'}`}>
                                                    <FaEdit />
                                                </Link>
                                                <button onClick={() => handleDelete(req._id)} className={`btn btn-sm ${isDark ? 'btn-outline border-red-500/50 text-red-400' : 'btn-outline btn-error'}`}>
                                                    <FaTrash />
                                                </button>
                                            </>
                                        )}
                                        <Link to={`/dashboard/donation-request-details/${req._id}`} className={`btn btn-sm ${isDark ? 'btn-outline border-gray-600 text-gray-400' : 'btn-outline'}`}>
                                            <FaEye />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {displayedRequests.length === 0 && (
                            <div className={`text-center py-20 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                <FaTint className="text-5xl mx-auto mb-4 opacity-30" />
                                <p className="text-lg">No requests found.</p>
                            </div>
                        )}
                    </>
                )}
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="join shadow-sm rounded-full">
                        <button 
                            className={`join-item btn ${isDark ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'}`}
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        >«</button>
                        {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                            let pageNum = index + 1;
                            if (totalPages > 5 && currentPage > 3) {
                                pageNum = currentPage - 2 + index;
                            }
                            if (pageNum > totalPages) return null;
                            return (
                                <button 
                                    key={pageNum} 
                                    className={`join-item btn ${
                                        currentPage === pageNum 
                                            ? 'bg-red-600 text-white hover:bg-red-700 border-red-600' 
                                            : isDark ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'
                                    }`}
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        <button 
                            className={`join-item btn ${isDark ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'}`}
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        >»</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllBloodDonationRequests;
