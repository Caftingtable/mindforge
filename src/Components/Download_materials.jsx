import { useParams } from "react-router-dom";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import { useQuery } from "@tanstack/react-query";

const Download_materials = () => {
  const { id } = useParams();
  const axios = useMyBackendAxios();

  const { isPending, data: session_detail = {} } = useQuery({
    queryKey: ['booked_details', id],
    queryFn: async () => {
      const res = await axios.get(`/booked_details/${id}`);
      return res.data;
    }
  });

  const session_id = session_detail.session_id;

  const { data: Materials = [] } = useQuery({
    queryKey: ['session_materials', session_id],
    queryFn: async () => {
      const res = await axios.get(`/materials/session/${session_id}`);
      return res.data;
    },
    enabled: !!session_id
  });

  if (isPending) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
  const isValidURL = urlRegex.test(Materials?.links);

  return (
    <div>
      <div className="relative w-full lg:h-36 md:h-36 sm:h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">Download Materials</h1>
      </div>

      <div>
        <div className="lg:w-2/4 md:w-2/4 sm:w-4/5 mx-auto">
          <div className="flex justify-center items-center min-h-screen w-full p-4">
            <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="relative">
                <img className="w-full h-64 object-cover" src={Materials?.imgFile} alt="Material cover" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{Materials?.title}</h2>
                <p className="text-gray-600 mb-4">{session_detail?.description}</p>

                <div className="flex justify-between items-center">
                  <a
                    href={Materials?.imgFile}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md"
                  >
                    Download
                  </a>

                  <a
                    href={isValidURL ? Materials.links : 'https://drive.google.com/'}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md"
                  >
                    Links
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download_materials;
