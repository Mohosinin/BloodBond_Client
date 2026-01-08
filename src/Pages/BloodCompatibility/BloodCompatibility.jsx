/**
 * CREATED BY: [Person 2 Name]
 * FEATURE: Blood Compatibility Chart
 * 
 * A comprehensive page showing blood type compatibility
 * for both donors and recipients
 */

import React, { useState } from 'react';
import { FaHeart, FaTint, FaInfoCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const BloodCompatibility = () => {
    const [selectedBloodType, setSelectedBloodType] = useState(null);

    // Blood compatibility data
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const compatibilityData = {
        'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
        'A-': { canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
        'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
        'B-': { canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
        'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
        'AB-': { canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'] },
        'O+': { canDonateTo: ['A+', 'B+', 'AB+', 'O+'], canReceiveFrom: ['O+', 'O-'] },
        'O-': { canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], canReceiveFrom: ['O-'] },
    };

    const bloodFacts = [
        { type: 'O-', fact: 'Universal Donor - Can donate to all blood types', icon: '🦸' },
        { type: 'AB+', fact: 'Universal Recipient - Can receive from all blood types', icon: '🎯' },
        { type: 'O+', fact: 'Most common blood type (37% of population)', icon: '📊' },
        { type: 'AB-', fact: 'Rarest blood type (less than 1% of population)', icon: '💎' },
    ];

    const isCompatible = (donor, recipient, direction) => {
        if (direction === 'donate') {
            return compatibilityData[donor]?.canDonateTo.includes(recipient);
        }
        return compatibilityData[recipient]?.canReceiveFrom.includes(donor);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
            {/* Header */}
            <div className="max-w-6xl mx-auto text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
                    <FaTint className="text-red-400" />
                    <span className="text-red-400 text-sm font-medium">Blood Type Guide</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Blood <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500">Compatibility</span> Chart
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Understanding blood type compatibility is crucial for safe blood transfusions.
                    Select your blood type to see who you can donate to and receive from.
                </p>
            </div>

            {/* Blood Type Selector */}
            <div className="max-w-4xl mx-auto mb-12">
                <h2 className="text-xl font-semibold text-white text-center mb-6">
                    <FaHeart className="inline mr-2 text-red-400" />
                    Select Your Blood Type
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {bloodTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedBloodType(type)}
                            className={`
                                w-16 h-16 rounded-2xl font-bold text-lg
                                transition-all duration-300 transform hover:scale-110
                                ${selectedBloodType === type
                                    ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30'
                                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                                }
                            `}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Compatibility Results */}
            {selectedBloodType && (
                <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Can Donate To */}
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50">
                            <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                                <FaCheckCircle />
                                {selectedBloodType} Can Donate To
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {compatibilityData[selectedBloodType].canDonateTo.map((type) => (
                                    <span
                                        key={type}
                                        className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full font-medium border border-emerald-500/30"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Can Receive From */}
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50">
                            <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                                <FaTint />
                                {selectedBloodType} Can Receive From
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {compatibilityData[selectedBloodType].canReceiveFrom.map((type) => (
                                    <span
                                        key={type}
                                        className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full font-medium border border-blue-500/30"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Full Compatibility Matrix */}
            <div className="max-w-5xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-white text-center mb-8">
                    Complete Compatibility Matrix
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50">
                        <thead>
                            <tr className="bg-gray-900/50">
                                <th className="p-4 text-left text-gray-400 font-medium">Donor →<br/>Recipient ↓</th>
                                {bloodTypes.map((type) => (
                                    <th key={type} className="p-4 text-center text-white font-bold">{type}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {bloodTypes.map((recipient) => (
                                <tr key={recipient} className="border-t border-gray-700/50">
                                    <td className="p-4 font-bold text-red-400">{recipient}</td>
                                    {bloodTypes.map((donor) => (
                                        <td key={donor} className="p-4 text-center">
                                            {isCompatible(donor, recipient, 'receive') ? (
                                                <FaCheckCircle className="inline text-emerald-400 text-xl" />
                                            ) : (
                                                <FaTimesCircle className="inline text-red-400/50 text-xl" />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Blood Facts */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-white text-center mb-8">
                    <FaInfoCircle className="inline mr-2 text-yellow-400" />
                    Did You Know?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {bloodFacts.map((fact, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 flex items-start gap-4"
                        >
                            <span className="text-3xl">{fact.icon}</span>
                            <div>
                                <h4 className="font-bold text-white text-lg">{fact.type}</h4>
                                <p className="text-gray-400 text-sm">{fact.fact}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-2xl mx-auto mt-16 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Save Lives?</h3>
                <p className="text-gray-400 mb-6">
                    Every donation can save up to 3 lives. Find a donation center near you.
                </p>
                <a
                    href="/donation-requests"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                >
                    <FaTint />
                    View Donation Requests
                </a>
            </div>
        </div>
    );
};

export default BloodCompatibility;
