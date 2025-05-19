import { useContext, useState } from "react";
import { AuthContext } from "./Authentication";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import useMyBackendAxios from "../Hooks/useMyBackendAxios";

const Create_study_session = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reg_start_date, setRegStart] = useState(new Date());
  const [reg_end_date, setRegEnd] = useState(new Date());
  const [classStart, setClassStart] = useState(new Date());
  const [classEnd, setClassEnd] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState("");
  const axios = useMyBackendAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cover_img = e.target.img_url.value;
    const session_title = e.target.session_title.value;
    const tutor_name = e.target.name.value;
    const tutor_email = e.target.email.value;
    const description = e.target.description.value;
    const session_duration = e.target.session_duration.value;
    const reg_fee = e.target.fee.value;

    const payload = {
      cover_img,
      session_title,
      tutor_name,
      tutor_email,
      session_duration: parseFloat(session_duration),
      reg_fee: parseFloat(reg_fee),
      description,
      reg_start_date,
      reg_end_date,
      classStart,
      classEnd,
      availableTimes: availableTimes.split(',').map(time => time.trim()),
      status: 'pending'
    };

    try {
      const res = await axios.post('/sessions/create_session', payload);
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Created Session",
          showConfirmButton: false,
          timer: 2000
        });
        e.target.reset();
        navigate('/dashboard/all_study_session');
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create session. Please try again.',
      });
    }
  };

  return (
    <div>
      <div className="relative w-full lg:h-60 md:h-36 sm:h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">Create Study Session</h1>
      </div>

      <div className="lg:w-4/5 sm:w-full mx-auto">
        <div className="bg-white border-4 rounded-lg shadow relative m-10">
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="img_url" className="text-sm font-medium text-gray-900 block mb-2">Session Thumbnail:</label>
                  <input type="text" name="img_url" id="img_url" className="input" placeholder="Image URL" required />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="session_title" className="text-sm font-medium text-gray-900 block mb-2">Session Title:</label>
                  <input type="text" name="session_title" id="session_title" className="input" required />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">Tutor Name:</label>
                  <input type="text" name="name" id="name" defaultValue={user?.displayName} readOnly className="input bg-gray-100" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Tutor Email:</label>
                  <input type="email" name="email" id="email" defaultValue={user?.email} readOnly className="input bg-gray-100" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">Registration Start Date:</label>
                  <DatePicker selected={reg_start_date} onChange={setRegStart} className="input" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">Registration End Date:</label>
                  <DatePicker selected={reg_end_date} onChange={setRegEnd} className="input" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="session_duration" className="text-sm font-medium text-gray-900 block mb-2">Session Duration (hours):</label>
                  <input type="number" name="session_duration" id="session_duration" className="input" required />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="fee" className="text-sm font-medium text-gray-900 block mb-2">Registration Fee:</label>
                  <input type="number" name="fee" id="fee" defaultValue={0} className="input" required />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">Class Start:</label>
                  <DatePicker selected={classStart} onChange={setClassStart} className="input" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">Class End:</label>
                  <DatePicker selected={classEnd} onChange={setClassEnd} className="input" />
                </div>

                <div className="col-span-6">
                  <label htmlFor="availableTimes" className="text-sm font-medium text-gray-900 block mb-2">Available Times (comma-separated):</label>
                  <input
                    type="text"
                    name="availableTimes"
                    id="availableTimes"
                    className="input"
                    placeholder="e.g., Monday 2-4 PM, Wednesday 10-12 AM"
                    value={availableTimes}
                    onChange={(e) => setAvailableTimes(e.target.value)}
                    required
                  />
                </div>

                <div className="col-span-full">
                  <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">Description:</label>
                  <textarea name="description" id="description" rows="5" className="textarea" placeholder="Enter session description..." required></textarea>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 rounded-b">
                <button type="submit" className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Session</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create_study_session;
