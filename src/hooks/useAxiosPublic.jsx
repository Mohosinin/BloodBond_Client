import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://blood-bond-backend.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
