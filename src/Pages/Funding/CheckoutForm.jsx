import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = ({ closeModal, refetch }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [amount, setAmount] = useState(100); // Default 100 BDT
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        if (amount < 50) {
            setError("Minimum donation is 50 Taka");
            return;
        }

        // 1. Create Payment Intent
        try {
            const { data } = await axiosSecure.post('/create-payment-intent', { price: amount });
            if (!data.clientSecret) {
                setError("Failed to initiate payment. Please try again.");
                return;
            }

            // 2. Confirm Payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            });

            if (confirmError) {
                console.log('[error]', confirmError);
                setError(confirmError.message);
            } else {
                if (paymentIntent.status === 'succeeded') {
                    setTransactionId(paymentIntent.id);

                    // 3. Save to Database
                    const fundingInfo = {
                        name: user?.displayName,
                        email: user?.email,
                        amount: parseFloat(amount),
                        transactionId: paymentIntent.id,
                        date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
                    }

                    const res = await axiosSecure.post('/funding', fundingInfo);
                    if (res.data?.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Donation Successful! 🎉",
                            text: `You have donated ৳${amount} to the cause.`,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        refetch();
                        closeModal();
                    }
                }
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong during payment processing.");
        }
    };


    return (
        <form onSubmit={handleSubmit} className="p-4">
             <div className="bg-red-50 p-4 rounded-xl mb-6 flex items-start gap-3">
                <div className="text-red-500 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <p className="text-sm text-red-800 leading-relaxed">
                    Test Mode: Use card <span className="font-mono font-bold bg-white px-1 rounded">4242 4242 4242 4242</span> with any future date (e.g., 12/26) and CVC (e.g., 123).
                </p>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Donation Amount (BDT)</label>
                <div className="relative group">
                    <span className="absolute left-4 top-3.5 text-gray-400 font-bold group-focus-within:text-red-600 transition-colors">৳</span>
                    <input 
                        type="number" 
                        min="50"
                        className="input input-bordered w-full pl-10 focus:border-red-500 focus:ring-1 focus:ring-red-500 font-bold text-lg text-gray-800" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder="Enter amount"
                        required
                    />
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2">Card Details</label>
                <div className="border border-gray-200 p-4 rounded-xl bg-white focus-within:ring-1 focus-within:ring-red-500 focus-within:border-red-500 transition-all shadow-sm">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#1f2937',
                                    fontFamily: 'Inter, sans-serif',
                                    '::placeholder': {
                                        color: '#9ca3af',
                                    },
                                    iconColor: '#dc2626'
                                },
                                invalid: {
                                    color: '#991b1b',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm mb-6 border border-red-100 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}
            
            {transactionId && (
                <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm mb-6 border border-green-100 flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-mono">ID: {transactionId}</span>
                </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={closeModal} className="btn btn-ghost text-gray-500 hover:bg-gray-100 rounded-xl">Cancel</button>
                <button 
                    className="btn bg-red-600 hover:bg-red-700 text-white border-none px-6 shadow-lg shadow-red-200 rounded-xl w-32" 
                    type="submit" 
                    disabled={!stripe || !clientSecret && false} // Logic handled in submit
                >
                    {amount ? `Pay ৳${amount}` : 'Pay'}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
