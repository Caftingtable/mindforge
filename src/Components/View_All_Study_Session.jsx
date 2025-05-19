import { useQuery } from "@tanstack/react-query";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import { AuthContext } from "./Authentication";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const View_All_Study_Session = () => {
  const axios = useMyBackendAxios();
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [paid_btn, setPaid_btn] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isOpenReject, setIsOpenReject] = useState(false);
  const [selectedSessionReject, setSelectedSessionReject] = useState(null);

  const openRejectModal = (session) => {
    setSelectedSessionReject(session);
    setIsOpenReject(true);
  };

  const closeRejectModal = () => {
    setIsOpenReject(false);
    setSelectedSessionReject(null);
  };

  const openModal = (session) => {
    setSelectedSession(session);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedSession(null);
    setPaid_btn(false);
  };

  const { isPending, data: All_session = [], refetch } = useQuery({
    queryKey: ['all_booked_session2', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/sessions`);
      return res.data;
    }
  });

  const handleAddRegistration = (e, id) => {
    e.preventDefault();
    const fee = e.target.registration_fee.value;
    const value = { price: fee, status: 'approved' };
    axios.put(`/sessions/${id}`, value).then(res => {
      if (res.data.modifiedCount === 1) {
        Swal.fire({ icon: 'success', title: 'Approved Successfully', timer: 2000, showConfirmButton: false });
        refetch();
        closeModal();
      }
    });
  };

  const handleAddRegistration_Free = (id) => {
    const value = { price: 0, status: 'approved' };
    axios.put(`/sessions/${id}`, value).then(res => {
      if (res.data.modifiedCount === 1) {
        Swal.fire({ icon: 'success', title: 'Approved Successfully', timer: 2000, showConfirmButton: false });
        refetch();
        closeModal();
      }
    });
  };

  const handleReject = (e, id, email) => {
    e.preventDefault();
    const reject_reason = e.target.reject_reason.value;
    const feedback = e.target.feedback.value;
    const value = { reject_reason, feedback, tutor_email: email };
    axios.post('/sessions/reject', value).then(res => {
      if (res.data.insertedId) {
        Swal.fire({ icon: 'success', title: 'Rejected Successfully', timer: 2000, showConfirmButton: false });
        e.target.reset();
        closeRejectModal();
      }
    });

    const updateStatus = { price: 0, status: 'rejected' };
    axios.put(`/sessions/${id}`, updateStatus).then(res => {
      if (res.data.modifiedCount === 1) {
        refetch();
        closeModal();
      }
    });
  };

  const handleDeleteSession = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/sessions/${_id}`).then(res => {
          if (res.data.deletedCount === 1) {
            Swal.fire('Deleted!', 'Session has been deleted.', 'success');
            refetch();
          }
        });
      }
    });
  };

  if (isPending) {
    return <div className="flex justify-center py-8"><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div></div>;
  }

  return (
    <div>
      <div className="relative w-full lg:h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">All Study Sessions</h1>
      </div>

      <div className="grid my-10 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {All_session?.map(session => (
          <div key={session._id} className="p-4 bg-white max-w-sm rounded-2xl shadow-sm shadow-primary">
            <img className="rounded-xl w-full h-48 object-cover" src={session.cover_img} alt="cover" />
            <div className="flex flex-col">
              <div className="mb-4">
                <h1 className="mt-5 text-2xl font-semibold">{session.session_title}</h1>
                <p className="my-2">Duration: {session.session_duration} hr</p>
                <p>
                  {session.status === 'pending' && <span className="bg-yellow-100 font-bold text-yellow-900 py-1 px-2 rounded-full text-xs">Pending</span>}
                  {session.status === 'approved' && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>}
                  {session.status === 'rejected' && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>}
                </p>
              </div>

              <div>
                {session.status === 'approved' && (
                  <div className="flex space-x-2">
                    <Link to={`/dashboard/update_session/${session._id}`}>
                      <button className="text-white bg-primary py-2 px-4 rounded-lg shadow-md hover:shadow-lg">Update</button>
                    </Link>
                    <button onClick={() => handleDeleteSession(session._id)} className="text-white bg-primary py-2 px-4 rounded-lg shadow-md hover:shadow-lg">Delete</button>
                  </div>
                )}

                {session.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button onClick={() => openModal(session)} className="text-white bg-primary py-2 px-4 rounded-lg shadow-md hover:shadow-lg">Approve</button>
                    <button onClick={() => openRejectModal(session)} className="text-white bg-primary py-2 px-4 rounded-lg shadow-md hover:shadow-lg">Reject</button>
                  </div>
                )}

                {session.status === 'rejected' && (
                  <button onClick={() => openModal(session)} className="text-white bg-primary py-2 px-4 rounded-lg shadow-md hover:shadow-lg">Approve</button>
                )}
              </div>
            </div>

            {/* Approve Modal */}
            {isOpen && selectedSession?._id === session._id && (
              <dialog open className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Is the session free or paid?</h3>
                  <div className="py-4 flex">
                    <button onClick={() => handleAddRegistration_Free(session._id)} className="text-white bg-primary py-1 px-4 mx-4 rounded-lg shadow-md hover:shadow-lg">Free</button>
                    <button onClick={() => setPaid_btn(true)} className="text-white bg-primary py-1 px-4 rounded-lg shadow-md hover:shadow-lg">Paid</button>
                  </div>

                  {paid_btn && (
                    <form onSubmit={(e) => handleAddRegistration(e, session._id)}>
                      <label htmlFor="registration_fee" className="text-sm font-medium text-gray-900 block mb-2">Registration Fee:</label>
                      <input type="number" name="registration_fee" required className="w-full p-2.5 border rounded" placeholder="Enter fee" />
                      <button className="mt-4 bg-primary text-white px-4 py-1 rounded">Submit</button>
                    </form>
                  )}

                  <div className="modal-action">
                    <button onClick={closeModal} className="btn btn-sm bg-red-600 text-white">Close</button>
                  </div>
                </div>
              </dialog>
            )}

            {/* Reject Modal */}
            {isOpenReject && selectedSessionReject?._id === session._id && (
              <dialog open className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg text-center">Reject Session</h3>
                  <form onSubmit={(e) => handleReject(e, session._id, session?.tutor_email)}>
                    <label htmlFor="reject_reason" className="block text-sm font-medium mb-1">Reason:</label>
                    <input type="text" name="reject_reason" required className="w-full mb-2 p-2 border rounded" />
                    <label htmlFor="feedback" className="block text-sm font-medium mb-1">Feedback:</label>
                    <input type="text" name="feedback" required className="w-full p-2 border rounded" />
                    <button className="mt-4 bg-primary text-white px-4 py-1 rounded">Submit</button>
                  </form>

                  <div className="modal-action">
                    <button onClick={closeRejectModal} className="btn btn-sm bg-red-600 text-white">Close</button>
                  </div>
                </div>
              </dialog>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default View_All_Study_Session;
