import axios from 'axios';

// Create a secure Axios instance pointing to your Spring Boot backend
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Interceptor: Automatically attach the JWT to every outgoing request
api.interceptors.request.use(
    (config) => {
        // Fetch the token from local storage
        const token = localStorage.getItem('nexusops_jwt');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (_error) => {
        // Using _error satisfies the unused variable regex rule
        return Promise.reject(_error);
    }
);

export default api;