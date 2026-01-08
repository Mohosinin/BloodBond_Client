/**
 * CREATED BY: [Person 2 Name]
 * FEATURE: Donor Testimonials Component
 * 
 * A beautiful carousel of donor testimonials with smooth animations
 * to inspire others to become blood donors
 */

import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DonorTestimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const testimonials = [
        {
            id: 1,
            name: "Rahim Ahmed",
            role: "Regular Donor",
            image: "https://i.ibb.co/FxRYhTN/donor1.png",
            quote: "Donating blood is the easiest way to save a life. Every time I donate, I feel like I'm making a real difference. BloodBond made the process so simple!",
            donations: 12,
            bloodType: "A+",
            rating: 5
        },
        {
            id: 2,
            name: "Fatima Khan",
            role: "First-time Donor",
            image: "https://i.ibb.co/7G9dX2V/donor2.png",
            quote: "I was nervous about my first donation, but the BloodBond team guided me through everything. Now I'm committed to donating regularly!",
            donations: 1,
            bloodType: "O-",
            rating: 5
        },
        {
            id: 3,
            name: "Kamal Hossain",
            role: "Blood Recipient",
            image: "https://i.ibb.co/Jk8JhM0/donor3.png",
            quote: "When I needed blood urgently for my mother's surgery, BloodBond connected us with donors within hours. Forever grateful to this community!",
            donations: 0,
            bloodType: "B+",
            rating: 5
        },
        {
            id: 4,
            name: "Nusrat Jahan",
            role: "Volunteer Coordinator",
            image: "https://i.ibb.co/6WyMfQK/donor4.png",
            quote: "As a volunteer, I've seen how BloodBond brings together donors and those in need. It's more than an app—it's a lifesaving community.",
            donations: 8,
            bloodType: "AB+",
            rating: 5
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl"></div>
            
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-4">
                        <FaHeart className="text-red-400 animate-pulse" />
                        <span className="text-red-400 text-sm font-medium">Real Stories, Real Impact</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500">Donors Say</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Hear from our incredible community of donors and recipients who have experienced the power of giving.
                    </p>
                </div>

                {/* Testimonial Card */}
                <div className="relative max-w-4xl mx-auto">
                    <div className={`bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/50 transition-all duration-500 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
                        {/* Quote Icon */}
                        <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                            <FaQuoteLeft className="text-white text-xl" />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            {/* Profile Section */}
                            <div className="text-center md:border-r md:border-gray-700/50 md:pr-8">
                                <div className="relative inline-block">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-rose-600 p-1 mx-auto mb-4">
                                        <img 
                                            src={testimonials[currentIndex].image} 
                                            alt={testimonials[currentIndex].name}
                                            className="w-full h-full rounded-full object-cover bg-gray-700"
                                            onError={(e) => {
                                                e.target.src = "https://i.ibb.co/4pDNDk1/avatar.png";
                                            }}
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-900 px-3 py-1 rounded-full border border-red-500/30">
                                        <span className="text-red-400 font-bold text-sm">{testimonials[currentIndex].bloodType}</span>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-white mt-4">{testimonials[currentIndex].name}</h4>
                                <p className="text-gray-400 text-sm">{testimonials[currentIndex].role}</p>
                                
                                {/* Rating Stars */}
                                <div className="flex justify-center gap-1 mt-3">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400 text-sm" />
                                    ))}
                                </div>

                                {/* Donation Count */}
                                {testimonials[currentIndex].donations > 0 && (
                                    <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                                        <FaHeart className="text-emerald-400" />
                                        <span className="text-emerald-400 text-sm font-medium">{testimonials[currentIndex].donations} Donations</span>
                                    </div>
                                )}
                            </div>

                            {/* Quote Section */}
                            <div className="md:col-span-2">
                                <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic">
                                    "{testimonials[currentIndex].quote}"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                        onClick={handlePrev}
                        className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-gray-700/50"
                    >
                        <FaChevronLeft />
                    </button>
                    <button 
                        onClick={handleNext}
                        className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 border border-gray-700/50"
                    >
                        <FaChevronRight />
                    </button>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentIndex === index 
                                    ? 'bg-red-500 w-8' 
                                    : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DonorTestimonials;
