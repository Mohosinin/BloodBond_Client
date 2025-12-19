import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaEdit, FaTrash, FaEye, FaCheck, FaTimes } from 'react-icons/fa';

const MyDonationRequests = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [allRequests, setAllRequests] = useState([]);
    const [displayedRequests, setDisplayedRequests] = useState([]);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/donation-requests?email=${user.email}`)
                .then(res => {
                    setAllRequests(res.data);
                    setDisplayedRequests(res.data);
                })
                .catch(err => console.error(err));
        }
    }, [user, axiosSecure])

    useEffect(() => {
        let filtered = allRequests;
        if (filter !== 'all') {
            filtered = allRequests.filter(req => req.status === filter);
        }
        
        // Pagination Logic
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
        
        setDisplayedRequests(currentItems);
    }, [allRequests, filter, currentPage]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); // Reset to first page
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Request?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, delete it',
            background: '#fff',
            color: '#1F2937'
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
                                timerProgressBar: true,
                                iconColor: '#EF4444',
                                background: '#fff',
                                color: '#1F2937'
                            });
                            const remaining = allRequests.filter(req => req._id !== id);
                            setAllRequests(remaining);
                        }
                    })
            }
        })
    }

    const handleStatusUpdate = (id, newStatus) => {
        axiosSecure.patch(`/donation-requests/${id}`, { status: newStatus })
        .then(res => {
             if (res.data.modifiedCount > 0) {
                 const updated = allRequests.map(req => {
                     if(req._id === id) {
                         return { ...req, status: newStatus }
                     }
                     return req;
                 });
                 setAllRequests(updated);
                 Swal.fire({
                    icon: 'success',
                    title: `Status: ${newStatus}`,
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

    const totalPages = Math.ceil(
        (filter === 'all' ? allRequests.length : allRequests.filter(req => req.status === filter).length) / itemsPerPage
    );

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Donation Requests</h1>
                    <p className="text-gray-500 mt-1">Manage your blood donation requests.</p>
                </div>
                <div className="form-control w-full md:w-auto">
                    <select 
                        className="select select-bordered w-full md:w-48 bg-white" 
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
            </div>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-300 min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                         <thead className="bg-gray-50 text-gray-500 text-sm uppercase font-semibold">
                                <tr>
                                    <th className="py-4 pl-4 lg:pl-6">Recipient</th>
                                    <th>Location</th>
                                    <th>Date & Time</th>
                                    <th>Group</th>
                                    <th>Status</th>
                                    <th>Donor</th>
                                    <th className="text-left px-4">Actions</th>
                                </tr>
                            </thead>
                        <tbody className="divide-y divide-gray-50">
                            {displayedRequests.map(req => (
                                <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 pl-4 lg:pl-6 font-medium text-gray-900">{req.recipientName}</td>
                                    <td className="text-gray-600">{req.recipientUpazila}, {req.recipientDistrict}</td>
                                    <td>
                                        <div className="text-sm">
                                            <div className="font-medium text-gray-900">{req.donationDate}</div>
                                            <div className="text-gray-500 text-xs">{req.donationTime}</div>
                                        </div>
                                    </td>
                                    <td><span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md text-xs">{req.bloodGroup}</span></td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                            req.status === 'done' ? 'bg-green-100 text-green-700' : 
                                            req.status === 'canceled' ? 'bg-red-100 text-red-700' : 
                                            req.status === 'inprogress' ? 'bg-blue-100 text-blue-700' : 
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                     <td>
                                        {req.status === 'inprogress' ? (
                                            <div className="text-sm">
                                                <div className="font-medium text-gray-900">{req.donorName || 'Unknown'}</div>
                                                <div className="text-xs text-gray-400">{req.donorEmail || 'N/A'}</div>
                                            </div>
                                        ) : <span className="text-gray-400 text-sm">-</span>}
                                    </td>
                                    <td className="text-left">
                                        <div className="flex justify-start items-center gap-2">
                                            <Link to={`/dashboard/update-donation-request/${req._id}`} state={{ from: location.pathname }} className="btn btn-sm btn-circle btn-ghost text-blue-500 tooltip p-2" data-tip="Edit"><FaEdit /></Link>
                                            <button onClick={() => handleDelete(req._id)} className="btn btn-sm btn-circle btn-ghost text-red-500 tooltip p-2" data-tip="Delete"><FaTrash /></button>
                                            <Link to={`/dashboard/donation-request-details/${req._id}`} className="btn btn-sm btn-circle btn-ghost text-gray-500 tooltip p-2" data-tip="View"><FaEye /></Link>
                                            
                                            {req.status === 'inprogress' && (
                                                <>
                                                    <button onClick={() => handleStatusUpdate(req._id, 'done')} className="btn btn-sm btn-circle btn-ghost text-green-500 tooltip" data-tip="Mark Done"><FaCheck /></button>
                                                    <button onClick={() => handleStatusUpdate(req._id, 'canceled')} className="btn btn-sm btn-circle btn-ghost text-red-500 tooltip" data-tip="Cancel"><FaTimes /></button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {displayedRequests.length === 0 && (
                     <div className="text-center py-12 text-gray-500">
                        No requests found.
                     </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="join shadow-sm rounded-full">
                        <button 
                            className="join-item btn bg-white hover:bg-gray-50 border-gray-200" 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        >«</button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button 
                                key={index} 
                                className={`join-item btn border-gray-200 ${currentPage === index + 1 ? 'bg-red-600 text-white hover:bg-red-700 border-red-600' : 'bg-white hover:bg-gray-50'}`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button 
                            className="join-item btn bg-white hover:bg-gray-50 border-gray-200" 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        >»</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default MyDonationRequests;
