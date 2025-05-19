import { Link } from "react-router-dom";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import { useContext } from "react";
import { AuthContext } from "./Authentication";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Manage_notes = () => {
  const axios = useMyBackendAxios();
  const { user } = useContext(AuthContext);

  const { isPending, data: All_Notes = [], refetch } = useQuery({
    queryKey: ['all_notes', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/notes/all_notes/${user.email}`);
      return res.data;
    }
  });

  const handleDelete = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/notes/${_id}`)
          .then(res => {
            if (res.data.deletedCount === 1) {
              Swal.fire({
                title: "Deleted!",
                text: "Note has been deleted.",
                icon: "success"
              });
              refetch();
            }
          });
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
    <div>
      <div className="relative w-full lg:h-36 md:h-36 sm:h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">All Notes</h1>
      </div>

      <div className="py-10 px-4 md:px-10">
        <h2 className="text-xl font-bold mb-6">Total Notes: {All_Notes.length}</h2>

        <div className="shadow-lg rounded-lg overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">Title</th>
                <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">Student Email</th>
                <th className="w-1/3 py-4 px-6 text-left text-gray-600 font-bold uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {All_Notes.map(note => (
                <tr key={note._id}>
                  <td className="py-4 px-6 border-b border-gray-200 truncate">{note?.title}</td>
                  <td className="py-4 px-6 border-b border-gray-200">{note?.email}</td>
                  <td className="py-4 px-6 border-b border-gray-200 space-x-2">
                    <Link to={`/dashboard/update_note/${note._id}`}>
                      <button className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {All_Notes.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">No notes found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Manage_notes;
