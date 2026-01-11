/**
 * CREATED BY: [Person 2 Name]
 * FEATURE: FAQ Accordion Component
 * 
 * Frequently Asked Questions section with smooth accordion functionality
 */

import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Who can donate blood?",
            answer: "Generally, anyone between 18-65 years old, weighing at least 50kg, and in good health can donate blood. You should not have any chronic illnesses, recent surgeries, or be taking certain medications. It's best to consult with the blood bank staff before donating."
        },
        {
            question: "How often can I donate blood?",
            answer: "You can donate whole blood every 56 days (about 8 weeks). For platelet donations, you can donate every 7 days, up to 24 times a year. Plasma can be donated every 28 days. Always wait for the recommended period between donations to allow your body to recover."
        },
        {
            question: "Is blood donation safe?",
            answer: "Yes, blood donation is completely safe. A new, sterile needle is used for each donor, so there's no risk of infection. The entire process is supervised by trained medical professionals. Some donors may feel slight dizziness, but this is temporary and normal."
        },
        {
            question: "How long does blood donation take?",
            answer: "The actual blood donation takes about 8-10 minutes. However, the entire process including registration, health check, donation, and refreshments takes about 45-60 minutes. Plan accordingly and don't rush after donation."
        },
        {
            question: "What should I do before donating blood?",
            answer: "Get a good night's sleep, eat a healthy meal (avoid fatty foods), drink plenty of water, and avoid alcohol 24 hours before donation. Bring a valid ID and list of any medications you're taking. Wear comfortable clothing with sleeves that can be rolled up."
        },
        {
            question: "What happens to my donated blood?",
            answer: "After donation, blood is tested, processed, and separated into components (red cells, plasma, platelets). Each donation can save up to 3 lives! Blood is stored properly and distributed to hospitals as needed for surgeries, accidents, and treatments."
        },
        {
            question: "Can I donate if I have tattoos or piercings?",
            answer: "In most cases, you need to wait 6-12 months after getting a tattoo or piercing before donating blood. This is to ensure no infections were transmitted. The waiting period may vary by location, so check with your local blood bank."
        },
        {
            question: "What should I do after donating blood?",
            answer: "Rest for 10-15 minutes and have refreshments provided. Drink extra fluids for the next 24-48 hours. Avoid strenuous exercise for 24 hours. Keep the bandage on for at least 4 hours. If you feel dizzy or faint, lie down and elevate your feet."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-4">
                        <FaQuestionCircle className="text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">Got Questions?</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500">Questions</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Everything you need to know about blood donation. Can't find your answer? Feel free to contact us.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`
                                bg-gray-800/30 backdrop-blur-sm rounded-2xl border overflow-hidden
                                transition-all duration-300
                                ${openIndex === index 
                                    ? 'border-red-500/30 shadow-lg shadow-red-500/5' 
                                    : 'border-gray-700/50 hover:border-gray-600/50'
                                }
                            `}
                        >
                            {/* Question Header */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`font-semibold text-lg transition-colors ${openIndex === index ? 'text-red-400' : 'text-white'}`}>
                                    {faq.question}
                                </span>
                                <FaChevronDown 
                                    className={`
                                        text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4
                                        ${openIndex === index ? 'rotate-180 text-red-400' : ''}
                                    `}
                                />
                            </button>

                            {/* Answer Panel */}
                            <div
                                className={`
                                    overflow-hidden transition-all duration-300 ease-in-out
                                    ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                                `}
                            >
                                <div className="px-6 pb-6 pt-0">
                                    <p className="text-gray-400 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                    <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
                    <p className="text-gray-400 mb-6">
                        Our support team is here to help you 24/7
                    </p>
                    <a
                        href="mailto:support@bloodbond.com"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
