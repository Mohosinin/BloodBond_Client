/**
 * CREATED BY: [Person 2 Name]
 * FEATURE: Emergency Contact Widget
 * 
 * A quick-access emergency contact component showing
 * important numbers for blood-related emergencies
 */

import React, { useState } from 'react';
import { FaPhone, FaAmbulance, FaHospital, FaTimes, FaExclamationTriangle, FaTint } from 'react-icons/fa';

const EmergencyContact = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const emergencyContacts = [
        { name: 'Emergency Ambulance', number: '999', icon: FaAmbulance, color: 'text-red-400' },
        { name: 'Blood Bank Helpline', number: '16789', icon: FaTint, color: 'text-rose-400' },
        { name: 'Nearest Hospital', number: '10600', icon: FaHospital, color: 'text-blue-400' },
    ];

    return (
        <>
            {/* Floating Emergency Button */}
            <button
                onClick={() => setIsExpanded(true)}
                className={`
                    fixed bottom-6 right-6 z-50
                    w-14 h-14 rounded-full
                    bg-gradient-to-r from-red-600 to-rose-600
                    text-white shadow-lg shadow-red-500/30
                    flex items-center justify-center
                    transition-all duration-300
                    hover:scale-110 hover:shadow-xl hover:shadow-red-500/40
                    animate-pulse-slow
                    ${isExpanded ? 'hidden' : 'flex'}
                `}
                aria-label="Emergency Contacts"
                title="Emergency Contacts"
            >
                <FaPhone className="text-xl" />
            </button>

            {/* Emergency Modal */}
            {isExpanded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-gray-900 rounded-3xl p-6 max-w-md w-full border border-red-500/20 shadow-2xl shadow-red-500/10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <FaExclamationTriangle className="text-red-400 text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Emergency Contacts</h3>
                                    <p className="text-gray-400 text-sm">Quick access to help</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Contact List */}
                        <div className="space-y-3">
                            {emergencyContacts.map((contact, index) => (
                                <a
                                    key={index}
                                    href={`tel:${contact.number}`}
                                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:border-red-500/30 hover:bg-gray-800 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center ${contact.color} group-hover:scale-110 transition-transform`}>
                                            <contact.icon />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{contact.name}</p>
                                            <p className="text-sm text-gray-400">{contact.number}</p>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                                        <FaPhone />
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Footer Note */}
                        <p className="mt-6 text-center text-gray-500 text-sm">
                            In case of emergency, don't hesitate to call immediately.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmergencyContact;
