import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FaStarHalfStroke } from 'react-icons/fa6';

// Sample reviews array
const reviews = [
  {
    name: 'Mark Adair',
    date: 'June 10, 2024',
    image: 'https://readymadeui.com/team-2.webp',
    rating: 5,
    message: 'I was skeptical at first, but after completing the Data Science course, I can confidently say that it changed my career. The materials were thorough, and the hands-on projects were invaluable!',
  },
  {
    name: 'Nina S.',
    date: 'May 29, 2024',
    image: 'https://i.ibb.co/tM02wfc/adult-1851571-1280.jpg',
    rating: 5,
    message: 'The platform is user-friendly, and the support team is always ready to help. I completed a full-stack development course, and within a few months, I was able to build my own portfolio site.',
  },
  {
    name: 'Michael H',
    date: 'April 14, 2024',
    image: 'https://i.ibb.co/tM02wfc/adult-1851571-1280.jpg',
    rating: 5,
    message: 'I’ve taken several online courses, but none compare to the quality of this one. The tutors provide clear, engaging explanations, and I love the interactive assignments!',
  },
  {
    name: 'Rachel G.',
    date: 'December 12, 2024',
    image: 'https://i.ibb.co/kqMzRpQ/usman-yousaf-q2q5-Cd-Lu-Wn-I-unsplash.jpg',
    rating: 4,
    message: 'This platform made learning easy and fun! The course content was challenging but rewarding, and the community forums helped me connect ..',
  },
  {
    name: 'Daniel P.',
    date: 'July 18, 2024',
    image: 'https://i.ibb.co/cJ1ZFWZ/harps-joseph-t-Avp-DE7f-Xg-Y-unsplash.jpg',
    rating: 4.5,
    message: 'As a busy professional, I appreciated the flexibility of learning at my own pace. The material was well-organized, and I felt supported throughout the course.',
  }
];

const renderStars = (rating) => {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < full; i++) {
    stars.push(<FaStar key={i} className="text-[#f5c60c]" />);
  }
  if (hasHalf) stars.push(<FaStarHalfStroke key="half" className="text-[#f5c60c]" />);
  while (stars.length < 5) {
    stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-[#f5c60c]" />);
  }
  return stars;
};

const Review_card = () => {
  return (
    <div className="flex items-stretch">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="w-full max-w-sm min-w-[300px] bg-white rounded-lg p-5 shadow-md mx-4 flex flex-col justify-between font-sans"
        >
          <div className="mb-4">
            <div className="flex space-x-1 mb-2">{renderStars(review.rating)}</div>
            <p className="text-sm text-gray-800">"{review.message}"</p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <img src={review.image} alt={review.name} className="w-8 h-8 rounded-full" />
              <p className="ml-2 text-sm font-medium text-gray-900">{review.name}</p>
            </div>
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review_card;
