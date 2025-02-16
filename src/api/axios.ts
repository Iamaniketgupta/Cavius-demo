import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
const TOKEN: string = import.meta.env.VITE_ACCESS_TOKEN?.trim();
// console.log(TOKEN)
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount: number) => Math.pow(2, retryCount) * 1000,
  shouldResetTimeout: true,
});


axiosInstance.interceptors.request.use(
    (config) => {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] = `${TOKEN}`;
  
      return config;
    },
    (error) => Promise.reject(error)
  );
  

export default axiosInstance;
