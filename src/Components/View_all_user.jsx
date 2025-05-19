import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import Swal from "sweetalert2";

const View_all_user = () => {
  const axios = useMyBackendAxios();
  const [search, setSearch] = useState('');

  const { data: users = [], refetch, isPending } = useQuery({
    queryKey: ['searchUsers', search],
    queryFn: async () => {
      const res = search
        ? await axios.get(`/users/search?searchUser=${search}`)
        : await axios.get(`/users`);
      return res.data;
    },
    enabled: true,
  });

  const handleRoleChange = (id, newRole) => {
    axios
      .put(`/users/update_user_role/${id}`, { role: newRole })
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: `User role updated to ${newRole}`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        } else {
          Swal.fire({
            icon: "info",
            title: "No change detected",
            text: "The user role was already set to this.",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: err.message,
        });
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
      <div className="relative w-full lg:h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">View All Users</h1>
      </div>

      <div className="relative w-full max-w-xl my-10 mx-auto bg-white rounded-full">
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search user"
          className="rounded-full w-full h-14 bg-transparent py-1 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md focus:ring-teal-200 focus:border-teal-200"
          type="text"
        />
        <button
          type="submit"
          className="absolute inline-flex items-center h-9 px-4 py-2 text-sm text-white right-3 top-3 bg-teal-600 rounded-full hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Search
        </button>
      </div>

      <div className="shadow-lg rounded-lg overflow-x-auto mx-4 md:mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">Img</th>
              <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
              <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">Email</th>
              <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">Role</th>
              <th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-4 px-6 border-b border-gray-200">
                  <img className="h-10 w-10 rounded-full" src={user.photo_url} alt="User avatar" />
                </td>
                <td className="py-4 px-6 border-b border-gray-200 truncate">{user.name}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.email}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {user.role === 'tutor' && (
                    <span className="bg-yellow-100 font-bold text-yellow-900 py-1 px-2 rounded-full text-xs">
                      Tutor
                    </span>
                  )}
                  {user.role === 'student' && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Student
                    </span>
                  )}
                  {user.role === 'admin' && (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Admin
                    </span>
                  )}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                    {user.role === 'admin' ? (
                      <span className="text-sm text-gray-500 italic">Admin role locked</span>
                    ) : (
                      <>
                        <label htmlFor={`role-${user._id}`} className="block mb-1 text-sm font-medium text-gray-700">
                          Change Role
                        </label>
                        <select
                          id={`role-${user._id}`}
                          defaultValue=""
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="border rounded px-2 py-1 text-sm text-gray-700 w-full"
                        >
                          <option value="" disabled>
                            Select Role
                          </option>
                          <option value="tutor">Tutor</option>
                          <option value="student">Student</option>
                        </select>
                      </>
                    )}
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default View_all_user;
