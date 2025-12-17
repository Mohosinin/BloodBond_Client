import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../providers/AuthProvider';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { FaHospital, FaMapMarkerAlt, FaUser, FaClock, FaCalendarAlt } from 'react-icons/fa';

const DonationRequestDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [request, setRequest] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axiosPublic.get(`/donation-requests/${id}`)
            .then(res => setRequest(res.data))
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
                 confirmButtonText: 'Login Now'
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
                        timer: 2000
                    });
                    setRequest({ ...request, status: 'inprogress', donorName: user?.displayName, donorEmail: user?.email });
                    setIsModalOpen(false);
                }
            })
            .catch(err => Swal.fire('Error', 'Something went wrong', 'error'));
    }

    if (!request) return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-red-600"></span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                {/* Header Banner */}
                <div className="bg-red-600 p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                             <div>
                                <h2 className="text-3xl font-bold mb-2">Donation Request</h2>
                                <p className="opacity-90 flex items-center gap-2"><FaHospital /> {request.hospitalName}</p>
                             </div>
                             <div className="bg-white text-red-600 px-4 py-2 rounded-xl font-bold text-xl shadow-lg">
                                {request.bloodGroup}
                             </div>
                        </div>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full blur-xl"></div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Recipient Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Recipient Details</h3>
                            
                            <div className="flex items-start gap-4">
                                <div className="bg-red-50 p-3 rounded-full text-red-500"><FaUser /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Recipient Name</p>
                                    <p className="font-semibold text-gray-800">{request.recipientName}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-red-50 p-3 rounded-full text-red-500"><FaMapMarkerAlt /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="font-semibold text-gray-800">{request.fullAddress}</p>
                                    <p className="text-sm text-gray-600">{request.recipientUpazila}, {request.recipientDistrict}</p>
                                </div>
                            </div>
                        </div>

                        {/* Donation Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Donation Schedule</h3>

                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-blue-500"><FaCalendarAlt /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Data</p>
                                    <p className="font-semibold text-gray-800">{request.donationDate}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-blue-500"><FaClock /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Time</p>
                                    <p className="font-semibold text-gray-800">{request.donationTime}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-yellow-50 p-3 rounded-full text-yellow-600">⚠️</div>
                                <div>
                                    <p className="text-sm text-gray-500">Current Status</p>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${
                                        request.status === 'done' ? 'bg-green-100 text-green-700' :
                                        request.status === 'canceled' ? 'bg-red-100 text-red-700' :
                                        request.status === 'inprogress' ? 'bg-blue-100 text-blue-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {request.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <h4 className="font-bold text-gray-800 mb-2">Message from Requester:</h4>
                        <p className="text-gray-600 italic">"{request.requestMessage}"</p>
                    </div>

                    {/* Action Button */}
                    {request.status === 'pending' && (
                        <div className="mt-10 text-center">
                            <button 
                                onClick={handleDonateClick} 
                                className="btn bg-red-600 hover:bg-red-700 text-white rounded-full px-12 py-3 border-none shadow-lg shadow-red-200 text-lg h-auto"
                            >
                                Donate Now
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Donation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                        <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-gray-800">Confirm Donation</h3>
                            <button onClick={() => setIsModalOpen(false)} className="btn btn-sm btn-circle btn-ghost">✕</button>
                        </div>
                        
                        <div className="p-6">
                            <p className="text-gray-600 mb-6">Thank you for stepping up to save a life! Please confirm your contact details below so the requester can reach you.</p>
                            <form onSubmit={handleConfirmDonation} className="space-y-4">
                                <div>
                                    <label className="label text-sm font-bold text-gray-700">Donor Name</label>
                                    <input type="text" value={user?.displayName || ''} readOnly className="input input-bordered w-full bg-gray-50 text-gray-500" />
                                </div>
                                <div>
                                    <label className="label text-sm font-bold text-gray-700">Donor Email</label>
                                    <input type="text" value={user?.email || ''} readOnly className="input input-bordered w-full bg-gray-50 text-gray-500" />
                                </div>
                                <button className="btn bg-red-600 hover:bg-red-700 text-white w-full mt-4 border-none">Confirm & Donate</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default DonationRequestDetails;
