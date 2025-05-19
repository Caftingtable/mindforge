import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMyBackendAxios from '../Hooks/useMyBackendAxios';
import { useQuery } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import { AuthContext } from './Authentication';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';

const Update_Session = () => {
  const { id } = useParams();
  const axios = useMyBackendAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { isPending, data: session_detail = {}, refetch } = useQuery({
    queryKey: ['session_update', id],
    queryFn: async () => {
      const res = await axios.get(`/sessions/${id}`);
      return res.data;
    }
  });

  const [reg_start_date, setRegStart] = useState(new Date());
  const [reg_end_date, setRegEnd] = useState(new Date());
  const [classStart, setClassStart] = useState(new Date());
  const [classEnd, setClassEnd] = useState(new Date());

  const handleUpdate = (e) => {
    e.preventDefault();
    const cover_img = e.target.img_url.value;
    const session_title = e.target.session_title.value;
    const description = e.target.description.value;
    const session_duration = e.target.session_duration.value;
    const reg_fee = e.target.fee.value;

    const updatedSession = {
      cover_img,
      session_title,
      description,
      session_duration,
      reg_fee,
      reg_start_date,
      reg_end_date,
      classStart,
      classEnd
    };

    axios.put(`/sessions/${id}`, updatedSession).then(res => {
      if (res.data.modifiedCount === 1 || res.data.acknowledged) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully Updated Session',
          showConfirmButton: false,
          timer: 2000
        });
        refetch();
        navigate('/dashboard/view_all_study_session');
      }
    });
  };

  if (isPending) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mt-[100px]">
      <div className="relative w-full h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">Update Study Session</h1>
      </div>

      <div className="lg:w-4/5 mx-auto mt-10">
        <form onSubmit={handleUpdate} className="bg-white border rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">Session Thumbnail</label>
              <input type="text" name="img_url" defaultValue={session_detail?.cover_img} className="input" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">Session Title</label>
              <input type="text" name="session_title" defaultValue={session_detail?.session_title} className="input" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">Tutor Name</label>
              <input type="text" value={session_detail?.tutor_name} readOnly className="input bg-gray-100" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">Tutor Email</label>
              <input type="email" value={session_detail?.tutor_email} readOnly className="input bg-gray-100" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">Registration Start Date</label>
              <DatePicker selected={reg_start_date} onChange={setRegStart} className="input" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">Registration End Date</label>
              <DatePicker selected={reg_end_date} onChange={setRegEnd} className="input" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">Session Duration (hrs)</label>
              <input type="number" name="session_duration" defaultValue={session_detail?.session_duration} className="input" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">Registration Fee ($)</label>
              <input type="number" name="fee" defaultValue={session_detail?.reg_fee} className="input" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">Class Start</label>
              <DatePicker selected={classStart} onChange={setClassStart} className="input" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">Class End</label>
              <DatePicker selected={classEnd} onChange={setClassEnd} className="input" />
            </div>

            <div className="col-span-full">
              <label className="text-sm font-medium text-gray-900 block mb-2">Description</label>
              <textarea name="description" defaultValue={session_detail?.description} rows="5" className="input"></textarea>
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium">Update Session</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update_Session;
