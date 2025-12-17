import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaHandHoldingHeart } from 'react-icons/fa';

// Ideally this should be in .env
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Funding = () => {
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);

    const { data: funds = [], refetch } = useQuery({
        queryKey: ['funding'],
        queryFn: async () => {
            const res = await axiosSecure.get('/funding');
            return res.data;
        }
    });

    const closeModal = () => setIsOpen(false);

    return (
        <div className="w-full max-w-7xl mx-auto py-8 font-sans">
             {/* Header */}
            <div className="mb-12 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-50"></div>
                <h1 className="text-4xl font-black text-gray-800 relative z-10 mb-2">Fund Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Mission</span></h1>
                <p className="text-gray-500 max-w-2xl mx-auto relative z-10">Your generous contributions help us maintain the platform and organize blood donation campaigns effectively.</p>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Donation Card */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                        {/* Decor */}
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
                        
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                             <FaHandHoldingHeart /> Donate Now
                        </h2>
                        <p className="text-red-100 mb-8 text-sm leading-relaxed">
                            Every minimal amount counts. Secure payment powered by Stripe.
                        </p>
                        
                        <button 
                            onClick={() => setIsOpen(true)} 
                            className="btn bg-white text-red-600 hover:bg-gray-100 border-none w-full h-14 rounded-xl text-lg font-bold shadow-lg"
                        >
                            Give Support
                        </button>
                        
                         <div className="mt-8 pt-6 border-t border-white/20">
                            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80 mb-2">Total Funding</h3>
                             <p className="text-4xl font-black">
                                ৳{funds.reduce((a, b) => a + b.amount, 0).toLocaleString()}
                             </p>
                         </div>
                    </div>
                </div>

                {/* Recent Funding List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[400px]">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-800 text-lg">Recent Heroes</h3>
                             <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-600 rounded-full capitalize">Verified Payments</span>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="py-4 pl-8">Donor Name</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Transaction ID</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {funds.length > 0 ? (
                                        funds.map(fund => (
                                            <tr key={fund._id} className="hover:bg-gray-50 transition-colors group">
                                                <td className="py-4 pl-8">
                                                    <div className="font-bold text-gray-800 flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xs">
                                                            {fund.name?.charAt(0) || 'D'}
                                                        </div>
                                                        {fund.name}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs">
                                                        ৳{fund.amount}
                                                    </span>
                                                </td>
                                                <td className="text-gray-500 text-sm">{fund.date}</td>
                                                 <td className="text-gray-400 text-xs font-mono">{fund.transactionId.slice(0, 10)}...</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-20">
                                                 <div className="flex flex-col items-center justify-center">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl text-gray-400 mb-4">😿</div>
                                                    <h3 className="text-gray-500 font-medium">No donations yet.</h3>
                                                    <p className="text-gray-400 text-sm">Be the first to support our cause!</p>
                                                 </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
             </div>

            {/* Donation Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">Make a Donation</h3>
                            <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">✕</button>
                        </div>
                        <div className="p-2">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm closeModal={closeModal} refetch={refetch} />
                            </Elements>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Funding;
