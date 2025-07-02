import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import banner1 from '../assets/imagess/banner1.webp';
import banner1Mobile from '../assets/imagess/banner1.webp';
import banner3 from '../assets/imagess/banner2.webp';
import banner3Mobile from '../assets/imagess/banner2.webp';
import product from '../assets/imagess/3.webp';
import FAQ from '../components/FAQ';
import one from '../assets/t_one.webp';
import two from '../assets/t_two.webp';
import three from '../assets/t_three.webp';
import four from '../assets/t_four.webp';
import buy from '../assets/buy.png'
import stamp from '../assets/imagess/stamp.webp';
import about2 from '../assets/imagess/about.webp';
import chart from '../assets/imagess/chart.webp';


const logoCarouselStyles = `
    @keyframes scrollx {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(calc(-100% / 4)); /* Adjust based on number of logos */
    }
    }

    .logo-carousel {
    width: 100%;
    overflow: hidden;
    padding: 20px 0;
    background: linear-gradient(90deg, white 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, white 100%);
    }

    .animate-scrollx {
    animation: scrollx 20s linear infinite;
    width: fit-content;
    }

    /* Make sure there's enough content for seamless looping */
    .animate-scrollx:hover {
    animation-play-state: paused;
    }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = logoCarouselStyles;
  document.head.appendChild(styleElement);
}

const Hero = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const banners = [
        {
            desktop: banner1,
            mobile: banner1Mobile,
        },
        {
            desktop: banner3,
            mobile: banner3Mobile,
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        setIsLoaded(true);
        
        // Handle screen resize
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', handleResize);

        // Auto-slide timer
        const slideTimer = setInterval(() => {
            nextSlide();
        }, 5000);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(slideTimer);
        };
    }, []);

    return (
        <div className="w-full relative bg-gradient-to-b from-sky-50 to-white">
            {/* Enhanced Styles */}
            <style jsx>{`
                @keyframes slideInFromBottom {
                    0% { transform: translateY(50px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes fadeInScale {
                    0% { transform: scale(0.95); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                @keyframes shimmerSlide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                .slide-in-bottom { animation: slideInFromBottom 0.8s ease-out; }
                .fade-in-scale { animation: fadeInScale 0.6s ease-out; }
                
                .hero-card {
                    background: linear-gradient(135deg, rgba(200,255,200,0.9), rgba(220,255,220,0.8));
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(14, 165, 233, 0.2);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .hero-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(14, 165, 233, 0.15);
                    border-color: rgba(14, 165, 233, 0.4);
                }
                
                .image-container {
                    position: relative;
                    overflow: hidden;
                    border-radius: 1rem;
                }
                
                .image-shimmer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent);
                    animation: shimmerSlide 2s infinite;
                    z-index: 1;
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-sky-200/30 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-sky-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative">
                {/* Hero Content Container */}
                <div className="max-w-7xl mx-auto">
                    {/* Hero Card */}
                    <div className={`hero-card overflow-hidden ${isLoaded ? 'fade-in-scale' : 'opacity-0'}`}>
                        {/* Banner Images */}
                        <div className="relative w-full h-[300px] md:h-[500px]">
                            <div className="w-full h-full image-container image-shimmer relative">
                                {banners.map((banner, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${
                                            index === currentSlide 
                                                ? 'opacity-100 translate-x-0' 
                                                : index < currentSlide 
                                                    ? 'opacity-0 -translate-x-full' 
                                                    : 'opacity-0 translate-x-full'
                                        }`}
                                    >
                                        <img
                                            src={isMobile ? banner.mobile : banner.desktop}
                                            alt={`Banner ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                                >
                                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                                >
                                    <ChevronRight className="w-6 h-6 text-gray-800" />
                                </button>

                                {/* Dots Navigation */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                                    {banners.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                currentSlide === index 
                                                    ? 'bg-white w-4' 
                                                    : 'bg-white/50 hover:bg-white/80'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lifestyle Section */}
                    <div className={`mt-12 grid md:grid-cols-2 gap-8 items-center px-4 ${isLoaded ? 'fade-in-scale' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
                        {/* Text Content */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                                <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                                    Transform Your Life with D-52
                                </span>
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-green-100 shadow-sm">
                                    <h3 className="text-xl font-semibold text-green-700 mb-2">Natural Blood Sugar Management</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Experience a life of vitality and wellness with D-52. Our scientifically formulated blend of herbs and natural ingredients works in harmony with your body to support healthy blood sugar levels throughout the day.
                                    </p>
                                </div>

                                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-green-100 shadow-sm">
                                    <h3 className="text-xl font-semibold text-green-700 mb-2">Enhanced Daily Energy</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Say goodbye to afternoon slumps. D-52's unique formula helps maintain consistent energy levels, allowing you to stay active and engaged from morning to night.
                                    </p>
                                </div>

                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Benefits:</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center space-x-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-[#f7fdfb] text-[#22c55e] rounded-full flex items-center justify-center shadow-sm border border-[#22c55e]/20">✓</span>
                                        <span className="text-gray-700">Clinically proven blood sugar support</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-[#f7fdfb] text-[#f59e0b] rounded-full flex items-center justify-center shadow-sm border border-[#f59e0b]/20">✓</span>
                                        <span className="text-gray-700">Sustained energy throughout the day</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-[#f7fdfb] text-[#22c55e] rounded-full flex items-center justify-center shadow-sm border border-[#22c55e]/20">✓</span>
                                        <span className="text-gray-700">Improved metabolic health</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-[#f7fdfb] text-[#f59e0b] rounded-full flex items-center justify-center shadow-sm border border-[#f59e0b]/20">✓</span>
                                        <span className="text-gray-700">Enhanced overall well-being</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Image Container */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 mix-blend-overlay"></div>
                            <img
                                src={about2}
                                alt="Happy senior couple enjoying healthy lifestyle"
                                className="w-full h-full object-cover  transform hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                <p className="text-white text-lg font-medium">
                                    "D-52 helped us maintain our active lifestyle and enjoy our retirement to the fullest!"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductSection = () => {
    return (
        <div className="w-full">
            <div className="w-full">
                <img src={stamp} alt="Stamp" className="w-screen h-auto" />
                {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center items-center mx-auto">
                    <div>
                        <img src={one} alt="Customer Trusted Brand 1" className="max-w-full h-auto" />
                    </div>
                    <div>
                        <img src={two} alt="Customer Trusted Brand 2" className="max-w-full h-auto" />
                    </div>
                    <div>
                        <img src={three} alt="Customer Trusted Brand 3" className="max-w-full h-auto" />
                    </div>
                    <div>
                        <img src={four} alt="Customer Trusted Brand 4" className="w-[8.5rem] h-auto" />
                    </div>
                </div> */}
            </div>
        </div>
    );
};

const Product = ({ currentLang, translations }) => {
    const productRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            title: "100% Natural Formula",
            description: "Made with pure herbal extracts and ayurvedic ingredients",
            color: "from-green-500 to-emerald-600"
        },
        {
            title: "Scientifically Proven",
            description: "Clinically tested and research-backed effectiveness",
            color: "from-blue-500 to-cyan-600"
        },
        {
            title: "Safe & Gentle",
            description: "No harmful side effects, suitable for long-term use",
            color: "from-purple-500 to-indigo-600"
        },
        {
            title: "Fast Results",
            description: "Notice improvements within the first few weeks",
            color: "from-orange-500 to-red-600"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature(prev => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={productRef} className="relative bg-gradient-to-br from-[#f7fdfb] via-[#e6f4ea] to-[#f7fdfb] py-20 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-100/20 to-emerald-100/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Enhanced Header Section */}
                <div className="text-center mb-16">
                    
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-green-700 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                            {translations[currentLang]?.product?.title || "D-52"}
                        </span>
                    </h1>
                    
                    <h2 className="text-2xl md:text-3xl font-semibold text-amber-700 mb-6">
                        {translations[currentLang]?.product?.subtitle || "Your Natural Path to Freedom"}
                    </h2>
                </div>

                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Product Image Side */}
                    <div className="relative">
                        <div 
                            className="relative group cursor-pointer"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Floating Background Card */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-blue-50 rounded-3xl shadow-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 rounded-3xl shadow-xl transform -rotate-2 group-hover:-rotate-3 transition-transform duration-500"></div>
                            
                            {/* Main Product Image */}
                            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 overflow-hidden">
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer group-hover:translate-x-full transition-transform duration-1000"></div>
                                
                                <img
                                    src={product}
                                    alt="D-52 - Natural Diabetes Support Formula"
                                    className={`w-full h-auto transform transition-all duration-500 ${isHovered ? 'scale-105 rotate-2' : 'scale-100'}`}
                                />
                                
                                {/* Product Badge */}
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#f59e0b] to-amber-500 text-white px-4 py-2 rounded-full shadow-lg">
                                    <span className="font-bold text-sm">✨ Premium Quality</span>
                                </div>
                                
                                {/* Trust Badges */}
                                <div className="absolute bottom-4 left-4 flex space-x-2">
                                    <div className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full text-xs font-semibold">FDA Approved</div>
                                    <div className="bg-[#22c55e] text-white px-3 py-1 rounded-full text-xs font-semibold">100% Natural</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold text-gray-800 leading-tight">
                                {translations[currentLang]?.product?.title2 || "Revolutionary Natural Formula for Diabetes Support"}
                            </h3>
                            
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p className="text-lg">
                                    {translations[currentLang]?.product?.content1 || "D-52 combines ancient Ayurvedic wisdom with modern scientific research to create a powerful, natural solution for diabetes support."}
                                </p>
                                <p className="text-lg">
                                    {translations[currentLang]?.product?.content2 || "Our carefully selected herbal ingredients work synergistically to reduce cravings, support liver health, and restore your body's natural balance."}
                                </p>
                            </div>
                        </div>

                        {/* Price Section */}
                        {/* <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-3xl font-bold text-green-700">₹3,990</div>
                                    <div className="text-lg text-gray-500 line-through">₹6,990</div>
                                </div>
                                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                                    Save 43%
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 mb-4">🚚 Free shipping | 💰 15-day money-back guarantee</div>
                        </div> */}

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="/product" className="flex-1">                                    <button className="w-full bg-gradient-to-r from-[#22c55e] to-emerald-500 text-white font-bold py-4 px-8 rounded-xl hover:from-emerald-600 hover:to-[#1e3a8a] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    Order Now - Start Your Journey
                                </button>
                            </a>
                            {/* <button className="flex-1 border-2 border-green-500 text-green-600 font-semibold py-4 px-8 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300">
                                📞 Call for Support
                            </button> */}
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center justify-center space-x-8 pt-6 border-t border-gray-200">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">10,000+</div>
                                <div className="text-sm text-gray-600">Happy Customers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">4.8/5</div>
                                <div className="text-sm text-gray-600">Customer Rating</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">95%</div>
                                <div className="text-sm text-gray-600">Success Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );
};

const Testimonials = ({ currentLang, translations }) => {
    const testimonials = translations[currentLang]?.testimonials?.testimonial || [];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-slide functionality
    useEffect(() => {
        if (!isHovered && testimonials.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prevSlide) => {
                    const nextSlide = prevSlide + 1;
                    if (nextSlide >= testimonials.length) {
                        return 0;
                    }
                    return nextSlide;
                });
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [testimonials.length, isHovered]);

    // Helper function to render star ratings
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }
        return stars;
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prevSlide) => 
            prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1
        );
    };

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => 
            prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
        );
    };

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    // Carousel logic: show 3 cards, center is active
    const getCarouselTestimonials = () => {
        if (testimonials.length <= 3) return testimonials;
        const prev = (currentSlide - 1 + testimonials.length) % testimonials.length;
        const next = (currentSlide + 1) % testimonials.length;
        return [testimonials[prev], testimonials[currentSlide], testimonials[next]];
    };
    const carouselTestimonials = getCarouselTestimonials();

    return (
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 py-20 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl"></div>
            </div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Real Success Stories
                        </span>
                    </h2>
                </div>
                {/* Carousel Showcase */}
                <div className="flex items-center justify-center gap-4 mb-12 select-none">
                    {/* Prev Arrow */}
                    <button 
                        onClick={goToPrevSlide}
                        className="w-12 h-12 bg-white/80 hover:bg-blue-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border-2 border-blue-200 hover:scale-110"
                    >
                        <ChevronLeft className="w-7 h-7 text-blue-700" />
                    </button>
                    {/* Cards */}
                    <div className="flex gap-0 md:gap-8 w-full max-w-3xl justify-center items-center relative">
                        {carouselTestimonials.map((testimonial, idx) => {
                            // Center card is active
                            const isActive = idx === 1;
                            return (
                                <div
                                    key={testimonial.name + testimonial.text}
                                    className={`relative transition-all duration-500 flex-1 mx-[-1rem] md:mx-0 ${isActive ? 'z-20 scale-105' : 'z-10 scale-95 opacity-70'} `}
                                    style={{
                                        boxShadow: isActive ? '0 8px 32px 0 rgba(80,80,200,0.18)' : '0 2px 8px 0 rgba(80,80,200,0.08)',
                                        filter: isActive ? 'blur(0)' : 'blur(0.5px)',
                                    }}
                                >
                                    <div className={`backdrop-blur-lg bg-white/60 border-2 ${isActive ? 'border-blue-400 shadow-xl' : 'border-blue-100'} rounded-3xl p-8 flex flex-col h-full transition-all duration-500`}> 
                                        {/* Stars */}
                                        <div className="flex items-center mb-4">
                                            {renderStars(testimonial.rating || 5)}
                                        </div>
                                        {/* Review Text */}
                                        <p className="text-gray-800 text-base leading-relaxed mb-6 italic font-medium">
                                            "{testimonial.text}"
                                        </p>
                                        {/* Customer Info */}
                                        <div className="flex items-center gap-4 mt-auto">
                                            <div className="w-14 h-14 rounded-full flex items-center justify-center ">
                                                <span className="text-white font-bold text-xl">
                                                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full rounded-full object-cover" />
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-blue-900 text-lg">{testimonial.name}</h4>
                                                <p className="text-sm text-blue-500 font-medium">{testimonial.location}</p>
                                            </div>
                                            {/* Verified badge */}
                                            <div className="ml-auto flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>Verified</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Next Arrow */}
                    <button 
                        onClick={goToNextSlide}
                        className="w-12 h-12 bg-white/80 hover:bg-blue-100 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border-2 border-blue-200 hover:scale-110"
                    >
                        <ChevronRight className="w-7 h-7 text-blue-700" />
                    </button>
                </div>
                {/* Slide Indicators */}
                <div className="flex justify-center gap-2 mb-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide 
                                    ? 'bg-blue-500 scale-125' 
                                    : 'bg-blue-200 hover:bg-blue-400'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


const UrgencyAndVideoSection = () => {
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
    const [stockCount, setStockCount] = useState(47);

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

    // Simulate stock decrease
    useEffect(() => {
        const stockTimer = setInterval(() => {
            setStockCount(prev => Math.max(15, prev - Math.floor(Math.random() * 2)));
        }, 30000);

        return () => clearInterval(stockTimer);
    }, []);

    return (
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Results Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Proven Results
                        </span>
                    </h2>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        See how D-52 has helped thousands maintain healthy blood sugar levels naturally
                    </p>
                </div>

                {/* Two Column Layout for Video and Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Chart Column */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-blue-200/20">
                        <h3 className="text-xl font-semibold text-blue-100 mb-4">Blood Sugar Level Improvement</h3>
                        <div className=" relative">
                            <img 
                                src={chart} 
                                alt="Blood Sugar Level Chart showing improvement over 30 days"
                                className="w-full h-full object-contain rounded-xl"
                            />
                        </div>
                        <div className="mt-4 text-blue-100 text-sm">
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span>
                                    Average 35% reduction in blood sugar levels
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span>
                                    Sustained improvement over 30 days
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span>
                                    95% of users report better glucose control
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Video Column */}
                    <div className="space-y-6">
                        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-2 sm:p-4 border border-blue-200/20 overflow-hidden group transition-all duration-300 hover:shadow-blue-400/30">
                            {/* Animated Border */}
                            <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent group-hover:border-blue-400 group-hover:shadow-lg transition-all duration-300" style={{zIndex:2}}></div>
                            {/* Video Container */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-white/10">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/A229dI97w_Q?rel=0&modestbranding=1&showinfo=0"
                                    title="D-52 - Natural Diabetes Support Formula"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{zIndex:3, position:'relative'}}
                                ></iframe>
                            </div>
                        </div>

                        {/* Customer Quote */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/20">
                            <blockquote className="text-blue-100 italic">
                                "Within just a month of using D-52, my blood sugar levels stabilized significantly. I feel more energetic and confident about my health."
                            </blockquote>
                            <div className="mt-2 text-sm text-blue-200">
                                - Ramesh K., Verified User
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-12 text-center">
                    <a href="/product" className="inline-block">
                        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                            Start Your Journey to Better Health
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};







const Home = ({ currentLang, translations }) => {
    return (
            <div>
                <div className='overflow-x-hidden'>
                    <Hero currentLang={currentLang} />
                    <Product currentLang={currentLang} translations={translations} />
                    <ProductSection currentLang={currentLang} />
                    <UrgencyAndVideoSection />
                    <FAQ currentLang={currentLang} translations={translations} />
                    <Testimonials currentLang={currentLang} translations={translations} />
                </div>
            </div>
        );
    };

export default Home;