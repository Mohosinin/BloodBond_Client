/**
 * CREATED BY: [Person 2 Name]
 * MODIFIED BY: [Person 1 Name] - Added Dark/Light Mode Support
 * FEATURE: Blood Compatibility Chart with Theme Support
 */

import React, { useState } from 'react';
import { FaHeart, FaTint, FaInfoCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';

const BloodCompatibility = () => {
    const [selectedBloodType, setSelectedBloodType] = useState(null);
    const { isDark } = useTheme();

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

    // Theme-aware classes
    const containerClass = isDark
        ? 'min-h-screen bg-gray-950 py-16 px-4'
        : 'min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 py-16 px-4';

    const cardClass = isDark
        ? 'bg-gray-800/30 backdrop-blur-sm border-gray-700/50'
        : 'bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg';

    const textPrimary = isDark ? 'text-white' : 'text-gray-900';
    const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';

    return (
        <div className={`${containerClass} transition-colors duration-500`}>
            {/* Header */}
            <div className="max-w-6xl mx-auto text-center mb-12">
                <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 ${
                    isDark 
                        ? 'bg-red-500/10 border border-red-500/20' 
                        : 'bg-red-50 border border-red-200'
                }`}>
                    <FaTint className={isDark ? 'text-red-400' : 'text-red-500'} />
                    <span className={`text-sm font-medium ${isDark ? 'text-red-400' : 'text-red-600'}`}>Blood Type Guide</span>
                </div>
                <h1 className={`text-4xl md:text-5xl font-bold ${textPrimary} mb-4`}>
                    Blood <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500">Compatibility</span> Chart
                </h1>
                <p className={`${textSecondary} text-lg max-w-2xl mx-auto`}>
                    Understanding blood type compatibility is crucial for safe blood transfusions.
                    Select your blood type to see who you can donate to and receive from.
                </p>
            </div>

            {/* Blood Type Selector */}
            <div className="max-w-4xl mx-auto mb-12">
                <h2 className={`text-xl font-semibold ${textPrimary} text-center mb-6`}>
                    <FaHeart className={`inline mr-2 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
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
                                    : isDark
                                        ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm'
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
                        <div className={`${cardClass} rounded-3xl p-6 border`}>
                            <h3 className="text-lg font-semibold text-emerald-500 mb-4 flex items-center gap-2">
                                <FaCheckCircle />
                                {selectedBloodType} Can Donate To
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {compatibilityData[selectedBloodType].canDonateTo.map((type) => (
                                    <span
                                        key={type}
                                        className={`px-4 py-2 rounded-full font-medium border ${
                                            isDark 
                                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                                                : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                        }`}
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Can Receive From */}
                        <div className={`${cardClass} rounded-3xl p-6 border`}>
                            <h3 className="text-lg font-semibold text-blue-500 mb-4 flex items-center gap-2">
                                <FaTint />
                                {selectedBloodType} Can Receive From
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {compatibilityData[selectedBloodType].canReceiveFrom.map((type) => (
                                    <span
                                        key={type}
                                        className={`px-4 py-2 rounded-full font-medium border ${
                                            isDark 
                                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                                                : 'bg-blue-50 text-blue-600 border-blue-200'
                                        }`}
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
                <h2 className={`text-2xl font-bold ${textPrimary} text-center mb-8`}>
                    Complete Compatibility Matrix
                </h2>
                <div className="overflow-x-auto">
                    <table className={`w-full ${cardClass} rounded-2xl overflow-hidden border`}>
                        <thead>
                            <tr className={isDark ? 'bg-gray-900/50' : 'bg-gray-100'}>
                                <th className={`p-4 text-left ${textSecondary} font-medium`}>Donor →<br/>Recipient ↓</th>
                                {bloodTypes.map((type) => (
                                    <th key={type} className={`p-4 text-center ${textPrimary} font-bold`}>{type}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {bloodTypes.map((recipient) => (
                                <tr key={recipient} className={`border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200'}`}>
                                    <td className={`p-4 font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>{recipient}</td>
                                    {bloodTypes.map((donor) => (
                                        <td key={donor} className="p-4 text-center">
                                            {isCompatible(donor, recipient, 'receive') ? (
                                                <FaCheckCircle className="inline text-emerald-500 text-xl" />
                                            ) : (
                                                <FaTimesCircle className={`inline text-xl ${isDark ? 'text-red-400/50' : 'text-red-300'}`} />
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
                <h2 className={`text-2xl font-bold ${textPrimary} text-center mb-8`}>
                    <FaInfoCircle className="inline mr-2 text-yellow-500" />
                    Did You Know?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {bloodFacts.map((fact, index) => (
                        <div
                            key={index}
                            className={`${cardClass} rounded-2xl p-6 border flex items-start gap-4`}
                        >
                            <span className="text-3xl">{fact.icon}</span>
                            <div>
                                <h4 className={`font-bold ${textPrimary} text-lg`}>{fact.type}</h4>
                                <p className={`${textSecondary} text-sm`}>{fact.fact}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-2xl mx-auto mt-16 text-center">
                <h3 className={`text-2xl font-bold ${textPrimary} mb-4`}>Ready to Save Lives?</h3>
                <p className={`${textSecondary} mb-6`}>
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
