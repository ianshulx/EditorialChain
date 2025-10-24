import React from 'react';

const CollaboratorPage = () => {
    const collaborators = [
        {
            name: 'kuNA78-hub',
            role: 'Core Developer',
            contributions: 'Initial project setup, Home/Dashboard & Leaderboard pages',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kuNA78',
            github: 'https://github.com/kuNA78-hub'
        },
        {
            name: 'RishikaGupta915',
            role: 'Frontend Developer',
            contributions: 'Auth/Profile section implementation',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RishikaGupta915',
            github: 'https://github.com/RishikaGupta915'
        },
        {
            name: 'anupa-rb',
            role: 'UI/UX Designer',
            contributions: 'Design and frontend development',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anupa',
            github: 'https://github.com/anupa-rb'
        },
        {
            name: 'ashvin2005',
            role: 'Frontend Developer',
            contributions: 'React component development',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ashvin',
            github: 'https://github.com/ashvin2005'
        },
        {
            name: 'ianshulx',
            role: 'Project Maintainer',
            contributions: 'Project ideation, management, and coordination',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ianshul',
            github: 'https://github.com/ianshulx'
        }
    ];

    const stats = {
        totalContributors: collaborators.length,
        totalCommits: '50+',
        totalPRs: '25+',
        linesOfCode: '5000+'
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Amazing Contributors</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Meet the talented developers who made EditorialChain possible through their dedication and contributions during Hacktoberfest 2025
                </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white text-center">
                    <div className="text-3xl font-bold mb-2">{stats.totalContributors}</div>
                    <div className="text-blue-100">Contributors</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white text-center">
                    <div className="text-3xl font-bold mb-2">{stats.totalCommits}</div>
                    <div className="text-green-100">Commits</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white text-center">
                    <div className="text-3xl font-bold mb-2">{stats.totalPRs}</div>
                    <div className="text-purple-100">Pull Requests</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white text-center">
                    <div className="text-3xl font-bold mb-2">{stats.linesOfCode}</div>
                    <div className="text-orange-100">Lines of Code</div>
                </div>
            </div>

            {/* Collaborators Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {collaborators.map((collaborator, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-blue-500">
                        <div className="flex items-center mb-4">
                            <img
                                src={collaborator.avatar}
                                alt={collaborator.name}
                                className="w-16 h-16 rounded-full mr-4 border-2 border-blue-200"
                            />
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{collaborator.name}</h3>
                                <p className="text-sm text-blue-600 font-medium">{collaborator.role}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm">
                            {collaborator.contributions}
                        </p>
                        <a
                            href={collaborator.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-gray-700 hover:text-blue-600 font-medium text-sm"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub Profile
                        </a>
                    </div>
                ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Want to Contribute?</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    EditorialChain is an open-source project and we welcome contributions from developers worldwide. 
                    Whether it's fixing bugs, adding features, or improving documentation, every contribution matters!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="https://github.com/ianshulx/EditorialChain"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800"
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View Repository
                    </a>
                    <a
                        href="https://github.com/ianshulx/EditorialChain/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Report Issues
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CollaboratorPage;
