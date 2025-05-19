import { useContext } from "react";
import { AuthContext } from "./Authentication";
import { useNavigate, useParams } from "react-router-dom";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Update_Notes = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useMyBackendAxios();

  const { isPending, data: note = {}, refetch } = useQuery({
    queryKey: ['note', id],
    queryFn: async () => {
      const res = await axios.get(`/notes/${id}`);
      return res.data;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.note_title.value;
    const email = e.target.email.value;
    const description = e.target.description.value;

    const updatedNote = { title, email, description };

    axios.put(`/notes/${id}`, updatedNote).then(res => {
      if (res.data.modifiedCount === 1 || res.data.acknowledged) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Note updated successfully!",
          showConfirmButton: false,
          timer: 2000
        });
        refetch();
        navigate('/dashboard/manage_notes');
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
      <div className="relative w-full lg:h-36 md:h-36 sm:h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">Update Note</h1>
      </div>

      <div className="lg:w-4/5 sm:w-full mx-auto mt-10">
        <form onSubmit={handleSubmit} className="bg-white border-4 rounded-lg shadow p-6 space-y-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="note_title" className="text-sm font-medium text-gray-900 block mb-2">Title:</label>
              <input
                type="text"
                defaultValue={note?.title}
                name="note_title"
                id="note_title"
                className="input"
                placeholder="Note Title"
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Student Email:</label>
              <input
                type="email"
                defaultValue={user?.email}
                name="email"
                id="email"
                readOnly
                className="input bg-gray-100"
              />
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">Description:</label>
              <textarea
                name="description"
                defaultValue={note?.description}
                id="description"
                rows="6"
                className="input"
                placeholder="Description"
              ></textarea>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="text-white bg-primary px-6 py-2 rounded-lg font-medium"
            >
              Update Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update_Notes;
