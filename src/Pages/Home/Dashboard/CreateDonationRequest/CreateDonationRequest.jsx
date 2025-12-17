import React, { useContext } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaUser, FaEnvelope, FaHospital, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTint } from 'react-icons/fa';

const CreateDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const districts = ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barisal", "Rangpur", "Mymensingh"];
    const upazilas = ["Savar", "Dhamrai", "Keraniganj", "Nawabganj", "Dohar", "Mirpur", "Gulshan", "Banani"];

    const handleCreateRequest = event => {
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

        const requestData = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recipientName,
            recipientDistrict,
            recipientUpazila,
            hospitalName,
            fullAddress,
            bloodGroup,
            donationDate,
            donationTime,
            requestMessage,
            status: 'pending'
        };

        axiosSecure.post('/donation-requests', requestData)
        .then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Request Created!',
                    text: 'Your donation request has been successfully submitted.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    iconColor: '#EF4444',
                    background: '#fff',
                    color: '#1F2937'
                })
                event.target.reset();
            }
        })
        .catch(error => {
            console.error(error);
             if (error.response && error.response.status === 403) {
                     Swal.fire({
                     icon: 'error',
                     title: 'Access Denied',
                     text: 'You are blocked and cannot create donation requests.',
                     confirmButtonColor: '#EF4444',
                     background: '#fff',
                     color: '#1F2937'
                 });
             }
        })

    }

    return (
        <div className="w-full max-w-4xl mx-auto">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Create Donation Request</h2>
                <p className="text-gray-500 mt-2">Fill out the form below to request blood for a patient in need.</p>
            </div>
            
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-8 border border-gray-100">
                <form onSubmit={handleCreateRequest}>
                    {/* Requester Info Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4 flex items-center gap-2">
                             <span className="bg-red-100 text-red-600 p-1 rounded">1</span> Requester Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label font-semibold text-gray-600">Requester Name</label>
                                <div className="relative">
                                    <FaUser className="absolute left-4 top-4 text-gray-400" />
                                    <input type="text" value={user?.displayName || ''} className="input input-bordered w-full pl-10 bg-gray-50 text-gray-500" readOnly />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold text-gray-600">Requester Email</label>
                                <div className="relative">
                                     <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                                    <input type="text" value={user?.email || ''} className="input input-bordered w-full pl-10 bg-gray-50 text-gray-500" readOnly />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Patient Info Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4 flex items-center gap-2">
                            <span className="bg-red-100 text-red-600 p-1 rounded">2</span> Patient Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label font-semibold text-gray-600">Recipient Name</label>
                                <input type="text" name="recipientName" placeholder="Patient Name" className="input input-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500" required />
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold text-gray-600">Blood Group Needed</label>
                                <div className="relative">
                                    <FaTint className="absolute left-4 top-4 text-red-400" />
                                    <select name="bloodGroup" className="select select-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" defaultValue="default" required>
                                        <option disabled value="default">Select Blood Group</option>
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
                                <select name="recipientDistrict" className="select select-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500" defaultValue="default" required>
                                    <option disabled value="default">Select District</option>
                                    {districts.map((dist, idx) => <option key={idx} value={dist}>{dist}</option>)}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold text-gray-600">Upazila</label>
                                <select name="recipientUpazila" className="select select-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500" defaultValue="default" required>
                                    <option disabled value="default">Select Upazila</option>
                                    {upazilas.map((upa, idx) => <option key={idx} value={upa}>{upa}</option>)}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold text-gray-600">Hospital Name</label>
                                <div className="relative">
                                    <FaHospital className="absolute left-4 top-4 text-gray-400" />
                                    <input type="text" name="hospitalName" placeholder="e.g. Dhaka Medical College" className="input input-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" required />
                                </div>
                            </div>
                             <div className="form-control">
                                <label className="label font-semibold text-gray-600">Full Address</label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
                                    <input type="text" name="fullAddress" placeholder="e.g. Ward 12, Bed 4" className="input input-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" required />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold text-gray-600">Donation Date</label>
                                <div className="relative">
                                    <FaCalendarAlt className="absolute left-4 top-4 text-gray-400" />
                                    <input type="date" name="donationDate" className="input input-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" required />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold text-gray-600">Donation Time</label>
                                 <div className="relative">
                                    <FaClock className="absolute left-4 top-4 text-gray-400" />
                                    <input type="time" name="donationTime" className="input input-bordered w-full pl-10 focus:ring-1 focus:ring-red-500 focus:border-red-500" required />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <label className="label font-semibold text-gray-600">Request Message (Optional)</label>
                        <textarea name="requestMessage" className="textarea textarea-bordered h-24 focus:ring-1 focus:ring-red-500 focus:border-red-500" placeholder="Please describe why blood is needed..."></textarea>
                    </div>

                    <div className="mt-8">
                        <button className="btn bg-red-600 hover:bg-red-700 text-white w-full text-lg shadow-lg border-none">
                            Submit Donation Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CreateDonationRequest;
