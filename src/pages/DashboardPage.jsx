import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const [streak, setStreak] = useState(7);
    const [todayRead, setTodayRead] = useState(false);
    const [stats, setStats] = useState({
        articlesRead: 42,
        totalMinutes: 720,
        wordsLearned: 156,
        currentStreak: 7,
        longestStreak: 15
    });

    useEffect(() => {
        // Load user data from localStorage
        const savedStreak = localStorage.getItem('reading_streak') || '7';
        const savedStats = localStorage.getItem('user_stats');
        if (savedStats) {
            setStats(JSON.parse(savedStats));
        }
        setStreak(parseInt(savedStreak));

        // Check if user read today
        const lastReadDate = localStorage.getItem('last_read_date');
        const today = new Date().toDateString();
        setTodayRead(lastReadDate === today);
    }, []);

    const progressPercentage = Math.min((stats.articlesRead / 50) * 100, 100);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
                <p className="text-gray-600 text-lg">Keep up your reading streak and continue learning</p>
            </div>

            {/* Streak Card */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-8 mb-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-orange-100 mb-2">Current Streak</p>
                        <div className="flex items-center space-x-3">
                            <span className="text-6xl">🔥</span>
                            <div>
                                <p className="text-5xl font-bold">{streak}</p>
                                <p className="text-xl text-orange-100">days</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-orange-100 mb-2">Longest Streak</p>
                        <p className="text-3xl font-bold">{stats.longestStreak} days</p>
                    </div>
                </div>
                {!todayRead && (
                    <div className="mt-6 bg-white bg-opacity-20 rounded-lg p-4 flex items-center justify-between">
                        <p className="font-medium">Read today's article to maintain your streak!</p>
                        <Link 
                            to="/article" 
                            className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50"
                        >
                            Read Now
                        </Link>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">Articles Read</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.articlesRead}</p>
                        </div>
                        <div className="bg-blue-100 rounded-full p-3">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">Reading Time</p>
                            <p className="text-3xl font-bold text-gray-900">{Math.floor(stats.totalMinutes / 60)}h</p>
                        </div>
                        <div className="bg-green-100 rounded-full p-3">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">Words Learned</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.wordsLearned}</p>
                        </div>
                        <div className="bg-purple-100 rounded-full p-3">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">Current Streak</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.currentStreak}</p>
                        </div>
                        <div className="bg-yellow-100 rounded-full p-3">
                            <span className="text-3xl">🔥</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Reading Goal Progress */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Reading Goal</h3>
                    <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>{stats.articlesRead} / 50 articles</span>
                            <span>{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">
                        Keep going! You're {50 - stats.articlesRead} articles away from your monthly goal.
                    </p>
                </div>

                {/* Weekly Activity */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">This Week's Activity</h3>
                    <div className="flex justify-between items-end h-32">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                            const height = Math.random() * 100;
                            return (
                                <div key={day} className="flex flex-col items-center flex-1">
                                    <div className="w-full flex items-end justify-center h-24">
                                        <div 
                                            className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg"
                                            style={{ height: `${height}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-600 mt-2">{day}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link 
                        to="/article" 
                        className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-shadow border-2 border-blue-200"
                    >
                        <div className="bg-blue-500 rounded-lg p-3 mr-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Read Today's Article</p>
                            <p className="text-sm text-gray-600">Continue your streak</p>
                        </div>
                    </Link>

                    <Link 
                        to="/leaderboard" 
                        className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:shadow-md transition-shadow border-2 border-green-200"
                    >
                        <div className="bg-green-500 rounded-lg p-3 mr-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">View Leaderboard</p>
                            <p className="text-sm text-gray-600">See top readers</p>
                        </div>
                    </Link>

                    <Link 
                        to="/settings" 
                        className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition-shadow border-2 border-purple-200"
                    >
                        <div className="bg-purple-500 rounded-lg p-3 mr-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Customize Settings</p>
                            <p className="text-sm text-gray-600">Personalize experience</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-xl p-8 text-white text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-indigo-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-2xl font-semibold mb-2">
                    "Reading is to the mind what exercise is to the body."
                </p>
                <p className="text-indigo-200">- Joseph Addison</p>
            </div>
        </div>
    );
};

export default DashboardPage;
