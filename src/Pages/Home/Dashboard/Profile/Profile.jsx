/**
 * PREMIUM PROFILE PAGE
 * Features: Beautiful visuals, stats, activity section, better dark mode, animations
 */

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { 
    FaEdit, FaUser, FaEnvelope, FaTint, FaMapMarkerAlt, FaSave, FaTimes, FaCamera, 
    FaShieldAlt, FaHeart, FaCalendarAlt, FaCheckCircle, FaClock, FaChartLine,
    FaMedal, FaUserCheck, FaGlobeAsia
} from 'react-icons/fa';
import useTheme from '../../../../hooks/useTheme';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { isDark } = useTheme();

    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    useEffect(() => {
        fetch('/bd-divisions.json').then(res => res.json()).then(data => setDivisions(data.divisions || data));
        fetch('/bd-districts.json').then(res => res.json()).then(data => setDistricts(data.districts || data));
        fetch('/bd-upazilas.json').then(res => res.json()).then(data => setUpazilas(data.upazilas || data));
    }, []);

    const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY || "1b5d848d79aaff23083c6e0c6bb33399";
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const { data: dbUser = {}, refetch, isLoading: profileLoading } = useQuery({
        queryKey: ['profile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    // Initialize dropdowns when editing starts or user data loads
    useEffect(() => {
        if (dbUser.division && divisions.length > 0) {
            const div = divisions.find(d => d.name === dbUser.division);
            if (div) setSelectedDivision(div.id);
        }
        if (dbUser.district && districts.length > 0) {
            const dist = districts.find(d => d.name === dbUser.district);
            if (dist) setSelectedDistrict(dist.id);
        }
    }, [dbUser, divisions, districts, isEditing]);

    const filteredDistricts = districts.filter(dist => dist.division_id === selectedDivision);
    const filteredUpazilas = selectedDistrict 
        ? upazilas.filter(upa => upa.district_id === selectedDistrict)
        : upazilas.filter(upa => filteredDistricts.some(dist => dist.id === upa.district_id));

    // Fetch user's donation requests for stats
    const { data: userRequests = [] } = useQuery({
        queryKey: ['user-requests', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation-requests?email=${user.email}`);
            return res.data;
        }
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(image_hosting_api, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                const imgUrl = data.data.display_url;
                await updateUserProfile(user.displayName, imgUrl);
                await axiosSecure.patch(`/users/${dbUser._id}`, { avatar: imgUrl });
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Photo Updated!',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    background: isDark ? '#1a1a24' : '#fff',
                    color: isDark ? '#f8fafc' : '#1F2937'
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'Could not upload image. Please try again.',
                background: isDark ? '#1a1a24' : '#fff',
                color: isDark ? '#f8fafc' : '#1F2937'
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const bloodGroup = form.bloodGroup.value;

        // Get IDs
        const divisionId = form.division.value;
        const districtId = form.district.value;
        const upazilaId = form.upazila.value;

        // Find Names
        const divisionObj = divisions.find(d => d.id === divisionId);
        const districtObj = districts.find(d => d.id === districtId);
        const upazilaObj = upazilas.find(u => u.id === upazilaId);

        const division = divisionObj ? divisionObj.name : dbUser.division; // Fallback to existing if not changed/found
        const district = districtObj ? districtObj.name : dbUser.district;
        const upazila = upazilaObj ? upazilaObj.name : dbUser.upazila;
        
        // Better validation: if dropdowns are disabled/not changed, they might send empty strings or defaults.
        // Actually, since we set defaultValue/value on select, they should send valid IDs if changed, or previous values if not?
        // Wait, if I set value={selectedDivision} on select, it sends that ID.

        updateUserProfile(name, user.photoURL)
            .then(() => {
                const updateData = { name, division, district, upazila, bloodGroup };
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
                                background: isDark ? '#1a1a24' : '#fff',
                                color: isDark ? '#f8fafc' : '#1F2937'
                            });
                            setIsEditing(false);
                        }
                    });
            })
            .catch(error => console.error(error));
    };

    const inputClass = `input input-bordered w-full h-12 transition-all duration-300 ${
        isEditing 
            ? isDark 
                ? 'bg-gray-800 border-gray-600 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                : 'bg-white border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
            : isDark 
                ? 'bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-50 border-gray-100 text-gray-500 cursor-not-allowed'
    }`;

    const selectClass = `select select-bordered w-full h-12 transition-all duration-300 ${
        isEditing 
            ? isDark 
                ? 'bg-gray-800 border-gray-600 text-white focus:border-red-500' 
                : 'bg-white border-gray-200 focus:border-red-500' 
            : isDark 
                ? 'bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-50 border-gray-100 text-gray-500 cursor-not-allowed'
    }`;

    // Calculate stats
    const completedRequests = userRequests.filter(r => r.status === 'done').length;
    const pendingRequests = userRequests.filter(r => r.status === 'pending').length;
    const totalRequests = userRequests.length;

    const stats = [
        { icon: FaHeart, label: 'Total Requests', value: totalRequests, color: 'red' },
        { icon: FaCheckCircle, label: 'Completed', value: completedRequests, color: 'green' },
        { icon: FaClock, label: 'Pending', value: pendingRequests, color: 'amber' },
    ];

    const getRoleBadge = (role) => {
        const badges = {
            admin: { bg: isDark ? 'bg-purple-500/20' : 'bg-purple-100', text: 'text-purple-500', icon: '🤴' },
            volunteer: { bg: isDark ? 'bg-blue-500/20' : 'bg-blue-100', text: 'text-blue-500', icon: '🤝' },
            donor: { bg: isDark ? 'bg-green-500/20' : 'bg-green-100', text: 'text-green-500', icon: '💚' }
        };
        return badges[role?.toLowerCase()] || badges.donor;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    if (profileLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    const roleBadge = getRoleBadge(dbUser.role);

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto space-y-6"
        >
            {/* Header Card with Avatar */}
            <motion.div variants={itemVariants} className="rounded-3xl overflow-hidden shadow-xl glossy-glass">
                {/* Banner */}
                <div className="relative h-48 bg-gradient-to-br from-red-600 via-red-500 to-rose-500 overflow-hidden">
                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                    
                    {/* Edit Button */}
                    {!isEditing && (
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsEditing(true)} 
                            className="absolute top-6 right-6 btn bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-red-600 gap-2 rounded-full px-6"
                        >
                            <FaEdit /> Edit Profile
                        </motion.button>
                    )}
                </div>

                {/* Profile Info */}
                <div className="relative px-8 pb-8">
                    {/* Avatar */}
                    <div className="relative -mt-20 mb-4 flex justify-between items-end">
                        <div className="relative group">
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="w-36 h-36 rounded-2xl p-1 shadow-2xl glossy-glass"
                            >
                                <img 
                                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} 
                                    alt="Profile" 
                                    className="w-full h-full rounded-xl object-cover" 
                                />
                                {isUploading && (
                                    <div className="absolute inset-1 bg-black/60 rounded-xl flex items-center justify-center">
                                        <span className="loading loading-spinner loading-md text-white"></span>
                                    </div>
                                )}
                            </motion.div>
                            
                            {/* Online indicator */}
                            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                            
                            {/* Upload overlay */}
                            <label className={`absolute inset-1 rounded-xl flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer ${isUploading ? 'pointer-events-none' : ''}`}>
                                <div className="text-center text-white">
                                    <FaCamera className="text-2xl mx-auto mb-1" />
                                    <span className="text-xs">Change Photo</span>
                                </div>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                />
                            </label>
                        </div>

                        {/* Role Badge */}
                        <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${roleBadge.bg}`}>
                            <span className="text-lg">{roleBadge.icon}</span>
                            <span className={`font-bold capitalize ${roleBadge.text}`}>{dbUser.role || 'Donor'}</span>
                        </div>
                    </div>

                    {/* Name & Email */}
                    <div className="mb-6">
                        <h2 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user?.displayName || 'User'}
                        </h2>
                        <p className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <FaEnvelope className="text-red-500" /> {user?.email}
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-3 gap-4"
                    >
                        {stats.map((stat, idx) => (
                            <motion.div 
                                key={stat.label}
                                variants={itemVariants}
                                className="p-4 rounded-2xl text-center glossy-glass"
                            >
                                <stat.icon className={`text-2xl mx-auto mb-2 text-${stat.color}-500`} />
                                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Blood Group & Info */}
                <motion.div variants={containerVariants} className="space-y-6">
                    {/* Blood Group Card */}
                    <motion.div 
                        variants={itemVariants}
                        className="p-6 rounded-2xl shadow-lg glossy-glass"
                    >
                        <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Blood Information
                        </h3>
                        <div className={`p-6 rounded-xl text-center ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-gradient-to-br from-red-50 to-rose-50'}`}>
                            <FaTint className="text-5xl text-red-500 mx-auto mb-3" />
                            <span className="text-5xl font-black text-red-500">{dbUser.bloodGroup || 'N/A'}</span>
                            <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Blood Group</p>
                        </div>
                    </motion.div>

                    {/* Location Card */}
                    <motion.div 
                        variants={itemVariants}
                        className="p-6 rounded-2xl shadow-lg glossy-glass"
                    >
                        <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Location
                        </h3>
                        <div className="space-y-4">
                            <div className={`flex items-center gap-4 p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                                    <FaGlobeAsia className="text-blue-500" />
                                </div>
                                <div>
                                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Division</p>
                                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{dbUser.division || 'Not set'}</p>
                                </div>
                            </div>
                            <div className={`flex items-center gap-4 p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                                    <FaMapMarkerAlt className="text-green-500" />
                                </div>
                                <div>
                                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>District</p>
                                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{dbUser.district || 'Not set'}</p>
                                </div>
                            </div>
                            <div className={`flex items-center gap-4 p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                                    <FaMapMarkerAlt className="text-purple-500" />
                                </div>
                                <div>
                                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Upazila</p>
                                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{dbUser.upazila || 'Not set'}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Account Status */}
                    <motion.div 
                        variants={itemVariants}
                        className="p-6 rounded-2xl shadow-lg glossy-glass"
                    >
                        <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Account Status
                        </h3>
                        <div className={`flex items-center gap-4 p-4 rounded-xl ${
                            dbUser.status === 'active' 
                                ? isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50'
                                : isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50'
                        }`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                dbUser.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                                <FaUserCheck className="text-white text-xl" />
                            </div>
                            <div>
                                <p className={`font-bold capitalize ${
                                    dbUser.status === 'active' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                    {dbUser.status || 'Active'}
                                </p>
                                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Account Status</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column - Edit Form */}
                <motion.div 
                    variants={itemVariants}
                    className="lg:col-span-2 p-8 rounded-2xl shadow-lg glossy-glass"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Personal Information
                        </h3>
                        {isEditing && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-500">
                                Editing Mode
                            </span>
                        )}
                    </div>
                    {/* ... Rest of the form remains unchanged as it relies on inputs ... */}
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="form-control">
                                <label className={`text-sm font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <FaUser className="text-red-500" /> Full Name
                                </label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    defaultValue={dbUser.name} 
                                    disabled={!isEditing} 
                                    className={inputClass} 
                                />
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className={`text-sm font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <FaEnvelope className="text-red-500" /> Email Address
                                </label>
                                <input 
                                    type="text" 
                                    value={dbUser.email} 
                                    disabled 
                                    className={`input input-bordered w-full h-12 cursor-not-allowed ${
                                        isDark ? 'bg-gray-900 text-gray-500 border-gray-700' : 'bg-gray-100 text-gray-500 border-gray-100'
                                    }`} 
                                />
                                <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Email cannot be changed</p>
                            </div>
                            {/* Blood Group */}
                            <div className="form-control">
                                <label className={`text-sm font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <FaTint className="text-red-500" /> Blood Group
                                </label>
                                <select 
                                    name="bloodGroup" 
                                    disabled={!isEditing} 
                                    className={selectClass}
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

                            {/* Division */}
                            <div className="form-control">
                                <label className={`text-sm font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <FaMapMarkerAlt className="text-red-500" /> Division
                                </label>
                                <select 
                                    name="division" 
                                    disabled={!isEditing} 
                                    className={selectClass}
                                    value={selectedDivision}
                                    onChange={(e) => {
                                        setSelectedDivision(e.target.value);
                                        setSelectedDistrict('');
                                    }}
                                >
                                    <option value="">Select Division</option>
                                    {divisions.map((div) => (
                                        <option key={div.id} value={div.id}>{div.name}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* District */}
                            <div className="form-control">
                                <label className={`text-sm font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <FaMapMarkerAlt className="text-red-500" /> District
                                </label>
                                <select 
                                    name="district" 
                                    disabled={!isEditing} 
                                    className={selectClass}
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                >
                                    <option value="">Select District</option>
                                    {filteredDistricts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>

                            {/* Upazila */}
                            <div className="form-control md:col-span-2">
                                <label className={`text-sm font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <FaMapMarkerAlt className="text-red-500" /> Upazila
                                </label>
                                <select 
                                    name="upazila" 
                                    disabled={!isEditing} 
                                    className={selectClass}
                                    defaultValue={upazilas.find(u => u.name === dbUser.upazila)?.id}
                                    key={selectedDistrict + (dbUser.upazila || '')}
                                >
                                    <option value="">Select Upazila</option>
                                    {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                </select>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        {isEditing ? (
                            <div className="flex gap-4 pt-4">
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit" 
                                    className="btn flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white gap-2 shadow-lg border-none h-14 rounded-xl text-base"
                                >
                                    <FaSave /> Save Changes
                                </motion.button>
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button" 
                                    onClick={() => setIsEditing(false)} 
                                    className={`btn gap-2 h-14 rounded-xl ${isDark ? 'btn-ghost text-gray-300' : 'btn-ghost'}`}
                                >
                                    <FaTimes /> Cancel
                                </motion.button>
                            </div>
                        ) : (
                            <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Click "Edit Profile" to update your information
                                </p>
                            </div>
                        )}
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Profile;
