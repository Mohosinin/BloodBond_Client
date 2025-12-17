import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaUser, FaEnvelope, FaTint, FaMapMarkerAlt, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const axiosSecure = useAxiosSecure();

    const districts = ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barisal", "Rangpur", "Mymensingh"];
    const upazilas = ["Savar", "Dhamrai", "Keraniganj", "Nawabganj", "Dohar", "Mirpur", "Gulshan", "Banani"];
    
    const { data: dbUser = {}, refetch, isLoading: profileLoading } = useQuery({
        queryKey: ['profile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const bloodGroup = form.bloodGroup.value;
        
        // Update Firebase Profile (Name)
        updateUserProfile(name, user.photoURL)
            .then(() => {
                // Update MongoDB
                const updateData = { name, district, upazila, bloodGroup };
                axiosSecure.patch(`/users/${dbUser._id}`, updateData)
                    .then(res => {
                        if(res.data.modifiedCount > 0){
                            refetch();
                            Swal.fire({
                                icon: 'success',
                                title: 'Profile Updated!',
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                iconColor: '#EF4444',
                                background: '#fff',
                                color: '#1F2937'
                            });
                            setIsEditing(false);
                        }
                    })
            })
            .catch(error => console.error(error));
    }

    if (profileLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
             <div className="bg-red-600 rounded-t-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-white">
                    <h2 className="text-3xl font-bold mb-4 md:mb-0">My Profile</h2>
                    {!isEditing && (
                        <button 
                            onClick={() => setIsEditing(true)} 
                            className="btn bg-white text-red-600 hover:bg-red-50 border-none shadow-lg gap-2"
                        >
                            <FaEdit /> Edit Profile
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white shadow-xl rounded-b-2xl p-8 border-x border-b border-gray-100 relative">
                <div className="flex flex-col md:flex-row gap-12">
                     {/* Avatar Section */}
                    <div className="md:w-1/3 flex flex-col items-center">
                        <div className="relative -mt-20 mb-6">
                            <div className="w-40 h-40 rounded-full p-1 bg-white shadow-xl">
                                <img 
                                    src={user?.photoURL} 
                                    alt="Profile" 
                                    className="w-full h-full rounded-full object-cover" 
                                />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{user?.displayName}</h3>
                        <p className="text-gray-500 mb-6 flex items-center gap-2"><FaEnvelope /> {user?.email}</p>
                        
                        <div className="w-full bg-red-50 p-6 rounded-xl text-center">
                            <p className="text-sm text-gray-500 uppercase font-semibold mb-2">Blood Group</p>
                            <span className="text-4xl font-black text-red-600 flex items-center justify-center gap-2">
                                <FaTint /> {dbUser.bloodGroup}
                            </span>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="md:w-2/3">
                        <form onSubmit={handleUpdate} className={isEditing ? 'opacity-100' : 'opacity-90'}>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="form-control">
                                    <label className="label font-semibold text-gray-600">Full Name</label>
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-4 text-gray-400" />
                                        <input 
                                            type="text" 
                                            name="name" 
                                            defaultValue={dbUser.name} 
                                            disabled={!isEditing} 
                                            className={`input input-bordered w-full pl-10 ${isEditing ? 'focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'bg-gray-50 border-transparent'}`} 
                                        />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold text-gray-600">Email Address</label>
                                     <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                                        <input type="text" value={dbUser.email} disabled className="input input-bordered w-full pl-10 bg-gray-50 text-gray-500 border-transparent cursor-not-allowed" />
                                    </div>
                                </div>
                                 <div className="form-control">
                                    <label className="label font-semibold text-gray-600">Blood Group</label>
                                    <div className="relative">
                                        <FaTint className="absolute left-4 top-4 text-gray-400" />
                                        <select 
                                            name="bloodGroup" 
                                            disabled={!isEditing} 
                                            className={`select select-bordered w-full pl-10 ${isEditing ? 'focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'bg-gray-50 border-transparent'}`}
                                            defaultValue={dbUser.bloodGroup}
                                        >
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
                                        <select 
                                            name="district" 
                                            disabled={!isEditing} 
                                            className={`select select-bordered w-full pl-10 ${isEditing ? 'focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'bg-gray-50 border-transparent'}`}
                                            defaultValue={dbUser.district}
                                        >
                                            {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold text-gray-600">Upazila</label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
                                        <select 
                                            name="upazila" 
                                            disabled={!isEditing} 
                                            className={`select select-bordered w-full pl-10 ${isEditing ? 'focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'bg-gray-50 border-transparent'}`}
                                            defaultValue={dbUser.upazila}
                                        >
                                            {upazilas.map(u => <option key={u} value={u}>{u}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            {isEditing && (
                                <div className="mt-8 flex gap-4 animate-in fade-in duration-300">
                                    <button type="submit" className="btn bg-red-600 hover:bg-red-700 text-white gap-2 shadow-lg border-none px-8">
                                        <FaSave /> Save Changes
                                    </button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="btn btn-ghost gap-2">
                                        <FaTimes /> Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
