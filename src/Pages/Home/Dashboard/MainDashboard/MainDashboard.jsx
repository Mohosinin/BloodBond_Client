import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaUsers, FaHandHoldingUsd, FaTint } from 'react-icons/fa';
import useAdmin from '../../../../hooks/useAdmin';
import useVolunteer from '../../../../hooks/useVolunteer';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const MainDashboard = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer();
    
    const [recentRequests, setRecentRequests] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalRequests: 0, totalFunding: 0 });

    useEffect(() => {
        if (isAdmin || isVolunteer) {
            axiosSecure.get('/admin/stats-summary')
                .then(res => setStats(res.data))
                .catch(err => console.error(err));
        } else if (user?.email) {
            // Donor Logic
             fetch(`http://localhost:5000/donation-requests?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    const recent = data.slice(0, 3);
                    setRecentRequests(recent);
                })
        }
    }, [user, isAdmin, isVolunteer, axiosSecure])

    // ... handleDelete and handleStatusUpdate functions (keep same) ...
     const handleDelete = (id) => {
         Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/donation-requests/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            const remaining = recentRequests.filter(req => req._id !== id);
                            setRecentRequests(remaining);
                        }
                    })
            }
        })
    }

    const handleStatusUpdate = (id, newStatus) => {
        fetch(`http://localhost:5000/donation-requests/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(res => res.json())
        .then(data => {
             if (data.modifiedCount > 0) {
                 const updated = recentRequests.map(req => {
                     if(req._id === id) {
                         return { ...req, status: newStatus }
                     }
                     return req;
                 });
                 setRecentRequests(updated);
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Status updated to ${newStatus}`,
                    showConfirmButton: false,
                    timer: 1500
                });
             }
        })
    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Welcome Banner */}
            <div className="mb-10 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back, {user?.displayName}! 👋</h1>
                    <p className="opacity-90">Here's what's happening with your blood donation activities today.</p>
                </div>
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            </div>

            {/* Admin / Volunteer Stats */}
            {(isAdmin || isVolunteer) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 transition-transform hover:-translate-y-1 hover:shadow-md">
                        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-3xl text-red-500">
                            <FaUsers />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Donors</p>
                            <h3 className="text-4xl font-bold text-gray-800">{stats.totalUsers}</h3>
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 transition-transform hover:-translate-y-1 hover:shadow-md">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-3xl text-blue-500">
                             <FaTint />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Requests</p>
                            <h3 className="text-4xl font-bold text-gray-800">{stats.totalRequests}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 transition-transform hover:-translate-y-1 hover:shadow-md">
                        <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center text-3xl text-yellow-500">
                            <FaHandHoldingUsd />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Funding</p>
                            <h3 className="text-4xl font-bold text-gray-800">৳{stats.totalFunding}</h3>
                        </div>
                    </div>
                </div>
            )}

            {/* Donor View - Recent Requests */}
            {(!isAdmin && !isVolunteer) && (
                <>
                    {recentRequests.length > 0 ? (
                        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Recent Donation Requests</h2>
                                    <p className="text-sm text-gray-500">Your latest contribution activities.</p>
                                </div>
                                <Link to="/dashboard/my-donation-requests" className="btn btn-sm bg-white border-gray-200 text-red-600 hover:bg-red-50 hover:border-red-100 shadow-sm">View All</Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="py-4 pl-6">Recipient</th>
                                            <th>Location</th>
                                            <th>Date & Time</th>
                                            <th>Blood Group</th>
                                            <th>Status</th>
                                            <th className="text-right pr-6">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {recentRequests.map(req => (
                                            <tr key={req._id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 pl-6 font-medium text-gray-900">{req.recipientName}</td>
                                                <td className="text-gray-600">{req.recipientDistrict}, {req.recipientUpazila}</td>
                                                <td>
                                                    <div className="flex flex-col text-sm">
                                                        <span className="font-medium text-gray-800">{req.donationDate}</span>
                                                        <span className="text-gray-400">{req.donationTime}</span>
                                                    </div>
                                                </td>
                                                <td><span className="font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs">{req.bloodGroup}</span></td>
                                                <td>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                                                        req.status === 'done' ? 'bg-green-100 text-green-700' : 
                                                        req.status === 'canceled' ? 'bg-red-100 text-red-700' : 
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {req.status}
                                                    </span>
                                                </td>
                                                <td className="text-right pr-6">
                                                    <div className="flex justify-end gap-2">
                                                        {req.status === 'inprogress' && (
                                                            <>
                                                             <button onClick={() => handleStatusUpdate(req._id, 'done')} className="btn btn-xs btn-success text-white">Done</button>
                                                             <button onClick={() => handleStatusUpdate(req._id, 'canceled')} className="btn btn-xs btn-error text-white">Cancel</button>
                                                            </>
                                                        )}
                                                       
                                                        <Link to={`/dashboard/update-donation-request/${req._id}`} className="btn btn-xs btn-ghost text-blue-600">Edit</Link>
                                                        <button onClick={() => handleDelete(req._id)} className="btn btn-xs btn-ghost text-red-500">Delete</button>
                                                        <Link to={`/dashboard/donation-request-details/${req._id}`} className="btn btn-xs btn-ghost text-gray-600">View</Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🩸</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No Requests Found</h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't made any donation requests yet. Start by creating a request to find blood donors.</p>
                            <Link to="/dashboard/create-donation-request" className="btn bg-red-600 hover:bg-red-700 text-white rounded-full px-8 border-none shadow-lg shadow-red-200">Create Request</Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
export default MainDashboard;
