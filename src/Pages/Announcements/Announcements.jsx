/**
 * CREATED BY: [Person 2 Name]
 * FEATURE: Announcements Management Page
 * 
 * Admin page for creating and managing announcements
 * that appear on the website for all users
 */

import React, { useState } from 'react';
import { 
    FaBullhorn, 
    FaPlus, 
    FaEdit, 
    FaTrash, 
    FaCheck, 
    FaTimes,
    FaEye,
    FaEyeSlash,
    FaCalendarAlt,
    FaClock
} from 'react-icons/fa';

const Announcements = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        type: 'info',
        isActive: true
    });

    // Sample announcements data
    const [announcements, setAnnouncements] = useState([
        {
            id: 1,
            title: 'Urgent: O- Blood Shortage',
            message: 'We are experiencing a critical shortage of O- blood type. If you are O- donor, please consider donating today!',
            type: 'urgent',
            isActive: true,
            createdAt: '2026-01-05',
            views: 1234
        },
        {
            id: 2,
            title: 'New Blood Donation Camp',
            message: 'Join us at the Dhaka Medical College on January 10th for our monthly blood donation camp. Free health checkup for all donors!',
            type: 'event',
            isActive: true,
            createdAt: '2026-01-04',
            views: 856
        },
        {
            id: 3,
            title: 'System Maintenance Notice',
            message: 'The BloodBond platform will undergo scheduled maintenance on January 8th from 2 AM to 4 AM. Services may be temporarily unavailable.',
            type: 'info',
            isActive: false,
            createdAt: '2026-01-03',
            views: 432
        }
    ]);

    const typeStyles = {
        urgent: 'bg-red-100 text-red-700 border-red-200',
        event: 'bg-blue-100 text-blue-700 border-blue-200',
        info: 'bg-gray-100 text-gray-700 border-gray-200',
        success: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingId) {
            setAnnouncements(prev => 
                prev.map(a => a.id === editingId ? { ...a, ...formData } : a)
            );
        } else {
            const newAnnouncement = {
                id: Date.now(),
                ...formData,
                createdAt: new Date().toISOString().split('T')[0],
                views: 0
            };
            setAnnouncements(prev => [newAnnouncement, ...prev]);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({ title: '', message: '', type: 'info', isActive: true });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (announcement) => {
        setFormData({
            title: announcement.title,
            message: announcement.message,
            type: announcement.type,
            isActive: announcement.isActive
        });
        setEditingId(announcement.id);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this announcement?')) {
            setAnnouncements(prev => prev.filter(a => a.id !== id));
        }
    };

    const toggleActive = (id) => {
        setAnnouncements(prev => 
            prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a)
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FaBullhorn className="text-red-500" />
                        Announcements
                    </h1>
                    <p className="text-gray-500 mt-1">Create and manage platform announcements</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                    <FaPlus />
                    New Announcement
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">
                                {editingId ? 'Edit Announcement' : 'Create Announcement'}
                            </h3>
                            <button 
                                onClick={resetForm}
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                                    placeholder="Announcement title..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all resize-none"
                                    rows={4}
                                    placeholder="Announcement message..."
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                                    >
                                        <option value="info">Information</option>
                                        <option value="event">Event</option>
                                        <option value="urgent">Urgent</option>
                                        <option value="success">Success</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <div className="flex items-center gap-3 h-12">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                            className={`relative w-14 h-7 rounded-full transition-colors ${formData.isActive ? 'bg-emerald-500' : 'bg-gray-300'}`}
                                        >
                                            <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${formData.isActive ? 'right-1' : 'left-1'}`}></span>
                                        </button>
                                        <span className="text-sm text-gray-600">{formData.isActive ? 'Active' : 'Inactive'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium hover:from-red-600 hover:to-rose-700 transition-all"
                                >
                                    {editingId ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Announcements List */}
            <div className="space-y-4">
                {announcements.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
                        <FaBullhorn className="text-5xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-600 mb-2">No Announcements Yet</h3>
                        <p className="text-gray-400">Create your first announcement to reach your users!</p>
                    </div>
                ) : (
                    announcements.map((announcement) => (
                        <div 
                            key={announcement.id}
                            className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all hover:shadow-xl ${!announcement.isActive && 'opacity-60'}`}
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                {/* Type Badge & Status */}
                                <div className="flex items-center gap-3 md:flex-col md:items-start">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${typeStyles[announcement.type]}`}>
                                        {announcement.type}
                                    </span>
                                    <span className={`flex items-center gap-1 text-xs font-medium ${announcement.isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                                        {announcement.isActive ? <FaEye /> : <FaEyeSlash />}
                                        {announcement.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-800">{announcement.title}</h3>
                                    <p className="text-gray-600 mt-2">{announcement.message}</p>
                                    
                                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <FaCalendarAlt />
                                            {announcement.createdAt}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FaEye />
                                            {announcement.views} views
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleActive(announcement.id)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${announcement.isActive ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                                        title={announcement.isActive ? 'Deactivate' : 'Activate'}
                                    >
                                        {announcement.isActive ? <FaCheck /> : <FaClock />}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(announcement)}
                                        className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(announcement.id)}
                                        className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Announcements;
