import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaUser, FaHospital, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTint, FaPen } from 'react-icons/fa';

const UpdateDonationRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [request, setRequest] = useState(null);

    const districts = ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barisal", "Rangpur", "Mymensingh"];
    const upazilas = ["Savar", "Dhamrai", "Keraniganj", "Nawabganj", "Dohar", "Mirpur", "Gulshan", "Banani"];

    useEffect(() => {
        axiosSecure.get(`/donation-requests/${id}`)
            .then(res => setRequest(res.data))
            .catch(err => console.error(err));
    }, [id, axiosSecure]);

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        
        const recipientName = form.recipientName.value;
        const recipientDistrict = form.recipientDistrict.value;
        const recipientUpazila = form.recipientUpazila.value;
        const hospitalName = form.hospitalName.value;
        const fullAddress = form.fullAddress.value;
        const bloodGroup = form.bloodGroup.value;
        const donationDate = form.donationDate.value;
        const donationTime = form.donationTime.value;
        const requestMessage = form.requestMessage.value;

        const updateData = {
            recipientName,
            recipientDistrict,
            recipientUpazila,
            hospitalName,
            fullAddress,
            bloodGroup,
            donationDate,
            donationTime,
            requestMessage
        };

        axiosSecure.patch(`/donation-requests/${id}`, updateData)
        .then(res => {
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Request Updated!',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    iconColor: '#EF4444',
                    background: '#fff',
                    color: '#1F2937'
                });
                navigate(location.state?.from || '/dashboard/my-donation-requests');
            }
        })
        .catch(err => Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Something went wrong. Please try again.',
            confirmButtonColor: '#EF4444',
            background: '#fff',
            color: '#1F2937'
        }));
    }

    if (!request) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Update Donation Request</h2>
                <p className="text-gray-500 mt-2">Modify the details of your blood donation request.</p>
            </div>
            
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-8 border border-gray-100">
                <form onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label font-semibold text-gray-600">Recipient Name</label>
                            <div className="relative">
                                <FaUser className="absolute left-4 top-4 text-gray-400" />
                                <input type="text" name="recipientName" defaultValue={request.recipientName} className="input input-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" required />
                            </div>
                        </div>
                         <div className="form-control">
                            <label className="label font-semibold text-gray-600">Blood Group Needed</label>
                            <div className="relative">
                                <FaTint className="absolute left-4 top-4 text-red-400" />
                                <select name="bloodGroup" className="select select-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" defaultValue={request.bloodGroup} required>
                                    <option disabled value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold text-gray-600">District</label>
                             <div className="relative">
                                <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
                                <select name="recipientDistrict" className="select select-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" defaultValue={request.recipientDistrict} required>
                                     {districts.map((dist, idx) => <option key={idx} value={dist}>{dist}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold text-gray-600">Upazila</label>
                             <div className="relative">
                                <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
                                <select name="recipientUpazila" className="select select-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" defaultValue={request.recipientUpazila} required>
                                    {upazilas.map((upa, idx) => <option key={idx} value={upa}>{upa}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold text-gray-600">Hospital Name</label>
                            <div className="relative">
                                <FaHospital className="absolute left-4 top-4 text-gray-400" />
                                <input type="text" name="hospitalName" defaultValue={request.hospitalName} className="input input-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" required />
                            </div>
                        </div>
                         <div className="form-control">
                            <label className="label font-semibold text-gray-600">Full Address</label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
                                <input type="text" name="fullAddress" defaultValue={request.fullAddress} className="input input-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" required />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold text-gray-600">Donation Date</label>
                            <div className="relative">
                                <FaCalendarAlt className="absolute left-4 top-4 text-gray-400" />
                                <input type="date" name="donationDate" defaultValue={request.donationDate} className="input input-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" required />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold text-gray-600">Donation Time</label>
                            <div className="relative">
                                <FaClock className="absolute left-4 top-4 text-gray-400" />
                                <input type="time" name="donationTime" defaultValue={request.donationTime} className="input input-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" required />
                            </div>
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <label className="label font-semibold text-gray-600">Request Message</label>
                        <textarea name="requestMessage" defaultValue={request.requestMessage} className="textarea textarea-bordered h-24 focus:ring-1 focus:ring-red-500 focus:border-red-500"></textarea>
                    </div>

                    <div className="mt-8 text-center">
                        <button className="btn bg-red-600 hover:bg-red-700 text-white w-full md:w-1/2 text-lg shadow-lg border-none">
                            <FaPen /> Update Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default UpdateDonationRequest;
