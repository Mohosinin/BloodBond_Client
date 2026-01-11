import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

/**
 * Custom hook to access theme context
 * Provides theme state and toggle functionality
 * 
 * @returns {Object} Theme context value
 * @property {string} theme - Current theme ('dark' | 'light')
 * @property {function} toggleTheme - Function to toggle between themes
 * @property {function} setTheme - Function to set specific theme
 * @property {boolean} isDark - True if current theme is dark
 * @property {boolean} isLight - True if current theme is light
 * 
 * @example
 * const { theme, toggleTheme, isDark } = useTheme();
 */
const useTheme = () => {
    const context = useContext(ThemeContext);
    
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    
    return context;
};

export default useTheme;
