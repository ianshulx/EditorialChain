import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [currentStreak, setCurrentStreak] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Load streak from localStorage
        const streak = localStorage.getItem('reading_streak') || '0';
        setCurrentStreak(parseInt(streak));
    }, []);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">EditorialChain</span>
                    </Link>

                    {/* Streak Display */}
                    <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
                        <span className="text-2xl">🔥</span>
                        <div>
                            <p className="text-xs text-gray-600">Streak</p>
                            <p className="text-lg font-bold text-orange-600">{currentStreak} days</p>
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                            Dashboard
                        </Link>
                        <Link to="/article" className="text-gray-700 hover:text-blue-600 font-medium">
                            Today's Article
                        </Link>
                        <Link to="/leaderboard" className="text-gray-700 hover:text-blue-600 font-medium">
                            Leaderboard
                        </Link>
                        <Link to="/settings" className="text-gray-700 hover:text-blue-600 font-medium">
                            Settings
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                            About
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                            Dashboard
                        </Link>
                        <Link to="/article" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                            Today's Article
                        </Link>
                        <Link to="/leaderboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                            Leaderboard
                        </Link>
                        <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                            Settings
                        </Link>
                        <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                            About
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
