/**
 * ENHANCED DONATION REQUEST DETAILS PAGE
 * Features: Theme support, multiple sections, related requests
 */

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useTheme from '../../../../hooks/useTheme';
import { 
    FaHospital, FaMapMarkerAlt, FaUser, FaClock, FaCalendarAlt, 
    FaTint, FaPhone, FaEnvelope, FaArrowLeft, FaCheckCircle,
    FaInfoCircle, FaExclamationTriangle, FaHandHoldingHeart
} from 'react-icons/fa';

const DonationRequestDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [request, setRequest] = useState(null);
    const [relatedRequests, setRelatedRequests] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isDark } = useTheme();

    useEffect(() => {
        axiosPublic.get(`/donation-requests/${id}`)
            .then(res => {
                setRequest(res.data);
                // Fetch related requests with same blood group
                if (res.data?.bloodGroup) {
                    axiosPublic.get(`/donation-requests?status=pending`)
                        .then(relRes => {
                            const related = relRes.data
                                .filter(r => r._id !== id && r.bloodGroup === res.data.bloodGroup)
                                .slice(0, 3);
                            setRelatedRequests(related);
                        });
                }
            })
            .catch(err => console.error(err));
    }, [id, axiosPublic]);

    const handleDonateClick = () => {
         if(!user){
             Swal.fire({
                 title: 'Please Login',
                 text: 'You need to be logged in to donate blood.',
                 icon: 'warning',
                 showCancelButton: true,
                 confirmButtonColor: '#dc2626',
                 cancelButtonColor: '#9ca3af',
                 confirmButtonText: 'Login Now',
                 background: isDark ? '#1F2937' : '#fff',
                 color: isDark ? '#F9FAFB' : '#1F2937'
             }).then((result) => {
                 if (result.isConfirmed) {
                     navigate('/login', { state: { from: location } });
                 }
             })
             return;
         }
         setIsModalOpen(true);
    }

    const handleConfirmDonation = (e) => {
        e.preventDefault();
        
        const updateData = {
            status: 'inprogress',
            donorName: user?.displayName,
            donorEmail: user?.email
        }

        axiosPublic.patch(`/donation-requests/${id}`, updateData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                        Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Thank you for your generosity!',
                        text: 'The donation status has been updated to In Progress.',
                        showConfirmButton: false,
                        timer: 2000,
                        background: isDark ? '#1F2937' : '#fff',
                        color: isDark ? '#F9FAFB' : '#1F2937'
                    });
                    setRequest({ ...request, status: 'inprogress', donorName: user?.displayName, donorEmail: user?.email });
                    setIsModalOpen(false);
                }
            })
            .catch(err => Swal.fire('Error', 'Something went wrong', 'error'));
    }

    if (!request) return (
        <div className={`flex justify-center items-center min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            <span className="loading loading-spinner loading-lg text-red-600"></span>
        </div>
    );

    const statusConfig = {
        done: { bg: 'bg-green-100 text-green-700', icon: <FaCheckCircle /> },
        canceled: { bg: 'bg-red-100 text-red-700', icon: <FaExclamationTriangle /> },
        inprogress: { bg: 'bg-blue-100 text-blue-700', icon: <FaHandHoldingHeart /> },
        pending: { bg: 'bg-yellow-100 text-yellow-700', icon: <FaClock /> }
    };

    return (
        <div className={`min-h-screen py-8 lg:py-12 px-4 font-sans transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <motion.button 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className={`flex items-center gap-2 mb-6 font-medium transition-colors ${
                        isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    <FaArrowLeft /> Back to Requests
                </motion.button>

                {/* Main Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`shadow-xl rounded-2xl overflow-hidden border ${
                        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                    }`}
                >
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 lg:p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                <div>
                                    <p className="text-red-100 text-sm uppercase tracking-wider mb-1">Blood Donation Request</p>
                                    <h2 className="text-2xl lg:text-3xl font-bold mb-2">{request.recipientName}</h2>
                                    <p className="opacity-90 flex items-center gap-2"><FaHospital /> {request.hospitalName}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white text-red-600 px-5 py-3 rounded-2xl font-bold text-2xl shadow-lg">
                                        <FaTint className="inline mr-1" /> {request.bloodGroup}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 lg:p-8">
                        {/* Status Banner */}
                        <div className={`flex items-center gap-3 p-4 rounded-xl mb-8 ${
                            request.status === 'done' ? (isDark ? 'bg-green-500/10' : 'bg-green-50') :
                            request.status === 'inprogress' ? (isDark ? 'bg-blue-500/10' : 'bg-blue-50') :
                            request.status === 'canceled' ? (isDark ? 'bg-red-500/10' : 'bg-red-50') :
                            (isDark ? 'bg-yellow-500/10' : 'bg-yellow-50')
                        }`}>
                            <span className={`text-2xl ${
                                request.status === 'done' ? 'text-green-500' :
                                request.status === 'inprogress' ? 'text-blue-500' :
                                request.status === 'canceled' ? 'text-red-500' :
                                'text-yellow-500'
                            }`}>
                                {statusConfig[request.status]?.icon}
                            </span>
                            <div>
                                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    Status: <span className="uppercase font-bold">{request.status}</span>
                                </p>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {request.status === 'pending' && 'This request is awaiting a donor.'}
                                    {request.status === 'inprogress' && 'A donor has responded to this request.'}
                                    {request.status === 'done' && 'This donation has been completed successfully.'}
                                    {request.status === 'canceled' && 'This request has been canceled.'}
                                </p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Section 1: Recipient Details */}
                            <div>
                                <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    <FaUser className="text-red-500" /> Recipient Information
                                </h3>
                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-red-50'}`}>
                                            <FaUser className="text-red-500" />
                                        </div>
                                        <div>
                                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Recipient Name</p>
                                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{request.recipientName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-red-50'}`}>
                                            <FaMapMarkerAlt className="text-red-500" />
                                        </div>
                                        <div>
                                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Location</p>
                                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{request.fullAddress}</p>
                                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{request.recipientUpazila}, {request.recipientDistrict}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-red-50'}`}>
                                            <FaHospital className="text-red-500" />
                                        </div>
                                        <div>
                                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Hospital</p>
                                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{request.hospitalName}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Donation Schedule */}
                            <div>
                                <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    <FaCalendarAlt className="text-blue-500" /> Donation Schedule
                                </h3>
                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                                            <FaCalendarAlt className="text-blue-500" />
                                        </div>
                                        <div>
                                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Date</p>
                                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{request.donationDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                                            <FaClock className="text-blue-500" />
                                        </div>
                                        <div>
                                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Time</p>
                                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{request.donationTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-purple-50'}`}>
                                            <FaTint className="text-purple-500" />
                                        </div>
                                        <div>
                                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Blood Group Required</p>
                                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{request.bloodGroup}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Request Message */}
                        <div className={`mt-8 p-6 rounded-2xl border ${
                            isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-100'
                        }`}>
                            <h4 className={`font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                <FaInfoCircle className="text-red-500" /> Message from Requester
                            </h4>
                            <p className={`italic leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                "{request.requestMessage}"
                            </p>
                        </div>

                        {/* Section 4: Requester Contact (if inprogress/done) */}
                        {(request.status === 'inprogress' || request.status === 'done') && request.requesterEmail && (
                            <div className={`mt-8 p-6 rounded-2xl border ${
                                isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'
                            }`}>
                                <h4 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    <FaPhone className="text-blue-500" /> Contact Information
                                </h4>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href={`mailto:${request.requesterEmail}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                                        <FaEnvelope /> {request.requesterEmail}
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Action Button */}
                        {request.status === 'pending' && (
                            <div className="mt-10 text-center">
                                <button 
                                    onClick={handleDonateClick} 
                                    className="btn bg-red-600 hover:bg-red-700 text-white rounded-full px-12 py-4 border-none shadow-lg shadow-red-500/25 text-lg h-auto gap-2"
                                >
                                    <FaHandHoldingHeart /> Donate Now
                                </button>
                                <p className={`mt-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    By clicking "Donate Now", you agree to be contacted by the requester.
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Related Requests */}
                {relatedRequests.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12"
                    >
                        <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Similar Requests ({request.bloodGroup})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedRequests.map(req => (
                                <Link 
                                    key={req._id}
                                    to={`/donation-request-details/${req._id}`}
                                    className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
                                        isDark ? 'bg-gray-800 border-gray-700 hover:border-red-500/30' : 'bg-white border-gray-100 hover:border-red-200'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{req.recipientName}</h4>
                                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{req.hospitalName}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                                        }`}>
                                            {req.bloodGroup}
                                        </span>
                                    </div>
                                    <div className={`text-sm flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <FaCalendarAlt /> {req.donationDate}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Donation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`rounded-2xl shadow-2xl w-full max-w-md overflow-hidden ${
                            isDark ? 'bg-gray-800' : 'bg-white'
                        }`}
                    >
                        <div className={`p-6 border-b flex justify-between items-center ${
                            isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'
                        }`}>
                            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Confirm Donation</h3>
                            <button onClick={() => setIsModalOpen(false)} className={`btn btn-sm btn-circle btn-ghost ${isDark ? 'text-gray-400' : ''}`}>✕</button>
                        </div>
                        
                        <div className="p-6">
                            <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                Thank you for stepping up to save a life! Please confirm your contact details below so the requester can reach you.
                            </p>
                            <form onSubmit={handleConfirmDonation} className="space-y-4">
                                <div>
                                    <label className={`label text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Donor Name</label>
                                    <input 
                                        type="text" 
                                        value={user?.displayName || ''} 
                                        readOnly 
                                        className={`input input-bordered w-full ${isDark ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-50'}`} 
                                    />
                                </div>
                                <div>
                                    <label className={`label text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Donor Email</label>
                                    <input 
                                        type="text" 
                                        value={user?.email || ''} 
                                        readOnly 
                                        className={`input input-bordered w-full ${isDark ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-50'}`} 
                                    />
                                </div>
                                <button className="btn bg-red-600 hover:bg-red-700 text-white w-full mt-4 border-none">
                                    <FaCheckCircle className="mr-2" /> Confirm & Donate
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default DonationRequestDetails;
