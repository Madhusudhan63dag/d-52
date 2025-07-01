import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import product1 from '../assets/imagess/4.webp';
import product2 from '../assets/imagess/3.webp';
import product3 from '../assets/imagess/2.webp';
import diabetesHero from '../assets/product.webp';



const Product = ({ translations, currentLang }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedOffer, setSelectedOffer] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
    const [currency, setCurrency] = useState('INR');
    const [stockCount, setStockCount] = useState(12); // Add stock count state
    const productPrice = currency === 'USD' ? 120 : 3990; // Update to match urgency price
    const originalPrice = currency === 'USD' ? 180 : 6990;


    // Auto-slide offers every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedOffer((prev) => (prev + 1) % 3);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else {
                    return { hours: 23, minutes: 59, seconds: 59 }; // Reset
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Add stock decrease simulation
    useEffect(() => {
        const stockTimer = setInterval(() => {
            setStockCount(prev => {
                if (prev > 5) {
                    return Math.max(5, prev - Math.floor(Math.random() * 2));
                }
                return prev;
            });
        }, 45000); // Decrease stock every 45 seconds

        return () => clearInterval(stockTimer);
    }, []);

    const handleCheckout = () => {
        const currentProductPrice = currency === 'USD' ? 120 : 3990;
        navigate('/checkout', {
            state: {
                quantity,
                totalAmount: quantity * currentProductPrice,
                productName: 'D-52',
                unitPrice: currentProductPrice,
                currency: currency
            }
        });
    };

    const productImages = [product1, product2, product3];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-100 flex flex-col items-center justify-center py-16 px-2">
            <div className="w-full bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col md:flex-row overflow-hidden">
                {/* Diabetes Hero Image */}
                <div className="md:w-1/2 w-full flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 via-green-50 to-blue-100 p-8">
                    <img
                        src={productImages[selectedImage]}
                        alt="Natural Diabetes Support Supplement"
                        className=" object-contain rounded-xl shadow-md border border-gray-100 bg-white"
                    />
                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-4">
                        {productImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`w-10 h-10 rounded border-2 ${selectedImage === idx ? 'border-green-500' : 'border-gray-200'} overflow-hidden bg-white`}
                            >
                                <img src={img} alt={`Product view ${idx + 1}`} className="w-full h-full object-contain" />
                            </button>
                        ))}
                    </div>
                </div>
                {/* Product Info */}
                <div className="md:w-1/2 w-full flex flex-col justify-center p-8 gap-4">
                    {/* Badges */}
                    <div className="mb-2 flex gap-2 flex-wrap">
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Diabetes Care</span>
                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Ayush Certified</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                        D-52 — Natural Herbal Formula for Diabetes Support
                    </h1>

                    {/* Description */}
                    <p className="text-base text-gray-700 mb-2">
                        D-52 is a powerful Ayurvedic blend in convenient mini bottles that helps manage blood sugar levels naturally. Just 5 drops in water, morning and evening before food, supports healthy glucose metabolism, energy levels, and liver function—without any side effects.
                    </p>

                    {/* Key Benefits */}
                    <ul className="list-disc pl-5 text-green-700 text-sm mb-2">
                        <li>Helps regulate blood sugar levels</li>
                        <li>Supports liver detox & digestion</li>
                        <li>Promotes energy and daily vitality</li>
                        <li>Safe, non-habit forming & 100% herbal</li>
                    </ul>

                    {/* Ratings */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xl">★</span>
                        ))}
                        </div>
                        <span className="text-gray-600 font-medium text-sm">4.9/5 (5,000+ verified users)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-end gap-3 mb-2">
                        <span className="text-xl font-bold text-gray-400 line-through">₹5,990</span>
                        <span className="text-3xl font-extrabold text-green-700">₹3,990</span>
                    </div>

                    {/* Urgency Bar & Timer */}
                    <div className="mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div
                            className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.max(10, (stockCount / 50) * 100)}%` }}
                        ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-green-700 font-bold">
                        <span>Only {stockCount} boxes left at this price</span>
                        <span className="font-mono bg-green-50 px-2 py-1 rounded">
                            {String(timeLeft.hours).padStart(2, '0')}:
                            {String(timeLeft.minutes).padStart(2, '0')}:
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mb-4">
                        <label className="text-gray-700 font-medium text-sm">Qty:</label>
                        <div className="flex items-center bg-white rounded border border-gray-200">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="text-green-600 px-2 py-1 font-bold hover:bg-green-50 rounded-l"
                        >-</button>
                        <input
                            type="number"
                            min="1"
                            max={stockCount}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.min(stockCount, parseInt(e.target.value) || 1))}
                            className="w-10 text-center py-1 text-green-800 font-bold border-0 focus:outline-none"
                        />
                        <button 
                            onClick={() => setQuantity(Math.min(stockCount, quantity + 1))}
                            className="text-green-600 px-2 py-1 font-bold hover:bg-green-50 rounded-r"
                        >+</button>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg text-lg mb-2"
                    >
                        Order Now
                    </button>

                    {/* <a 
                        href="https://www.amazon.in/your-diabetes-product-link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-lg text-center transition-all duration-300 shadow-lg flex items-center justify-center"
                    >
                        <span className="mr-2">🛒</span>
                        Buy on Amazon
                    </a> */}

                    {/* Shipping & Guarantee */}
                    <div className="flex flex-wrap gap-4 mt-4 text-green-700 text-xs font-semibold">
                        <div className="flex items-center gap-2"><span>🚚</span> Free Shipping</div>
                        <div className="flex items-center gap-2"><span>💰</span> 15 Days Return</div>
                        <div className="flex items-center gap-2"><span>🛡️</span> Secure Payment</div>
                        <div className="flex items-center gap-2"><span>🌿</span> 100% Herbal Formula</div>
                    </div>
                    </div>

            </div>
            {/* Product Benefits Section */}
            <div className="w-full mt-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center py-8 px-4">
                    <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">Ayurvedic Innovation</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Why Choose D-52?</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        D-52 combines trusted Ayurvedic herbs with modern formulation practices to deliver a safe and powerful solution for blood sugar management—just 5 drops in water, morning and evening.
                    </p>
                    </div>

                    {/* Content Grid */}
                    <div className="flex flex-col md:flex-row items-center gap-8 p-8">
                    {/* Left: Benefits */}
                    <div className="md:w-1/2 space-y-6">
                        {/* Benefit Cards */}
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-start gap-4">
                            <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Natural Blood Sugar Balance</h3>
                            <p className="text-gray-600">Formulated with potent herbal extracts to help support healthy glucose metabolism and regulate sugar levels.</p>
                            </div>
                        </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-start gap-4">
                            <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Daily Energy & Digestive Support</h3>
                            <p className="text-gray-600">Supports natural energy levels while enhancing digestion and nutrient absorption—key for diabetes management.</p>
                            </div>
                        </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-start gap-4">
                            <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Simple Drop-Based Usage</h3>
                            <p className="text-gray-600">Each box contains 5 mini bottles. Take 5 drops in water before food, morning and evening. No pills, just pure herbal wellness.</p>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Right: Product Image */}
                    <div className="md:w-1/2 flex justify-center items-center p-4">
                        <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
                        <img 
                            src={diabetesHero} 
                            alt='D-52 Diabetes Product' 
                            className="relative z-10 max-w-md w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                        </div>
                    </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="border-t border-blue-100 bg-white/50 px-8 py-6">
                    <div className="flex flex-wrap justify-center gap-8 text-center">
                        <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span className="text-sm font-medium text-gray-600">AYUSH Approved</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span className="text-sm font-medium text-gray-600">100% Herbal</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span className="text-sm font-medium text-gray-600">Doctor Trusted</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span className="text-sm font-medium text-gray-600">Lab Tested</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* How to Use Section */}
            <div className="w-full mt-8 bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center py-8 px-4">
                    <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">Usage Guide</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">How to Use D-52</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Just 5 drops in water twice a day for effective diabetes care
                    </p>
                    </div>

                    {/* Timeline Steps */}
                    <div className="px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Morning Dose */}
                        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 relative">
                        <div className="md:w-1/3 bg-white rounded-xl p-6 shadow-lg border border-green-100">
                            <div className="text-center">
                            <span className="text-3xl mb-3">🌅</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Morning Dose</h3>
                            <p className="text-gray-600">Before Breakfast</p>
                            <div className="mt-4 bg-green-50 rounded-lg p-3">
                                <p className="text-green-800 font-medium">5 drops in water</p>
                            </div>
                            </div>
                        </div>
                        <div className="hidden md:block w-1/3 h-0.5 bg-gradient-to-r from-green-500 to-green-300"></div>
                        <div className="md:w-1/3 bg-white rounded-xl p-6 shadow-lg border border-green-100">
                            <div className="text-center">
                            <span className="text-3xl mb-3">🌙</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Evening Dose</h3>
                            <p className="text-gray-600">Before Dinner</p>
                            <div className="mt-4 bg-green-50 rounded-lg p-3">
                                <p className="text-green-800 font-medium">5 drops in water</p>
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Usage Tips */}
                        <div className="bg-white rounded-xl p-6 shadow-md mt-8">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Important Tips for Best Results:</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                            <span className="text-green-600 text-xl">•</span>
                            <p className="text-gray-600">Take on an empty stomach 30 minutes before meals</p>
                            </div>
                            <div className="flex items-start gap-3">
                            <span className="text-green-600 text-xl">•</span>
                            <p className="text-gray-600">Mix with room temperature or lukewarm water</p>
                            </div>
                            <div className="flex items-start gap-3">
                            <span className="text-green-600 text-xl">•</span>
                            <p className="text-gray-600">Stick to consistent timings daily</p>
                            </div>
                            <div className="flex items-start gap-3">
                            <span className="text-green-600 text-xl">•</span>
                            <p className="text-gray-600">Keep bottles in a cool, dry place away from sunlight</p>
                            </div>
                        </div>
                        </div>

                        {/* Warning Note */}
                        
                    </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Product;