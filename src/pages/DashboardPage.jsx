import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  // User stats from localStorage
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalArticlesRead, setTotalArticlesRead] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState([]);

  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [hasDailyGoal, setHasDailyGoal] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(2000);

  // Load user stats from localStorage
  useEffect(() => {
    const streak = parseInt(localStorage.getItem('readingStreak') || '0');
    const articles = parseInt(localStorage.getItem('totalArticlesRead') || '0');
    const progress = JSON.parse(localStorage.getItem('weeklyProgress') || '[]');

    setCurrentStreak(streak);
    setTotalArticlesRead(articles);
    setWeeklyProgress(progress);
  }, []);

  // Mock articles (replace with API or Firebase data)
  const articles = [
    {
      id: 1,
      title: 'Economic Survey 2024: Key Highlights and Analysis',
      preview: 'Key insights from the Economic Survey 2024 with analysis on GDP growth, inflation, and policy implications.',
      topic: 'Economics',
      source: 'The Hindu Editorial',
    },
    {
      id: 2,
      title: 'Climate Change and Sustainable Development Goals',
      preview: 'Analysis of climate change impacts and strategies to achieve sustainable development targets in India.',
      topic: 'Environment',
      source: 'Indian Express',
    },
    {
      id: 3,
      title: 'Digital India: Progress and Future Roadmap',
      preview: 'A look at Digital India initiatives and technology adoption, focusing on infrastructure and governance.',
      topic: 'Technology',
      source: 'PIB Analysis',
    },
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArticleIndex((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [articles.length]);

  const toggleDailyGoal = () => {
    setHasDailyGoal(!hasDailyGoal);
    if (!hasDailyGoal) setDailyGoal(2000); // default
  };

  const progress = hasDailyGoal ? Math.min((totalArticlesRead / dailyGoal) * 100, 100) : 0;

  const streakDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back to EditorialChain! 📚</h1>
        <p className="text-gray-600">Keep your reading streak alive and stay informed with daily editorials</p>
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
              <p className="text-sm font-medium text-gray-600">Daily Goal</p>
              <p className="text-3xl font-bold text-purple-600">{dailyGoal} words</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
          <button className="mt-2 text-sm text-blue-500 hover:underline" onClick={toggleDailyGoal}>
            {hasDailyGoal ? 'Remove Goal' : 'Set Daily Goal'}
          </button>
          {hasDailyGoal && (
            <div className="mt-2 w-full bg-gray-200 h-1 rounded-full">
              <div className="h-1 bg-green-400 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          )}
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Progress</h3>
        <div className="flex justify-between items-end h-32">
          {streakDays.map((day) => {
            const height = Math.random() * 80 + 20; // mock data
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

      {/* Article Carousel */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Today's Recommended Articles</h3>
          <button className="text-blue-600 hover:text-blue-800 font-medium">View All →</button>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentArticleIndex * 100}%)` }}
          >
            {articles.map((article) => (
              <div key={article.id} className="w-full flex-shrink-0 p-6">
                <h3 className="text-xl font-medium mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">
                  {article.preview.length > 150
                    ? article.preview.substring(0, 150) + '...'
                    : article.preview}
                </p>
                <span className="text-sm text-gray-500">{article.topic}</span>
                <p className="text-xs text-gray-400 mt-1">Source: {article.source}</p>
                <Link to="/article" className="block mt-2 text-blue-500 hover:underline">
                  Read Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
