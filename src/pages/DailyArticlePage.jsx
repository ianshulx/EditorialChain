import React, { useState, useEffect } from 'react';

const DailyArticlePage = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [readingTime, setReadingTime] = useState(0);
    const [isReading, setIsReading] = useState(false);
    const [showVocabulary, setShowVocabulary] = useState(true);
    const [selectedWord, setSelectedWord] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);

    const categories = [
        { id: 'all', name: 'All Topics', icon: '🌐' },
        { id: 'politics', name: 'Politics', icon: '🏛️' },
        { id: 'technology', name: 'Technology', icon: '💻' },
        { id: 'science', name: 'Science', icon: '🔬' },
        { id: 'education', name: 'Education', icon: '📚' },
        { id: 'economy', name: 'Economy', icon: '💰' },
        { id: 'environment', name: 'Environment', icon: '🌱' }
    ];

    const vocabularyWords = {
        'artificial': 'Made or produced by human beings rather than occurring naturally',
        'integration': 'The action or process of combining two or more things',
        'personalized': 'Designed or produced to meet someone\'s individual requirements',
        'automated': 'Converted to be operated by largely automatic equipment',
        'algorithmic': 'Relating to or using a set of rules to solve a problem',
        'ethical': 'Relating to moral principles or the branch of knowledge dealing with these'
    };

    useEffect(() => {
        setTimeout(() => {
            setArticle({
                title: "The Future of Artificial Intelligence in Education",
                source: "The Guardian",
                author: "Jane Doe",
                date: new Date().toLocaleDateString(),
                content: `Artificial intelligence is rapidly transforming the educational landscape. From personalized learning experiences to automated grading systems, AI is reshaping how students learn and teachers teach.

The integration of AI in education offers numerous benefits. Personalized learning paths can adapt to individual student needs, ensuring that each learner receives appropriate challenges and support. Intelligent tutoring systems can provide immediate feedback, helping students understand concepts more effectively.

However, the rise of AI in education also raises important questions. How do we ensure that technology enhances rather than replaces human interaction? What role should educators play in an increasingly automated environment? These are questions that educators, policymakers, and technologists must address together.

The key to successful AI integration lies in finding the right balance. Technology should serve as a tool to empower teachers and enhance student learning, not as a replacement for human expertise and empathy. As we move forward, collaboration between educators and AI developers will be crucial in creating systems that truly benefit learners.

Moreover, ethical considerations must guide the development and deployment of AI in educational settings. Privacy concerns, data security, and algorithmic bias are critical issues that require careful attention. Educational institutions must establish clear policies and guidelines to protect students while leveraging the benefits of AI technology.

Looking ahead, the future of AI in education appears promising. With thoughtful implementation and ongoing evaluation, AI has the potential to make quality education more accessible and effective for students worldwide.`
            });
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        let timer;
        if (isReading) {
            timer = setInterval(() => {
                setReadingTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isReading]);

    useEffect(() => {
        if (article) setIsReading(true);
        return () => setIsReading(false);
    }, [article]);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
            setReadingProgress(Math.min(progress, 100));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const highlightVocabulary = (text) => {
        if (!showVocabulary) return text;
        let highlightedText = text;
        Object.keys(vocabularyWords).forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            highlightedText = highlightedText.replace(regex, (match) => 
                `<span class="vocabulary-word cursor-pointer text-blue-600 font-semibold border-b-2 border-blue-300 hover:bg-blue-50" data-word="${match.toLowerCase()}">${match}</span>`
            );
        });
        return highlightedText;
    };

    const handleWordClick = (e) => {
        if (e.target.classList.contains('vocabulary-word')) {
            const word = e.target.getAttribute('data-word');
            setSelectedWord({
                word: word,
                definition: vocabularyWords[word]
            });
        }
    };

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        const bookmarks = JSON.parse(localStorage.getItem('bookmarked_articles') || '[]');
        if (!isBookmarked) {
            bookmarks.push({ title: article.title, date: article.date, source: article.source });
        } else {
            const filtered = bookmarks.filter(b => b.title !== article.title);
            localStorage.setItem('bookmarked_articles', JSON.stringify(filtered));
            return;
        }
        localStorage.setItem('bookmarked_articles', JSON.stringify(bookmarks));
    };

    const shareArticle = (platform) => {
        const url = window.location.href;
        const text = `Check out this article: ${article.title}`;
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
        };
        if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        } else {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
        setShowShareMenu(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <>
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
                <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Category Filter */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-3">Filter by Category</h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                    selectedCategory === cat.id ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <span className="mr-2">{cat.icon}</span>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reading Time */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-sm text-gray-600">Reading Time</p>
                            <p className="text-2xl font-bold text-blue-600">{formatTime(readingTime)}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsReading(!isReading)}
                        className={`px-4 py-2 rounded-lg font-medium ${isReading ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                    >
                        {isReading ? 'Pause' : 'Resume'}
                    </button>
                </div>

                {/* Vocabulary Toggle */}
                <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="font-medium text-gray-700">Vocabulary Highlights</span>
                    </div>
                    <button
                        onClick={() => setShowVocabulary(!showVocabulary)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showVocabulary ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showVocabulary ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                {/* Vocabulary Modal */}
                {selectedWord && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-gray-900 capitalize">{selectedWord.word}</h3>
                                <button onClick={() => setSelectedWord(null)} className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{selectedWord.definition}</p>
                            <button onClick={() => setSelectedWord(null)} className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                                Got it!
                            </button>
                        </div>
                    </div>
                )}

                {/* Article */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="border-b pb-6 mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-4xl font-bold text-gray-900 flex-1">{article.title}</h1>
                            <div className="flex gap-2 ml-4">
                                {/* Bookmark */}
                                <button onClick={toggleBookmark} className="p-3 rounded-full hover:bg-gray-100 transition-colors" title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}>
                                    {isBookmarked ? (
                                        <svg className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                                    )}
                                </button>

                                {/* Share */}
                                <div className="relative">
                                    <button onClick={() => setShowShareMenu(!showShareMenu)} className="p-3 rounded-full hover:bg-gray-100 transition-colors" title="Share article">
                                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                    </button>
                                    {showShareMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                                            <button onClick={() => shareArticle('twitter')} className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"><span className="mr-2">🐦</span>Twitter</button>
                                            <button onClick={() => shareArticle('facebook')} className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"><span className="mr-2">📘</span>Facebook</button>
                                            <button onClick={() => shareArticle('linkedin')} className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"><span className="mr-2">💼</span>LinkedIn</button>
                                            <button onClick={() => shareArticle('whatsapp')} className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"><span className="mr-2">💬</span>WhatsApp</button>
                                            <hr className="my-2"/>
                                            <button onClick={() => shareArticle('copy')} className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"><span className="mr-2">📋</span>Copy Link</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm space-x-4">
                            <span className="font-medium">{article.source}</span>
                            <span>•</span>
                            <span>{article.author}</span>
                            <span>•</span>
                            <span>{article.date}</span>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none" onClick={handleWordClick}>
                        {article.content.split('\n\n').map((para, idx) => (
                            <p key={idx} className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: highlightVocabulary(para) }} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DailyArticlePage;
