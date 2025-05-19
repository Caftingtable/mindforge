import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Authentication";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const image_hosting_api_key = '2a2798f5a9d1b7701d09a0b40cf8021d';
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_api_key}`;

const Update_Materials = () => {
  const { id } = useParams();
  const axios = useMyBackendAxios(); // ✅ using your backend
  const { user } = useContext(AuthContext);

  const { isPending, data: material = {}, refetch } = useQuery({
    queryKey: ['update_materials', id],
    queryFn: async () => {
      const res = await axios.get(`/materials/${id}`);
      return res.data;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const session_id = e.target.session_id.value;
    const tutor_email = e.target.email.value;
    const links = e.target.link.value;
    const imgFile = e.target.img.files[0];

    let imageURL = material.imgFile;

    if (imgFile) {
      const formData = new FormData();
      formData.append('image', imgFile);
      const res = await axios.post(image_hosting_api, formData, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        imageURL = res.data.data.display_url;
      }
    }

    const updatedMaterial = {
      title,
      session_id,
      tutor_email,
      links,
      imgFile: imageURL
    };

    const result = await axios.put(`/materials/${id}`, updatedMaterial);
    if (result.data.modifiedCount === 1 || result.data.acknowledged) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Updated Materials",
        showConfirmButton: false,
        timer: 2000
      });
      e.target.reset();
      refetch();
    }
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
        <h1 className="text-white text-3xl font-bold">Update Materials</h1>
      </div>

      <div className="lg:w-4/5 sm:w-full mx-auto">
        <div className="bg-white border-4 rounded-lg shadow relative m-10">
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="title" className="text-sm font-medium text-gray-900 block mb-2">Title:</label>
                  <input
                    type="text"
                    defaultValue={material.title}
                    name="title"
                    id="title"
                    className="input"
                    placeholder="Title"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="session_id" className="text-sm font-medium text-gray-900 block mb-2">Session ID:</label>
                  <input
                    type="text"
                    readOnly
                    defaultValue={material.session_id}
                    name="session_id"
                    id="session_id"
                    className="input bg-gray-100"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Tutor Email:</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    name="email"
                    readOnly
                    id="email"
                    className="input bg-gray-100"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="link" className="text-sm font-medium text-gray-900 block mb-2">Links:</label>
                  <input
                    type="text"
                    name="link"
                    id="link"
                    defaultValue={material.links}
                    className="input"
                    placeholder="Material link"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="img" className="text-sm font-medium text-gray-900 block mb-2">Image Upload:</label>
                  <input
                    type="file"
                    name="img"
                    id="img"
                    className="p-1 w-full text-sm text-gray-700 file:bg-primary file:text-white file:px-4 file:py-1 file:rounded-full border border-gray-300"
                  />
                </div>
              </div>

              <div className="p-6 border-gray-200 rounded-b">
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-medium">
                  Update Materials
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update_Materials;
