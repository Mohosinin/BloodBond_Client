/**
 * Skeleton Card Component for Loading States
 * Provides consistent loading UI across the application
 */

import React from 'react';
import useTheme from '../../hooks/useTheme';

const SkeletonCard = ({ type = 'default' }) => {
    const { isDark } = useTheme();
    
    const baseClass = isDark ? 'bg-gray-700' : 'bg-gray-200';
    const shimmerClass = 'animate-pulse';

    if (type === 'donor') {
        return (
            <div className={`p-6 rounded-2xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="flex flex-col items-center">
                    <div className={`w-24 h-24 rounded-full ${baseClass} ${shimmerClass} mb-4`}></div>
                    <div className={`h-5 w-32 ${baseClass} ${shimmerClass} rounded mb-2`}></div>
                    <div className={`h-4 w-24 ${baseClass} ${shimmerClass} rounded mb-4`}></div>
                    <div className={`h-8 w-28 ${baseClass} ${shimmerClass} rounded-full mb-4`}></div>
                    <div className={`h-10 w-full ${baseClass} ${shimmerClass} rounded-full`}></div>
                </div>
            </div>
        );
    }

    if (type === 'blog') {
        return (
            <div className={`rounded-2xl overflow-hidden shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className={`h-56 ${baseClass} ${shimmerClass}`}></div>
                <div className="p-6">
                    <div className={`h-4 w-24 ${baseClass} ${shimmerClass} rounded mb-3`}></div>
                    <div className={`h-6 w-full ${baseClass} ${shimmerClass} rounded mb-2`}></div>
                    <div className={`h-6 w-3/4 ${baseClass} ${shimmerClass} rounded mb-4`}></div>
                    <div className={`h-4 w-full ${baseClass} ${shimmerClass} rounded mb-2`}></div>
                    <div className={`h-4 w-full ${baseClass} ${shimmerClass} rounded mb-2`}></div>
                    <div className={`h-4 w-2/3 ${baseClass} ${shimmerClass} rounded mb-4`}></div>
                    <div className={`h-8 w-24 ${baseClass} ${shimmerClass} rounded`}></div>
                </div>
            </div>
        );
    }

    if (type === 'request') {
        return (
            <div className={`rounded-2xl shadow-sm border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className={`h-6 w-32 ${baseClass} ${shimmerClass} rounded mb-2`}></div>
                        <div className={`h-4 w-24 ${baseClass} ${shimmerClass} rounded`}></div>
                    </div>
                    <div className={`h-8 w-12 ${baseClass} ${shimmerClass} rounded-full`}></div>
                </div>
                <div className="space-y-3 mb-6">
                    <div className={`h-4 w-48 ${baseClass} ${shimmerClass} rounded`}></div>
                    <div className={`h-4 w-40 ${baseClass} ${shimmerClass} rounded`}></div>
                </div>
                <div className={`h-16 w-full ${baseClass} ${shimmerClass} rounded-lg mb-6`}></div>
                <div className={`h-12 w-full ${baseClass} ${shimmerClass} rounded-xl`}></div>
            </div>
        );
    }

    // Default skeleton
    return (
        <div className={`p-6 rounded-2xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className={`h-40 ${baseClass} ${shimmerClass} rounded-lg mb-4`}></div>
            <div className={`h-6 w-3/4 ${baseClass} ${shimmerClass} rounded mb-2`}></div>
            <div className={`h-4 w-full ${baseClass} ${shimmerClass} rounded mb-2`}></div>
            <div className={`h-4 w-2/3 ${baseClass} ${shimmerClass} rounded`}></div>
        </div>
    );
};

export default SkeletonCard;
