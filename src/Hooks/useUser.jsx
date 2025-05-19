import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Components/Authentication";
import useMyBackendAxios from "./useMyBackendAxios"; // ✅ this points to your backend

const useUser = () => {
  const { user } = useContext(AuthContext);
  const axios = useMyBackendAxios();

  const { data: mongoUser, isPending, isError } = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/users_role/${user.email}`); // ✅ note the double 'users'
      return res.data;
    },
    enabled: !!user?.email
  });

  return {
    mongoUser,
    isPending,
    isError,
    isAdmin: mongoUser?.role === 'admin',
    isTutor: mongoUser?.role === 'tutor',
    isStudent: mongoUser?.role === 'student'
  };
};

export default useUser;
