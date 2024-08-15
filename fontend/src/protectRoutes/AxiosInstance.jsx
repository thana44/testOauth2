import axios from "axios";
import Cookies from 'js-cookie'

const axiosIns = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_DOMAIN,
})

axiosIns.interceptors.request.use(
    config => {
        const token = Cookies.get('PTauth')
        if(!token){
            window.location.replace('/login')
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);

axiosIns.interceptors.response.use(
    response => response,
    error => {
        if(error.response && error.response.status === 401){
            Cookies.remove('PTauth')
            window.location.replace('/login')
        }
        return Promise.reject(error)
    }
);

export default axiosIns;