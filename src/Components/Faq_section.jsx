import React from 'react';

const Faq_section = () => {
  return (
    <section className="bg-secondary dark:bg-[#111827] py-16 px-4">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-title dark:text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-paragraph dark:text-gray-300">
          Have questions? You're not alone! Our FAQ section answers the most common questions about how MindForge works—from booking tutors and making payments to earning certificates and accessing live sessions.
        </p>
      </div>

      {/* FAQ Cards */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="collapse collapse-plus bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-md">
            <input type="radio" name="faq" defaultChecked={index === 0} />
            <div className="collapse-title text-lg font-semibold text-title dark:text-white">
              {item.question}
            </div>
            <div className="collapse-content text-paragraph dark:text-gray-300">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const faqData = [
  {
    question: 'How do I book a tutor?',
    answer: 'Create a MindForge account and browse available tutors by subject or availability. Click “Book Session” to schedule your session instantly.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, PayPal, and secure online payment systems. All transactions are processed through Stripe for maximum security.',
  },
  {
    question: 'Are sessions live or recorded?',
    answer: 'All sessions booked through MindForge are conducted live via video call. Recordings may be available after the session, depending on tutor settings.',
  },
  {
    question: 'Can I reschedule or cancel a session?',
    answer: 'Yes. You can reschedule or cancel a session from your dashboard up to 12 hours before it starts. Late cancellations may incur a fee depending on tutor policy.',
  },
  {
    question: 'Will I receive a certificate?',
    answer: 'Yes! If your session or course includes certification, you\'ll receive a downloadable certificate after completion. Check the session description for certificate availability.',
  }
];

export default Faq_section;
