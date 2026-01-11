
import React from 'react';
import useTheme from '../../hooks/useTheme';

const Loader = () => {
    const { isDark } = useTheme();

    return (
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center transition-colors duration-500 ${
            isDark ? 'bg-gray-950' : 'bg-white'
        }`}>
            <div className="relative flex flex-col items-center">
                {/* Pulping Heart Blob */}
                <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
                    <div className="absolute inset-0 bg-red-500 rounded-full opacity-40 animate-pulse"></div>
                    <div className="relative flex items-center justify-center w-full h-full">
                        <svg 
                            className="w-16 h-16 text-red-600 animate-bounce drop-shadow-2xl" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </div>
                </div>

                {/* Text Animation */}
                <div className="flex flex-col items-center gap-2">
                    <h2 className={`text-3xl font-black tracking-tight ${
                        isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                        Blood<span className="text-red-500">Bond</span>
                    </h2>
                    <p className={`text-sm font-medium tracking-widest uppercase animate-pulse ${
                        isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                        Loading Experience...
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-48 h-1.5 bg-gray-200 rounded-full mt-6 overflow-hidden dark:bg-gray-800">
                    <div className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full animate-progress origin-left"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
