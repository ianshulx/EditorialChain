import React, { useState, useEffect, useMemo } from 'react';
import { Search, Globe, Calendar, TrendingUp, BookOpen, User, ChevronRight, ChevronLeft, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext.jsx';

const DailyArticlePage = () => {
  const { theme } = useAppContext();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('in');
  const [activeCategory, setActiveCategory] = useState('top');
  const [searchInput, setSearchInput] = useState('');
  const [nextPage, setNextPage] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [timer, setTimer] = useState(0);

  const fallbackImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=800&fit=crop';

  const countries = [
    { code: 'in', name: 'India', flag: '🇮🇳' },
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
    { code: 'ca', name: 'Canada', flag: '🇨🇦' }
  ];

  const categories = [
    { id: 'top', label: 'Top Stories', icon: TrendingUp },
    { id: 'business', label: 'Business', icon: TrendingUp },
    { id: 'entertainment', label: 'Entertainment', icon: BookOpen },
    { id: 'environment', label: 'Environment', icon: Globe },
    { id: 'food', label: 'Food', icon: BookOpen },
    { id: 'health', label: 'Health', icon: BookOpen },
    { id: 'politics', label: 'Politics', icon: Globe },
    { id: 'science', label: 'Science', icon: BookOpen },
    { id: 'sports', label: 'Sports', icon: TrendingUp },
    { id: 'technology', label: 'Technology', icon: BookOpen },
    { id: 'tourism', label: 'Tourism', icon: Globe },
    { id: 'world', label: 'World', icon: Globe },
  ];

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [searchQuery, selectedCountry, activeCategory]);

  const fetchArticles = async (pageToken = null) => {
    if (!pageToken) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const apiKey = import.meta.env.VITE_NEWS_DATA_API_KEY;
      let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${selectedCountry}&language=en`;
      
      if (searchQuery) {
        url += `&q=${encodeURIComponent(searchQuery)}`;
      }
      
      if (activeCategory !== 'top') {
        url += `&category=${activeCategory}`;
      }

      if (pageToken) {
        url += `&page=${pageToken}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'success') {
        if (pageToken) {
          setArticles(prev => [...prev, ...(data.results || [])]);
        } else {
          setArticles(data.results || []);
        }
        setNextPage(data.nextPage || null);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreArticles = () => {
    if (nextPage && !loadingMore) {
      fetchArticles(nextPage);
    }
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const getAuthorName = (creators) => {
    if (!creators || creators.length === 0) return null;
    return creators[0];
  };

  const formattedTimer = useMemo(() => formatTime(timer), [timer]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'}`} style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Search Bar */}
      <div className={`${theme === 'dark' ? 'bg-gradient-to-r from-blue-700 to-indigo-700' : 'bg-gradient-to-r from-blue-600 to-indigo-600'} py-12`}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-white'} mb-6 text-center`} style={{ fontFamily: "'Libertinus Serif', serif" }}>
            Discover Today's Stories
          </h2>
          <div className="relative">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search articles by keywords..."
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-none shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${theme === 'dark' ? 'bg-gray-700 text-gray-200 placeholder-gray-400' : 'text-slate-700'}`}
              />
              <button
                onClick={handleSearch}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2 rounded-lg transition-colors`}
              >
                Search
              </button>
            </div>
          </div>
          {searchQuery && (
            <div className="mt-4 text-center">
              <span className={`inline-block ${theme === 'dark' ? 'bg-gray-700/50 text-gray-300' : 'bg-white/20 text-white'} px-4 py-2 rounded-full text-sm`}>
                Showing results for: <strong>{searchQuery}</strong>
                <button
                  onClick={() => { setSearchQuery(''); setSearchInput(''); }}
                  className={`ml-2 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-white/80 hover:text-white'}`}
                >
                  ✕
                </button>
              </span>
            </div>
          )}
        </div>
        
        {/* Country Selector & Timer */}
        <div className="flex items-center justify-center space-x-4 mt-6">
          <div className="flex items-center space-x-2">
            <Globe className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-white/80'}`} />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className={`${theme === 'dark' ? 'bg-gray-700/50 border-gray-600 text-gray-200' : 'bg-white/20 border-white/30 text-white'} backdrop-blur-sm border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50`}
            >
              {countries.map(country => (
                <option key={country.code} value={country.code} className={theme === 'dark' ? 'text-gray-200 bg-gray-700' : 'text-slate-800'}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className={`flex items-center space-x-2 ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600 text-gray-200' : 'bg-white/20 border-white/30 text-white'} backdrop-blur-sm border rounded-lg px-4 py-2 text-sm`}>
            <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-white/80'}`} />
            <span className="font-mono tabular-nums">{formattedTimer}</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeCategory === category.id
                      ? theme === 'dark' 
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-blue-600 text-white shadow-md'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className={`animate-spin rounded-full h-12 w-12 border-4 ${theme === 'dark' ? 'border-blue-400 border-t-transparent' : 'border-blue-600 border-t-transparent'}`}></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className={`w-16 h-16 ${theme === 'dark' ? 'text-gray-600' : 'text-slate-300'} mx-auto mb-4`} />
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>No articles found</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'} mt-2`}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {articles[0] && (
              <div className={`mb-12 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow border ${theme === 'dark' ? 'border-gray-700' : ''}`}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-80 md:h-auto overflow-hidden">
                    <img
                      src={articles[0].image_url || fallbackImage}
                      alt={articles[0].title}
                      onError={handleImageError}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      FEATURED
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-blue-400 bg-blue-900/50' : 'text-blue-600 bg-blue-50'} px-3 py-1 rounded-full`}>
                        {articles[0].category?.[0] || 'News'}
                      </span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'} flex items-center`}>
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(articles[0].pubDate)}
                      </span>
                    </div>
                    <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-slate-800'} mb-4 leading-tight`} style={{ fontFamily: "'Libertinus Serif', serif" }}>
                      {articles[0].title}
                    </h2>
                    {articles[0].description && (
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'} mb-6 line-clamp-3 leading-relaxed`}>
                        {articles[0].description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {getAuthorName(articles[0].creator) && (
                          <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'} flex items-center mb-1`}>
                            <User className="w-3 h-3 mr-1" />
                            {getAuthorName(articles[0].creator)}
                          </span>
                        )}
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                          {articles[0].source_name}
                        </span>
                      </div>
                      <a
                        href={articles[0].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium`}
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(1).map((article, index) => (
                <article
                  key={article.article_id || index}
                  className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:shadow-blue-900/40' : 'bg-white'} rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}
                >
                  <div className={`relative h-48 overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <img
                      src={article.image_url || fallbackImage}
                      alt={article.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-gray-300 bg-gray-700' : 'text-slate-600 bg-slate-100'} px-2 py-1 rounded`}>
                        {article.category?.[0] || 'News'}
                      </span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                        {formatDate(article.pubDate)}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-slate-800'} mb-3 line-clamp-2 leading-tight`} style={{ fontFamily: "'Libertinus Serif', serif" }}>
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'} mb-4 line-clamp-3 leading-relaxed`}>
                        {article.description}
                      </p>
                    )}
                    <div className={`flex items-center justify-between pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-slate-100'}`}>
                      <div className="flex flex-col flex-1 mr-2">
                        {getAuthorName(article.creator) && (
                          <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'} flex items-center mb-1 truncate`}>
                            <User className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{getAuthorName(article.creator)}</span>
                          </span>
                        )}
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'} truncate`}>
                          {article.source_name}
                        </span>
                      </div>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} text-sm font-medium whitespace-nowrap`}
                      >
                        Read →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {nextPage && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMoreArticles}
                  disabled={loadingMore}
                  className={`flex items-center space-x-2 ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>Load More Articles</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default DailyArticlePage;