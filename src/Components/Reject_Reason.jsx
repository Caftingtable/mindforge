import React, { useContext } from 'react';
import { AuthContext } from './Authentication';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useMyBackendAxios';


const Reject_Reason = () => {

    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();


    const { isPending, data: reject_reason = [], refetch } = useQuery({
        queryKey: ['reject_reason', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reject_reason/${user?.email}`);
            return res.data;
        }
    })

    if (isPending) return
    {

        <div className="flex justify-center py-8">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>

    }

 



    return (
        <div>
            <div className="relative w-full lg:h-36 md:h-36 sm:h-36 bg-primary  flex items-center justify-center">
                <h1 className="text-white text-3xl font-bold">Rejected Reason</h1>
            </div>


            {
                reject_reason?.length === 0 ? <>

                    <div className='flex justify-center h-screen items-center'>
                        <div>
                            <h1 className='text-4xl text-primary'>Not Find Reason</h1>
                        </div>
                    </div>

                </> : <>

                    <div className='grid lg:grid-cols-4 gap-4 md:grid-cols-2 my-10 sm:grid-cols-1'>

                        {
                            reject_reason?.map(reason => <div key={reason._id} className="w-full mx-auto">
                                <div className="relative group">
                                    <div className="relative px-7 py-6 shadow-sm shadow-primary bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                                        <div className="space-y-2">
                                            <p className="text-slate-800">{reason?.reject_reason}</p>
                                            <p className="text-slate-800">{reason?.feedback}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            )
                        }
                    </div>


                </>
            }




        </div>
    );
};

export default Reject_Reason;