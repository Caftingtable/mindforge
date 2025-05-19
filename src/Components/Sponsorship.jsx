import React from 'react';
import { Link } from 'react-router-dom';

const Sponsorship = () => {
  const sponsors = [
    { name: 'Company A' },
    { name: 'Company B' },
    { name: 'Company C' },
    { name: 'Company D' },
    { name: 'Company E' },
    { name: 'Company F' },
  ];

  return (
    <div className="bg-[#f2f3f5] dark:bg-gray-900">
      {/* Header Section */}
      <div className="py-16 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Why Partner with <span className="text-primary">MindForge?</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 text-base sm:text-lg">
          MindForge is a leading collaborative study platform that connects students, tutors, and institutions to create meaningful learning experiences.
          Partnering with us means contributing to education equity, innovation, and real student success stories across the globe.
        </p>
      </div>

      {/* Sponsor Logos */}
      <section className="bg-white dark:bg-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-10">
            Trusted by educational leaders and innovators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center text-sm text-gray-600 dark:text-gray-300"
              >
                {sponsor.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="py-16 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Want to become a MindForge partner?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          Whether you’re an educational institution, ed-tech company, or learning organization, let’s collaborate to make a lasting impact on learners worldwide.
        </p>
        <Link
          to="/contact_us"
          className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition"
        >
          Become a Partner
        </Link>
      </div>
    </div>
  );
};

export default Sponsorship;
