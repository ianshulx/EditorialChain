import React, { useState, useEffect } from 'react';

const DashboardPage = () => {
    const [currentStreak, setCurrentStreak] = useState(0);
    const [totalArticlesRead, setTotalArticlesRead] = useState(0);
    const [weeklyProgress, setWeeklyProgress] = useState([]);
    
    useEffect(() => {
        // Load data from localStorage
        const streak = parseInt(localStorage.getItem('readingStreak') || '0');
        const articles = parseInt(localStorage.getItem('totalArticlesRead') || '0');
        const progress = JSON.parse(localStorage.getItem('weeklyProgress') || '[]');
        
        setCurrentStreak(streak);
        setTotalArticlesRead(articles);
        setWeeklyProgress(progress);
    }, []);

    const todayArticles = [
        {
            id: 1,
            title: "Economic Survey 2024: Key Highlights and Analysis",
            source: "The Hindu Editorial",
            readTime: "8 min read",
            category: "Economics"
        },
        {
            id: 2,
            title: "Climate Change and Sustainable Development Goals",
            source: "Indian Express",
            readTime: "6 min read",
            category: "Environment"
        },
        {
            id: 3,
            title: "Digital India: Progress and Future Roadmap",
            source: "PIB Analysis",
            readTime: "10 min read",
            category: "Technology"
        }
    ];

    const streakDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Welcome back to EditorialChain! 📚
                    </h1>
                    <p className="text-gray-600">
                        Keep your reading streak alive and stay informed with daily editorials
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                                <p className="text-3xl font-bold text-blue-600">{currentStreak}</p>
                                <p className="text-sm text-gray-500">days</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <span className="text-2xl">🔥</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Articles Read</p>
                                <p className="text-3xl font-bold text-green-600">{totalArticlesRead}</p>
                                <p className="text-sm text-gray-500">total</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <span className="text-2xl">📖</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">This Week</p>
                                <p className="text-3xl font-bold text-purple-600">5</p>
                                <p className="text-sm text-gray-500">articles</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <span className="text-2xl">⭐</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Weekly Progress */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Progress</h3>
                    <div className="flex justify-between items-end h-32">
                        {streakDays.map((day, index) => {
                            const height = Math.random() * 80 + 20; // Mock data
                            return (
                                <div key={day} className="flex flex-col items-center">
                                    <div 
                                        className="bg-blue-500 rounded-t-md w-8 transition-all duration-300 hover:bg-blue-600"
                                        style={{ height: `${height}px` }}
                                    ></div>
                                    <span className="text-sm text-gray-600 mt-2">{day}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Today's Recommended Articles */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">Today's Recommended Articles</h3>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                            View All →
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        {todayArticles.map(article => (
                            <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                                        {article.title}
                                    </h4>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                                        {article.category}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span>{article.source}</span>
                                    <span>{article.readTime}</span>
                                </div>
                                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
                                    Start Reading
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
