import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock data (replace with real data from Firebase/Auth or API)
const mockUserStats = {
  streak: parseInt(localStorage.getItem('readingStreak') || '0'),
  totalWords: parseInt(localStorage.getItem('totalArticlesRead') || '0'),
  avgWordsPerDay: 2000,
};

const mockUser = {
  name: 'Kunal Sharma',
  email: 'kunal@example.com',
  summary: 'Avid reader and tech enthusiast passionate about learning and exploring new topics.',
};

const mockArticles = [
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

const DashboardPage = () => {
  const [stats, setStats] = useState(mockUserStats);
  const [articles, setArticles] = useState(mockArticles);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [hasDailyGoal, setHasDailyGoal] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(2000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArticleIndex((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length]);

  const toggleDailyGoal = () => {
    setHasDailyGoal(!hasDailyGoal);
    if (!hasDailyGoal) setDailyGoal(2000); // Default goal
  };

  const progress = hasDailyGoal ? Math.min((stats.avgWordsPerDay / dailyGoal) * 100, 100) : 0;

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-6 font-sans text-gray-800'>
      {/* Sidebar */}
      <aside className='fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col justify-between'>
        <div>
          <h1 className='text-2xl font-medium mb-8'>EditorialChain</h1>
          <div className='mb-6 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg'>
            <h3 className='text-lg font-medium text-indigo-700'>Welcome, {mockUser.name}</h3>
            <p className='text-sm text-gray-600'>{mockUser.email}</p>
            <p className='text-sm text-gray-600 mt-1'>{mockUser.summary}</p>
          </div>
          <nav className='flex flex-col space-y-4'>
            <Link to='/leaderboard' className='text-lg hover:text-indigo-600 transition-colors'>Leaderboard</Link>
            <Link to='/settings' className='text-lg hover:text-indigo-600 transition-colors'>Settings</Link>
            <Link to='/about' className='text-lg hover:text-indigo-600 transition-colors'>About</Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className='ml-64 p-6'>
        {/* Stats */}
        <section className='mb-12'>
          <h2 className='text-2xl font-medium mb-4'>Your Progress</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <h3 className='text-lg font-medium'>Current Streak</h3>
              <p className='text-3xl'>{stats.streak} days</p>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <h3 className='text-lg font-medium'>Total Words Read</h3>
              <p className='text-3xl'>{stats.totalWords.toLocaleString()}</p>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <h3 className='text-lg font-medium'>Avg Words/Day</h3>
              <p className='text-3xl'>{stats.avgWordsPerDay}</p>
              <button className='mt-2 text-sm text-blue-500 hover:underline' onClick={toggleDailyGoal}>
                {hasDailyGoal ? 'Remove Goal' : 'Set Daily Goal'}
              </button>
              {hasDailyGoal && (
                <div className='mt-2'>
                  <div className='w-full bg-gray-200 rounded-full h-1'>
                    <div className='bg-green-400 h-1 rounded-full' style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className='text-sm'>Goal: {dailyGoal}w | Progress: {progress.toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Article Carousel */}
        <section>
          <h2 className='text-2xl font-medium mb-4'>Recommended Daily Articles</h2>
          <div className='relative overflow-hidden rounded-lg shadow-md bg-white'>
            <div className='flex transition-transform duration-500 ease-in-out' style={{ transform: `translateX(-${currentArticleIndex * 100}%)` }}>
              {articles.map((article) => (
                <div key={article.id} className='w-full flex-shrink-0 p-6'>
                  <h3 className='text-xl font-medium mb-2'>{article.title}</h3>
                  <p className='text-gray-600 mb-4'>{article.preview.length > 150 ? article.preview.substring(0, 150) + '...' : article.preview}</p>
                  <span className='text-sm text-gray-500'>{article.topic}</span>
                  <p className='text-xs text-gray-400 mt-1'>Source: {article.source}</p>
                  <Link to='/article' className='block mt-2 text-blue-500 hover:underline'>Read Now</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
