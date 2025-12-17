import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaFacebook, FaTwitter, FaLinkedin, FaShareAlt } from 'react-icons/fa';

const BlogDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get(`/blogs/${id}`)
            .then(res => {
                setBlog(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id, axiosPublic]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center 
             text-gray-500">
                <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
                <Link to="/blog" className="btn btn-primary">Go Back</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Image */}
            <div className="h-[400px] w-full relative">
                <img 
                    src={blog.thumbnail || "https://placehold.co/1200x600?text=Blood+Donation+Cover"} 
                    alt={blog.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white max-w-5xl mx-auto">
                    <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 gap-2 transition-colors">
                        <FaArrowLeft /> Back to Blogs
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{blog.title}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-200">
                        <span className="flex items-center gap-2">
                             <FaCalendarAlt className="text-red-500" /> 
                             {new Date().toLocaleDateString()} {/* Assuming blog.date exists? Usage of fallback current date for now */}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaUser className="text-red-500" /> Admin
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-300 p-8 md:p-12">
                    {/* Share Buttons */}
                    <div className="flex items-center justify-end gap-4 mb-8 border-b pb-4">
                        <span className="text-gray-500 font-semibold text-sm flex items-center gap-2">
                            <FaShareAlt /> Share:
                        </span>
                        <button className="text-blue-600 hover:scale-110 transition-transform"><FaFacebook size={20} /></button>
                        <button className="text-sky-500 hover:scale-110 transition-transform"><FaTwitter size={20} /></button>
                        <button className="text-blue-700 hover:scale-110 transition-transform"><FaLinkedin size={20} /></button>
                    </div>

                    <div className="prose prose-lg prose-red max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                        {blog.content}
                    </div>
                    
                    {/* HTML content if it's rich text, but seemingly it's plain text from textarea based on creation. 
                        Using whitespace-pre-line to preserve line breaks if it's plain text. 
                        If it was HTML, we'd use dangerouslySetInnerHTML.
                    */}
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
