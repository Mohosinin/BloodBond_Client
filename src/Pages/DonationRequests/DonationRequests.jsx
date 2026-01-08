/**
 * MODIFIED BY: [Person 1 Name]
 * FEATURE: Dark/Light Mode Support + UI Improvements
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaMapMarkerAlt, FaCalendarAlt, FaTint } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';

const DonationRequests = () => {
    const axiosPublic = useAxiosPublic();
    const { isDark } = useTheme();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['donation-requests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donation-requests');
            return res.data.filter(req => req.status === 'pending');
        }
    });

    if (isLoading) {
        return (
            <div className={`flex justify-center items-center min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    return (
        <div className={`min-h-screen font-sans pb-20 transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 pt-20 pb-12 text-center text-white mb-12 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-4">Urgent Donation Requests</h1>
                    <p className="text-red-100 max-w-xl mx-auto">
                        These patients are in critical need of blood. Your donation can save a life today.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {requests.length === 0 ? (
                    <div className={`text-center py-20 rounded-2xl shadow-sm border max-w-2xl mx-auto ${
                        isDark 
                            ? 'bg-gray-800 border-gray-700' 
                            : 'bg-white border-gray-100'
                    }`}>
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                            isDark ? 'bg-red-500/10' : 'bg-red-50'
                        }`}>
                            <FaTint className="text-3xl text-red-500" />
                        </div>
                        <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>No Active Requests</h3>
                        <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>There are no pending donation requests at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {requests.map(req => (
                            <div key={req._id} className={`rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group ${
                                isDark 
                                    ? 'bg-gray-800 border-gray-700 hover:border-red-500/30' 
                                    : 'bg-white border-gray-300'
                            }`}>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className={`text-xl font-bold group-hover:text-red-500 transition-colors ${isDark ? 'text-white' : 'text-gray-800'}`}>{req.recipientName}</h2>
                                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{req.hospitalName}</p>
                                        </div>
                                        <div className={`font-bold px-3 py-1 rounded-full text-sm border ${
                                            isDark 
                                                ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                                : 'bg-red-50 text-red-600 border-red-100'
                                        }`}>
                                            {req.bloodGroup}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 mb-6">
                                        <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            <FaMapMarkerAlt className="mr-3 text-red-400" />
                                            <span>{req.recipientUpazila}, {req.recipientDistrict}</span>
                                        </div>
                                        <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            <FaCalendarAlt className="mr-3 text-red-400" />
                                            <span>{req.donationDate} at {req.donationTime}</span>
                                        </div>
                                    </div>
                                    
                                    <p className={`text-sm line-clamp-2 mb-6 p-3 rounded-lg border ${
                                        isDark 
                                            ? 'bg-gray-700/50 border-gray-600 text-gray-400' 
                                            : 'bg-gray-50 border-gray-100 text-gray-500'
                                    }`}>
                                        "{req.requestMessage}"
                                    </p>

                                    <Link 
                                        to={`/donation-request-details/${req._id}`} 
                                        className={`block w-full text-center font-semibold py-3 rounded-xl transition-all duration-300 border ${
                                            isDark 
                                                ? 'bg-transparent border-red-500 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600' 
                                                : 'bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                                        }`}
                                    >
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
