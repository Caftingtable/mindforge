import React from 'react';

const Tutor_home_card = ({ tutors }) => {
  const { name, photo_url, specialized, tags = ['Web', 'UI/UX', 'Design'] } = tutors;

  return (
    <div className="max-w-sm mx-auto overflow-hidden bg-white dark:bg-[#1f2937] rounded-lg shadow-md hover:shadow-lg transition-all">
      {/* Image */}
      <div className="relative">
        <img className="w-full h-48 object-cover" src={photo_url} alt={`${name} Profile`} />
      </div>

      {/* Name & Specialization */}
      <div className="px-6 py-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{specialized}</p>
      </div>

      {/* Tags / Skills */}
      <div className="px-6 py-2 flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action */}
      <div className="px-6 py-4">
        <a
          href="#"
          className="text-sm font-medium text-primary hover:underline dark:text-teal-400"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default Tutor_home_card;
