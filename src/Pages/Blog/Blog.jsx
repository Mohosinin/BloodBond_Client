import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';

const Blog = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['published-blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs/published');
            return res.data;
        }
    });

    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <div className="bg-red-600 py-16 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
                    <p className="text-red-100 max-w-xl mx-auto text-lg">
                        Stories, updates, and health tips from the blood donation community.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Search */}
                <div className="max-w-xl mx-auto mb-12 relative">
                    <input 
                        type="text" 
                        placeholder="Search articles..." 
                        className="input input-lg bg-gray-200 w-full pl-12 shadow-xl border-none rounded-full focus:ring-2 focus:ring-red-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-5 top-6 text-gray-400 text-lg" />
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <span className="loading loading-spinner loading-lg text-red-600"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlogs.map(blog => (
                            <div key={blog._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-300 group flex flex-col h-full">
                                <div className="h-56 overflow-hidden relative">
                                    <img 
                                        src={blog.thumbnail || "https://placehold.co/600x400?text=Blood+Donation"} 
                                        alt={blog.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                        <span className="text-white text-xs font-bold bg-red-600 px-2 py-1 rounded-md">
                                            News
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center text-gray-400 text-xs mb-3 gap-2">
                                        <FaCalendarAlt />
                                        <span>{new Date().toLocaleDateString()}</span> {/* Ideally backend provides date */}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-3 leading-snug group-hover:text-red-600 transition-colors">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
                                        {blog.content}
                                    </p>
                                    <Link to={`/blog/${blog._id}`} className="btn btn-outline btn-sm border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 self-start">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && filteredBlogs.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No articles found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
