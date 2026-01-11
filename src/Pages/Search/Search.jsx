/**
 * ENHANCED FIND DONORS PAGE
 * Features: Shows all donors, request blood functionality, improved UI
 */

import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTint, FaMapMarkerAlt, FaUser, FaTimes, FaEnvelope, FaHeart, FaPaperPlane, FaUsers, FaPhone } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import SkeletonCard from '../../Components/SkeletonCard/SkeletonCard';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Search = () => {
    const { isDark } = useTheme();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    
    const [allDonors, setAllDonors] = useState([]);
    const [filteredDonors, setFilteredDonors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [requestLoading, setRequestLoading] = useState(false);
    
    // Filter states
    const [bloodGroup, setBloodGroup] = useState('');
    const [division, setDivision] = useState('');
    const [searchName, setSearchName] = useState('');
    
    // Location data
    const [divisions, setDivisions] = useState([]);

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    // Load divisions data
    useEffect(() => {
        fetch('/bd-divisions.json')
            .then(res => res.json())
            .then(data => {
                if (data.divisions) {
                    setDivisions(data.divisions);
                } else if (Array.isArray(data) && data[2]?.data) {
                    setDivisions(data[2].data);
                } else if (Array.isArray(data)) {
                    setDivisions(data);
                }
            })
            .catch(err => console.error('Error loading divisions:', err));
    }, []);

    // Load all donors on page load
    useEffect(() => {
        const fetchAllDonors = async () => {
            setIsLoading(true);
            try {
                // Primary: Try the dedicated donors endpoint
                const res = await axiosPublic.get('/users/donors');
                if (res.data && res.data.length > 0) {
                    setAllDonors(res.data);
                    setFilteredDonors(res.data);
                } else {
                    // Fallback: Try search-donors endpoint without filters
                    const fallbackRes = await axiosPublic.get('/search-donors');
                    setAllDonors(fallbackRes.data || []);
                    setFilteredDonors(fallbackRes.data || []);
                }
            } catch (error) {
                console.error('Error fetching donors:', error);
                // Fallback: search-donors endpoint
                try {
                    const fallbackRes = await axiosPublic.get('/search-donors');
                    setAllDonors(fallbackRes.data || []);
                    setFilteredDonors(fallbackRes.data || []);
                } catch (fallbackError) {
                    console.error('Fallback also failed:', fallbackError);
                    setAllDonors([]);
                    setFilteredDonors([]);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllDonors();
    }, [axiosPublic]);

    // Filter donors when criteria change
    useEffect(() => {
        let results = [...allDonors];
        
        if (bloodGroup) {
            results = results.filter(d => d.bloodGroup === bloodGroup);
        }
        
        if (division) {
            const divName = divisions.find(d => d.id === division)?.name?.toLowerCase();
            if (divName) {
                results = results.filter(d => d.division?.toLowerCase() === divName);
            }
        }
        
        if (searchName) {
            results = results.filter(d => 
                d.name?.toLowerCase().includes(searchName.toLowerCase())
            );
        }
        
        setFilteredDonors(results);
    }, [bloodGroup, division, searchName, allDonors, divisions]);

    const clearFilters = () => {
        setBloodGroup('');
        setDivision('');
        setSearchName('');
    };

    // Handle request blood from donor
    const handleRequestBlood = (donor) => {
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please login to request blood from donors.',
                confirmButtonColor: '#EF4444',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Login Now',
                background: isDark ? '#1a1a24' : '#fff',
                color: isDark ? '#f8fafc' : '#1F2937'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }
        setSelectedDonor(donor);
        setShowRequestModal(true);
    };

    // Submit blood request
    const submitBloodRequest = async (e) => {
        e.preventDefault();
        setRequestLoading(true);
        
        const form = e.target;
        const requestData = {
            requesterName: user.displayName,
            requesterEmail: user.email,
            recipientName: form.recipientName.value,
            bloodGroup: selectedDonor.bloodGroup,
            recipientDistrict: form.district.value,
            recipientUpazila: form.upazila.value,
            hospitalName: form.hospital.value,
            fullAddress: form.address.value,
            donationDate: form.date.value,
            donationTime: form.time.value,
            requestMessage: form.message.value,
            status: 'pending',
            targetDonor: {
                id: selectedDonor._id,
                name: selectedDonor.name,
                email: selectedDonor.email
            }
        };
        
        try {
            const res = await axiosSecure.post('/donation-requests', requestData);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Request Sent!',
                    text: `Your blood request has been submitted. ${selectedDonor.name} will be notified.`,
                    confirmButtonColor: '#EF4444',
                    background: isDark ? '#1a1a24' : '#fff',
                    color: isDark ? '#f8fafc' : '#1F2937'
                });
                setShowRequestModal(false);
                setSelectedDonor(null);
            }
        } catch (error) {
            console.error('Request error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Request Failed',
                text: 'Could not submit your request. Please try again.',
                confirmButtonColor: '#EF4444',
                background: isDark ? '#1a1a24' : '#fff',
                color: isDark ? '#f8fafc' : '#1F2937'
            });
        } finally {
            setRequestLoading(false);
        }
    };

    const selectClass = `select select-bordered w-full h-12 text-base transition-all ${
        isDark ? 'bg-gray-800 border-gray-700 text-white focus:border-red-500' : 'bg-white border-gray-200 focus:border-red-500'
    }`;

    const inputClass = `input input-bordered w-full h-12 transition-all ${
        isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-red-500' : 'bg-white border-gray-200 focus:border-red-500'
    }`;

    // Group donors by blood type for stats
    const bloodTypeStats = bloodGroups.map(bg => ({
        type: bg,
        count: allDonors.filter(d => d.bloodGroup === bg).length
    }));

    // Render skeleton loaders
    const renderSkeletons = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
                <SkeletonCard key={idx} type="donor" />
            ))}
        </div>
    );

    return (
        <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className="bg-gradient-to-br from-red-600 via-red-500 to-rose-600 py-20 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 px-4"
                >
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <FaUsers className="animate-pulse" />
                        <span>{allDonors.length} Verified Donors</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Blood Donors</h1>
                    <p className="text-red-100 max-w-xl mx-auto text-lg">
                        Connect with verified donors and request blood donation directly.
                    </p>
                </motion.div>
            </div>

            {/* Blood Type Stats */}
            <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-4 md:grid-cols-8 gap-2"
                >
                    {bloodTypeStats.map((stat, idx) => (
                        <button
                            key={stat.type}
                            onClick={() => setBloodGroup(bloodGroup === stat.type ? '' : stat.type)}
                            className={`p-3 rounded-xl text-center transition-all shadow-lg ${
                                bloodGroup === stat.type
                                    ? 'bg-gradient-to-br from-red-600 to-rose-600 text-white scale-105'
                                    : isDark 
                                        ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' 
                                        : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-100'
                            }`}
                        >
                            <span className="text-xl font-bold block">{stat.type}</span>
                            <span className={`text-xs ${bloodGroup === stat.type ? 'text-red-100' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {stat.count} donors
                            </span>
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Search & Filter */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`rounded-2xl shadow-sm border p-6 ${
                        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                    }`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search by Name */}
                        <div className="form-control md:col-span-2">
                            <div className="relative">
                                <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                <input 
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    className={`${inputClass} pl-12`}
                                />
                            </div>
                        </div>
                        
                        {/* Division Filter */}
                        <div className="form-control">
                            <select 
                                value={division} 
                                onChange={(e) => setDivision(e.target.value)}
                                className={selectClass}
                            >
                                <option value="">All Divisions</option>
                                {divisions.map(div => (
                                    <option key={div.id} value={div.id}>{div.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Clear Filters */}
                        <div className="form-control">
                            <button 
                                onClick={clearFilters}
                                disabled={!bloodGroup && !division && !searchName}
                                className={`btn h-12 w-full gap-2 ${
                                    !bloodGroup && !division && !searchName
                                        ? 'btn-disabled'
                                        : isDark 
                                            ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                                            : 'btn-ghost border border-gray-200'
                                }`}
                            >
                                <FaTimes /> Clear Filters
                            </button>
                        </div>
                    </div>
                    
                    {/* Active Filters Display */}
                    {(bloodGroup || division || searchName) && (
                        <div className={`flex items-center gap-2 mt-4 pt-4 border-t flex-wrap ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Showing:</span>
                            {bloodGroup && (
                                <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white">
                                    {bloodGroup}
                                </span>
                            )}
                            {division && (
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                                }`}>
                                    {divisions.find(d => d.id === division)?.name}
                                </span>
                            )}
                            {searchName && (
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                                }`}>
                                    "{searchName}"
                                </span>
                            )}
                            <span className={`ml-auto text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                {filteredDonors.length} donors found
                            </span>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Results */}
            <div className="max-w-6xl mx-auto px-4 pb-12">
                {isLoading ? (
                    renderSkeletons()
                ) : filteredDonors.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-center py-20 rounded-2xl border ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                        }`}
                    >
                        <FaTint className={`text-6xl mx-auto mb-6 ${isDark ? 'text-red-500/50' : 'text-red-200'}`} />
                        <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            No Donors Found
                        </h3>
                        <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            Try adjusting your search criteria.
                        </p>
                        <button 
                            onClick={clearFilters}
                            className="btn btn-outline btn-error rounded-full mt-6"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredDonors.map((donor, idx) => (
                            <motion.div 
                                key={donor._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                className={`rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group ${
                                    isDark 
                                        ? 'bg-gray-800 border-gray-700 hover:border-red-500/30' 
                                        : 'bg-white border-gray-100 hover:border-red-200'
                                }`}
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-br from-red-500 to-rose-600 p-4 relative">
                                    <div className="absolute top-2 right-2">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm text-white">
                                            {donor.status === 'active' ? '✓ Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <div className="text-center pt-4">
                                        <img 
                                            src={donor.photo || donor.avatar || "https://i.ibb.co/4pDNDk1/avatar.png"} 
                                            alt={donor.name} 
                                            className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-white/30 shadow-lg"
                                        />
                                    </div>
                                </div>
                                
                                {/* Blood Badge */}
                                <div className="flex justify-center -mt-4 relative z-10">
                                    <span className={`px-5 py-2 rounded-full text-lg font-bold shadow-lg ${
                                        isDark ? 'bg-gray-800 text-red-500 ring-2 ring-red-500/30' : 'bg-white text-red-600 ring-2 ring-red-100'
                                    }`}>
                                        <FaTint className="inline mr-1" /> {donor.bloodGroup}
                                    </span>
                                </div>
                                
                                {/* Content */}
                                <div className="p-5 pt-3 text-center">
                                    <h3 className={`text-lg font-bold mb-1 group-hover:text-red-500 transition-colors ${
                                        isDark ? 'text-white' : 'text-gray-800'
                                    }`}>
                                        {donor.name}
                                    </h3>
                                    
                                    <p className={`text-sm flex items-center justify-center gap-1 mb-4 ${
                                        isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                        <FaMapMarkerAlt className="text-red-400" />
                                        {donor.division || 'Bangladesh'}
                                        {donor.district && `, ${donor.district}`}
                                    </p>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setSelectedDonor(donor)}
                                            className={`btn btn-sm flex-1 rounded-full ${
                                                isDark 
                                                    ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                                                    : 'btn-ghost border border-gray-200'
                                            }`}
                                        >
                                            <FaUser className="text-xs" /> View
                                        </button>
                                        <button 
                                            onClick={() => handleRequestBlood(donor)}
                                            className="btn btn-sm flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-none rounded-full"
                                        >
                                            <FaHeart className="text-xs" /> Request
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Donor Details Modal */}
            {selectedDonor && !showRequestModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`w-full max-w-md rounded-3xl shadow-2xl overflow-hidden ${
                            isDark ? 'bg-gray-800' : 'bg-white'
                        }`}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-br from-red-500 to-rose-600 p-6 relative">
                            <button 
                                onClick={() => setSelectedDonor(null)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 text-white transition-colors"
                            >
                                <FaTimes />
                            </button>
                            <div className="text-center">
                                <img 
                                    src={selectedDonor.photo || selectedDonor.avatar || "https://i.ibb.co/4pDNDk1/avatar.png"} 
                                    alt={selectedDonor.name} 
                                    className="w-28 h-28 rounded-full object-cover mx-auto ring-4 ring-white/30 shadow-xl"
                                />
                            </div>
                        </div>
                        
                        {/* Blood Badge */}
                        <div className="flex justify-center -mt-5 relative z-10">
                            <span className={`px-6 py-2 rounded-full text-xl font-bold shadow-lg ${
                                isDark ? 'bg-gray-800 text-red-500' : 'bg-white text-red-600'
                            }`}>
                                <FaTint className="inline mr-2" /> {selectedDonor.bloodGroup}
                            </span>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 pt-4 text-center">
                            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                {selectedDonor.name}
                            </h3>
                            
                            {/* Info Grid */}
                            <div className={`grid grid-cols-2 gap-3 mt-6 text-left`}>
                                <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                    <div className={`flex items-center gap-2 mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <FaMapMarkerAlt className="text-red-500" />
                                        <span className="text-xs">Division</span>
                                    </div>
                                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        {selectedDonor.division || 'N/A'}
                                    </p>
                                </div>
                                <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                    <div className={`flex items-center gap-2 mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <FaMapMarkerAlt className="text-green-500" />
                                        <span className="text-xs">District</span>
                                    </div>
                                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        {selectedDonor.district || 'N/A'}
                                    </p>
                                </div>
                                <div className={`p-4 rounded-xl col-span-2 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                    <div className={`flex items-center gap-2 mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <FaMapMarkerAlt className="text-purple-500" />
                                        <span className="text-xs">Upazila</span>
                                    </div>
                                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        {selectedDonor.upazila || 'N/A'}
                                    </p>
                                </div>
                            </div>
                            
                            <p className={`text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Click "Request Blood" to send a donation request to this donor.
                            </p>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-6">
                                <button 
                                    onClick={() => setSelectedDonor(null)}
                                    className={`btn flex-1 rounded-full ${isDark ? 'btn-ghost text-gray-300' : 'btn-ghost'}`}
                                >
                                    Close
                                </button>
                                <button 
                                    onClick={() => handleRequestBlood(selectedDonor)}
                                    className="btn flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-none rounded-full gap-2"
                                >
                                    <FaHeart /> Request Blood
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Blood Request Modal */}
            {showRequestModal && selectedDonor && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`w-full max-w-2xl my-8 rounded-3xl shadow-2xl overflow-hidden ${
                            isDark ? 'bg-gray-800' : 'bg-white'
                        }`}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-600 to-rose-600 p-6 relative">
                            <button 
                                onClick={() => {
                                    setShowRequestModal(false);
                                    setSelectedDonor(null);
                                }}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 text-white transition-colors"
                            >
                                <FaTimes />
                            </button>
                            <div className="flex items-center gap-4">
                                <img 
                                    src={selectedDonor.photo || selectedDonor.avatar || "https://i.ibb.co/4pDNDk1/avatar.png"} 
                                    alt={selectedDonor.name} 
                                    className="w-16 h-16 rounded-full object-cover ring-2 ring-white/30"
                                />
                                <div className="text-white">
                                    <h3 className="text-xl font-bold">Request Blood from {selectedDonor.name}</h3>
                                    <p className="text-red-100 flex items-center gap-2">
                                        <FaTint /> Blood Type: {selectedDonor.bloodGroup}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Form */}
                        <form onSubmit={submitBloodRequest} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className={`text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Recipient Name *
                                    </label>
                                    <input type="text" name="recipientName" className={inputClass} required placeholder="Who needs the blood?" />
                                </div>
                                <div className="form-control">
                                    <label className={`text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Hospital Name *
                                    </label>
                                    <input type="text" name="hospital" className={inputClass} required placeholder="Hospital/Clinic name" />
                                </div>
                                <div className="form-control">
                                    <label className={`text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        District *
                                    </label>
                                    <input type="text" name="district" className={inputClass} required placeholder="e.g., Dhaka" />
                                </div>
                                <div className="form-control">
                                    <label className={`text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Upazila *
                                    </label>
                                    <input type="text" name="upazila" className={inputClass} required placeholder="e.g., Mirpur" />
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className={`text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Full Address *
                                    </label>
                                    <input type="text" name="address" className={inputClass} required placeholder="Complete hospital/location address" />
                                </div>
                                <div className="form-control">
                                    <label className={`text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Required Date *
                                    </label>
                                    <input type="date" name="date" className={inputClass} required />
                                </div>
                                <div className="form-control">
                                    <label className={`text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Preferred Time *
                                    </label>
                                    <input type="time" name="time" className={inputClass} required />
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className={`text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Message to Donor (Optional)
                                    </label>
                                    <textarea 
                                        name="message" 
                                        rows="3" 
                                        className={`textarea textarea-bordered w-full ${isDark ? 'bg-gray-800 border-gray-700 text-white' : ''}`} 
                                        placeholder="Any additional information for the donor..."
                                    ></textarea>
                                </div>
                            </div>
                            
                            <div className={`p-4 rounded-xl mt-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <strong>Note:</strong> Your contact details will be shared with the donor once they accept your request.
                                </p>
                            </div>
                            
                            <div className="flex gap-3 pt-4">
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setShowRequestModal(false);
                                        setSelectedDonor(null);
                                    }}
                                    className={`btn flex-1 rounded-xl ${isDark ? 'btn-ghost text-gray-300' : 'btn-ghost'}`}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={requestLoading}
                                    className="btn flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-none rounded-xl gap-2 h-14 text-base"
                                >
                                    {requestLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        <>
                                            <FaPaperPlane /> Send Request
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Search;
