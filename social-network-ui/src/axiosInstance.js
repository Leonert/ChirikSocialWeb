import axios from 'axios';

import { TOKEN } from './util/constants';

const axiosIns = axios.create({
  baseURL: 'https://chirikfp3-079978c808c1.herokuapp.com',
});

axiosIns.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosIns.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem(TOKEN);
    }

    return Promise.reject(error);
  }
);

export default axiosIns;
