/**
 * ENHANCED DONATION REQUESTS PAGE
 * Features: Search, Filtering, Sorting, Pagination, Premium UI
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { 
    FaMapMarkerAlt, FaCalendarAlt, FaTint, FaFilter, FaSort, 
    FaChevronLeft, FaChevronRight, FaSearch, FaHospital, FaClock,
    FaHeart, FaExclamationCircle, FaTimes
} from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';
import SkeletonCard from '../../Components/SkeletonCard/SkeletonCard';

const DonationRequests = () => {
    const axiosPublic = useAxiosPublic();
    const { isDark } = useTheme();
    
    // State for filtering, sorting, and pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [bloodGroupFilter, setBloodGroupFilter] = useState('all');
    const [districtFilter, setDistrictFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('donationDate');
    const [sortOrder, setSortOrder] = useState('asc');
    const itemsPerPage = 8;

    const bloodGroups = ['all', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const districts = ['all', 'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh', 'Comilla', 'Narayanganj', 'Gazipur'];

    // Fetch donation requests - use main endpoint with client-side filtering as fallback
    const { data: allRequests = [], isLoading } = useQuery({
        queryKey: ['donation-requests-all'],
        queryFn: async () => {
            try {
                // Try paginated endpoint first
                const res = await axiosPublic.get('/donation-requests/paginated?limit=100&status=pending');
                return res.data.requests || [];
            } catch (error) {
                // Fallback to regular endpoint
                const res = await axiosPublic.get('/donation-requests');
                return res.data || [];
            }
        }
    });

    // Client-side filtering, sorting, and pagination
    const filteredRequests = allRequests.filter(req => {
        const matchesBloodGroup = bloodGroupFilter === 'all' || req.bloodGroup === bloodGroupFilter;
        const matchesDistrict = districtFilter === 'all' || req.recipientDistrict === districtFilter;
        const matchesSearch = !searchTerm || 
            req.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.recipientDistrict?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesBloodGroup && matchesDistrict && matchesSearch;
    });

    // Sort
    const sortedRequests = [...filteredRequests].sort((a, b) => {
        const aVal = a[sortBy] || '';
        const bVal = b[sortBy] || '';
        if (sortOrder === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });

    // Pagination
    const totalPages = Math.ceil(sortedRequests.length / itemsPerPage);
    const paginatedRequests = sortedRequests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }
    };

    const handleFilterChange = (value) => {
        setBloodGroupFilter(value);
        setCurrentPage(1);
    };

    const handleDistrictChange = (value) => {
        setDistrictFilter(value);
        setCurrentPage(1);
    }

    const clearFilters = () => {
        setBloodGroupFilter('all');
        setDistrictFilter('all');
        setSearchTerm('');
        setCurrentPage(1);
    };

    const hasActiveFilters = bloodGroupFilter !== 'all' || districtFilter !== 'all' || searchTerm;

    // Render skeleton loaders
    const renderSkeletons = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
                <SkeletonCard key={idx} type="request" />
            ))}
        </div>
    );

    return (
        <div className={`min-h-screen font-sans pb-20 transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 py-20 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0xMHY2aC02di02aDZ6bTAtMTB2NmgtNnYtNmg2em0xMCAxMHY2aC02di02aDZ6bS0yMCAwdjZoLTZ2LTZoNnptMTAgMTB2NmgtNnYtNmg2em0wLTIwdjZoLTZ2LTZoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 px-4"
                >
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <FaExclamationCircle className="animate-pulse" />
                        <span>{allRequests.length} Active Requests</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Urgent Donation Requests</h1>
                    <p className="text-red-100 max-w-2xl mx-auto text-lg">
                        These patients are in critical need of blood. Your donation can save a life today.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
                {/* Search & Filters Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`rounded-2xl shadow-xl border p-6 mb-8 ${
                        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                    }`}
                >
                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                        <input
                            type="text"
                            placeholder="Search by name, hospital, or district..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className={`input w-full pl-12 pr-12 h-14 text-lg rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 ${
                                isDark 
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                    : 'bg-gray-50 border-gray-200 placeholder-gray-400'
                            }`}
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors ${
                                    isDark ? 'text-gray-400 hover:bg-gray-600' : 'text-gray-400'
                                }`}
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                        {/* Filters Container */}
                        <div className="flex flex-col md:flex-row gap-6 w-full xl:w-auto">
                            {/* Filter by Blood Group */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <FaFilter className={isDark ? 'text-red-400' : 'text-red-500'} />
                                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Blood Type:</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {bloodGroups.map(bg => (
                                        <button
                                            key={bg}
                                            onClick={() => handleFilterChange(bg)}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                bloodGroupFilter === bg
                                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                                                    : isDark
                                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                                            }`}
                                        >
                                            {bg === 'all' ? 'All' : bg}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filter by District */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className={isDark ? 'text-red-400' : 'text-red-500'} />
                                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>District:</span>
                                </div>
                                <select 
                                    value={districtFilter}
                                    onChange={(e) => handleDistrictChange(e.target.value)}
                                    className={`select select-bordered select-sm h-9 rounded-lg ${
                                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
                                    }`}
                                >
                                    {districts.map(dist => (
                                        <option key={dist} value={dist}>{dist === 'all' ? 'All Districts' : dist}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Sort Options */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <FaSort className={isDark ? 'text-red-400' : 'text-red-500'} />
                                <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Sort:</span>
                            </div>
                            <select
                                value={`${sortBy}-${sortOrder}`}
                                onChange={(e) => {
                                    const [newSort, newOrder] = e.target.value.split('-');
                                    setSortBy(newSort);
                                    setSortOrder(newOrder);
                                    setCurrentPage(1);
                                }}
                                className={`select select-bordered select-sm h-9 rounded-lg w-full md:w-auto ${
                                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'
                                }`}
                            >
                                <option value="donationDate-asc">Date (Earliest)</option>
                                <option value="donationDate-desc">Date (Latest)</option>
                                <option value="bloodGroup-asc">Blood Group (A-Z)</option>
                                <option value="bloodGroup-desc">Blood Group (Z-A)</option>
                                <option value="recipientName-asc">Name (A-Z)</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Results count & Clear Filters */}
                    <div className={`mt-6 pt-4 border-t flex flex-wrap gap-4 justify-between items-center ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Found <span className="font-bold text-red-500">{filteredRequests.length}</span> requests
                            {bloodGroupFilter !== 'all' && <span> • Type: <span className="font-bold">{bloodGroupFilter}</span></span>}
                            {districtFilter !== 'all' && <span> • Loc: <span className="font-bold">{districtFilter}</span></span>}
                            {searchTerm && <span> • Search: "<span className="font-bold">{searchTerm}</span>"</span>}
                        </p>
                        {hasActiveFilters && (
                            <button 
                                onClick={clearFilters}
                                className={`btn btn-sm btn-ghost rounded-full gap-2 ${
                                    isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-500 hover:bg-red-50'
                                }`}
                            >
                                <FaTimes /> Clear Filters
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Content */}
                {isLoading ? (
                    renderSkeletons()
                ) : paginatedRequests.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-center py-20 rounded-2xl shadow-sm border max-w-2xl mx-auto ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                        }`}
                    >
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                            isDark ? 'bg-red-500/10' : 'bg-red-50'
                        }`}>
                            <FaTint className="text-4xl text-red-500" />
                        </div>
                        <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>No Requests Found</h3>
                        <p className={`mb-6 max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {hasActiveFilters 
                                ? 'No pending requests match your search criteria. Try adjusting your filters.'
                                : 'There are no pending donation requests at the moment.'}
                        </p>
                        {hasActiveFilters && (
                            <button 
                                onClick={clearFilters}
                                className="btn bg-red-500 hover:bg-red-600 text-white rounded-full px-8"
                            >
                                Clear All Filters
                            </button>
                        )}
                    </motion.div>
                ) : (
                    <>
                        {/* Request Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {paginatedRequests.map((req, idx) => (
                                <motion.div 
                                    key={req._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        delay: idx * 0.05,
                                        duration: 0.5,
                                        ease: "easeOut" 
                                    }}
                                    className={`rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col h-full ${
                                        isDark 
                                            ? 'bg-gray-800 border-gray-700 hover:border-red-500/50' 
                                            : 'bg-white border-gray-100 hover:border-red-200'
                                    }`}
                                >
                                    {/* Urgency Banner */}
                                    <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 flex items-center justify-between flex-shrink-0">
                                        <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                            <FaHeart className="animate-pulse" /> Urgent Need
                                        </span>
                                        <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                                            {req.bloodGroup}
                                        </span>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Recipient Info */}
                                        <div className="mb-4">
                                            <h2 className={`text-xl font-bold group-hover:text-red-500 transition-colors ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                {req.recipientName}
                                            </h2>
                                            <p className={`text-sm flex items-center gap-2 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                <FaHospital className="text-red-400" /> {req.hospitalName}
                                            </p>
                                        </div>
                                        
                                        {/* Location & Time */}
                                        <div className={`space-y-3 mb-6 p-4 rounded-xl ${
                                            isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                                        }`}>
                                            <div className={`flex items-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                <FaMapMarkerAlt className="mr-3 text-red-400 flex-shrink-0" />
                                                <span>{req.recipientUpazila}, {req.recipientDistrict}</span>
                                            </div>
                                            <div className={`flex items-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                <FaCalendarAlt className="mr-3 text-red-400 flex-shrink-0" />
                                                <span>{req.donationDate}</span>
                                            </div>
                                            <div className={`flex items-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                <FaClock className="mr-3 text-red-400 flex-shrink-0" />
                                                <span>{req.donationTime}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Message Preview */}
                                        <p className={`text-sm line-clamp-2 mb-6 italic flex-grow ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            "{req.requestMessage}"
                                        </p>

                                        {/* CTA Button */}
                                        <Link 
                                            to={`/donation-request-details/${req._id}`} 
                                            className="btn w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-none rounded-xl shadow-lg shadow-red-500/20 group-hover:shadow-red-500/40 transition-all mt-auto"
                                        >
                                            <FaHeart className="mr-2" /> Donate Now
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex justify-center items-center mt-12 gap-2"
                            >
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`btn btn-circle ${
                                        currentPage === 1
                                            ? 'btn-disabled'
                                            : isDark
                                                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <FaChevronLeft />
                                </button>
                                
                                <div className="flex gap-2">
                                    {[...Array(totalPages)].map((_, idx) => {
                                        const pageNum = idx + 1;
                                        if (
                                            pageNum === 1 ||
                                            pageNum === totalPages ||
                                            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={`btn min-w-[48px] ${
                                                        currentPage === pageNum
                                                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-none shadow-lg'
                                                            : isDark
                                                                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        } else if (
                                            (pageNum === currentPage - 2 && currentPage > 3) ||
                                            (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                                        ) {
                                            return (
                                                <span key={pageNum} className={`px-3 flex items-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    •••
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`btn btn-circle ${
                                        currentPage === totalPages
                                            ? 'btn-disabled'
                                            : isDark
                                                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <FaChevronRight />
                                </button>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default DonationRequests;
