/**
 * ENHANCED BLOG PAGE
 * Features: 4 cards per row, skeleton loaders, category filtering, pagination
 */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaSearch, FaFilter, FaChevronLeft, FaChevronRight, FaNewspaper, FaUser } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';
import SkeletonCard from '../../Components/SkeletonCard/SkeletonCard';

const Blog = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const { isDark } = useTheme();
    const itemsPerPage = 8;

    const categories = ['all', 'Health Tips', 'Success Stories', 'News', 'Events', 'Education'];

    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['published-blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs/published');
            return res.data;
        }
    });

    // Filter and search
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Pagination
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const paginatedBlogs = filteredBlogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    const handleFilterChange = (category) => {
        setCategoryFilter(category);
        setCurrentPage(1);
    };

    // Render skeleton loaders
    const renderSkeletons = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
                <SkeletonCard key={idx} type="blog" />
            ))}
        </div>
    );

    return (
        <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* Header */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 py-20 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 px-4"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
                    <p className="text-red-100 max-w-xl mx-auto text-lg">
                        Stories, updates, and health tips from the blood donation community.
                    </p>
                </motion.div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Search & Filters */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`rounded-2xl shadow-sm border p-6 mb-8 ${
                        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                    }`}
                >
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md w-full">
                            <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input 
                                type="text" 
                                placeholder="Search articles..." 
                                className={`input w-full pl-12 focus:border-red-500 focus:ring-1 focus:ring-red-500 ${
                                    isDark 
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                        : 'bg-gray-50 border-gray-200'
                                }`}
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <FaFilter className={isDark ? 'text-red-400' : 'text-red-500'} />
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleFilterChange(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                            categoryFilter === cat
                                                ? 'bg-red-500 text-white shadow-md'
                                                : isDark
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {cat === 'all' ? 'All' : cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Results count */}
                    <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Showing {paginatedBlogs.length} of {filteredBlogs.length} articles
                            {categoryFilter !== 'all' && ` in "${categoryFilter}"`}
                            {searchTerm && ` matching "${searchTerm}"`}
                        </p>
                    </div>
                </motion.div>

                {/* Blog Grid */}
                {isLoading ? (
                    renderSkeletons()
                ) : paginatedBlogs.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-center py-20 rounded-2xl border ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                        }`}
                    >
                        <FaNewspaper className={`text-6xl mx-auto mb-6 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                        <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            No Articles Found
                        </h3>
                        <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {searchTerm || categoryFilter !== 'all' 
                                ? 'Try adjusting your search or filter criteria.' 
                                : 'No blog posts have been published yet.'}
                        </p>
                        {(searchTerm || categoryFilter !== 'all') && (
                            <button 
                                onClick={() => {
                                    setSearchTerm('');
                                    setCategoryFilter('all');
                                }}
                                className="btn btn-outline btn-error rounded-full mt-6"
                            >
                                Clear Filters
                            </button>
                        )}
                    </motion.div>
                ) : (
                    <>
                        {/* 4 Cards Per Row Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {paginatedBlogs.map((blog, idx) => (
                                <motion.div 
                                    key={blog._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border group flex flex-col h-full hover:-translate-y-2 ${
                                        isDark 
                                            ? 'bg-gray-800 border-gray-700 hover:border-red-500/30' 
                                            : 'bg-white border-gray-100 hover:border-red-200'
                                    }`}
                                >
                                    {/* Image */}
                                    <div className="h-44 overflow-hidden relative">
                                        <img 
                                            src={blog.thumbnail || "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600"} 
                                            alt={blog.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="text-white text-xs font-bold bg-red-600 px-3 py-1 rounded-full shadow-md">
                                                {blog.category || 'News'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        {/* Meta */}
                                        <div className={`flex items-center gap-3 text-xs mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                            <span className="flex items-center gap-1">
                                                <FaCalendarAlt />
                                                {new Date(blog.createdAt || Date.now()).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaUser />
                                                {blog.author || 'Admin'}
                                            </span>
                                        </div>
                                        
                                        {/* Title */}
                                        <h2 className={`text-lg font-bold mb-2 leading-snug group-hover:text-red-500 transition-colors line-clamp-2 ${
                                            isDark ? 'text-white' : 'text-gray-800'
                                        }`}>
                                            {blog.title}
                                        </h2>
                                        
                                        {/* Description */}
                                        <p className={`text-sm line-clamp-2 mb-4 flex-grow ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {blog.content}
                                        </p>
                                        
                                        {/* CTA */}
                                        <Link 
                                            to={`/blog/${blog._id}`} 
                                            className={`btn btn-sm w-full rounded-full transition-all ${
                                                isDark 
                                                    ? 'bg-transparent border border-red-500/50 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600' 
                                                    : 'bg-transparent border border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600'
                                            }`}
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`btn btn-sm btn-circle ${
                                        currentPage === 1
                                            ? 'btn-disabled'
                                            : isDark
                                                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <FaChevronLeft />
                                </button>
                                
                                <div className="flex gap-1">
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
                                                    className={`btn btn-sm min-w-[40px] ${
                                                        currentPage === pageNum
                                                            ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                                                            : isDark
                                                                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
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
                                                <span key={pageNum} className={`px-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    ...
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`btn btn-sm btn-circle ${
                                        currentPage === totalPages
                                            ? 'btn-disabled'
                                            : isDark
                                                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Blog;
