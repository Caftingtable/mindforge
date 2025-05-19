 
import { Link } from "react-router-dom";
import useAllSession from "../Hooks/useAllSession";
import { IoCloudUploadOutline } from "react-icons/io5";



const Upload_Materials = () => {

    

    const [isPending, All_session] = useAllSession();


    const Approved_session = All_session.filter((session) => session.status === 'approved')


    if(isPending) return <p>Loading</p>

   


    return (
        <div>
            <div className="relative w-full lg:h-36 md:h-36 sm:h-36 bg-primary  flex items-center justify-center">
                <h1 className="text-white text-3xl font-bold">Upload Materials </h1>
            </div>



            <div className="grid my-10 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
                {
                    Approved_session?.map((session) => (
                        <div key={session._id}
                        className=" p-4 bg-white max-w-sm rounded-2xl overflow-hidden shadow-sm shadow-primary transition duration-300">
                            <img className="rounded-xl w-full" src={session?.cover_img} alt="" />
                            <div className="flex flex-col ">
                                <div className="mb-4">
                                    <h1 className="mt-5 text-2xl font-semibold">{session?.session_title}</h1>
                                    <p className="mt-2">Duration: {session?.session_duration}hr</p>
                                </div>
                                <div>
                                    <Link to={`/dashboard/upload_materials/${session._id}`}>
                                    <button className="text-white flex items-center text-md font-semibold bg-primary py-2 px-4 rounded-lg shadow-md hover:shadow-lg ">   <IoCloudUploadOutline className="text-2xl mx-2" /> Upload Materials</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
                 
            </div>











        </div>
    );
};

export default Upload_Materials;