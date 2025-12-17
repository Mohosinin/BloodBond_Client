import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://blood-bond-backend.vercel.app', 
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        const responseInterceptor = axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async (error) => {
            const status = error.response.status;
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        })
        
        return () => {
             axiosSecure.interceptors.request.eject(requestInterceptor);
             axiosSecure.interceptors.response.eject(responseInterceptor);
        }

    }, [logOut, navigate])

    return axiosSecure;
};

export default useAxiosSecure;
