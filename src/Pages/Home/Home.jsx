/**
 * ENHANCED HOME PAGE
 * Features: 10+ sections, animations, theme support, modern design
 * Sections: Hero, Stats, Why Donate, How It Works, Blood Types, Impact Stats,
 *           Testimonials, Recent Requests, Newsletter, FAQ, CTA, Partners
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import heroBg from '../../assets/hero_bg.png';
import { 
    FaEnvelope, FaFacebook, FaHeart, FaInstagram, FaMap, FaPhone, 
    FaTwitter, FaUsers, FaUserShield, FaHandHoldingHeart, FaAmbulance,
    FaCheckCircle, FaQuoteLeft, FaTint, FaHospital, FaCalendarCheck,
    FaShieldAlt, FaClock, FaMedkit, FaChevronDown, FaArrowRight,
    FaMapMarkerAlt
} from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';
import AnimatedCounter from '../../Components/AnimatedCounter/AnimatedCounter';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Home = () => {
    const { isDark } = useTheme();
    const axiosPublic = useAxiosPublic();
    const [recentRequests, setRecentRequests] = useState([]);
    const [openFaq, setOpenFaq] = useState(0);

    useEffect(() => {
        axiosPublic.get('/donation-requests')
            .then(res => setRecentRequests(res.data.slice(0, 3)))
            .catch(err => console.error(err));
    }, [axiosPublic]);

    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const staggerContainer = {
        initial: {},
        whileInView: { transition: { staggerChildren: 0.1 } }
    };

    const bloodTypes = [
        { type: 'A+', canGive: 'A+, AB+', canReceive: 'A+, A-, O+, O-', percent: '30%' },
        { type: 'O+', canGive: 'O+, A+, B+, AB+', canReceive: 'O+, O-', percent: '35%' },
        { type: 'B+', canGive: 'B+, AB+', canReceive: 'B+, B-, O+, O-', percent: '20%' },
        { type: 'AB+', canGive: 'AB+', canReceive: 'All Types', percent: '5%' },
    ];

    const testimonials = [
        { name: "Rahman Ahmed", location: "Dhaka", quote: "BloodBond connected me with a donor in just 2 hours when my mother needed urgent surgery. Forever grateful!", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Fatima Khan", location: "Chittagong", quote: "I've been a regular donor for 2 years now. The app makes scheduling donations so easy and rewarding.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Karim Hossain", location: "Sylhet", quote: "The volunteer team at BloodBond helped organize a blood drive at our office. Amazing experience!", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
    ];

    const faqs = [
        { q: "Who can donate blood?", a: "Generally, anyone who is in good health, at least 17 years old, and weighs at least 50 kg can donate blood. There are some medical conditions that may temporarily or permanently prevent donation." },
        { q: "How often can I donate blood?", a: "You can donate whole blood every 56 days (about 8 weeks). Platelet donors can give more frequently—up to 24 times per year. The donation center will guide you based on your donation type." },
        { q: "Is blood donation safe?", a: "Absolutely! Blood donation is a very safe process. All equipment is sterile, used only once, and disposed of properly. You cannot contract any disease from donating blood." },
        { q: "How long does a donation take?", a: "The actual blood donation takes about 8-10 minutes. However, the entire process, including registration, mini health check, donation, and refreshments, takes about 45-60 minutes." },
    ];

    const howItWorks = [
        { icon: <FaUsers />, title: "Register", desc: "Create your free account with basic health information" },
        { icon: <FaTint />, title: "Find Request", desc: "Browse donation requests matching your blood type" },
        { icon: <FaCalendarCheck />, title: "Schedule", desc: "Book a convenient time for your donation" },
        { icon: <FaHeart />, title: "Save Lives", desc: "Complete your donation and become a hero" },
    ];

    return (
        <div className={`font-sans transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* ==================== SECTION 1: HERO ==================== */}
            <div className={`relative overflow-hidden min-h-[70vh] flex flex-col lg:flex-row lg:items-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto w-full">
                    <div className={`relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                        <svg className={`hidden lg:block absolute right-0 inset-y-0 h-full w-48 transform translate-x-1/2 ${isDark ? 'text-gray-900' : 'text-white'}`} fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>

                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="sm:text-center lg:text-left"
                            >
                                <div className={`inline-block px-4 py-1.5 font-semibold rounded-full text-sm mb-6 border animate-pulse ${
                                    isDark 
                                        ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                        : 'bg-red-50 text-red-600 border-red-100'
                                }`}>
                                     ❤️ Saving Lives, Together
                                </div>
                                <h1 className={`text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    <span className="block xl:inline">Donate Blood,</span>{' '}
                                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400 xl:inline">Save a Life.</span>
                                </h1>
                                <p className={`mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Your donation is the power to save lives. It's safe, simple, and makes a huge difference. Join our community of heroes today.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25">
                                            Become a Donor
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link to="/search" className={`w-full flex items-center justify-center px-8 py-3 border text-base font-medium rounded-full md:py-4 md:text-lg transition-all hover:scale-105 ${
                                            isDark 
                                                ? 'border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700 hover:border-gray-600' 
                                                : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300'
                                        }`}>
                                            Find Donors
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </main>
                    </div>
                </div>
                <div className={`w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 ${isDark ? 'bg-red-950/50' : 'bg-red-50'}`}>
                    <img className={`h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full ${isDark ? 'opacity-70' : 'opacity-90'}`} src="/bloodDonation.png" alt="Blood Donation Community" />
                </div>
            </div>

            {/* ==================== SECTION 2: STATS CARDS ==================== */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
                <motion.div 
                    {...staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {[
                        { title: "Safe & Secure", desc: "100% sterile & safe process", icon: <FaUserShield className="text-red-500" /> },
                        { title: "Active Donors", desc: "Ready to help anytime", icon: <FaUsers className="text-red-500" />, count: 2400 },
                        { title: "Lives Saved", desc: "And counting every day", icon: <FaHeart className="text-red-500" />, count: 5000 }
                    ].map((stat, idx) => (
                        <motion.div 
                            key={idx} 
                            {...fadeInUp}
                            className={`backdrop-blur-md border shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex items-center gap-6 ${
                                isDark 
                                    ? 'bg-gray-800/80 border-gray-700/50 hover:border-red-500/30' 
                                    : 'bg-white/80 border-white/20'
                            }`}
                        >
                            <div className={`text-4xl w-16 h-16 rounded-full flex items-center justify-center shadow-inner ${
                                isDark ? 'bg-gradient-to-br from-red-900/50 to-red-950/50' : 'bg-gradient-to-br from-red-100 to-red-50'
                            }`}>
                                {stat.icon}
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {stat.count ? <AnimatedCounter end={stat.count} suffix="+" /> : stat.title}
                                </h3>
                                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>{stat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* ==================== SECTION 3: WHY DONATE ==================== */}
            <motion.div {...fadeInUp} className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase">Why Donate?</h2>
                        <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            The Gift of Life
                        </p>
                        <p className={`mt-4 max-w-2xl text-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Blood is the most precious gift that anyone can give to another person – the gift of life.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop", title: "Free Health Check", desc: "Get a mini-physical checkup before every donation including blood pressure, pulse, and hemoglobin levels." },
                            { img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=2070&auto=format&fit=crop", title: "Community Impact", desc: "Directly help people in your local community recover from surgeries, accidents, and illnesses." },
                            { img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2031&auto=format&fit=crop", title: "Emergency Support", desc: "Be the hero during critical emergencies and natural disasters when blood supply is in high demand." },
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx} 
                                whileHover={{ y: -10 }}
                                className={`flex flex-col rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border ${
                                    isDark 
                                        ? 'bg-gray-800 border-gray-700 hover:border-red-500/30' 
                                        : 'bg-white border-gray-100'
                                }`}
                            >
                                <div className="flex-shrink-0 overflow-hidden h-48">
                                    <img className="h-full w-full object-cover hover:scale-110 transition-transform duration-500" src={item.img} alt={item.title} />
                                </div>
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <p className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</p>
                                        <p className={`mt-3 text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ==================== SECTION 4: HOW IT WORKS ==================== */}
            <motion.div {...fadeInUp} className={`py-24 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase">Simple Process</h2>
                        <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            How It Works
                        </p>
                    </div>
                    
                    {/* Steps with visible connecting lines */}
                    <div className="relative">
                        {/* Connecting Line - visible on desktop */}
                        <div className={`hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-1 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/50 via-red-500 to-red-500/50 animate-pulse"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                            {howItWorks.map((step, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 }}
                                    className="text-center relative z-10"
                                >
                                    {/* Circle with icon */}
                                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl mb-6 shadow-xl relative border-4 ${
                                        isDark 
                                            ? 'bg-gradient-to-br from-red-600 to-red-700 text-white border-gray-950' 
                                            : 'bg-gradient-to-br from-red-500 to-red-600 text-white border-gray-50'
                                    }`}>
                                        {step.icon}
                                    </div>
                                    
                                    {/* Step number badge */}
                                    <span className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${
                                        isDark 
                                            ? 'bg-gray-800 text-red-400 border-2 border-red-500' 
                                            : 'bg-white text-red-600 border-2 border-red-500'
                                    }`}>
                                        {idx + 1}
                                    </span>
                                    
                                    <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                                    <p className={`max-w-xs mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ==================== SECTION 5: BLOOD TYPES ==================== */}
            <motion.div {...fadeInUp} className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase">Compatibility</h2>
                        <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Know Your Blood Type
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {bloodTypes.map((blood, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className={`p-6 rounded-2xl text-center transition-all border ${
                                    isDark ? 'bg-gray-800 border-gray-700 hover:border-red-500/30' : 'bg-gray-50 border-gray-100 hover:border-red-200'
                                }`}
                            >
                                <div className={`text-4xl font-black mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{blood.type}</div>
                                <div className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Population</div>
                                <div className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{blood.percent}</div>
                                <div className={`text-xs p-2 rounded-lg ${isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}>
                                    Can give to: {blood.canGive}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link to="/blood-compatibility" className="btn btn-outline btn-error rounded-full px-8">
                            View Full Compatibility Chart <FaArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* ==================== SECTION 6: IMPACT STATISTICS ==================== */}
            <div className="relative bg-gradient-to-br from-red-600 to-red-700 py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center text-white mb-16">
                        <h2 className="text-base text-red-100 font-semibold tracking-wide uppercase">Our Impact</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                            Making a Real Difference
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                        {[
                            { value: 15000, label: "Donations Made", suffix: "+", icon: <FaTint /> },
                            { value: 8500, label: "Lives Saved", suffix: "+", icon: <FaHeart /> },
                            { value: 120, label: "Partner Hospitals", suffix: "", icon: <FaHospital /> },
                            { value: 64, label: "Districts Covered", suffix: "", icon: <FaMapMarkerAlt /> },
                        ].map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-4 shadow-lg">
                                    {stat.icon}
                                </div>
                                <div className="text-5xl md:text-6xl font-black">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <p className="mt-2 text-red-100 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ==================== SECTION 7: TESTIMONIALS ==================== */}
            <motion.div {...fadeInUp} className={`py-24 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase">Stories</h2>
                        <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            What Our Community Says
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -5 }}
                                className={`p-8 rounded-2xl border transition-all ${
                                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-lg'
                                }`}
                            >
                                <FaQuoteLeft className={`text-3xl mb-4 ${isDark ? 'text-red-500/30' : 'text-red-100'}`} />
                                <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.name}</h4>
                                        <p className={`text-sm flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                            <FaMapMarkerAlt className="text-red-400" /> {t.location}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ==================== SECTION 8: RECENT REQUESTS ==================== */}
            {recentRequests.length > 0 && (
                <motion.div {...fadeInUp} className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase">Urgent</h2>
                                <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Recent Blood Requests
                                </p>
                            </div>
                            <Link to="/donation-requests" className="btn btn-ghost text-red-500">
                                View All <FaArrowRight className="ml-2" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {recentRequests.map((req, idx) => (
                                <motion.div 
                                    key={req._id || idx}
                                    whileHover={{ y: -5 }}
                                    className={`p-6 rounded-2xl border transition-all ${
                                        isDark ? 'bg-gray-800 border-gray-700 hover:border-red-500/30' : 'bg-gray-50 border-gray-100 hover:border-red-200'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{req.recipientName}</h3>
                                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{req.hospitalName}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'}`}>
                                            {req.bloodGroup}
                                        </span>
                                    </div>
                                    <div className={`flex items-center gap-2 text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <FaMapMarkerAlt className="text-red-400" />
                                        {req.recipientDistrict}, {req.recipientUpazila}
                                    </div>
                                    <div className={`flex items-center gap-2 text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <FaClock className="text-red-400" />
                                        {req.donationDate} at {req.donationTime}
                                    </div>
                                    <Link to={`/donation-request-details/${req._id}`} className="btn btn-sm btn-outline btn-error rounded-full w-full">
                                        View Details
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* ==================== SECTION 9: FAQ ==================== */}
            <motion.div {...fadeInUp} className={`py-24 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase">FAQ</h2>
                        <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Frequently Asked Questions
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <motion.div 
                                key={idx}
                                initial={false}
                                className={`rounded-2xl border overflow-hidden ${
                                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                                }`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                                    className={`w-full px-6 py-5 flex justify-between items-center text-left font-semibold ${
                                        isDark ? 'text-white hover:bg-gray-700/50' : 'text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    {faq.q}
                                    <FaChevronDown className={`transition-transform ${openFaq === idx ? 'rotate-180' : ''} ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{ height: openFaq === idx ? 'auto' : 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className={`px-6 pb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{faq.a}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ==================== SECTION 10: NEWSLETTER ==================== */}
            <motion.div {...fadeInUp} className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className={`p-12 rounded-3xl ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-850 border border-gray-700' : 'bg-gradient-to-br from-red-50 to-red-100'}`}>
                        <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Stay Updated</h2>
                        <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Subscribe to our newsletter for blood donation camps, health tips, and community updates.</p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className={`input input-lg flex-1 rounded-full ${
                                    isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200'
                                }`}
                            />
                            <button className="btn btn-lg bg-red-600 hover:bg-red-700 text-white border-none rounded-full px-8">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>

            {/* ==================== SECTION 11: CONTACT ==================== */}
            <motion.div {...fadeInUp} className={`py-24 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="md:w-1/2 p-12 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10"></div>
                            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-white opacity-10"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
                                <p className="text-red-100 mb-8 text-lg">Have questions about donating? Our team is available 24/7 to assist you.</p>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><FaPhone /></div>
                                        <span className="text-lg">+880 1234 567 890</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><FaEnvelope /></div>
                                        <span className="text-lg">contact@bloodbond.com</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><FaMap /></div>
                                        <span className="text-lg">123 Health Street, Dhaka</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 flex gap-4 relative z-10">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors"><FaFacebook /></a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors"><FaTwitter /></a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors"><FaInstagram /></a>
                            </div>
                        </div>
                        
                        <div className={`md:w-1/2 p-12 ${isDark ? 'bg-gray-800' : ''}`}>
                            <form className="space-y-6">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                                    <input type="text" placeholder="Your Name" className={`w-full px-4 py-3 rounded-xl border focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all ${
                                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200'
                                    }`} />
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                                    <input type="email" placeholder="Your Email" className={`w-full px-4 py-3 rounded-xl border focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all ${
                                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200'
                                    }`} />
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                                    <textarea rows="4" placeholder="Your Message" className={`w-full px-4 py-3 rounded-xl border focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all resize-none ${
                                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200'
                                    }`}></textarea>
                                </div>
                                <button className="w-full font-bold py-4 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg bg-red-600 hover:bg-red-700 text-white">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ==================== SECTION 12: CTA ==================== */}
            <div className="relative bg-gray-900 py-24 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-30">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-[128px]"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-[128px]"></div>
                </div>
                
                <motion.div 
                    {...fadeInUp}
                    className="relative z-10 max-w-4xl mx-auto text-center px-4"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
                        Ready to make a difference?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Your contribution can help save a life. Join our community of donors and become a hero today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/register" className="btn btn-lg bg-white text-red-600 hover:bg-gray-100 border-none rounded-full px-10 shadow-2xl">
                            Start Donating Now
                        </Link>
                        <Link to="/search" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-red-600 rounded-full px-10">
                            Find a Donor
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
