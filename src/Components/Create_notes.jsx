import { useContext } from "react";
import { AuthContext } from "./Authentication";
import Swal from 'sweetalert2';
import useMyBackendAxios from "../Hooks/useMyBackendAxios";

const Create_notes = () => {
  const { user } = useContext(AuthContext);
  const axios = useMyBackendAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.note_title.value;
    const email = e.target.email.value;
    const description = e.target.description.value;

    const payload = { title, email, description };

    try {
      const res = await axios.post('/notes', payload);
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Created Note",
          showConfirmButton: false,
          timer: 2000
        });
        e.target.reset();
      }
    } catch (error) {
      console.error("Failed to create note", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while creating the note.",
      });
    }
  };

  return (
    <div>
      <div className="relative w-full lg:h-60 md:h-36 sm:h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">Create Note</h1>
      </div>

      <div className="lg:w-4/5 sm:w-full mx-auto">
        <div className="bg-white border-4 rounded-lg shadow relative m-10">
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="note_title" className="text-sm font-medium text-gray-900 block mb-2">Title:</label>
                  <input type="text" name="note_title" id="note_title" required className="input" placeholder="Note title" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Student E-mail:</label>
                  <input type="email" defaultValue={user?.email} readOnly name="email" id="email" className="input bg-gray-100" />
                </div>

                <div className="col-span-full">
                  <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">Description:</label>
                  <textarea name="description" id="description" rows="6" className="textarea" placeholder="Enter your notes or summary..." required></textarea>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 rounded-b">
                <button className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Create Note</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create_notes;
