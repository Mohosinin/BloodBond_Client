/**
 * ABOUT PAGE
 * Professional about page with team, mission, and values
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    FaHeart, FaUsers, FaHandHoldingHeart, FaAward, FaGlobe, 
    FaShieldAlt, FaQuoteLeft, FaArrowRight, FaTint
} from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';

const About = () => {
    const { isDark } = useTheme();

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const team = [
        { name: "Dr. Aminul Islam", role: "Founder & CEO", image: "https://randomuser.me/api/portraits/men/1.jpg", bio: "20+ years in healthcare" },
        { name: "Dr. Fatima Rahman", role: "Medical Director", image: "https://randomuser.me/api/portraits/women/2.jpg", bio: "Hematology Specialist" },
        { name: "Karim Ahmed", role: "Operations Head", image: "https://randomuser.me/api/portraits/men/3.jpg", bio: "Blood Bank Expert" },
        { name: "Nadia Khan", role: "Community Manager", image: "https://randomuser.me/api/portraits/women/4.jpg", bio: "Volunteer Coordinator" },
    ];

    const values = [
        { icon: <FaHeart />, title: "Compassion", desc: "We believe in the power of human kindness and the gift of life through blood donation." },
        { icon: <FaShieldAlt />, title: "Safety", desc: "Every donation follows strict medical protocols to ensure donor and recipient safety." },
        { icon: <FaUsers />, title: "Community", desc: "Building a network of donors and recipients who support each other in times of need." },
        { icon: <FaGlobe />, title: "Accessibility", desc: "Making blood donation accessible to everyone, everywhere in Bangladesh." },
    ];

    const milestones = [
        { year: "2020", title: "Foundation", desc: "BloodBond was founded with a mission to bridge the gap between donors and recipients." },
        { year: "2021", title: "10,000 Donors", desc: "Reached our first major milestone of 10,000 registered donors." },
        { year: "2022", title: "Nationwide Expansion", desc: "Expanded our network to cover all 64 districts of Bangladesh." },
        { year: "2023", title: "50,000 Lives Saved", desc: "Celebrated saving 50,000 lives through successful blood donations." },
        { year: "2024", title: "Mobile App Launch", desc: "Launched our mobile application for easier access to blood donation services." },
    ];

    return (
        <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-red-600 to-red-700 py-24 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 px-4"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About BloodBond</h1>
                    <p className="text-red-100 max-w-2xl mx-auto text-lg">
                        Connecting hearts, saving lives. We're on a mission to ensure no one dies due to lack of blood.
                    </p>
                </motion.div>
            </div>

            {/* Mission Section */}
            <motion.div {...fadeInUp} className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase mb-2">Our Mission</h2>
                            <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Bridging the Gap Between Hope and Help
                            </h3>
                            <p className={`text-lg mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                BloodBond was founded with a singular vision: to create a seamless connection between blood donors and those in urgent need. In Bangladesh, where thousands of patients require blood transfusions daily, we saw an opportunity to leverage technology to save lives.
                            </p>
                            <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Our platform enables instant matching of blood donors with recipients, ensuring that help is never more than a few clicks away. We've built a community of heroes who stand ready to donate at a moment's notice.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/register" className="btn bg-red-600 hover:bg-red-700 text-white border-none rounded-full px-8">
                                    Join Our Mission
                                </Link>
                                <Link to="/donation-requests" className={`btn btn-outline rounded-full px-8 ${
                                    isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''
                                }`}>
                                    View Requests
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <img 
                                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2083&auto=format&fit=crop" 
                                alt="Blood Donation" 
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className={`absolute -bottom-8 -left-8 p-6 rounded-2xl shadow-xl ${
                                isDark ? 'bg-gray-800' : 'bg-white'
                            }`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                                        <FaTint className="text-3xl text-red-600" />
                                    </div>
                                    <div>
                                        <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>50,000+</p>
                                        <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Lives Saved</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Values Section */}
            <motion.div {...fadeInUp} className={`py-24 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase">Our Values</h2>
                        <p className={`mt-2 text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            What Drives Us
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -5 }}
                                className={`p-8 rounded-2xl text-center transition-all border ${
                                    isDark ? 'bg-gray-800 border-gray-700 hover:border-red-500/30' : 'bg-white border-gray-100 shadow-lg'
                                }`}
                            >
                                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-6 ${
                                    isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600'
                                }`}>
                                    {value.icon}
                                </div>
                                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value.title}</h3>
                                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Timeline Section */}
            <motion.div {...fadeInUp} className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase">Our Journey</h2>
                        <p className={`mt-2 text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Milestones We're Proud Of
                        </p>
                    </div>
                    <div className="relative">
                        <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        {milestones.map((milestone, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`relative flex items-center mb-12 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                                    <div className={`p-6 rounded-2xl ${
                                        isDark ? 'bg-gray-800' : 'bg-gray-50'
                                    }`}>
                                        <span className="text-red-500 font-bold text-lg">{milestone.year}</span>
                                        <h4 className={`text-xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{milestone.title}</h4>
                                        <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{milestone.desc}</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-4 border-white shadow"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Team Section */}
            <motion.div {...fadeInUp} className={`py-24 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase">Our Team</h2>
                        <p className={`mt-2 text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            The People Behind BloodBond
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -5 }}
                                className={`text-center p-6 rounded-2xl transition-all border ${
                                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-lg'
                                }`}
                            >
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-red-100"
                                />
                                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                                <p className="text-red-500 font-medium text-sm">{member.role}</p>
                                <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 py-20">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Make a Difference?
                    </h2>
                    <p className="text-red-100 text-lg mb-8">
                        Join thousands of donors who are saving lives every day.
                    </p>
                    <Link to="/register" className="btn btn-lg bg-white text-red-600 hover:bg-gray-100 border-none rounded-full px-10">
                        Become a Donor <FaArrowRight className="ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
