import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SessionDetailsFromSearch = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.session) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">No session data found.</p>
        <button onClick={() => navigate('/')} className="text-blue-600 underline">Go Back</button>
      </div>
    );
  }

  const { title, description, price, status, subject } = state.session;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700 mb-2"><strong>Subject:</strong> {subject}</p>
      <p className="text-gray-700 mb-2"><strong>Status:</strong> {status}</p>
      <p className="text-gray-700 mb-2"><strong>Price:</strong> {price}</p>
      <p className="mt-4 text-gray-800">{description}</p>

      <button
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={() => alert('Book Now clicked! (Frontend only)')}
      >
        Book Now
      </button>
    </div>
  );
};

export default SessionDetailsFromSearch;
