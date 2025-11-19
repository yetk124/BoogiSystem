//src/api/client.ts

import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:4000/api",
    timeout : 8000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});