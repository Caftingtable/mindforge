import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';

const All_Study_Session = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const axiosMyBackend = useMyBackendAxios();
  const navigate = useNavigate();

  useEffect(() => {
    axiosMyBackend.get('/sessions')
      .then(res => {
        setSessions(res.data);
        setFilteredSessions(res.data);
      });
  }, [axiosMyBackend]);

  const handleRequest = (_id) => {
    const value = { status: 'pending' };
    axiosMyBackend.put(`/session_request/${_id}`, value)
      .then(res => {
        if (res.data.modifiedCount === 1) {
          Swal.fire({
            icon: "success",
            title: "Successfully Updated",
            timer: 2000,
            showConfirmButton: false
          });
          navigate('/dashboard/all_study_session');
        }
      });
  };

  const handleSearch = (searchTerm) => {
    const filtered = sessions.filter(session =>
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.tutorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.tutorEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSessions(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search study sessions..."
          className="max-w-md mx-auto"
        />
      </div>

      <div className="relative w-full lg:h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">All Study Session</h1>
      </div>

      <div className="py-10">
        <h2 className="text-xl font-bold">Total Session: {filteredSessions.length}</h2>
      </div>

      <div>
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-4 px-6 text-left">Title</th>
                <th className="py-4 px-6 text-left">Tutor Name</th>
                <th className="py-4 px-6 text-left">Tutor Email</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-left"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredSessions.map(items => (
                <tr key={items._id}>
                  <td className="py-4 px-6 border-b">{items.title}</td>
                  <td className="py-4 px-6 border-b">{items.tutorName}</td>
                  <td className="py-4 px-6 border-b">{items.tutorEmail}</td>
                  <td className="py-4 px-6 border-b">
                    {
                      items.status === 'pending' && <span className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-xs">Pending</span>
                    }
                    {
                      items.status === 'approved' && <span className="text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs">Approved</span>
                    }
                    {
                      items.status === 'rejected' && <span className="text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs">Rejected</span>
                    }
                  </td>
                  <td>
                    {
                      items.status === 'rejected' &&
                      <button onClick={() => handleRequest(items._id)} className="px-4 py-2 bg-primary text-white rounded-lg">Request</button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default All_Study_Session;
