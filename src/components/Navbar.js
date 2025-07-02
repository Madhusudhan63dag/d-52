import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/imagess/logo.webp';
import icons_one from '../assets/imagess/icon1.webp';
import icons_two from '../assets/imagess/icon2.webp';
import icons_three from '../assets/imagess/icon4.webp';
import icons_four from '../assets/imagess/icon3.webp';

const Navbar = ({ currentLang, setCurrentLang, translations, languages }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    console.log('Current Language:', currentLang);
    console.log('Translations:', translations);

    const nav = translations[currentLang]?.nav;

    console.log('Nav:', nav);

    if (!nav) {
        return null; // or some fallback UI
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isLangMenuOpen) setIsLangMenuOpen(false);
    };


    return (
        <>
            {/* Marquee Banner */}
            <div className="bg-black text-white py-2 relative overflow-hidden z-50">
                <style jsx>{`
                    @keyframes marquee {
                        0% { transform: translateX(100%); }
                        100% { transform: translateX(-100%); }
                    }
                    
                    .marquee {
                        animation: marquee 15s linear infinite;
                        white-space: nowrap;
                    }
                    
                    .marquee:hover {
                        animation-play-state: paused;
                    }
                `}</style>
                
                <div className="marquee">
                    <span className="text-sm font-medium flex items-center space-x-8">
                        <span className="flex items-center space-x-2">
                            <span>FREE SHIPPING ON ALL ORDERS</span>
                        </span>
                        <span className="flex items-center space-x-2">
                            <span>LIMITED TIME OFFER</span>
                        </span>
                        <span className="flex items-center space-x-2">
                            <span>100% SATISFACTION GUARANTEED</span>
                        </span>
                        <span className="flex items-center space-x-2">
                            <span>FAST & SECURE DELIVERY</span>
                        </span>
                    </span>
                </div>
            </div>

            <nav className={`relative z-50 transition-all duration-500 ${
                scrolled 
                    ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-sky-200/50' 
                    : 'bg-gradient-to-r from-sky-50/90 via-white/95 to-blue-50/90 backdrop-blur-md'
            }`}>
                {/* Enhanced Animation Keyframes */}
                <style jsx>{`
                    @keyframes floatIn {
                        0% { transform: translateY(-30px) scale(0.9); opacity: 0; }
                        50% { transform: translateY(-5px) scale(1.02); }
                        100% { transform: translateY(0) scale(1); opacity: 1; }
                    }
                    
                    @keyframes gentleFloat {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-4px); }
                    }
                    
                    @keyframes skyPulse {
                        0%, 100% { 
                            box-shadow: 0 0 20px rgba(14, 165, 233, 0.3);
                            transform: scale(1);
                        }
                        50% { 
                            box-shadow: 0 0 30px rgba(14, 165, 233, 0.5);
                            transform: scale(1.02);
                        }
                    }
                    
                    @keyframes gradientWave {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    
                    @keyframes cardHover {
                        0% { transform: translateY(0) scale(1); }
                        100% { transform: translateY(-2px) scale(1.05); }
                    }
                    
                    @keyframes ripple {
                        0% { transform: scale(0); opacity: 1; }
                        100% { transform: scale(4); opacity: 0; }
                    }
                    
                    .float-in { animation: floatIn 0.8s ease-out forwards; }
                    .gentle-float { animation: gentleFloat 3s ease-in-out infinite; }
                    .sky-pulse { animation: skyPulse 2s ease-in-out infinite; }
                    .gradient-wave { animation: gradientWave 6s ease infinite; }
                    
                    .nav-card {
                        position: relative;
                        background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,249,255,0.8));
                        border: 1px solid rgba(14, 165, 233, 0.2);
                        backdrop-filter: blur(10px);
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        overflow: hidden;
                    }
                    
                    .nav-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.1), transparent);
                        transition: left 0.5s ease;
                    }
                    
                    .nav-card:hover::before {
                        left: 100%;
                    }
                    
                    .nav-card:hover {
                        transform: translateY(-2px) scale(1.02);
                        box-shadow: 0 10px 25px rgba(14, 165, 233, 0.15);
                        border-color: rgba(14, 165, 233, 0.4);
                    }
                    
                    .logo-glow {
                        filter: drop-shadow(0 0 10px rgba(14, 165, 233, 0.3));
                        transition: all 0.3s ease;
                    }
                    
                    .logo-glow:hover {
                        filter: drop-shadow(0 0 20px rgba(14, 165, 233, 0.5));
                        transform: scale(1.05);
                    }
                    
                    .center-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                    }
                    
                    .nav-wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        max-width: 1000px;
                        width: 100%;
                        margin: 0 auto;
                        padding: 0 2rem;
                    }
                    
                    .mobile-menu-card {
                        background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,249,255,0.9));
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(14, 165, 233, 0.2);
                    }
                    
                    .ripple-effect {
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .ripple-effect::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 0;
                        height: 0;
                        border-radius: 50%;
                        background: rgba(14, 165, 233, 0.3);
                        transform: translate(-50%, -50%);
                        transition: width 0.3s, height 0.3s;
                    }
                    
                    .ripple-effect:active::after {
                        width: 300px;
                        height: 300px;
                    }
                    
                    @keyframes slideInFromRight {
                        0% { transform: translateX(100%); opacity: 0; }
                        100% { transform: translateX(0); opacity: 1; }
                    }
                    
                    .slide-in-right { animation: slideInFromRight 0.4s ease-out; }
                `}</style>

                <div className=" h-16 sm:h-20">
                    <div className="flex justify-between">
                        {/* Logo - Left aligned */}
                        <div className={`flex-shrink-0 ml-10 ${isLoaded ? 'float-in gentle-float' : 'opacity-0'}`}>
                            <a href={nav.homelink || "#"} className="block">
                                <div className="relative group">
                                    <div className="absolute -inset-3 bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-lg"></div>
                                    <img 
                                        src={logo} 
                                        alt="Dr. Joints Logo" 
                                        className="relative h-10 sm:h-14 md:h-16 logo-glow" 
                                    />
                                </div>
                            </a>
                        </div>

                        {/* Navigation - Center aligned */}
                        <div className="hidden md:flex items-center justify-center flex-1 mx-8">
                            <div className="flex items-center space-x-2">
                                <a href={nav.homelink || "#"}
                                    className={`nav-card flex px-6 py-3 rounded-xl text-gray-700 hover:text-sky-600 font-medium transition-all duration-300 ripple-effect ${isLoaded ? 'float-in' : 'opacity-0'}`}
                                    style={{animationDelay: '0.1s'}}>
                                    <img src={icons_four} alt="Contact Us Icon" className="h-5 w-5 mr-2 transition-transform duration-300" />
                                    <span className="relative z-10">{nav.home}</span>
                                </a>
                                
                                {/* <a href={nav.aboutUslink || "#"}
                                    className={`nav-card px-6 py-3 rounded-xl text-gray-700 hover:text-sky-600 font-medium transition-all duration-300 flex items-center space-x-2 ripple-effect ${isLoaded ? 'float-in' : 'opacity-0'}`}
                                    style={{animationDelay: '0.2s'}}>
                                    <img src={icons_two} alt="About Us Icon" className="h-5 w-5 transition-transform duration-300" />
                                    <span className="relative z-10">{nav.aboutUs}</span>
                                </a> */}
                                
                                <a href={nav.productlink || "#"}
                                    className={`nav-card px-6 py-3 rounded-xl text-gray-700 hover:text-sky-600 font-medium transition-all duration-300 flex items-center space-x-2 ripple-effect ${isLoaded ? 'float-in' : 'opacity-0'}`}
                                    style={{animationDelay: '0.3s'}}>
                                    <img src={icons_three} alt="Product Icon" className="h-5 w-5 transition-transform duration-300" />
                                    <span className="relative z-10">{nav.product}</span>
                                </a>
                                
                                <a href={nav.contactUslink || "#"}
                                    className={`nav-card px-6 py-3 rounded-xl text-gray-700 hover:text-sky-600 font-medium transition-all duration-300 flex items-center space-x-2 ripple-effect ${isLoaded ? 'float-in' : 'opacity-0'}`}
                                    style={{animationDelay: '0.4s'}}>
                                    <span className="relative z-10">{nav.contactUs}</span>
                                </a>
                            </div>
                        </div>

                        {/* Mobile menu - Right aligned */}
                        <div className="flex items-center space-x-4">
                            {/* Enhanced Mobile Menu Button */}
                            <div className={`md:hidden ${isLoaded ? 'float-in sky-pulse' : 'opacity-0'}`}>
                                <button onClick={toggleMenu} className="nav-card p-3 rounded-xl hover:bg-sky-50/50 transition-all duration-300 group" >
                                    <div className="relative">
                                        {isMenuOpen ? (
                                            <X size={24} className="text-sky-600 transition-all duration-300 group-hover:rotate-90" />
                                        ) : (
                                            <Menu size={24} className="text-sky-600 transition-all duration-300 group-hover:scale-110" />
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Mobile Navigation Menu */}
                {isMenuOpen && (
                    <>
                        <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={toggleMenu}></div>
                        <div className="md:hidden absolute top-full left-4 right-4 mobile-menu-card rounded-2xl z-50 shadow-2xl overflow-hidden">
                            <div className="p-6">
                                {/* Centered Menu Header */}
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-sky-600 mb-2">Navigation</h3>
                                    <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mx-auto"></div>
                                </div>

                                {/* Centered Menu Items */}
                                <div className="space-y-3">
                                    <a href={nav.homelink || "#"}
                                        className={`block text-center text-gray-700 hover:text-sky-600 px-6 py-4 rounded-xl nav-card transition-all duration-300 hover:bg-sky-50/50 ${isLoaded ? 'float-in' : 'opacity-0'}`}
                                        style={{animationDelay: '0.1s'}}>
                                        <img src={icons_four} alt="Contact Us Icon" className="h-6 w-6" />
                                        <span className="font-medium text-lg">{nav.home}</span>
                                    </a>
                                    
                                    {/* <a href={nav.aboutUslink || "#"}
                                        className={`block text-center text-gray-700 hover:text-sky-600 px-6 py-4 rounded-xl nav-card transition-all duration-300 hover:bg-sky-50/50 flex items-center justify-center space-x-3 ${isLoaded ? 'float-in' : 'opacity-0'}`}
                                        style={{animationDelay: '0.2s'}}>
                                        <img src={icons_two} alt="About Us Icon" className="h-6 w-6" />
                                        <span className="font-medium text-lg">{nav.aboutUs}</span>
                                    </a> */}
                                    
                                    <a href={nav.productlink || "#"}
                                        className={`block text-center text-gray-700 hover:text-sky-600 px-6 py-4 rounded-xl nav-card transition-all duration-300 hover:bg-sky-50/50 flex items-center justify-center space-x-3 ${isLoaded ? 'float-in' : 'opacity-0'}`}
                                        style={{animationDelay: '0.3s'}}>
                                        <img src={icons_three} alt="Product Icon" className="h-6 w-6" />
                                        <span className="font-medium text-lg">{nav.product}</span>
                                    </a>
                                    
                                    <a href={nav.contactUslink || "#"}
                                        className={`block text-center text-gray-700 hover:text-sky-600 px-6 py-4 rounded-xl nav-card transition-all duration-300 hover:bg-sky-50/50 flex items-center justify-center space-x-3 ${isLoaded ? 'float-in' : 'opacity-0'}`}
                                        style={{animationDelay: '0.4s'}}>
                                        <span className="font-medium text-lg">{nav.contactUs}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </>
    );
};

export default Navbar;