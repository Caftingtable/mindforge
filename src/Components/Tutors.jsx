import React, { useEffect, useState } from 'react';
import useMyBackendAxios from '../Hooks/useMyBackendAxios';
import { Link } from 'react-router-dom';

const Tutors = () => {
  const axiosPrivate = useMyBackendAxios();
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    axiosPrivate.get('/tutors')
      .then(res => {
        console.log("📦 Data from backend:", res.data);
        setTutors(res.data);
      })
      .catch(err => {
        console.error('❌ Axios error:', err);
      });
  }, [axiosPrivate]);

  return (
    <div className='mt-[120px]'>
      <div className="relative w-full h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">Meet Our Tutors</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tutors && tutors.length > 0 ? (
          tutors.map((tutor) => (
            <div key={tutor._id} className="bg-white rounded-xl shadow-md p-4">
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{tutor.name}</h2>
              <p className="text-gray-600">{tutor.specialization}</p>
              <p className="text-sm text-gray-500 mt-2">{tutor.bio}</p>
              <p className="text-sm text-gray-700 mt-1 font-medium italic">{tutor.sessionTitle}</p>

              <div className="flex flex-wrap gap-2 mt-4">
              <Link
                to={`/payment/${tutor._id}`}
                state={{ tutor }} // ✅ Pass tutor data to Payment page
                className="bg-primary text-white px-4 py-2 rounded-full"
                >
                Book Now
                </Link>

                <Link
                to={`/tutor_profile/${tutor._id}`}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300"
>
                View Profile
            </Link>

              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No tutors found.</p>
        )}
      </div>
    </div>
  );
};

export default Tutors;
