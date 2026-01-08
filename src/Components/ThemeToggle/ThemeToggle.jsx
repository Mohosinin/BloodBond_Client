import React from 'react';
import useTheme from '../../hooks/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa';

/**
 * Theme Toggle Button Component
 * Provides a beautiful animated toggle for switching between dark and light modes
 * 
 * Contributed by: [Person 1 Name]
 * Feature: Dark/Light Mode UI Enhancement
 */
const ThemeToggle = () => {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative w-14 h-7 rounded-full p-1
                transition-all duration-500 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
                ${isDark 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 focus:ring-offset-gray-900' 
                    : 'bg-gradient-to-r from-amber-400 to-orange-400 focus:ring-offset-white'
                }
                hover:shadow-lg hover:scale-105
                transform active:scale-95
            `}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {/* Toggle Circle */}
            <div
                className={`
                    absolute top-1 w-5 h-5 rounded-full
                    flex items-center justify-center
                    transition-all duration-500 ease-in-out
                    ${isDark 
                        ? 'translate-x-7 bg-gray-900' 
                        : 'translate-x-0 bg-white'
                    }
                    shadow-md
                `}
            >
                {/* Icon inside circle */}
                {isDark ? (
                    <FaMoon className="text-yellow-300 text-xs animate-pulse" />
                ) : (
                    <FaSun className="text-amber-500 text-xs animate-spin-slow" />
                )}
            </div>

            {/* Background Icons */}
            <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
                <FaSun 
                    className={`text-xs transition-opacity duration-300 ${isDark ? 'opacity-50 text-gray-400' : 'opacity-0'}`} 
                />
                <FaMoon 
                    className={`text-xs transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-50 text-gray-600'}`} 
                />
            </div>
        </button>
    );
};

export default ThemeToggle;
