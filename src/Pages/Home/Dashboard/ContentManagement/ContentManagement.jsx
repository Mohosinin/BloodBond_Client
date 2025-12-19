import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaEdit, FaTrash, FaPlus, FaNewspaper, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContentManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    // Form Stats
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('draft');

    const { data: blogs = [], refetch } = useQuery({
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
            setStatus(blog.status);
        } else {
            setEditingBlog(null);
            setTitle('');
            setThumbnail('');
            setContent('');
            setStatus('draft');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blogData = { title, thumbnail, content, status };

        try {
            if (editingBlog) {
                await axiosSecure.put(`/blogs/${editingBlog._id}`, blogData);
                Swal.fire('Updated!', 'Blog post updated successfully.', 'success');
            } else {
                await axiosSecure.post('/blogs', blogData);
                Swal.fire('Created!', 'New blog post created.', 'success');
            }
            refetch();
            closeModal();
        } catch (err) {
            Swal.fire('Error', 'Failed to save blog post.', 'error');
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/blogs/${id}`);
                    refetch();
                    Swal.fire("Deleted!", "Blog post has been deleted.", "success");
                } catch (err) {
                    Swal.fire("Error!", "Failed to delete.", "error");
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
            Swal.fire('Success', `Blog post ${msg}.`, 'success');
        } catch (err) {
            Swal.fire('Error', 'Failed to update status.', 'error');
        }
    };

    return (
        <div className="p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FaNewspaper className="text-red-600" />
                        Content Management
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">Create and manage blog posts for the community.</p>
                </div>
                <button 
                    onClick={() => openModal()} 
                    className="btn bg-red-600 hover:bg-red-700 text-white gap-2 shadow-lg shadow-red-200 border-none rounded-full px-6 w-full md:w-auto"
                >
                    <FaPlus /> Add Blog
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(blog => (
                    <div key={blog._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src={blog.thumbnail || "https://placehold.co/600x400?text=No+Image"} 
                                alt={blog.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${blog.status === 'published' ? 'bg-green-500/80 text-white' : 'bg-yellow-500/80 text-white'}`}>
                                {blog.status}
                            </div>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{blog.title}</h2>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-3">{blog.content}</p>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <div className="space-x-2">
                                    <button 
                                        onClick={() => openModal(blog)} 
                                        className="btn btn-sm btn-circle btn-ghost text-blue-500 hover:bg-blue-50 tooltip" 
                                        data-tip="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(blog._id)} 
                                        className="btn btn-sm btn-circle btn-ghost text-red-500 hover:bg-red-50 tooltip" 
                                        data-tip="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                                
                                {blog.status === 'draft' ? (
                                    <button 
                                        onClick={() => handlePublishToggle(blog)} 
                                        className="btn btn-sm btn-outline btn-success hover:text-white"
                                    >
                                        Publish
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handlePublishToggle(blog)} 
                                        className="btn btn-sm btn-outline btn-warning hover:text-white"
                                    >
                                        Unpublish
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                
                {blogs.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                            <FaNewspaper className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-700">No blogs yet</h3>
                        <p className="text-gray-500">Create your first blog post to get started!</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-xl font-bold text-gray-800">{editingBlog ? 'Edit Blog' : 'New Blog Post'}</h3>
                            <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-red-500">✕</button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label font-bold text-gray-700">Title</label>
                                    <input 
                                        type="text" 
                                        className="input input-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500" 
                                        value={title} 
                                        onChange={(e) => setTitle(e.target.value)} 
                                        required 
                                        placeholder="Enter engaging title..."
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label font-bold text-gray-700">Thumbnail Image URL</label>
                                    <input 
                                        type="url" 
                                        className="input input-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500" 
                                        value={thumbnail} 
                                        onChange={(e) => setThumbnail(e.target.value)} 
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label font-bold text-gray-700">Content</label>
                                    <textarea 
                                        className="textarea textarea-bordered h-40 w-full focus:ring-1 focus:ring-red-500 focus:border-red-500 text-base" 
                                        value={content} 
                                        onChange={(e) => setContent(e.target.value)} 
                                        required 
                                        placeholder="Write your blog content here..."
                                    ></textarea>
                                </div>
                                <div className="form-control">
                                    <label className="label font-bold text-gray-700">Status</label>
                                    <select 
                                        className="select select-bordered w-full focus:ring-1 focus:ring-red-500 focus:border-red-500"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                                
                                <div className="pt-4 flex justify-end gap-3">
                                    <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
                                    <button type="submit" className="btn bg-red-600 hover:bg-red-700 text-white border-none px-8">
                                        {editingBlog ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentManagement;
