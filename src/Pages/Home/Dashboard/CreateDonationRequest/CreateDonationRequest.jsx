import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useTheme from '../../../../hooks/useTheme';
import { FaUser, FaEnvelope, FaHospital, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTint } from 'react-icons/fa';

const CreateDonationRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { isDark } = useTheme();

    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    useEffect(() => {
        fetch('/bd-divisions.json')
            .then(res => res.json())
            .then(data => {
                if (data.divisions) setDivisions(data.divisions);
                else if (Array.isArray(data)) setDivisions(data);
            });

        fetch('/bd-districts.json')
            .then(res => res.json())
            .then(data => {
                if (data.districts) setDistricts(data.districts);
                else if (Array.isArray(data)) setDistricts(data);
            });

        fetch('/bd-upazilas.json')
            .then(res => res.json())
            .then(data => {
                if (data.upazilas) setUpazilas(data.upazilas);
                else if (Array.isArray(data)) setUpazilas(data);
            });
    }, []);

    const filteredDistricts = districts.filter(dist => dist.division_id === selectedDivision);
    const filteredUpazilas = selectedDistrict 
        ? upazilas.filter(upa => upa.district_id === selectedDistrict)
        : upazilas.filter(upa => filteredDistricts.some(dist => dist.id === upa.district_id));

    const handleCreateRequest = event => {
        event.preventDefault();
        const form = event.target;
        
        const recipientName = form.recipientName.value;
        // Get names instead of IDs for the final submission
        const divisionId = form.recipientDivision.value;
        const districtId = form.recipientDistrict.value;
        const upazilaId = form.recipientUpazila.value;

        // Find the objects to get the names
        const divisionObj = divisions.find(d => d.id === divisionId);
        let districtObj = districts.find(d => d.id === districtId);
        let upazilaObj = upazilas.find(u => u.id === upazilaId);

        // Logic to infer District if "All Districts" was selected but a specific Upazila was chosen
        if (upazilaObj) {
             if (!districtObj || districtId === 'default') {
                 districtObj = districts.find(d => d.id === upazilaObj.district_id);
             }
        }

        const recipientDistrict = districtObj ? districtObj.name : districtId;
        const recipientUpazila = upazilaObj ? upazilaObj.name : upazilaId;

        const hospitalName = form.hospitalName.value;
        const fullAddress = form.fullAddress.value;
        const bloodGroup = form.bloodGroup.value;
        const donationDate = form.donationDate.value;
        const donationTime = form.donationTime.value;
        const requestMessage = form.requestMessage.value;

        if (divisionId === 'default' || districtId === 'default' || upazilaId === 'default') {
            Swal.fire({
               icon: 'error',
               title: 'Incomplete Location',
               text: 'Please ensure Division, District, and Upazila are valid.',
               confirmButtonColor: '#EF4444',
               background: isDark ? '#1a1a24' : '#fff',
               color: isDark ? '#f8fafc' : '#1F2937'
           });
           return;
       }

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
                    background: isDark ? '#1a1a24' : '#fff',
                    color: isDark ? '#f8fafc' : '#1F2937'
                })
                event.target.reset();
                setSelectedDivision('');
                setSelectedDistrict('');
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
                     background: isDark ? '#1a1a24' : '#fff',
                     color: isDark ? '#f8fafc' : '#1F2937'
                 });
             }
        })

    }

    const inputClass = `input input-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 ${
        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white text-gray-900'
    }`;
    
    const readOnlyClass = `input input-bordered w-full pl-10 ${
        isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 text-gray-500'
    }`;
    
    const labelClass = `label font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`;
    const iconClass = `absolute left-4 top-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`;

    return (
        <div className="w-full max-w-4xl mx-auto">
             <div className="text-center mb-10">
                <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Create Donation Request</h2>
                <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Fill out the form below to request blood for a patient in need.</p>
            </div>
            
            <div className={`shadow-xl rounded-2xl overflow-hidden p-8 border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
            }`}>
                <form onSubmit={handleCreateRequest}>
                    {/* Requester Info Section */}
                    <div className="mb-8">
                        <h3 className={`text-lg font-bold border-b pb-2 mb-4 flex items-center gap-2 ${
                            isDark ? 'text-gray-200 border-gray-700' : 'text-gray-700 border-gray-200'
                        }`}>
                             <span className={`p-1 rounded ${
                                 isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                             }`}>1</span> Requester Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className={labelClass}>Requester Name</label>
                                <div className="relative">
                                    <FaUser className={iconClass} />
                                    <input type="text" value={user?.displayName || ''} className={readOnlyClass} readOnly />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className={labelClass}>Requester Email</label>
                                <div className="relative">
                                     <FaEnvelope className={iconClass} />
                                    <input type="text" value={user?.email || ''} className={readOnlyClass} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Patient Info Section */}
                    <div className="mb-8">
                        <h3 className={`text-lg font-bold border-b pb-2 mb-4 flex items-center gap-2 ${
                            isDark ? 'text-gray-200 border-gray-700' : 'text-gray-700 border-gray-200'
                        }`}>
                            <span className={`p-1 rounded ${
                                 isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                             }`}>2</span> Patient Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className={labelClass}>Recipient Name</label>
                                <input type="text" name="recipientName" placeholder="Patient Name" className={inputClass} required />
                            </div>
                            <div className="form-control">
                                <label className={labelClass}>Blood Group Needed</label>
                                <div className="relative">
                                    <FaTint className={`absolute left-4 top-4 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                                    <select name="bloodGroup" className={`${inputClass} pl-10`} defaultValue="default" required>
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

                             {/* Location Selection */}
                             <div className="form-control">
                                <label className={labelClass}>Division</label>
                                <select 
                                    name="recipientDivision" 
                                    className={inputClass} 
                                    defaultValue="default" 
                                    onChange={(e) => {
                                        setSelectedDivision(e.target.value);
                                        setSelectedDistrict(''); 
                                    }}
                                    required
                                >
                                    <option disabled value="default">Select Division</option>
                                    {divisions.map(div => <option key={div.id} value={div.id}>{div.name}</option>)}
                                </select>
                            </div>

                             <div className="form-control">
                                <label className={labelClass}>District</label>
                                <select 
                                    name="recipientDistrict" 
                                    className={inputClass} 
                                    defaultValue="default"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setSelectedDistrict(val === 'default' ? '' : val);
                                    }}
                                    disabled={!selectedDivision}
                                >
                                    <option value="default">All Districts (Show all Upazilas)</option>
                                    {filteredDistricts.map(dist => <option key={dist.id} value={dist.id}>{dist.name}</option>)}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className={labelClass}>Upazila</label>
                                <select 
                                    name="recipientUpazila" 
                                    className={inputClass} 
                                    defaultValue="default" 
                                    required
                                    disabled={!selectedDivision}
                                >
                                    <option disabled value="default">Select Upazila</option>
                                    {filteredUpazilas.map(upa => {
                                            const dist = districts.find(d => d.id === upa.district_id);
                                            return (
                                                <option key={upa.id} value={upa.id}>
                                                    {upa.name} {(!selectedDistrict && dist) ? `(${dist.name})` : ''}
                                                </option>
                                            );
                                    })}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className={labelClass}>Hospital Name</label>
                                <div className="relative">
                                    <FaHospital className={iconClass} />
                                    <input type="text" name="hospitalName" placeholder="e.g. Dhaka Medical College" className={`${inputClass} pl-10`} required />
                                </div>
                            </div>
                             <div className="form-control">
                                <label className={labelClass}>Full Address</label>
                                <div className="relative">
                                    <FaMapMarkerAlt className={iconClass} />
                                    <input type="text" name="fullAddress" placeholder="e.g. Ward 12, Bed 4" className={`${inputClass} pl-10`} required />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className={labelClass}>Donation Date</label>
                                <div className="relative">
                                    <FaCalendarAlt className={iconClass} />
                                    <input type="date" name="donationDate" className={`${inputClass} pl-10`} required />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className={labelClass}>Donation Time</label>
                                 <div className="relative">
                                    <FaClock className={iconClass} />
                                    <input type="time" name="donationTime" className={`${inputClass} pl-10`} required />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <label className={labelClass}>Request Message (Optional)</label>
                        <textarea 
                            name="requestMessage" 
                            className={`textarea textarea-bordered h-24 focus:ring-1 focus:ring-red-500 focus:border-red-500 ${
                                isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white text-gray-900'
                            }`}
                            placeholder="Please describe why blood is needed..."
                        ></textarea>
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
