import { Link, NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import logo from '../assets/logo-black.png';
import { useContext, useState, useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "./Authentication";
import SearchResults from './SearchResults';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { handleLogOut, user } = useContext(AuthContext);
  const [menu, setMenu] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/all_session_user', label: 'Sessions' },
    { path: '/tutors', label: 'Tutors' }, // ✅ New Tutors link
    { path: '/about_us', label: 'About Us' },
    { path: '/contact_us', label: 'Contact' },
    { path: '/join_us', label: 'Join Us' },
  ];
  

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      // Replace this with your actual API call
      const results = await searchContent(value);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  // Mock search function - replace with your actual search logic
  const searchContent = async (query) => {
    // This is a mock function. Replace with your actual search implementation
    const mockResults = [
      {
        id: 1,
        title: 'Study Session: Mathematics',
        description: 'Advanced calculus study group',
        type: 'Study Session',
        date: '2024-03-20',
        link: '/session/1',
        image: 'https://via.placeholder.com/50'
      },
      {
        id: 2,
        title: 'Study Material: Physics Notes',
        description: 'Complete physics notes for exam preparation',
        type: 'Study Material',
        date: '2024-03-19',
        link: '/materials/1',
        image: 'https://via.placeholder.com/50'
      },
      // Add more mock results as needed
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return mockResults.filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="fixed top-0 z-10 w-full bg-white shadow-md">
      <div className="w-11/12 mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/">
            <img className="h-12" src={logo} alt="MindForge Logo" />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-4">
            <SearchBar />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setMenu(!menu)}>
              {menu ? (
                <IoMenu className="text-3xl text-primary" />
              ) : (
                <RxCross2 className="text-3xl text-primary" />
              )}
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-primary px-4 py-2 rounded-full"
                    : "text-primary font-semibold hover:text-accent"
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user?.email ? (
              <>
                <Link to="/dashboard" className="bg-primary text-white px-4 py-2 rounded-full">
                  Dashboard
                </Link>
                <Link data-tooltip-id="my-tooltip" data-tooltip-content={user.displayName}>
                  <img
                    className="w-12 h-12 object-cover rounded-full border"
                    src={user.photoURL}
                    alt="User"
                  />
                </Link>
                <button
                  onClick={handleLogOut}
                  className="bg-red-500 text-white px-4 py-2 rounded-full"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-full">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search with Results */}
      <div
        className={`absolute top-[90px] right-5 z-50 bg-white border rounded-lg w-48 shadow-md lg:hidden ${
          menu ? "hidden" : "block"
        }`}
      >
        <div className="p-4 border-b">
          <SearchBar />
        </div>

        <div className="flex flex-col p-4 space-y-2">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-primary px-3 py-1 rounded-full"
                  : "text-primary font-semibold hover:text-accent"
              }
            >
              {label}
            </NavLink>
          ))}

          {user?.email ? (
            <>
              <Link to="/dashboard" className="text-primary hover:text-accent">
                Dashboard
              </Link>
              <button onClick={handleLogOut} className="text-red-500 font-semibold">
                Log Out
              </button>
            </>
          ) : (
            <Link to="/login" className="text-primary hover:text-accent">
              Login
            </Link>
          )}
        </div>
      </div>

      <Tooltip id="my-tooltip" style={{ backgroundColor: "#ffffff", color: "#222" }} />
    </div>
  );
};

export default Navbar;
