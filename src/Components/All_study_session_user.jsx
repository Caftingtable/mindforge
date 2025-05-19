import React, { useEffect, useState } from 'react';
import useMyBackendAxios from '../Hooks/useMyBackendAxios';
import { useQuery } from '@tanstack/react-query';
import Session_home_card from './Session_home_card';
import { IoChevronDownOutline } from "react-icons/io5";

const All_study_session_user = () => {
  const axiosMyBackend = useMyBackendAxios();
  const [isOpen, setIsOpen] = useState(false);
  const [sortedSessions, setSortedSessions] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const { isPending, data: approved_Session = [] } = useQuery({
    queryKey: ['all_sessions_from_db'],
    queryFn: async () => {
      const res = await axiosMyBackend.get('/sessions');
      return res.data;
    }
  });

  const sortSessions = (order) => {
    const sorted = [...approved_Session].sort((a, b) =>
      order === "asc" ? a.reg_fee - b.reg_fee : b.reg_fee - a.reg_fee
    );
    setSortedSessions(sorted);
    setSortOrder(order);
  };

  useEffect(() => {
    setSortedSessions(approved_Session);
  }, [approved_Session]);

  if (isPending) return (
    <div className="flex justify-center py-8">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
    </div>
  );

  return (
    <div className='mt-[100px]'>
      <div className="relative w-full lg:h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">All Study Session</h1>
      </div>

      <div className="py-4 w-4/5 mx-auto">
        <div className="dropdown inline-block relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
          <button className="bg-primary text-white font-semibold py-2 px-4 rounded flex items-center">
            <p className="mr-1 flex items-center">Sort By <IoChevronDownOutline className='text-lg ml-2' /></p>
          </button>

          {isOpen && (
            <ul className="dropdown-menu z-20 absolute text-gray-700 py-2 w-40 bg-white shadow-lg rounded-md">
              <li>
                <a onClick={() => sortSessions("asc")} className="cursor-pointer hover:bg-primary hover:text-white py-2 px-4 block">Low Price</a>
              </li>
              <li>
                <a onClick={() => sortSessions("desc")} className="cursor-pointer hover:bg-primary hover:text-white py-2 px-4 block">High Price</a>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="w-4/5 mx-auto my-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {
            sortedSessions?.map(items => (
              <Session_home_card key={items._id} sessions={items} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default All_study_session_user;
