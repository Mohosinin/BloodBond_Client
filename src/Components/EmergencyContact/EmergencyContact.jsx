import React, { useState } from 'react';
import { FaPhoneAlt, FaTimes } from 'react-icons/fa';

const EmergencyContact = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Expanded Content */}
            {isOpen && (
                <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-red-100 dark:border-red-900 w-72 animate-fade-in-up">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-red-600 dark:text-red-500">Emergency Contacts</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <FaTimes />
                        </button>
                    </div>
                    <div className="space-y-3">
                        <a href="tel:112" className="flex items-center gap-3 p-2 bg-red-50 dark:bg-gray-700 rounded-lg hover:bg-red-100 dark:hover:bg-gray-600 transition-colors">
                            <div className="bg-red-500 text-white p-2 rounded-full">
                                <FaPhoneAlt size={12} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Ambulance Service</p>
                                <p className="font-bold text-gray-800 dark:text-gray-200">112</p>
                            </div>
                        </a>
                        <a href="tel:999" className="flex items-center gap-3 p-2 bg-red-50 dark:bg-gray-700 rounded-lg hover:bg-red-100 dark:hover:bg-gray-600 transition-colors">
                            <div className="bg-red-500 text-white p-2 rounded-full">
                                <FaPhoneAlt size={12} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Emergency Hotline</p>
                                <p className="font-bold text-gray-800 dark:text-gray-200">999</p>
                            </div>
                        </a>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`btn btn-circle btn-lg border-none shadow-lg transition-transform hover:scale-110 ${isOpen ? 'bg-gray-500 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700 animate-pulse'}`}
            >
                {isOpen ? (
                    <FaTimes className="text-xl text-white" />
                ) : (
                    <FaPhoneAlt className="text-xl text-white" />
                )}
            </button>
        </div>
    );
};

export default EmergencyContact;
