import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000' // Ideally import.meta.env.VITE_API_URL
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
