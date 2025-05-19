import { useContext } from "react";
import { AuthContext } from "./Authentication";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const View_booked_session = () => {
  const { user } = useContext(AuthContext);
  const axios = useMyBackendAxios();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['booked_sessions', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/bookings/student/${user.email}`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-24">
      <h2 className="text-3xl font-bold mb-6 text-center">My Booked Sessions</h2>
      {sessions.length === 0 ? (
        <p className="text-center text-gray-600">You have not booked any sessions yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map(session => (
            <div key={session._id} className="bg-white shadow rounded-lg p-4">
              <img
                src={session.cover_img}
                alt="cover"
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold">{session.session_title}</h3>
              <p className="text-sm text-gray-600 mb-1">{session.availability}</p>
              <p className="text-sm text-gray-700 mb-2">{session.description?.slice(0, 80)}...</p>
              <Link
                to={`/dashboard/booked_Details/${session._id}`}
                className="text-primary font-medium hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default View_booked_session;
