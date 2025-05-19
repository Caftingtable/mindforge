import React from 'react';
import Review_card from './Review_card';
import Marquee from "react-fast-marquee";

const Review_section = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            What Our Students Are Saying
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Our students’ success is our greatest achievement. Read reviews and testimonials from learners who have benefited from our platform. Their experiences reflect the real impact MindForge makes.
          </p>
        </div>

        {/* Marquee with Review Cards */}
        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <Marquee pauseOnHover speed={50} gradient={false} className="py-4">
            <Review_card />
            <Review_card />
            <Review_card />
            {/* Duplicate or map Review_card dynamically for realism */}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Review_section;
