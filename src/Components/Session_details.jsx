import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Authentication";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Session_details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useMyBackendAxios();
  const { user } = useContext(AuthContext);

  const { data: session = {}, isLoading } = useQuery({
    queryKey: ["session_detail", id],
    queryFn: async () => {
      const res = await axios.get(`/sessions/${id}`);
      return res.data;
    },
  });

  const handleBook = () => {
    const booking = {
      student_email: user?.email,
      session_id: session._id,
      title: session.title,
      price: session.price,
      tutor_email: session.tutor_email,
      tutor_name: session.tutor_name,
      availability: session.availability,
      cover_img: session.cover_img,
      status: "booked"
    };

    if (parseInt(session.price) === 0) {
      axios.post("/booked_session", booking).then((res) => {
        if (res.data.insertedId || res.data.success) {
          Swal.fire("Booked!", "Your session has been booked.", "success");
          navigate("/dashboard/view_booked_session");
        }
      });
    } else {
      navigate(`/payment/${id}`);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="mt-28 px-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={session.cover_img}
          alt="Session Cover"
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{session.title}</h1>
          <p className="text-gray-700 mb-4">{session.description}</p>

          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Subject:</strong> {session.subject}</p>
            <p><strong>Availability:</strong> {session.availability}</p>
            <p><strong>Price:</strong> {parseInt(session.price) === 0 ? "Free" : `$${session.price}`}</p>
          </div>

          <div className="mt-6">
            {user ? (
              <button
                onClick={handleBook}
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
              >
                {parseInt(session.price) === 0 ? "Book Now" : "Proceed to Payment"}
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600">
                  Login to Book
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session_details;
