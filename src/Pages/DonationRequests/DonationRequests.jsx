import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaMapMarkerAlt, FaCalendarAlt, FaTint } from 'react-icons/fa';

const DonationRequests = () => {
    const axiosPublic = useAxiosPublic();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['donation-requests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donation-requests');
            return res.data.filter(req => req.status === 'pending');
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-20">
            {/* Header */}
            <div className="bg-red-600 pt-20 pb-12 text-center text-white mb-12 shadow-lg">
                <h1 className="text-4xl font-bold mb-4">Urgent Donation Requests</h1>
                <p className="text-red-100 max-w-xl mx-auto">
                    These patients are in critical need of blood. Your donation can save a life today.
                </p>
            </div>

            <div className="container mx-auto px-4">
                {requests.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaTint className="text-3xl text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Active Requests</h3>
                        <p className="text-gray-500">There are no pending donation requests at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {requests.map(req => (
                            <div key={req._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">{req.recipientName}</h2>
                                            <p className="text-sm text-gray-500">{req.hospitalName}</p>
                                        </div>
                                        <div className="bg-red-50 text-red-600 font-bold px-3 py-1 rounded-full text-sm border border-red-100">
                                            {req.bloodGroup}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-gray-600 text-sm">
                                            <FaMapMarkerAlt className="mr-3 text-red-400" />
                                            <span>{req.recipientUpazila}, {req.recipientDistrict}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 text-sm">
                                            <FaCalendarAlt className="mr-3 text-red-400" />
                                            <span>{req.donationDate} at {req.donationTime}</span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        "{req.requestMessage}"
                                    </p>

                                    <Link to={`/donation-request-details/${req._id}`} className="block w-full text-center bg-white border border-red-600 text-red-600 font-semibold py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonationRequests;
