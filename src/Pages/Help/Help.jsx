/**
 * HELP / FAQ PAGE
 * Comprehensive help center with searchable FAQs
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    FaSearch, FaQuestionCircle, FaTint, FaUserPlus, FaHospital,
    FaShieldAlt, FaChevronDown, FaHeadset, FaBook, FaVideo,
    FaEnvelope, FaPhone
} from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';

const Help = () => {
    const { isDark } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [openFaq, setOpenFaq] = useState(null);

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const categories = [
        { id: 'all', name: 'All Topics', icon: <FaQuestionCircle /> },
        { id: 'donation', name: 'Blood Donation', icon: <FaTint /> },
        { id: 'account', name: 'Account & Profile', icon: <FaUserPlus /> },
        { id: 'requests', name: 'Blood Requests', icon: <FaHospital /> },
        { id: 'safety', name: 'Safety & Privacy', icon: <FaShieldAlt /> },
    ];

    const faqs = [
        {
            category: 'donation',
            question: 'Who can donate blood?',
            answer: 'Generally, anyone who is in good health, at least 17 years old (16 with parental consent in some areas), and weighs at least 50 kg can donate blood. You should not have any blood-borne diseases and should not have donated in the last 56 days.'
        },
        {
            category: 'donation',
            question: 'How often can I donate blood?',
            answer: 'You can donate whole blood every 56 days (about 8 weeks). Platelet donors can give more frequently—up to 24 times per year. The donation center will guide you based on your donation type and health condition.'
        },
        {
            category: 'donation',
            question: 'Is blood donation safe?',
            answer: 'Absolutely! Blood donation is a very safe process. All equipment used is sterile, used only once, and disposed of properly. You cannot contract any disease from donating blood. Our trained professionals ensure your safety throughout the process.'
        },
        {
            category: 'donation',
            question: 'How long does a blood donation take?',
            answer: 'The actual blood donation takes about 8-10 minutes. However, the entire process, including registration, mini health check, donation, and refreshments, takes about 45-60 minutes. We recommend setting aside about an hour for your donation appointment.'
        },
        {
            category: 'donation',
            question: 'What should I do before donating blood?',
            answer: 'Before donating: Get a good night\'s sleep, eat a healthy meal within 3 hours of donation, drink plenty of water, avoid alcohol for 24 hours, and bring a valid ID. This helps ensure a smooth donation experience.'
        },
        {
            category: 'account',
            question: 'How do I create an account on BloodBond?',
            answer: 'Click on "Register" or "Donate Now" button on our homepage. Fill in your personal details, blood group, and location information. Verify your email, and you\'re ready to start saving lives!'
        },
        {
            category: 'account',
            question: 'How can I update my profile information?',
            answer: 'Log in to your account and navigate to Dashboard > Profile. Click "Edit Profile" to update your name, blood group, location, and other details. You can also upload a new profile picture from your device.'
        },
        {
            category: 'account',
            question: 'How do I become a volunteer?',
            answer: 'Contact us through our Contact page or email us at volunteer@bloodbond.com expressing your interest. Our team will review your application and get back to you with volunteer opportunities in your area.'
        },
        {
            category: 'requests',
            question: 'How do I request blood?',
            answer: 'Log in to your account, go to Dashboard, and click "Create Donation Request". Fill in the patient details, required blood group, hospital location, and urgency. Your request will be visible to matching donors in your area.'
        },
        {
            category: 'requests',
            question: 'How are donors matched with requests?',
            answer: 'Our system matches donors based on blood type compatibility, geographic proximity, and availability. Donors receive notifications for matching requests and can choose to respond based on their convenience.'
        },
        {
            category: 'requests',
            question: 'What happens after I respond to a blood request?',
            answer: 'Once you respond, the requester will be notified with your contact information. You can then coordinate directly for the donation. After successful donation, update the request status to help us track and improve our services.'
        },
        {
            category: 'safety',
            question: 'Is my personal information safe?',
            answer: 'Yes, we take data privacy very seriously. Your personal information is encrypted and stored securely. We never share your contact details publicly. Only verified recipients can view donor information after a match.'
        },
        {
            category: 'safety',
            question: 'How do you verify blood donation requests?',
            answer: 'We encourage requesters to provide hospital details and patient information. Our volunteer network helps verify urgent requests. Users can also report suspicious activities through our reporting system.'
        },
        {
            category: 'safety',
            question: 'What safety measures are in place for donors?',
            answer: 'We recommend meeting at verified hospitals or blood banks only. Never share financial information. Report any suspicious behavior. Our support team is available 24/7 to address any concerns.'
        },
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const resources = [
        { icon: <FaBook />, title: "User Guide", desc: "Complete guide to using BloodBond", link: "#" },
        { icon: <FaVideo />, title: "Video Tutorials", desc: "Step-by-step video walkthroughs", link: "#" },
        { icon: <FaHeadset />, title: "Live Support", desc: "Chat with our support team", link: "#" },
    ];

    return (
        <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 py-24 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 px-4"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
                    <p className="text-red-100 max-w-2xl mx-auto text-lg mb-8">
                        Find answers to your questions and learn how to use BloodBond effectively.
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text"
                            placeholder="Search for help..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-red-300 shadow-xl"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Quick Resources */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {resources.map((resource, idx) => (
                        <motion.a 
                            key={idx}
                            href={resource.link}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex items-center gap-4 p-6 rounded-2xl shadow-xl border transition-all hover:-translate-y-1 ${
                                isDark ? 'bg-gray-800 border-gray-700 hover:border-red-500/30' : 'bg-white border-gray-100 hover:shadow-2xl'
                            }`}
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                                isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600'
                            }`}>
                                {resource.icon}
                            </div>
                            <div>
                                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{resource.title}</h3>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{resource.desc}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <motion.div {...fadeInUp} className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Categories Sidebar */}
                        <div className="lg:col-span-1">
                            <div className={`sticky top-24 p-6 rounded-2xl border ${
                                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                            }`}>
                                <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Topics</h3>
                                <div className="space-y-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                                                activeCategory === cat.id
                                                    ? 'bg-red-500 text-white'
                                                    : isDark 
                                                        ? 'hover:bg-gray-700 text-gray-300' 
                                                        : 'hover:bg-gray-50 text-gray-600'
                                            }`}
                                        >
                                            <span className="text-lg">{cat.icon}</span>
                                            <span className="font-medium">{cat.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* FAQ List */}
                        <div className="lg:col-span-3">
                            <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Frequently Asked Questions
                                {searchTerm && <span className="text-red-500 text-lg font-normal ml-2">matching "{searchTerm}"</span>}
                            </h2>
                            
                            {filteredFaqs.length === 0 ? (
                                <div className={`text-center py-16 rounded-2xl ${
                                    isDark ? 'bg-gray-800' : 'bg-white'
                                }`}>
                                    <FaQuestionCircle className={`text-5xl mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                                    <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No Results Found</h3>
                                    <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Try adjusting your search or browse all categories.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredFaqs.map((faq, idx) => (
                                        <motion.div 
                                            key={idx}
                                            initial={false}
                                            className={`rounded-2xl border overflow-hidden ${
                                                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                                            }`}
                                        >
                                            <button
                                                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                                className={`w-full px-6 py-5 flex justify-between items-center text-left font-medium ${
                                                    isDark ? 'text-white hover:bg-gray-700/50' : 'text-gray-900 hover:bg-gray-50'
                                                }`}
                                            >
                                                <span className="pr-4">{faq.question}</span>
                                                <FaChevronDown className={`text-red-500 transition-transform flex-shrink-0 ${
                                                    openFaq === idx ? 'rotate-180' : ''
                                                }`} />
                                            </button>
                                            <motion.div
                                                initial={false}
                                                animate={{ 
                                                    height: openFaq === idx ? 'auto' : 0,
                                                    opacity: openFaq === idx ? 1 : 0
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <p className={`px-6 pb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Still Need Help */}
            <motion.div {...fadeInUp} className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Still Need Help?
                    </h2>
                    <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Our support team is here for you. Reach out to us anytime.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact" className="btn btn-lg bg-red-600 hover:bg-red-700 text-white border-none rounded-full px-8">
                            <FaEnvelope className="mr-2" /> Contact Support
                        </Link>
                        <a href="tel:+8801234567890" className={`btn btn-lg btn-outline rounded-full px-8 ${
                            isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''
                        }`}>
                            <FaPhone className="mr-2" /> Call Us
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Help;
