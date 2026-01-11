/**
 * ENHANCED CONTENT MANAGEMENT PAGE
 * Features: Dark mode support, improved UI, animations
 */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useTheme from '../../../../hooks/useTheme';
import { FaEdit, FaTrash, FaPlus, FaNewspaper, FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContentManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { isDark } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    // Form States
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Health Tips');
    const [status, setStatus] = useState('draft');

    const categories = ['Health Tips', 'Success Stories', 'News', 'Events', 'Education'];

    const { data: blogs = [], refetch, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            return res.data;
        }
    });

    const openModal = (blog = null) => {
        if (blog) {
            setEditingBlog(blog);
            setTitle(blog.title);
            setThumbnail(blog.thumbnail);
            setContent(blog.content);
            setCategory(blog.category || 'Health Tips');
            setStatus(blog.status);
        } else {
            setEditingBlog(null);
            setTitle('');
            setThumbnail('');
            setContent('');
            setCategory('Health Tips');
            setStatus('draft');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blogData = { title, thumbnail, content, category, status };

        try {
            if (editingBlog) {
                await axiosSecure.put(`/blogs/${editingBlog._id}`, blogData);
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Blog post updated successfully.',
                    background: isDark ? '#1a1a24' : '#fff',
                    color: isDark ? '#f8fafc' : '#1F2937'
                });
            } else {
                await axiosSecure.post('/blogs', blogData);
                Swal.fire({
                    icon: 'success',
                    title: 'Created!',
                    text: 'New blog post created.',
                    background: isDark ? '#1a1a24' : '#fff',
                    color: isDark ? '#f8fafc' : '#1F2937'
                });
            }
            refetch();
            closeModal();
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to save blog post.',
                background: isDark ? '#1a1a24' : '#fff',
                color: isDark ? '#f8fafc' : '#1F2937'
            });
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!",
            background: isDark ? '#1a1a24' : '#fff',
            color: isDark ? '#f8fafc' : '#1F2937'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/blogs/${id}`);
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: "Deleted!",
                        text: "Blog post has been deleted.",
                        background: isDark ? '#1a1a24' : '#fff',
                        color: isDark ? '#f8fafc' : '#1F2937'
                    });
                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: "Error!",
                        text: "Failed to delete.",
                        background: isDark ? '#1a1a24' : '#fff',
                        color: isDark ? '#f8fafc' : '#1F2937'
                    });
                }
            }
        });
    };

    const handlePublishToggle = async (blog) => {
        const newStatus = blog.status === 'draft' ? 'published' : 'draft';
        try {
            await axiosSecure.patch(`/blogs/${blog._id}/status`, { status: newStatus });
            refetch();
            const msg = newStatus === 'published' ? 'published' : 'unpublished';
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Blog post ${msg}.`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                background: isDark ? '#1a1a24' : '#fff',
                color: isDark ? '#f8fafc' : '#1F2937'
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update status.',
                background: isDark ? '#1a1a24' : '#fff',
                color: isDark ? '#f8fafc' : '#1F2937'
            });
        }
    };

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-4 md:p-6`}>
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
            >
                <div>
                    <h1 className={`text-2xl md:text-3xl font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        <FaNewspaper className="text-red-500" />
                        Content Management
                    </h1>
                    <p className={`mt-1 text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Create and manage blog posts. Total: {blogs.length} posts
                    </p>
                </div>
                <button 
                    onClick={() => openModal()} 
                    className="btn bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white gap-2 border-none rounded-full px-6 w-full md:w-auto shadow-lg"
                >
                    <FaPlus /> Add Blog
                </button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Posts', count: blogs.length, color: 'gray' },
                    { label: 'Published', count: blogs.filter(b => b.status === 'published').length, color: 'green' },
                    { label: 'Drafts', count: blogs.filter(b => b.status === 'draft').length, color: 'yellow' },
                    { label: 'Categories', count: [...new Set(blogs.map(b => b.category))].length || categories.length, color: 'blue' }
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-4 rounded-xl border ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'
                        }`}
                    >
                        <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.count}</p>
                    </motion.div>
                ))}
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <span className="loading loading-spinner loading-lg text-red-500"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog, idx) => (
                        <motion.div 
                            key={blog._id} 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                            }`}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={blog.thumbnail || "https://placehold.co/600x400?text=No+Image"} 
                                    alt={blog.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                                    isDark ? 'bg-gray-900/80 text-gray-300' : 'bg-white/80 text-gray-700'
                                }`}>
                                    {blog.category || 'Uncategorized'}
                                </div>
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                                    blog.status === 'published' 
                                        ? 'bg-green-500/80 text-white' 
                                        : 'bg-yellow-500/80 text-white'
                                }`}>
                                    {blog.status}
                                </div>
                            </div>
                            <div className="p-6">
                                <h2 className={`text-xl font-bold mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    {blog.title}
                                </h2>
                                <p className={`text-sm mb-4 line-clamp-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {blog.content}
                                </p>
                                
                                <div className={`flex justify-between items-center pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => openModal(blog)} 
                                            className={`btn btn-sm btn-circle btn-ghost tooltip ${
                                                isDark ? 'text-blue-400 hover:bg-blue-500/20' : 'text-blue-500 hover:bg-blue-50'
                                            }`}
                                            data-tip="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(blog._id)} 
                                            className={`btn btn-sm btn-circle btn-ghost tooltip ${
                                                isDark ? 'text-red-400 hover:bg-red-500/20' : 'text-red-500 hover:bg-red-50'
                                            }`}
                                            data-tip="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                    
                                    {blog.status === 'draft' ? (
                                        <button 
                                            onClick={() => handlePublishToggle(blog)} 
                                            className={`btn btn-sm gap-1 ${
                                                isDark 
                                                    ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30' 
                                                    : 'btn-outline btn-success'
                                            }`}
                                        >
                                            <FaCheck /> Publish
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handlePublishToggle(blog)} 
                                            className={`btn btn-sm gap-1 ${
                                                isDark 
                                                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30' 
                                                    : 'btn-outline btn-warning'
                                            }`}
                                        >
                                            <FaTimes /> Unpublish
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    
                    {blogs.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <div className={`inline-block p-6 rounded-full mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <FaNewspaper className={`text-4xl ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                            </div>
                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-700'}`}>No blogs yet</h3>
                            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Create your first blog post to get started!</p>
                            <button 
                                onClick={() => openModal()}
                                className="btn btn-outline btn-error rounded-full mt-4"
                            >
                                Create First Post
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] ${
                            isDark ? 'bg-gray-800' : 'bg-white'
                        }`}
                    >
                        <div className={`p-6 border-b flex justify-between items-center ${
                            isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'
                        }`}>
                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                {editingBlog ? 'Edit Blog' : 'New Blog Post'}
                            </h3>
                            <button 
                                onClick={closeModal} 
                                className={`btn btn-sm btn-circle btn-ghost ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className={`label font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
                                    <input 
                                        type="text" 
                                        className={`input input-bordered w-full ${
                                            isDark ? 'bg-gray-700 border-gray-600 text-white' : ''
                                        }`}
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        required 
                                        placeholder="Enter engaging title..."
                                    />
                                </div>
                                <div className="form-control">
                                    <label className={`label font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Thumbnail Image URL</label>
                                    <input 
                                        type="url" 
                                        className={`input input-bordered w-full ${
                                            isDark ? 'bg-gray-700 border-gray-600 text-white' : ''
                                        }`}
                                        value={thumbnail} 
                                        onChange={(e) => setThumbnail(e.target.value)} 
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="form-control">
                                    <label className={`label font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
                                    <select 
                                        className={`select select-bordered w-full ${
                                            isDark ? 'bg-gray-700 border-gray-600 text-white' : ''
                                        }`}
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className={`label font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Content</label>
                                    <textarea 
                                        className={`textarea textarea-bordered h-40 w-full text-base ${
                                            isDark ? 'bg-gray-700 border-gray-600 text-white' : ''
                                        }`}
                                        value={content} 
                                        onChange={(e) => setContent(e.target.value)} 
                                        required 
                                        placeholder="Write your blog content here..."
                                    ></textarea>
                                </div>
                                <div className="form-control">
                                    <label className={`label font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                                    <select 
                                        className={`select select-bordered w-full ${
                                            isDark ? 'bg-gray-700 border-gray-600 text-white' : ''
                                        }`}
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                                
                                <div className={`pt-4 flex justify-end gap-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                                    <button 
                                        type="button" 
                                        onClick={closeModal} 
                                        className={`btn ${isDark ? 'btn-ghost text-gray-400' : 'btn-ghost'}`}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white border-none px-8"
                                    >
                                        {editingBlog ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ContentManagement;
