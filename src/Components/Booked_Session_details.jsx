import { useNavigate, useParams } from "react-router-dom";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import { useQuery } from "@tanstack/react-query";
import { GoArrowLeft } from "react-icons/go";
import moment from "moment";

const Booked_Session_details = () => {
  const { id } = useParams();
  const axios = useMyBackendAxios();
  const navigate = useNavigate();

  const { isPending, data: session_detail = {} } = useQuery({
    queryKey: ['booked_details', id],
    queryFn: async () => {
      const res = await axios.get(`/booked_details/${id}`);
      return res.data;
    }
  });

  const RegistrationStartDate = moment(session_detail?.reg_start_date).format("MMM Do YY");
  const RegistrationEndDate = moment(session_detail?.reg_end_date).format("MMM Do YY");
  const classStartDate = moment(session_detail?.classStart).format("MMM Do YY");
  const classEndDate = moment(session_detail?.classEnd).format("MMM Do YY");

  if (isPending) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mt-[120px]">
      <div className="lg:w-2/4 md:w-2/4 sm:w-4/5 mx-auto">
        <div className="flex justify-center items-center min-h-screen w-full p-4">
          <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="relative">
              <img className="w-full h-64 object-cover" src={session_detail?.cover_img} alt="Session cover" />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-title">{session_detail?.session_title}</h2>
              <p className="text-paragraph mb-4">{session_detail?.description}</p>

              <div className="space-y-2">
                <p className="font-medium">Tutor Name: <span className="text-primary">{session_detail?.tutor_name}</span></p>
                <p className="text-sm text-paragraph">Registration Start: {RegistrationStartDate}</p>
                <p className="text-sm text-paragraph">Registration End: {RegistrationEndDate}</p>
                <p className="text-sm text-paragraph">Class Start: {classStartDate}</p>
                <p className="text-sm text-paragraph">Class End: {classEndDate}</p>
                <p className="text-sm text-paragraph">Fee: ${session_detail?.reg_fee}</p>
                <p className="text-sm text-paragraph">Duration: <span className="bg-primary text-white px-3 py-1 rounded-full">{session_detail?.session_duration} hr</span></p>
              </div>

              <div className="mt-6 flex justify-start">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg shadow hover:bg-primary/90 transition">
                  <GoArrowLeft className="text-xl" /> Back
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Booked_Session_details;
