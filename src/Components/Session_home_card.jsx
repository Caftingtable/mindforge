import { Link, useNavigate } from "react-router-dom";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import { useContext } from "react";
import { AuthContext } from "./Authentication";
import Swal from "sweetalert2";

const Session_home_card = ({ sessions }) => {
  const {
    _id,
    cover_img,
    session_title,
    description,
    status,
    price,
    tutor_name,
    tutor_email,
    availability
  } = sessions;

  const navigate = useNavigate();
  const axios = useMyBackendAxios();
  const { user } = useContext(AuthContext);

  const handleBook = () => {
    const booking = {
      student_email: user?.email,
      session_id: _id,
      title: session_title,
      price,
      tutor_email,
      tutor_name,
      availability,
      cover_img,
      status: "booked"
    };

    if (parseInt(price) === 0) {
      axios.post("/booked_session", booking).then((res) => {
        if (res.data.insertedId || res.data.success) {
          Swal.fire("Booked!", "Your session has been booked.", "success");
          navigate("/dashboard/view_booked_session");
        }
      });
    } else {
      navigate(`/payment/${_id}`);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white relative shadow-lg rounded-xl justify-between flex flex-col h-full overflow-hidden">
        <img className="rounded-t-lg w-full h-48 object-cover" src={cover_img} alt="Session Cover" />

        <div className="py-6 px-8 bg-white flex flex-col flex-grow">
          <h1 className="text-gray-700 font-bold text-xl mb-2 hover:text-gray-900 hover:cursor-pointer">
            {session_title}
          </h1>
          <p className="text-gray-600 text-sm mb-2">
            {description.slice(0, 80)}...
          </p>

          <p className="py-1 font-semibold text-sm">
            Price: {parseInt(price) === 0 ? "Free" : `$${price}`} 
          </p>

          <div className="flex flex-wrap justify-between gap-2 mt-4">
            <Link to={`/session_details/${_id}`}>
              <button className="py-1 px-3 bg-gray-200 hover:bg-gray-300 text-sm font-semibold rounded">
                Read More
              </button>
            </Link>
            {user ? (
              <button
                onClick={handleBook}
                className="py-1 px-3 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700"
              >
                Book Now
              </button>
            ) : (
              <Link to="/login">
                <button className="py-1 px-3 bg-yellow-500 text-white text-sm font-semibold rounded hover:bg-yellow-600">
                  Login to Book
                </button>
              </Link>
            )}
          </div>
        </div>

        <div className="absolute top-2 right-2 py-1 px-3 bg-primary text-white text-xs rounded-full">
          {status || "On Going"}
        </div>
      </div>
    </div>
  );
};

export default Session_home_card;
