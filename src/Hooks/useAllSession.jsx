import  { useContext } from 'react';
import useAxiosPublic from './useMyBackendAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Components/Authentication';

const useAllSession = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { isPending, data: All_session = [],refetch } = useQuery({
        queryKey: ['all_session', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all_sessions/${user.email}`);
            return res.data;
        }
    })

    return [isPending,All_session,refetch];
};

export default useAllSession;