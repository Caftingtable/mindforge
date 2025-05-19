import { useContext } from "react";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import { AuthContext } from "./Authentication";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Upload_Materials_info = () => {
  const { user } = useContext(AuthContext);
  const axios = useMyBackendAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const session_id = e.target.session_id.value;
    const tutor_email = e.target.email.value;
    const links = e.target.link.value;
    const imgFile = e.target.img.files[0];

    const image_hosting_api_key = '2a2798f5a9d1b7701d09a0b40cf8021d';
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_api_key}`;

    const formData = new FormData();
    formData.append('image', imgFile);

    const res = await axios.post(image_hosting_api, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    });

    if (res.data.success) {
      const data = {
        title,
        session_id,
        tutor_email,
        links,
        imgFile: res.data?.data?.display_url
      };

      const upload_materials = await axios.post('/materials', data);
      if (upload_materials.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Uploaded Materials",
          showConfirmButton: false,
          timer: 2000
        });
        e.target.reset();
      }
    }
  };

  return (
    <div className="mt-[120px]">
      <div className="w-full h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">Upload Materials</h1>
      </div>

      <div className="lg:w-4/5 sm:w-full mx-auto">
        <div className="bg-white border-4 rounded-lg shadow p-6 m-10">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input type="text" name="title" id="title" required className="input" placeholder="Enter title" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="session_id" className="block mb-2 text-sm font-medium text-gray-900">Session ID</label>
                <input type="text" name="session_id" id="session_id" value={id} readOnly className="input bg-gray-100" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Tutor Email</label>
                <input type="email" name="email" id="email" value={user?.email} readOnly className="input bg-gray-100" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900">Links</label>
                <input type="text" name="link" id="link" className="input" placeholder="Enter material link" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="img" className="block mb-2 text-sm font-medium text-gray-900">Image Upload</label>
                <input type="file" name="img" id="img" className="block w-full text-sm text-gray-700 file:bg-primary file:text-white file:px-4 file:py-1 file:rounded-full" />
              </div>
            </div>
            <div className="mt-6">
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium">Upload Materials</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload_Materials_info;
