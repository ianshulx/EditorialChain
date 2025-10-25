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

    // Timer for reading time
    useEffect(() => {
        let timer;
        if (isReading) {
            timer = setInterval(() => setReadingTime(prev => prev + 1), 1000);
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
            setSelectedWord({ word, definition: vocabularyWords[word] });
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

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Add your full article layout here */}
            {/* You already have the reading time, categories, vocabulary highlights, and share/bookmark functionality */}
        </div>
    );
};

export default DailyArticlePage;
