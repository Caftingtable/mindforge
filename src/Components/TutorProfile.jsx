import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useMyBackendAxios from '../Hooks/useMyBackendAxios';

const TutorProfile = () => {
  const { id } = useParams();
  const axiosPrivate = useMyBackendAxios();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    axiosPrivate.get(`/tutors/${id}`)
      .then(res => {
        setTutor(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tutor:', err);
        setLoading(false);
      });
  }, [axiosPrivate, id]);

  const handleBookNow = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

    navigate(`/payment/${tutor._id}`, {
      state: {
        tutor,
        selectedDate,
        selectedTime
      }
    });
  };

  if (loading) return <p className="pt-32 text-center">Loading...</p>;
  if (!tutor) return <p className="pt-32 text-center">Tutor not found.</p>;

  return (
    <div className="pt-24 px-4 min-h-screen max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={tutor.image}
          alt={tutor.name}
          className="w-full md:w-64 h-64 object-cover rounded-xl border"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold">{tutor.name}</h2>
          <p className="text-lg text-gray-600">{tutor.specialization}</p>
          <p className="mt-2 text-gray-700">{tutor.bio}</p>

          <div className="mt-4">
            <p><strong>Email:</strong> {tutor.email}</p>
            <p><strong>Session Title:</strong> {tutor.sessionTitle}</p>
            <p><strong>Rating:</strong> ⭐ {tutor.rating || '4.5'} / 5.0</p>
            <p><strong>Available Times:</strong></p>
            <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
              {(tutor.availableTimes || [
                'Monday: 2 PM - 4 PM',
                'Wednesday: 10 AM - 12 PM',
                'Friday: 1 PM - 3 PM'
              ]).map((time, idx) => (
                <li key={idx}>{time}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 space-y-3">
            <div>
              <label className="block mb-1 font-medium">Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Select Time:</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button
              onClick={handleBookNow}
              className="w-full bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-600"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
