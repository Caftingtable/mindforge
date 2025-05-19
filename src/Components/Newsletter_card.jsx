import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const Newsletter_card = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3s
  };

  return (
    <div className="mx-auto lg:my-28 md:my-28 sm:my-24 max-w-7xl px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-primary px-6 py-12 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-12">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Stay Informed with the Latest Courses & News!
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
            Subscribe to our newsletter for updates on new courses, expert insights, exclusive discounts, and live events. All curated to boost your learning journey.
          </p>
        </div>

        {submitted ? (
          <p className="text-center mt-8 text-white font-medium">✅ You're subscribed! Thank you.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-md flex-col sm:flex-row items-center gap-4">
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-md border-0 bg-white px-4 py-2.5 text-primary shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-white sm:text-sm"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-primary hover:bg-gray-100 transition"
            >
              <FiSend className="text-lg" />
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Newsletter_card;
