import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import card1 from '../assets/card1.webp'
import card2 from '../assets/card2.webp'
import card3 from '../assets/card3.webp'
import card4 from '../assets/card4.webp'
import stamp1 from '../assets/stamp1.webp'
import stamp2 from '../assets/stamp2.webp'
import stamp3 from '../assets/stamp3.webp'

// API base URL that works in both development and production environments
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://d-52-api.onrender.com'
    : 'https://d-52-api.onrender.com';

const COUNTRY_CURRENCY_MAP = {
    'India': { currency: 'INR', symbol: '₹', rate: 1, basePrice: 10 },
    'United States': { currency: 'USD', symbol: '$', rate: 1, basePrice: 120 }
};

const DEFAULT_COUNTRY = 'India';
const DEFAULT_CURRENCY = COUNTRY_CURRENCY_MAP[DEFAULT_COUNTRY];
const VALID_PROMO_CODE = "FLASH70";

const Checkout = ({ translations, currentLang }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState(DEFAULT_CURRENCY);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [promoCode, setPromoCode] = useState("");
    const [isPromoApplied, setIsPromoApplied] = useState(false);
    const [orderNumber, setOrderNumber] = useState(1);
    const [userCountry, setUserCountry] = useState(DEFAULT_COUNTRY);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);

    // Detect user's location and set appropriate currency
    useEffect(() => {
        const detectUserLocation = async () => {
            try {
                // Try to get user's location via IP
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                
                if (data.country_name === 'India') {
                    setUserCountry('India');
                    setFormData(prev => ({ ...prev, country: 'India' }));
                } else {
                    // For all non-India locations, default to USD
                    setUserCountry('United States');
                    setFormData(prev => ({ ...prev, country: 'United States' }));
                }
            } catch (error) {
                console.error('Failed to detect location:', error);
                // Default to India if location detection fails
                setUserCountry('India');
                setFormData(prev => ({ ...prev, country: 'India' }));
            } finally {
                setIsLoadingLocation(false);
            }
        };

        detectUserLocation();
    }, []);

    useEffect(() => {
        const latestOrderNumber = localStorage.getItem("orderNumber") || 1;
        setOrderNumber(parseInt(latestOrderNumber, 10));
    }, []);

    const incrementOrderNumber = () => {
        const nextOrderNumber = orderNumber + 1;
        setOrderNumber(nextOrderNumber);
        localStorage.setItem("orderNumber", nextOrderNumber);
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: DEFAULT_COUNTRY,
        streetAddress: '',
        apartment: '',
        townCity: '',
        phone: '',
        email: '',
        paymentMode: ''
    });

    useEffect(() => {
        if (orderDetails) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            // Use direct base price for each currency without any discounts
            const baseAmount = foundCurrency.basePrice * orderDetails.quantity;
            setConvertedAmount(baseAmount.toFixed(2));
        }
    }, [formData.country, orderDetails, formData.paymentMode]);

    // Original useEffects for initialization and script loading...
    useEffect(() => {
        if (!location.state) {
            navigate('/product');
            return;
        }
        setOrderDetails(location.state);

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [location.state, navigate]);

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        if (!formData.country.trim()) errors.country = 'Country is required';
        if (!formData.streetAddress.trim()) errors.streetAddress = 'Street address is required';
        if (!formData.townCity.trim()) errors.townCity = 'Town/City is required';

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Phone number must be exactly 10 digits';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.paymentMode) errors.paymentMode = 'Please select a payment mode';

        return errors;
    };

    useEffect(() => {
        if (orderDetails) {
            const foundCurrency = COUNTRY_CURRENCY_MAP[formData.country] || DEFAULT_CURRENCY;
            setCurrentCurrency(foundCurrency);

            // Use direct base price for each currency without any discounts
            const baseAmount = foundCurrency.basePrice * orderDetails.quantity;
            setConvertedAmount(baseAmount.toFixed(2));
        }
    }, [formData.country, orderDetails, formData.paymentMode]);

    const handlePromoCodeApply = () => {
        if (promoCode.trim().toUpperCase() === VALID_PROMO_CODE) {
            setIsPromoApplied(true);
            setFormErrors(prev => ({ ...prev, promoCode: "" }));
        } else {
            setIsPromoApplied(false);
            setFormErrors(prev => ({ ...prev, promoCode: "Invalid promo code" }));
        }
    };

    // Send order confirmation email
    const sendOrderConfirmationEmail = async (customerDetails, orderDetails) => {
        try {
            console.log('Sending order confirmation email to:', customerDetails.email);
            console.log('Order details:', orderDetails);
            
            const response = await fetch(`${API_BASE_URL}/send-order-confirmation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerEmail: customerDetails.email,
                    customerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
                    customerPhone: customerDetails.phone,
                    customerDetails,
                    orderDetails
                }),
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                console.error('Failed to send confirmation email:', data.message);
                return false;
            } else {
                console.log('Confirmation email sent successfully');
                return true;
            }
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            return false;
        }
    };

    // Send abandoned order email notification
    const sendAbandonedOrderEmail = async (customerDetails, orderDetails) => {
        try {
            console.log('Sending abandoned order email to:', customerDetails.email);
            
            const response = await fetch(`${API_BASE_URL}/send-abandoned-order-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerEmail: customerDetails.email,
                    customerDetails,
                    orderDetails
                }),
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                console.error('Failed to send abandoned order email:', data.message);
            } else {
                console.log('Abandoned order email sent successfully');
            }
        } catch (error) {
            console.error('Error sending abandoned order email:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                if (formData.paymentMode === 'online') {
                    handleRazorpayPayment();
                } else if (formData.paymentMode === 'cod') {
                    // Prepare the data for COD orders
                    const customerDetails = {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.streetAddress,
                        apartment: formData.apartment,
                        city: formData.townCity,
                        country: formData.country,
                    };
                    
                    const orderDetailsForEmail = {
                        orderNumber,
                        productName: orderDetails.productName,
                        quantity: orderDetails.quantity,
                        totalAmount: convertedAmount,
                        currency: currentCurrency.currency,
                        paymentMethod: "Cash on Delivery",
                        orderStatus: "Pending",
                    };

                    // Send order confirmation email
                    const emailSent = await sendOrderConfirmationEmail(customerDetails, orderDetailsForEmail);
                    
                    if (emailSent) {
                        // Update order number and show success
                        incrementOrderNumber();
                        setPaymentSuccess(true);
                    } else {
                        throw new Error('Failed to send order confirmation email');
                    }

                    setIsSubmitting(false);
                }
            } catch (error) {
                console.error('Submission error:', error);
                setFormErrors(prev => ({
                    ...prev,
                    submit: 'Failed to process order. Please try again.'
                }));
                setIsSubmitting(false);
            }
        }
    };

    const handleRazorpayPayment = async () => {
        try {
            setIsSubmitting(true);
            
            // Store customer details for potential abandoned order emails
            const customerDetails = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.streetAddress,
                apartment: formData.apartment,
                city: formData.townCity,
                country: formData.country,
            };
            
            const tempOrderDetails = {
                orderNumber,
                productName: orderDetails.productName,
                quantity: orderDetails.quantity,
                totalAmount: convertedAmount,
                currency: currentCurrency.currency,
            };
            
            // First create order on server
            const response = await fetch(`${API_BASE_URL}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: convertedAmount,
                    currency: currentCurrency.currency,
                    receipt: `order_${orderNumber}`,
                    notes: {
                        productName: orderDetails.productName,
                        customerName: `${formData.firstName} ${formData.lastName}`,
                        customerEmail: formData.email
                    }
                }),
            });
            
            const orderData = await response.json();
            
            if (!orderData.success) {
                throw new Error(orderData.message || "Failed to create order");
            }
            
            const options = {
                key: orderData.key,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: 'D-52',
                description: `Order for ${orderDetails.productName}`,
                order_id: orderData.order.id,
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone
                },
                handler: async function (response) {
                    try {
                        // Verify payment on server
                        const verifyResponse = await fetch(`${API_BASE_URL}/verify-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            }),
                        });
                        
                        const verifyData = await verifyResponse.json();
                        
                        if (!verifyData.success) {
                            throw new Error("Payment verification failed");
                        }
                        
                        // Order details for email - add payment info
                        const orderDetailsForEmail = {
                            ...tempOrderDetails,
                            paymentMethod: "Online Payment (Razorpay)",
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            orderStatus: "Paid",
                        };

                        // Send email confirmation immediately after payment verification
                        try {
                            await sendOrderConfirmationEmail(customerDetails, orderDetailsForEmail);
                            console.log("Order confirmation email sent after successful payment");
                        } catch (emailError) {
                            console.error("Failed to send order confirmation email:", emailError);
                        }

                        // Update order number and show success
                        incrementOrderNumber();
                        setPaymentSuccess(true);
                        setIsSubmitting(false);
                    } catch (error) {
                        console.error("Order submission error:", error);
                        setFormErrors(prev => ({
                            ...prev,
                            submit: "Payment successful but failed to send order details. Please contact support.",
                        }));
                        setIsSubmitting(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        // Send abandoned order email when customer dismisses payment modal
                        console.log("Payment modal dismissed - sending abandoned order email");
                        sendAbandonedOrderEmail(customerDetails, {
                            ...tempOrderDetails,
                            orderStatus: "Abandoned",
                            paymentMethod: "Online Payment (Abandoned)"
                        });
                        setIsSubmitting(false);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment initialization error:", error);
            setFormErrors(prev => ({
                ...prev,
                submit: "Failed to initialize payment. Please try again."
            }));
            setIsSubmitting(false);
        }
    };

    const renderFormField = (name, label, type = "text", required = true) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border ${formErrors[name] ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors[name] && (
                <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
            )}
        </div>
    );

    const renderOrderSummary = () => (
        <div className="glass-effect rounded-2xl p-8 floating-card">
            <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {translations[currentLang].checkout.order}
                </h2>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="gradient-border rounded-xl p-6 mb-8 shimmer-effect">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center pulse-gentle">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                        Secure Checkout
                    </span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium text-gray-700">SSL Encrypted & Bank-Level Security</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-green-50/50 rounded-lg border border-green-100">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium text-gray-700">100% Money-Back Guarantee</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium text-gray-700">Fast & Secure Delivery</span>
                    </div>
                </div>
            </div>

            {/* Enhanced Order Details */}
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex justify-between items-center font-medium pb-4 border-b border-gray-300">
                        <span className="text-gray-700 flex items-center space-x-2">
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span>{translations[currentLang].checkout.product}</span>
                        </span>
                        <span className="text-gray-700">{translations[currentLang].checkout.subtotal}</span>
                    </div>

                    {/* <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">{orderDetails?.productName}</h3>
                                <p className="text-sm text-gray-600">Quantity: {orderDetails?.quantity}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center space-x-2">
                                <span className="line-through text-gray-400 text-sm">
                                    {currentCurrency.symbol} {(currentCurrency.basePrice * 1.75 * orderDetails.quantity).toFixed(2)}
                                </span>
                                <span className="font-bold text-green-600 text-lg">
                                    {currentCurrency.symbol} {convertedAmount}
                                </span>
                            </div>
                            <div className="text-xs text-green-600 font-medium">You save 43%!</div>
                        </div>
                    </div> */}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="font-medium text-gray-700">{translations[currentLang].checkout.subtotal}</span>
                        <span className="text-gray-700">{currentCurrency.symbol} {convertedAmount}</span>
                    </div>

                    <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="font-medium text-gray-700 flex items-center space-x-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span>{translations[currentLang].checkout.shipping}</span>
                        </span>
                        <div className='text-right'>
                            <div className="text-green-600 font-medium">FREE</div>
                            <div className="text-xs text-gray-500">(5-7 business days)</div>
                        </div>
                    </div>

                    <div className="flex justify-between py-4 border-t-2 border-gray-300 bg-gradient-to-r from-blue-50 to-purple-50 px-4 rounded-lg">
                        <span className="text-xl font-bold text-gray-800">{translations[currentLang].checkout.total}</span>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {currentCurrency.symbol} {convertedAmount}
                        </span>
                    </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span>{translations[currentLang].checkout.mode}<span className="text-red-500">*</span></span>
                    </label>
                    <select
                        name="paymentMode"
                        value={formData.paymentMode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white/50 transition-all duration-300"
                    >
                        <option value="">Select Payment Method</option>
                        {userCountry === 'India' && <option value="cod">Cash on Delivery (COD)</option>}
                        <option value="online">Online Payment (Card/UPI/Wallet)</option>
                    </select>
                    {formErrors.paymentMode && (
                        <p className="text-red-500 text-sm flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{formErrors.paymentMode}</span>
                        </p>
                    )}
                    
                    {/* Trusted Payment Methods */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Accepted Payment Methods</h4>
                        <div className="grid grid-cols-4 gap-3">
                            {/* Visa */}
                            <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-center">
                                <img src={card1} class />
                            </div>
                            
                            {/* Mastercard */}
                            <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-center">
                            <img src={card2} class />                                
                            </div>
                            
                            {/* RuPay (for India) */}
                            {userCountry === 'India' && (
                                <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-center">
                                    <img src={card3} className="w-12 h-8" alt="RuPay" />
                                </div>
                            )}
                            
                            {/* UPI (for India) */}
                            {userCountry === 'India' && (
                                <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-center">
                                    <img src={card4} className="w-12 h-8" alt="UPI" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Enhanced Submit Button */}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl
                        transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                        relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span className="text-lg">{translations[currentLang].checkout.processing}</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-lg">{translations[currentLang].checkout.order}</span>
                            </>
                        )}
                    </span>
                </button>

                {/* Enhanced Trust Elements */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                    <div className="flex flex-col items-center text-center p-4 rounded-xl">
                        <img src={stamp1}  />
                        {/* <h4 className="font-semibold text-gray-800 text-sm mb-1">Secure Payment</h4> */}
                        {/* <p className="text-xs text-gray-600">Bank-level security</p> */}
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4 rounded-xl">
                        <img src={stamp2} />
                    </div>
                    
                    {/* <div className="flex flex-col items-start text-start p-4 rounded-xl">
                        <img src={stamp3} />
                    </div> */}
                </div>
                
                {/* Company Verification */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Verified Company</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-xs text-gray-600">Business Verified</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-xs text-gray-600">GST Registered</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-xs text-gray-600">Licensed Seller</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-xs text-gray-600">ISO Certified</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Get available countries based on user's detected location
    const getAvailableCountries = () => {
        if (userCountry === 'India') {
            return Object.keys(COUNTRY_CURRENCY_MAP);
        } else {
            // For non-India users, only show USD option
            return ['United States'];
        }
    };

    if (!orderDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (paymentSuccess) {
        // Navigate to Thank You page with order data
        const orderData = {
            orderNumber: orderNumber,
            customerName: `${formData.firstName} ${formData.lastName}`,
            productName: orderDetails?.productName,
            quantity: orderDetails?.quantity,
            amount: `${currentCurrency.symbol} ${convertedAmount}`,
            currency: currentCurrency.currency,
            totalAmount: convertedAmount,
            paymentMethod: formData.paymentMode === 'cod' ? 'Cash on Delivery' : 'Online Payment',
            shippingAddress: `${formData.streetAddress}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.townCity}, ${formData.country}`
        };

        navigate('/thank-you', { state: { orderData } });
        return null; // Return null since we're navigating away
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 py-8">
            <style jsx>{`
                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slideInLeft {
                    0% { opacity: 0; transform: translateX(-30px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes slideInRight {
                    0% { opacity: 0; transform: translateX(30px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                
                .fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
                .slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
                .slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
                .pulse-gentle { animation: pulse 2s ease-in-out infinite; }
                
                .glass-effect {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }
                
                .gradient-border {
                    position: relative;
                    background: linear-gradient(white, white) padding-box,
                                linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4) border-box;
                    border: 2px solid transparent;
                }
                
                .shimmer-effect {
                    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }
                
                .floating-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                .floating-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12 fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Secure Checkout
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Complete your order with confidence. Your information is protected with bank-level security.
                    </p>
                </div>

                {formErrors.submit && (
                    <div className="glass-effect border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 fade-in-up">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{formErrors.submit}</span>
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8 slide-in-left">
                        <div className="glass-effect rounded-2xl p-8 floating-card">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    {translations[currentLang].checkout.sectitle}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>{translations[currentLang].checkout.firstname} <span className="text-red-500">*</span></span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                                formErrors.firstName 
                                                    ? 'border-red-500 focus:border-red-500' 
                                                    : 'border-gray-200 focus:border-blue-500 hover:border-blue-300'
                                            } focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white/50`}
                                            placeholder="Enter your first name"
                                        />
                                        {formErrors.firstName && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                <span>{formErrors.firstName}</span>
                                            </p>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>{translations[currentLang].checkout.lastname} <span className="text-red-500">*</span></span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                                formErrors.lastName 
                                                    ? 'border-red-500 focus:border-red-500' 
                                                    : 'border-gray-200 focus:border-blue-500 hover:border-blue-300'
                                            } focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white/50`}
                                            placeholder="Enter your last name"
                                        />
                                        {formErrors.lastName && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                <span>{formErrors.lastName}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{translations[currentLang].checkout.country}<span className="text-red-500">*</span></span>
                                    </label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white/50 transition-all duration-300"
                                        disabled={isLoadingLocation}
                                    >
                                        {getAvailableCountries().map(country => (
                                            <option key={country} value={country}>
                                                {country} ({COUNTRY_CURRENCY_MAP[country].currency})
                                            </option>
                                        ))}
                                    </select>
                                    {isLoadingLocation && (
                                        <p className="text-sm text-gray-500 flex items-center space-x-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                                            <span>Detecting your location...</span>
                                        </p>
                                    )}
                                </div>

                                {/* Enhanced form fields for address, phone, email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{translations[currentLang].checkout.address} <span className="text-red-500">*</span></span>
                                    </label>
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                            formErrors.streetAddress 
                                                ? 'border-red-500 focus:border-red-500' 
                                                : 'border-gray-200 focus:border-blue-500 hover:border-blue-300'
                                        } focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white/50`}
                                        placeholder="Enter your street address"
                                    />
                                    {formErrors.streetAddress && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{formErrors.streetAddress}</span>
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <span>{translations[currentLang].checkout.clientaddress}</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="apartment"
                                        value={formData.apartment}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 hover:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white/50 transition-all duration-300"
                                        placeholder="Apartment, suite, etc. (optional)"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <span>{translations[currentLang].checkout.city} <span className="text-red-500">*</span></span>
                                    </label>
                                    <input
                                        type="text"
                                        name="townCity"
                                        value={formData.townCity}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                            formErrors.townCity 
                                                ? 'border-red-500 focus:border-red-500' 
                                                : 'border-gray-200 focus:border-blue-500 hover:border-blue-300'
                                        } focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white/50`}
                                        placeholder="Enter your city"
                                    />
                                    {formErrors.townCity && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{formErrors.townCity}</span>
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>{translations[currentLang].checkout.phone} <span className="text-red-500">*</span></span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                            formErrors.phone 
                                                ? 'border-red-500 focus:border-red-500' 
                                                : 'border-gray-200 focus:border-blue-500 hover:border-blue-300'
                                        } focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white/50`}
                                        placeholder="Enter your phone number"
                                    />
                                    {formErrors.phone && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{formErrors.phone}</span>
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>{translations[currentLang].checkout.email} <span className="text-red-500">*</span></span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                                            formErrors.email 
                                                ? 'border-red-500 focus:border-red-500' 
                                                : 'border-gray-200 focus:border-blue-500 hover:border-blue-300'
                                        } focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white/50`}
                                        placeholder="Enter your email address"
                                    />
                                    {formErrors.email && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{formErrors.email}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="slide-in-right">
                        {renderOrderSummary()}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Checkout;
