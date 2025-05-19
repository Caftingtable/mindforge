import axios from 'axios';

const useMyBackendAxios = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:5050/api', // ✅ LOCAL ONLY — change when deployed
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

export default useMyBackendAxios;
