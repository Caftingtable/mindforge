import Session_home_card from "./Session_home_card";
import useMyBackendAxios from "../Hooks/useMyBackendAxios";
import { useQuery } from "@tanstack/react-query";

const Study_session_home = () => {
  const axiosMyBackend = useMyBackendAxios();

  const {
    isPending,
    data: approved_Session = [],
    isLoading,
  } = useQuery({
    queryKey: ["all_sessions_from_db"],
    queryFn: async () => {
      const res = await axiosMyBackend.get('/sessions');
      return res.data;
    },
  });

  if (isPending || isLoading)
    return (
      <div className="flex justify-center py-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );

  return (
    <div>
      <div className="lg:py-20 md:py-16 sm:py-10">
        <h1 className="text-center mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-paragraph dark:text-gray-300">
          Book a Learning Session Instantly
        </h1>

        <p className="lg:w-2/4 md:w-2/4 sm:w-4/5 text-paragraph dark:text-gray-300 text-justify mx-auto">
          Explore live, interactive tutoring sessions tailored to your needs. At MindForge, you can browse upcoming and featured learning sessions across various subjects and levels. Book instantly, connect with expert tutors, and elevate your knowledge today.
        </p>
      </div>

      <div className="w-4/5 mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 sm:grid-cols-1 mb-16">
          {approved_Session?.length > 7
            ? approved_Session.slice(0, 6).map(items => (
              <Session_home_card key={items._id} sessions={items} />
            ))
            : approved_Session.map(items => (
              <Session_home_card key={items._id} sessions={items} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Study_session_home;
