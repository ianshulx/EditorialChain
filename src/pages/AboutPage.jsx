import React from 'react';

const AboutPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 md:p-12 text-white mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">EditorialChain</h1>
                <p className="text-xl md:text-2xl opacity-90">
                    AI-Based Reading Habit Platform for Aspirants
                </p>
            </div>

            {/* Mission Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Our Mission
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                    EditorialChain is designed to help students and exam aspirants (UPSC, SSC, Bank exams, and more) 
                    build consistent reading habits through gamification and personalized content. We believe that 
                    regular reading of quality editorials and articles is crucial for exam preparation and personal growth.
                </p>
            </div>

            {/* Platform Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white text-center">
                    <div className="text-4xl font-bold mb-2">1000+</div>
                    <div className="text-blue-100 text-sm">Active Users</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white text-center">
                    <div className="text-4xl font-bold mb-2">500+</div>
                    <div className="text-green-100 text-sm">Daily Articles</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white text-center">
                    <div className="text-4xl font-bold mb-2">10K+</div>
                    <div className="text-purple-100 text-sm">Reading Hours</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white text-center">
                    <div className="text-4xl font-bold mb-2">98%</div>
                    <div className="text-orange-100 text-sm">Satisfaction Rate</div>
                </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                        <div className="bg-blue-100 rounded-lg p-3 mr-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-1">Reading Streak Tracker</h3>
                            <p className="text-gray-600 text-sm">Maintain daily reading consistency and track your progress</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-purple-100 rounded-lg p-3 mr-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-1">Editorial Feed</h3>
                            <p className="text-gray-600 text-sm">Curated articles from trusted sources via public APIs</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-green-100 rounded-lg p-3 mr-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-1">Smart Recommendations</h3>
                            <p className="text-gray-600 text-sm">Personalized content based on your interests</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-yellow-100 rounded-lg p-3 mr-4">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-1">Vocabulary Builder</h3>
                            <p className="text-gray-600 text-sm">Learn important words with definitions and context</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Tech Stack</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['React', 'Tailwind CSS', 'Context API', 'NewsAPI'].map(tech => (
                        <div key={tech} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-center">
                            <p className="font-semibold text-gray-700">{tech}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What Users Say</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                R
                            </div>
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800">Rahul Kumar</p>
                                <p className="text-sm text-gray-600">UPSC Aspirant</p>
                            </div>
                        </div>
                        <p className="text-gray-700 italic">
                            "EditorialChain helped me maintain a 45-day reading streak. The vocabulary feature is amazing!"
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-200">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                P
                            </div>
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800">Priya Sharma</p>
                                <p className="text-sm text-gray-600">SSC Aspirant</p>
                            </div>
                        </div>
                        <p className="text-gray-700 italic">
                            "The daily articles and gamification keep me motivated. Highly recommended for serious aspirants!"
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                A
                            </div>
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800">Amit Patel</p>
                                <p className="text-sm text-gray-600">Bank PO Aspirant</p>
                            </div>
                        </div>
                        <p className="text-gray-700 italic">
                            "Best platform for building consistent reading habits. The leaderboard feature is very competitive!"
                        </p>
                    </div>
                </div>
            </div>

            {/* Open Source */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-8 h-8 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Open Source Initiative
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    This project was born during Hacktoberfest and continues to evolve with community contributions. 
                    We welcome developers to contribute to UI improvements, API integrations, streak logic, 
                    personalization features, and more.
                </p>
                <a 
                    href="https://github.com/ianshulx/EditorialChain" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800"
                >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                </a>
            </div>

            {/* Goal */}
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Goal</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                    Help students and aspirants stay consistent with daily reading through a React-powered, 
                    API-based, and open-source platform. By combining technology with motivation, we aim to 
                    create a community of learners who support each other in their journey towards success.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
