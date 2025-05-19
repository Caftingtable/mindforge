import React from 'react';

const Blog_Section = () => {
    return (
        <div>
            {/* Section Header */}
            <div className="lg:py-20 md:py-16 sm:py-10 bg-secondary dark:bg-[#111827] px-4">
                <h1 className="text-center mb-4 text-3xl sm:text-4xl font-bold text-title dark:text-white">
                    Latest Articles and Learning Resources
                </h1>
                <p className="text-paragraph dark:text-gray-300 text-center max-w-3xl mx-auto">
                    Stay up to date with expert tips, tutorials, and insights designed for modern learners. Whether you're refining study strategies or diving into new topics, our blog keeps you ahead of the curve.
                </p>
            </div>

            {/* Blog Cards Grid */}
            <div className="relative bg-white dark:bg-gray-900 px-6 pt-12 pb-20 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                        {/* Card 1 */}
                        <div className="flex flex-col overflow-hidden rounded-lg shadow hover:shadow-lg bg-white dark:bg-gray-800 transition">
                            <img className="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?auto=format&fit=crop&w=1679&q=80" alt="Web Dev" />
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-primary">Web Development</p>
                                    <a href="#" className="block mt-2">
                                        <h3 className="text-xl font-semibold text-title dark:text-white hover:underline">
                                            10 Essential Web Development Skills Every Developer Should Master
                                        </h3>
                                        <p className="mt-3 text-base text-paragraph dark:text-gray-300">
                                            Stay current in a fast-changing field with our curated list of must-have web dev skills.
                                        </p>
                                    </a>
                                </div>
                                <div className="mt-6 flex items-center">
                                    <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" alt="Roel" />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-title dark:text-white">Roel Aufderehar</p>
                                        <p className="text-sm text-paragraph dark:text-gray-400">Mar 16, 2020 · 6 min read</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="flex flex-col overflow-hidden rounded-lg shadow hover:shadow-lg bg-white dark:bg-gray-800 transition">
                            <img className="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" alt="Productivity" />
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-primary">Study Tips</p>
                                    <a href="#" className="block mt-2">
                                        <h3 className="text-xl font-semibold text-title dark:text-white hover:underline">
                                            7 Productivity Hacks for Online Learners
                                        </h3>
                                        <p className="mt-3 text-base text-paragraph dark:text-gray-300">
                                            Learn how to stay focused, minimize distractions, and build effective learning habits.
                                        </p>
                                    </a>
                                </div>
                                <div className="mt-6 flex items-center">
                                    <img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane" />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-title dark:text-white">Jane Doe</p>
                                        <p className="text-sm text-paragraph dark:text-gray-400">Feb 22, 2024 · 4 min read</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="flex flex-col overflow-hidden rounded-lg shadow hover:shadow-lg bg-white dark:bg-gray-800 transition">
                            <img className="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1607746882042-944635dfe10e" alt="AI Learning" />
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-primary">AI & Education</p>
                                    <a href="#" className="block mt-2">
                                        <h3 className="text-xl font-semibold text-title dark:text-white hover:underline">
                                            How AI Is Reshaping Personalized Learning
                                        </h3>
                                        <p className="mt-3 text-base text-paragraph dark:text-gray-300">
                                            Discover how artificial intelligence is creating smarter, more adaptive learning experiences.
                                        </p>
                                    </a>
                                </div>
                                <div className="mt-6 flex items-center">
                                    <img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/men/45.jpg" alt="Alex" />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-title dark:text-white">Alex Turner</p>
                                        <p className="text-sm text-paragraph dark:text-gray-400">Mar 5, 2024 · 5 min read</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog_Section;
