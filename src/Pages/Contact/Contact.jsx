/**
 * CONTACT PAGE
 * Professional contact page with form, map, and contact info
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, 
    FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane, FaCheckCircle
} from 'react-icons/fa';
import useTheme from '../../hooks/useTheme';
import Swal from 'sweetalert2';

const Contact = () => {
    const { isDark } = useTheme();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Message Sent!',
                text: 'Thank you for contacting us. We will get back to you soon.',
                confirmButtonColor: '#EF4444',
                background: isDark ? '#1F2937' : '#fff',
                color: isDark ? '#F9FAFB' : '#1F2937'
            });
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    const contactInfo = [
        { icon: <FaPhone />, title: "Phone", info: "+880 1234 567 890", subInfo: "Mon-Sat, 8am-8pm" },
        { icon: <FaEnvelope />, title: "Email", info: "contact@bloodbond.com", subInfo: "We reply within 24 hours" },
        { icon: <FaMapMarkerAlt />, title: "Address", info: "123 Health Street, Dhanmondi", subInfo: "Dhaka 1205, Bangladesh" },
        { icon: <FaClock />, title: "Working Hours", info: "Saturday - Thursday", subInfo: "8:00 AM - 8:00 PM" },
    ];

    const inputClass = `input input-bordered w-full focus:border-red-500 focus:ring-1 focus:ring-red-500 ${
        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50'
    }`;

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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-red-100 max-w-2xl mx-auto text-lg">
                        Have questions? We'd love to hear from you. Our team is here to help.
                    </p>
                </motion.div>
            </div>

            {/* Contact Info Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-6 rounded-2xl text-center shadow-xl border ${
                                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                            }`}
                        >
                            <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center text-xl mb-4 ${
                                isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600'
                            }`}>
                                {item.icon}
                            </div>
                            <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                            <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.info}</p>
                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.subInfo}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Contact Form & Map */}
            <motion.div {...fadeInUp} className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className={`p-8 md:p-12 rounded-3xl shadow-xl border ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                        }`}>
                            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Send us a Message
                            </h2>
                            <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className={`label font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Your Name *
                                        </label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe" 
                                            className={inputClass}
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className={`label font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Email Address *
                                        </label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com" 
                                            className={inputClass}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className={`label font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Phone Number
                                        </label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+880 1234 567890" 
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className={`label font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Subject *
                                        </label>
                                        <select 
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`select select-bordered w-full ${
                                                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50'
                                            }`}
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="donation">Blood Donation</option>
                                            <option value="volunteer">Volunteer Opportunities</option>
                                            <option value="partnership">Partnership</option>
                                            <option value="support">Technical Support</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className={`label font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Your Message *
                                    </label>
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        placeholder="How can we help you?"
                                        className={`textarea textarea-bordered w-full resize-none focus:border-red-500 focus:ring-1 focus:ring-red-500 ${
                                            isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50'
                                        }`}
                                        required
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`btn w-full bg-red-600 hover:bg-red-700 text-white border-none h-12 text-lg ${isSubmitting ? 'loading' : ''}`}
                                >
                                    {isSubmitting ? 'Sending...' : (
                                        <>
                                            <FaPaperPlane className="mr-2" /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Map & Additional Info */}
                        <div className="space-y-8">
                            {/* Map */}
                            <div className={`rounded-3xl overflow-hidden shadow-xl h-80 ${isDark ? 'border border-gray-700' : ''}`}>
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.898!2d90.3742!3d23.7511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzA0LjAiTiA5MMKwMjInMjcuMSJF!5e0!3m2!1sen!2sbd!4v1234567890"
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy"
                                    title="BloodBond Location"
                                ></iframe>
                            </div>

                            {/* Social Links */}
                            <div className={`p-8 rounded-3xl shadow-xl border ${
                                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                            }`}>
                                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Follow Us
                                </h3>
                                <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Stay connected with us on social media for updates and stories.
                                </p>
                                <div className="flex gap-4">
                                    {[
                                        { icon: <FaFacebook />, href: "https://facebook.com", color: "hover:bg-blue-600" },
                                        { icon: <FaTwitter />, href: "https://twitter.com", color: "hover:bg-sky-500" },
                                        { icon: <FaInstagram />, href: "https://instagram.com", color: "hover:bg-pink-600" },
                                        { icon: <FaLinkedin />, href: "https://linkedin.com", color: "hover:bg-blue-700" },
                                    ].map((social, idx) => (
                                        <a 
                                            key={idx}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                                                isDark 
                                                    ? `bg-gray-700 text-gray-300 ${social.color} hover:text-white` 
                                                    : `bg-gray-100 text-gray-600 ${social.color} hover:text-white`
                                            }`}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Emergency Notice */}
                            <div className="p-6 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white">
                                <h4 className="font-bold text-lg mb-2">🚨 Emergency Blood Request?</h4>
                                <p className="text-red-100 mb-4">
                                    For urgent blood requirements, please call our 24/7 emergency hotline.
                                </p>
                                <a href="tel:+8801234567890" className="btn bg-white text-red-600 hover:bg-gray-100 border-none">
                                    <FaPhone className="mr-2" /> Call Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* FAQ Preview */}
            <motion.div {...fadeInUp} className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Frequently Asked Questions
                    </h2>
                    <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Can't find what you're looking for? Check our comprehensive FAQ section.
                    </p>
                    <a href="/help" className="btn btn-outline btn-error rounded-full px-8">
                        View All FAQs
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
