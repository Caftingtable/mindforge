import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useMyBackendAxios from '../Hooks/useMyBackendAxios';

const SearchBar = () => {
  const axiosPrivate = useMyBackendAxios();
  const [searchTerm, setSearchTerm] = useState('');
  const [tutors, setTutors] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const navigate = useNavigate();
  const debounceTimeout = useRef(null);

  useEffect(() => {
    axiosPrivate.get('/tutors')
      .then(res => {
        setTutors(res.data);
        const uniqueSubjects = [...new Set(res.data.map(t => t.specialization))];
        setSubjects(uniqueSubjects);
      })
      .catch(err => console.error('Failed to fetch tutors', err));
  }, [axiosPrivate]);

  const performSearch = (query) => {
    let filtered = tutors;

    if (query.trim() !== '') {
      filtered = filtered.filter((tutor) =>
        tutor.name.toLowerCase().includes(query.toLowerCase()) ||
        tutor.sessionTitle?.toLowerCase().includes(query.toLowerCase()) ||
        tutor.specialization?.toLowerCase().includes(query.toLowerCase()) ||
        tutor.bio?.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedSubject) {
      filtered = filtered.filter(tutor => tutor.specialization === selectedSubject);
    }

    if (selectedRating) {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter(tutor => parseFloat(tutor.rating) >= minRating);
    }

    return filtered;
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    if (value.length < 2 && !selectedSubject && !selectedRating) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    debounceTimeout.current = setTimeout(() => {
      const filtered = performSearch(value);
      setResults(filtered);
      setShowResults(true);
      setIsLoading(false);
      setSelectedIndex(-1);
    }, 300);
  };

  useEffect(() => {
    handleSearch(searchTerm); // trigger when filters change
  }, [selectedSubject, selectedRating]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showResults) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0) {
            navigate(`/tutor_profile/${results[selectedIndex]._id}`);
            setShowResults(false);
          }
          break;
        case 'Escape':
          setShowResults(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [results, selectedIndex, showResults, navigate]);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* 🧠 Combined search + filters in one bar */}
      <div className="flex flex-wrap gap-2 items-center bg-white border rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary">
        <div className="relative flex-grow min-w-[150px]">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => (searchTerm.length >= 2 || selectedSubject || selectedRating) && setShowResults(true)}
            placeholder="Search tutors..."
            className="w-full pl-10 pr-4 py-1 text-sm border-none focus:outline-none"
          />
          {isLoading && (
            <FaSpinner className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" />
          )}
        </div>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="text-sm border rounded-md px-2 py-1 bg-gray-50 hover:bg-white"
        >
          <option value="">All Subjects</option>
          {subjects.map((subject, i) => (
            <option key={i} value={subject}>{subject}</option>
          ))}
        </select>

        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="text-sm border rounded-md px-2 py-1 bg-gray-50 hover:bg-white"
        >
          <option value="">All Ratings</option>
          <option value="4.5">4.5+ stars</option>
          <option value="4.0">4.0+ stars</option>
          <option value="3.5">3.5+ stars</option>
        </select>
      </div>

      {/* 🔽 Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
          <div className="p-3 space-y-2">
            {results.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">No tutors found.</p>
            ) : (
              results.map((tutor, index) => (
                <div
                  key={tutor._id}
                  className={`cursor-pointer p-2 rounded ${
                    index === selectedIndex ? 'bg-primary/10' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    navigate(`/tutor_profile/${tutor._id}`);
                    setShowResults(false);
                  }}
                >
                  <h4 className="font-semibold text-gray-800 text-sm">{tutor.name}</h4>
                  <p className="text-xs text-gray-600">
                    {tutor.sessionTitle || tutor.specialization || tutor.bio?.slice(0, 60)}...
                  </p>
                  {tutor.rating && (
                    <p className="text-xs text-yellow-600 mt-1">⭐ {tutor.rating}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
