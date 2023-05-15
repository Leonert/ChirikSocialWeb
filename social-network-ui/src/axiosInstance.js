import axios from 'axios';

const axiosIns = axios.create({
  baseURL: 'http://localhost:8080/api',
});

axiosIns.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosIns.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
    }

    return Promise.reject(error);
  }
);

export default axiosIns;
