import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        darkMode: false,
        vocabularyHighlights: true,
        readingReminders: true,
        topics: {
            politics: true,
            technology: true,
            science: true,
            education: true,
            economy: false,
            environment: true
        },
        readingGoal: 15, // minutes per day
        notifications: true
    });

    useEffect(() => {
        // Load settings from localStorage
        const savedSettings = localStorage.getItem('editorialchain_settings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    const updateSetting = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        localStorage.setItem('editorialchain_settings', JSON.stringify(newSettings));
    };

    const updateTopicPreference = (topic) => {
        const newTopics = { ...settings.topics, [topic]: !settings.topics[topic] };
        updateSetting('topics', newTopics);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

            {/* Appearance Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    Appearance
                </h2>
                
                <div className="flex items-center justify-between py-3 border-b">
                    <div>
                        <p className="font-medium text-gray-700">Dark Mode</p>
                        <p className="text-sm text-gray-500">Switch to dark theme for comfortable reading</p>
                    </div>
                    <button
                        onClick={() => updateSetting('darkMode', !settings.darkMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                </div>

                <div className="py-4">
                    <label className="block font-medium text-gray-700 mb-2">
                        Reading Font Size
                    </label>
                    <div className="flex items-center space-x-4">
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <span className="text-sm">A</span>
                        </button>
                        <button className="px-3 py-2 border-2 border-blue-500 bg-blue-50 rounded-lg">
                            <span className="text-base font-medium">A</span>
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <span className="text-lg">A</span>
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <span className="text-xl">A</span>
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Choose your preferred reading text size</p>
                </div>
            </div>

            {/* Reading Preferences Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Reading Preferences
                </h2>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                        <div>
                            <p className="font-medium text-gray-700">Vocabulary Highlights</p>
                            <p className="text-sm text-gray-500">Highlight important words with definitions</p>
                        </div>
                        <button
                            onClick={() => updateSetting('vocabularyHighlights', !settings.vocabularyHighlights)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.vocabularyHighlights ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.vocabularyHighlights ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                        </button>
                    </div>

                    <div className="py-3">
                        <label className="block font-medium text-gray-700 mb-2">
                            Daily Reading Goal (minutes)
                        </label>
                        <input
                            type="range"
                            min="5"
                            max="60"
                            step="5"
                            value={settings.readingGoal}
                            onChange={(e) => updateSetting('readingGoal', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                            <span>5 min</span>
                            <span className="font-semibold text-blue-600">{settings.readingGoal} min</span>
                            <span>60 min</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Topic Preferences Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Topic Preferences
                </h2>
                <p className="text-sm text-gray-600 mb-4">Select topics you're interested in reading about</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.keys(settings.topics).map(topic => (
                        <button
                            key={topic}
                            onClick={() => updateTopicPreference(topic)}
                            className={`px-4 py-3 rounded-lg border-2 font-medium capitalize transition-all ${
                                settings.topics[topic]
                                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                                    : 'bg-gray-50 border-gray-300 text-gray-600 hover:border-gray-400'
                            }`}
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Notifications
                </h2>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                        <div>
                            <p className="font-medium text-gray-700">Daily Reading Reminders</p>
                            <p className="text-sm text-gray-500">Get notified to maintain your streak</p>
                        </div>
                        <button
                            onClick={() => updateSetting('readingReminders', !settings.readingReminders)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.readingReminders ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.readingReminders ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium text-gray-700">Push Notifications</p>
                            <p className="text-sm text-gray-500">Receive updates about new articles</p>
                        </div>
                        <button
                            onClick={() => updateSetting('notifications', !settings.notifications)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.notifications ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.notifications ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 shadow-md">
                    Save Changes
                </button>
            </div>

            {/* Reading Statistics */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-8 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Your Reading Statistics
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-1">7</div>
                        <div className="text-sm text-gray-600">Current Streak</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-1">42</div>
                        <div className="text-sm text-gray-600">Articles Read</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-1">12h</div>
                        <div className="text-sm text-gray-600">Total Time</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-1">156</div>
                        <div className="text-sm text-gray-600">Words Learned</div>
                    </div>
                </div>
            </div>

            {/* Data Management */}
            <div className="bg-white rounded-lg shadow-md p-8 mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Data Management
                </h2>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-700">Export Your Data</p>
                            <p className="text-sm text-gray-500">Download all your reading history and statistics</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                            Export Data
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-700">Reset Preferences</p>
                            <p className="text-sm text-gray-500">Restore all settings to default values</p>
                        </div>
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 font-medium">
                            Reset
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                        <div>
                            <p className="font-medium text-red-700">Delete Account</p>
                            <p className="text-sm text-red-600">Permanently remove your account and all data</p>
                        </div>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
